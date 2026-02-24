// src/widgets/navigation/ui/DarkModeToggle.jsx
'use client';

import { MdDarkMode, MdLightMode } from 'react-icons/md';

import { cn } from '@/shared/lib/utils';

import { useThemeMode } from '../lib/useThemeMode';

export const DarkModeToggle = ({ className }) => {
  const { isDark, toggleTheme, isMounted } = useThemeMode();

  const icon = !isMounted || !isDark ? <MdLightMode /> : <MdDarkMode />;

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
      {icon}
    </button>
  );
};
