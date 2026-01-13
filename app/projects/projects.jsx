import { Article } from './article';
import { FlipArticle } from './FlipArticle';
import data from '../../data.json';
import { Card } from '../_components/card';
import { getRepos, getPinnedRepos, getVercelProjects } from '../_services/data';

export default async function ProjectsComponent({ username }) {
  // 1. 데이터 병렬 로딩
  const [repositories, pinnedNames, vercelProjects] = await Promise.all([
    getRepos(username),
    getPinnedRepos(username),
    getVercelProjects(),
  ]);

  // 2. Vercel 정보 매핑 로직
  const vercelProjectsDetails = (vercelProjects?.projects || [])
    .filter((project) => repositories.some((repo) => repo.name === project.name))
    .map((project) => ({
      framework: project.framework,
      name: project.name,
      nodeVersion: project.nodeVersion,
      link: project.link,
      description: project.description,
    }));

  repositories.forEach((repo) => {
    const vercelRepo = vercelProjectsDetails.find((v) => v.name === repo.name);
    if (vercelRepo) repo.vercel = vercelRepo;
  });

  // 3. 데이터 분류 (Featured vs General)
  const heroProjects = repositories
    .filter((project) => (pinnedNames || []).includes(project.name))
    .sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0));

  const regularProjects = repositories
    .filter(
      (p) =>
        !p.private &&
        !p.fork &&
        !p.archived &&
        !(pinnedNames || []).includes(p.name) &&
        !data.projects.blacklist.includes(p.name),
    )
    .sort((a, b) => new Date(b.updated_at ?? 0).getTime() - new Date(a.updated_at ?? 0).getTime());

  // [수정] 전체 프로젝트 개수 계산
  const allProjectsCount = heroProjects.length + regularProjects.length;

  // 4. 컴포넌트 결정
  const githubUsername = data.githubUsername || data.projects.githubUsername;
  const ArticleComponent = githubUsername === 'jungkyuYang' ? FlipArticle : Article;

  // 5. 공통 그리드 설정 (사이즈 통일: 3열 고정 및 높이 정렬)
  const gridLayout = 'grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 items-stretch';

  return (
    <div className="w-full space-y-16 pb-16">
      {/* SECTION 1: Featured Projects (Pinned) */}
      {heroProjects.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100 font-display shrink-0">
              Featured Projects
            </h2>
            <div className="w-full h-px bg-zinc-200 dark:bg-zinc-800" />
          </div>

          <div className={gridLayout}>
            {heroProjects.map((project) => (
              <Card key={project.name}>
                <ArticleComponent project={project} />
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* SECTION 2: General Projects */}
      {regularProjects.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100 font-display shrink-0">
              All Projects
            </h2>
            <div className="w-full h-px bg-zinc-200 dark:bg-zinc-800" />
          </div>

          <div className={gridLayout}>
            {regularProjects.map((project) => (
              <Card key={project.name}>
                <ArticleComponent project={project} />
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* 데이터가 아예 없을 경우 예외 처리 */}
      {allProjectsCount === 0 && (
        <div className="text-center py-20">
          <p className="text-zinc-500">No projects found for {username}.</p>
        </div>
      )}
    </div>
  );
}
