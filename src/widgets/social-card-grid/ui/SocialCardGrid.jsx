'use client';

import { SocialCard } from './SocialCard';
import * as Layout from './SocialCardLayouts';

export const SocialCardGrid = ({ items }) => {
  return (
    // Layout.Root -> Layout.SocialCardGridRoot로 명확하게 변경
    <Layout.SocialCardGridRoot>
      {items.map((item) => (
        <SocialCard key={item.label} item={item} />
      ))}
    </Layout.SocialCardGridRoot>
  );
};
