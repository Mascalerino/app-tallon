export interface IQuoteEntry {
  quote: string;
  episode?: string;
}

export interface IQuote {
  quotes?: IQuoteEntry[];
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