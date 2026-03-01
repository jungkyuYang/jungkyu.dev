'use client';

import { TeamProjectsCard } from './TeamProjectsCard';
import { TeamProjectsHeader } from './TeamProjectsHeader';
import * as Layout from './TeamProjectsLayouts'; // 혹은 공유 레이아웃 사용
import { useTeamProjectsContext } from '../model/TeamProjectsContext';

export const TeamProjects = () => {
  const { projects } = useTeamProjectsContext();

  return (
    <Layout.TeamProjectsRoot>
      <Layout.TeamProjectsHeaderArea>
        <TeamProjectsHeader />
      </Layout.TeamProjectsHeaderArea>

      <Layout.TeamProjectsGrid>
        {projects.map((item) => (
          <TeamProjectsCard key={item.id} data={item} />
        ))}
      </Layout.TeamProjectsGrid>
    </Layout.TeamProjectsRoot>
  );
};
