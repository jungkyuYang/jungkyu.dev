'use client';

import { FixedProjectsCard } from './FixedProjectsCard';
import { FixedProjectsHeader } from './FixedProjectsHeader';
import * as Layout from './FixedProjectsLayouts';
import { useFixedProjectsContext } from '../model/FixedProjectsContext';

export const FixedProjects = () => {
  const { projects } = useFixedProjectsContext();

  return (
    <Layout.FixedProjectsRoot>
      <Layout.FixedProjectsHeaderArea>
        <FixedProjectsHeader />
      </Layout.FixedProjectsHeaderArea>

      <Layout.FixedProjectsGrid>
        {projects.map((item) => (
          <FixedProjectsCard key={item.id} data={item} />
        ))}
      </Layout.FixedProjectsGrid>
    </Layout.FixedProjectsRoot>
  );
};
