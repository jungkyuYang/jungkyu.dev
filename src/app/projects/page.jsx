import { Suspense } from 'react';

import data from '@/shared/constants/data.json';
import { PageHeader } from '@/shared/ui/PageHeader';
import { WidgetErrorBoundary } from '@/shared/ui/WidgetErrorBoundary';
import { FixedProjectsWidget, FixedProjectsSkeleton } from '@/widgets/fixed-projects';
import { PersonalProjectsWidget, PersonalProjectsSkeleton } from '@/widgets/personal-projects';
import { TeamProjectsWidget, TeamProjectsSkeleton } from '@/widgets/team-projects';

const CONSTANTS = {
  TITLE: 'Projects',
  DEFAULT_DESCRIPTION: '그동안 쌓아온 경험과 고민이 담긴 프로젝트들을 소개합니다.',
  USER_DESCRIPTION: (name) => `${name}님의 프로젝트 목록입니다.`,
};

export default async function ProjectsPage({ searchParams }) {
  const { username } = await searchParams;
  const targetUsername = username || data.githubUsername;

  const isJungkyu = !username || username === data.githubUsername;

  const displayDescription = username
    ? CONSTANTS.USER_DESCRIPTION(username)
    : CONSTANTS.DEFAULT_DESCRIPTION;

  return (
    <article className="animate-fade-in flex-1">
      <PageHeader title={CONSTANTS.TITLE} description={displayDescription} />

      <main className="flex flex-col gap-12 md:gap-8">
        {isJungkyu ? (
          <>
            <WidgetErrorBoundary title="Main Focus">
              <Suspense fallback={<FixedProjectsSkeleton />}>
                <FixedProjectsWidget username={targetUsername} />
              </Suspense>
            </WidgetErrorBoundary>

            <WidgetErrorBoundary title="Team Projects">
              <Suspense fallback={<TeamProjectsSkeleton />}>
                <TeamProjectsWidget username={targetUsername} />
              </Suspense>
            </WidgetErrorBoundary>

            <WidgetErrorBoundary title="Personal Projects">
              <Suspense fallback={<PersonalProjectsSkeleton />}>
                <PersonalProjectsWidget username={targetUsername} />
              </Suspense>
            </WidgetErrorBoundary>
          </>
        ) : (
          <WidgetErrorBoundary title="All Projects">
            <Suspense fallback={<FixedProjectsSkeleton />}>
              <FixedProjectsWidget username={targetUsername} isPublic={true} />
            </Suspense>
          </WidgetErrorBoundary>
        )}
      </main>
    </article>
  );
}
