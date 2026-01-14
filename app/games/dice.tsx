import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Pressable, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useAccelerometer } from '@/lib/modules/sensors/accelerometer/useAccelerometer';
import { isShaking, rollDice, formatMagnitude } from '@/lib/core/logic/motion';
import { DiceFace } from '@/components/molecules/DiceFace';
import { SHAKE_DEBOUNCE_MS } from '@/lib/core/constants';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';

export default function DiceScreen() {
  const [diceValue, setDiceValue] = useState<number>(1);
  const [isRolling, setIsRolling] = useState<boolean>(false);
  const [rollCount, setRollCount] = useState<number>(0);
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
      setIsRolling(false);
    }, 600); // Duración de la animación
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0a0a0a]">
      <StatusBar style="light" />
      
      <View className="flex-1 items-center justify-between px-6 py-8">
        {/* Header */}
        <Animated.View 
          entering={FadeInDown.delay(100)}
          className="items-center"
        >
          <Text className="text-5xl font-bold text-white mb-2">
            🎲 Magic Dice
          </Text>
          <Text className="text-gray-400 text-base">
            Shake your phone to roll!
          </Text>
        </Animated.View>

        {/* Dado Central */}
        <Animated.View 
          entering={FadeIn.delay(300)}
          className="items-center justify-center flex-1"
        >
          <DiceFace value={diceValue} isRolling={isRolling} />
        </Animated.View>

        {/* Stats y Controles */}
        <Animated.View 
          entering={FadeInDown.delay(200)}
          className="w-full space-y-6"
        >
          {/* Stats */}
          <View className="bg-[#1a1a1a] rounded-2xl p-6 space-y-3">
            <View className="flex-row justify-between items-center">
              <Text className="text-gray-400 text-sm">Total Rolls</Text>
              <Text className="text-white text-2xl font-bold">{rollCount}</Text>
            </View>
            
            <View className="flex-row justify-between items-center">
              <Text className="text-gray-400 text-sm">Current Value</Text>
              <Text className="text-violet-400 text-2xl font-bold">{diceValue}</Text>
            </View>

            <View className="flex-row justify-between items-center">
              <Text className="text-gray-400 text-sm">Acceleration</Text>
              <Text className={`text-sm font-mono ${magnitude > 1.78 ? 'text-pink-400' : 'text-gray-500'}`}>
                {formatMagnitude(magnitude)}
              </Text>
            </View>

            <View className="flex-row justify-between items-center">
              <Text className="text-gray-400 text-sm">Sensor Status</Text>
              <View className="flex-row items-center space-x-2">
                <View className={`w-2 h-2 rounded-full ${isActive ? 'bg-green-400' : 'bg-red-400'}`} />
                <Text className={`text-xs ${isActive ? 'text-green-400' : 'text-red-400'}`}>
                  {isActive ? 'Active' : 'Inactive'}
                </Text>
              </View>
            </View>
          </View>

          {/* Manual Roll Button */}
          <Pressable
            onPress={handleDiceRoll}
            disabled={isRolling}
            className={`bg-gradient-to-r from-violet-600 to-pink-600 rounded-2xl py-5 items-center ${isRolling ? 'opacity-50' : 'opacity-100'}`}
          >
            <Text className="text-white text-lg font-bold">
              {isRolling ? '🎲 Rolling...' : '🎲 Manual Roll'}
            </Text>
          </Pressable>

          {/* Reset Counter */}
          {rollCount > 0 && (
            <Pressable
              onPress={() => setRollCount(0)}
              className="py-3 items-center"
            >
              <Text className="text-gray-500 text-sm">Reset Counter</Text>
            </Pressable>
          )}
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}