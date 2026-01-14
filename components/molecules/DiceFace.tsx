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
          <View className="absolute top-[50%] left-[50%] -translate-x-5 -translate-y-5">
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
          <View className="absolute top-[50%] left-[50%] -translate-x-5 -translate-y-5">
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
          <View className="absolute top-[50%] left-[25%] -translate-y-5">
            <GlowingDot size="lg" />
          </View>
          <View className="absolute top-[50%] right-[25%] -translate-y-5">
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
      rotation.value = withSequence(
        withTiming(360 * 3, { duration: ANIMATION_CONFIG.ROLL_DURATION }),
        withTiming(0, { duration: 0 })
      );
      
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
      {/* Main dice container */}
      <View className="w-72 h-72 bg-gradient-to-br from-violet-600 via-purple-600 to-pink-600 rounded-[32px] shadow-2xl relative overflow-hidden border-4 border-white/20">
        {/* Top shine effect */}
        <View className="absolute top-0 left-0 right-0 h-32 bg-white/20 rounded-t-[28px]" />
        
        {/* Dice dots pattern */}
        <DicePattern value={value} />
        
        {/* Inner border glow */}
        <View className="absolute inset-2 border-2 border-white/10 rounded-[24px]" />
      </View>

      {/* Ground shadow */}
      <View className="absolute -bottom-8 left-1/2 -translate-x-36 w-72 h-12 bg-violet-900/40 rounded-full" />
    </Animated.View>
  );
};
