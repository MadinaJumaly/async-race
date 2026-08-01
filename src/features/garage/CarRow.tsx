import { useDeleteCarMutation } from '../../api/garageApi';
import { useDeleteWinnerMutation } from '../../api/winnersApi';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectCar, clearSelection } from './garageSlice';
import useCarEngine from './useCarEngine';
import EngineButtons from './EngineButtons';
import CarTrack from './CarTrack';
import { TRACK_END_OFFSET_PX } from '../../constants';
import type { Car } from '../../types';

interface CarRowProps {
  car: Car;
}

function CarRow({ car }: CarRowProps) {
  const dispatch = useAppDispatch();
  const [deleteCar] = useDeleteCarMutation();
  const [deleteWinner] = useDeleteWinnerMutation();
  const raceStatus = useAppSelector((state) => state.race.status);
  const {
    mode, duration, progress, start, stop,
  } = useCarEngine(car.id);

  const isFrozen = mode === 'broken' && progress !== null;
  const carStyle = {
    transitionDuration: `${duration}ms`,
    ...(isFrozen && { left: `calc(${progress} * (100% - ${TRACK_END_OFFSET_PX}px))` }),
  };

  const handleSelect = () => {
    dispatch(selectCar({ id: car.id, draft: { name: car.name, color: car.color } }));
  };

  const handleRemove = async () => {
    await deleteCar(car.id);
    await deleteWinner(car.id).catch(() => undefined);
    dispatch(clearSelection());
  };

  return (
    <li className="car-row">
      <div className="car-row__controls">
        <button type="button" onClick={handleSelect}>Select</button>
        <button type="button" onClick={handleRemove}>Remove</button>
      </div>
      <EngineButtons mode={mode} raceStatus={raceStatus} onStart={start} onStop={stop} />
      <CarTrack mode={mode} style={carStyle} color={car.color} name={car.name} />
    </li>
  );
}

export default CarRow;
