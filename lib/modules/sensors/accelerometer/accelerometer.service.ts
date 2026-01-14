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
 * Capa de abstracción sobre expo-sensors con manejo robusto de errores
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
  ): AccelerometerSubscription | null => {
    try {
      // Configurar intervalo de actualización
      Accelerometer.setUpdateInterval(updateInterval);
      
      // Crear listener con manejo de errores
      const subscription = Accelerometer.addListener((accelerometerData) => {
        try {
          callback({
            x: accelerometerData.x ?? 0,
            y: accelerometerData.y ?? 0,
            z: accelerometerData.z ?? 0,
          });
        } catch (error) {
          console.error('Error en callback del acelerómetro:', error);
        }
      });

      return subscription;
    } catch (error) {
      console.error('Error al suscribirse al acelerómetro:', error);
      return null;
    }
  },

  /**
   * Cancela una suscripción activa de forma segura
   * 
   * @param subscription - Suscripción a cancelar
   */
  unsubscribe: (subscription: AccelerometerSubscription | null): void => {
    if (!subscription) return;

    try {
      subscription.remove();
    } catch (error) {
      console.error('Error al desuscribirse del acelerómetro:', error);
    }
  },

  /**
   * Verifica si el acelerómetro está disponible en el dispositivo
   * 
   * @returns Promise<boolean>
   */
  isAvailable: async (): Promise<boolean> => {
    try {
      const available = await Accelerometer.isAvailableAsync();
      return available ?? false;
    } catch (error) {
      console.error('Error al verificar disponibilidad del acelerómetro:', error);
      return false;
    }
  },

  /**
   * Limpia todos los listeners del acelerómetro
   * Útil para casos de emergencia o limpieza global
   */
  removeAllListeners: (): void => {
    try {
      Accelerometer.removeAllListeners();
    } catch (error) {
      console.error('Error al remover todos los listeners:', error);
    }
  },
};