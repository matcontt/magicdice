import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-[#0a0a0a]">
      <StatusBar style="light" />
      
      <View className="flex-1 items-center justify-center px-8">
        {/* Logo/Title animado */}
        <Animated.View 
          entering={FadeInUp.delay(100).springify()}
          className="items-center mb-12"
        >
          <Text className="text-8xl mb-6">🎲</Text>
          <Text className="text-6xl font-bold text-white text-center mb-4">
            Magic Dice
          </Text>
          <Text className="text-xl text-gray-400 text-center">
            Roll with physics
          </Text>
        </Animated.View>

        {/* Features */}
        <Animated.View 
          entering={FadeIn.delay(300)}
          className="w-full space-y-4 mb-12"
        >
          <FeatureItem 
            icon="📱" 
            title="Shake Detection" 
            description="Uses accelerometer sensors"
          />
          <FeatureItem 
            icon="✨" 
            title="Smooth Animations" 
            description="Beautiful 3D rolling effects"
          />
          <FeatureItem 
            icon="🎯" 
            title="Real Physics" 
            description="Based on MEMS technology"
          />
        </Animated.View>

        {/* CTA Button */}
        <Animated.View 
          entering={FadeInDown.delay(400)}
          className="w-full"
        >
          <Pressable
            onPress={() => router.push('/games/dice')}
            className="bg-gradient-to-r from-violet-600 to-pink-600 rounded-2xl py-6 items-center shadow-2xl"
          >
            <Text className="text-white text-xl font-bold">
              Start Rolling 🎲
            </Text>
          </Pressable>

          <Text className="text-gray-500 text-center mt-6 text-sm">
            Best experienced with device motion enabled
          </Text>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

// Componente auxiliar para features
const FeatureItem = ({ icon, title, description }: { icon: string; title: string; description: string }) => (
  <View className="bg-[#1a1a1a] rounded-xl p-5 flex-row items-center space-x-4">
    <Text className="text-4xl">{icon}</Text>
    <View className="flex-1">
      <Text className="text-white font-semibold text-base mb-1">{title}</Text>
      <Text className="text-gray-400 text-sm">{description}</Text>
    </View>
  </View>
);