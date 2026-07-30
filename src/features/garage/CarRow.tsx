import { useDeleteCarMutation } from '../../api/garageApi';
import { useDeleteWinnerMutation } from '../../api/winnersApi';
import { useAppDispatch } from '../../app/hooks';
import { selectCar, clearSelection } from './garageSlice';
import CarIcon from '../../components/CarIcon';
import type { Car } from '../../types';

interface CarRowProps {
  car: Car;
}

function CarRow({ car }: CarRowProps) {
  const dispatch = useAppDispatch();
  const [deleteCar] = useDeleteCarMutation();
  const [deleteWinner] = useDeleteWinnerMutation();

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
        <button type="button">A</button>
        <button type="button">B</button>
      </div>
      <div className="car-row__track">
        <CarIcon color={car.color} size={40} />
        <span className="car-row__name">{car.name}</span>
      </div>
    </li>
  );
}

export default CarRow;
