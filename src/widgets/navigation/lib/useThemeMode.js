'use client';

import { useEffect, useState } from 'react';

import { useTheme } from 'next-themes';

export const useThemeMode = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const toggleTheme = () => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');

  return {
    // 마운트 전에는 테마를 알 수 없으므로 기본값을 주거나 로딩 상태를 줌
    isDark: mounted && resolvedTheme === 'dark',
    isMounted: mounted,
    toggleTheme,
  };
};
