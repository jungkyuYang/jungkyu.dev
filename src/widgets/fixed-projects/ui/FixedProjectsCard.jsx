'use client';

import ProjectCardEntity from '@/entities/projects/ui/ProjectCardEntity';

import { useFixedProjectsContext } from '../model/FixedProjectsContext';

export const FixedProjectsCard = ({ data }) => {
  const { techIcons, label, subLabel } = useFixedProjectsContext();

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
    <span className="text-amber-600 dark:text-amber-500">{label}</span>
    <span>{language}</span>
  </div>
);

const CardFooter = ({ subLabel, year }) => (
  <div className="mt-1 flex w-full items-center justify-between border-t border-zinc-100 pt-3 text-[11px] text-zinc-500 dark:border-zinc-800">
    <span className="font-medium">{subLabel}</span>
    <span className="opacity-70">{year}</span>
  </div>
);
