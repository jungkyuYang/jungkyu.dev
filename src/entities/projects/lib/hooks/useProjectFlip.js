import { useState, useEffect } from 'react';

export function useProjectFlip(cardRef, isFlipped, setIsFlipped) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleToggle = (e) => {
    if (e.target.closest('button') || e.target.closest('a')) {
      return;
    }

    // 모바일일 때만 클릭으로 뒤집기 (데스크톱은 CSS hover가 담당)
    if (isMobile) {
      setIsFlipped(!isFlipped);
      e.stopPropagation();
    }
  };

  return { isMobile, handleToggle };
}
