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
  currentIndex: number = 0; // Índice actual para manejar el pool de frases
  isPanelVisible: boolean = true;
  panelTitle: string = '';
  panelText: string = '';
  panelText2: string = '';
  quotesPool: { character: string; quote: string; possiblyInputs: string[] }[] =
    [];

  constructor(private quotesService: QuotesService) {}

  ngOnInit(): void {
    this.initializeGame();
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
    this.panelTitle = 'Instrucciones';
    this.panelText =
      'Escribe el nombre y pulsa "Enter" para comprobar si es correcto.';
    this.panelText2 =
      'Si fallas, se mostrará la respuesta correcta. Y aparecerá una nueva frase.';
  }

  closePanel(): void {
    this.isPanelVisible = false;
  }

  loadQuote(): void {
    if (this.quotesPool.length > 0) {
      const randomIndex = Math.floor(Math.random() * this.quotesPool.length);
      const selectedQuote = this.quotesPool[randomIndex];
      this.randomQuote = selectedQuote.quote;
      this.correctCharacter = selectedQuote.character;
      this.possiblyInputs = selectedQuote.possiblyInputs;
    } else {
      this.feedbackMessage = '¡No hay más frases!';
      this.feedbackClass = 'text-primary';
    }
  }

  nextQuote(): void {
    this.currentIndex = (this.currentIndex + 1) % this.quotesPool.length; // Avanza al siguiente índice en el pool
    this.loadQuote(); // Carga la nueva frase
    this.feedbackMessage = ''; // Limpia el mensaje de feedback
  }

  checkAnswer(): void {
    if (!this.userInput.trim()) {
      return; // No hace nada si el input está vacío
    }

    // Normaliza la cadena eliminando acentos
    const normalizeString = (str: string) =>
      str.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); // Elimina los acentos

    // Normaliza el input del usuario
    const normalizedUserInput = normalizeString(
      this.userInput.trim().toLowerCase()
    );

    // Verifica si el input normalizado coincide con alguna entrada válida
    const isCorrect = this.possiblyInputs.some(
      (input) => normalizeString(input.toLowerCase()) === normalizedUserInput
    );

    if (isCorrect) {
      this.feedbackMessage = '¡Correcto!';
      this.feedbackClass = 'text-success';
      this.correctAnswers++;

      // Elimina la frase actual del pool
      this.quotesPool = this.quotesPool.filter(
        (quote) => quote.quote !== this.randomQuote
      );
      this.remainingQuotes--;
    } else {
      this.feedbackMessage = `Incorrecto. La respuesta era: ${this.correctCharacter}`;
      this.feedbackClass = 'text-danger';
      this.incorrectAnswers++;
    }

    this.userInput = ''; // Limpia el campo de entrada
    this.loadQuote(); // Carga la siguiente frase
  }

  resetGame(): void {
    this.quotesService.resetQuotesPool(); // Reinicia y mezcla las frases
    this.feedbackMessage = ''; // Limpia mensajes de feedback
    this.initializeGame(); // Reinicia el juego
  }
}
