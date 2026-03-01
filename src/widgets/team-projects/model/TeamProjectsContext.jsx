'use client';

import { createContext, useContext } from 'react';

import { useTeamProjects } from '../lib/useTeamProjects'; // 가공 훅 임포트

const TeamProjectsContext = createContext(null);

export const useTeamProjectsContext = () => {
  const context = useContext(TeamProjectsContext);
  if (!context) {
    throw new Error('useTeamProjectsContext must be used within TeamProjectsProvider');
  }
  return context;
};

export const TeamProjectsProvider = ({ children, projects }) => {
  // 서버에서 전달받은 projects 데이터를 클라이언트 훅으로 처리
  const value = useTeamProjects({ projects });

  return <TeamProjectsContext.Provider value={value}>{children}</TeamProjectsContext.Provider>;
};
