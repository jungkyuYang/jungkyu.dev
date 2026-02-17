import Link from "next/link";
import Image from "next/image";
import React, { Suspense } from "react";
import data from "../data.json";
import { ProfileOrganizations } from "./_components/orgs";
import { RecentActivity } from "./_components/recent-activity";
import { getUser } from "./_services/data";
import { BentoGrid } from "./_components/BentoGrid";
import { BentoCard } from "./_components/BentoCard";
import { MainProjectContent } from "./_components/bentoGrid/MainProjectContent";
import { GitHubStatsWrapper } from "./_components/bentoGrid/GitHubStatsWrapper";
import { GitHubStatsSkeleton } from "./_components/bentoGrid/GitHubStats";
import { ContactWrapper } from "./_components/bentoGrid/ContactWrapper";
import { ContactSkeleton } from "./_components/bentoGrid/Contact";
import { TechStackWrapper } from "./_components/bentoGrid/TechStackWrapper";
import { AnalyticsWrapper } from "./_components/bentoGrid/AnalyticsWrapper";
import { ThreeDLogoWrapper } from "./_components/bentoGrid/ThreeDLogoWrapper";

export default async function Home(props) {
  const searchParams = await props.searchParams;
  return <LandingComponent searchParams={searchParams} />;
}

const UserIcon = async ({ promise }) => {
  const user = await promise;
  return (
    <Image
      alt="👨‍💻"
      width={100}
      height={100}
      src={user.avatar_url || data.avatarUrl}
      className="float-right rounded-full mx-4"
      priority // 조언 반영: Hero 영역 이미지 최적화
    />
  );
};

const UserText = async ({ promise }) => {
  const user = await promise;
  return (
    <p>
      Hi, my name is {user.name || data.displayName}
      {". "}
      {user.bio}
    </p>
  );
};

const LandingComponent = async ({ searchParams: { customUsername } }) => {
  const username = customUsername || process.env.GITHUB_USERNAME || data.githubUsername;
  const promise = getUser(username);
  const testMode = true;

  // 1. 포트폴리오 데이터 확장 (내용 유지)
  const portfolioImages = [
    {
      src: "/images/4yclingHomerun.webp",
      alt: "KTwiz홈페이지 UI/UX 개선 프로젝트",
      title: "KTwiz홈페이지 UI/UX 개선 프로젝트",
      period: "2024.09.02 - 2024.09.27",
      description: "로그인·회원가입·투두리스트를 구현한 웹 사이트로서 REST API 활용 및 UX 개선에 목적을 두었습니다.",
      techStack: ["TypeScript",
      "React",
      "TanStack-Query",
      "Axios",
      "TailwindCSS",
      "Vercel",
      "Framer-Motion"],
      link: "/projects/4yclinghomerun-client",
    },
    {
      src: "/images/replay.webp",
      alt: "영상 공유 커뮤니티 모바일 플랫폼",
      title: "영상 공유 커뮤니티 모바일 플랫폼",
      period: "2025.03.26 - 2025.04.18",
      description: "로그인·영상 등록·썸네일 업로드·프로필 설정·댓글·좋아요·구독 등 게이머 사용자들이 자신만의 Youtube 영상 리스트를 등록하고 소통하는 커뮤니티 플랫폼으로서, 의존성이 분리된 코드 구현 및 UX 개선에 목적을 두었습니다.",
      techStack: ["TypeScript",
      "React",
      "TanStack-Query",
      "Zustand",
      "Shadcn",
      "TailwindCSS",
      "Playwright",
      "Supabase",
      "Netlify",
      "Framer-Motion",],
      link: "/projects/toy-project3-team1",
    },
  ];

  const mainProject = portfolioImages[1];


  return (
    <article className="flex-1 flex flex-col items-center w-full animate-fade-in">
      {/* 장식용 빛나는 라인 (상단) */}
      <div className="hidden w-full h-px animate-glow md:block animate-fade-left bg-linear-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />

      {/* 히어로 영역 */}
      <h1 className="flex items-center z-10 text-4xl hover:scale-105 !text-zinc-900 dark:!text-zinc-100 duration-1000 cursor-default text-edge-outline animate-title font-display sm:text-6xl md:text-9xl whitespace-nowrap p-5">
        {username}
        <Suspense fallback={<div className="w-[100px] h-[100px] rounded-full bg-zinc-800/10 animate-pulse mx-4" />}>
          <UserIcon promise={promise} />
        </Suspense>
      </h1>

      {/* 장식용 빛나는 라인 (하단) */}
      <div className="hidden w-full h-px animate-glow md:block animate-fade-right bg-linear-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      
      {/* 텍스트 및 활동 영역 */}
      <div className="my-16 text-center animate-fade-in px-4">
        <div className="text-lg !text-zinc-700 dark:!text-zinc-400">
          <Suspense fallback={<div className="w-full min-h-28 animate-pulse text-zinc-500">Loading profile...</div>}>
            <div className="w-full min-h-28">
              <UserText promise={promise} />
              <ProfileOrganizations username={username} />
              <RecentActivity username={username} />
            </div>
          </Suspense>
        </div>
      </div>

      {/* 대표 포트폴리오 섹션 */}
      {testMode === true ? (      <section className="w-full max-w-6xl mx-auto px-6 mb-12">
  <BentoGrid>
    {/* 1. 메인 프로젝트 (2x2) */}
    <BentoCard span="lg:col-span-2 lg:row-span-2" className="bg-[#1D1D1F] text-white p-0 overflow-hidden group">
      {/* 조언 반영: isLoading 프롭 추가하여 데이터 부재 시 스켈레톤 대응 */}
      <MainProjectContent project={mainProject} isLoading={!mainProject} />
    </BentoCard>

    {/* 2. 중앙 로고/오브제 (1x2) */}
    <BentoCard 
  span="lg:col-span-1 lg:row-span-2" 
>
<Suspense fallback={<div className="w-full h-full flex items-center justify-center text-white/10">Loading...</div>}>
    <ThreeDLogoWrapper name={username.toUpperCase()} />
  </Suspense>
</BentoCard>

    {/* 3. Think Different / GA 지표 (2x1) */}
    <BentoCard span="lg:col-span-2 lg:row-span-1">
    <Suspense fallback={
    <div className="p-6 h-full flex items-center justify-center animate-pulse text-[10px] font-black text-zinc-400 uppercase tracking-widest">
      Loading Analytics...
    </div>
  }>
    <AnalyticsWrapper />
  </Suspense>
    </BentoCard>

    {/* 4. performance (1x2) - 우측 세로형 */}
    <BentoCard span="lg:col-span-1 lg:row-span-1">
              <Suspense fallback={<GitHubStatsSkeleton />}>
                <GitHubStatsWrapper username={username} />
              </Suspense>
            </BentoCard>

    {/* 5. Tech Stack */}
    <BentoCard span="lg:col-span-1 lg:row-span-2">
  <TechStackWrapper stacks={["React", "Next.js", "Tailwind CSS", "TypeScript", "Zustand"]} />
</BentoCard>


    {/* 6. Second Project (2x1) - 가로형 프로젝트 카드 */}
    <BentoCard span="lg:col-span-2 lg:row-span-1" className="bg-apple-gray">
      <div className="flex justify-between items-end h-full">
        <div>
          <h3 className="font-bold">Second Project</h3>
          <p className="text-sm text-neutral-500">Mobile App UI Kit</p>
        </div>
        <div className="text-blue-500 text-xs">View Case →</div>
      </div>
    </BentoCard>

    <BentoCard span="lg:col-span-2 lg:row-span-1" className="bg-white dark:bg-zinc-900/50 border-zinc-100 dark:border-zinc-800">
    <Suspense fallback={<ContactSkeleton />}>
    <ContactWrapper username={username} />
  </Suspense>
            </BentoCard>
  </BentoGrid>
</section>) : ( <section className="w-full max-w-6xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {portfolioImages.map((img) => (
            <Link
              href={img.link}
              key={img.src}
              className="group flex flex-col h-full rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
            >
              {/* 1. 이미지 (16:9 고정) */}
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />
              </div>

              {/* 2. 프로젝트 정보 영역 */}
              <div className="p-8 flex flex-col flex-1">
                {/* 제목 및 기간 */}
                <div className="mb-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-2xl font-bold !text-zinc-900 dark:!text-zinc-100 group-hover:text-blue-500 transition-colors duration-300">
                      {img.title}
                    </h3>
                  </div>
                  <p className="text-sm text-zinc-500 mt-1 font-mono">
                    {img.period}
                  </p>
                </div>
                
                {/* 설명 (내용이 길어도 flex-1로 공간 확보) */}
                <p className="text-base !text-zinc-600 dark:!text-zinc-400 leading-relaxed mb-8 flex-1">
                  {img.description}
                </p>

                {/* 3. 기술 스택 (항상 카드의 바닥에 위치) */}
                <div className="pt-6 border-t border-zinc-100 dark:border-zinc-800 flex flex-wrap gap-2">
                  {img.techStack.map((tech) => (
                    <span 
                      key={tech} 
                      className="px-2.5 py-1 text-[11px] font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 rounded-md border border-zinc-200 dark:border-zinc-700 uppercase tracking-tight"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>)}

    </article>
  );
};