'use client';

import Link from 'next/link';

import { useNavContext } from './NavigationContext';

export const TryYourself = () => {
  const { customUsername } = useNavContext();

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
