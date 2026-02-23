'use client';

import React, { useState, useEffect, useCallback } from 'react';

import Image from 'next/image';

import { TooltipPortal } from './TooltipPortal';

export const TechStack = ({ mainItems, libraries }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [mounted, setMounted] = useState(false);

  const [hoveredItem, setHoveredItem] = useState(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => setMounted(true), []);

  const handleMouseMove = useCallback((e) => {
    setCoords({ x: e.clientX, y: e.clientY });
  }, []);

  if (!mounted) return null;

  const displayItems = mainItems.slice(0, 6);
  const libraryEntries = Object.entries(libraries);

  return (
    <div className="relative flex h-full min-h-0 w-full flex-col px-1 py-2 select-none">
      {hoveredItem && <TooltipPortal item={hoveredItem} coords={coords} />}

      {/* --- 헤더 --- */}
      <header className="mb-4 flex shrink-0 items-start justify-between px-1 pt-1 transition-all">
        <div className="flex flex-col gap-0.5">
          <h2 className="text-[10px] font-black tracking-[0.2em] text-zinc-400 uppercase dark:text-zinc-500">
            Tech Stack
          </h2>
          <p className="text-[14px] font-black tracking-tight text-zinc-900 uppercase dark:text-zinc-100">
            {showDetails ? 'Sub Skills' : 'Main Skills'}
          </p>
        </div>
      </header>

      {/* --- 메인 영역 --- */}
      <div className="no-scrollbar relative min-h-0 flex-1 overflow-y-auto px-0.5 md:overflow-hidden">
        {!showDetails ? (
          /* 📱 모바일: 3열 아이콘 그리드 / 데스크톱: 원래의 리스트 형태 */
          <div className="animate-in fade-in grid h-full grid-cols-3 gap-3 duration-300 md:flex md:flex-col md:justify-between md:gap-1">
            {displayItems.map((item) => (
              <div
                key={item.name}
                onMouseEnter={() => setHoveredItem(item)}
                onMouseLeave={() => setHoveredItem(null)}
                onMouseMove={handleMouseMove}
                // 모바일 터치 대응을 위해 onClick 추가 (필요시)
                onClick={() => setHoveredItem(item)}
                className="group flex cursor-help flex-col items-center justify-center rounded-2xl border border-transparent p-2 transition-all duration-300 hover:border-zinc-200/50 hover:bg-white md:flex-1 md:flex-row md:justify-between md:p-1.5 dark:hover:border-zinc-700/50 dark:hover:bg-zinc-800/50"
              >
                <div className="flex min-w-0 flex-col items-center gap-2.5 md:flex-row">
                  {/* 아이콘 컨테이너 */}
                  <div className="flex h-10 w-10 flex-none items-center justify-center rounded-xl border border-zinc-100 bg-white shadow-sm transition-transform duration-300 group-hover:scale-110 md:h-8 md:w-8 dark:border-zinc-800 dark:bg-zinc-900">
                    <Image
                      src={item.icon}
                      alt={item.name}
                      width={20}
                      height={20}
                      unoptimized
                      className="h-5 w-5 grayscale transition-all duration-500 group-hover:grayscale-0 md:h-4.5 md:w-4.5"
                    />
                  </div>

                  {/* 텍스트: 모바일(md 미만)에서 숨김 */}
                  <div className="hidden min-w-0 flex-col md:flex">
                    <span className="truncate text-[12px] leading-tight font-black tracking-tight text-zinc-800 dark:text-zinc-200">
                      {item.name}
                    </span>
                  </div>
                </div>

                {/* 숙련도 뱃지: 모바일에서 숨김 */}
                <span
                  className={`ml-2 hidden flex-none rounded-md px-1.5 py-0.5 text-[8px] font-black md:block ${
                    item.level === '상'
                      ? 'bg-emerald-500/10 text-emerald-500'
                      : item.level === '중'
                        ? 'bg-amber-500/10 text-amber-500'
                        : 'bg-zinc-400/10 text-zinc-400'
                  }`}
                >
                  {item.level}
                </span>
              </div>
            ))}
          </div>
        ) : (
          /* Sub Skills (기존 구조 유지) */
          <div className="animate-in fade-in slide-in-from-bottom-2 flex h-full flex-col justify-start gap-y-4 duration-400 md:justify-between md:gap-y-0">
            {libraryEntries.slice(0, 6).map(([category, items], index) => (
              <div
                key={category}
                className={`flex min-h-0 flex-none flex-col justify-center py-1 md:flex-1 ${
                  index !== libraryEntries.slice(0, 6).length - 1
                    ? 'border-b border-black/[0.05] dark:border-white/[0.05]'
                    : ''
                }`}
              >
                <div className="mb-2 flex items-center gap-2 px-0.5">
                  <h4 className="text-[8px] font-black tracking-[0.15em] text-blue-600 uppercase dark:text-blue-400">
                    {category}
                  </h4>
                  <div className="h-[1px] flex-1 bg-blue-600/10 dark:bg-blue-400/10" />
                  <span className="text-[7px] font-black text-blue-600/30 tabular-nums dark:text-blue-400/30">
                    {items.length.toString().padStart(2, '0')}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {items.map((name) => (
                    <span
                      key={name}
                      className="rounded-lg border border-zinc-200 bg-white px-2 py-0.5 text-[9px] font-black tracking-tight text-zinc-600 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-zinc-400"
                    >
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
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="flex w-full items-center justify-center rounded-xl bg-zinc-900 px-4 py-2.5 text-white transition-all hover:opacity-90 active:scale-[0.98] dark:bg-zinc-100 dark:text-zinc-900"
        >
          <div className="flex items-center justify-center gap-2 text-[10px] font-black tracking-tight uppercase">
            {!showDetails ? (
              <>
                <span>All Tech-Stack</span>
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={3}
                  stroke="currentColor"
                  className="h-3 w-3"
                >
                  <path d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </>
            ) : (
              <>
                <span>Back to Main</span>
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={3}
                  stroke="currentColor"
                  className="h-3.5 w-3.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </>
            )}
          </div>
        </button>
      </div>
    </div>
  );
};
