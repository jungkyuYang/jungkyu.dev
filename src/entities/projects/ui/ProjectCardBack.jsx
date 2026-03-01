'use client';

import Link from 'next/link';

import { cn } from '@/shared/lib/utils';
import { buttonVariants } from '@/shared/ui/Button'; // 스타일만 가져옵니다.

export const ProjectCardBack = ({ title, buttons = [] }) => {
  // 🌟 모든 버튼의 '외형'을 결정하는 공통 클래스
  // buttonVariants를 직접 호출하여 Button 컴포넌트와 동일한 디자인을 확보합니다.
  const getButtonClass = (variant) =>
    cn(
      buttonVariants({ variant: variant || 'project', size: 'lg' }),
      'w-full cursor-pointer relative z-30', // 추가 스타일
    );

  return (
    <nav
      className="flex w-full flex-col items-center gap-3 px-8"
      onClick={(e) => e.stopPropagation()}
    >
      {title && (
        <p className="mb-2 text-xs font-medium tracking-widest text-zinc-400 uppercase">{title}</p>
      )}

      {buttons.map((btn, idx) => {
        const isExternal = btn.type === 'external';
        const hasUrl = !!btn.url;
        const buttonKey = `${btn.label}-${idx}`;
        const className = getButtonClass(btn.variant);

        // 1. 외부 링크인 경우 (<a> 태그 자체가 버튼이 됨)
        if (hasUrl && isExternal) {
          return (
            <a
              key={buttonKey}
              href={btn.url}
              target="_blank"
              rel="noopener noreferrer"
              className={className}
            >
              {btn.label}
            </a>
          );
        }

        // 2. 내부 링크인 경우 (Next.js <Link> 자체가 버튼이 됨)
        if (hasUrl && !isExternal) {
          return (
            <Link key={buttonKey} href={btn.url} className={className}>
              {btn.label}
            </Link>
          );
        }

        // 3. 링크가 없는 일반 액션인 경우 (<button> 태그 사용)
        return (
          <button
            key={buttonKey}
            type="button"
            className={className}
            onClick={(e) => {
              e.stopPropagation();
              btn.onClick?.();
            }}
          >
            {btn.label}
          </button>
        );
      })}
    </nav>
  );
};
