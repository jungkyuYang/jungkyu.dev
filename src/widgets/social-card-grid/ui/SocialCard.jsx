// src/widgets/social-card-grid/ui/SocialCard.jsx
'use client';

import Link from 'next/link';

import { Card } from '@/shared/ui/Card';

import { SocialCardItem } from './SocialCardItem';
import { useSocialCard } from '../model/SocialCardContext';

export const SocialCard = ({ item }) => {
  const { copy } = useSocialCard();
  const isEmail = item.label === 'Email';

  const baseStyles =
    'group relative flex h-full w-full flex-col items-center justify-center gap-4 p-4 py-10 md:py-14 lg:py-16 transition-all duration-700';

  return (
    <Card>
      {isEmail ? (
        <button
          type="button"
          onClick={() => copy(item.handle, () => (window.location.href = item.href))}
          className={`${baseStyles} cursor-pointer focus:outline-none`}
        >
          <SocialCardItem item={item} canCopy />
        </button>
      ) : (
        <Link href={item.href} target="_blank" rel="noopener noreferrer" className={baseStyles}>
          <SocialCardItem item={item} />
        </Link>
      )}
    </Card>
  );
};
