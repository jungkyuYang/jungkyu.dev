export const ProjectCardFront = ({
  header, // 날짜, 별점 등 메타 정보
  title, // 프로젝트 제목
  description, // 프로젝트 상세 설명
  content, // 기술 스택 캐러셀 등 핵심 콘텐츠
  footer, // 하단 지표 정보
}) => {
  return (
    <article className="effect-glow relative flex h-full flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white p-6 transition-colors md:p-8 dark:border-zinc-800 dark:bg-zinc-900">
      {/* 상단 글로우 포인트 바 */}
      <span className="absolute inset-x-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-zinc-500/50 to-transparent" />

      {/* 1. Header: 메타 정보 영역 */}
      <header className="mb-4 w-full shrink-0">{header}</header>

      {/* 2. Main Body: 제목 및 본문 */}
      <div className="flex flex-1 flex-col">
        <h2 className="z-10 text-2xl leading-tight font-bold break-keep text-zinc-900 lg:text-3xl dark:text-zinc-100">
          {title}
        </h2>

        <p className="z-10 mt-4 line-clamp-5 min-h-[6.5rem] text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {description}
        </p>

        {/* 3. Content: 기술 스택 등 유동적 콘텐츠 */}
        <div className="mt-auto py-4" onClick={(e) => e.stopPropagation()}>
          {content}
        </div>
      </div>

      {/* 4. Footer: 하단 지표 영역 */}
      <footer className="mt-2 w-full shrink-0 border-t border-zinc-100 pt-4 dark:border-zinc-800">
        <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-500">
          {footer}
        </div>
      </footer>
    </article>
  );
};
