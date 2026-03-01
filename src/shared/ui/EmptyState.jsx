'use client';

import { motion } from 'framer-motion';

export const EmptyState = ({ title, message, children, icon = '📂' }) => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative mb-20 rounded-xl border-2 border-dashed border-zinc-500/10 p-8 dark:border-zinc-500/5"
    >
      {/* 1. 상단 라벨 (공통 스타일) */}
      {title && (
        <span className="absolute -top-3 left-4 bg-white px-2 py-0.5 font-mono text-[10px] font-bold tracking-widest text-zinc-400 uppercase dark:bg-zinc-950">
          {title} Empty
        </span>
      )}

      <div className="flex flex-col items-center justify-center py-10 text-center">
        {/* 2. 아이콘 (위젯마다 다르게 주입 가능) */}
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="mb-4 text-3xl opacity-20"
        >
          {icon}
        </motion.div>

        {/* 3. 메시지 (공통 스타일) */}
        <p className="text-sm font-medium text-zinc-400 dark:text-zinc-500">{message}</p>

        {/* 4. 추가 요소 (위젯마다 다를 수 있는 부분: 버튼, 링크 등) */}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </motion.section>
  );
};
