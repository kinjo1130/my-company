import { notFound } from 'next/navigation';
import { projects } from '@/data/projects';
import ProjectDetail from '@/components/ProjectDetail';
import ProjectMDXDetail from '@/components/ProjectMDXDetail';
import { getProjectMDX, hasProjectMDX } from '@/lib/mdx';

interface PageProps {
  params: {
    id: string;
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const project = projects.find(p => p.id === params.id);

  if (!project) {
    notFound();
  }

  // MDXファイルがあるかチェック
  const hasMDX = await hasProjectMDX(params.id);

  if (hasMDX) {
    const mdxContent = await getProjectMDX(params.id);
    if (mdxContent) {
      return <ProjectMDXDetail project={project} mdxContent={mdxContent} />;
    }
  }

  // MDXがない場合は従来のProjectDetailを表示
  return <ProjectDetail project={project} />;
}

// Generate static paths for all projects
export async function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }));
}