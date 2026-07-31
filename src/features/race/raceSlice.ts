import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type CarMode = 'idle' | 'driving' | 'finished' | 'broken';

export interface CarRaceState {
  mode: CarMode;
  duration: number;
}

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
      state.cars[id] = { mode: 'driving', duration };
    },
    finishCar(state, action: PayloadAction<number>) {
      const car = state.cars[action.payload];
      if (car) car.mode = 'finished';
    },
    breakCar(state, action: PayloadAction<number>) {
      const car = state.cars[action.payload];
      if (car) car.mode = 'broken';
    },
    resetCar(state, action: PayloadAction<number>) {
      state.cars[action.payload] = { mode: 'idle', duration: 0 };
    },
  },
});

export const { startCar, finishCar, breakCar, resetCar } = raceSlice.actions;
export default raceSlice.reducer;
