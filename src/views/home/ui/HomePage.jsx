// src/pages/home/ui/HomePage.jsx
import { getUser } from '@/shared/api/data';
import data from '@/shared/constants/data.json';

import { HomeView } from './HomeView';

export async function HomePage({ customUsername }) {
  const username = customUsername || process.env.GITHUB_USERNAME || data.githubUsername;
  const response = await getUser(username);

  // 💡 가공하지 않고 response(GitHub 데이터)를 그대로 넘깁니다.
  return <HomeView user={response} projects={data.projects} username={username} />;
}
