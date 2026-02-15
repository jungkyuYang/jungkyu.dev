import React from "react";
import UserSearch from "../_components/search-input";

// TODO: make it edge once Turbopack supports it.
export const runtime = "nodejs";

export default async function SearchPage(props) {
  const searchParams = await props.searchParams;
  const { customUsername } = searchParams;
  const username = customUsername || process.env.GITHUB_USERNAME;

  return (
    <article className="flex-1 flex flex-col items-center justify-center w-full animate-fade-in">
      
      {/* 장식용 라인 */}
      <div className="hidden w-full h-px animate-glow md:block animate-fade-left bg-linear-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />

      {/* 검색 섹션 */}
      <section className="z-10 py-10 w-full flex justify-center">
        <UserSearch user={username} />
      </section>

      <div className="hidden w-full h-px animate-glow md:block animate-fade-right bg-linear-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      
      <p className="mt-4 text-sm text-zinc-500">
        Type a GitHub username to see their portfolio
      </p>

      {/* [핵심: 시각적 보정을 위한 Spacer]
        상단 Header의 높이만큼 아래에서 밀어줍니다. 
        이렇게 하면 z-index 없이도 네비게이션을 덮지 않고 중앙을 맞춥니다.
      */}
      <div className="h-32 w-full" aria-hidden="true" />
    </article>
  );
}