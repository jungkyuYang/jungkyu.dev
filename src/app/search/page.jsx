import React from 'react';

import UserSearch from '@/shared/ui/search-input';

// TODO: make it edge once Turbopack supports it.
export const runtime = 'nodejs';

export default async function SearchPage(props) {
  const searchParams = await props.searchParams;
  const { customUsername } = searchParams;
  const username = customUsername || process.env.GITHUB_USERNAME;

  return (
    <article className="animate-fade-in flex w-full flex-1 flex-col items-center justify-center">
      {/* 장식용 라인 */}
      <div className="animate-glow animate-fade-left hidden h-px w-full bg-linear-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0 md:block" />

      {/* 검색 섹션 */}
      <section className="z-10 flex w-full justify-center py-10">
        <UserSearch user={username} />
      </section>

      <div className="animate-glow animate-fade-right hidden h-px w-full bg-linear-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0 md:block" />

      <p className="mt-4 text-sm text-zinc-500">Type a GitHub username to see their portfolio</p>

      {/* [핵심: 시각적 보정을 위한 Spacer]
        상단 Header의 높이만큼 아래에서 밀어줍니다. 
        이렇게 하면 z-index 없이도 네비게이션을 덮지 않고 중앙을 맞춥니다.
      */}
      <div className="h-32 w-full" aria-hidden="true" />
    </article>
  );
}
