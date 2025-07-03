import { Card } from "./card";
import ProjectEmptySection from "./ProjectEmptySection";

export default function ProjectSection({
  title,
  projects,
  ArticleComponent,
  showDivider = false,
  emptyMessage = "프로젝트가 없습니다.",
  className = "",
}) {
  // 3열 그리드 분할
  const chunkSize = Math.ceil(projects.length / 3);
  return (
    <section className={`mb-16 ${className}`}>
      <h2 className="text-xl font-bold mb-4 text-black dark:text-white">
        {title}
      </h2>
      {projects.length === 0 ? (
        <ProjectEmptySection message={emptyMessage} />
      ) : (
        <div className="grid grid-cols-1 gap-4 mx-auto lg:mx-0 md:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div className="grid grid-cols-1 gap-4" key={i}>
              {projects
                .slice(chunkSize * i, chunkSize * (i + 1))
                .map((repo) => (
                  <Card key={repo.id}>
                    <ArticleComponent project={repo} />
                  </Card>
                ))}
            </div>
          ))}
        </div>
      )}
      {showDivider && (
        <div className="my-12 border-t border-zinc-700 opacity-60" />
      )}
    </section>
  );
}
