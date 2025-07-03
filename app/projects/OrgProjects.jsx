import { Card } from "../_components/card";
import { FlipArticle } from "./FlipArticle";
import { getOrgRepos } from "../_service/data";
import ProjectSection from "../_components/ProjectSection";
import * as CONSTANTS from "../_constants";
import ProjectEmptySection from "../_components/ProjectEmptySection";

export default async function OrgProjects() {
  const orgResults = await Promise.allSettled(
    CONSTANTS.ORG_NAMES.map(getOrgRepos)
  );
  const [cyclingHomerunRepos, preOnboardingIdleRepos, devFE3Repos] =
    orgResults.map((result) =>
      result.status === "fulfilled" ? result.value : []
    );

  // Team-4yclingHomerun에서 '4yclinghomerun-client' 레포만 선택
  const cyclingHomerunMainProject = cyclingHomerunRepos
    .filter((repo) => repo.name === "4yclinghomerun-client")
    .map((repo) => ({
      ...repo,
      ...(CONSTANTS.PROJECT_META[repo.name] || {}),
    }));

  // preOnBorading-Idle 조직의 레포 전체 사용 후, 특정 레포 이름 변경
  const preOnboardingIdleProjects = preOnboardingIdleRepos
    .filter((p) => !p.private && !p.fork && !p.archived)
    .sort(
      (a, b) =>
        new Date(b.updated_at ?? Number.POSITIVE_INFINITY).getTime() -
        new Date(a.updated_at ?? Number.POSITIVE_INFINITY).getTime()
    )
    .map((repo) => ({
      ...repo,
      ...(CONSTANTS.PROJECT_META[repo.name] || {}),
    }));

  // Dev-FE-3에서 toy-project1-team2, toy-project2-team4, toy-project3-team1만 사용
  const devFE3FilteredRepos = devFE3Repos.filter((repo) =>
    CONSTANTS.DEV_FE3_PROJECT_NAMES.includes(repo.name)
  );

  // devFE3FilteredRepos의 각 레포에 title과 customDescription 추가
  const devFE3ProjectsWithMeta = devFE3FilteredRepos.map((repo) => ({
    ...repo,
    ...(CONSTANTS.PROJECT_META[repo.name] || {}),
  }));

  // 세 조직의 레포를 합침
  const allProjects = [
    ...cyclingHomerunMainProject,
    ...preOnboardingIdleProjects,
    ...devFE3ProjectsWithMeta,
  ];

  // customCreatedAt 또는 created_at 기준 최신순 정렬
  allProjects.sort((a, b) => {
    const aDateStr = a.customCreatedAt || a.created_at;
    const bDateStr = b.customCreatedAt || b.created_at;
    const aDate = aDateStr ? new Date(aDateStr) : new Date(0);
    const bDate = bDateStr ? new Date(bDateStr) : new Date(0);
    return bDate - aDate; // 최신순
  });

  // 프로젝트 분류
  const fixedProjects = allProjects.filter((p) =>
    CONSTANTS.MAIN_PROJECT_TITLES.includes(p.title)
  );
  const teamProjects = allProjects.filter(
    (p) =>
      !fixedProjects.includes(p) &&
      (p.owner?.login === "preOnBorading-Idle" ||
        p.owner?.login === "Dev-FE-3" ||
        p.title?.includes("투두리스트") ||
        p.title?.includes("무한스크롤") ||
        p.title?.includes("캐싱/디바운스") ||
        p.title?.includes("직원관리") ||
        p.title?.includes("학원운영") ||
        p.title?.includes("영상 공유"))
  );
  const personalProjects = allProjects.filter(
    (p) => !fixedProjects.includes(p) && !teamProjects.includes(p)
  );

  return (
    <div className="p-8">
      <ProjectSection
        title="고정 프로젝트"
        projects={fixedProjects}
        ArticleComponent={FlipArticle}
        showDivider={true}
        emptyMessage="고정 프로젝트를 열심히 준비중입니다."
      />
      <ProjectSection
        title="팀 프로젝트"
        projects={teamProjects}
        ArticleComponent={FlipArticle}
        showDivider={true}
        emptyMessage="팀 프로젝트를 열심히 준비중입니다."
      />
      <ProjectSection
        title="개인 프로젝트"
        projects={personalProjects}
        ArticleComponent={FlipArticle}
        showDivider={false}
        emptyMessage="개인 프로젝트를 열심히 준비중입니다."
      />
      {allProjects.length === 0 && (
        <div className="mt-8 text-zinc-400">
          레포가 없거나, 권한/토큰 문제일 수 있습니다.
        </div>
      )}
    </div>
  );
}
