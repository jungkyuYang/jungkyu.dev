'use client';

import { useMemo } from 'react';

import * as CONSTANTS from '@/shared/constants';

const getYearFromDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? '' : String(date.getFullYear());
};

// 🌟 isInternal (본인 여부) 인자 추가
export const useFixedProjects = (data = {}, isInternal = false) => {
  const {
    projects: rawProjects = [],
    title = 'Main Projects',
    label = 'Featured Project',
    subLabel = 'Core Architecture',
    techIcons = CONSTANTS.TECH_ICONS,
    githubLabel = 'GitHub',
    demoLabel = 'Live Demo',
    pdfLabel = 'PDF',
    backTitle = 'Project Links',
  } = data;

  return useMemo(() => {
    const processedProjects = rawProjects.map((p) => {
      // 🌟 기본 버튼 구성
      const buttons = [
        { label: githubLabel, url: p.githubUrl, type: 'external' },
        { label: demoLabel, url: p.liveUrl, type: 'external' },
      ];

      // 🌟 본인(isInternal)일 때만 PDF 버튼 추가
      if (isInternal) {
        buttons.push({
          label: pdfLabel,
          url: `/projects/${p.name}`,
          type: 'internal',
        });
      }

      // 최종적으로 URL이 있는 버튼만 필터링
      const validButtons = buttons.filter((btn) => Boolean(btn.url));

      return {
        ...p,
        id: p.id || p.name,
        displayTitle: p.title || p.name || 'Untitled Project',
        displayDescription: p.customDescription || p.description || '',
        displayYear: getYearFromDate(p.customCreatedAt || p.created_at),
        displayLanguage: p.language || 'TypeScript',
        safeTechStack: Array.isArray(p.techStack) ? p.techStack : [],
        backTitle: p.backTitle || backTitle,
        buttons: validButtons,
      };
    });

    return {
      projects: processedProjects,
      title,
      label,
      subLabel,
      techIcons,
    };
  }, [
    rawProjects,
    title,
    label,
    subLabel,
    techIcons,
    githubLabel,
    demoLabel,
    backTitle,
    pdfLabel,
    isInternal,
  ]);
};
