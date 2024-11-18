import { Injectable } from '@angular/core';
// Importar el archivo JSON desde la carpeta assets/data
import * as charactersData from '../../assets/quiz-tv-shows/data/characters.json';
import {
  ICharactersByFloor,
  ICharacter,
} from '../models/quiz-tv-shows/character.model';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  // Cargar los datos de los personajes desde el archivo JSON
  private characters: ICharactersByFloor = charactersData;

  constructor() {}

  // Método para obtener el número total de personajes
  getTotalCharacters(): number {
    let totalCharacters = 0;
    for (const floor in this.characters) {
      if (
        Object.prototype.hasOwnProperty.call(this.characters, floor) &&
        floor !== 'default'
      ) {
        totalCharacters += this.characters[floor].length; // Sumar los personajes por piso
      }
    }
    return totalCharacters;
  }

  // Método para obtener los personajes de un piso específico
  getCharactersByFloorName(floor: string): ICharacter[] {
    return this.characters[floor] || []; // Si no se encuentra el piso, devuelve un array vacío
  }
}
