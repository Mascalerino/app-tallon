import { Injectable } from '@angular/core';
import quotesJson from '../../assets/quiz-tv-shows/data/quotes.json';
import { IQuotesJson } from '../models/quiz-tv-shows/quotes.model';

@Injectable({
  providedIn: 'root',
})
export class QuotesService {
  private quotesPool: {
    character: string;
    quote: string;
    possiblyInputs: string[];
  }[] = [];
  private quotes: IQuotesJson = quotesJson;

  constructor() {
    this.initializeQuotesPool();
  }

  // Inicializa el pool de frases combinando datos del JSON
  initializeQuotesPool(): void {
    const characters = Object.keys(this.quotes);
    this.quotesPool = characters.flatMap((character) =>
      this.quotes[character].quotes.map((quote) => ({
        character,
        quote,
        possiblyInputs: this.quotes[character].posibilyInputs,
      }))
    );
  }

  // Devuelve una frase aleatoria sin eliminarla del pool
  getRandomQuote(): {
    character: string;
    quote: string;
    possiblyInputs: string[];
  } | null {
    if (this.quotesPool.length === 0) {
      return null;
    }

    const randomIndex = Math.floor(Math.random() * this.quotesPool.length);
    return this.quotesPool[randomIndex]; // Devuelve la frase sin eliminarla
  }

  // Devuelve el número total de frases disponibles
  getTotalQuotesCount(): number {
    return Object.values(this.quotes)
      .map((entry) => entry.quotes.length)
      .reduce((total, count) => total + count, 0);
  }

  // Devuelve el pool completo de frases
  getQuotesPool(): {
    character: string;
    quote: string;
    possiblyInputs: string[];
  }[] {
    return this.quotesPool;
  }

  // Restaura el pool de frases a su estado original
  resetQuotesPool(): void {
    this.initializeQuotesPool();
  }
}
