export interface Location {
  id: string;
  name: string;
  type: string;
  dimension: string;
  residents: Array<string>;
  url: string;
  created: string;
}

export interface LocationFilters {
  name: string;
  type: string;
  dimension: string;
}
