"use client";

import React, { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, ContactShadows, SpotLight } from "@react-three/drei";
import * as THREE from "three";
import { useScroll } from "framer-motion";

// Reduced layers and increased size for a cleaner, chunky stylized look
const TOTAL_LAYERS = 10; 
const CUBE_SIZE = 0.4;
const SPACING = 0.42;
const EROSION_CHANCE = 0.1; // 10% missing

export default function ParticlePyramidEngine() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dustRef = useRef<THREE.Points>(null);
  
  const { pyramidPositions, vPositions, colors, count } = useMemo(() => {
    const pPos: THREE.Vector3[] = [];
    const vPos: THREE.Vector3[] = [];
    const colArray: THREE.Color[] = [];
    
    const palette = [
      new THREE.Color("#C2A884"), 
      new THREE.Color("#A88A62"), 
      new THREE.Color("#8A6E4B"), 
      new THREE.Color("#B39B78"), 
    ];
    
    let yOffset = -2;
    for (let layer = TOTAL_LAYERS; layer >= 1; layer--) {
      const cubesInRow = layer * 2; 
      const startX = -(cubesInRow * SPACING) / 2 + SPACING / 2;
      const startZ = -(cubesInRow * SPACING) / 2 + SPACING / 2;

      for (let x = 0; x < cubesInRow; x++) {
        for (let z = 0; z < cubesInRow; z++) {
          const isEdge = x === 0 || x === cubesInRow - 1 || z === 0 || z === cubesInRow - 1;
          const erosionFactor = isEdge ? EROSION_CHANCE * 2 : EROSION_CHANCE;
          
          if (Math.random() > erosionFactor) {
            pPos.push(new THREE.Vector3(startX + x * SPACING, yOffset, startZ + z * SPACING));
            colArray.push(palette[Math.floor(Math.random() * palette.length)]);
          }
        }
      }
      yOffset += CUBE_SIZE;
    }

    const totalCount = pPos.length;

    for (let i = 0; i < totalCount; i++) {
      const isLeftArm = i % 2 === 0;
      const t = Math.random(); 
      
      const height = 5;
      const spread = 2.5;
      
      let x = isLeftArm ? -spread * t : spread * t;
      let y = height * t - (height / 2); 
      let z = (Math.random() - 0.5) * 1.5; 
      
      x += (Math.random() - 0.5) * 0.4;
      y += (Math.random() - 0.5) * 0.4;
      
      vPos.push(new THREE.Vector3(x, y, z));
    }

    vPos.sort((a, b) => a.y - b.y);

    return { pyramidPositions: pPos, vPositions: vPos, colors: colArray, count: totalCount };
  }, []);

  useEffect(() => {
    if (meshRef.current) {
      for (let i = 0; i < count; i++) {
        meshRef.current.setColorAt(i, colors[i]);
      }
      meshRef.current.instanceColor!.needsUpdate = true;
    }
  }, [colors, count]);

  const dustCount = 300;
  const dustPositions = useMemo(() => {
    const pos = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20; 
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10; 
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20; 
    }
    return pos;
  }, []);

  const { scrollYProgress } = useScroll();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      const mapped = Math.min(Math.max(latest * 2, 0), 1);
      setProgress(mapped);
    });
  }, [scrollYProgress]);

  const mousePos = useRef(new THREE.Vector3(999, 999, 999));
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (!meshRef.current) return;

    const planeZ = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    state.camera.updateMatrixWorld();
    state.raycaster.setFromCamera(state.pointer, state.camera);
    state.raycaster.ray.intersectPlane(planeZ, mousePos.current);

    const time = state.clock.getElapsedTime();
    const easeProgress = progress; 
    
    if (dustRef.current) {
      dustRef.current.rotation.y = time * 0.02;
      dustRef.current.rotation.x = Math.sin(time * 0.05) * 0.1;
    }

    for (let i = 0; i < count; i++) {
      const p1 = pyramidPositions[i];
      const p2 = vPositions[i];
      
      let currentX = p1.x + (p2.x - p1.x) * easeProgress;
      let currentY = p1.y + (p2.y - p1.y) * easeProgress;
      let currentZ = p1.z + (p2.z - p1.z) * easeProgress;

      if (easeProgress > 0) {
        const noise = Math.sin(time * 1.5 + p2.y) * 0.15 * easeProgress;
        currentX += noise;
        currentY += noise;
      }

      if (easeProgress < 0.1 && mousePos.current.z !== 999) {
        const dx = currentX - mousePos.current.x;
        const dy = currentY - mousePos.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        const radius = 1.5; 
        if (dist < radius) {
          const force = Math.pow((radius - dist) / radius, 2); 
          currentX += (dx / dist) * force * 0.2;
          currentY += (dy / dist) * force * 0.2;
          currentZ += force * 0.1; 
        }
      }

      dummy.position.set(currentX, currentY, currentZ);
      
      if (easeProgress === 0) {
        const randomRotX = Math.sin(i * 0.1) * 0.05;
        const randomRotZ = Math.cos(i * 0.1) * 0.05;
        dummy.rotation.set(randomRotX, 0, randomRotZ);
      } else {
        dummy.rotation.set(time * 0.2 + p2.x, time * 0.2 + p2.y, 0);
      }

      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <SpotLight position={[15, 20, 15]} angle={0.4} penumbra={1} intensity={3} castShadow color="#FFF8F0" />
      <pointLight position={[-10, -5, -10]} intensity={1.5} color="#D4A373" />
      
      <group position={[0, -1, -3]}>
        <instancedMesh ref={meshRef} args={[undefined, undefined, count]} castShadow receiveShadow>
          <boxGeometry args={[CUBE_SIZE, CUBE_SIZE, CUBE_SIZE]} />
          <meshStandardMaterial 
            roughness={1}
            metalness={0.0}
          />
        </instancedMesh>
      </group>

      <points ref={dustRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={dustPositions.length / 3}
            array={dustPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.08} color="#EAE0D5" transparent opacity={0.3} sizeAttenuation={true} />
      </points>
      
      <Environment preset="city" />
      <ContactShadows position={[0, -3.5, -3]} opacity={0.7} scale={25} blur={3} far={5} color="#1A120B" />
    </>
  );
}
