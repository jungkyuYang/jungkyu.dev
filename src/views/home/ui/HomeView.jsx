// src/pages/home/ui/HomeView.jsx
import { BentoSection } from '@/widgets/bentoGrid/ui/BentoSection';
import { Profile } from '@/widgets/profile/ui/Profile';
import { ProfileActivity } from '@/widgets/profile-activity/ui/ProfileActivity';

export const HomeView = ({ user, projects, username }) => {
  const upperUsername = username?.toUpperCase() || '';

  return (
    <article className="animate-fade-in flex w-full flex-1 flex-col items-center gap-2">
      {/* 1. 상단: 사용자 정체성 (Header) */}
      <header className="w-full">
        <Profile username={username} user={user} />
      </header>

      {/* 2. 중단: 활동 지표 (Section) */}
      <section className="w-full">
        <ProfileActivity username={username} />
      </section>

      {/* 3. 하단: 주요 성과물 (Section) */}
      <section className="w-full">
        <BentoSection username={upperUsername} projects={projects || []} />
      </section>
    </article>
  );
};
