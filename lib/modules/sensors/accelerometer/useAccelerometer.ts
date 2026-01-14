import { useState, useEffect } from 'react';
import { Accelerometer } from 'expo-sensors';
import type { Vector3 } from '@/lib/core/logic/motion';
import { calculateMagnitude } from '@/lib/core/logic/motion';

export type AccelerometerState = {
  data: Vector3;
  magnitude: number;
  isActive: boolean;
};

export const useAccelerometer = (): AccelerometerState => {
  const [data, setData] = useState<Vector3>({ x: 0, y: 0, z: 0 });
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let subscription: any;

    const setup = async () => {
      try {
        const available = await Accelerometer.isAvailableAsync();
        if (!available) {
          console.warn('Accelerometer not available');
          return;
        }

        Accelerometer.setUpdateInterval(100);
        subscription = Accelerometer.addListener((d) => {
          setData({ x: d.x ?? 0, y: d.y ?? 0, z: d.z ?? 0 });
          setIsActive(true);
        });
      } catch (error) {
        console.error('Error setting up accelerometer:', error);
        setIsActive(false);
      }
    };

    setup();

    return () => {
      subscription?.remove();
      setIsActive(false);
    };
  }, []);

  return {
    data,
    magnitude: calculateMagnitude(data),
    isActive,
  };
};