export interface IQuote {
  quotes: string[];
  posibilyInputs: string[];
}

export interface IQuotesJson {
  [character: string]: IQuote;
}
