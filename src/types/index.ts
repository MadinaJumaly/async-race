export interface Car {
  id: number;
  name: string;
  color: string;
}

export type CarDraft = Omit<Car, 'id'>;

export interface Winner {
  id: number;
  wins: number;
  time: number; 
}

export interface EngineResponse {
  velocity: number;
  distance: number;
}

export type EngineStatus = 'started' | 'stopped' | 'drive';

export type WinnersSortField = 'wins' | 'time';
export type SortOrder = 'ASC' | 'DESC';

export interface Paginated<T> {
  items: T[];
  totalCount: number;
}
