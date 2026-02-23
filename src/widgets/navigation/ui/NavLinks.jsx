'use client';

import Link from 'next/link';

import { useNavContext } from './NavigationContext';

export const NavLinks = () => {
  const { menuItems, getHref } = useNavContext();

  return (
    <>
      {menuItems.map((item) => (
        <li key={item.path}>
          <Link href={getHref(item.path)} className="relative">
            {item.label}
          </Link>
        </li>
      ))}
    </>
  );
};
