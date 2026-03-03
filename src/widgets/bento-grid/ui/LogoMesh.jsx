'use client';

import React, { useRef, useLayoutEffect, useState, useMemo } from 'react';

import { Text3D, Float, MeshTransmissionMaterial, useFont } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import { useLogoStore } from '@/shared/model/useLogoStore';

const tempVec = new THREE.Vector3();
const tempBox = new THREE.Box3();
const tempCenter = new THREE.Vector3();

// ── 튜닝 상수 (Apple Design Language) ──────────────────
const DRAG_SENSITIVITY = 1.5; // 드래그 반응성을 살짝 높임
const INERTIA_DAMPING = 0.9; // 관성을 더 묵직하게 (고급스러운 느낌)
const IDLE_ROTATION_Y = 0.02; // 유휴 회전을 더 천천히
const HOVER_SCALE_UP = 3; // 과하지 않은 절제된 확대

export function LogoMesh({ responsiveScale = 1, dragDelta, isDragging, children }) {
  const meshRef = useRef();
  const innerRef = useRef();
  const isCentered = useRef(false);
  const prevName = useRef('');

  const [hovered, setHovered] = useState(false);
  const velocity = useRef({ x: 0, y: 0 });
  const lastDragAt = useRef(0);

  // 메모리 최적화를 위한 Color 객체 재사용
  const targetColor = useMemo(() => new THREE.Color(), []);

  // Zustand 구독
  const name = useLogoStore((s) => s.name);
  const isActive = useLogoStore((s) => s.isActive);
  const visuals = useLogoStore((s) => s.options.visuals);
  const physics = useLogoStore((s) => s.options.physics);
  const font = useLogoStore((s) => s.options.font);
  const color = useLogoStore((s) => s.options.color);

  const fontData = useFont(font);

  useLayoutEffect(() => {
    isCentered.current = false;
  }, [name, fontData]);

  useFrame((state, delta) => {
    if (!meshRef.current || !innerRef.current) return;

    // 1. 중앙 정렬 로직 (오류 방지를 위해 존재 여부 체크)
    if (!isCentered.current || prevName.current !== name) {
      tempBox.setFromObject(innerRef.current);
      if (!tempBox.isEmpty()) {
        tempBox.getCenter(tempCenter);
        innerRef.current.position.set(-tempCenter.x, -tempCenter.y, -tempCenter.z);
        isCentered.current = true;
        prevName.current = name;
      }
    }

    // 2. 다이내믹 스케일 (Apple-style 부드러운 전이)
    const isInteracting = !isActive && (hovered || isDragging?.current);
    const hoverMultiplier = isInteracting ? HOVER_SCALE_UP : 1.0;
    const targetScale = (visuals?.scale || 1) * responsiveScale * hoverMultiplier;
    tempVec.set(targetScale, targetScale, targetScale);
    meshRef.current.scale.lerp(tempVec, physics?.lerpSpeed || 0.1);

    // 3. 색상 및 재질 실시간 보간
    // innerRef -> Text3D 메쉬에 안전하게 접근
    const textMesh = innerRef.current.children[0];
    if (textMesh && textMesh.material) {
      targetColor.set(color || '#ffffff');
      textMesh.material.color.lerp(targetColor, 0.1);

      // 유리 재질의 투명도에 따른 발광 효과 미세 조정
      if (textMesh.material.emissive) {
        textMesh.material.emissive.lerp(targetColor, 0.05);
        // 다크모드/라이트모드에 따른 발광 강도 최적화
        textMesh.material.emissiveIntensity = THREE.MathUtils.lerp(
          textMesh.material.emissiveIntensity,
          targetColor.r > 0.5 ? 0.1 : 0.4, // 밝은색일 땐 약하게, 어두운색일 땐 선명하게
          0.1,
        );
      }
    }

    // 4. 회전 및 물리 처리
    if (isActive) {
      meshRef.current.rotation.y += delta * 0.8;
      return;
    }

    const hasDrag = dragDelta?.current && (dragDelta.current.x !== 0 || dragDelta.current.y !== 0);
    if (hasDrag) {
      velocity.current.x = dragDelta.current.y * DRAG_SENSITIVITY;
      velocity.current.y = dragDelta.current.x * DRAG_SENSITIVITY;
      dragDelta.current.x = 0;
      dragDelta.current.y = 0;
      lastDragAt.current = state.clock.elapsedTime;
    }

    meshRef.current.rotation.x += velocity.current.x * delta;
    meshRef.current.rotation.y += velocity.current.y * delta;

    const damping = Math.pow(INERTIA_DAMPING, delta * 60);
    velocity.current.x *= damping;
    velocity.current.y *= damping;

    // 5. 유휴 상태 및 수평 복귀
    const timeSinceLastDrag = state.clock.elapsedTime - lastDragAt.current;
    if (timeSinceLastDrag > 0.5) {
      meshRef.current.rotation.y += IDLE_ROTATION_Y * delta * 60;
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        0,
        delta * 0.05,
      );
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.4} {...visuals?.float}>
      <group
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <group ref={innerRef}>
          {fontData &&
            (children || (
              <Text3D
                font={font}
                size={1}
                height={0.15} // 얇고 세련된 두께
                curveSegments={32}
                bevelEnabled
                bevelThickness={0.03}
                bevelSize={0.02}
                bevelSegments={12} // 베벨을 더 매끄럽게
                {...visuals?.text}
              >
                {name}
                <MeshTransmissionMaterial
                  // 🍎 Apple Frosted Glass 고급 설정
                  backside
                  backsideThickness={0.3}
                  thickness={0.4} // 실제 유리의 굴절 깊이
                  transmission={1.0} // 투명도
                  roughness={0.08} // 지문 방지 코팅된 듯한 미세 무광
                  ior={1.45} // 사파이어 글래스 굴절률
                  chromaticAberration={0.04} // 가장자리의 은은한 무지개빛
                  anisotropy={0.5} // 질감의 방향성 있는 빛 반사
                  clearcoat={1} // 표면 광택 레이어
                  clearcoatRoughness={0.1}
                  envMapIntensity={1.5} // 주변 빛을 더 강하게 반사
                  color={color}
                  {...visuals?.material}
                />
              </Text3D>
            ))}
        </group>
      </group>
    </Float>
  );
}
