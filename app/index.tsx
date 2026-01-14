import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import Animated, { 
  FadeIn, 
  FadeInDown, 
  FadeInUp,
} from 'react-native-reanimated';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-[#0a0a0a]">
      <StatusBar style="light" />
      
      {/* Gradient Background Effects */}
      <View className="absolute inset-0">
        <View className="absolute top-0 left-0 w-96 h-96 bg-violet-600/20 rounded-full" />
        <View className="absolute bottom-0 right-0 w-96 h-96 bg-pink-600/20 rounded-full" />
      </View>

      <SafeAreaView className="flex-1">
        <View className="flex-1 items-center justify-between px-6 py-12">
          {/* Header Section */}
          <Animated.View 
            entering={FadeInUp.delay(100).springify()}
            className="items-center mt-8"
          >
            <View className="relative mb-8">
              <View className="bg-gradient-to-br from-violet-600 to-pink-600 rounded-3xl p-8 shadow-2xl">
                <Text className="text-9xl">🎲</Text>
              </View>
            </View>

            <Text className="text-6xl font-black text-white text-center mb-3">
              Magic Dice
            </Text>
            <View className="bg-gradient-to-r from-violet-500 to-pink-500 rounded-full px-6 py-2">
              <Text className="text-white font-semibold text-sm tracking-wider">
                PHYSICS POWERED
              </Text>
            </View>
          </Animated.View>

          {/* Features Grid */}
          <Animated.View 
            entering={FadeIn.delay(300)}
            className="w-full space-y-3"
          >
            <FeatureCard 
              icon="📱" 
              title="Shake Detection" 
              description="Real-time accelerometer tracking"
              delay={350}
            />
            <FeatureCard 
              icon="✨" 
              title="Fluid Animations" 
              description="Smooth 60fps 3D transformations"
              delay={400}
            />
            <FeatureCard 
              icon="🎯" 
              title="MEMS Physics" 
              description="Authentic motion sensing technology"
              delay={450}
            />
          </Animated.View>

          {/* CTA Section */}
          <Animated.View 
            entering={FadeInDown.delay(500)}
            className="w-full space-y-4"
          >
            <Pressable
              onPress={() => router.push('/games/dice')}
              className="active:scale-95"
            >
              <View className="bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 rounded-2xl shadow-2xl py-5 px-8">
                <Text className="text-white text-2xl font-bold text-center mb-1">
                  Start Rolling
                </Text>
                <Text className="text-white/80 text-sm text-center">
                  Tap or shake to play
                </Text>
              </View>
            </Pressable>

            <View className="bg-white/5 rounded-xl p-4 border border-white/10">
              <Text className="text-gray-400 text-center text-xs leading-5">
                💡 Enable motion permissions for the best experience
              </Text>
            </View>
          </Animated.View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const FeatureCard = ({ 
  icon, 
  title, 
  description, 
  delay 
}: { 
  icon: string; 
  title: string; 
  description: string;
  delay: number;
}) => (
  <Animated.View entering={FadeInDown.delay(delay).springify()}>
    <View className="bg-white/5 rounded-2xl p-5 border border-white/10 flex-row items-center space-x-4">
      <View className="bg-gradient-to-br from-violet-600/20 to-pink-600/20 rounded-xl p-3 border border-white/20">
        <Text className="text-4xl">{icon}</Text>
      </View>
      
      <View className="flex-1">
        <Text className="text-white font-bold text-lg mb-1">{title}</Text>
        <Text className="text-gray-400 text-sm leading-5">{description}</Text>
      </View>
    </View>
  </Animated.View>
);
