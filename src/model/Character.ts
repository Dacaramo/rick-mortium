export interface Character {
  id: string;
  name: string;
  status: string;
  species: string;
  type: Array<string>;
  gender: string;
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
