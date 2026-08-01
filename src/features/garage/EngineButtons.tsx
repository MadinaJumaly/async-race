import type { CarMode } from '../race/raceSlice';

interface EngineButtonsProps {
  mode: CarMode;
  raceStatus: 'idle' | 'racing';
  onStart: () => void;
  onStop: () => void;
}

function EngineButtons({ mode, raceStatus, onStart, onStop }: EngineButtonsProps) {
  return (
    <div className="car-row__engine">
      <button type="button" onClick={onStart} disabled={mode !== 'idle' || raceStatus === 'racing'}>
        A
      </button>
      <button type="button" onClick={onStop} disabled={mode === 'idle' && raceStatus !== 'racing'}>
        B
      </button>
    </div>
  );
}

export default EngineButtons;
