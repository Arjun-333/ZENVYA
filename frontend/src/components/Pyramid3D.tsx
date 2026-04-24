"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows, Float, Edges } from "@react-three/drei";
import * as THREE from "three";

function PremiumPyramid() {
  const outerRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (outerRef.current && innerRef.current) {
      // Counter-rotation for a complex, premium mechanical feel
      outerRef.current.rotation.y += delta * 0.15;
      innerRef.current.rotation.y -= delta * 0.25;
      
      // Gentle breathing effect on the inner core
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
      innerRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <Float speed={2.5} rotationIntensity={0.6} floatIntensity={1.5}>
      <group position={[0, -0.5, 0]}>
        
        {/* Outer Glass Casing */}
        <mesh ref={outerRef} castShadow receiveShadow>
          <coneGeometry args={[3, 4, 4]} />
          <meshPhysicalMaterial 
            color="#EAE0D5" // Warm beige tint
            metalness={0.1}
            roughness={0.1}
            transmission={0.9} // Glass effect
            thickness={2}
            ior={1.5}
            clearcoat={1}
            clearcoatRoughness={0.1}
            flatShading={true}
            transparent={true}
            opacity={1}
          />
          {/* Golden wireframe edges for architectural precision */}
          <Edges scale={1.001} threshold={15} color="#C07A30" /> 
        </mesh>

        {/* Inner Glowing Core */}
        <mesh ref={innerRef} position={[0, -0.2, 0]}>
          <coneGeometry args={[1.5, 2.5, 4]} />
          <meshStandardMaterial 
            color="#6F4E37" // Coffee Brown core
            emissive="#C07A30" // Amber Gold glow
            emissiveIntensity={1.5}
            roughness={0.4}
            metalness={0.8}
            flatShading={true}
          />
          <Edges scale={1.001} threshold={15} color="#2D1F12" /> 
        </mesh>

      </group>
    </Float>
  );
}

export default function Pyramid3D() {
  return (
    <div className="w-full h-full min-h-[600px] absolute inset-0 z-0 pointer-events-auto">
      <Canvas camera={{ position: [0, 2, 9], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.2} />
        <spotLight position={[10, 15, 10]} angle={0.3} penumbra={1} intensity={2} castShadow color="#FFF2E5" />
        <pointLight position={[-10, -10, -10]} intensity={1.5} color="#C07A30" />
        
        <PremiumPyramid />
        
        {/* High-quality studio environment reflections */}
        <Environment preset="studio" />
        
        {/* Soft, realistic ground shadow */}
        <ContactShadows 
          position={[0, -2.5, 0]} 
          opacity={0.6} 
          scale={15} 
          blur={2.5} 
          far={5} 
          color="#2D1F12" 
          resolution={512}
        />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate={false} 
          maxPolarAngle={Math.PI / 2 + 0.1} // Prevent looking directly from bottom
          minPolarAngle={Math.PI / 3} // Keep a dramatic angle
        />
      </Canvas>
    </div>
  );
}
