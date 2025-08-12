import { Component, OnDestroy, OnInit } from '@angular/core';
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

declare var bootstrap: any;

interface Notification {
  id: number;
  message: string;
  type: 'success' | 'error';
}

@Component({
  selector: 'app-episodes',
  templateUrl: './episodes.component.html',
  styleUrls: ['./episodes.component.css'],
})
export class EpisodesComponent implements OnInit, OnDestroy {
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

  // Sistema de notificaciones
  notifications: Notification[] = [];
  private notificationIdCounter = 0;
  private foundEpisodes: Set<string> = new Set(); // Para evitar duplicados

  // Variables para el modal de resumen
  private surrenderSummary: any = {};

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

  ngOnDestroy(): void {
    this.giveUp();
  }

  closePanel(): void {
    this.isPanelVisible = false;
  }

  searchEpisode(): void {
    const searchTermLower = this.searchTerm.toLowerCase().trim();

    if (!searchTermLower) return;

    const episodesGroups = [
      { data: this.episodesSeason1, tableFilled: 'isFilledSeason1', season: 'Temporada 1' },
      { data: this.episodesSeason2, tableFilled: 'isFilledSeason2', season: 'Temporada 2' },
      { data: this.episodesSeason3, tableFilled: 'isFilledSeason3', season: 'Temporada 3' },
      { data: this.episodesSeason4, tableFilled: 'isFilledSeason4', season: 'Temporada 4' },
      { data: this.episodesSeason5, tableFilled: 'isFilledSeason5', season: 'Temporada 5' },
    ];

    const foundEpisodeNames: string[] = [];
    const uniqueEpisodeNames: Set<string> = new Set();

    episodesGroups.forEach((group) => {
      const foundNames = this.updateEpisodeVisibility(
        group.data,
        searchTermLower,
        group.tableFilled,
        group.season
      );

      // Solo añadir nombres únicos
      foundNames.forEach(name => {
        if (!uniqueEpisodeNames.has(name)) {
          uniqueEpisodeNames.add(name);
          foundEpisodeNames.push(name);
        }
      });
    });

    // Si se encontraron episodios, limpiar input y mostrar notificaciones
    if (foundEpisodeNames.length > 0) {
      this.searchTerm = ''; // Limpiar el input primero
      
      // Después mostrar una notificación por cada episodio único encontrado
      foundEpisodeNames.forEach((episodeName, index) => {
        // Espaciar las notificaciones 300ms para que se vean todas
        setTimeout(() => {
          this.addNotification(`¡Correcto! ${episodeName}`, 'success');
        }, index * 300);
      });
    }
  }

  resetQuiz(): void {
    this.points = 0;
    this.searchTerm = '';
    this.foundMatch = false;
    this.foundEpisodes.clear();

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

    this.addNotification('Quiz reiniciado', 'success');
  }

  showSurrenderModal(): void {
    // Capturar el estado actual antes de mostrarlo todo
    this.surrenderSummary = {
      season1: this.getVisibleCount(this.episodesSeason1),
      season2: this.getVisibleCount(this.episodesSeason2),
      season3: this.getVisibleCount(this.episodesSeason3),
      season4: this.getVisibleCount(this.episodesSeason4),
      season5: this.getVisibleCount(this.episodesSeason5),
      total: this.getTotalVisibleCount()
    };

    const modal = new bootstrap.Modal(document.getElementById('surrenderModal'));
    modal.show();

    // Mostrar todos los datos después de capturar el resumen
    this.giveUp();
  }

  giveUp(): void {
    showAllData(this.episodesSeason1);
    showAllData(this.episodesSeason2);
    showAllData(this.episodesSeason3);
    showAllData(this.episodesSeason4);
    showAllData(this.episodesSeason5);

    this.isFilledSeason1 = !this.episodesSeason1.some((ep) => ep.isMissing);
    this.isFilledSeason2 = !this.episodesSeason2.some((ep) => ep.isMissing);
    this.isFilledSeason3 = !this.episodesSeason3.some((ep) => ep.isMissing);
    this.isFilledSeason4 = !this.episodesSeason4.some((ep) => ep.isMissing);
    this.isFilledSeason5 = !this.episodesSeason5.some((ep) => ep.isMissing);
  }

  removeNotification(id: number): void {
    this.notifications = this.notifications.filter(n => n.id !== id);
  }

  /**
   * Añade una nueva notificación
   * @param message 
   * @param type 
   * @param duration Duración en milisegundos (opcional)
   */
  addNotification(message: string, type: 'success' | 'error', duration: number = 2500): void {
    const notification: Notification = {
      id: ++this.notificationIdCounter,
      message,
      type
    };
    
    this.notifications.push(notification);
    
    // Auto-remove after specified duration
    setTimeout(() => {
      this.removeNotification(notification.id);
    }, duration);
  }

  // Métodos para el modal de resumen
  getSurrenderVisibleCount(seasonProperty: string): number {
    const seasonKey = seasonProperty.replace('episodes', '').toLowerCase();
    return this.surrenderSummary[seasonKey] || 0;
  }

  getSurrenderTotalVisibleCount(): number {
    return this.surrenderSummary.total || 0;
  }

  getTotalEpisodes(): number {
    return this.totalEpisodes;
  }

  // Métodos auxiliares para contar elementos visibles
  private getVisibleCount(episodes: IEpisode[]): number {
    return episodes.filter(ep => ep.isShowing && !ep.isMissing).length;
  }

  private getTotalVisibleCount(): number {
    return this.getVisibleCount(this.episodesSeason1) +
           this.getVisibleCount(this.episodesSeason2) +
           this.getVisibleCount(this.episodesSeason3) +
           this.getVisibleCount(this.episodesSeason4) +
           this.getVisibleCount(this.episodesSeason5);
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
    tableFilled: string,
    seasonName: string
  ): string[] {
    const foundEpisodeNames: string[] = [];

    episodes.forEach((episode) => {
      if (!episode.isShowing) {
        const episodeKey = `${seasonName}-${episode.fullName}`;
        const inputMatch = episode.posibilyInputs.some(
          (input) => input.toLowerCase() === searchTerm
        );

        if (inputMatch && !this.foundEpisodes.has(episodeKey)) {
          episode.isShowing = true;
          episode.isMissing = false;
          this.foundEpisodes.add(episodeKey);
          this.points++;
          foundEpisodeNames.push(episode.fullName);
        }
      }
    });

    // Cuando todos los episodios de una tabla se muestran, marcar la tabla como llena
    if (episodes.every((episode) => episode.isShowing)) {
      (this as any)[tableFilled] = true;
    }

    return foundEpisodeNames;
  }
}
