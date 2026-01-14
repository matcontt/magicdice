/**
 * Umbral de aceleración para detectar agitación (shake)
 * Valores típicos:
 * - Reposo: 0.9 - 1.1 g
 * - Shake suave: 1.3 - 1.5 g
 * - Shake medio: 1.6 - 1.8 g
 * - Shake fuerte: > 1.9 g
 */
export const SHAKE_THRESHOLD = 1.78;

/**
 * Intervalo de actualización del acelerómetro en milisegundos
 * 100ms = 10 lecturas por segundo (buen balance performance/batería)
 */
export const UPDATE_INTERVAL_MS = 100;

/**
 * Tiempo mínimo entre lanzamientos de dado (debounce)
 * Evita múltiples lanzamientos por una sola agitación
 */
export const SHAKE_DEBOUNCE_MS = 800;

/**
 * Configuración de animación del dado
 */
export const ANIMATION_CONFIG = {
  ROLL_DURATION: 600, // Duración del giro en ms
  BOUNCE_DURATION: 400, // Duración del rebote en ms
  SPRING_CONFIG: {
    damping: 15,
    stiffness: 150,
  },
};

/**
 * Colores del tema (compatible con Tailwind)
 */
export const THEME = {
  background: {
    primary: '#0a0a0a',
    secondary: '#1a1a1a',
    card: '#2a2a2a',
  },
  accent: {
    primary: '#8b5cf6', // violet-500
    secondary: '#ec4899', // pink-500
    glow: 'rgba(139, 92, 246, 0.5)',
  },
  text: {
    primary: '#ffffff',
    secondary: '#a3a3a3',
  },
};