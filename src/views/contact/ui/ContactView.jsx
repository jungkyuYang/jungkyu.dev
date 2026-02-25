'use client';

import { PageHeader } from '@/shared/ui/PageHeader';
import { SocialCardGridWidget } from '@/widgets/social-card-grid/ui/SocialCardGridWidget';

export const ContactView = ({ data }) => {
  return (
    <article className="animate-fade-in flex w-full flex-1 flex-col items-center gap-12 py-12 md:py-20">
      {/* 1. Page에서 정해준 위젯 이름 그대로 Spread */}
      <PageHeader {...data.PageHeader} />

      <section className="w-full">
        {/* 2. 가독성도 좋고 코드도 훨씬 짧아집니다. */}
        <SocialCardGridWidget {...data.SocialCardGridWidget} />
      </section>
    </article>
  );
};
