export interface ICharacter {
  fullName: string;
  explanation: string;
  posibilyInputs: string[];
  showCharacter: boolean;
}

export interface ICharactersByFloor {
  [floor: string]: ICharacter[];
}
