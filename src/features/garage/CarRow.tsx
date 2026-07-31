import { useRef } from 'react';
import { useDeleteCarMutation } from '../../api/garageApi';
import { useDeleteWinnerMutation } from '../../api/winnersApi';
import { useToggleEngineMutation, useDriveMutation } from '../../api/engineApi';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectCar, clearSelection } from './garageSlice';
import { startCar, breakCar, resetCar } from '../../features/race/raceSlice';
import CarIcon from '../../components/CarIcon';
import type { Car } from '../../types';

interface CarRowProps {
  car: Car;
}

function CarRow({ car }: CarRowProps) {
  const dispatch = useAppDispatch();
  const carRef = useRef<HTMLDivElement>(null);

  const [deleteCar] = useDeleteCarMutation();
  const [deleteWinner] = useDeleteWinnerMutation();
  const [toggleEngine] = useToggleEngineMutation();
  const [drive] = useDriveMutation();

  const raceState = useAppSelector((state) => state.race.cars[car.id]);
  const mode = raceState?.mode ?? 'idle';
  const duration = raceState?.duration ?? 0;

  const handleSelect = () => {
    dispatch(selectCar({ id: car.id, draft: { name: car.name, color: car.color } }));
  };

  const handleRemove = async () => {
    await deleteCar(car.id);
    await deleteWinner(car.id).catch(() => undefined);
    dispatch(clearSelection());
  };

  const handleStart = async () => {
    const { velocity, distance } = await toggleEngine({ id: car.id, status: 'started' }).unwrap();
    dispatch(startCar({ id: car.id, duration: distance / velocity }));
    try {
      await drive(car.id).unwrap();
    } catch {
      dispatch(breakCar(car.id));
    }
  };

  const handleStop = async () => {
    await toggleEngine({ id: car.id, status: 'stopped' }).unwrap();
    dispatch(resetCar(car.id));
  };

  return (
    <li className="car-row">
      <div className="car-row__controls">
        <button type="button" onClick={handleSelect}>Select</button>
        <button type="button" onClick={handleRemove}>Remove</button>
      </div>
      <div className="car-row__engine">
        <button type="button" onClick={handleStart} disabled={mode !== 'idle'}>A</button>
        <button type="button" onClick={handleStop} disabled={mode === 'idle'}>B</button>
      </div>
      <div className="car-row__track">
        <div
          ref={carRef}
          className={`car-row__car car-row__car--${mode}`}
          style={{ transitionDuration: `${duration}ms` }}
        >
          <CarIcon color={car.color} size={40} />
        </div>
        <span className="car-row__name">{car.name}</span>
      </div>
    </li>
  );
}

export default CarRow;
