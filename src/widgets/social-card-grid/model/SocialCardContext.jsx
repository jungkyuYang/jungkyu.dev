'use client';

import { createContext, useContext } from 'react';

const SocialCardContext = createContext(null);

export const SocialCardProvider = SocialCardContext.Provider;

export const useSocialCard = () => {
  const context = useContext(SocialCardContext);
  if (!context) {
    throw new Error('useSocialCard는 SocialCardProvider 내부에서 사용되어야 합니다.');
  }
  return context;
};
