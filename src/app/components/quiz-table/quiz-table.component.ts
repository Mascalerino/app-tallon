import { Component, Input } from '@angular/core';

@Component({
  selector: 'quiz-table',
  templateUrl: './quiz-table.component.html',
  styleUrls: ['./quiz-table.component.css'],
})
export class QuizTableComponent {
  @Input() tableTitle: string = ''; // Título de la tabla
  @Input() data: any[] = []; // Datos para poblar la tabla
  @Input() isFilled: boolean = false; // Estado para determinar si está llena
  @Input() dataType: 'characters' | 'episodes' = 'characters'; // Tipo de datos que determina la variante
  @Input() seasonNumber: number | null = null; // Número de temporada para la variante de episodios

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

  getEmptySlots(): any[] {
    const visibleCount = this.getVisibleCount();
    const totalSlots = Math.max(8, this.data.length); // Minimum 8 slots
    const emptySlots = Math.max(0, totalSlots - visibleCount);
    return Array(emptySlots).fill(null);
  }

  getCompletionPercentage(): number {
    if (this.data.length === 0) return 0;
    return (this.getVisibleCount() / this.data.length) * 100;
  }

  getVisibleCount(): number {
    return this.data.filter(item => item.isShowing).length;
  }
}
