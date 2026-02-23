import React, { Suspense } from 'react';

import data from '@/shared/constants/data.json';
import OrgProjects from '@/shared/ui/OrgProjects';
import ProjectsComponent from '@/shared/ui/projects';

export default async function ProjectsPage(props) {
  const searchParams = await props.searchParams;
  const { customUsername } = searchParams;
  const username = customUsername || process.env.GITHUB_USERNAME || data.githubUsername;
  const isJungkyu = username === 'jungkyuYang';

  /**
   * 스켈레톤 UI (시각적 일관성 유지)
   */
  function ProjectsSkeleton() {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:mx-0">
        {[0, 1, 2].map((i) => (
          <div className="grid grid-cols-1 gap-4" key={i}>
            {[...Array(2)].map((_, j) => (
              <div
                key={j}
                className="flex h-full min-h-[260px] animate-pulse flex-col rounded-2xl border border-zinc-200 bg-zinc-50/50 p-4 md:p-8 dark:border-zinc-800 dark:bg-zinc-900/50"
              />
            ))}
          </div>
        ))}
      </div>
    );
  }

  return (
    // 1. 페이지 본문을 대표하는 시맨틱 태그 <article>
    <article className="animate-fade-in flex-1">
      {/* 2. 제목 및 설명 섹션 (단순 div로 처리) */}
      <section className="mb-12 max-w-2xl">
        <h2 className="text-3xl font-bold tracking-tight !text-zinc-900 sm:text-4xl dark:!text-zinc-100">
          Projects
        </h2>
        <p className="mt-4 leading-relaxed !text-zinc-500 dark:!text-zinc-400">
          {customUsername ? `${customUsername}'s projects` : data.description}
        </p>
      </section>

      {/* 3. 프로젝트 리스트 섹션 */}
      <section>
        <Suspense fallback={<ProjectsSkeleton />}>
          {isJungkyu ? <OrgProjects /> : <ProjectsComponent username={username} />}
        </Suspense>
      </section>
    </article>
  );
}
