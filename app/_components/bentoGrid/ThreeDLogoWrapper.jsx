'use client';

import React from 'react';

import { ThreeDLogo } from './ThreeDLogo';

export const ThreeDLogoWrapper = ({ name }) => {
  return (
    /* h-full과 relative가 핵심입니다. */
    <div className="relative w-full h-full min-h-[300px] flex items-center justify-center overflow-visible bg-transparent">
      <ThreeDLogo name={name} />
    </div>
  );
};
