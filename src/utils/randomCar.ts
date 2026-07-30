import { CAR_BRANDS, CAR_MODELS } from '../constants';
import type { CarDraft } from '../types';

const pick = <T>(items: readonly T[]): T =>
  items[Math.floor(Math.random() * items.length)];

export const randomColor = (): string => {
  const max = 0xffffff;
  const hex = Math.floor(Math.random() * max)
    .toString(16)
    .padStart(6, '0');
  return `#${hex}`;
};

export const randomCar = (): CarDraft => ({
  name: `${pick(CAR_BRANDS)} ${pick(CAR_MODELS)}`,
  color: randomColor(),
});