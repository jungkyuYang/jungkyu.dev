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
      <div className="grid grid-cols-1 gap-4 lg:mx-0 md:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div className="grid grid-cols-1 gap-4" key={i}>
            {[...Array(2)].map((_, j) => (
              <div
                key={j}
                className="p-4 md:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 flex flex-col h-full min-h-[260px] animate-pulse"
              />
            ))}
          </div>
        ))}
      </div>
    );
  }

  return (
    // 1. 페이지 본문을 대표하는 시맨틱 태그 <article>
    <article className="flex-1 animate-fade-in">
      {/* 2. 제목 및 설명 섹션 (단순 div로 처리) */}
      <section className="max-w-2xl mb-12">
        <h2 className="text-3xl font-bold tracking-tight !text-zinc-900 dark:!text-zinc-100 sm:text-4xl">
          Projects
        </h2>
        <p className="mt-4 !text-zinc-500 dark:!text-zinc-400 leading-relaxed">
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
