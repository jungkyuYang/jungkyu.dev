'use client';

import ProjectCardEntity from '@/entities/projects/ui/ProjectCardEntity';

import { useTeamProjectsContext } from '../model/TeamProjectsContext';

export const TeamProjectsCard = ({ data }) => {
  const { techIcons, label, subLabel } = useTeamProjectsContext();

  return (
    <ProjectCardEntity
      project={{
        title: data.displayTitle,
        description: data.displayDescription,
        techStack: data.safeTechStack,
      }}
      buttons={data.buttons}
      backTitle={data.backTitle}
      techIcons={techIcons}
      header={<CardHeader label={label} language={data.displayLanguage} />}
      footer={<CardFooter subLabel={subLabel} year={data.displayYear} />}
    />
  );
};

const CardHeader = ({ label, language }) => (
  <div className="flex w-full items-center justify-between text-[10px] font-semibold tracking-widest text-zinc-500 uppercase">
    {/* 🌟 팀 프로젝트는 보통 푸른색 계열(indigo/blue)을 많이 씁니다. 원하시면 amber 유지도 가능합니다. */}
    <span className="text-indigo-600 dark:text-indigo-400">{label}</span>
    <span>{language}</span>
  </div>
);

const CardFooter = ({ subLabel, year }) => (
  <div className="mt-1 flex w-full items-center justify-between border-t border-zinc-100 pt-3 text-[11px] text-zinc-500 dark:border-zinc-800">
    <span className="font-medium">{subLabel}</span>
    <span className="opacity-70">{year}</span>
  </div>
);
