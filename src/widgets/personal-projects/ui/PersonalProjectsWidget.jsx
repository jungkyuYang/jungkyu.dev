import { getProcessedProjects } from '@/entities/projects/lib/projectService';
import { EmptyState } from '@/shared/ui/EmptyState'; // 공용 컴포넌트 임포트

import { PersonalProjects } from './PersonalProjects';
import { PersonalProjectsProvider } from '../model/PersonalProjectsContext';

const CONSTANT = {
  TITLE: 'Personal Projects',
  EMPTY_MESSAGE: '개인 프로젝트는 아직 등록하지 않았습니다 :D',
};

export const PersonalProjectsWidget = async ({ username }) => {
  // 1. 서버 사이드 데이터 패칭
  const { personalProjects } = await getProcessedProjects(username);

  // 🌟 2. 데이터가 없을 경우: null 대신 EmptyState 반환
  if (!personalProjects || personalProjects.length === 0) {
    return <EmptyState title={CONSTANT.TITLE} message={CONSTANT.EMPTY_MESSAGE} icon="🧪" />;
  }

  // 3. 데이터가 있을 경우: 정상 렌더링
  return (
    <PersonalProjectsProvider projects={personalProjects}>
      <PersonalProjects />
    </PersonalProjectsProvider>
  );
};
