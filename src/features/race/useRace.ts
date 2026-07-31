import { useAppDispatch } from '../../app/hooks';
import { startEngine, stopEngine, type RaceResult } from './engineActions';
import { setRaceStatus, declareWinner, resetRace as resetRaceAction } from './raceSlice';
import type { Car } from '../../types';

export function useRace(cars: Car[]) {
  const dispatch = useAppDispatch();

  const startRace = async (): Promise<void> => {
    dispatch(resetRaceAction());
    dispatch(setRaceStatus('racing'));

    const results = await Promise.all(cars.map((car) => startEngine(car.id, dispatch)));

    const finishers = results.filter((r): r is RaceResult => r !== null);
    if (finishers.length > 0) {
      const winner = finishers.reduce((best, r) => (r.time < best.time ? r : best));
      dispatch(declareWinner(winner.id));
    }
  };

  const reset = async (): Promise<void> => {
    await Promise.all(cars.map((car) => stopEngine(car.id, dispatch)));
    dispatch(resetRaceAction());
    dispatch(setRaceStatus('idle'));
  };

  return { startRace, reset };
}
