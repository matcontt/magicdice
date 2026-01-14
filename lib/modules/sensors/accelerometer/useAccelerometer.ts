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
 * Maneja suscripción/desuscripción automática con manejo robusto de errores
 * 
 * @returns Estado actual del acelerómetro
 */
export const useAccelerometer = (): AccelerometerState => {
  const [data, setData] = useState<Vector3>({ x: 0, y: 0, z: 0 });
  const [isActive, setIsActive] = useState<boolean>(false);
  const subscriptionRef = useRef<any>(null);
  const isMountedRef = useRef<boolean>(true);

  useEffect(() => {
    isMountedRef.current = true;
    let mounted = true;

    const setupAccelerometer = async () => {
      try {
        // Verificar disponibilidad
        const available = await AccelerometerService.isAvailable();
        
        if (!available) {
          console.warn('Acelerómetro no disponible en este dispositivo');
          return;
        }

        if (!mounted) return;

        // Suscribirse a actualizaciones
        subscriptionRef.current = AccelerometerService.subscribe(
          (accelerometerData) => {
            if (isMountedRef.current && mounted) {
              setData(accelerometerData);
              setIsActive(true);
            }
          }
        );
      } catch (error) {
        console.error('Error al configurar acelerómetro:', error);
        if (mounted) {
          setIsActive(false);
        }
      }
    };

    setupAccelerometer();

    // Cleanup: desuscribirse al desmontar
    return () => {
      mounted = false;
      isMountedRef.current = false;
      
      try {
        AccelerometerService.unsubscribe(subscriptionRef.current);
        subscriptionRef.current = null;
      } catch (error) {
        console.error('Error al limpiar acelerómetro:', error);
      }
      
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