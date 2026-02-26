import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Float, Sparkles, ContactShadows } from '@react-three/drei';
import { Bottle } from './Bottle';

export const HeroScene = () => {
  return (
    <div className="absolute inset-0 z-10 w-full h-full">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <Suspense fallback={null}>
          <Environment preset="city" />
          
          <Float 
            speed={2} 
            rotationIntensity={0.5} 
            floatIntensity={0.5}
          >
            <Bottle />
          </Float>

          {/* Cinematic Lighting */}
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#D4AF37" />
          
          {/* Atmosphere */}
          <Sparkles count={50} scale={5} size={2} speed={0.4} opacity={0.5} color="#D4AF37" />
          <ContactShadows resolution={1024} scale={10} blur={2} opacity={0.5} far={10} color="#000000" />
        </Suspense>
      </Canvas>
    </div>
  );
};
