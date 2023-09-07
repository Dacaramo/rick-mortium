import { Character, CharacterFilters } from '../model/Character';
import { Episode, EpisodeFilters } from '../model/Episode';
import { Location, LocationFilters } from '../model/Location';

import { axiosInstance } from './axiosConfig';

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
  filters: Partial<CharacterFilters>,
  pageNumber: number
): Promise<BackendResponse<Character>> => {
  const axiosResponse = await axiosInstance.get('/character', {
    params: { ...filters, page: pageNumber },
  });
  return axiosResponse.data as BackendResponse<Character>;
};

export const getLocations = async (
  filters: Partial<LocationFilters>,
  pageNumber: number
): Promise<BackendResponse<Location>> => {
  const axiosResponse = await axiosInstance.get('/location', {
    params: { ...filters, page: pageNumber },
  });
  return axiosResponse.data as BackendResponse<Location>;
};

export const getEpisodes = async (
  filters: Partial<EpisodeFilters>,
  pageNumber: number
): Promise<BackendResponse<Episode>> => {
  const axiosResponse = await axiosInstance.get('/episode', {
    params: { ...filters, page: pageNumber },
  });
  return axiosResponse.data as BackendResponse<Episode>;
};
