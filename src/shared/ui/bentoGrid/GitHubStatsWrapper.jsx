import { getRecentUserActivity, getRepos } from '@/shared/api/data';
import { transformGitHubStats } from '@/shared/lib/github';

import { GitHubStats } from './GitHubStats';

export const GitHubStatsWrapper = async ({ username }) => {
  // 1. Raw 데이터 가져오기
  const [events, repos] = await Promise.all([getRecentUserActivity(username), getRepos(username)]);

  // 2. 외부 lib 함수를 이용해 가공 (비즈니스 로직 주입)
  const stats = transformGitHubStats(events, repos);

  // 3. 순수 UI 컴포넌트에 전달
  return <GitHubStats stats={stats} isLoading={false} />;
};
