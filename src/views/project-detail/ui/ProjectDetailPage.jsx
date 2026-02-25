// src/pages/project-detail/ui/ProjectDetailPage.jsx
import data from '@/shared/constants/data.json';

import { ProjectDetailView } from './ProjectDetailView';

export async function ProjectDetailPage({ projectId }) {
  // [1] 데이터 확보
  const project = data.projects.find((p) => p.id === projectId);

  // [2] 선처리 (Pre-processing)
  const title = project?.title || projectId;
  const description =
    project?.fullDescription || project?.description || '상세 정보를 불러올 수 없습니다.';
  const pdfUrl = project ? `/pdfs/${project.id}.pdf` : null;

  // [3] 조립 (Packing)
  const pageData = {
    ProjectHeader: {
      title,
      description,
    },
    ProjectPdfWidget: {
      pdfUrl,
    },
  };

  return <ProjectDetailView data={pageData} />;
}
