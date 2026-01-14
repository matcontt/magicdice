import { SHAKE_THRESHOLD } from '../constants';

export type Vector3 = {
  x: number;
  y: number;
  z: number;
};

export const calculateMagnitude = (v: Vector3): number => {
  return Math.sqrt(v.x ** 2 + v.y ** 2 + v.z ** 2);
};

export const isShaking = (v: Vector3, threshold = SHAKE_THRESHOLD): boolean => {
  return calculateMagnitude(v) > threshold;
};

export const rollDice = (): number => {
  return Math.floor(Math.random() * 6) + 1;
};

export const formatMagnitude = (m: number): string => {
  return `${m.toFixed(2)}g`;
};