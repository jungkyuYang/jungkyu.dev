'use client';

import dynamic from 'next/dynamic';

const PdfViewer = dynamic(() => import('@/shared/ui/PdfViewer'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] md:h-[calc(100vh-400px)] bg-zinc-100 dark:bg-zinc-900 rounded-xl flex flex-col items-center justify-center gap-4">
      <div className="w-12 h-12 border-4 border-zinc-300 border-t-zinc-800 dark:border-zinc-700 dark:border-t-zinc-200 rounded-full animate-spin" />
      <span className="text-zinc-500 text-sm font-medium animate-pulse">
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
