// src/widgets/fixed-projects/ui/FixedProjectsWidget.jsx
import { getProcessedProjects } from '@/entities/projects/lib/projectService';
import { EmptyState } from '@/shared/ui/EmptyState';

import { FixedProjects } from './FixedProjects';
import { FixedProjectsProvider } from '../model/FixedProjectsContext';

const CONSTANT = {
  TITLE: 'Projects',
  EMPTY_MESSAGE: '등록된 프로젝트가 없습니다.',
};

export const FixedProjectsWidget = async ({ username, isPublic = false }) => {
  // 1. 데이터 가져오기 (서비스 로직에서 분기 처리됨)
  const { fixedProjects, allProjects } = await getProcessedProjects(username);

  const targetData = isPublic ? allProjects : fixedProjects;

  const isInternal = !isPublic;

  if (!targetData || targetData.length === 0) {
    return <EmptyState title={CONSTANT.TITLE} message={CONSTANT.EMPTY_MESSAGE} icon="📂" />;
  }

  return (
    <FixedProjectsProvider projects={targetData} isInternal={isInternal}>
      <FixedProjects />
    </FixedProjectsProvider>
  );
};
