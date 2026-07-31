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
}

const initialState: RaceState = {
  status: 'idle',
  cars: {},
  winnerId: null,
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
    resetRace(state) {
      state.status = 'idle';
      state.winnerId = null;
      Object.keys(state.cars).forEach((key) => {
        state.cars[Number(key)] = idleCar();
      });
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
  resetRace,
} = raceSlice.actions;
export default raceSlice.reducer;
