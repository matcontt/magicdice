import React from 'react';
import { View } from 'react-native';
import { cn } from '@/lib/utils/utils'; // Helper para clsx

type GlowingDotProps = {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

const sizeClasses = {
  sm: 'w-3 h-3',
  md: 'w-5 h-5',
  lg: 'w-8 h-8',
};

export const GlowingDot: React.FC<GlowingDotProps> = ({ 
  size = 'md',
  className 
}) => {
  return (
    <View className={cn(
      'rounded-full bg-white',
      sizeClasses[size],
      className
    )}>
      {/* Efecto de brillo - simulado con múltiples capas */}
      <View className="absolute inset-0 rounded-full bg-violet-400 opacity-70 blur-sm" />
      <View className="absolute inset-0 rounded-full bg-pink-300 opacity-50 blur-md" />
    </View>
  );
};