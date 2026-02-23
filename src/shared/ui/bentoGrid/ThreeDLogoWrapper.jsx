'use client';

import React, { useState, useEffect } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';

import { ThreeDLogo } from './ThreeDLogo';

export const ThreeDLogoWrapper = ({ name = 'LOGO' }) => {
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

  if (!mounted) return null;

  // 1. 상태에 따라 '변화할 부분'만 객체로 정의
  // 이제 Wrapper는 BASE_LOGO_OPTIONS 같은 거대한 설정을 들고 있지 않습니다.
  const activeOptions = {
    visuals: {
      scale: isInitial ? (isMobile ? 1.2 : 1.5) : 0.8,
      isInitial: isInitial,
    },
    physics: {
      viewportRatio: isMobile ? 6 : 10,
    },
  };

  return (
    <div className="relative flex h-full w-full items-center justify-center">
      {/* 1. 쇼타임 레이어 (Portal) */}
      {createPortal(
        <AnimatePresence>
          {isInitial && (
            <motion.div
              key="intro-portal"
              className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/20 backdrop-blur-xl"
            >
              {/* 필요한 차이점만 options로 주입 */}
              <ThreeDLogo name={name} options={activeOptions} isActive={true} />
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}

      {/* 2. 안착 레이어 (Local) */}
      <AnimatePresence>
        {!isInitial && (
          <motion.div key="card-settled" className="flex h-full w-full items-center justify-center">
            <ThreeDLogo name={name} options={activeOptions} isActive={false} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
