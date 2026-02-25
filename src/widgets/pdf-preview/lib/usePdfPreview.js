'use client';

import { useMemo } from 'react';

export const usePdfPreview = (pdfUrl) => {
  const pdfData = useMemo(
    () => ({
      pdfUrl,
      workerUrl: 'https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js',
    }),
    [pdfUrl],
  ); // pdfUrl이 바뀔 때만 객체를 새로 생성함

  return pdfData;
};
