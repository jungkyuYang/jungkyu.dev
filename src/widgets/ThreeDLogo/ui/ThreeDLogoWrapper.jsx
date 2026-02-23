'use client';

import React, { useState, useEffect, useRef } from 'react';

import { useTheme } from 'next-themes';
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
  const { resolvedTheme } = useTheme();

  // 💡 1. 기본값을 false로 두어 인트로 모드를 비활성화합니다.
  // 나중에 쓰고 싶을 때 true로 바꾸거나, URL 쿼리 등에 연동하면 됩니다.
  const [isInitial, setIsInitial] = useState(false);

  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  const setLogoState = useLogoStore((s) => s.setLogoState);
  const slotRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);

    // 💡 2. 인트로 모드가 활성화(true)일 때만 타이머가 작동하도록 보호
    let timer;
    if (isInitial) {
      timer = setTimeout(() => setIsInitial(false), 2500);
    }

    return () => {
      if (timer) clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, [isInitial]);

  useEffect(() => {
    if (!mounted) return;

    const isDark = resolvedTheme === 'dark';
    const themeColor = isDark ? '#ffffff' : '#1a1a1a';

    setLogoState({
      name,
      isActive: isInitial,
      options: {
        ...options,
        color: themeColor,
        visuals: {
          ...options.visuals,
          // 인트로 상태 여부에 따른 스케일 차등 적용
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
  }, [name, options, isInitial, isMobile, setLogoState, mounted, resolvedTheme]);

  if (!mounted) return null;

  // 💡 3. 로직은 그대로 유지하되, 상태에 따라 Portal 여부만 결정
  const logoContent = (
    <div
      className={`transition-all duration-1000 ease-in-out ${
        isInitial
          ? 'fixed inset-0 z-[9999] flex items-center justify-center bg-white/40 backdrop-blur-3xl dark:bg-black/40'
          : 'pointer-events-none absolute inset-0 flex h-full w-full items-center justify-center'
      }`}
    >
      <div className="relative flex h-full w-full items-center justify-center">
        <ThreeDLogo />
      </div>
    </div>
  );

  return (
    <div ref={slotRef} className="relative h-full w-full">
      {/* isInitial이 true일 때만 Body로 쏴주고, 평소에는 제자리에 둡니다. */}
      {isInitial ? createPortal(logoContent, document.body) : logoContent}
    </div>
  );
}
