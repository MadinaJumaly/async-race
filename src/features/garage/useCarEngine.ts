import { useRef, useState } from 'react';
import { useToggleEngineMutation, useDriveMutation } from '../../api/engineApi';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { startCar, breakCar, resetCar } from '../race/raceSlice';

function useCarEngine(id: number) {
  const dispatch = useAppDispatch();
  const carRef = useRef<HTMLDivElement>(null);
  const [frozenLeft, setFrozenLeft] = useState<number | null>(null);
  const [toggleEngine] = useToggleEngineMutation();
  const [drive] = useDriveMutation();

  const raceState = useAppSelector((state) => state.race.cars[id]);
  const mode = raceState?.mode ?? 'idle';
  const duration = raceState?.duration ?? 0;

  const freezeAtCurrentPosition = () => {
    const carEl = carRef.current;
    const trackEl = carEl?.parentElement;
    if (!carEl || !trackEl) return;
    setFrozenLeft(carEl.getBoundingClientRect().left - trackEl.getBoundingClientRect().left);
  };

  const start = async () => {
    const { velocity, distance } = await toggleEngine({ id, status: 'started' }).unwrap();
    setFrozenLeft(null);
    dispatch(startCar({ id, duration: distance / velocity }));
    try {
      await drive(id).unwrap();
    } catch {
      freezeAtCurrentPosition();
      dispatch(breakCar(id));
    }
  };

  const stop = async () => {
    await toggleEngine({ id, status: 'stopped' }).unwrap();
    setFrozenLeft(null);
    dispatch(resetCar(id));
  };

  return { carRef, mode, duration, frozenLeft, start, stop };
}

export default useCarEngine;
