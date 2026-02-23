import { Suspense } from 'react';

const NavigationSkeleton = () => (
  <nav className="w-full px-6 pt-8 opacity-50 md:pt-16 lg:px-8">
    <div className="flex w-full flex-col justify-between gap-6 md:flex-row md:items-center md:gap-0">
      <div className="h-10 w-48 animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-800" />
      <div className="flex gap-4">
        <div className="h-10 w-20 animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-10 w-20 animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-800" />
      </div>
    </div>
  </nav>
);

export const NavigationLayout = ({ children }) => (
  <nav className="animate-fade-in w-full pt-8 md:pt-16">
    <div className="flex w-full flex-col justify-between gap-6 md:flex-row md:items-center md:gap-0">
      {children}
    </div>
  </nav>
);

export const Navigation = ({ children }) => (
  <Suspense fallback={<NavigationSkeleton />}>
    <NavigationLayout>{children}</NavigationLayout>
  </Suspense>
);
