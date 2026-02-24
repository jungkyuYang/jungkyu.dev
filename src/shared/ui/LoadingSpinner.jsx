import { cn } from '@/shared/lib/utils';

export const LoadingSpinner = ({ className, size = 'md' }) => {
  const sizeClasses = {
    sm: 'h-5 w-5 border-2',
    md: 'h-10 w-10 border-4',
    lg: 'h-16 w-16 border-4',
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={cn(
          'border-t-apple-blue animate-spin rounded-full border-zinc-200',
          'animate-spinner-in',
          sizeClasses[size],
          className,
        )}
      />
    </div>
  );
};
