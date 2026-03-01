'use client';

import { User } from 'lucide-react';

import { usePersonalProjectsContext } from '../model/PersonalProjectsContext';

const CONSTANT = {
  ICON_SIZE: 24,
  // 🌟 개인 프로젝트는 Emerald(초록) 계열을 사용하여 생동감을 부여합니다.
  ICON_COLOR: 'text-emerald-500',
};

export const PersonalProjectsHeader = () => {
  const { title } = usePersonalProjectsContext();

  return (
    <>
      <User size={CONSTANT.ICON_SIZE} className={CONSTANT.ICON_COLOR} fill="currentColor" />
      <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{title}</h2>
    </>
  );
};
