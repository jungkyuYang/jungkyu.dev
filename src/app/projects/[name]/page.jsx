import { ProjectDetailPage } from '@/views/project-detail/ui/ProjectDetailPage';

export default async function Page({ params }) {
  const { name } = await params;

  return <ProjectDetailPage projectId={name} />;
}
