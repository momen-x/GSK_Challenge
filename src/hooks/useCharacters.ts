import { useQuery } from "@tanstack/react-query";
import { characterApi } from "../services/api";

export const useCharacters = (page: number) => {
  return useQuery({
    queryKey: ["characters", page],
    queryFn: () => characterApi.getCharacters(page),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export const useSearchCharacters = (searchTerm: string) => {
  return useQuery({
    queryKey: ["characters", "search", searchTerm],
    queryFn: () => characterApi.searchCharacters(searchTerm),
    enabled: searchTerm.length > 0,
    staleTime: 5 * 60 * 1000,
  });
};

// Hook for fetching single character
export const useCharacter = (id: string | undefined) => {
  return useQuery({
    queryKey: ["character", id],
    queryFn: () => characterApi.getCharacterById(id!),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

export const useEpisodes = (episodeUrls: string[]) => {
  return useQuery({
    queryKey: ["episodes", episodeUrls],
    queryFn: () => characterApi.getEpisodes(episodeUrls),
    enabled: episodeUrls.length > 0,
    staleTime: 10 * 60 * 1000,
  });
};
