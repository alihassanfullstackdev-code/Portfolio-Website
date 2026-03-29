/// <reference types="@react-three/fiber" />
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { TorusKnot, Preload } from '@react-three/drei';
import * as THREE from 'three';

const AnimatedTorusKnot = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_state, delta) => {
    if (meshRef.current) {
      // Using delta ensures smooth animation across different refresh rates
      meshRef.current.rotation.x += delta * 0.3;
      meshRef.current.rotation.y += delta * 0.2;
      meshRef.current.rotation.z += delta * 0.1;
    }
  });

  return (
    <TorusKnot ref={meshRef} args={[1, 0.4, 128, 16]} scale={2.8}>
      <meshStandardMaterial color="#f59e0b" wireframe />
    </TorusKnot>
  );
};

const TorusKnotCanvas = () => {
  return (
    <Canvas 
      camera={{ position: [0, 0, 6], fov: 60 }}
      dpr={[1, 1.5]} // Optimizes performance by capping resolution on high-DPI screens
      performance={{ min: 0.5 }} // Allows R3F to scale down quality if frame rate drops
      gl={{ 
        powerPreference: "high-performance", // Hints the browser to prioritize GPU resources
        antialias: true,
        alpha: true,
        stencil: false, // Disabling unused stencil buffer saves GPU memory
        depth: true,
        preserveDrawingBuffer: false
      }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <AnimatedTorusKnot />
      <Preload all />
    </Canvas>
  );
};

export default TorusKnotCanvas;