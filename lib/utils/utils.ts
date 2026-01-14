import clsx, { ClassValue } from 'clsx';

/**
 * Utility para combinar clases de Tailwind
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}