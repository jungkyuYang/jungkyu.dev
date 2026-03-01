// shared/ui/Button.jsx (shadcn 스타일 예시)
import * as React from 'react';

import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';

import { cn } from '@/shared/lib/utils'; // classnames 합치기 유틸

const buttonVariants = cva(
  'inline-flex items-center cursor-pointer justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
        outline:
          'border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        // 프로젝트 전용 스타일 추가 가능
        project:
          'bg-zinc-50 text-zinc-700 hover:bg-zinc-900 hover:text-white dark:bg-zinc-800/50 dark:text-zinc-300 dark:hover:bg-zinc-100 dark:hover:text-zinc-900 border border-zinc-200 dark:border-zinc-700',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-12 rounded-md px-8', // 카드 뒷면은 lg가 적당할 수 있음
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button';
  return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
});
Button.displayName = 'Button';

export { Button, buttonVariants };
