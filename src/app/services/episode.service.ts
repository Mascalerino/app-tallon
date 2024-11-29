import { Injectable } from '@angular/core';
// Importar el archivo JSON desde la carpeta assets/data
import * as episodesData from '../../assets/quiz-tv-shows/data/episodes.json';
import {
  IEpisodesBySeason,
  IEpisode,
} from '../models/quiz-tv-shows/episode.model';

@Injectable({
  providedIn: 'root',
})
export class EpisodeService {
  // Datos de los episodios cargados desde el archivo JSON
  private episodes: IEpisodesBySeason = episodesData;

  constructor() {}

  /**
   * Obtiene el número total de episodios en todas las temporadas.
   * @returns {number} Número total de episodios.
   */
  getTotalEpisodes(): number {
    let totalEpisodes = 0;
    for (const season in this.episodes) {
      if (
        Object.prototype.hasOwnProperty.call(this.episodes, season) &&
        season !== 'default' // Ignorar cualquier clave predeterminada no relacionada con temporadas.
      ) {
        totalEpisodes += this.episodes[season].length; // Sumar el número de episodios de cada temporada.
      }
    }
    return totalEpisodes;
  }

  /**
   * Obtiene los episodios organizados por temporada.
   * @returns {IEpisodesBySeason} Episodios agrupados por temporada.
   */
  getEpisodesGroupedBySeason(): IEpisodesBySeason {
    return this.episodes;
  }

  /**
   * Obtiene los episodios de una temporada específica por su nombre.
   * @param {string} season - Nombre de la temporada (por ejemplo, 'Temporada 1').
   * @returns {IEpisode[]} Lista de episodios de la temporada especificada.
   */
  getEpisodesBySeasonName(season: string): IEpisode[] {
    return this.episodes[season] || []; // Si no se encuentra la temporada, devuelve un array vacío.
  }
}
