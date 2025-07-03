"use client";

import { useState, useEffect, useRef } from "react";
import useOutsideClick from "../_hooks/useOutsideClick";

export default function CardFlipContainer({ front, back }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    // 모바일 환경 감지 (최초 렌더링 시 1회만)
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth < 768);
    }
  }, []);

  useOutsideClick(
    cardRef,
    () => {
      if (isMobile && isFlipped) setIsFlipped(false);
    },
    isMobile && isFlipped
  );

  // 앞면 클릭 시 플립(모바일만)
  const handleFrontClick = (e) => {
    if (isMobile && !isFlipped) {
      setIsFlipped(true);
      e.stopPropagation();
    }
  };

  // 뒷면 클릭 시 원상복구(모바일만)
  const handleBackClick = (e) => {
    if (isMobile && isFlipped) {
      setIsFlipped(false);
      e.stopPropagation();
    }
  };

  return (
    <div
      ref={cardRef}
      className="relative group [perspective:1200px] w-full h-full"
    >
      <div
        className={`transition-transform duration-500 [transform-style:preserve-3d] w-full h-full
          ${isFlipped ? "[transform:rotateY(180deg)]" : ""}
          group-hover:[transform:rotateY(180deg)]
        `}
      >
        {/* 앞면: 모바일에서만 클릭 시 플립 */}
        <div
          className="[backface-visibility:hidden] w-full h-full"
          onClick={handleFrontClick}
        >
          {front}
        </div>
        {/* 뒷면: 모바일에서만 클릭 시 원상복구 */}
        <div
          className="absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col justify-center items-center bg-zinc-900 w-full h-full"
          onClick={handleBackClick}
        >
          {back}
        </div>
      </div>
    </div>
  );
}
