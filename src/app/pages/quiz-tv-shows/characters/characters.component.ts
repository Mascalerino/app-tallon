import { Component, OnInit } from '@angular/core';
import {
  hideAllData,
  showAllData,
  showAllDataAndNoMissing,
  splitDataIntoColumns,
} from 'src/app/core/util/quiz-tv-show-util';
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
  isPanelVisible: boolean = true;
  panelTitle: string = '';
  panelText: string = '';
  panelText2: string = '';

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
    this.characterOtrosColumns = splitDataIntoColumns(this.characterOtros, 5);
    this.panelTitle = 'Instrucciones';
    this.panelText =
      'Encuentra todos los personajes principales y secundarios de Aqui No Hay Quien Viva.';
    this.panelText2 =
      'Escribe el nombre/apellido de un personaje en el cuadro de búsqueda para encontrarlo.';
  }

  closePanel(): void {
    this.isPanelVisible = false;
  }

  /**
   * Busca los personajes que coinciden con el término de búsqueda
   * @returns
   */
  searchCharacters(): void {
    const searchTermLower = this.searchTerm.toLowerCase();

    if (!searchTermLower) return;

    const characterGroups = [
      { data: this.characters1A, tableFilled: 'isFilled1A' },
      { data: this.characters1B, tableFilled: 'isFilled1B' },
      { data: this.characters2A, tableFilled: 'isFilled2A' },
      { data: this.characters2B, tableFilled: 'isFilled2B' },
      { data: this.characters3A, tableFilled: 'isFilled3A' },
      { data: this.characters3B, tableFilled: 'isFilled3B' },
      { data: this.charactersAtico, tableFilled: 'isFilledAtico' },
      { data: this.charactersPorteria, tableFilled: 'isFilledPorteria' },
      { data: this.charactersVideoclub, tableFilled: 'isFilledVideoclub' },
      { data: this.characterOtros, tableFilled: 'isFilledOtros' },
    ];

    characterGroups.forEach((group) => {
      this.updateCharacterVisibility(
        group.data,
        searchTermLower,
        group.tableFilled
      );
    });

    if (this.foundMatch) {
      this.searchTerm = '';
      this.foundMatch = false;
    }
  }

  /**
   * Reinicia el quiz
   */
  resetQuiz(): void {
    this.points = 0; // Resetear el puntaje
    this.searchTerm = ''; // Limpiar el término de búsqueda
    this.foundMatch = false; // Restablecer la coincidencia encontrada

    // Reiniciar todos los personajes y las tablas
    hideAllData(this.characters1A);
    hideAllData(this.characters1B);
    hideAllData(this.characters2A);
    hideAllData(this.characters2B);
    hideAllData(this.characters3A);
    hideAllData(this.characters3B);
    hideAllData(this.charactersAtico);
    hideAllData(this.charactersPorteria);
    hideAllData(this.charactersVideoclub);
    hideAllData(this.characterOtros);

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

  /**
   * Muestra todos los personajes y los faltantes
   */
  giveUp(): void {
    // Mostrar todos los personajes (establecer `isShowing` a true)
    showAllData(this.characters1A);
    showAllData(this.characters1B);
    showAllData(this.characters2A);
    showAllData(this.characters2B);
    showAllData(this.characters3A);
    showAllData(this.characters3B);
    showAllData(this.charactersAtico);
    showAllData(this.charactersPorteria);
    showAllData(this.charactersVideoclub);
    showAllData(this.characterOtros);

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

  /**
   * Muestra todos los personajes menos los de "Otros" marca las tablas como llenas
   * y actualiza el puntaje
   */
  onlyPlayOthers(): void {
    showAllDataAndNoMissing(this.characters1A);
    showAllDataAndNoMissing(this.characters1B);
    showAllDataAndNoMissing(this.characters2A);
    showAllDataAndNoMissing(this.characters2B);
    showAllDataAndNoMissing(this.characters3A);
    showAllDataAndNoMissing(this.characters3B);
    showAllDataAndNoMissing(this.charactersAtico);
    showAllDataAndNoMissing(this.charactersPorteria);
    showAllDataAndNoMissing(this.charactersVideoclub);

    this.isFilled1A = true;
    this.isFilled1B = true;
    this.isFilled2A = true;
    this.isFilled2B = true;
    this.isFilled3A = true;
    this.isFilled3B = true;
    this.isFilledAtico = true;
    this.isFilledPorteria = true;
    this.isFilledVideoclub = true;

    this.points = this.totalCharacters - this.characterOtros.length;
  }

  /**
   * Obtiene los personajes por piso
   */
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
  /**
   * Ordena los personajes por nombre completo
   */
  private sortCharactersByFullName(): void {
    const characterGroups = [
      this.characters1A,
      this.characters1B,
      this.characters2A,
      this.characters2B,
      this.characters3A,
      this.characters3B,
      this.charactersAtico,
      this.charactersPorteria,
      this.charactersVideoclub,
      this.characterOtros,
    ];

    characterGroups.forEach((group) => {
      group.sort((a, b) => a.fullName.localeCompare(b.fullName));
    });
  }

  /**
   * Muetsra los personajes que coinciden con el término de búsqueda
   * @param characters
   * @param searchTerm
   * @param tableFilled
   */
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
