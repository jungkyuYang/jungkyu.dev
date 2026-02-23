'use client';

import { useCallback, useMemo } from 'react';

import { useSearchParams, usePathname } from 'next/navigation';

import data from '@/shared/constants/data.json';

export const useNavigation = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const customUsername = searchParams.get('customUsername');

  // 1. 사용자 정보 로직 (useMemo로 최적화)
  const { username, avatarUrl } = useMemo(
    () => ({
      username: customUsername || data.githubUsername,
      avatarUrl: customUsername ? `https://github.com/${customUsername}.png` : data.avatarUrl,
    }),
    [customUsername],
  );

  // 2. 경로 생성 함수 (useCallback으로 최적화)
  const getHref = useCallback(
    (path) => {
      return path + (customUsername ? `?customUsername=${customUsername}` : '');
    },
    [customUsername],
  );

  // 3. 메뉴 데이터 (여기서 관리하면 UI가 더 순수해짐)
  const menuItems = useMemo(
    () => [
      { label: 'Projects', path: '/projects' },
      { label: 'Contact', path: '/contact' },
    ],
    [],
  );

  return {
    username,
    avatarUrl,
    customUsername,
    getHref,
    pathname,
    menuItems, // 👈 추가
  };
};
