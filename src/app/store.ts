import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice';
import garageReducer from '../features/garage/garageSlice';
import raceReducer from '../features/race/raceSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    garage: garageReducer,
    race: raceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
