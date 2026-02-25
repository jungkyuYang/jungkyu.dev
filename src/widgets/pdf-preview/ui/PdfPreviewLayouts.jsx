/**
 * PDF 위젯의 전체 프레임 (구획)
 */
export const PdfPreviewRoot = ({ children }) => (
  <section className="mb-12 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
    {children}
  </section>
);

/**
 * PDF 뷰어 영역 (메인 콘텐츠)
 */
export const PdfPreviewPdfViewerContainer = ({ children }) => (
  <div className="relative h-[500px] w-full overflow-hidden bg-zinc-50 md:h-[calc(100vh-400px)] dark:bg-zinc-900/50">
    {children}
  </div>
);

/**
 * 하단 정보 및 액션 바 (섹션 푸터)
 */
export const PdfPreviewPdfBottomBar = ({ children }) => (
  <footer className="flex items-center justify-between border-t border-zinc-200 bg-zinc-50/50 px-5 py-3 dark:border-zinc-800 dark:bg-zinc-900/80">
    {children}
  </footer>
);

export const PdfPreviewSkeleton = () => (
  <PdfPreviewRoot>
    <PdfPreviewPdfViewerContainer>
      {/* 뷰어 영역: 반짝이는 애니메이션만 추가 */}
      <div className="h-full w-full animate-pulse bg-zinc-200/50 dark:bg-zinc-800/50" />
    </PdfPreviewPdfViewerContainer>

    <PdfPreviewPdfBottomBar>
      {/* 하단 바: 텍스트와 버튼이 들어갈 자리에 회색 박스 배치 */}
      <div className="h-4 w-24 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
      <div className="h-4 w-16 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
    </PdfPreviewPdfBottomBar>
  </PdfPreviewRoot>
);
