import { useToggleEngineMutation, useDriveMutation } from '../../api/engineApi';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { startCar, finishCar, breakCar, resetCar } from '../race/raceSlice';

function useCarEngine(id: number) {
  const dispatch = useAppDispatch();
  const [toggleEngine] = useToggleEngineMutation();
  const [drive] = useDriveMutation();

  const raceState = useAppSelector((state) => state.race.cars[id]);
  const mode = raceState?.mode ?? 'idle';
  const duration = raceState?.duration ?? 0;
  const progress = raceState?.progress ?? null;

  const start = async () => {
    const { velocity, distance } = await toggleEngine({ id, status: 'started' }).unwrap();
    dispatch(startCar({ id, duration: distance / velocity }));
    try {
      await drive(id).unwrap();
      dispatch(finishCar(id));
    } catch {
      dispatch(breakCar(id));
    }
  };

  const stop = async () => {
    await toggleEngine({ id, status: 'stopped' }).unwrap();
    dispatch(resetCar(id));
  };

  return {
    mode, duration, progress, start, stop,
  };
}

export default useCarEngine;
