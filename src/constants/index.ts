export const BASE_URL = 'http://127.0.0.1:3000';

export const CARS_PER_PAGE = 7;
export const WINNERS_PER_PAGE = 10;
export const RANDOM_CARS_BATCH = 100;

export const RACE_TRACK_MIN_WIDTH_PX = 500; 
export const NAME_MAX_LENGTH = 30;

export const CAR_BRANDS = [
  'Tesla', 'Ford', 'Toyota', 'BMW', 'Audi',
  'Honda', 'Chevrolet', 'Nissan', 'Porsche', 'Mazda',
] as const;

export const CAR_MODELS = [
  'Model S', 'Mustang', 'Corolla', 'X5', 'A4',
  'Civic', 'Camaro', 'GT-R', '911', 'MX-5',
] as const;

export const DEFAULT_CAR_COLOR = '#ffffff';

export const MS_PER_SECOND = 1000;
export const TIME_DECIMALS = 100; // round to 2 dp

export const TRACK_END_OFFSET_PX = 60;
