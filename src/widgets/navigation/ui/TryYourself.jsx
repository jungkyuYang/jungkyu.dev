import Link from 'next/link';

import { cn } from '@/shared/lib/utils';

import { useNavContext } from './NavigationContext';

export const TryYourself = ({ className }) => {
  const { tryYourself } = useNavContext();

  return (
    <Link
      href={tryYourself.href}
      className={cn(
        'rounded-sm border-2 border-dashed border-zinc-500 p-1.5 text-xs whitespace-nowrap !text-zinc-900 transition-all duration-500 hover:border-zinc-300 md:p-2 md:text-sm dark:!text-zinc-100',
        className,
      )}
    >
      {tryYourself.label}
    </Link>
  );
};
