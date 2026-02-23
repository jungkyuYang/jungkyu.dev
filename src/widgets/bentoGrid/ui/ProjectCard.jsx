import React from 'react';

export const ProjectCard = ({ project }) => {
  if (!project) return null;

  return (
    <a
      href={project.deployUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full w-full min-w-0 flex-col p-4 transition-all duration-500 hover:bg-zinc-50/50 active:scale-[0.98] md:p-5 lg:p-6 dark:hover:bg-zinc-800/10"
    >
      {/* 1. 상단 영역 (모바일 대응) */}
      <div className="flex min-w-0 shrink-0 items-start justify-between gap-2">
        <div className="flex min-w-0 flex-col gap-0.5 md:gap-1">
          <div className="flex items-center gap-1.5 md:gap-2">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
            <span className="truncate text-[9px] font-black tracking-[0.15em] text-zinc-400 uppercase md:text-[10px] md:tracking-[0.2em]">
              Team Project
            </span>
          </div>
          <span className="truncate font-mono text-[9px] tracking-tighter text-zinc-300 md:text-[10px] dark:text-zinc-600">
            [{project.period.replace(/ /g, '')}]
          </span>
        </div>

        <div className="shrink-0 rounded-full bg-zinc-50 p-1.5 text-zinc-400 transition-all duration-500 group-hover:rotate-45 group-hover:bg-blue-500 group-hover:text-white md:p-2 dark:bg-zinc-800/50">
          <svg
            className="h-3.5 w-3.5 md:h-4 md:w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          >
            <path d="M7 17L17 7M17 7H7M17 7V17" />
          </svg>
        </div>
      </div>

      {/* 2. 중앙 타이틀: 모바일(base), sm, md, lg 세분화 */}
      <div className="flex min-h-0 flex-1 flex-col justify-center py-4 sm:py-6 md:py-8 lg:py-10">
        <h3 className="text-2xl leading-[1.05] font-black tracking-[-0.06em] break-keep text-zinc-900 transition-all duration-500 group-hover:text-blue-500 sm:text-2xl md:text-[1.3rem] lg:text-[2.0rem] xl:text-[2.6rem] dark:text-zinc-100">
          {project.title.split(' ')[0]} <br />
          <span className="text-zinc-400 transition-colors duration-500 group-hover:text-zinc-500 dark:text-zinc-600 dark:group-hover:text-zinc-400">
            {project.title.split(' ').slice(1).join(' ')}
          </span>
        </h3>
      </div>

      {/* 3. 하단 기술 스택 */}
      <div className="flex shrink-0 flex-wrap items-center gap-x-2 gap-y-1.5 border-t border-black/[0.05] pt-4 dark:border-white/[0.05]">
        {project.techStack.slice(0, 5).map((tech, index) => (
          <div key={tech} className="flex items-center gap-1.5 md:gap-2">
            <span className="text-[9px] font-bold tracking-tight whitespace-nowrap text-zinc-400 uppercase md:text-[10px]">
              {tech}
            </span>
            {index < Math.min(project.techStack.length, 5) - 1 && (
              <span className="text-[9px] text-zinc-200 md:text-[10px] dark:text-zinc-800">•</span>
            )}
          </div>
        ))}
      </div>
    </a>
  );
};
