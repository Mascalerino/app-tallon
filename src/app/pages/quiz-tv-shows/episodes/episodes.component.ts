import { Component, OnInit } from '@angular/core';
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
    this.tableDivideColumns(); // Divide los episodios de la temporada 3 en 3 columnas
  }

  searchEpisode(): void {
    const searchTermLower = this.searchTerm.toLowerCase();

    this.updateEpisodeVisibility(
      this.episodesSeason1,
      searchTermLower,
      'isFilledSeason1'
    );
    this.updateEpisodeVisibility(
      this.episodesSeason2,
      searchTermLower,
      'isFilledSeason2'
    );
    this.updateEpisodeVisibility(
      this.episodesSeason3,
      searchTermLower,
      'isFilledSeason3'
    );
    this.updateEpisodeVisibility(
      this.episodesSeason4,
      searchTermLower,
      'isFilledSeason4'
    );
    this.updateEpisodeVisibility(
      this.episodesSeason5,
      searchTermLower,
      'isFilledSeason5'
    );

    if (this.foundMatch) {
      this.searchTerm = '';
      this.foundMatch = false;
    }
  }

  resetQuiz(): void {
    this.points = 0;
    this.searchTerm = '';
    this.foundMatch = false;

    this.resetEpisodeVisibility(this.episodesSeason1);
    this.resetEpisodeVisibility(this.episodesSeason2);
    this.resetEpisodeVisibility(this.episodesSeason3);
    this.resetEpisodeVisibility(this.episodesSeason4);
    this.resetEpisodeVisibility(this.episodesSeason5);

    this.isFilledSeason1 = false;
    this.isFilledSeason2 = false;
    this.isFilledSeason3 = false;
    this.isFilledSeason4 = false;
    this.isFilledSeason5 = false;
  }

  giveUp(): void {
    this.showAllEpisodes(this.episodesSeason1);
    this.showAllEpisodes(this.episodesSeason2);
    this.showAllEpisodes(this.episodesSeason3);
    this.showAllEpisodes(this.episodesSeason4);
    this.showAllEpisodes(this.episodesSeason5);

    this.isFilledSeason1 = !this.episodesSeason1.some((char) => char.isMissing);
    this.isFilledSeason2 = !this.episodesSeason2.some((char) => char.isMissing);
    this.isFilledSeason3 = !this.episodesSeason3.some((char) => char.isMissing);
    this.isFilledSeason4 = !this.episodesSeason4.some((char) => char.isMissing);
    this.isFilledSeason5 = !this.episodesSeason5.some((char) => char.isMissing);
  }

  private resetEpisodeVisibility(episodes: IEpisode[]): void {
    episodes.forEach((episode) => {
      episode.isShowing = false;
      episode.isMissing = true;
    });
  }

  private showAllEpisodes(episodes: IEpisode[]): void {
    episodes.forEach((episode) => {
      episode.isShowing = true;
    });
  }

  private tableDivideColumns(): void {
    this.episodeSeason3Columns = this.splitIntoColumns(this.episodesSeason3, 3);
  }

  private splitIntoColumns(
    episodes: IEpisode[],
    columns: number
  ): IEpisode[][] {
    const result: IEpisode[][] = [];
    for (let i = 0; i < episodes.length; i += columns) {
      result.push(episodes.slice(i, i + columns));
    }
    return result;
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
