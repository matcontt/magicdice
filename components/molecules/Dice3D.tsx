import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber/native';
import * as THREE from 'three';

// --- Configuraciones de las caras ---
const DICE_ROTATIONS: Record<number, [number, number, number]> = {
  1: [0, 0, 0],
  2: [0, -Math.PI / 2, 0],
  3: [Math.PI / 2, 0, 0],
  4: [-Math.PI / 2, 0, 0],
  5: [0, Math.PI / 2, 0],
  6: [Math.PI, 0, 0],
};

// Componente para un punto individual
const Dot = ({ position }: { position: [number, number, number] }) => (
  <mesh position={position}>
    <sphereGeometry args={[0.12, 16, 16]} />
    <meshStandardMaterial color="#1a1a1a" roughness={0.1} />
  </mesh>
);

// Componente para una cara con sus puntos
const DiceFace = ({ number, rotation, position }: { number: number; rotation: [number, number, number]; position: [number, number, number] }) => {
  const p = 0.35; // Distancia de los puntos desde el centro
  const z = 0.76; // Justo en la superficie del cubo (cubo mide 1.5, mitad es 0.75)

  const dotsMap: Record<number, [number, number, number][]> = {
    1: [[0, 0, z]],
    2: [[-p, p, z], [p, -p, z]],
    3: [[-p, p, z], [0, 0, z], [p, -p, z]],
    4: [[-p, p, z], [p, p, z], [-p, -p, z], [p, -p, z]],
    5: [[-p, p, z], [p, p, z], [0, 0, z], [-p, -p, z], [p, -p, z]],
    6: [[-p, p, z], [p, p, z], [-p, 0, z], [p, 0, z], [-p, -p, z], [p, -p, z]],
  };

  return (
    <group rotation={rotation} position={position}>
      {dotsMap[number].map((pos, i) => <Dot key={i} position={pos} />)}
    </group>
  );
};

export const Dice3D = ({ isRolling, targetValue }: { isRolling: boolean; targetValue: number }) => {
  const groupRef = useRef<THREE.Group>(null);
  const rotationVelocity = useRef({ x: 0, y: 0, z: 0 });
  const targetRotation = useRef<[number, number, number]>([0, 0, 0]);

  useEffect(() => {
    if (isRolling) {
      rotationVelocity.current = {
        x: (Math.random() - 0.5) * 0.6,
        y: (Math.random() - 0.5) * 0.6,
        z: (Math.random() - 0.5) * 0.6,
      };
    } else {
      targetRotation.current = DICE_ROTATIONS[targetValue] || [0, 0, 0];
    }
  }, [isRolling, targetValue]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    if (isRolling) {
      groupRef.current.rotation.x += rotationVelocity.current.x;
      groupRef.current.rotation.y += rotationVelocity.current.y;
      groupRef.current.rotation.z += rotationVelocity.current.z;
    } else {
      const [tX, tY, tZ] = targetRotation.current;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, tX, delta * 8);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, tY, delta * 8);
      groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, tZ, delta * 8);
    }
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
  });

  return (
    <group ref={groupRef}>
      {/* El cuerpo del dado */}
      <mesh castShadow>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <meshStandardMaterial color="white" roughness={0.2} metalness={0.0} />
      </mesh>

      {/* Las Caras con puntos */}
      <DiceFace number={1} rotation={[0, 0, 0]} position={[0, 0, 0]} />
      <DiceFace number={2} rotation={[0, Math.PI / 2, 0]} position={[0, 0, 0]} />
      <DiceFace number={3} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} />
      <DiceFace number={4} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]} />
      <DiceFace number={5} rotation={[0, -Math.PI / 2, 0]} position={[0, 0, 0]} />
      <DiceFace number={6} rotation={[Math.PI, 0, 0]} position={[0, 0, 0]} />
    </group>
  );
};