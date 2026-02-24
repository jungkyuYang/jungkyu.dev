// src/widgets/social-card-grid/ui/SocialCardGrid.jsx
'use client';

import { SocialCard } from './SocialCard';
import * as Layout from './SocialCardLayouts';

export const SocialCardGrid = ({ items }) => {
  return (
    <Layout.Root>
      {items.map((item) => (
        <SocialCard key={item.label} item={item} />
      ))}
    </Layout.Root>
  );
};
