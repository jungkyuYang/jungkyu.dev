// src/app/page.js
import { getUser } from '@/shared/api/data';
import data from '@/shared/constants/data.json';
import { toUpper } from '@/shared/lib/format';
import { BentoSection } from '@/widgets/bento-grid/ui/BentoSection';
import { Profile } from '@/widgets/profile/ui/Profile';
import { ProfileActivity } from '@/widgets/profile-activity/ui/ProfileActivity';

export default async function Page({ searchParams }) {
  // 1. 파라미터 및 데이터 확보
  const { username } = await searchParams;
  const finalUsername = username || process.env.GITHUB_USERNAME || data.githubUsername;

  // 데이터 병렬 패칭을 원하신다면 Promise.all을 쓸 수도 있습니다.
  const user = await getUser(finalUsername);
  const bentoUsername = toUpper(finalUsername);

  return (
    <article className="animate-fade-in flex w-full flex-1 flex-col items-center gap-2">
      <header className="w-full">
        <Profile username={finalUsername} user={user} />
      </header>

      <section className="w-full">
        <ProfileActivity username={finalUsername} />
      </section>

      <section className="w-full">
        <BentoSection username={bentoUsername} projects={data.projects} />
      </section>
    </article>
  );
}
