import React, { Suspense } from 'react';

import Image from 'next/image';

import { AnalyticsWrapper } from '@shared/ui/bentoGrid/AnalyticsWrapper';
import { ContactSkeleton } from '@shared/ui/bentoGrid/Contact';
import { ContactWrapper } from '@shared/ui/bentoGrid/ContactWrapper';
import { GitHubStatsSkeleton } from '@shared/ui/bentoGrid/GitHubStats';
import { GitHubStatsWrapper } from '@shared/ui/bentoGrid/GitHubStatsWrapper';
import { MainProjectContent } from '@shared/ui/bentoGrid/MainProjectContent';
import { TechStackWrapper } from '@shared/ui/bentoGrid/TechStackWrapper';
import { ProfileOrganizations } from '@shared/ui/orgs';
import { RecentActivity } from '@shared/ui/recent-activity';
import { ThreeDLogoWrapper } from '@widgets/ThreeDLogo/ui/ThreeDLogoWrapper';

import { getUser } from '@/shared/api/data';
import data from '@/shared/constants/data.json'; // ✅ data.json 가져오기
import { BentoCard } from '@/shared/ui/bentoGrid/BentoCard';
import { BentoGrid } from '@/shared/ui/bentoGrid/BentoGrid';

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
      priority
    />
  );
};

const UserText = async ({ promise }) => {
  const user = await promise;
  return (
    <p>
      Hi, my name is {user.name || data.displayName}
      {'. '}
      {user.bio}
    </p>
  );
};

const LandingComponent = async ({ searchParams: { customUsername } }) => {
  const username = customUsername || process.env.GITHUB_USERNAME || data.githubUsername;
  const promise = getUser(username);
  const testMode = true;

  // ✅ 1. 외부 data.json에서 프로젝트 리스트 참조
  const portfolioImages = data.projects;

  // ✅ 2. 메인과 서브 프로젝트 할당 (순서 기반)
  const mainProject = portfolioImages[0]; // replay
  const secondProject = portfolioImages[1]; // homerun

  return (
    <article className="flex-1 flex flex-col items-center w-full animate-fade-in">
      <div className="hidden w-full h-px animate-glow md:block animate-fade-left bg-linear-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />

      <h1 className="flex items-center z-10 text-4xl hover:scale-105 !text-zinc-900 dark:!text-zinc-100 duration-1000 cursor-default text-edge-outline animate-title font-display sm:text-6xl md:text-9xl whitespace-nowrap p-5">
        {username}
        <Suspense
          fallback={
            <div className="w-[100px] h-[100px] rounded-full bg-zinc-800/10 animate-pulse mx-4" />
          }
        >
          <UserIcon promise={promise} />
        </Suspense>
      </h1>

      <div className="hidden w-full h-px animate-glow md:block animate-fade-right bg-linear-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />

      <div className="my-16 text-center animate-fade-in px-4">
        <div className="text-lg !text-zinc-700 dark:!text-zinc-400">
          <Suspense
            fallback={
              <div className="w-full min-h-28 animate-pulse text-zinc-500">Loading profile...</div>
            }
          >
            <div className="w-full min-h-28">
              <UserText promise={promise} />
              <ProfileOrganizations username={username} />
              <RecentActivity username={username} />
            </div>
          </Suspense>
        </div>
      </div>

      {testMode === true ? (
        <section>
          <BentoGrid>
            {/* 1. 메인 프로젝트 (2x2) */}
            <BentoCard span="lg:col-span-2 lg:row-span-2">
              <MainProjectContent project={mainProject} isLoading={!mainProject} />
            </BentoCard>

            {/* 2. 중앙 로고 */}
            <BentoCard span="lg:col-span-1 lg:row-span-2" className="overflow-visible">
              <Suspense
                fallback={
                  <div className="w-full h-full flex items-center justify-center text-white/10">
                    Loading...
                  </div>
                }
              >
                <ThreeDLogoWrapper name={username.toUpperCase()} />
              </Suspense>
            </BentoCard>

            {/* 3. Analytics */}
            <BentoCard span="lg:col-span-2 lg:row-span-1">
              <Suspense
                fallback={
                  <div className="p-6 h-full flex items-center justify-center animate-pulse text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                    Loading Analytics...
                  </div>
                }
              >
                <AnalyticsWrapper />
              </Suspense>
            </BentoCard>

            {/* 4. GitHub Stats */}
            <BentoCard span="lg:col-span-1 lg:row-span-1">
              <Suspense fallback={<GitHubStatsSkeleton />}>
                <GitHubStatsWrapper username={username} />
              </Suspense>
            </BentoCard>

            {/* 5. Tech Stack */}
            <BentoCard span="lg:col-span-1 lg:row-span-2">
              <TechStackWrapper />
            </BentoCard>

            {/* ✅ 6. Second Project (2x1) - 가로형 카드 데이터 바인딩 */}
            <BentoCard span="lg:col-span-2 lg:row-span-1" className="bg-apple-gray group">
              <a
                href={secondProject?.deployUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-between items-end h-full p-1"
              >
                <div className="flex flex-col gap-1">
                  <h3 className="font-black text-zinc-800 dark:text-zinc-200 tracking-tight">
                    {secondProject?.title || 'Next Project'}
                  </h3>
                  <p className="text-[12px] text-zinc-500 font-bold">
                    {secondProject?.alt || 'Coming Soon'}
                  </p>
                </div>
                <div className="text-blue-500 text-[10px] font-black uppercase tracking-tighter group-hover:translate-x-1 transition-transform">
                  View Project →
                </div>
              </a>
            </BentoCard>

            {/* 7. Contact */}
            <BentoCard span="lg:col-span-2 lg:row-span-1">
              <Suspense fallback={<ContactSkeleton />}>
                <ContactWrapper username={username} />
              </Suspense>
            </BentoCard>
          </BentoGrid>
        </section>
      ) : (
        /* 리스트 모드 (데이터 맵핑) */
        <section className="w-full max-w-6xl mx-auto px-6 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {portfolioImages.map((img) => (
              <div
                key={img.id}
                className="group flex flex-col h-full rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                <div className="p-8 flex flex-col flex-1">
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold !text-zinc-900 dark:!text-zinc-100 group-hover:text-blue-500 transition-colors">
                      {img.title}
                    </h3>
                    <p className="text-sm text-zinc-500 mt-1 font-mono">{img.period}</p>
                  </div>

                  <p className="text-base !text-zinc-600 dark:!text-zinc-400 leading-relaxed mb-8 flex-1">
                    {img.description}
                  </p>

                  <div className="pt-6 border-t border-zinc-100 dark:border-zinc-800 flex flex-wrap gap-2">
                    {img.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 text-[11px] font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 rounded-md border border-zinc-200 dark:border-zinc-700 uppercase"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* 리스트 모드에서의 링크 버튼 */}
                  <div className="mt-6 flex gap-4">
                    <a
                      href={img.deployUrl}
                      target="_blank"
                      className="text-xs font-bold text-blue-500"
                    >
                      Live →
                    </a>
                    <a
                      href={img.githubUrl}
                      target="_blank"
                      className="text-xs font-bold text-zinc-400"
                    >
                      GitHub →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </article>
  );
};
