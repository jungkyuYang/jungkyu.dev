'use client';

import Link from 'next/link';

import { useCopyToClipboard } from '@/shared/hooks/use-copy-to-clipboard';
import { cn } from '@/shared/lib/utils';
import { Card } from '@/shared/ui/Card';

import { ContactCardContent } from './ContactCardContent';
import { parseContacts } from '../lib/parse-contacts';

export const ContactView = ({ username, email, githubSocials = [] }) => {
  const contacts = parseContacts(username, email, githubSocials);
  const { isCopied, copy } = useCopyToClipboard();

  return (
    /* SEO를 위한 article 태그와 중앙 정렬 레이아웃을 View에서 관리 */
    <article className="animate-fade-in flex min-h-[80vh] w-full flex-1 flex-col items-center justify-center py-12">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
          Contact
        </h1>
        <p className="mt-4 text-zinc-500 dark:text-zinc-400">
          이메일이나 SNS를 통해 언제든 편하게 연락해 주세요.
        </p>
      </header>

      {/* 연락처 카드 그리드 */}
      <section className="mx-auto grid w-full max-w-7xl grid-cols-1 items-stretch gap-8 px-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-16">
        {contacts.map((contact) => (
          <Card key={contact.label}>
            <ContactItem contact={contact} isCopied={isCopied} onCopy={copy} />
          </Card>
        ))}
      </section>
    </article>
  );
};
const ContactItem = ({ contact, isCopied, onCopy }) => {
  const isEmail = contact.label === 'Email';

  // 공통 스타일: Prettier 정렬 적용
  const baseCardStyles =
    'relative flex h-full w-full flex-col items-center justify-center gap-4 p-4 py-12 transition-all duration-700 md:py-20 lg:py-24';

  // 이메일 타입: 버튼으로 렌더링
  if (isEmail) {
    return (
      <button
        type="button"
        onClick={() => onCopy(contact.handle, () => (window.location.href = contact.href))}
        className={cn(baseCardStyles, 'cursor-pointer focus:outline-none')}
      >
        <ContactCardContent {...contact} isCopied={isCopied} />
      </button>
    );
  }

  // SNS 타입: 링크로 렌더링
  return (
    <Link href={contact.href} target="_blank" rel="noopener noreferrer" className={baseCardStyles}>
      <ContactCardContent {...contact} />
    </Link>
  );
};
