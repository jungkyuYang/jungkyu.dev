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
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex-1">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 break-keep">
            {info.title}
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 max-w-2xl text-sm md:text-base leading-relaxed">
            {info.description}
          </p>
        </div>

        <div className="flex gap-2 h-fit pb-1">
          <span className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-full text-xs font-medium border border-zinc-200 dark:border-zinc-700 whitespace-nowrap">
            Documentation
          </span>
          <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-xs font-medium border border-blue-100 dark:border-blue-900/30 whitespace-nowrap">
            PDF
          </span>
        </div>
      </div>

      {/* 실제 콘텐츠 영역 */}
      <section className="bg-zinc-50 dark:bg-zinc-900/30 rounded-2xl p-1 border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden mb-12">
        <ProjectPdfSection pdfUrl={pdfUrl} />
      </section>
    </article>
  );
}
