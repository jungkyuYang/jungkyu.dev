export const LayoutContainer = ({ nav, children }) => {
  return (
    <div className="flex min-h-screen flex-col">
      {/* 1. 고정된 헤더 영역: nav 슬롯을 렌더링 */}
      <header className="sticky top-0 z-50 w-full border-b border-zinc-200/50 bg-white/80 backdrop-blur-md dark:border-zinc-800/50 dark:bg-zinc-900/80">
        <div className="mx-auto max-w-7xl px-6 py-4 lg:px-8">
          {/* 주입받은 Navigation 위젯이 이 자리에 박힙니다. */}
          {nav}
        </div>
      </header>

      {/* 2. 메인 콘텐츠 영역 */}
      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-6 lg:px-8">
        <main className="flex flex-1 flex-col py-12">{children}</main>
      </div>
    </div>
  );
};
