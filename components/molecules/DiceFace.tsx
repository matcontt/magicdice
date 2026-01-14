// components/molecules/DiceFace.tsx

import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { GlowingDot } from '../atoms/GlowingDot';
import { ANIMATION_CONFIG } from '@/lib/core/constants';

type DiceFaceProps = {
  value: number;
  isRolling?: boolean;
};

// Componente para cada patrón de dado
const DicePattern: React.FC<{ value: number }> = ({ value }) => {
  switch (value) {
    case 1:
      return (
        <View className="absolute inset-0 items-center justify-center">
          <GlowingDot size="lg" />
        </View>
      );

    case 2:
      return (
        <>
          <View className="absolute top-[25%] left-[25%]">
            <GlowingDot size="lg" />
          </View>
          <View className="absolute bottom-[25%] right-[25%]">
            <GlowingDot size="lg" />
          </View>
        </>
      );

    case 3:
      return (
        <>
          <View className="absolute top-[25%] left-[25%]">
            <GlowingDot size="lg" />
          </View>
          <View className="absolute inset-0 items-center justify-center">
            <GlowingDot size="lg" />
          </View>
          <View className="absolute bottom-[25%] right-[25%]">
            <GlowingDot size="lg" />
          </View>
        </>
      );

    case 4:
      return (
        <>
          <View className="absolute top-[25%] left-[25%]">
            <GlowingDot size="lg" />
          </View>
          <View className="absolute top-[25%] right-[25%]">
            <GlowingDot size="lg" />
          </View>
          <View className="absolute bottom-[25%] left-[25%]">
            <GlowingDot size="lg" />
          </View>
          <View className="absolute bottom-[25%] right-[25%]">
            <GlowingDot size="lg" />
          </View>
        </>
      );

    case 5:
      return (
        <>
          <View className="absolute top-[25%] left-[25%]">
            <GlowingDot size="lg" />
          </View>
          <View className="absolute top-[25%] right-[25%]">
            <GlowingDot size="lg" />
          </View>
          <View className="absolute inset-0 items-center justify-center">
            <GlowingDot size="lg" />
          </View>
          <View className="absolute bottom-[25%] left-[25%]">
            <GlowingDot size="lg" />
          </View>
          <View className="absolute bottom-[25%] right-[25%]">
            <GlowingDot size="lg" />
          </View>
        </>
      );

    case 6:
      return (
        <>
          <View className="absolute top-[20%] left-[25%]">
            <GlowingDot size="lg" />
          </View>
          <View className="absolute top-[20%] right-[25%]">
            <GlowingDot size="lg" />
          </View>
          <View className="absolute top-[50%] left-[25%] -translate-y-4">
            <GlowingDot size="lg" />
          </View>
          <View className="absolute top-[50%] right-[25%] -translate-y-4">
            <GlowingDot size="lg" />
          </View>
          <View className="absolute bottom-[20%] left-[25%]">
            <GlowingDot size="lg" />
          </View>
          <View className="absolute bottom-[20%] right-[25%]">
            <GlowingDot size="lg" />
          </View>
        </>
      );

    default:
      return null;
  }
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

  return (
    <Animated.View style={animatedStyle} className="relative">
      {/* Contenedor del dado con gradiente y sombra */}
      <View className="w-64 h-64 bg-gradient-to-br from-violet-600 to-pink-600 rounded-3xl shadow-2xl relative overflow-hidden">
        {/* Efecto de brillo superior */}
        <View className="absolute top-0 left-0 right-0 h-24 bg-white opacity-20 rounded-t-3xl" />
        
        {/* Puntos del dado según el valor */}
        <DicePattern value={value} />

        {/* Borde con brillo */}
        <View className="absolute inset-0 border-4 border-white border-opacity-30 rounded-3xl" />
      </View>

      {/* Sombra decorativa */}
      <View className="absolute -bottom-4 left-1/2 -translate-x-28 w-56 h-8 bg-violet-900 opacity-40 rounded-full blur-2xl" />
    </Animated.View>
  );
};