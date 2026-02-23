'use client';

import { useEffect, useState } from 'react';

import { useTheme } from 'next-themes';
import { MdDarkMode, MdLightMode } from 'react-icons/md';

export default function DarkModeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      className="rounded-full p-2 text-2xl transition-colors hover:bg-zinc-200/30 dark:hover:bg-zinc-700/40"
      aria-label="다크모드 토글"
      type="button"
    >
      {resolvedTheme === 'dark' ? <MdDarkMode /> : <MdLightMode />}
    </button>
  );
}
