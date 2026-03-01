import { getProcessedProjects } from '@/entities/projects/lib/projectService';
import { EmptyState } from '@/shared/ui/EmptyState'; // 공용 컴포넌트

import { TeamProjects } from './TeamProjects';
import { TeamProjectsProvider } from '../model/TeamProjectsContext';

const CONSTANT = {
  TITLE: 'Team Projects',
  EMPTY_MESSAGE: '함께 협업하며 고민하고 만들어온 기록이 아직 없습니다.',
};

export const TeamProjectsWidget = async ({ username }) => {
  // 1. 서버 사이드 데이터 패칭
  const { teamProjects } = await getProcessedProjects(username);

  // 🌟 2. 데이터가 없을 경우: EmptyState 반환
  if (!teamProjects || teamProjects.length === 0) {
    return <EmptyState title={CONSTANT.TITLE} message={CONSTANT.EMPTY_MESSAGE} icon="🤝" />;
  }

  // 3. 데이터가 있을 경우: 정상 렌더링
  return (
    <TeamProjectsProvider projects={teamProjects}>
      <TeamProjects />
    </TeamProjectsProvider>
  );
};
