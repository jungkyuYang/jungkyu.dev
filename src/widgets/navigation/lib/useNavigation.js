// src/widgets/navigation/lib/useNavigation.js
'use client';

import { useCallback, useMemo } from 'react';

import { useSearchParams, usePathname } from 'next/navigation';

import data from '@/shared/constants/data.json';

export const useNavigation = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const customUsername = searchParams.get('customUsername');

  // 1. 사용자 정보 로직
  const { username, avatarUrl } = useMemo(
    () => ({
      username: customUsername || data.githubUsername,
      avatarUrl: customUsername ? `https://github.com/${customUsername}.png` : data.avatarUrl,
    }),
    [customUsername],
  );

  // 2. 경로 생성 함수
  const getHref = useCallback(
    (path) => {
      return path + (customUsername ? `?customUsername=${customUsername}` : '');
    },
    [customUsername],
  );

  // 3. 메뉴 데이터
  const menuItems = useMemo(
    () => [
      { label: 'Projects', path: '/projects' },
      { label: 'Contact', path: '/contact' },
    ],
    [],
  );

  // 4. TryYourself 전용 데이터 (UI 분리 핵심)
  const tryYourself = useMemo(
    () => ({
      href: customUsername ? '/' : '/search',
      label: customUsername ? `Showing: ${customUsername} ❌` : 'Try yourself',
    }),
    [customUsername],
  );

  return {
    username,
    avatarUrl,
    customUsername,
    getHref,
    pathname,
    menuItems,
    tryYourself, // 👈 추가된 판단 로직
  };
};
