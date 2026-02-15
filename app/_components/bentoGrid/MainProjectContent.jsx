import Image from 'next/image';

export const MainProjectContent = ({ project, isLoading }) => {
  // 로딩 중이거나 데이터가 없는 경우 스켈레톤 반환
  if (isLoading || !project) {
    return <MainProjectSkeleton />;
  }

  return (
    <article className="group relative flex h-full w-full flex-col bg-white dark:bg-[#1D1D1F] p-2 overflow-hidden transition-colors duration-300">
      
      {/* 1. Header (Image Section) */}
      <section className="relative flex-[1] w-full min-h-0 overflow-hidden rounded-[24px] mb-1">
        <div className="absolute inset-x-0 top-0 z-30 bg-gradient-to-b from-black/90 via-black/40 to-transparent p-6 pt-7">
          <h2 className="text-xl font-extrabold tracking-tight text-white md:text-2xl lg:tracking-[-0.04em] line-clamp-2 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
            {project.title}
          </h2>
        </div>

        <Image 
          src={project.src} 
          alt={project.alt ?? project.title} 
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover brightness-[0.9] dark:brightness-[0.75] transition-transform duration-[1000ms] ease-out group-hover:scale-105"
        />
      </section>

      {/* 2. Body (Content Section) */}
      <section className="flex flex-none flex-col px-4 py-2">
        {/* Metadata */}
        <div className="mb-2 flex items-center gap-2 shrink-0">
          <span className="text-[9px] font-black uppercase tracking-[0.12em] text-apple-blue shrink-0">Period</span>
          <div className="h-[1px] flex-1 bg-black/5 dark:bg-white/10" />
          <span className="text-neutral-500 dark:text-neutral-400 text-[10px] whitespace-nowrap font-medium">
            {project.period}
          </span>
        </div>

        {/* Description */}
        <p className="mb-2 text-[12px] font-medium leading-tight text-neutral-600 dark:text-[#A1A1A6] line-clamp-1">
          {project.description}
        </p>

        {/* Tech Stack List */}
        <div className="flex flex-wrap gap-1.5 mb-3 content-start">
          {project.techStack?.map((tech) => (
            <TechBadge key={tech}>{tech}</TechBadge>
          ))}
        </div>

        {/* Footer Actions */}
        <footer className="flex gap-2 pb-1">
          <ActionButton 
            href={project.link} 
            icon={ICONS.EXTERNAL} 
            label="Live" 
            variant="primary" 
          />
          <ActionButton 
            href={project.github} 
            icon={ICONS.GITHUB} 
            label="GitHub" 
            variant="secondary" 
          />
        </footer>
      </section>
    </article>
  );
};

  /**
   * 2. Skeleton Component
   */
  const MainProjectSkeleton = () => (
    <div className="flex h-full w-full flex-col p-2 animate-pulse bg-white dark:bg-[#1D1D1F]">
      <div className="flex-[1] w-full rounded-[24px] bg-neutral-200 dark:bg-neutral-800/50 mb-1 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 dark:via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
      </div>
      <div className="flex flex-none flex-col px-4 py-2">
        <div className="mb-2 flex items-center gap-2">
          <div className="h-2 w-8 bg-neutral-100 dark:bg-neutral-800 rounded" />
          <div className="h-[1px] flex-1 bg-neutral-100 dark:bg-white/5" />
        </div>
        <div className="h-4 w-3/4 bg-neutral-100 dark:bg-neutral-800 rounded mb-3" />
        <div className="flex gap-1.5 mb-3">
          {[1, 2, 3].map(i => <div key={i} className="h-4 w-12 bg-neutral-100 dark:bg-neutral-800 rounded-md" />)}
        </div>
        <div className="flex gap-2">
          <div className="h-9 flex-1 bg-neutral-100 dark:bg-neutral-800 rounded-full" />
          <div className="h-9 flex-1 bg-neutral-100 dark:bg-neutral-800 rounded-full" />
        </div>
      </div>
    </div>
  );

  /**
 * 1. UI Atoms & Constants
 * 컴포넌트 외부에 두어 렌더링 최적화를 유지합니다.
 */
const ICONS = {
    EXTERNAL: (
      <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
      </svg>
    ),
    GITHUB: (
      <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    )
  };
  
  const TechBadge = ({ children }) => (
    <span className="inline-flex items-center rounded-md border border-black/[0.08] dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.05] px-2 py-0.5 text-[9px] font-bold text-neutral-600 dark:text-neutral-400 whitespace-nowrap transition-all hover:bg-black/[0.05] dark:hover:bg-white/[0.1]">
      {children}
    </span>
  );
  
  const ActionButton = ({ href, icon, label, variant = 'primary' }) => {
    const variants = {
      primary: "bg-apple-blue text-white shadow-sm shadow-apple-blue/20 hover:brightness-110",
      secondary: "bg-black/5 dark:bg-white/10 border border-black/5 dark:border-white/5 text-neutral-800 dark:text-white hover:bg-black/10 dark:hover:bg-white/20"
    };
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={`flex-1 flex items-center justify-center gap-2 rounded-full py-2.5 text-[11px] font-bold transition-all active:scale-[0.96] ${variants[variant]}`}>
        <span>{label}</span>
        {icon}
      </a>
    );
  };