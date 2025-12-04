import axios from "axios";
import { domin } from "../Utils/Domin";
import type { ICharacter, ICharacterResponse, IEpisode } from "../Interface/interface";

export const characterApi = {
  //to characters list
  getCharacters: async (page: number): Promise<ICharacterResponse> => {
    const { data } = await axios.get(`${domin}/character?page=${page}`);
    return data;
  },

  //to search characters
  searchCharacters: async (name: string): Promise<ICharacterResponse> => {
    const { data } = await axios.get(`${domin}/character?name=${name}`);
    return data;
  },

  //to character details
  getCharacterById: async (id: string): Promise<ICharacter> => {
    const { data } = await axios.get(`${domin}/character/${id}`);
    return data;
  },

  getEpisodes: async (episodeUrls: string[]) : Promise<IEpisode[]> => {
    const episodeIds = episodeUrls.map((url) => url.split("/").pop());
    const episodeRequests = episodeIds.map((id) =>
      axios.get(`${domin}/episode/${id}`)
    );
    const responses = await Promise.all(episodeRequests);
    return responses.map((res) => res.data);
  },
};
