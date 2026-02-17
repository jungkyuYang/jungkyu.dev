'use client';

import React, { Suspense, useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom'; // 1. 포탈 추가
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text3D, Center, Environment, Float, MeshTransmissionMaterial, PresentationControls, Preload } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

// 로고 메쉬 로직 (동일)
function LogoMesh({ name, isInitial, isActive }) {
  const meshRef = useRef();
  const { viewport } = useThree();
  const responsiveScale = Math.min(viewport.width / 10, 1);

  useFrame(() => {
    if (!meshRef.current) return;
    const baseScale = isInitial ? 2.2 : 1.1;
    const targetScale = baseScale * responsiveScale;
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);

    if (!isInitial && !isActive) {
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, 0, 0.05);
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, 0, 0.05);
    }
  });

  return (
    <Float speed={isInitial ? 4 : 1.5} rotationIntensity={isInitial ? 1 : 0.2} floatIntensity={isInitial ? 1.5 : 0.2}>
      <Center>
        <Text3D
          ref={meshRef}
          font="/fonts/helvetiker_bold.typeface.json"
          size={0.6}
          height={0.2}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
        >
          {name}
          <MeshTransmissionMaterial
            backside={false}
            samples={isInitial ? 2 : 4}
            thickness={isInitial ? 0.8 : 0.15}
            chromaticAberration={isInitial ? 0.6 : 0.05}
            color="#ffffff"
          />
        </Text3D>
      </Center>
    </Float>
  );
}

export const ThreeDLogo = ({ name = "LOGO", isActive }) => {
  const [isInitial, setIsInitial] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    
    const timer = setTimeout(() => setIsInitial(false), 2500);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // SSR 에러 방지
  if (!mounted) return null;

  return (
    <>
      {/* 1. 포털 레이어 (body 최상단으로 탈출) */}
      {createPortal(
        <AnimatePresence>
          {isInitial && (
            <motion.div
              key="portal-logo-container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, filter: "blur(20px)" }}
              transition={{ duration: 0.8 }}
              // fixed inset-0으로 화면 전체 장악
              className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/40 backdrop-blur-md"
              style={{ pointerEvents: 'auto' }}
            >
              <div className="w-screen h-screen">
                <Canvas 
                  key="initial-canvas"
                  camera={{ position: [0, 0, 5], fov: 50 }} 
                  style={{ width: '100vw', height: '100vh' }}
                >
                  <Suspense fallback={null}>
                    <ambientLight intensity={1.2} />
                    <pointLight position={[10, 10, 10]} intensity={2} />
                    <PresentationControls global snap speed={2}>
                      <LogoMesh name={name} isInitial={true} />
                    </PresentationControls>
                    <Environment preset="city" />
                  </Suspense>
                </Canvas>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

      {/* 2. 안착 레이어 (BentoCard 내부) */}
      <div className="absolute inset-0 flex items-center justify-center overflow-visible pointer-events-none">
        {!isInitial && (
          <motion.div
            key="settled-logo-container"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full h-full flex items-center justify-center"
          >
            <Canvas
              key="settled-canvas"
              shadows
              dpr={[1, 1.5]}
              camera={{ 
                position: isMobile ? [0, 5, 22] : [5, 10, 20], 
                fov: isMobile ? 40 : 35 
              }}
              style={{ width: '100%', height: '100%' }}
            >
              <Suspense fallback={null}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <PresentationControls global={isActive} snap speed={2}>
                  <LogoMesh name={name} isInitial={false} isActive={isActive} />
                </PresentationControls>
                <Environment preset="city" />
                <Preload all />
              </Suspense>
            </Canvas>
          </motion.div>
        )}
      </div>
    </>
  );
};