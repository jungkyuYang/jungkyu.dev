'use client';

import { useEffect, useState } from 'react';

import { useTheme } from 'next-themes';
import { MdDarkMode, MdLightMode } from 'react-icons/md';

export const DarkModeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted)
    return (
      <div className="h-10 w-10 rounded-full bg-zinc-100/50 p-2 opacity-0 dark:bg-zinc-800/50" />
    );

  return (
    <button
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      className="rounded-full p-2 text-2xl text-zinc-900 transition-colors hover:bg-zinc-200/30 dark:text-zinc-100 dark:hover:bg-zinc-700/40"
      aria-label="Toggle Dark Mode"
      type="button"
    >
      {resolvedTheme === 'dark' ? <MdDarkMode /> : <MdLightMode />}
    </button>
  );
};
