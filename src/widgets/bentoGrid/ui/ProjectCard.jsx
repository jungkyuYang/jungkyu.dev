import React from 'react';

// src/widgets/bentoGrid/ui/ProjectCard.jsx
export const ProjectCard = ({ project }) => {
  if (!project) return null;

  return (
    <a
      href={project.deployUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full w-full flex-col p-2 transition-all duration-500 md:p-2"
    >
      {/* 1. 상단 (Header) */}
      <div className="flex shrink-0 items-start justify-between">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
            <span className="text-[10px] font-black tracking-[0.2em] text-zinc-400 uppercase dark:text-zinc-500">
              Team Project
            </span>
          </div>
          <span className="font-mono text-[10px] tracking-tighter text-zinc-300 dark:text-zinc-600">
            [{project.period.replace(/ /g, '')}]
          </span>
        </div>

        <div className="shrink-0 rounded-full bg-zinc-50 p-2 text-zinc-400 transition-all duration-500 group-hover:rotate-45 group-hover:bg-blue-500 group-hover:text-white dark:bg-zinc-800/50">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          >
            <path d="M7 17L17 7M17 7H7M17 7V17" />
          </svg>
        </div>
      </div>

      {/* 2. 중앙 (Body) */}
      <div className="flex min-h-[120px] flex-1 flex-col justify-center">
        <h3 className="text-2xl leading-[1.1] font-black tracking-[-0.05em] text-zinc-900 transition-all duration-500 group-hover:text-blue-500 sm:text-3xl md:text-[2.2rem] dark:text-zinc-100">
          {project.title.split(' ')[0]} <br />
          <span className="text-zinc-300 transition-colors duration-500 group-hover:text-zinc-400 dark:text-zinc-800">
            {project.title.split(' ').slice(1).join(' ')}
          </span>
        </h3>
      </div>

      {/* 3. 하단 (Footer): 1안 슬래시 디바이더 적용 */}
      <div className="flex shrink-0 flex-wrap items-center gap-x-2 gap-y-1 border-t border-black/[0.05] pt-5 dark:border-white/[0.05]">
        {project.techStack.slice(0, 5).map((tech, index) => (
          <React.Fragment key={tech}>
            <span className="text-[10px] font-bold tracking-tight text-zinc-400 uppercase transition-colors group-hover:text-zinc-600 dark:text-zinc-500 dark:group-hover:text-zinc-300">
              {tech}
            </span>
            {/* 마지막 아이템이 아닐 때만 점(•) 표시 */}
            {index < Math.min(project.techStack.length, 5) - 1 && (
              <span className="text-[10px] text-zinc-200 select-none dark:text-zinc-800">•</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </a>
  );
};
