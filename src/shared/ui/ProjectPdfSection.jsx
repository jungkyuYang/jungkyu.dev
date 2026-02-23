'use client';

import dynamic from 'next/dynamic';

const PdfViewer = dynamic(() => import('@/shared/ui/PdfViewer'), {
  ssr: false,
  loading: () => (
    <div className="flex h-[500px] w-full flex-col items-center justify-center gap-4 rounded-xl bg-zinc-100 md:h-[calc(100vh-400px)] dark:bg-zinc-900">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-zinc-300 border-t-zinc-800 dark:border-zinc-700 dark:border-t-zinc-200" />
      <span className="animate-pulse text-sm font-medium text-zinc-500">
        문서를 준비 중입니다...
      </span>
    </div>
  ),
});

export default function ProjectPdfSection({ pdfUrl }) {
  return (
    <div className="w-full overflow-hidden rounded-xl">
      <PdfViewer fileUrl={pdfUrl} />
    </div>
  );
}
