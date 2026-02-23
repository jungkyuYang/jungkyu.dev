'use client';

import { createContext, useContext } from 'react';

const NavigationContext = createContext(null);

// 시니어 팁: useContext를 직접 쓰는 것보다 커스텀 훅으로 감싸면 에러 잡기가 편합니다.
export const useNavContext = () => {
  const context = useContext(NavigationContext);
  if (!context) throw new Error('useNavContext는 NavigationProvider 안에서만 쓰세요!');
  return context;
};

export const NavigationProvider = NavigationContext.Provider;
