'use client';

import ProjectCardEntity from '@/entities/projects/ui/ProjectCardEntity';

// 🌟 Personal 전용 Context로 변경
import { usePersonalProjectsContext } from '../model/PersonalProjectsContext';

export const PersonalProjectsCard = ({ data }) => {
  const { label, subLabel } = usePersonalProjectsContext();

  return (
    <ProjectCardEntity
      project={{
        title: data.displayTitle,
        description: data.displayDescription,
        techStack: data.safeTechStack,
      }}
      buttons={data.buttons}
      backTitle={data.backTitle}
      header={<CardHeader label={label} language={data.displayLanguage} />}
      footer={<CardFooter subLabel={subLabel} year={data.displayYear} />}
    />
  );
};

const CardHeader = ({ label, language }) => (
  <div className="flex w-full items-center justify-between text-[10px] font-semibold tracking-widest text-zinc-500 uppercase">
    {/* 🌟 개인 프로젝트는 Emerald(초록) 색상을 적용하여 생동감을 줍니다. */}
    <span className="text-emerald-600 dark:text-emerald-400">{label}</span>
    <span>{language}</span>
  </div>
);

const CardFooter = ({ subLabel, year }) => (
  <div className="mt-1 flex w-full items-center justify-between border-t border-zinc-100 pt-3 text-[11px] text-zinc-500 dark:border-zinc-800">
    <span className="font-medium">{subLabel}</span>
    <span className="opacity-70">{year}</span>
  </div>
);
