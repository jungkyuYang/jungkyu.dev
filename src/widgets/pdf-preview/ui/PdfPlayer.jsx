'use client';

import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

import { cn } from '@/shared/lib/utils';
import { usePdfPreviewContext } from '@/widgets/pdf-preview/model/PdfPreviewContext';

// 필수 스타일 임포트
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

/**
 * PDF 렌더링 엔진을 담당하는 Entity 컴포넌트입니다.
 * Layout에서 정의한 Container 내부를 가득 채우는 역할을 합니다.
 */
export const PdfPlayer = ({ className }) => {
  const { pdfUrl, workerUrl } = usePdfPreviewContext();

  // 1. 플러그인 인스턴스는 렌더링 시마다 재생성되지 않도록 설정 (필요시 useMemo 사용 가능)
  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    sidebarTabs: () => [],
  });

  return (
    <div className={cn('h-full w-full', className)}>
      <Worker workerUrl={workerUrl}>
        <Viewer fileUrl={pdfUrl} plugins={[defaultLayoutPluginInstance]} theme="auto" />
      </Worker>
    </div>
  );
};
