import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type CarMode = 'idle' | 'driving' | 'finished' | 'broken';

export interface CarRaceState {
  mode: CarMode;
  duration: number;
  /** Wall-clock time the car started driving, used to derive its frozen position. */
  startedAt: number | null;
  /** Fraction of the track covered when the car broke down, 0..1. */
  progress: number | null;
}

const idleCar = (): CarRaceState => ({
  mode: 'idle',
  duration: 0,
  startedAt: null,
  progress: null,
});

const progressOf = (car: CarRaceState): number => {
  if (car.startedAt === null || car.duration <= 0) return 0;
  return Math.min((Date.now() - car.startedAt) / car.duration, 1);
};

interface RaceState {
  status: 'idle' | 'racing';
  cars: Record<number, CarRaceState>;
  winnerId: number | null;
  /** Bumped whenever a race starts or is reset; stale async work checks it before dispatching. */
  generation: number;
}

const initialState: RaceState = {
  status: 'idle',
  cars: {},
  winnerId: null,
  generation: 0,
};

const clearCars = (state: RaceState): void => {
  Object.keys(state.cars).forEach((key) => {
    state.cars[Number(key)] = idleCar();
  });
};

const raceSlice = createSlice({
  name: 'race',
  initialState,
  reducers: {
    startCar(state, action: PayloadAction<{ id: number; duration: number }>) {
      const { id, duration } = action.payload;
      state.cars[id] = {
        mode: 'driving', duration, startedAt: Date.now(), progress: null,
      };
    },
    finishCar(state, action: PayloadAction<number>) {
      const car = state.cars[action.payload];
      if (car) car.mode = 'finished';
    },
    breakCar(state, action: PayloadAction<number>) {
      const car = state.cars[action.payload];
      if (!car) return;
      car.progress = progressOf(car);
      car.mode = 'broken';
    },
    resetCar(state, action: PayloadAction<number>) {
      state.cars[action.payload] = idleCar();
    },
    setRaceStatus(state, action: PayloadAction<'idle' | 'racing'>) {
      state.status = action.payload;
    },
    declareWinner(state, action: PayloadAction<number>) {
      if (state.winnerId === null) state.winnerId = action.payload;
    },
    newRace(state) {
      state.generation += 1;
      state.status = 'racing';
      state.winnerId = null;
      clearCars(state);
    },
    resetRace(state) {
      state.generation += 1;
      state.status = 'idle';
      state.winnerId = null;
      clearCars(state);
    },
  },
});

export const {
  startCar,
  finishCar,
  breakCar,
  resetCar,
  setRaceStatus,
  declareWinner,
  newRace,
  resetRace,
} = raceSlice.actions;
export default raceSlice.reducer;
