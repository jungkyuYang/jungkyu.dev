// components/BentoCard.jsx
"use client"; // 클라이언트 컴포넌트 선언

import { motion } from "framer-motion";

export const BentoCard = ({ children, span, className = "" }) => {
  return (
    <motion.div
      // 1. 초기 상태 및 등장 애니메이션
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}

      // 2. 호버 인터렉션
      whileHover={{ 
        y: -5, // 살짝 위로 부양
        scale: 1.01, // 아주 미세한 확대
        transition: { duration: 0.2 } 
      }}
      whileTap={{ scale: 0.98 }} // 클릭 시 눌리는 느낌
      
      className={`
        relative overflow-hidden rounded-[32px] 
        border border-black/[0.05] dark:border-white/[0.05]
        bg-white/80 dark:bg-[#1D1D1F]/80 backdrop-blur-xl
        shadow-[0_8px_30px_rgb(0,0,0,0.04)]
        dark:shadow-[0_20px_40px_rgba(0,0,0,0.3)]
        transition-shadow duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)]
        flex flex-col p-2
        ${span} ${className}
      `}
    >
      {/* 3. Spotlight 효과를 위한 오버레이 (선택사항) */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-br from-white/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      
      {children}
    </motion.div>
  );
};