import { Suspense } from 'react';

import data from '@/shared/constants/data.json';
import * as PdfPreviewLayout from '@/widgets/pdf-preview/ui/PdfPreviewLayouts';
import { PdfPreviewWidget } from '@/widgets/pdf-preview/ui/PdfPreviewWidget';
import { ProjectDetailHeader } from '@/widgets/pdf-preview/ui/ProjectDetailHeader';

export default async function Page({ params }) {
  const { name: projectId } = await params;

  // [1] 데이터 확보
  const project = data.projects.find((p) => p.id === projectId);

  // [2] 데이터 가공 (기존 ProjectDetailPage 로직)
  const title = project?.title || projectId;
  const description =
    project?.fullDescription || project?.description || '상세 정보를 불러올 수 없습니다.';
  const pdfUrl = project ? `/pdfs/${project.id}.pdf` : null;

  return (
    <article className="animate-fade-in container mx-auto py-12">
      {/* [3] UI 조립 (기존 ProjectDetailView 로직) */}
      <ProjectDetailHeader title={title} description={description} />

      <Suspense fallback={<PdfPreviewLayout.PdfPreviewSkeleton />}>
        <PdfPreviewWidget pdfUrl={pdfUrl} />
      </Suspense>
    </article>
  );
}
