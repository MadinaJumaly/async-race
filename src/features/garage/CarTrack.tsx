import type { CSSProperties, RefObject } from 'react';
import CarIcon from '../../components/CarIcon';
import type { CarMode } from '../race/raceSlice';

interface CarTrackProps {
  carRef: RefObject<HTMLDivElement | null>;
  mode: CarMode;
  style: CSSProperties;
  color: string;
  name: string;
}

function CarTrack({
  carRef, mode, style, color, name,
}: CarTrackProps) {
  return (
    <div className="car-row__track">
      <div ref={carRef} className={`car-row__car car-row__car--${mode}`} style={style}>
        <CarIcon color={color} size={40} />
      </div>
      <span className="car-row__name">{name}</span>
    </div>
  );
}

export default CarTrack;
