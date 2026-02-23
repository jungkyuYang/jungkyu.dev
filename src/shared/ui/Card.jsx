import { cn } from '@/shared/lib/utils';

export const Card = ({ children, className, isLoading = false }) => {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl border duration-700',
        isLoading
          ? 'animate-pulse border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900/50'
          : 'border-zinc-200 bg-white hover:border-zinc-400 dark:border-zinc-600 dark:bg-zinc-900 dark:hover:border-zinc-400',
        className,
      )}
    >
      <div
        className={cn('transition-opacity duration-500', isLoading ? 'opacity-0' : 'opacity-100')}
      >
        {children}
      </div>

      {isLoading && <div className="absolute inset-0 bg-zinc-100 dark:bg-zinc-800/10" />}
    </div>
  );
};
