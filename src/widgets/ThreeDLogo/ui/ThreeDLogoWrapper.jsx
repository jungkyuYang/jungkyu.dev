'use client';

import React, { useState, useEffect, useRef } from 'react';

import { useTheme } from 'next-themes'; // next-themes 추가
import { createPortal } from 'react-dom';

import { LogoStoreContext, createLogoStore, useLogoStore } from '@/shared/model/useLogoStore';
import { ThreeDLogo } from '@/shared/ui/bentoGrid/ThreeDLogo';

export const ThreeDLogoWrapper = ({ name = 'LOGO', options = {} }) => {
  const [store] = useState(() => createLogoStore(name));
  return (
    <LogoStoreContext.Provider value={store}>
      <LogoWrapperInner name={name} options={options} />
    </LogoStoreContext.Provider>
  );
};

function LogoWrapperInner({ name, options }) {
  const { resolvedTheme } = useTheme(); // 🚀 현재 테마 상태 가져오기
  const [isInitial, setIsInitial] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  const setLogoState = useLogoStore((s) => s.setLogoState);
  const prevOptionsRef = useRef(null);
  const slotRef = useRef(null);

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

  // ── 테마 및 옵션 동기화 로직 ────────────────────────────────
  useEffect(() => {
    if (!mounted) return;

    // 🎨 테마에 따른 폰트 색상 결정
    const isDark = resolvedTheme === 'dark';
    const themeColor = isDark ? '#ffffff' : '#1a1a1a';

    setLogoState({
      name,
      isActive: isInitial,
      options: {
        ...options,
        color: themeColor, // 🚀 여기에 다크모드 색상 반영
        visuals: {
          ...options.visuals,
          scale: isInitial ? (isMobile ? 1.2 : 1.5) : isMobile ? 1.6 : 1.0,
          isInitial,
        },
        physics: {
          ...options.physics,
          lerpSpeed: 0.05,
          viewportRatio: isMobile ? 4 : 10,
        },
      },
    });

    prevOptionsRef.current = JSON.stringify(options);
  }, [name, options, isInitial, isMobile, setLogoState, mounted, resolvedTheme]); // 🚀 resolvedTheme 의존성 추가

  if (!mounted) return null;

  const logoContent = (
    <div
      className={`transition-all duration-1000 ease-in-out ${
        isInitial
          ? 'fixed inset-0 z-[9999] bg-white/40 dark:bg-black/40 backdrop-blur-3xl flex items-center justify-center'
          : 'absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none'
      }`}
    >
      <div className="w-full h-full relative flex items-center justify-center">
        <ThreeDLogo />
      </div>
    </div>
  );

  return (
    <div ref={slotRef} className="relative w-full h-full">
      {isInitial ? createPortal(logoContent, document.body) : logoContent}
    </div>
  );
}
