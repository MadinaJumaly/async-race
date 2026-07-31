import { useRace } from './useRace';
import { useAppSelector } from '../../app/hooks';
import type { Car } from '../../types';

interface RaceControlsProps {
  cars: Car[];
}

function RaceControls({ cars }: RaceControlsProps) {
  const { startRace, reset } = useRace(cars);
  const status = useAppSelector((state) => state.race.status);
  const winnerId = useAppSelector((state) => state.race.winnerId);

  const isRacing = status === 'racing';
  const hasResult = winnerId !== null;
  const raceOver = isRacing || hasResult;
  const winner = cars.find((car) => car.id === winnerId);
  const winnerState = useAppSelector((state) =>
    winnerId !== null ? state.race.cars[winnerId] : undefined,
  );

  return (
    <div className="race-controls">
      <button type="button" onClick={startRace} disabled={raceOver}>
        Race
      </button>
      <button type="button" onClick={reset} disabled={!raceOver}>
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
