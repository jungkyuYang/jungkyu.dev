'use client';

import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

// 필수 스타일만 유지
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

export default function PdfViewer({ fileUrl }) {
  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    // 사이드바를 완전히 제거하여 시각적 노이즈 최소화
    sidebarTabs: () => [],
  });

  return (
    /* 컨테이너: 애니메이션 제거, 단순하고 깔끔한 보더와 그림자만 적용 */
    <div className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden shadow-sm">
      {/* 반응형 높이 설정: 모바일에서는 조금 더 작게, 데스크톱에서는 넉넉하게 */}
      <div className="relative h-[500px] md:h-[calc(100vh-400px)] w-full bg-zinc-50 dark:bg-zinc-900 overflow-hidden">
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
          <Viewer
            fileUrl={fileUrl}
            plugins={[defaultLayoutPluginInstance]}
            // 시스템 설정에 따라 라이트/다크 테마 자동 전환
            theme="auto"
          />
        </Worker>
      </div>

      {/* 하단 다운로드 바 (옵션): 깔끔한 텍스트 링크 형태 */}
      <div className="flex justify-between items-center px-4 py-2 bg-zinc-50 dark:bg-zinc-900/50 border-t border-zinc-200 dark:border-zinc-800">
        <span className="text-xs text-zinc-400 font-medium">PDF Preview Mode</span>
        <a
          href={fileUrl}
          download
          className="text-xs text-zinc-600 dark:text-zinc-300 hover:text-blue-500 transition-colors font-semibold"
        >
          파일 다운로드
        </a>
      </div>
    </div>
  );
}
