import { Component, OnInit } from '@angular/core';
import { QuotesService } from 'src/app/services/quotes.service';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css'],
})
export class QuotesComponent implements OnInit {
  randomQuote: string = '';
  possiblyInputs: string[] = [];
  correctCharacter: string = '';
  userInput: string = '';
  feedbackMessage: string = '';
  feedbackClass: string = '';
  correctAnswers: number = 0; // Aciertos
  incorrectAnswers: number = 0; // Fallos
  totalQuotes: number = 0;
  remainingQuotes: number = 0;
  isPanelVisible: boolean = true;
  panelTitle: string = '';
  panelText: string = '';
  panelText2: string = '';

  constructor(private quotesService: QuotesService) {}

  ngOnInit(): void {
    this.initializeGame();
  }

  initializeGame(): void {
    this.correctAnswers = 0;
    this.incorrectAnswers = 0;
    this.totalQuotes = this.quotesService.getTotalQuotesCount();
    this.remainingQuotes = this.totalQuotes;
    this.loadRandomQuote();
    this.panelTitle = 'Instrucciones';
    this.panelText =
      'Escribe el nombre y pulsa "Enter" para comprobar si es correcto.';
    this.panelText2 =
      'Si fallas, se mostrará la respuesta correcta. Y aparecerá una nueva frase.';
  }

  closePanel(): void {
    this.isPanelVisible = false;
  }

  loadRandomQuote(): void {
    const quoteData = this.quotesService.getRandomQuote();
    if (quoteData) {
      this.randomQuote = quoteData.quote;
      this.correctCharacter = quoteData.character;
      this.possiblyInputs = quoteData.possiblyInputs;
      this.remainingQuotes--;
    } else {
      this.feedbackMessage = '¡Has completado todas las frases!';
      this.feedbackClass = 'text-primary';
    }
  }

  checkAnswer(): void {
    if (!this.userInput.trim()) {
      return; // No hace nada si el input está vacío
    }

    const isCorrect = this.possiblyInputs.some(
      (input) => input.toLowerCase() === this.userInput.trim().toLowerCase()
    );

    if (isCorrect) {
      this.feedbackMessage = '¡Correcto!';
      this.feedbackClass = 'text-success';
      this.correctAnswers++;
    } else {
      this.feedbackMessage = `Incorrecto. La respuesta era: ${this.correctCharacter}`;
      this.feedbackClass = 'text-danger';
      this.incorrectAnswers++;
    }

    this.userInput = ''; // Limpia el campo de entrada
    this.loadRandomQuote(); // Carga una nueva frase
  }

  resetGame(): void {
    this.quotesService.initializeQuotesPool(); // Reinicia las frases
    this.feedbackMessage = ''; // Limpia mensajes de feedback
    this.initializeGame(); // Reinicia el juego
  }
}
