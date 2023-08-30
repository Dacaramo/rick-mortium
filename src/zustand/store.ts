import { Character } from '../model/Character';
import { Episode } from '../model/Episode';
import { Location } from '../model/Location';
import { create } from 'zustand';

interface StoreState {
  characters: Array<Character>;
  locations: Array<Location>;
  episodes: Array<Episode>;
  saveCharacter: (character: Character) => void;
  saveLocation: (location: Location) => void;
  saveEpisode: (episode: Episode) => void;
  removeSavedCharacter: (index: number) => void;
  removeSavedLocation: (index: number) => void;
  removeSavedEpisode: (index: number) => void;
}

export const useStore = create<StoreState>()((set) => {
  return {
    characters: [],
    locations: [],
    episodes: [],
    saveCharacter: (character: Character) => {
      return set((state) => {
        return {
          characters: [...state.characters, character],
        };
      });
    },
    saveLocation: (location: Location) => {
      return set((state) => {
        return {
          locations: [...state.locations, location],
        };
      });
    },
    saveEpisode: (episode: Episode) => {
      return set((state) => {
        return {
          episodes: [...state.episodes, episode],
        };
      });
    },
    removeSavedCharacter: (index: number) => {
      return set((state) => {
        return {
          characters: state.characters.filter((_, i) => i !== index),
        };
      });
    },
    removeSavedLocation: (index: number) => {
      return set((state) => {
        return {
          locations: state.locations.filter((_, i) => i !== index),
        };
      });
    },
    removeSavedEpisode: (index: number) => {
      return set((state) => {
        return {
          episodes: state.episodes.filter((_, i) => i !== index),
        };
      });
    },
  };
});
