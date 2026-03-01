'use client';

import { startTransition } from 'react';

import { useRouter } from 'next/navigation';

import { ErrorBoundary } from 'react-error-boundary';

/**
 * 에러 발생 시 노출되는 전용 UI (Fallback)
 */
const WidgetErrorFallback = ({ error, resetErrorBoundary, title }) => {
  const router = useRouter();

  const handleReset = () => {
    // 서버 컴포넌트 리프레시와 에러 상태 리셋을 동시에 수행
    startTransition(() => {
      router.refresh();
      resetErrorBoundary();
    });
  };

  return (
    <section className="relative mb-20 rounded-xl border-2 border-dashed border-red-500/20 p-8 transition-colors hover:border-red-500/40">
      <span className="absolute -top-3 left-4 bg-white px-2 py-0.5 font-mono text-[10px] font-bold tracking-widest text-red-500 uppercase dark:bg-zinc-950">
        {title} Error
      </span>

      <div className="flex flex-col items-center justify-center gap-4 py-4 text-center">
        <div className="space-y-1">
          <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
            {title} 데이터를 불러오지 못했습니다.
          </p>
          {process.env.NODE_ENV === 'development' && (
            <p className="font-mono text-[10px] text-red-400">{error.message}</p>
          )}
        </div>

        <button
          onClick={handleReset}
          className="rounded-lg bg-red-500/10 px-4 py-2 text-xs font-semibold text-red-600 transition-colors hover:bg-red-500/20 active:scale-95"
        >
          다시 시도
        </button>
      </div>
    </section>
  );
};

/**
 * 서버 컴포넌트 위젯을 감싸서 에러를 격리하는 바운더리
 */
export const WidgetErrorBoundary = ({ children, title }) => {
  return (
    <ErrorBoundary FallbackComponent={(props) => <WidgetErrorFallback title={title} {...props} />}>
      {children}
    </ErrorBoundary>
  );
};
