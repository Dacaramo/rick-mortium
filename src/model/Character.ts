export interface CharacterFilters {
  name: string;
  status: CharacterStatus;
  species: string;
  type: string;
  gender: CharacterGender;
}

export interface Character {
  id: string;
  name: string;
  status: CharacterStatus;
  species: string;
  type: Array<string>;
  gender: CharacterGender;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: Array<string>;
  url: string;
  created: string;
}

export type CharacterStatus = 'alive' | 'dead' | 'unknown';
export type CharacterGender = 'female' | 'male' | 'genderless' | 'unknown';
