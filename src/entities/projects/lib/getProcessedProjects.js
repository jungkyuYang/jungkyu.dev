import { getOrgRepos } from '@/shared/api/data';
import * as CONSTANTS from '@/shared/constants';

export const getProcessedProjects = async () => {
  // 1. 데이터 패칭 (Server Component 환경 권장)
  const orgResults = await Promise.allSettled(CONSTANTS.ORG_NAMES.map(getOrgRepos));

  const [cyclingHomerunRepos, preOnboardingIdleRepos, devFE3Repos] = orgResults.map((result) =>
    result.status === 'fulfilled' ? result.value : [],
  );

  // 2. 각 조직별 특수 필터링 및 메타데이터 결합
  const cyclingHomerunMainProject = cyclingHomerunRepos
    .filter((repo) => repo.name === '4yclinghomerun-client')
    .map((repo) => ({
      ...repo,
      ...(CONSTANTS.PROJECT_META[repo.name] || {}),
    }));

  const preOnboardingIdleProjects = preOnboardingIdleRepos
    .filter((p) => !p.private && !p.fork && !p.archived)
    .map((repo) => ({
      ...repo,
      ...(CONSTANTS.PROJECT_META[repo.name] || {}),
    }));

  const devFE3ProjectsWithMeta = devFE3Repos
    .filter((repo) => CONSTANTS.DEV_FE3_PROJECT_NAMES.includes(repo.name))
    .map((repo) => ({
      ...repo,
      ...(CONSTANTS.PROJECT_META[repo.name] || {}),
    }));

  // 3. 모든 프로젝트 통합 및 정렬
  const allProjects = [
    ...cyclingHomerunMainProject,
    ...preOnboardingIdleProjects,
    ...devFE3ProjectsWithMeta,
  ];

  // 최신순 정렬 (customCreatedAt 또는 created_at 기준)
  allProjects.sort((a, b) => {
    const aDate = new Date(a.customCreatedAt || a.created_at || 0);
    const bDate = new Date(b.customCreatedAt || b.created_at || 0);
    return bDate.getTime() - aDate.getTime();
  });

  // 4. UI(ProjectList)에서 바로 사용하기 좋게 분류 (Output)
  const fixedProjects = allProjects.filter((p) => CONSTANTS.MAIN_PROJECT_TITLES.includes(p.title));

  const teamProjects = allProjects.filter(
    (p) =>
      !fixedProjects.includes(p) &&
      (p.owner?.login === 'preOnBorading-Idle' ||
        p.owner?.login === 'Dev-FE-3' ||
        /투두리스트|무한스크롤|캐싱|직원관리|학원운영|영상 공유/.test(p.title || '')),
  );

  const personalProjects = allProjects.filter(
    (p) => !fixedProjects.includes(p) && !teamProjects.includes(p),
  );

  // 이 객체가 OriginalProjectsContext에 담기게 됩니다.
  return {
    fixedProjects,
    teamProjects,
    personalProjects,
    allProjects,
  };
};
