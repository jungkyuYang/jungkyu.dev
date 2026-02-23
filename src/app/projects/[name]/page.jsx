import ProjectPdfSection from '@/shared/ui/ProjectPdfSection';

// 프로젝트 데이터를 상수로 분리 (컴포넌트 외부)
const PROJECT_INFO = {
  '4yclinghomerun-client': {
    title: 'KTwiz 홈페이지 UI/UX 개선 프로젝트',
    description:
      '사용자 경험(UX) 중심의 인터페이스 재설계와 실시간 경기 데이터 시각화를 통해 서비스 접근성을 극대화한 프로젝트입니다.',
  },
  'toy-project3-team1': {
    title: '영상 공유 커뮤니티 모바일 플랫폼',
    description:
      'FSD(Feature-Sliced Design) 아키텍처를 적용하여 확장성을 확보하고, Supabase를 활용한 실시간 데이터 처리와 Skeleton UI를 통한 LCP 성능 최적화에 집중한 모바일 커뮤니티 플랫폼입니다.',
  },
};

export default async function ProjectDetailPage({ params }) {
  const { name } = await params;

  // 필요한 데이터만 바로 추출 (toUpperCase 제거 및 단순화)
  const info = PROJECT_INFO[name] || { title: name, description: 'Project documentation.' };
  const pdfUrl = `/pdfs/${name}.pdf`;

  return (
    <article className="animate-fade-in">
      {/* 제목 및 요약 정보 영역 */}
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div className="flex-1">
          <h1 className="mb-4 text-3xl font-bold tracking-tight break-keep md:text-5xl">
            {info.title}
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-zinc-500 md:text-base dark:text-zinc-400">
            {info.description}
          </p>
        </div>

        <div className="flex h-fit gap-2 pb-1">
          <span className="rounded-full border border-zinc-200 bg-zinc-100 px-3 py-1 text-xs font-medium whitespace-nowrap dark:border-zinc-700 dark:bg-zinc-800">
            Documentation
          </span>
          <span className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-medium whitespace-nowrap text-blue-600 dark:border-blue-900/30 dark:bg-blue-900/20 dark:text-blue-400">
            PDF
          </span>
        </div>
      </div>

      {/* 실제 콘텐츠 영역 */}
      <section className="mb-12 overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 p-1 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/30">
        <ProjectPdfSection pdfUrl={pdfUrl} />
      </section>
    </article>
  );
}
