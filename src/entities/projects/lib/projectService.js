import { getOrgRepos, getRepos } from '@/shared/api/data'; // 👈 getRepos 추가
import * as CONSTANTS from '@/shared/constants';
import data from '@/shared/constants/data.json';

export const getProcessedProjects = async (username) => {
  const isJungkyu = username === data.githubUsername;

  let rawRepos = [];

  /**
   * 1. 데이터 소스 분기 패칭
   */
  if (isJungkyu) {
    // ✅ 본인인 경우: 특정 조직(Org)들의 레포지토리를 가져옴
    const orgResults = await Promise.allSettled(CONSTANTS.ORG_NAMES.map((org) => getOrgRepos(org)));
    rawRepos = orgResults.filter((r) => r.status === 'fulfilled').flatMap((r) => r.value);
  } else {
    // ✅ 타인인 경우: 제공해주신 getRepos(username) API 사용
    rawRepos = await getRepos(username);
  }

  /**
   * 2. 공통 데이터 가공 (Mapping & Sorting)
   */
  const allProjects = rawRepos
    .map((repo) => {
      // 본인일 때만 미리 정의된 메타데이터(설명 등)를 매핑
      const meta = isJungkyu ? CONSTANTS.PROJECT_META[repo.name] || {} : {};

      return {
        ...repo,
        ...meta,
        title: meta.title || repo.name,
        githubUrl: repo.html_url,
        liveUrl: repo.homepage || repo.live_url || '',
        displayTitle: meta.title || repo.name,
        displayDescription: meta.description || repo.description || '',
      };
    })
    .sort((a, b) => {
      const aDate = new Date(a.customCreatedAt || a.created_at || 0);
      const bDate = new Date(b.customCreatedAt || b.created_at || 0);
      return bDate - aDate;
    });

  /**
   * 3. 본인 전용 필터링 로직 (isJungkyu가 true일 때만 의미 있음)
   */
  if (isJungkyu) {
    // 고정 프로젝트 (Main Focus)
    const fixedProjects = allProjects.filter(
      (p) =>
        CONSTANTS.MAIN_PROJECT_TITLES.includes(p.name) ||
        CONSTANTS.MAIN_PROJECT_TITLES.includes(p.title),
    );

    // 팀 프로젝트 (Org 및 키워드 기준)
    const teamProjects = allProjects.filter((p) => {
      if (fixedProjects.some((fp) => fp.name === p.name)) return false;
      const isTargetOrg = ['preOnBorading-Idle', 'Dev-FE-3'].includes(p.owner?.login);
      if (p.owner?.login === 'Dev-FE-3') return CONSTANTS.DEV_FE3_PROJECT_NAMES.includes(p.name);
      return isTargetOrg;
    });

    // 개인 프로젝트 (data.json 기준)
    const personalProjects = data.personal || [];

    return {
      fixedProjects,
      teamProjects,
      personalProjects,
      allProjects,
    };
  }

  /**
   * 4. 타인 검색 시 결과 반환
   * 분류 없이 모든 데이터를 allProjects에 담아 보냅니다.
   */
  return {
    fixedProjects: [],
    teamProjects: [],
    personalProjects: [],
    allProjects,
  };
};
