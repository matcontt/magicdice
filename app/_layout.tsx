import { Stack } from 'expo-router';
import { useEffect } from 'react';
import '../global.css'; // Importar estilos de Tailwind

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#0a0a0a' },
        animation: 'fade',
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen 
        name="games/dice" 
        options={{
          animation: 'slide_from_right',
        }}
      />
    </Stack>
  );
}