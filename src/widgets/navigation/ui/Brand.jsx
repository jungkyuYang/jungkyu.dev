'use client';

import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/shared/lib/utils'; // 프로젝트의 cn 유틸리티 경로

import { useNavContext } from '../model/NavigationContext'; // 컨텍스트 훅 임포트

export const Brand = ({ size = 32, className }) => {
  const { getHref, avatarUrl, username } = useNavContext();

  return (
    <Link
      href={getHref('/')}
      className={cn(
        'group flex shrink-0 items-center gap-3 transition-opacity hover:opacity-80',
        className, // 부모가 주는 md:order-2 등을 수용
      )}
    >
      <div className="flex items-center gap-3">
        <Image
          src={avatarUrl}
          alt={username}
          width={size}
          height={size}
          className="shrink-0 rounded-full border border-zinc-500/50 transition-colors group-hover:border-zinc-900 dark:group-hover:border-zinc-100"
        />
        <span className="font-display max-w-[150px] truncate text-lg tracking-tight !text-zinc-900 md:max-w-none md:text-2xl dark:!text-zinc-100">
          {username}
        </span>
      </div>
    </Link>
  );
};
