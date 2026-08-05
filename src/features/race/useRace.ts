import { useAppDispatch, useAppStore } from '../../app/hooks';
import { startEngine, stopEngine, type RaceResult } from './engineActions';
import { setRaceStatus, newRace, resetRace as resetRaceAction } from './raceSlice';
import { saveWinner } from '../winners/saveWinner';
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

    const { winnerId } = store.getState().race;
    if (winnerId !== null) {
      const winnerResult = results.find((r): r is RaceResult => r?.id === winnerId);
      if (winnerResult) {
        await saveWinner(winnerResult.id, winnerResult.time, dispatch);
      }
    }

    dispatch(setRaceStatus('idle'));
  };

  const reset = async (): Promise<void> => {
    dispatch(resetRaceAction());
    await Promise.all(cars.map((car) => stopEngine(car.id, dispatch)));
  };

  return { startRace, reset };
}
