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
      className="rounded-sm border-2 border-dashed border-zinc-500 p-1.5 text-xs whitespace-nowrap !text-zinc-900 transition-all duration-500 hover:border-zinc-300 md:p-2 md:text-sm dark:!text-zinc-100"
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
    <nav className="animate-fade-in w-full pt-8 md:pt-16">
      {/* flex-col: 모바일에서는 수직으로 쌓임
          md:flex-row: 태블릿 이상부터는 수평 정렬
      */}
      <div className="flex w-full flex-col justify-between gap-6 md:flex-row md:items-center md:gap-0">
        {/* 왼쪽 영역: 뒤로가기 + 유저 정보 */}
        <div className="flex items-center justify-between gap-4 md:justify-start">
          {!isHome ? (
            <Link
              href={getHref('/')}
              className="group flex shrink-0 items-center gap-3 !text-zinc-500 duration-500 hover:!text-zinc-900 dark:hover:!text-zinc-100"
            >
              <GoArrowLeft className="h-6 w-6 transition-transform group-hover:-translate-x-1" />

              <div className="flex items-center gap-3">
                <Image
                  src={avatarUrl}
                  alt={username}
                  width={32}
                  height={32}
                  className="shrink-0 rounded-full border border-zinc-500/50 transition-colors group-hover:border-zinc-900 dark:group-hover:border-zinc-100"
                />
                <span className="font-display max-w-[150px] truncate text-lg tracking-tight !text-zinc-900 md:max-w-none md:text-2xl dark:!text-zinc-100">
                  {username}
                </span>
              </div>
            </Link>
          ) : (
            <div className="hidden w-10 md:block" />
          )}

          {/* 모바일에서만 다크모드 토글을 이름 옆으로 배치하고 싶을 때 사용 (선택 사항) */}
          <div className="justify-flex-end flex items-center gap-2 md:hidden">
            <DarkModeToggle />
          </div>
        </div>

        {/* 오른쪽 영역: 메뉴 아이템들 */}
        <ul className="flex items-center justify-center gap-4 md:justify-end md:gap-8">
          <li className="shrink-0">
            <TryYourself customUsername={customUsername} />
          </li>

          <div className="flex items-center gap-4 md:gap-6">
            <li>
              <Link
                href={getHref('/projects')}
                className="text-base !text-zinc-900 transition-colors duration-500 hover:!text-zinc-700 md:text-lg dark:!text-zinc-100 dark:hover:!text-zinc-300"
              >
                Projects <LoadingIndicator />
              </Link>
            </li>
            <li>
              <Link
                href={getHref('/contact')}
                className="text-base !text-zinc-900 transition-colors duration-500 hover:!text-zinc-700 md:text-lg dark:!text-zinc-100 dark:hover:!text-zinc-300"
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
