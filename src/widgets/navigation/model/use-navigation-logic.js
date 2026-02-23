'use client';
import { useSearchParams, usePathname } from 'next/navigation';

import data from '@/shared/constants/data.json';

export const useNavigationLogic = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const queriedUsername = searchParams.get('customUsername');

  const currentUsername = queriedUsername || data.githubUsername;
  const currentUserAvatarUrl = queriedUsername
    ? `https://github.com/${queriedUsername}.png`
    : data.avatarUrl;

  const isHomePage = pathname === '/';

  const getNavigationPath = (targetPath) => {
    if (!queriedUsername) return targetPath;
    return `${targetPath}?customUsername=${queriedUsername}`;
  };

  return {
    currentUsername,
    currentUserAvatarUrl,
    queriedUsername,
    isHomePage,
    getNavigationPath,
  };
};
