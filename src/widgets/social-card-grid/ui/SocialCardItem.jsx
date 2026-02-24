// src/widgets/social-card-grid/ui/SocialCardItem.jsx
'use client';

import { cn } from '@/shared/lib/utils';

import { useSocialCard } from '../model/SocialCardContext';

export const SocialCardItem = ({ item, canCopy = false }) => {
  const { isCopied } = useSocialCard();
  const isShowCopiedUI = canCopy && isCopied;

  return (
    <>
      {/* 장식 선: 높이를 고정값(h-16)으로 주어 위쪽 여백을 일정하게 통제 */}
      <span
        className="absolute top-0 h-16 w-px bg-linear-to-b from-zinc-500/30 via-zinc-500/10 to-transparent"
        aria-hidden="true"
      />

      {/* 아이콘: 크기를 살짝 조절 (h-12 -> h-11) */}
      <span
        className={cn(
          'relative z-10 flex h-11 w-11 items-center justify-center rounded-full border duration-1000',
          'border-zinc-200 text-zinc-500 group-hover:text-current dark:border-zinc-500',
        )}
      >
        {item.icon}
      </span>

      <div className="z-10 flex w-full flex-1 flex-col items-center px-2">
        {/* 텍스트 영역: min-h 대신 py-6~8을 사용하여 상하 균형을 맞춤 */}
        <div className="relative flex w-full items-center justify-center py-6 lg:py-8">
          <div
            className={cn(
              'flex flex-col items-center transition-all duration-300',
              isShowCopiedUI
                ? 'translate-y-1 scale-95 opacity-0'
                : 'translate-y-0 scale-100 opacity-100',
            )}
          >
            {/* 폰트 크기: xl~3xl -> lg~2xl로 한 단계 하향 조정하여 슬림하게 유지 */}
            <h3 className="font-display text-center text-lg leading-tight font-medium break-all md:text-xl lg:text-2xl">
              {item.displayHandle.map((line, idx) => (
                <span key={idx} className={cn('block', idx > 0 && 'mt-1 text-[0.8em] opacity-60')}>
                  {line}
                </span>
              ))}
            </h3>
          </div>

          {/* COPIED! 문구: 절대 위치로 텍스트 중앙에 배치 */}
          {isShowCopiedUI && (
            <span className="animate-in fade-in zoom-in absolute inset-0 flex items-center justify-center text-xl font-bold text-blue-500">
              COPIED!
            </span>
          )}
        </div>

        {/* 라벨: 상단 마진을 줄임 (mt-4 -> mt-2) */}
        <span className="mt-2 text-center text-[10px] tracking-[0.2em] text-zinc-500 uppercase opacity-60 duration-1000 group-hover:opacity-100">
          {item.label}
        </span>
      </div>
    </>
  );
};
