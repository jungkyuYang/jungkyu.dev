// src/views/project-detail/ui/ProjectDetailView.jsx
import { PdfPreviewWidget } from '@/widgets/pdf-preview/ui/PdfPreviewWidget';
import { ProjectDetailHeader } from '@/widgets/pdf-preview/ui/ProjectDetailHeader';

export const ProjectDetailView = ({ data }) => {
  return (
    <article className="animate-fade-in">
      {/* 1. 상단 위젯 */}
      <ProjectDetailHeader {...data.ProjectHeader} />

      {/* 2. 하단 위젯 */}
      <PdfPreviewWidget {...data.ProjectPdfWidget} />
    </article>
  );
};
