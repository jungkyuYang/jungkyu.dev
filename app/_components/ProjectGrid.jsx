import { Card } from "./card";
import chunk from "lodash/chunk";

export default function ProjectGrid({ projects, ArticleComponent }) {
  const chunkSize = Math.ceil(projects.length / 3);
  return (
    <div className="grid grid-cols-1 gap-4 mx-auto lg:mx-0 md:grid-cols-3">
      {[0, 1, 2].map((i) => (
        <div className="grid grid-cols-1 gap-4" key={i}>
          {chunk(projects, chunkSize)[i]?.map((repo) => (
            <Card key={repo.id}>
              <ArticleComponent project={repo} />
            </Card>
          ))}
        </div>
      ))}
    </div>
  );
}
