import { Component, OnInit } from '@angular/core';
import { ICharacter } from 'src/app/models/quiz-tv-shows/character.model';
import { CharacterService } from 'src/app/services/character.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css'],
})
export class CharactersComponent implements OnInit {
  //#region variables
  totalCharacters: number = 0;
  points: number = 0;
  foundMatch: boolean = false;

  // Propiedades para los personajes
  characters1A: ICharacter[] = [];
  characters1B: ICharacter[] = [];
  characters2A: ICharacter[] = [];
  characters2B: ICharacter[] = [];
  characters3A: ICharacter[] = [];
  characters3B: ICharacter[] = [];
  charactersAtico: ICharacter[] = [];
  charactersPorteria: ICharacter[] = [];
  charactersVideoclub: ICharacter[] = [];
  characterOtros: ICharacter[] = [];

  // Propiedad para dividir los personajes de "Otros" en columnas
  characterOtrosColumns: ICharacter[][] = [];

  // Propiedades para saber si la tabla está llena
  isFilled1A: boolean = false;
  isFilled1B: boolean = false;
  isFilled2A: boolean = false;
  isFilled2B: boolean = false;
  isFilled3A: boolean = false;
  isFilled3B: boolean = false;
  isFilledAtico: boolean = false;
  isFilledPorteria: boolean = false;
  isFilledVideoclub: boolean = false;
  isFilledOtros: boolean = false;

  searchTerm: string = ''; // Para almacenar el término de búsqueda

  //#endregion

  constructor(private characterService: CharacterService) {}

  ngOnInit(): void {
    this.totalCharacters = this.characterService.getTotalCharacters();
    this.getCharactersByFloor();
    this.divideOtrosInColumns(); // Divide los personajes de "Otros" en 8 columnas
  }

  // Método para dividir los personajes en columnas
  private splitIntoColumns(
    characters: ICharacter[],
    columns: number
  ): ICharacter[][] {
    const result: ICharacter[][] = [];
    for (let i = 0; i < characters.length; i += columns) {
      result.push(characters.slice(i, i + columns));
    }
    return result;
  }

  // Llamada al método para dividir los personajes "Otros" en 8 columnas
  private divideOtrosInColumns(): void {
    this.characterOtrosColumns = this.splitIntoColumns(this.characterOtros, 5);
  }

  // Método para buscar personajes basados en el término de búsqueda
  searchCharacters(): void {
    const searchTermLower = this.searchTerm.toLowerCase();

    if (!searchTermLower) return;

    this.updateCharacterVisibility(
      this.characters1A,
      searchTermLower,
      'isFilled1A'
    );
    this.updateCharacterVisibility(
      this.characters1B,
      searchTermLower,
      'isFilled1B'
    );
    this.updateCharacterVisibility(
      this.characters2A,
      searchTermLower,
      'isFilled2A'
    );
    this.updateCharacterVisibility(
      this.characters2B,
      searchTermLower,
      'isFilled2B'
    );
    this.updateCharacterVisibility(
      this.characters3A,
      searchTermLower,
      'isFilled3A'
    );
    this.updateCharacterVisibility(
      this.characters3B,
      searchTermLower,
      'isFilled3B'
    );
    this.updateCharacterVisibility(
      this.charactersAtico,
      searchTermLower,
      'isFilledAtico'
    );
    this.updateCharacterVisibility(
      this.charactersPorteria,
      searchTermLower,
      'isFilledPorteria'
    );
    this.updateCharacterVisibility(
      this.charactersVideoclub,
      searchTermLower,
      'isFilledVideoclub'
    );
    this.updateCharacterVisibility(
      this.characterOtros,
      searchTermLower,
      'isFilledOtros'
    );

    if (this.foundMatch) {
      this.searchTerm = '';
      this.foundMatch = false;
    }
  }

  // Método para reiniciar el quiz
  resetQuiz(): void {
    this.points = 0; // Resetear el puntaje
    this.searchTerm = ''; // Limpiar el término de búsqueda
    this.foundMatch = false; // Restablecer la coincidencia encontrada

    // Reiniciar todos los personajes y las tablas
    this.resetCharacterVisibility(this.characters1A);
    this.resetCharacterVisibility(this.characters1B);
    this.resetCharacterVisibility(this.characters2A);
    this.resetCharacterVisibility(this.characters2B);
    this.resetCharacterVisibility(this.characters3A);
    this.resetCharacterVisibility(this.characters3B);
    this.resetCharacterVisibility(this.charactersAtico);
    this.resetCharacterVisibility(this.charactersPorteria);
    this.resetCharacterVisibility(this.charactersVideoclub);
    this.resetCharacterVisibility(this.characterOtros);

    // Reiniciar el estado de las tablas llenas
    this.isFilled1A = false;
    this.isFilled1B = false;
    this.isFilled2A = false;
    this.isFilled2B = false;
    this.isFilled3A = false;
    this.isFilled3B = false;
    this.isFilledAtico = false;
    this.isFilledPorteria = false;
    this.isFilledVideoclub = false;
    this.isFilledOtros = false;
  }

  giveUp(): void {
    // Mostrar todos los personajes (establecer `isShowing` a true)
    this.showAllCharacters(this.characters1A);
    this.showAllCharacters(this.characters1B);
    this.showAllCharacters(this.characters2A);
    this.showAllCharacters(this.characters2B);
    this.showAllCharacters(this.characters3A);
    this.showAllCharacters(this.characters3B);
    this.showAllCharacters(this.charactersAtico);
    this.showAllCharacters(this.charactersPorteria);
    this.showAllCharacters(this.charactersVideoclub);
    this.showAllCharacters(this.characterOtros);

    // Cambiar el estado de las tablas a "llenas"
    this.isFilled1A = !this.characters1A.some((char) => char.isMissing);
    this.isFilled1B = !this.characters1B.some((char) => char.isMissing);
    this.isFilled2A = !this.characters2A.some((char) => char.isMissing);
    this.isFilled2B = !this.characters2B.some((char) => char.isMissing);
    this.isFilled3A = !this.characters3A.some((char) => char.isMissing);
    this.isFilled3B = !this.characters3B.some((char) => char.isMissing);
    this.isFilledAtico = !this.charactersAtico.some((char) => char.isMissing);
    this.isFilledPorteria = !this.charactersPorteria.some(
      (char) => char.isMissing
    );
    this.isFilledVideoclub = !this.charactersVideoclub.some(
      (char) => char.isMissing
    );
    this.isFilledOtros = !this.characterOtros.some((char) => char.isMissing);
  }

  private showAllCharacters(characters: ICharacter[]): void {
    characters.forEach((character) => {
      character.isShowing = true;
    });
  }

  // Método para obtener los personajes de cada piso
  private getCharactersByFloor(): void {
    this.characters1A = this.characterService.getCharactersByFloorName('1A');
    this.characters1B = this.characterService.getCharactersByFloorName('1B');
    this.characters2A = this.characterService.getCharactersByFloorName('2A');
    this.characters2B = this.characterService.getCharactersByFloorName('2B');
    this.characters3A = this.characterService.getCharactersByFloorName('3A');
    this.characters3B = this.characterService.getCharactersByFloorName('3B');
    this.charactersAtico =
      this.characterService.getCharactersByFloorName('Atico');
    this.charactersPorteria =
      this.characterService.getCharactersByFloorName('Porteria');
    this.charactersVideoclub =
      this.characterService.getCharactersByFloorName('Videoclub');
    this.characterOtros =
      this.characterService.getCharactersByFloorName('Otros');

    this.sortCharactersByFullName();
  }

  // Método para ordenar los personajes por nombre
  private sortCharactersByFullName(): void {
    this.characters1A.sort((a, b) => a.fullName.localeCompare(b.fullName));
    this.characters1B.sort((a, b) => a.fullName.localeCompare(b.fullName));
    this.characters2A.sort((a, b) => a.fullName.localeCompare(b.fullName));
    this.characters2B.sort((a, b) => a.fullName.localeCompare(b.fullName)); // Esta ya no se divide
    this.characters3A.sort((a, b) => a.fullName.localeCompare(b.fullName));
    this.characters3B.sort((a, b) => a.fullName.localeCompare(b.fullName));
    this.charactersAtico.sort((a, b) => a.fullName.localeCompare(b.fullName));
    this.charactersPorteria.sort((a, b) =>
      a.fullName.localeCompare(b.fullName)
    );
    this.charactersVideoclub.sort((a, b) =>
      a.fullName.localeCompare(b.fullName)
    );
    this.characterOtros.sort((a, b) => a.fullName.localeCompare(b.fullName)); // Igual para "Otros"
  }

  // Método para resetear la visibilidad de los personajes
  private resetCharacterVisibility(characters: ICharacter[]): void {
    characters.forEach((character) => {
      character.isShowing = false;
      character.isMissing = true;
    });
  }

  // Método para actualizar la visibilidad de los personajes al buscar
  private updateCharacterVisibility(
    characters: ICharacter[],
    searchTerm: string,
    tableFilled: string
  ): void {
    characters.forEach((character) => {
      if (character.isShowing === false) {
        const matchFound = character.posibilyInputs.some(
          (input) => input.toLowerCase() === searchTerm
        );
        if (matchFound) {
          character.isShowing = true;
          character.isMissing = false;
          this.foundMatch = true;
          this.points++;
        }
      }
    });

    // Cuando todos los personajes de una tabla se muestran, marcamos la tabla como llena
    if (characters.every((character) => character.isShowing)) {
      (this as any)[tableFilled] = true; // Cambiar el estado de la tabla a "llena"
    }
  }
}
