import { SHAKE_THRESHOLD } from '../constants';

/**
 * Representa un vector tridimensional de aceleración
 */
export type Vector3 = {
  x: number;
  y: number;
  z: number;
};

/**
 * Calcula la magnitud euclidiana de un vector 3D
 * Formula: √(x² + y² + z²)
 * 
 * @param vector - Vector de aceleración {x, y, z}
 * @returns Magnitud en unidades g (gravedad terrestre)
 */
export const calculateMagnitude = (vector: Vector3): number => {
  return Math.sqrt(
    vector.x ** 2 + 
    vector.y ** 2 + 
    vector.z ** 2
  );
};

/**
 * Determina si el dispositivo está siendo agitado
 * 
 * @param vector - Vector de aceleración actual
 * @param threshold - Umbral personalizado (opcional)
 * @returns true si la magnitud supera el umbral
 */
export const isShaking = (
  vector: Vector3, 
  threshold: number = SHAKE_THRESHOLD
): boolean => {
  const magnitude = calculateMagnitude(vector);
  return magnitude > threshold;
};

/**
 * Genera un número aleatorio de cara de dado (1-6)
 * 
 * @returns Número entero entre 1 y 6
 */
export const rollDice = (): number => {
  return Math.floor(Math.random() * 6) + 1;
};

/**
 * Formatea la magnitud para mostrar (2 decimales)
 * 
 * @param magnitude - Valor de magnitud
 * @returns String formateado con "g" al final
 */
export const formatMagnitude = (magnitude: number): string => {
  return `${magnitude.toFixed(2)}g`;
};