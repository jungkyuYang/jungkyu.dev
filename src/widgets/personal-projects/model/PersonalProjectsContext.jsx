'use client';

import { createContext, useContext } from 'react';

import { usePersonalProjects } from '../lib/usePersonalProjects';

const PersonalProjectsContext = createContext(null);

export const usePersonalProjectsContext = () => {
  const context = useContext(PersonalProjectsContext);
  if (!context) {
    throw new Error('usePersonalProjectsContext must be used within PersonalProjectsProvider');
  }
  return context;
};

export const PersonalProjectsProvider = ({ children, projects }) => {
  const value = usePersonalProjects({ projects });

  return (
    <PersonalProjectsContext.Provider value={value}>{children}</PersonalProjectsContext.Provider>
  );
};
