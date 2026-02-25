'use client';

import { createContext, useContext } from 'react';

const PdfPreviewContext = createContext(null);

export const usePdfPreviewContext = () => {
  const context = useContext(PdfPreviewContext);
  if (!context) {
    throw new Error('usePdfPreview는 PdfPreviewProvider 안에서만 사용 가능합니다!');
  }
  return context;
};

export const PdfPreviewProvider = PdfPreviewContext.Provider;
