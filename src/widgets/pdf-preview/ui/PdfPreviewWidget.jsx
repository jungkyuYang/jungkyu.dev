'use client';

import dynamic from 'next/dynamic';

import { usePdfPreview } from '../lib/usePdfPreview';
import { PdfPreviewProvider } from '../model/PdfPreviewContext';

// SSR 방지: 브라우저 환경에서만 렌더링되도록 처리
const PdfPreview = dynamic(() => import('./PdfPreview').then((mod) => mod.PdfPreview), {
  ssr: false,
});

export const PdfPreviewWidget = ({ pdfUrl }) => {
  const pdfData = usePdfPreview(pdfUrl);

  return (
    // 3. 데이터 주입: 훅에서 만든 pdfData를 하위 트리 전체에 공유
    <PdfPreviewProvider value={pdfData}>
      <PdfPreview />
    </PdfPreviewProvider>
  );
};
