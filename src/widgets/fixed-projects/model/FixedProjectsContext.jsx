'use client';

import { createContext, useContext } from 'react';

import { useFixedProjects } from '../lib/useFixedProjects';

const FixedProjectsContext = createContext(null);

export const useFixedProjectsContext = () => {
  const context = useContext(FixedProjectsContext);
  if (!context) {
    throw new Error('useFixedProjectsContext must be used within FixedProjectsProvider');
  }
  return context;
};

export const FixedProjectsProvider = ({ children, projects, isInternal }) => {
  const value = useFixedProjects({ projects }, isInternal);

  return <FixedProjectsContext.Provider value={value}>{children}</FixedProjectsContext.Provider>;
};
