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
}
