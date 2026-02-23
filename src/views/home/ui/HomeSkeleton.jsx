export const HomeSkeleton = () => {
  return (
    /* HomeView와 동일한 article 태그 및 레이아웃 클래스 적용 */
    <article className="flex w-full flex-1 flex-col items-center">
      {/* 1. Profile 영역 스켈레톤 (Profile 위젯 구조 모방) */}
      <section className="flex w-full flex-col items-center">
        {/* 상단 라인 애니메이션 흉내 */}
        <div className="mb-8 h-px w-full bg-zinc-800/10" />

        <div className="flex items-center gap-4 p-5 py-10">
          {/* 이름(Title) 자리 */}
          <div className="h-16 w-48 animate-pulse rounded-lg bg-zinc-800/10 sm:h-24 sm:w-64 md:h-32 md:w-80" />
          {/* 아바타 자리 */}
          <div className="h-20 w-20 animate-pulse rounded-full bg-zinc-800/10 md:h-[100px] md:w-[100px]" />
        </div>

        <div className="h-px w-full bg-zinc-800/10" />

        {/* Summary/Bio 자리 */}
        <div className="my-16 flex w-full max-w-xl flex-col items-center gap-3 px-4">
          <div className="h-5 w-3/4 animate-pulse rounded bg-zinc-800/10" />
          <div className="h-5 w-1/2 animate-pulse rounded bg-zinc-800/10" />
          <div className="mt-4 h-5 w-2/3 animate-pulse rounded bg-zinc-800/10" />
        </div>
      </section>

      {/* 2. BentoSection 영역 스켈레톤 (BentoGrid 구조 모방) */}
      <section className="w-full max-w-7xl px-4 pb-20">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {/* 메인 프로젝트 카드 (2x2) */}
          <div className="h-[400px] animate-pulse rounded-3xl bg-zinc-800/5 md:col-span-2 md:row-span-2" />

          {/* 3D 로고/기타 카드들 */}
          <div className="h-[200px] animate-pulse rounded-3xl bg-zinc-800/5" />
          <div className="h-[200px] animate-pulse rounded-3xl bg-zinc-800/5" />

          {/* 하단 긴 카드들 */}
          <div className="h-[150px] animate-pulse rounded-3xl bg-zinc-800/5 lg:col-span-2" />
          <div className="h-[150px] animate-pulse rounded-3xl bg-zinc-800/5 lg:col-span-2" />
        </div>
      </section>
    </article>
  );
};
