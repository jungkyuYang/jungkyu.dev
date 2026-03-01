'use client';

import { Users } from 'lucide-react'; // 🌟 협업을 상징하는 아이콘으로 변경

import { useTeamProjectsContext } from '../model/TeamProjectsContext';

const CONSTANT = {
  ICON_SIZE: 24,
  ICON_COLOR: 'text-indigo-500',
};

export const TeamProjectsHeader = () => {
  const { title } = useTeamProjectsContext();

  return (
    <>
      <Users size={CONSTANT.ICON_SIZE} className={CONSTANT.ICON_COLOR} fill="currentColor" />
      <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{title}</h2>
    </>
  );
};
