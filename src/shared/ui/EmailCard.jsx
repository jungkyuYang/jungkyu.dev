'use client';

import { useState } from 'react';

import { Card } from './card';

export const EmailCard = ({ email, icon, emailParts, emailTransform }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      // 1. 클립보드 복사
      await navigator.clipboard.writeText(email);
      setCopied(true);

      // 2. 메일 앱 호출 (현재 탭 유지)
      window.location.href = `mailto:${email}`;

      // 3. 1.5초 후 복구
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error('Failed to copy!', err);
    }
  };

  return (
    <Card>
      {/* [시니어 팁] 기존 Link 카드의 패딩과 정렬 클래스를 그대로 적용하여 
        아이콘과 텍스트의 간격이 다른 카드와 1px의 오차 없이 일치하게 만듭니다.
      */}
      <button
        onClick={handleCopy}
        type="button"
        className="p-4 relative flex flex-col items-center gap-4 duration-700 group md:gap-8 py-12 md:py-20 lg:py-24 cursor-pointer focus:outline-none w-full h-full"
      >
        {/* 중앙 수직 데코레이션 선 */}
        <span
          className="absolute w-px h-2/3 bg-linear-to-b from-zinc-500 via-zinc-500/50 to-transparent"
          aria-hidden="true"
        />

        {/* 아이콘 컨테이너: 
          min-w, min-h를 명시하여 버튼 내부에서 크기가 압축되지 않도록 고정합니다.
        */}
        <span className="relative z-10 flex items-center justify-center w-12 h-12 min-w-[48px] min-h-[48px] text-sm duration-1000 border rounded-full text-zinc-200 group-hover:text-white group-hover:bg-zinc-900 border-zinc-500 bg-zinc-900 group-hover:border-zinc-200 drop-shadow-orange">
          {icon}
        </span>

        <div className="z-10 flex flex-col items-center w-full px-2">
          {/* 텍스트 전환 영역: 
            높이를 고정(min-h)하여 문구가 바뀔 때 레이아웃이 흔들리지 않게 보호합니다.
          */}
          <div className="relative flex items-center justify-center w-full min-h-[60px] lg:min-h-[80px]">
            {/* 평상시: 이메일 주소 */}
            <div
              className={`flex flex-col items-center transition-all duration-300 ${copied ? 'opacity-0 scale-95 translate-y-1' : 'opacity-100 scale-100 translate-y-0'}`}
            >
              <span
                className={`text-xl font-medium duration-150 lg:text-2xl xl:text-3xl !text-zinc-900 dark:!text-zinc-100 group-hover:!text-white font-display ${emailTransform}`}
              >
                {emailParts[0]}
              </span>
              <span className="text-sm md:text-base lg:text-lg opacity-60 font-sans tracking-tighter !text-zinc-900 dark:!text-zinc-100 group-hover:!text-white">
                @{emailParts[1]}
              </span>
            </div>

            {/* 복사 시: COPIED! (적절한 크기로 튀지 않게 강조) */}
            <span
              className={`absolute text-xl lg:text-2xl font-bold text-blue-500 transition-all duration-300 ${copied ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-105 -translate-y-1'}`}
            >
              COPIED!
            </span>
          </div>

          {/* 하단 레이블: 다른 카드와 동일하게 "Email" 유지 */}
          <span className="mt-4 text-sm text-center duration-1000 !text-zinc-500 dark:!text-zinc-400 group-hover:!text-zinc-200 uppercase tracking-widest">
            Email
          </span>
        </div>
      </button>
    </Card>
  );
};
