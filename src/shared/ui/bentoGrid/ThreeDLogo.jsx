'use client';

import React, { Suspense, useRef, useCallback } from 'react';

import { Environment } from '@react-three/drei';
import { Canvas, useThree } from '@react-three/fiber';

import { useLogoStore } from '@/shared/model/useLogoStore';

import { LogoMesh } from './LogoMesh';

/**
 * ThreeDLogo Component
 * 3D 장면의 전체적인 Canvas 설정과 마우스/터치 이벤트를 관리합니다.
 */
export function ThreeDLogo({ children }) {
  const options = useLogoStore((s) => s.options);
  const isActive = useLogoStore((s) => s.isActive);

  // ── 드래그 및 상태 관리를 위한 Refs ──────────────────────────
  // 매 프레임 발생하는 변경사항을 리렌더링 없이 처리하기 위해 Ref를 사용합니다.
  const isDragging = useRef(false);
  const prevPointer = useRef({ x: 0, y: 0 });
  const dragDelta = useRef({ x: 0, y: 0 });

  // 인트로 애니메이션 중에는 드래그 인터랙션을 비활성화합니다.
  const isInteractive = !isActive;

  // ── 이벤트 핸들러 ──────────────────────────────────────────

  const handlePointerDown = useCallback(
    (e) => {
      if (!isInteractive) return;
      isDragging.current = true;
      // 초기 클릭 위치 저장
      prevPointer.current = { x: e.clientX, y: e.clientY };
      // 커서 스타일 변경
      e.currentTarget.style.cursor = 'grabbing';
    },
    [isInteractive],
  );

  const handlePointerMove = useCallback((e) => {
    if (!isDragging.current) return;

    // 이전 위치와의 차이 계산 (델타값)
    const dx = e.clientX - prevPointer.current.x;
    const dy = e.clientY - prevPointer.current.y;

    // LogoMesh의 useFrame에서 사용할 수 있도록 누적
    dragDelta.current.x += dx;
    dragDelta.current.y += dy;

    // 현재 위치를 다시 이전 위치로 업데이트
    prevPointer.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handlePointerUp = useCallback(
    (e) => {
      isDragging.current = false;
      if (e.currentTarget) {
        e.currentTarget.style.cursor = isInteractive ? 'grab' : 'default';
      }
    },
    [isInteractive],
  );

  if (!options || !options.camera) return null;

  return (
    <Canvas
      camera={options.camera}
      dpr={options.dpr}
      gl={{ preserveDrawingBuffer: false }}
      // 전역 포인터 이벤트 바인딩
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      style={{ cursor: isInteractive ? 'grab' : 'default', touchAction: 'none' }}
    >
      <Suspense fallback={null}>
        {/* 라이트 설정 */}
        <ambientLight {...options.lights?.ambient} />
        <pointLight {...options.lights?.point} />

        {/* 장면 컨트롤러에 드래그 데이터와 상태를 전달 */}
        <SceneController dragDelta={dragDelta} isDragging={isDragging}>
          {children}
        </SceneController>

        <Environment preset={options.environment} />
      </Suspense>
    </Canvas>
  );
}

/**
 * SceneController Component
 * Canvas 내부의 viewport와 responsive scale을 계산하고 LogoMesh를 렌더링합니다.
 */
function SceneController({ children, dragDelta, isDragging }) {
  const { viewport } = useThree();
  const viewportRatio = useLogoStore((s) => s.options.physics?.viewportRatio || 10);

  // 뷰포트 크기에 따른 반응형 스케일 계산
  const responsiveScale = Math.min(viewport.width / viewportRatio, 1);

  return (
    <LogoMesh responsiveScale={responsiveScale} dragDelta={dragDelta} isDragging={isDragging}>
      {children}
    </LogoMesh>
  );
}
