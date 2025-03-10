
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTheme } from 'next-themes';
import { OrbitControls } from '@react-three/drei';

const FloatingGraduationCap = ({ position, rotationSpeed = 0.01 }) => {
  const mesh = useRef<THREE.Mesh>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.y += rotationSpeed;
      mesh.current.position.y = position[1] + Math.sin(Date.now() * 0.001) * 0.2;
    }
  });

  // Simplified graduation cap shape
  return (
    <mesh position={position} ref={mesh}>
      <boxGeometry args={[1, 0.1, 1]} />
      <meshStandardMaterial color={isDark ? "#4338ca" : "#818cf8"} />
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.2, 16]} />
        <meshStandardMaterial color={isDark ? "#4338ca" : "#818cf8"} />
        <mesh position={[0, 0.15, 0]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color={isDark ? "#4338ca" : "#818cf8"} />
        </mesh>
      </mesh>
    </mesh>
  );
};

const FloatingSpheres = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const spheres = Array.from({ length: 10 }).map((_, i) => ({
    position: [
      (Math.random() - 0.5) * 15,
      (Math.random() - 0.5) * 15,
      (Math.random() - 0.5) * 15
    ],
    size: Math.random() * 0.5 + 0.1,
    speed: Math.random() * 0.01 + 0.001
  }));

  return (
    <>
      {spheres.map((sphere, i) => (
        <FloatingGraduationCap 
          key={i} 
          position={sphere.position} 
          rotationSpeed={sphere.speed} 
        />
      ))}
    </>
  );
};

const ThreeDBackground: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  return (
    <div className="fixed inset-0 -z-10 w-full h-full">
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
        <ambientLight intensity={isDark ? 0.1 : 0.4} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={isDark ? 0.2 : 0.6}
          color={isDark ? "#8b5cf6" : "#ffffff"}
        />
        <FloatingSpheres />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          enableRotate={true}
          autoRotate={true}
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
};

export default ThreeDBackground;
