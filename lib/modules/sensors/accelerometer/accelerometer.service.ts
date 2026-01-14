import { Accelerometer } from 'expo-sensors';
import { UPDATE_INTERVAL_MS } from '@/lib/core/constants';
import type { Vector3 } from '@/lib/core/logic/motion';

/**
 * Tipo de callback para recibir datos del acelerómetro
 */
type AccelerometerCallback = (data: Vector3) => void;

/**
 * Tipo de suscripción retornada por el listener
 */
type AccelerometerSubscription = {
  remove: () => void;
};

/**
 * Servicio para interactuar con el acelerómetro del dispositivo
 * Capa de abstracción sobre expo-sensors
 */
export const AccelerometerService = {
  /**
   * Suscribe un callback para recibir actualizaciones del acelerómetro
   * 
   * @param callback - Función que recibe datos {x, y, z}
   * @param updateInterval - Intervalo personalizado en ms (opcional)
   * @returns Objeto de suscripción con método remove()
   */
  subscribe: (
    callback: AccelerometerCallback,
    updateInterval: number = UPDATE_INTERVAL_MS
  ): AccelerometerSubscription => {
    // Configurar intervalo de actualización
    Accelerometer.setUpdateInterval(updateInterval);
    
    // Crear listener
    const subscription = Accelerometer.addListener((accelerometerData) => {
      callback({
        x: accelerometerData.x,
        y: accelerometerData.y,
        z: accelerometerData.z,
      });
    });

    return subscription;
  },

  /**
   * Cancela una suscripción activa
   * 
   * @param subscription - Suscripción a cancelar
   */
  unsubscribe: (subscription: AccelerometerSubscription | null): void => {
    if (subscription) {
      subscription.remove();
    }
  },

  /**
   * Verifica si el acelerómetro está disponible en el dispositivo
   * 
   * @returns Promise<boolean>
   */
  isAvailable: async (): Promise<boolean> => {
    return await Accelerometer.isAvailableAsync();
  },
};