import ReactDOM from 'react-dom';

export const TooltipPortal = ({ item, coords }) => {
  // item에 따라 테마 컬러를 동적으로 설정 (item.color가 없을 경우 대비)
  const accentColor = item.color || 'bg-blue-500';

  return ReactDOM.createPortal(
    <div
      className="fixed z-[9999] pointer-events-none transition-transform duration-300 ease-out"
      style={{
        left: `${coords.x + 20}px`, // 커서에서 약간 오른쪽으로
        top: `${coords.y}px`,
        transform: 'translateY(-50%)',
      }}
    >
      <div className="relative group animate-in fade-in zoom-in-95 slide-in-from-left-2 duration-200">
        {/* --- 배경 및 컨테이너 --- */}
        <div className="w-52 p-3.5 rounded-2xl bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/40 dark:border-zinc-800/50">
          {/* --- 상단: 헤더 --- */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              {/* 작은 인디케이터에 펄스 효과 추가 */}
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

            {/* 숙련도 표시 (상/중/하) */}
            <span className="text-[9px] font-black px-1.5 py-0.5 rounded-md bg-zinc-900/5 dark:bg-white/10 text-zinc-500 dark:text-zinc-400">
              {item.level || 'Expert'}
            </span>
          </div>

          {/* --- 중앙: 설명 --- */}
          <p className="text-[11px] leading-[1.6] font-bold text-zinc-600 dark:text-zinc-400 tracking-tight">
            {item.description}
          </p>

          {/* --- 하단: 데코레이션 라인 --- */}
          <div className="mt-3 h-[1px] w-full bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-700 to-transparent opacity-50" />
        </div>

        {/* --- 세련된 화살표 (Glassmorphism 반영) --- */}
        <div
          className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-3 h-3 rotate-45 
                        bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl
                        border-l border-b border-white/40 dark:border-zinc-800/50"
        />
      </div>
    </div>,
    document.body,
  );
};
