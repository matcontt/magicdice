import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { useAccelerometer } from '@/lib/modules/sensors/accelerometer/useAccelerometer';
import { isShaking, rollDice, formatMagnitude } from '@/lib/core/logic/motion';
import { DiceFace } from '@/components/molecules/DiceFace';
import { SHAKE_DEBOUNCE_MS } from '@/lib/core/constants';
import Animated, { 
  FadeIn, 
  FadeInDown,
  FadeInUp,
} from 'react-native-reanimated';

export default function DiceScreen() {
  const router = useRouter();
  const [diceValue, setDiceValue] = useState<number>(1);
  const [isRolling, setIsRolling] = useState<boolean>(false);
  const [rollCount, setRollCount] = useState<number>(0);
  const [lastRolls, setLastRolls] = useState<number[]>([]);
  const lastShakeTime = useRef<number>(0);
  
  const { data, magnitude, isActive } = useAccelerometer();

  // Detector de agitación con debounce
  useEffect(() => {
    if (!isActive || isRolling) return;

    const now = Date.now();
    const timeSinceLastShake = now - lastShakeTime.current;

    if (isShaking(data) && timeSinceLastShake > SHAKE_DEBOUNCE_MS) {
      handleDiceRoll();
      lastShakeTime.current = now;
    }
  }, [data, isActive, isRolling]);

  const handleDiceRoll = () => {
    setIsRolling(true);
    
    setTimeout(() => {
      const newValue = rollDice();
      setDiceValue(newValue);
      setRollCount(prev => prev + 1);
      setLastRolls(prev => [newValue, ...prev].slice(0, 5));
      setIsRolling(false);
    }, 600);
  };

  const handleReset = () => {
    setRollCount(0);
    setLastRolls([]);
    setDiceValue(1);
  };

  return (
    <View className="flex-1 bg-[#0a0a0a]">
      <StatusBar style="light" />
      
      {/* Animated Background Effects */}
      <View className="absolute inset-0">
        <View className="absolute top-20 right-10 w-72 h-72 bg-violet-600/20 rounded-full" />
        <View className="absolute bottom-40 left-10 w-72 h-72 bg-pink-600/20 rounded-full" />
      </View>

      <SafeAreaView className="flex-1">
        <View className="flex-1 px-6 py-4">
          {/* Header */}
          <Animated.View 
            entering={FadeInDown.delay(100)}
            className="flex-row items-center justify-between mb-6"
          >
            <Pressable 
              onPress={() => router.back()}
              className="active:scale-90"
            >
              <View className="bg-white/10 rounded-xl p-3 border border-white/20">
                <Text className="text-white text-xl">←</Text>
              </View>
            </Pressable>

            <View className="items-center">
              <Text className="text-white text-2xl font-bold">Magic Dice</Text>
              <Text className="text-gray-500 text-xs">Shake to roll</Text>
            </View>

            <View className="w-12" />
          </Animated.View>

          {/* Dice Container */}
          <Animated.View 
            entering={FadeIn.delay(200)}
            className="flex-1 items-center justify-center"
          >
            <DiceFace value={diceValue} isRolling={isRolling} />
          </Animated.View>

          {/* Stats Panel */}
          <Animated.View 
            entering={FadeInUp.delay(300)}
            className="space-y-3 mb-4"
          >
            {/* Roll History */}
            {lastRolls.length > 0 && (
              <View className="bg-white/5 rounded-2xl p-4 border border-white/10">
                <Text className="text-gray-400 text-xs font-semibold mb-3 uppercase tracking-wider">
                  Last Rolls
                </Text>
                <View className="flex-row space-x-2">
                  {lastRolls.map((roll, idx) => {
                    const isLatest = idx === 0;
                    return (
                      <View key={idx} className="flex">
                        <View 
                          className={`rounded-xl px-4 py-2 border ${
                            isLatest 
                              ? 'bg-violet-600 border-white/30' 
                              : 'bg-gray-800 border-white/10'
                          }`}
                        >
                          <Text className={`font-bold text-lg ${
                            isLatest ? 'text-white' : 'text-gray-400'
                          }`}>
                            {roll}
                          </Text>
                        </View>
                      </View>
                    );
                  })}
                </View>
              </View>
            )}

            {/* Main Stats */}
            <View className="bg-white/5 rounded-2xl p-5 border border-white/10">
              <View className="flex-row justify-between items-center mb-4">
                <View className="flex-1">
                  <Text className="text-gray-400 text-xs mb-1">Total Rolls</Text>
                  <Text className="text-white text-3xl font-bold">{rollCount}</Text>
                </View>
                
                <View className="w-px h-12 bg-white/10 mx-4" />
                
                <View className="flex-1">
                  <Text className="text-gray-400 text-xs mb-1">Current</Text>
                  <Text className="text-violet-400 text-3xl font-bold">{diceValue}</Text>
                </View>
              </View>

              {/* Sensor Status */}
              <View className="flex-row justify-between items-center pt-4 border-t border-white/10">
                <View className="flex-row items-center space-x-2">
                  <View className={`w-2 h-2 rounded-full ${
                    isActive ? 'bg-green-400' : 'bg-red-400'
                  }`} />
                  <Text className={`text-xs font-medium ${
                    isActive ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {isActive ? 'Sensor Active' : 'Sensor Inactive'}
                  </Text>
                </View>
                
                <View className="flex-row items-center space-x-2">
                  <Text className="text-gray-500 text-xs">Force:</Text>
                  <Text className={`text-xs font-mono font-bold ${
                    magnitude > 1.78 ? 'text-pink-400' : 'text-gray-400'
                  }`}>
                    {formatMagnitude(magnitude)}
                  </Text>
                </View>
              </View>
            </View>
          </Animated.View>

          {/* Action Buttons */}
          <Animated.View 
            entering={FadeInUp.delay(400)}
            className="space-y-3"
          >
            {/* Manual Roll Button */}
            <Pressable
              onPress={handleDiceRoll}
              disabled={isRolling}
              className="active:scale-95"
            >
              <View className={`bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 rounded-2xl shadow-xl py-5 ${
                isRolling ? 'opacity-50' : 'opacity-100'
              }`}>
                <Text className="text-white text-xl font-bold text-center">
                  {isRolling ? '🎲 Rolling...' : '🎲 Manual Roll'}
                </Text>
              </View>
            </Pressable>

            {/* Reset Button */}
            {rollCount > 0 && (
              <Pressable
                onPress={handleReset}
                className="active:scale-95"
              >
                <View className="bg-white/5 border border-white/10 rounded-xl py-4">
                  <Text className="text-gray-400 text-sm font-semibold text-center">
                    Reset Counter
                  </Text>
                </View>
              </Pressable>
            )}
          </Animated.View>
        </View>
      </SafeAreaView>
    </View>
  );
}