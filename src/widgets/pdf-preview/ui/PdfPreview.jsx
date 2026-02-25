'use client';

import { PdfActions } from './PdfActions';
import { PdfPlayer } from './PdfPlayer';
import * as Layout from './PdfPreviewLayouts';

export const PdfPreview = () => {
  return (
    <Layout.PdfPreviewRoot>
      <Layout.PdfPreviewPdfViewerContainer>
        <PdfPlayer />
      </Layout.PdfPreviewPdfViewerContainer>

      <Layout.PdfPreviewPdfBottomBar>
        <PdfActions />
      </Layout.PdfPreviewPdfBottomBar>
    </Layout.PdfPreviewRoot>
  );
};
