// src/pages/home/ui/HomeView.jsx
import { BentoSection } from '@/widgets/bentoGrid/ui/BentoSection';
import { Profile } from '@/widgets/profile/ui/Profile';
import { ProfileActivity } from '@/widgets/profile-activity/ui/ProfileActivity';

export const HomeView = ({ user, projects, username }) => {
  const upperUsername = username?.toUpperCase() || '';

  return (
    <article className="animate-fade-in flex w-full flex-1 flex-col items-center">
      {/* 1. 헤더: 사용자 프로필 영역 */}
      <header className="flex w-full flex-col items-center">
        <Profile username={username} user={user} />
      </header>

      {/* 2. 활동 기록 섹션: 중앙 정렬 강화 */}
      <section className="flex w-full flex-col text-center">
        <ProfileActivity username={username} />
      </section>

      {/* 3. 프로젝트 그리드 섹션 */}
      <section className="mt-24 flex w-full flex-col items-center">
        <BentoSection username={upperUsername} projects={projects || []} />
      </section>
    </article>
  );
};
