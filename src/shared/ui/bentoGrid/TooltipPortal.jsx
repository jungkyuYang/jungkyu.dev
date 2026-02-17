import { useEffect, useState } from 'react';

import ReactDOM from 'react-dom';

export const TooltipPortal = ({ item, coords }) => {
  const [isMobile, setIsMobile] = useState(false);

  // 모바일 여부 체크
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const accentColor = item.color || 'bg-blue-500';

  // --- 모바일/데스크톱 조건부 스타일 ---
  const mobileStyles = {
    left: '50%',
    bottom: '20px',
    top: 'auto',
    transform: 'translateX(-50%)',
    position: 'fixed',
  };

  const desktopStyles = {
    left: `${coords.x + 20}px`,
    top: `${coords.y}px`,
    transform: 'translateY(-50%)',
    position: 'fixed',
  };

  return ReactDOM.createPortal(
    <div
      className="fixed z-[9999] pointer-events-none transition-all duration-300 ease-out"
      style={isMobile ? mobileStyles : desktopStyles}
    >
      <div
        className={`relative group animate-in fade-in duration-200 ${
          isMobile ? 'zoom-in-95 slide-in-from-bottom-4' : 'zoom-in-95 slide-in-from-left-2'
        }`}
      >
        {/* --- 배경 및 컨테이너 (모바일에서는 가로를 조금 더 넓게 사용 가능) --- */}
        <div
          className={`${isMobile ? 'w-[85vw] max-w-[320px]' : 'w-52'} p-3.5 rounded-2xl bg-white/90 dark:bg-zinc-950/90 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/40 dark:border-zinc-800/50`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="relative">
                <span className={`block w-2 h-2 rounded-full ${accentColor}`} />
                <span
                  className={`absolute inset-0 w-2 h-2 rounded-full ${accentColor} animate-ping opacity-40`}
                />
              </div>
              <span className="text-[11px] font-black uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
                {item.name}
              </span>
            </div>
            <span className="text-[9px] font-black px-1.5 py-0.5 rounded-md bg-zinc-900/5 dark:bg-white/10 text-zinc-500 dark:text-zinc-400">
              {item.level || 'Expert'}
            </span>
          </div>

          <p className="text-[11px] leading-[1.6] font-bold text-zinc-600 dark:text-zinc-400 tracking-tight">
            {item.description}
          </p>

          <div className="mt-3 h-[1px] w-full bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-700 to-transparent opacity-50" />
        </div>

        {/* --- 화살표: 모바일에서는 숨김 (중앙 하단 배치이므로) --- */}
        {!isMobile && (
          <div
            className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-3 h-3 rotate-45 
                        bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl
                        border-l border-b border-white/40 dark:border-zinc-800/50"
          />
        )}
      </div>
    </div>,
    document.body,
  );
};
