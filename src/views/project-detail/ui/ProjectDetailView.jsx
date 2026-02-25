import { Suspense } from 'react'; // 1. Suspense 임포트

import * as PdfPreviewLayout from '@/widgets/pdf-preview/ui/PdfPreviewLayouts'; // 2. 스켈레톤 임포트
import { PdfPreviewWidget } from '@/widgets/pdf-preview/ui/PdfPreviewWidget';
import { ProjectDetailHeader } from '@/widgets/pdf-preview/ui/ProjectDetailHeader';

export const ProjectDetailView = ({ data }) => {
  return (
    <article className="animate-fade-in">
      {/* 상단 헤더: 데이터가 이미 Page(서버)에서 왔으므로 즉시 렌더링됨 */}
      <ProjectDetailHeader {...data.ProjectHeader} />

      {/* 하단 위젯: 무거운 PDF 라이브러리가 로딩될 때까지 Skeleton을 보여줌 */}
      <Suspense fallback={<PdfPreviewLayout.PdfPreviewSkeleton />}>
        <PdfPreviewWidget {...data.ProjectPdfWidget} />
      </Suspense>
    </article>
  );
};
