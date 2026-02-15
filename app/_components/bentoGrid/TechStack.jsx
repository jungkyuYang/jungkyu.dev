'use client';

import React, { useState, useEffect, useCallback } from "react";
// 동일 폴더의 TooltipPortal 임포트
import { TooltipPortal } from "./TooltipPortal"; 

export const TechStack = ({ mainItems, libraries }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // 툴팁 노출 여부와 위치 상태
  const [hoveredItem, setHoveredItem] = useState(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => setMounted(true), []);

  // 마우스 이동 시 실시간 좌표 업데이트
  const handleMouseMove = useCallback((e) => {
    setCoords({ x: e.clientX, y: e.clientY });
  }, []);

  if (!mounted) return null;

  const displayItems = mainItems.slice(0, 6);
  const libraryEntries = Object.entries(libraries);

  return (
    <div className="relative flex py-2 px-1 flex-col h-full w-full min-h-0 select-none">
      
      {/* 1. 조건부 렌더링으로 포탈 호출 */}
      {hoveredItem && <TooltipPortal item={hoveredItem} coords={coords} />}

      {/* --- 헤더 --- */}
      <header className="flex justify-between items-start pt-1 px-1 mb-4 shrink-0 transition-all">
        <div className="flex flex-col gap-0.5">
          <h2 className="text-[10px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.2em]">Tech Stack</h2>
          <p className="text-[14px] font-black text-zinc-900 dark:text-zinc-100 tracking-tight uppercase">
            {showDetails ? "Sub Skills" : "Main Skills"}
          </p>
        </div>
      </header>

      {/* --- 메인 영역 --- */}
      <div className="flex-1 min-h-0 px-0.5 relative">
        {!showDetails ? (
          <div className="h-full flex flex-col justify-between gap-1 animate-in fade-in duration-300">
            {displayItems.map((item) => (
              <div 
                key={item.name} 
                // 2. 마우스 이벤트 연결
                onMouseEnter={() => setHoveredItem(item)}
                onMouseLeave={() => setHoveredItem(null)}
                onMouseMove={handleMouseMove}
                className="group flex flex-1 items-center justify-between p-1.5 rounded-2xl hover:bg-white dark:hover:bg-zinc-800/50 transition-all duration-300 border border-transparent hover:border-zinc-200/50 dark:hover:border-zinc-700/50 cursor-help"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 flex-none flex items-center justify-center rounded-xl bg-white dark:bg-zinc-900 shadow-sm border border-zinc-100 dark:border-zinc-800 group-hover:scale-110 transition-transform duration-300">
                    <img src={item.icon} alt={item.name} className="w-4.5 h-4.5 grayscale group-hover:grayscale-0 transition-all duration-500" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[12px] font-black text-zinc-800 dark:text-zinc-200 truncate leading-tight tracking-tight">
                      {item.name}
                    </span>
                  </div>
                </div>
                
                <span className={`flex-none text-[8px] font-black px-1.5 py-0.5 rounded-md ml-2 ${
                  item.level === '상' ? 'text-emerald-500 bg-emerald-500/10' : 
                  item.level === '중' ? 'text-amber-500 bg-amber-500/10' : 'text-zinc-400 bg-zinc-400/10'
                }`}>{item.level}</span>
              </div>
            ))}
          </div>
        ) : (
          /* 서브 스택 리스트 (동일) */
          <div className="h-full flex flex-col justify-between animate-in fade-in slide-in-from-bottom-2 duration-400">
            {libraryEntries.slice(0, 6).map(([category, items], index) => (
              <div key={category} className={`flex flex-1 flex-col justify-center min-h-0 py-1 ${index !== libraryEntries.slice(0, 6).length - 1 ? "border-b border-black/[0.05] dark:border-white/[0.05]" : ""}`}>
                <div className="flex items-center gap-2 mb-2 px-0.5">
                  <h4 className="text-[8px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-[0.15em]">{category}</h4>
                  <div className="h-[1px] flex-1 bg-blue-600/10 dark:bg-blue-400/10" />
                  <span className="text-[7px] font-black text-blue-600/30 dark:text-blue-400/30 tabular-nums">{items.length.toString().padStart(2, '0')}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {items.map((name) => (
                    <span key={name} className="px-2 py-0.5 text-[9px] font-black rounded-lg bg-white dark:bg-white/[0.03] border border-zinc-200 dark:border-white/[0.08] text-zinc-600 dark:text-zinc-400 tracking-tight">
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* --- 버튼 영역 --- */}
      <div className="flex-none pt-3">
        <button onClick={() => setShowDetails(!showDetails)} className="w-full py-2.5 px-4 flex items-center justify-center rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:opacity-90 transition-all active:scale-[0.98]">
          <div className="flex items-center justify-center gap-2 font-black tracking-tight uppercase text-[10px]">
            {!showDetails ? (
              <><span>All Tech-Stack</span><svg fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3 h-3"><path d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg></>
            ) : (
              <><span>Back to Main</span><svg fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg></>
            )}
          </div>
        </button>
      </div>
    </div>
  );
};