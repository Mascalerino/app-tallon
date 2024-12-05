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

  constructor(private quotesService: QuotesService) {}

  ngOnInit(): void {
    this.totalQuotes = this.quotesService.getTotalQuotesCount();
    this.remainingQuotes = this.totalQuotes;
    this.loadRandomQuote();
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
