import { useAppDispatch, useAppStore } from '../../app/hooks';
import { startEngine, stopEngine, type RaceResult } from './engineActions';
import {
  setRaceStatus, declareWinner, newRace, resetRace as resetRaceAction,
} from './raceSlice';
import type { Car } from '../../types';

export function useRace(cars: Car[]) {
  const dispatch = useAppDispatch();
  const store = useAppStore();
  const getGeneration = (): number => store.getState().race.generation;

  const startRace = async (): Promise<void> => {
    dispatch(newRace());
    const generation = getGeneration();
    const token = { generation, getGeneration };

    const results = await Promise.all(
      cars.map((car) => startEngine(car.id, dispatch, token)),
    );
    if (getGeneration() !== generation) return;

    const finishers = results.filter((r): r is RaceResult => r !== null);
    if (finishers.length > 0) {
      const winner = finishers.reduce((best, r) => (r.time < best.time ? r : best));
      dispatch(declareWinner(winner.id));
    }

    dispatch(setRaceStatus('idle'));
  };

  const reset = async (): Promise<void> => {
    dispatch(resetRaceAction());
    await Promise.all(cars.map((car) => stopEngine(car.id, dispatch)));
  };

  return { startRace, reset };
}
