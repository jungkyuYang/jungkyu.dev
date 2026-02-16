'use client';

import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text3D, Center, Environment, Float, MeshTransmissionMaterial, PresentationControls } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedLogo({ name, isActive }) {
  const meshRef = useRef();
  
  useFrame(() => {
    if (!meshRef.current) return;
    
    // 부모가 focus/hover 되면 1.1로 커지고, 아니면 0.5로 작게 유지
    const targetScale = isActive ? 1.1 : 0.5;
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
  });

  return (
    <Float 
      speed={isActive ? 5 : 1} // 활성화 시 더 역동적으로
      rotationIntensity={isActive ? 1.5 : 0.2} 
      floatIntensity={isActive ? 1.5 : 0.2}
    >
      <Center>
        <Text3D
          ref={meshRef}
          font="https://threejs.org/examples/fonts/helvetiker_bold.typeface.json"
          size={0.6}
          height={0.25}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
        >
          {name}
          <MeshTransmissionMaterial
            backside
            samples={4}
            thickness={isActive ? 0.5 : 0.1}
            chromaticAberration={isActive ? 0.4 : 0.05}
            color="#ffffff"
          />
        </Text3D>
      </Center>
    </Float>
  );
}

export const ThreeDLogoSlot = ({ name = "LOGO", isActive }) => {
  return (
    // 이제 이 div는 단순히 '출력용 도화지' 역할만 수행합니다.
    <div className="absolute inset-[-300px] flex items-center justify-center pointer-events-none overflow-visible">
      <Canvas
        shadows
        camera={{ position: [0, 0, 10], fov: 35 }}
        gl={{ antialias: true, alpha: true }}
        style={{ 
          width: '100%', 
          height: '100%', 
          pointerEvents: isActive ? 'auto' : 'none', // 활성화될 때만 드래그 조작 가능
          overflow: 'visible' 
        }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={isActive ? 1.2 : 0.5} />
          <pointLight position={[15, 15, 15]} intensity={isActive ? 3 : 1} />
          
          <PresentationControls
            global={isActive} // 활성화 상태에서만 전역 드래그 허용
            cursor={isActive}
            snap={true}
            speed={2}
          >
            <AnimatedLogo name={name} isActive={isActive} />
          </PresentationControls>
          
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
};