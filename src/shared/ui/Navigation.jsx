'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams, usePathname } from 'next/navigation';

import { GoArrowLeft } from 'react-icons/go';

import data from '@/shared/constants/data.json';

import DarkModeToggle from './DarkModeToggle';
import LoadingIndicator from './loading-indicator';

const TryYourself = ({ customUsername }) => {
  const href = customUsername ? '/' : '/search';
  return (
    <Link
      href={href}
      className="text-xs md:text-sm duration-500 !text-zinc-900 dark:!text-zinc-100 border-dashed p-1.5 md:p-2 rounded-sm border-2 border-zinc-500 hover:border-zinc-300 whitespace-nowrap transition-all"
    >
      {customUsername ? `Showing: ${customUsername} ❌` : 'Try yourself'}
    </Link>
  );
};

export const Navigation = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const customUsername = searchParams.get('customUsername');

  const username = customUsername || data.githubUsername;
  const avatarUrl = customUsername ? `https://github.com/${customUsername}.png` : data.avatarUrl;

  const getHref = (path) => {
    return path + (customUsername ? `?customUsername=${customUsername}` : '');
  };

  const isHome = pathname === '/';

  return (
    <nav className="pt-8 md:pt-16 animate-fade-in w-full">
      {/* flex-col: 모바일에서는 수직으로 쌓임
          md:flex-row: 태블릿 이상부터는 수평 정렬
      */}
      <div className="flex flex-col md:flex-row md:items-center justify-between w-full gap-6 md:gap-0">
        {/* 왼쪽 영역: 뒤로가기 + 유저 정보 */}
        <div className="flex items-center justify-between md:justify-start gap-4">
          {!isHome ? (
            <Link
              href={getHref('/')}
              className="duration-500 !text-zinc-500 hover:!text-zinc-900 dark:hover:!text-zinc-100 group flex items-center gap-3 shrink-0"
            >
              <GoArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />

              <div className="flex items-center gap-3">
                <Image
                  src={avatarUrl}
                  alt={username}
                  width={32}
                  height={32}
                  className="rounded-full border border-zinc-500/50 group-hover:border-zinc-900 dark:group-hover:border-zinc-100 transition-colors shrink-0"
                />
                <span className="font-display text-lg md:text-2xl tracking-tight !text-zinc-900 dark:!text-zinc-100 truncate max-w-[150px] md:max-w-none">
                  {username}
                </span>
              </div>
            </Link>
          ) : (
            <div className="hidden md:block w-10" />
          )}

          {/* 모바일에서만 다크모드 토글을 이름 옆으로 배치하고 싶을 때 사용 (선택 사항) */}
          <div className="md:hidden flex items-center gap-2 justify-flex-end">
            <DarkModeToggle />
          </div>
        </div>

        {/* 오른쪽 영역: 메뉴 아이템들 */}
        <ul className="flex items-center justify-center md:justify-end gap-4 md:gap-8">
          <li className="shrink-0">
            <TryYourself customUsername={customUsername} />
          </li>

          <div className="flex items-center gap-4 md:gap-6">
            <li>
              <Link
                href={getHref('/projects')}
                className="text-base md:text-lg duration-500 !text-zinc-900 dark:!text-zinc-100 hover:!text-zinc-700 dark:hover:!text-zinc-300 transition-colors"
              >
                Projects <LoadingIndicator />
              </Link>
            </li>
            <li>
              <Link
                href={getHref('/contact')}
                className="text-base md:text-lg duration-500 !text-zinc-900 dark:!text-zinc-100 hover:!text-zinc-700 dark:hover:!text-zinc-300 transition-colors"
              >
                Contact <LoadingIndicator />
              </Link>
            </li>
            {/* 데스크탑에서만 보이는 다크모드 토글 */}
            <li className="hidden md:block">
              <DarkModeToggle />
            </li>
          </div>
        </ul>
      </div>
    </nav>
  );
};
