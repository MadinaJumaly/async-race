import type { AppDispatch } from '../../app/store';
import { engineApi } from '../../api/engineApi';
import { startCar, finishCar, breakCar, resetCar, declareWinner } from './raceSlice';

export interface RaceResult {
  id: number;
  time: number;
}

export async function startEngine(
  id: number,
  dispatch: AppDispatch,
): Promise<RaceResult | null> {
  const { velocity, distance } = await dispatch(
    engineApi.endpoints.toggleEngine.initiate({ id, status: 'started' }),
  ).unwrap();

  const duration = distance / velocity;
  dispatch(startCar({ id, duration }));

  try {
    await dispatch(engineApi.endpoints.drive.initiate(id)).unwrap();
    dispatch(finishCar(id));
    dispatch(declareWinner(id));
    return { id, time: duration / 1000 };
  } catch {
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
