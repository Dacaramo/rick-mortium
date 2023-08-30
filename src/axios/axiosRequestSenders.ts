import { CharacterFilters, Character } from '../model/Character';
import { Episode, EpisodeFilters } from '../model/Episode';
import { Location, LocationFilters } from '../model/Location';
import { axiosInstance } from './axiosInstance';

interface BackendResponse<T> {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Array<T>;
}

export const getCharacters = async (
  filters: Partial<CharacterFilters>
): Promise<BackendResponse<Character>> => {
  const axiosResponse = await axiosInstance.get('/character', {
    params: filters,
  });
  return axiosResponse.data as BackendResponse<Character>;
};

export const getLocations = async (
  filters: LocationFilters
): Promise<BackendResponse<Location>> => {
  const axiosResponse = await axiosInstance.get('/location', {
    params: filters,
  });
  return axiosResponse.data as BackendResponse<Location>;
};

export const getEpisodes = async (
  filters: EpisodeFilters
): Promise<BackendResponse<Episode>> => {
  const axiosResponse = await axiosInstance.get('/episode', {
    params: filters,
  });
  return axiosResponse.data as BackendResponse<Episode>;
};
