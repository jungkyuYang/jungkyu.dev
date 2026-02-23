'use client'; // 클라이언트 컴포넌트 선언

import { motion } from 'framer-motion';

import { cn } from '@/shared/lib/utils';

export const BentoCard = ({ children, span, className = '' }) => {
  return (
    <motion.div
      // 1. 초기 상태 및 등장 애니메이션
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      // 2. 호버 인터렉션
      whileHover={{
        y: -5,
        scale: 1.01,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.98 }}
      // cn을 사용하여 스타일 정리 및 대비 강화
      className={cn(
        // 기본 레이아웃 및 둥근 모서리
        'relative flex flex-col overflow-hidden rounded-[32px] p-2 transition-shadow duration-300',

        // 보더 및 배경 (흰 배경과 구분을 위해 보더 두께 2px 및 색상 조정)
        'border-2 border-zinc-200 bg-zinc-50 dark:border-white/10 dark:bg-[#1D1D1F]',

        // 그림자 및 호버 효과
        'shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)]',

        // 외부 주입 클래스 (span 포함)
        span,
        className,
      )}
    >
      {/* 3. Spotlight 효과를 위한 오버레이 */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-br from-black/[0.03] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:from-white/10" />

      {children}
    </motion.div>
  );
};
