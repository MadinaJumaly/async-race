import type { AppDispatch } from '../../app/store';
import { engineApi } from '../../api/engineApi';
import { startCar, finishCar, breakCar, resetCar, declareWinner } from './raceSlice';

export interface RaceResult {
  id: number;
  time: number;
}

/** Identifies the race a call belongs to, so results from an abandoned race can be dropped. */
export interface RaceToken {
  /** The generation this call was started with. */
  generation: number;
  /** Reads the store's current generation at await-resume time. */
  getGeneration: () => number;
}

export async function startEngine(
  id: number,
  dispatch: AppDispatch,
  token: RaceToken,
): Promise<RaceResult | null> {
  const isStale = (): boolean => token.getGeneration() !== token.generation;

  const { velocity, distance } = await dispatch(
    engineApi.endpoints.toggleEngine.initiate({ id, status: 'started' }),
  ).unwrap();
  if (isStale()) return null;

  const duration = distance / velocity;
  dispatch(startCar({ id, duration }));

  try {
    await dispatch(engineApi.endpoints.drive.initiate(id)).unwrap();
    if (isStale()) return null;
    dispatch(finishCar(id));
    dispatch(declareWinner(id));
    return { id, time: duration / 1000 };
  } catch {
    if (isStale()) return null;
    dispatch(breakCar(id));
    return null;
  }
}

export async function stopEngine(id: number, dispatch: AppDispatch): Promise<void> {
  await dispatch(
    engineApi.endpoints.toggleEngine.initiate({ id, status: 'stopped' }),
  ).unwrap();
  dispatch(resetCar(id));
}
