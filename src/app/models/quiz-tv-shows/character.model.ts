export interface ICharacter {
  fullName: string;
  explanation: string;
  posibilyInputs: string[];
  isShowing: boolean;
  isMissing: boolean; // Booleano que nos permite saber si el personaje falta cuando se rinde
}

export interface ICharactersByFloor {
  [floor: string]: ICharacter[];
}
