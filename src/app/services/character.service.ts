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
  // Datos de los personajes cargados desde el archivo JSON
  private characters: ICharactersByFloor = charactersData;

  constructor() {}

  /**
   * Obtiene el número total de personajes disponibles en todos los pisos.
   * @returns {number} Número total de personajes.
   */
  getTotalCharacters(): number {
    let totalCharacters = 0;

    // Iterar por cada piso en los datos de personajes
    for (const floor in this.characters) {
      if (
        Object.prototype.hasOwnProperty.call(this.characters, floor) &&
        floor !== 'default' // Ignorar cualquier clave predeterminada no relacionada con pisos.
      ) {
        totalCharacters += this.characters[floor].length; // Sumar el número de personajes de cada piso.
      }
    }

    return totalCharacters;
  }

  /**
   * Obtiene los personajes de un piso específico por su nombre.
   * @param {string} floor - Nombre del piso (por ejemplo, '1A', '2B').
   * @returns {ICharacter[]} Lista de personajes que pertenecen al piso especificado.
   */
  getCharactersByFloorName(floor: string): ICharacter[] {
    // Si el piso no existe en los datos, devolver un array vacío.
    return this.characters[floor] || [];
  }
}
