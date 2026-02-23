import Image from 'next/image';
import Link from 'next/link';

import { GoArrowLeft } from 'react-icons/go';

export const NavigationUser = ({ showArrow, href, avatarUrl, username }) => (
  <Link href={href} className="group flex shrink-0 items-center gap-3">
    {showArrow && (
      <GoArrowLeft className="h-6 w-6 text-zinc-500 transition-transform group-hover:-translate-x-1 group-hover:text-zinc-900 dark:group-hover:text-zinc-100" />
    )}
    <div className="flex items-center gap-3">
      <Image
        src={avatarUrl}
        alt={username}
        width={32}
        height={32}
        className="rounded-full border border-zinc-500/50 transition-colors group-hover:border-zinc-900 dark:group-hover:border-zinc-100"
      />
      <span className="font-display text-lg tracking-tight text-zinc-900 md:text-2xl dark:text-zinc-100">
        {username}
      </span>
    </div>
  </Link>
);
