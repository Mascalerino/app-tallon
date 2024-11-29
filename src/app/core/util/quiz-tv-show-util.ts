import { ICharacter } from 'src/app/models/quiz-tv-shows/character.model';
import { IEpisode } from 'src/app/models/quiz-tv-shows/episode.model';

/**
 * Metodo para dividir los datos de una tabla en columnas
 * @param data
 * @param columns
 * @returns
 */
export const splitDataIntoColumns = <T extends ICharacter | IEpisode>(
  data: T[],
  columns: number
): T[][] => {
  const result: T[][] = [];
  for (let i = 0; i < data.length; i += columns) {
    result.push(data.slice(i, i + columns));
  }
  return result;
};

/**
 * Metodo para mostrar todos los datos
 * @param data
 */
export const showAllData = (data: (ICharacter | IEpisode)[]): void => {
  data.forEach((element) => {
    element.isShowing = true;
  });
};

/**
 * Metodo para ocultar todos los datos
 * @param data
 */
export const hideAllData = (data: (ICharacter | IEpisode)[]): void => {
  data.forEach((element) => {
    element.isShowing = false;
    element.isMissing = true;
  });
};
