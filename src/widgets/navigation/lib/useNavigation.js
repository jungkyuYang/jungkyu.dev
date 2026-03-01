// src/widgets/navigation/lib/useNavigation.js
'use client';

import { useCallback, useMemo } from 'react';

import { useSearchParams, usePathname } from 'next/navigation';

import data from '@/shared/constants/data.json';

export const useNavigation = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // 💡 쿼리 스트링 키를 'username'으로 통일
  const usernameFromQuery = searchParams.get('username');

  // 1. 사용자 정보 로직
  const { username, avatarUrl } = useMemo(
    () => ({
      // 쿼리에 있으면 쿼리값, 없으면 JSON의 기본값(내 이름) 사용
      username: usernameFromQuery || data.githubUsername,
      avatarUrl: usernameFromQuery ? `https://github.com/${usernameFromQuery}.png` : data.avatarUrl,
    }),
    [usernameFromQuery],
  );

  // 2. 경로 생성 함수 (메뉴 이동 시 유저 정보를 유지하기 위함)
  const getHref = useCallback(
    (path) => {
      // 💡 여기서도 키값을 'username'으로 맞춰서 링크 생성
      return path + (usernameFromQuery ? `?username=${usernameFromQuery}` : '');
    },
    [usernameFromQuery],
  );

  // 3. 메뉴 데이터
  const menuItems = useMemo(
    () => [
      { label: 'Projects', path: '/projects' },
      { label: 'Contact', path: '/contact' },
    ],
    [],
  );

  // 4. TryYourself 전용 데이터
  const tryYourself = useMemo(
    () => ({
      href: usernameFromQuery ? '/' : '/search',
      label: usernameFromQuery ? `Showing: ${usernameFromQuery} ❌` : 'Try yourself',
    }),
    [usernameFromQuery],
  );

  return {
    username,
    avatarUrl,
    usernameFromQuery, // 추출된 원본 쿼리값
    getHref,
    pathname,
    menuItems,
    tryYourself,
  };
};
