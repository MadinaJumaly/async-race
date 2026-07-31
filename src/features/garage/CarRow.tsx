import { useDeleteCarMutation } from '../../api/garageApi';
import { useDeleteWinnerMutation } from '../../api/winnersApi';
import { useAppDispatch } from '../../app/hooks';
import { selectCar, clearSelection } from './garageSlice';
import useCarEngine from './useCarEngine';
import CarTrack from './CarTrack';
import type { Car } from '../../types';

interface CarRowProps {
  car: Car;
}

function CarRow({ car }: CarRowProps) {
  const dispatch = useAppDispatch();
  const [deleteCar] = useDeleteCarMutation();
  const [deleteWinner] = useDeleteWinnerMutation();
  const {
    carRef, mode, duration, frozenLeft, start, stop,
  } = useCarEngine(car.id);

  const carStyle = {
    transitionDuration: `${duration}ms`,
    ...(frozenLeft !== null && { left: `${frozenLeft}px` }),
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
      <div className="car-row__engine">
        <button type="button" onClick={start} disabled={mode !== 'idle'}>A</button>
        <button type="button" onClick={stop} disabled={mode === 'idle'}>B</button>
      </div>
      <CarTrack
        carRef={carRef}
        mode={mode}
        style={carStyle}
        color={car.color}
        name={car.name}
      />
    </li>
  );
}

export default CarRow;
