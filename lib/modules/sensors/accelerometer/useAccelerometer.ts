import { useState, useEffect, useRef } from 'react';
import { AccelerometerService } from './accelerometer.service';
import type { Vector3 } from '@/lib/core/logic/motion';
import { calculateMagnitude } from '@/lib/core/logic/motion';

/**
 * Estado retornado por el hook useAccelerometer
 */
export type AccelerometerState = {
  data: Vector3;
  magnitude: number;
  isActive: boolean;
};

/**
 * Hook personalizado para acceder a datos del acelerómetro
 * Maneja suscripción/desuscripción automática
 * 
 * @returns Estado actual del acelerómetro
 */
export const useAccelerometer = (): AccelerometerState => {
  const [data, setData] = useState<Vector3>({ x: 0, y: 0, z: 0 });
  const [isActive, setIsActive] = useState<boolean>(false);
  const subscriptionRef = useRef<any>(null);

  useEffect(() => {
    // Verificar disponibilidad
    AccelerometerService.isAvailable().then((available) => {
      if (!available) {
        console.warn('Acelerómetro no disponible en este dispositivo');
        return;
      }

      // Suscribirse a actualizaciones
      subscriptionRef.current = AccelerometerService.subscribe(
        (accelerometerData) => {
          setData(accelerometerData);
          setIsActive(true);
        }
      );
    });

    // Cleanup: desuscribirse al desmontar
    return () => {
      AccelerometerService.unsubscribe(subscriptionRef.current);
      setIsActive(false);
    };
  }, []);

  const magnitude = calculateMagnitude(data);

  return {
    data,
    magnitude,
    isActive,
  };
};