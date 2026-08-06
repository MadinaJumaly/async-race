import { useEffect, useState } from 'react';
import { useRace } from './useRace';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { markBannerShown } from './raceSlice';
import type { Car } from '../../types';

const WINNER_BANNER_DURATION_MS = 3000;

interface RaceControlsProps {
  cars: Car[];
}

function RaceControls({ cars }: RaceControlsProps) {
  const dispatch = useAppDispatch();
  const { startRace, reset } = useRace(cars);
  const winnerId = useAppSelector((state) => state.race.winnerId);
  const bannerShownFor = useAppSelector((state) => state.race.bannerShownFor);
  const [showBanner, setShowBanner] = useState(false);

  const winner = cars.find((car) => car.id === winnerId);
  const winnerState = useAppSelector((state) =>
    winnerId !== null ? state.race.cars[winnerId] : undefined,
  );

  useEffect(() => {
    if (winnerId === null || winnerId === bannerShownFor) return undefined;
    dispatch(markBannerShown(winnerId));
    setShowBanner(true);
    const timer = setTimeout(() => setShowBanner(false), WINNER_BANNER_DURATION_MS);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [winnerId, dispatch]);

  return (
    <div className="race-controls">
      <button type="button" onClick={startRace}>Race</button>
      <button type="button" onClick={reset}>Reset</button>
      {showBanner && winner && winnerState && (
        <p className="race-controls__banner">
          {winner.name} went first ({(winnerState.duration / 1000).toFixed(2)}s)
        </p>
      )}
    </div>
  );
}

export default RaceControls;
