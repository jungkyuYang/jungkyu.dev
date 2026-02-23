import { Suspense } from 'react';

import { AnalyticsWrapper } from '@shared/ui/bentoGrid/AnalyticsWrapper';
import { ContactSkeleton } from '@shared/ui/bentoGrid/Contact';
import { ContactWrapper } from '@shared/ui/bentoGrid/ContactWrapper';
import { GitHubStatsSkeleton } from '@shared/ui/bentoGrid/GitHubStats';
import { GitHubStatsWrapper } from '@shared/ui/bentoGrid/GitHubStatsWrapper';
import { TechStackWrapper } from '@shared/ui/bentoGrid/TechStackWrapper';
import { ThreeDLogoWrapper } from '@widgets/ThreeDLogo/ui/ThreeDLogoWrapper';

import { BentoCard } from '@/shared/ui/bentoGrid/BentoCard';
import { BentoGrid } from '@/shared/ui/bentoGrid/BentoGrid';
import { MainProjectContent } from '@/shared/ui/bentoGrid/MainProjectContent';

import { ProjectCard } from './ProjectCard';

export const BentoSection = ({ username, projects }) => {
  const [main, second] = projects;

  return (
    // 1. section: 위계상 h2 다음이므로 의미 있는 구역으로 설정
    <section className="flex w-full max-w-7xl justify-center px-4">
      {/* 2. BentoGrid: gap 조절을 통해 애플 특유의 여백미 확보 */}
      <BentoGrid className="w-full gap-4 md:gap-6">
        {/* 메인 프로젝트: 가장 큰 비중을 차지하므로 아티클 성격 */}
        <BentoCard span="lg:col-span-2 lg:row-span-2" className="overflow-hidden !p-0">
          <MainProjectContent project={main} isLoading={!main} />
        </BentoCard>

        {/* 3D 로고: 브랜딩 요소 */}
        <BentoCard
          span="lg:col-span-1 lg:row-span-2"
          className="flex items-center justify-center overflow-visible"
        >
          <Suspense fallback={<div className="animate-pulse text-zinc-500/20">Loading...</div>}>
            <ThreeDLogoWrapper name={username.toUpperCase()} />
          </Suspense>
        </BentoCard>

        {/* 데이터 분석: 시각적 지표 */}
        <BentoCard span="lg:col-span-2 lg:row-span-1">
          <Suspense fallback={<AnalyticsFallback />}>
            <AnalyticsWrapper />
          </Suspense>
        </BentoCard>

        {/* GitHub 통계 */}
        <BentoCard span="lg:col-span-1 lg:row-span-1">
          <Suspense fallback={<GitHubStatsSkeleton />}>
            <GitHubStatsWrapper username={username} />
          </Suspense>
        </BentoCard>

        {/* 기술 스택: 나열 정보 */}
        <BentoCard span="lg:col-span-1 lg:row-span-2">
          <TechStackWrapper />
        </BentoCard>

        {/* 서브 프로젝트: ProjectCard 내부에 패딩이 있으므로 !p-0으로 중복 방지 */}
        <BentoCard span="lg:col-span-2 lg:row-span-1" className="!p-0">
          <ProjectCard project={second} />
        </BentoCard>

        {/* 컨택트: 하단 마무리 */}
        <BentoCard span="lg:col-span-2 lg:row-span-1">
          <Suspense fallback={<ContactSkeleton />}>
            <ContactWrapper username={username} />
          </Suspense>
        </BentoCard>
      </BentoGrid>
    </section>
  );
};

// 가독성을 위한 로컬 폴백 컴포넌트
const AnalyticsFallback = () => (
  <div className="flex h-full animate-pulse items-center justify-center text-[10px] font-black tracking-widest text-zinc-400 uppercase">
    Loading Analytics...
  </div>
);
