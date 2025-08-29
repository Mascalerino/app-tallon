export interface IQuote {
  quotes?: string[];
  posibilyInputs: string[];
}

export interface IQuotesJson {
  [character: string]: IQuote;
}

export interface IQuotesDifficulty {
  facil: IQuotesJson;
  dificil: IQuotesJson;
}

export type DifficultyLevel = 'facil' | 'dificil';
