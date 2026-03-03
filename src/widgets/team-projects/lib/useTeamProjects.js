'use client';

import { useMemo } from 'react';

const getYearFromDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? '' : String(date.getFullYear());
};

export const useTeamProjects = (data = {}) => {
  const {
    projects: rawProjects = [],
    title = 'Team Projects',
    label = 'Team Project',
    subLabel = 'Shared Contribution',
    githubLabel = 'GitHub',
    demoLabel = 'Live Demo',
    backTitle = 'Project Resources',
  } = data;

  return useMemo(() => {
    const processedProjects = rawProjects.map((p) => {
      const buttons = [
        { label: githubLabel, url: p.githubUrl, type: 'external' },
        { label: demoLabel, url: p.liveUrl, type: 'external' },
      ].filter((btn) => Boolean(btn.url));

      return {
        ...p,
        id: p.id || p.name,
        displayTitle: p.title || p.name || 'Untitled Project',
        displayDescription: p.customDescription || p.description || '',
        displayYear: getYearFromDate(p.customCreatedAt || p.created_at),
        displayLanguage: p.language || 'TypeScript',
        safeTechStack: Array.isArray(p.techStack) ? p.techStack : [],
        backTitle: p.backTitle || backTitle,
        buttons,
      };
    });

    return {
      projects: processedProjects,
      title,
      label,
      subLabel,
    };
  }, [rawProjects, title, label, subLabel, githubLabel, demoLabel, backTitle]);
};
