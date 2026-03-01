'use client';

import { PersonalProjectsCard } from './PersonalProjectsCard';
import { PersonalProjectsHeader } from './PersonalProjectsHeader';
import * as Layout from './PersonalProjectsLayouts';
import { usePersonalProjectsContext } from '../model/PersonalProjectsContext';

export const PersonalProjects = () => {
  const { projects } = usePersonalProjectsContext();

  return (
    <Layout.PersonalProjectsRoot>
      <Layout.PersonalProjectsHeaderArea>
        <PersonalProjectsHeader />
      </Layout.PersonalProjectsHeaderArea>

      <Layout.PersonalProjectsGrid>
        {projects.map((item) => (
          <PersonalProjectsCard key={item.id} data={item} />
        ))}
      </Layout.PersonalProjectsGrid>
    </Layout.PersonalProjectsRoot>
  );
};
