import CarRow from './CarRow';
import type { Car } from '../../types';

interface CarListProps {
  cars: Car[];
}

function CarList({ cars }: CarListProps) {
  if (cars.length === 0) return <p className="garage__empty">No cars in the garage.</p>;

  return (
    <ul className="garage__list">
      {cars.map((car) => (
        <CarRow key={car.id} car={car} />
      ))}
    </ul>
  );
}

export default CarList;
