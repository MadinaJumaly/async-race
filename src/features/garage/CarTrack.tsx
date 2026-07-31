import type { CSSProperties } from 'react';
import CarIcon from '../../components/CarIcon';
import type { CarMode } from '../race/raceSlice';

interface CarTrackProps {
  mode: CarMode;
  style: CSSProperties;
  color: string;
  name: string;
}

function CarTrack({
  mode, style, color, name,
}: CarTrackProps) {
  return (
    <div className="car-row__track">
      <div className={`car-row__car car-row__car--${mode}`} style={style}>
        <CarIcon color={color} size={40} />
      </div>
      <span className="car-row__name">{name}</span>
    </div>
  );
}

export default CarTrack;
