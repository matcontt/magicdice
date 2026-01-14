import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { GlowingDot } from '../atoms/GlowingDot';
import { cn } from '@/lib/utils';
import { ANIMATION_CONFIG } from '@/lib/core/constants';

type DiceFaceProps = {
  value: number;
  isRolling?: boolean;
};

const dotPositions = {
  1: [{ top: '50%', left: '50%', translate: '-50%' }],
  2: [
    { top: '25%', left: '25%' },
    { bottom: '25%', right: '25%' },
  ],
  3: [
    { top: '25%', left: '25%' },
    { top: '50%', left: '50%', translate: '-50%' },
    { bottom: '25%', right: '25%' },
  ],
  4: [
    { top: '25%', left: '25%' },
    { top: '25%', right: '25%' },
    { bottom: '25%', left: '25%' },
    { bottom: '25%', right: '25%' },
  ],
  5: [
    { top: '25%', left: '25%' },
    { top: '25%', right: '25%' },
    { top: '50%', left: '50%', translate: '-50%' },
    { bottom: '25%', left: '25%' },
    { bottom: '25%', right: '25%' },
  ],
  6: [
    { top: '20%', left: '25%' },
    { top: '20%', right: '25%' },
    { top: '50%', left: '25%', translate: '-50%' },
    { top: '50%', right: '25%', translate: '-50%' },
    { bottom: '20%', left: '25%' },
    { bottom: '20%', right: '25%' },
  ],
};

export const DiceFace: React.FC<DiceFaceProps> = ({ value, isRolling = false }) => {
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);

  useEffect(() => {
    if (isRolling) {
      // Animación de giro
      rotation.value = withSequence(
        withTiming(360 * 3, { duration: ANIMATION_CONFIG.ROLL_DURATION }),
        withTiming(0, { duration: 0 })
      );
      
      // Animación de escala (rebote)
      scale.value = withSequence(
        withTiming(1.2, { duration: ANIMATION_CONFIG.ROLL_DURATION / 2 }),
        withSpring(1, ANIMATION_CONFIG.SPRING_CONFIG)
      );
    }
  }, [isRolling, value]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { rotate: `${rotation.value}deg` },
      { scale: scale.value },
    ],
  }));

  const positions = dotPositions[value as keyof typeof dotPositions] || dotPositions[1];

  return (
    <Animated.View
      style={animatedStyle}
      className="relative"
    >
      {/* Contenedor del dado con gradiente y sombra */}
      <View className="w-64 h-64 bg-gradient-to-br from-violet-600 to-pink-600 rounded-3xl shadow-2xl relative overflow-hidden">
        {/* Efecto de brillo superior */}
        <View className="absolute top-0 left-0 right-0 h-24 bg-white opacity-20 rounded-t-3xl" />
        
        {/* Puntos del dado */}
        {positions.map((pos, index) => (
          <View
            key={index}
            className="absolute"
            style={{
              top: pos.top,
              left: pos.left,
              right: pos.right,
              bottom: pos.bottom,
              transform: pos.translate 
                ? [{ translateX: pos.translate }, { translateY: pos.translate }] 
                : undefined,
            }}
          >
            <GlowingDot size="lg" />
          </View>
        ))}

        {/* Borde con brillo */}
        <View className="absolute inset-0 border-4 border-white border-opacity-30 rounded-3xl" />
      </View>

      {/* Sombra decorativa */}
      <View className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-56 h-8 bg-violet-900 opacity-40 blur-2xl rounded-full" />
    </Animated.View>
  );
};