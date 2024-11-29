export interface IEpisode {
  episode: number;
  fullName: string;
  posibilyInputs: string[];
  isShowing: boolean;
  isMissing: boolean; // Booleano que nos permite saber si el episodio falta cuando se rinde
}

export interface IEpisodesBySeason {
  [season: string]: IEpisode[];
}
