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
  totalEpisodes: number = 0;
  points: number = 0;
  foundMatch: boolean = false;

  // Estructura para agrupar episodios por temporada
  episodesBySeason: IEpisodesBySeason = {};

  // Propiedades para saber si las tablas están llenas
  isFilledSeason: { [season: string]: boolean } = {};

  searchTerm: string = ''; // Término de búsqueda

  constructor(private episodeService: EpisodeService) {}

  ngOnInit(): void {
    const allSeasons = this.episodeService.getEpisodesGroupedBySeason();

    // Filtramos las claves no válidas como "default"
    this.episodesBySeason = Object.keys(allSeasons)
      .filter((key) => key !== 'default') // Ignorar "default"
      .reduce((acc, key) => {
        acc[key] = allSeasons[key];
        return acc;
      }, {} as IEpisodesBySeason);

    this.totalEpisodes = Object.values(this.episodesBySeason).reduce(
      (total, episodes) => total + episodes.length,
      0
    );

    // Inicializar los estados de las tablas como "no llenas"
    Object.keys(this.episodesBySeason).forEach(
      (season) => (this.isFilledSeason[season] = false)
    );
  }

  // Obtener los episodios organizados por temporada
  private getEpisodesBySeason(): void {
    this.episodesBySeason = this.episodeService.getEpisodesGroupedBySeason();
    Object.keys(this.episodesBySeason).forEach((season) => {
      this.isFilledSeason[season] = false; // Inicializamos el estado de las tablas
    });
  }

  // Método para buscar episodios
  searchEpisodes(): void {
    const searchTermLower = this.searchTerm.toLowerCase();

    if (!searchTermLower) return;

    Object.keys(this.episodesBySeason).forEach((season) => {
      this.updateEpisodeVisibility(
        this.episodesBySeason[season],
        searchTermLower,
        season
      );
    });

    if (this.foundMatch) {
      this.searchTerm = '';
      this.foundMatch = false;
    }
  }

  // Actualizar la visibilidad de episodios al buscar
  private updateEpisodeVisibility(
    episodes: IEpisode[],
    searchTerm: string,
    season: string
  ): void {
    episodes.forEach((episode) => {
      if (!episode.showEpisode) {
        const matchFound = episode.posibilyInputs.some(
          (input) => input.toLowerCase() === searchTerm
        );
        if (matchFound) {
          episode.showEpisode = true;
          episode.isMissing = false;
          this.foundMatch = true;
          this.points++;
        }
      }
    });

    // Verificar si todos los episodios de una temporada están visibles
    if (episodes.every((episode) => episode.showEpisode)) {
      this.isFilledSeason[season] = true;
    }
  }

  // Reiniciar el quiz
  resetQuiz(): void {
    this.points = 0;
    this.searchTerm = '';
    this.foundMatch = false;

    Object.keys(this.episodesBySeason).forEach((season) => {
      this.resetEpisodeVisibility(this.episodesBySeason[season]);
      this.isFilledSeason[season] = false;
    });
  }

  // Mostrar todos los episodios
  giveUp(): void {
    Object.keys(this.episodesBySeason).forEach((season) => {
      this.showAllEpisodes(this.episodesBySeason[season]);
      this.isFilledSeason[season] = true;
    });
  }

  private showAllEpisodes(episodes: IEpisode[]): void {
    episodes.forEach((episode) => {
      episode.showEpisode = true;
    });
  }

  private resetEpisodeVisibility(episodes: IEpisode[]): void {
    episodes.forEach((episode) => {
      episode.showEpisode = false;
      episode.isMissing = true;
    });
  }
}
