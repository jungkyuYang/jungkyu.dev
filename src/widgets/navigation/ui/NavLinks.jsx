'use client';

import Link from 'next/link';

import { cn } from '@/shared/lib/utils';

import { useNavigationContext } from '../model/NavigationContext';

export const NavLinks = ({ className }) => {
  const { menuItems, getHref } = useNavigationContext();

  return (
    <>
      {menuItems.map((item) => (
        <li key={item.path}>
          <Link
            href={getHref(item.path)}
            className={cn(
              'relative transition-colors hover:text-zinc-600 dark:hover:text-zinc-300',
              className, // 부모가 "text-sm"이나 "font-bold" 등을 주입 가능
            )}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </>
  );
};
