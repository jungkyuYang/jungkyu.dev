'use client';

import { cn } from '@/shared/lib/utils';
import { usePdfPreviewContext } from '@/widgets/pdf-preview/model/PdfPreviewContext';

const LABELS = {
  PREVIEW_MODE: 'PDF Preview Mode',
  DOWNLOAD: '파일 다운로드',
};

export const PdfActions = ({ className }) => {
  const { pdfUrl } = usePdfPreviewContext();

  return (
    /* 여기서 w-full과 items-center 정도의 최소한의 정렬만 담당합니다.
      구체적인 패딩이나 배경색은 부모인 Layout.PdfBottomBar가 결정합니다.
    */
    <div className={cn('flex w-full items-center justify-between', className)}>
      <span className="text-xs font-medium text-zinc-400">{LABELS.PREVIEW_MODE}</span>

      <a
        href={pdfUrl}
        download
        className={cn(
          'text-xs font-semibold text-zinc-600 transition-colors',
          'hover:text-blue-500 active:opacity-70',
          'dark:text-zinc-300 dark:hover:text-blue-400',
        )}
      >
        {LABELS.DOWNLOAD}
      </a>
    </div>
  );
};
