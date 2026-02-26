import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';

export const Bottle = (props: any) => {
  const group = useRef<THREE.Group>(null);
  const liquidRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.getElapsedTime() * 0.1;
      // Gentle floating
      group.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
    }
  });

  return (
    <group ref={group} {...props} dispose={null}>
      {/* Bottle Body (Glass) */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[1, 1, 3.5, 32]} />
        <MeshTransmissionMaterial 
          backside
          samples={4}
          thickness={0.5}
          chromaticAberration={0.05}
          anisotropy={0.1}
          distortion={0.1}
          distortionScale={0.1}
          temporalDistortion={0.1}
          iridescence={1}
          iridescenceIOR={1}
          iridescenceThicknessRange={[0, 1400]}
          roughness={0}
          clearcoat={1}
          color="#ffffff"
        />
      </mesh>

      {/* Liquid Inside (Gold) */}
      <mesh ref={liquidRef} position={[0, -0.2, 0]}>
        <cylinderGeometry args={[0.85, 0.85, 2.8, 32]} />
        <meshPhysicalMaterial 
          color="#D4AF37"
          metalness={0.2}
          roughness={0.1}
          transmission={0.6}
          thickness={1}
          ior={1.5}
        />
      </mesh>

      {/* Cap (Gold Metal) */}
      <mesh position={[0, 2, 0]}>
        <cylinderGeometry args={[0.6, 0.6, 0.8, 32]} />
        <meshStandardMaterial 
          color="#D4AF37"
          metalness={1}
          roughness={0.2}
        />
      </mesh>
      
      {/* Neck Ring */}
      <mesh position={[0, 1.7, 0]}>
        <torusGeometry args={[0.65, 0.05, 16, 100]} />
        <meshStandardMaterial color="#F4D06F" metalness={1} roughness={0.1} />
      </mesh>
    </group>
  );
};
