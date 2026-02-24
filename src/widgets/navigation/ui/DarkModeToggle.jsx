// src/widgets/navigation/ui/DarkModeToggle.jsx
'use client';

import { MdDarkMode, MdLightMode } from 'react-icons/md';

import { cn } from '@/shared/lib/utils';

import { useThemeMode } from '../lib/useThemeMode'; // 만든 훅 가져오기

export const DarkModeToggle = ({ className }) => {
  const { isDark, toggleTheme, isMounted } = useThemeMode();

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label="Toggle Dark Mode"
      className={cn(
        'rounded-full p-2 text-2xl text-zinc-900 transition-colors hover:bg-zinc-200/30 dark:text-zinc-100 dark:hover:bg-zinc-700/40',
        'flex shrink-0 items-center justify-center',
        className,
      )}
    >
      {!isMounted ? (
        <div className="h-6 w-6" /> // 아이콘 크기만큼 빈 공간 확보
      ) : isDark ? (
        <MdDarkMode />
      ) : (
        <MdLightMode />
      )}
    </button>
  );
};
