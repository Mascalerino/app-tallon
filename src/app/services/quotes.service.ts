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

  getRandomQuote(): {
    character: string;
    quote: string;
    possiblyInputs: string[];
  } | null {
    if (this.quotesPool.length === 0) {
      return null;
    }

    const randomIndex = Math.floor(Math.random() * this.quotesPool.length);
    const selectedQuote = this.quotesPool[randomIndex];
    this.quotesPool.splice(randomIndex, 1); // Remove the used quote
    return selectedQuote;
  }

  getTotalQuotesCount(): number {
    return Object.values(this.quotes)
      .map((entry) => entry.quotes.length)
      .reduce((total, count) => total + count, 0);
  }
}
