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

type DiceFaceProps = {
  value: number;
  isRolling?: boolean;
};

const DicePattern = ({ value }: { value: number }) => {
  const patterns = {
    1: [[50, 50]],
    2: [[25, 25], [75, 75]],
    3: [[25, 25], [50, 50], [75, 75]],
    4: [[25, 25], [25, 75], [75, 25], [75, 75]],
    5: [[25, 25], [25, 75], [50, 50], [75, 25], [75, 75]],
    6: [[25, 20], [25, 50], [25, 80], [75, 20], [75, 50], [75, 80]],
  };

  const dots = patterns[value as keyof typeof patterns] || patterns[1];

  return (
    <>
      {dots.map(([top, left], i) => (
        <View key={i} className="absolute" style={{ top: `${top}%`, left: `${left}%`, transform: [{ translateX: -20 }, { translateY: -20 }] }}>
          <GlowingDot size="lg" />
        </View>
      ))}
    </>
  );
};

export const DiceFace = ({ value, isRolling = false }: DiceFaceProps) => {
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);

  useEffect(() => {
    if (isRolling) {
      rotation.value = withSequence(
        withTiming(360 * 3, { duration: 600 }),
        withTiming(0, { duration: 0 })
      );
      scale.value = withSequence(
        withTiming(1.2, { duration: 300 }),
        withSpring(1, { damping: 15, stiffness: 150 })
      );
    }
  }, [isRolling]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }, { scale: scale.value }],
  }));

  return (
    <Animated.View style={animatedStyle} className="relative">
      <View className="w-72 h-72 bg-gradient-to-br from-violet-600 via-purple-600 to-pink-600 rounded-[32px] shadow-2xl relative overflow-hidden border-4 border-white/20">
        <View className="absolute top-0 left-0 right-0 h-32 bg-white/20 rounded-t-[28px]" />
        <DicePattern value={value} />
        <View className="absolute inset-2 border-2 border-white/10 rounded-[24px]" />
      </View>
      <View className="absolute -bottom-8 left-1/2 -translate-x-36 w-72 h-12 bg-violet-900/40 rounded-full blur-xl" />
    </Animated.View>
  );
};