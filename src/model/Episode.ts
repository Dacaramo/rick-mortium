export interface Episode {
  id: string;
  name: string;
  airDate: string;
  episode: string;
  characters: Array<string>;
  url: string;
  created: string;
}

export interface EpisodeFilters {
  name: string;
  episode: string;
}
