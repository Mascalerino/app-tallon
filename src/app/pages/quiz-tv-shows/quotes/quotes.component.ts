import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { QuotesService } from 'src/app/services/quotes.service';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css'],
})
export class QuotesComponent implements OnInit, AfterViewInit {
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
  currentIndex: number = 0; // Índice actual para manejar el pool de frases
  isPanelVisible: boolean = true;
  panelTitle: string = '';
  panelText: string = '';
  panelText2: string = '';
  quotesPool: { character: string; quote: string; possiblyInputs: string[] }[] = [];
  newQuoteAnimated: boolean = false;

  @ViewChild('answerInput') answerInput!: ElementRef;

  constructor(private quotesService: QuotesService) {}

  ngOnInit(): void {
    this.initializeGame();
  }

  ngAfterViewInit(): void {
    // Focus on input after view init if panel is not visible
    if (!this.isPanelVisible) {
      setTimeout(() => this.focusInput(), 100);
    }
  }

  initializeGame(): void {
    this.correctAnswers = 0;
    this.incorrectAnswers = 0;
    this.totalQuotes = this.quotesService.getTotalQuotesCount();
    this.remainingQuotes = this.totalQuotes;
    this.quotesService.initializeQuotesPool();
    this.quotesPool = this.quotesService.getQuotesPool();
    this.currentIndex = 0;
    this.loadQuote();
    this.panelTitle = 'Frases Míticas';
    this.panelText =
      'Lee cada frase y escribe el nombre del personaje que la dijo.';
    this.panelText2 =
      'Puedes usar solo el nombre o apellido del personaje. ¡Buena suerte!';
  }

  closePanel(): void {
    this.isPanelVisible = false;
    setTimeout(() => this.focusInput(), 100);
  }

  loadQuote(): void {
    if (this.quotesPool.length > 0) {
      const randomIndex = Math.floor(Math.random() * this.quotesPool.length);
      const selectedQuote = this.quotesPool[randomIndex];
      this.randomQuote = selectedQuote.quote;
      this.correctCharacter = selectedQuote.character;
      this.possiblyInputs = selectedQuote.possiblyInputs;
      this.newQuoteAnimated = true;
      setTimeout(() => this.newQuoteAnimated = false, 600);
    } else {
      this.randomQuote = '';
      this.feedbackMessage = '¡Has completado todas las frases!';
      this.feedbackClass = 'feedback-success';
    }
  }

  nextQuote(): void {
    this.currentIndex = (this.currentIndex + 1) % this.quotesPool.length;
    this.loadQuote();
    this.feedbackMessage = '';
    this.userInput = '';
    setTimeout(() => this.focusInput(), 100);
  }

  checkAnswer(): void {
    if (!this.userInput.trim()) {
      return;
    }

    const normalizeString = (str: string) =>
      str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    const normalizedUserInput = normalizeString(
      this.userInput.trim().toLowerCase()
    );

    const isCorrect = this.possiblyInputs.some(
      (input) => normalizeString(input.toLowerCase()) === normalizedUserInput
    );

    if (isCorrect) {
      this.feedbackMessage = '¡Correcto! Muy bien.';
      this.feedbackClass = 'feedback-success';
      this.correctAnswers++;

      this.quotesPool = this.quotesPool.filter(
        (quote) => quote.quote !== this.randomQuote
      );
      this.remainingQuotes--;
    } else {
      this.feedbackMessage = `Incorrecto. La respuesta correcta era: ${this.correctCharacter}`;
      this.feedbackClass = 'feedback-error';
      this.incorrectAnswers++;
    }

    this.userInput = '';
    
    // Auto advance after 2 seconds if there are more quotes
    if (this.quotesPool.length > 0) {
      setTimeout(() => {
        this.loadQuote();
        this.feedbackMessage = '';
        this.focusInput();
      }, 2000);
    }
  }

  resetGame(): void {
    this.quotesService.resetQuotesPool();
    this.feedbackMessage = '';
    this.userInput = '';
    this.initializeGame();
    setTimeout(() => this.focusInput(), 100);
  }

  // New helper methods
  getProgressPercentage(): number {
    if (this.totalQuotes === 0) return 0;
    return ((this.correctAnswers + this.incorrectAnswers) / this.totalQuotes) * 100;
  }

  getAccuracy(): number {
    const total = this.correctAnswers + this.incorrectAnswers;
    if (total === 0) return 0;
    return Math.round((this.correctAnswers / total) * 100);
  }

  getFeedbackIcon(): string {
    if (this.feedbackClass.includes('success')) {
      return 'fa-check-circle';
    } else if (this.feedbackClass.includes('error')) {
      return 'fa-times-circle';
    }
    return 'fa-info-circle';
  }

  private focusInput(): void {
    if (this.answerInput && this.answerInput.nativeElement) {
      this.answerInput.nativeElement.focus();
    }
  }
}
