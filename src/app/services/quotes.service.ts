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

  getQuotesPool(): {
    character: string;
    quote: string;
    possiblyInputs: string[];
  }[] {
    return this.quotesPool;
  }

  getRandomQuote(): {
    character: string;
    quote: string;
    possiblyInputs: string[];
  } | null {
    if (this.quotesPool.length === 0) {
      return null;
    }
    const randomIndex = Math.floor(Math.random() * this.quotesPool.length);
    return this.quotesPool[randomIndex];
  }

  getTotalQuotesCount(): number {
    return Object.values(this.quotes)
      .map((entry) => entry.quotes.length)
      .reduce((total, count) => total + count, 0);
  }

  resetQuotesPool(): void {
    this.initializeQuotesPool();
    this.shuffleQuotesPool();
  }

  // Mezcla el pool de frases al azar
  private shuffleQuotesPool(): void {
    for (let i = this.quotesPool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.quotesPool[i], this.quotesPool[j]] = [
        this.quotesPool[j],
        this.quotesPool[i],
      ];
    }
  }
}
