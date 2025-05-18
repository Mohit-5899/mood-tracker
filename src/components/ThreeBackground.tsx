import { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere, GradientTexture } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedSphere({ position, scale, speed, rotationSpeed }: { 
  position: [number, number, number], 
  scale: number, 
  speed: number,
  rotationSpeed: number
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    
    // Subtle floating motion
    meshRef.current.position.y = position[1] + Math.sin(clock.getElapsedTime() * speed) * 0.2;
    
    // Slow rotation
    meshRef.current.rotation.x += 0.001 * rotationSpeed;
    meshRef.current.rotation.y += 0.002 * rotationSpeed;
  });

  return (
    <Sphere args={[scale, 32, 32]} position={position} ref={meshRef}>
      <MeshDistortMaterial 
        distort={0.4} 
        speed={3} 
        roughness={0.5}
      >
        <GradientTexture 
          stops={[0, 0.2, 0.4, 0.6, 1]} 
          colors={['#4338ca', '#3b82f6', '#06b6d4', '#10b981', '#84cc16']} 
          size={100}
        />
      </MeshDistortMaterial>
    </Sphere>
  );
}

function CameraController() {
  const { camera } = useThree();
  
  useEffect(() => {
    camera.position.z = 20;
  }, [camera]);
  
  return null;
}

export function ThreeBackground() {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 opacity-60">
      <Canvas>
        <CameraController />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.4} />
        <pointLight position={[-10, -10, -10]} intensity={0.2} />
        
        <AnimatedSphere position={[-8, 2, 0]} scale={2} speed={0.3} rotationSpeed={1} />
        <AnimatedSphere position={[8, -3, -5]} scale={3} speed={0.2} rotationSpeed={0.7} />
        <AnimatedSphere position={[3, 5, -10]} scale={1.5} speed={0.4} rotationSpeed={1.2} />
        <AnimatedSphere position={[-5, -2, -8]} scale={2.2} speed={0.25} rotationSpeed={0.9} />
        <AnimatedSphere position={[0, 0, -15]} scale={4} speed={0.15} rotationSpeed={0.5} />
      </Canvas>
    </div>
  );
} 