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
  score: number = 0;
  totalQuotes: number = 0;
  remainingQuotes: number = 0;
  isPanelVisible: boolean = true;
  panelTitle: string = '';
  panelText: string = '';
  panelText2: string = '';

  constructor(private quotesService: QuotesService) {}

  ngOnInit(): void {
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
    if (!this.randomQuote) {
      return;
    }

    const isCorrect = this.possiblyInputs.some(
      (input) => input.toLowerCase() === this.userInput.trim().toLowerCase()
    );

    if (isCorrect) {
      this.feedbackMessage = '¡Correcto!';
      this.feedbackClass = 'text-success';
      this.score++;
    } else {
      this.feedbackMessage = `Incorrecto. La respuesta era: ${this.correctCharacter}`;
      this.feedbackClass = 'text-danger';
    }

    this.userInput = '';
    this.loadRandomQuote();
  }
}
