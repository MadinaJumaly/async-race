import { useRace } from './useRace';
import { useAppSelector } from '../../app/hooks';
import type { Car } from '../../types';

interface RaceControlsProps {
  cars: Car[];
}

function RaceControls({ cars }: RaceControlsProps) {
  const { startRace, reset } = useRace(cars);
  const winnerId = useAppSelector((state) => state.race.winnerId);

  const winner = cars.find((car) => car.id === winnerId);
  const winnerState = useAppSelector((state) =>
    winnerId !== null ? state.race.cars[winnerId] : undefined,
  );

  return (
    <div className="race-controls">
      <button type="button" onClick={startRace}>
        Race
      </button>
      <button type="button" onClick={reset}>
        Reset
      </button>
      {winner && winnerState && (
        <p className="race-controls__banner">
          {winner.name} went first ({(winnerState.duration / 1000).toFixed(2)}s)
        </p>
      )}
    </div>
  );
}

export default RaceControls;
