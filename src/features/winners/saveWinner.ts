import type { AppDispatch } from '../../app/store';
import { winnersApi } from '../../api/winnersApi';
import type { Winner } from '../../types';

export async function saveWinner(
  id: number,
  time: number,
  dispatch: AppDispatch,
): Promise<void> {
    const rounded = Math.round(time * 100) / 100;

    let existing: Winner | null = null;
    try {
        existing = await dispatch(winnersApi.endpoints.getWinner.initiate(id)).unwrap();
    } catch {
        existing = null;
    }

    if (existing) {
        await dispatch(
        winnersApi.endpoints.updateWinner.initiate({
            id,
            wins: existing.wins + 1,
            time: Math.min(existing.time, rounded),
        }),
        ).unwrap();
    } else {
        await dispatch(
        winnersApi.endpoints.createWinner.initiate({ id, wins: 1, time}),
        ).unwrap();
    }
}