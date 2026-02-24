'use client';

import { PageHeader } from '@/shared/ui/PageHeader'; // 💡 분리한 shared 컴포넌트 호출
import { SocialCardGridWidget } from '@/widgets/social-card-grid/ui/SocialCardGridWidget';

import { parseContacts } from '../lib/parse-contacts';

export const ContactView = ({ username, email, githubSocials = [] }) => {
  const contacts = parseContacts(username, email, githubSocials);

  return (
    <article className="animate-fade-in flex w-full flex-1 flex-col items-center gap-12 py-12 md:py-20">
      <PageHeader
        title="Contact"
        description="이메일이나 SNS를 통해 언제든 편하게 연락해 주세요."
      />

      <section className="w-full">
        <SocialCardGridWidget items={contacts} />
      </section>
    </article>
  );
};
