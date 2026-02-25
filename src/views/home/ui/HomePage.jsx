import { getUser } from '@/shared/api/data';
import data from '@/shared/constants/data.json';
import { toUpper } from '@/shared/lib/format'; // 가공용 헬퍼 함수 가정

import { HomeView } from './HomeView';

export async function HomePage({ username }) {
  const finalUsername = username || process.env.GITHUB_USERNAME || data.githubUsername;
  const user = await getUser(finalUsername);

  const bentoUsername = toUpper(finalUsername);

  const pageData = {
    Profile: {
      username: finalUsername,
      user,
    },
    ProfileActivity: {
      username: finalUsername,
    },
    BentoSection: {
      username: bentoUsername,
      projects: data.projects,
    },
  };

  return <HomeView data={pageData} />;
}
