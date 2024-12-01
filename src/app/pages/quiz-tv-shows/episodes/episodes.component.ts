import { Component, OnInit } from '@angular/core';
import {
  hideAllData,
  showAllData,
  splitDataIntoColumns,
} from 'src/app/core/util/quiz-tv-show-util';
import {
  IEpisode,
  IEpisodesBySeason,
} from 'src/app/models/quiz-tv-shows/episode.model';
import { EpisodeService } from 'src/app/services/episode.service';

@Component({
  selector: 'app-episodes',
  templateUrl: './episodes.component.html',
  styleUrls: ['./episodes.component.css'],
})
export class EpisodesComponent implements OnInit {
  //#region variables
  totalEpisodes: number = 0;
  points: number = 0;
  foundMatch: boolean = false;
  isPanelVisible: boolean = true;
  panelTitle: string = '';
  panelText: string = '';
  panelText2: string = '';

  // Propiedades para los episodios
  episodesSeason1: IEpisode[] = [];
  episodesSeason2: IEpisode[] = [];
  episodesSeason3: IEpisode[] = [];
  episodesSeason4: IEpisode[] = [];
  episodesSeason5: IEpisode[] = [];

  episodeSeason3Columns: IEpisode[][] = [];

  // Propiedades para saber si la tabla está llena
  isFilledSeason1: boolean = false;
  isFilledSeason2: boolean = false;
  isFilledSeason3: boolean = false;
  isFilledSeason4: boolean = false;
  isFilledSeason5: boolean = false;

  searchTerm: string = ''; // Para almacenar el término de búsqueda

  //#endregion

  constructor(private episodeService: EpisodeService) {}

  ngOnInit(): void {
    this.totalEpisodes = this.episodeService.getTotalEpisodes();
    this.getEpisodesBySeason();
    this.episodeSeason3Columns = splitDataIntoColumns(this.episodesSeason3, 3);
    this.panelTitle = 'Instrucciones';
    this.panelText =
      'Encuentra todos los capitulos de ANHQV. La lista de capítulos está basada en la información proporcionada por IMDB.';
    this.panelText2 =
      'Escribe el nombre del episodio o parte de el. No necesitas escribir Érase para acertar el capitulo.';
  }

  closePanel(): void {
    this.isPanelVisible = false;
  }

  searchEpisode(): void {
    const searchTermLower = this.searchTerm.toLowerCase();

    if (!searchTermLower) return;

    const episodesGroups = [
      { data: this.episodesSeason1, tableFilled: 'isFilledSeason1' },
      { data: this.episodesSeason2, tableFilled: 'isFilledSeason2' },
      { data: this.episodesSeason3, tableFilled: 'isFilledSeason3' },
      { data: this.episodesSeason4, tableFilled: 'isFilledSeason4' },
      { data: this.episodesSeason5, tableFilled: 'isFilledSeason5' },
    ];

    episodesGroups.forEach((group) => {
      this.updateEpisodeVisibility(
        group.data,
        searchTermLower,
        group.tableFilled
      );
    });

    if (this.foundMatch) {
      this.searchTerm = '';
      this.foundMatch = false;
    }
  }

  resetQuiz(): void {
    this.points = 0;
    this.searchTerm = '';
    this.foundMatch = false;

    hideAllData(this.episodesSeason1);
    hideAllData(this.episodesSeason2);
    hideAllData(this.episodesSeason3);
    hideAllData(this.episodesSeason4);
    hideAllData(this.episodesSeason5);

    this.isFilledSeason1 = false;
    this.isFilledSeason2 = false;
    this.isFilledSeason3 = false;
    this.isFilledSeason4 = false;
    this.isFilledSeason5 = false;
  }

  giveUp(): void {
    showAllData(this.episodesSeason1);
    showAllData(this.episodesSeason2);
    showAllData(this.episodesSeason3);
    showAllData(this.episodesSeason4);
    showAllData(this.episodesSeason5);

    this.isFilledSeason1 = !this.episodesSeason1.some((char) => char.isMissing);
    this.isFilledSeason2 = !this.episodesSeason2.some((char) => char.isMissing);
    this.isFilledSeason3 = !this.episodesSeason3.some((char) => char.isMissing);
    this.isFilledSeason4 = !this.episodesSeason4.some((char) => char.isMissing);
    this.isFilledSeason5 = !this.episodesSeason5.some((char) => char.isMissing);
  }

  /**
   * Método para obtener los episodios por temporada
   */
  private getEpisodesBySeason(): void {
    this.episodesSeason1 =
      this.episodeService.getEpisodesBySeasonName('Temporada 1');
    this.episodesSeason2 =
      this.episodeService.getEpisodesBySeasonName('Temporada 2');
    this.episodesSeason3 =
      this.episodeService.getEpisodesBySeasonName('Temporada 3');
    this.episodesSeason4 =
      this.episodeService.getEpisodesBySeasonName('Temporada 4');
    this.episodesSeason5 =
      this.episodeService.getEpisodesBySeasonName('Temporada 5');
  }

  private updateEpisodeVisibility(
    episodes: IEpisode[],
    searchTerm: string,
    tableFilled: string
  ): void {
    episodes.forEach((episode) => {
      if (episode.isShowing === false) {
        const matchFound = episode.posibilyInputs.some(
          (input) => input.toLowerCase() === searchTerm
        );
        if (matchFound) {
          episode.isShowing = true;
          episode.isMissing = false;
          this.foundMatch = true;
          this.points++;
        }
      }
    });

    // Cuando todos los personajes de una tabla se muestran, marcamos la tabla como llena
    if (episodes.every((episode) => episode.isShowing)) {
      (this as any)[tableFilled] = true; // Cambiar el estado de la tabla a "llena"
    }
  }
}
