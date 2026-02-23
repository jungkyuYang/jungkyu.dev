'use client';

import { useLinkStatus } from 'next/link'; // 기존 사용하시던 훅 그대로 활용

import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingIndicator() {
  const { pending } = useLinkStatus();

  return (
    <AnimatePresence>
      {pending && (
        <motion.div
          // 1. 초기 상태: 선의 길이를 0으로 시작
          initial={{ width: 0, opacity: 0 }}
          // 2. 나타날 때: 부드럽게 100%로 확장
          animate={{ width: '100%', opacity: 1 }}
          // 3. 사라질 때: 자연스럽게 페이드 아웃
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.4,
            ease: 'easeInOut',
          }}
          className="absolute -bottom-1 left-0 h-[1.5px] bg-zinc-400 dark:bg-zinc-500"
          style={{ originX: 0 }} // 왼쪽에서 오른쪽으로 길어지도록 설정
        />
      )}
    </AnimatePresence>
  );
}
