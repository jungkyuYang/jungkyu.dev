import { cn } from '@/shared/lib/utils';

export const PageHeader = ({ title, description, className }) => {
  return (
    <header className={cn('mb-12 text-center', className)}>
      <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
        {title}
      </h1>
      {description && <p className="mt-4 text-zinc-500 dark:text-zinc-400">{description}</p>}
    </header>
  );
};
