import axios from "axios";
import type { ICharacter, ICharacterInfo } from "../Interface/interface";
/**
 *
 * @returns This code might show an error; it is recommended to use the "Try and Catch"
 */
export const fetchCharacters = async (): Promise<{
  info: ICharacterInfo;
  results: ICharacter[];
} | null> => {
  const response = await axios.get(`https://rickandmortyapi.com/api/character`);
  return response.data;
};
