import { Navigation } from '@/widgets/navigation';

export const LayoutContainer = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col">
      {/* 1. 고정된 헤더 영역 (화면 전체 너비 사용) */}
      <header className="sticky top-0 z-50 w-full border-b border-zinc-200/50 bg-white/80 backdrop-blur-md dark:border-zinc-800/50 dark:bg-zinc-900/80">
        {/* 내부 콘텐츠 정렬 및 좌우 패딩 부여 */}
        <div className="mx-auto max-w-7xl px-6 py-4 lg:px-8">
          {/* py-4(상하 패딩)를 주어 네비게이션이 위아래로 숨 쉴 공간을 확보합니다. */}
          <Navigation />
        </div>
      </header>

      {/* 2. 메인 콘텐츠 영역 (중앙 정렬 및 너비 제한) */}
      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-6 lg:px-8">
        <main className="flex flex-1 flex-col py-12">
          {/* py-12를 주어 헤더와 본문 사이의 간격을 띄워줍니다. */}
          {children}
        </main>
      </div>
    </div>
  );
};
