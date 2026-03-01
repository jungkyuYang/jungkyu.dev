'use client';

import { Pin } from 'lucide-react';

import { useFixedProjectsContext } from '../model/FixedProjectsContext';

const CONSTANT = {
  ICON_SIZE: 24,
  ICON_COLOR: 'text-amber-500',
};

export const FixedProjectsHeader = () => {
  const { title } = useFixedProjectsContext();

  return (
    <>
      <Pin size={CONSTANT.ICON_SIZE} className={CONSTANT.ICON_COLOR} fill="currentColor" />
      <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{title}</h2>
    </>
  );
};
