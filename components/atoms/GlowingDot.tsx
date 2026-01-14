import React from 'react';
import { View } from 'react-native';

type GlowingDotProps = {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

const sizeClasses = {
  sm: 'w-3 h-3',
  md: 'w-5 h-5',
  lg: 'w-10 h-10',
};

export const GlowingDot: React.FC<GlowingDotProps> = ({ 
  size = 'md',
  className 
}) => {
  return (
    <View className="relative">
      {/* Main dot with gradient */}
      <View className={`${sizeClasses[size]} rounded-full bg-white shadow-xl border-2 border-white/50 ${className}`}>
        {/* Inner highlight */}
        <View className="absolute top-0.5 left-0.5 w-3 h-3 bg-white/80 rounded-full" />
      </View>
    </View>
  );
};