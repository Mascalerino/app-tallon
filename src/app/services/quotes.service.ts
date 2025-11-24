import { Injectable } from '@angular/core';
import quotesJson from '../../assets/quiz-tv-shows/data/quotes.json';
import nameEpisodesJson from '../../assets/quiz-tv-shows/data/nameEpisodes.json';
import { DifficultyLevel, IQuoteEntry } from '../models/quiz-tv-shows/quotes.model';

@Injectable({
  providedIn: 'root',
})
export class QuotesService {
  private quotesPool: {
    character: string;
    quote: IQuoteEntry;
    possiblyInputs: string[];
  }[] = [];
  private quotes: any = quotesJson;
  private nameEpisodes: any = nameEpisodesJson;
  private currentDifficulty: DifficultyLevel = 'facil';

  constructor() {}

  /**
   * Resuelve la referencia de episodio a su nombre completo
   * @param episodeId ID del episodio (ej: "3x29")
   * @returns Nombre completo del episodio o el ID si no se encuentra
   */
  getEpisodeName(episodeId: string): string {
    if (!episodeId || !episodeId.trim()) {
      return '';
    }
    return this.nameEpisodes.episodios[episodeId] || episodeId;
  }

  setDifficulty(difficulty: DifficultyLevel): void {
    this.currentDifficulty = difficulty;
    this.initializeQuotesPool();
  }

  getCurrentDifficulty(): DifficultyLevel {
    return this.currentDifficulty;
  }

  initializeQuotesPool(): void {
    const currentQuotes = this.quotes[this.currentDifficulty];
    const characters = Object.keys(currentQuotes);
    
    // Crear el pool con mejor distribución
    this.quotesPool = [];
    
    // Primero, obtener todos los personajes con quotes válidas
    const validCharacters = characters.filter(character => {
      const quotes = currentQuotes[character].quotes;
      return quotes && Array.isArray(quotes) && quotes.length > 0;
    });

    // Agregar quotes de cada personaje de forma intercalada para mejor distribución
    const maxQuotesPerCharacter = Math.max(...validCharacters.map(char => 
      currentQuotes[char].quotes!.length
    ));

    for (let i = 0; i < maxQuotesPerCharacter; i++) {
      for (const character of validCharacters) {
        const characterData = currentQuotes[character];
        if (characterData.quotes && i < characterData.quotes.length) {
          this.quotesPool.push({
            character,
            quote: characterData.quotes[i],
            possiblyInputs: characterData.posibilyInputs,
          });
        }
      }
    }

    this.shuffleQuotesPool();
  }

  getQuotesPool(): {
    character: string;
    quote: IQuoteEntry;
    possiblyInputs: string[];
  }[] {
    return this.quotesPool;
  }

  getRandomQuote(): {
    character: string;
    quote: IQuoteEntry;
    possiblyInputs: string[];
  } | null {
    if (this.quotesPool.length === 0) {
      return null;
    }
    const randomIndex = Math.floor(Math.random() * this.quotesPool.length);
    return this.quotesPool[randomIndex];
  }

  getTotalQuotesCount(): number {
    const currentQuotes = this.quotes[this.currentDifficulty];
    return Object.values(currentQuotes)
      .filter((entry: any) => entry.quotes && Array.isArray(entry.quotes) && entry.quotes.length > 0)
      .map((entry: any) => entry.quotes!.length)
      .reduce((total, count) => total + count, 0);
  }

  resetQuotesPool(): void {
    this.initializeQuotesPool();
  }

  // Mezcla el pool de frases al azar usando el algoritmo Fisher-Yates
  private shuffleQuotesPool(): void {
    for (let i = this.quotesPool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.quotesPool[i], this.quotesPool[j]] = [
        this.quotesPool[j],
        this.quotesPool[i],
      ];
    }
  }

  // Método adicional para mezclar y obtener una muestra más variada
  getShuffledPool(): { character: string; quote: IQuoteEntry; possiblyInputs: string[] }[] {
    const shuffledPool = [...this.quotesPool];
    // Doble mezcla para mayor aleatoridad
    for (let k = 0; k < 2; k++) {
      for (let i = shuffledPool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledPool[i], shuffledPool[j]] = [shuffledPool[j], shuffledPool[i]];
      }
    }
    return shuffledPool;
  }
}
