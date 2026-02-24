'use client';

import { useCopyToClipboard } from '@/shared/lib/hooks/use-copy-to-clipboard';

import { SocialCardGrid } from './SocialCardGrid';
import { SocialCardProvider } from '../model/SocialCardContext';

export const SocialCardGridWidget = ({ items }) => {
  const copyState = useCopyToClipboard();

  return (
    <SocialCardProvider value={copyState}>
      <SocialCardGrid items={items} />
    </SocialCardProvider>
  );
};
