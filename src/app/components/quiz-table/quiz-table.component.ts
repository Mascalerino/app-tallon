import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'quiz-table',
  templateUrl: './quiz-table.component.html',
  styleUrls: ['./quiz-table.component.css'],
})
export class QuizTableComponent implements OnChanges {
  @Input() tableTitle: string = ''; // Título de la tabla
  @Input() data: any[] = []; // Datos para poblar la tabla
  @Input() isFilled: boolean = false; // Estado para determinar si está llena
  @Input() dataType: 'characters' | 'episodes' = 'characters'; // Tipo de datos que determina la variante
  @Input() seasonNumber: number | null = null; // Número de temporada para la variante de episodios

  isVisible: boolean = true; // Estado para mostrar/ocultar la tabla

  ngOnChanges(changes: SimpleChanges): void {
    // Si la tabla se completa, ocultarla automáticamente
    if (changes['isFilled'] && changes['isFilled'].currentValue === true && !changes['isFilled'].previousValue) {
      setTimeout(() => {
        this.isVisible = false;
      }, 1000); // Esperar 1 segundo para que se vea la animación de completado
    }
  }

  toggleVisibility(): void {
    this.isVisible = !this.isVisible;
  }

  getTableIcon(): string {
    if (this.dataType === 'characters') {
      if (this.tableTitle.includes('A') || this.tableTitle.includes('B')) {
        return 'fa-home';
      } else if (this.tableTitle.includes('Ático')) {
        return 'fa-building';
      } else if (this.tableTitle.includes('Portería')) {
        return 'fa-key';
      } else if (this.tableTitle.includes('Videoclub')) {
        return 'fa-film';
      } else {
        return 'fa-users';
      }
    } else {
      return 'fa-tv';
    }
  }

  getItemIcon(item: any): string {
    if (item.isMissing) {
      return 'fa-times-circle';
    } else if (item.isShowing) {
      return 'fa-check-circle';
    }
    return 'fa-circle';
  }

  getCompletionPercentage(): number {
    if (this.data.length === 0) return 0;
    return (this.getVisibleCount() / this.data.length) * 100;
  }

  getVisibleCount(): number {
    // Solo contar elementos que están visibles Y no son marcados como fallados (missing)
    return this.data.filter(item => item.isShowing && !item.isMissing).length;
  }
}
