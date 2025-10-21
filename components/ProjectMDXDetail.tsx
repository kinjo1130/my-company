import { OWNER } from '@/lib/constants';
import { ArrowLeft, Calendar, User, Code } from 'lucide-react';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';
import { ProjectMDX } from '@/lib/mdx';
import Header from './Header';

interface ProjectMDXDetailProps {
  project: {
    id: string;
    title: string;
    type: 'client' | 'contract' | 'oss' | 'personal';
    period?: string;
    company?: string;
    role?: string;
    summary: string;
    technologies: string[];
    employmentType?: string;
  };
  mdxContent: ProjectMDX;
}

export default function ProjectMDXDetail({ project, mdxContent }: ProjectMDXDetailProps) {
  const getTypeLabel = () => {
    if (project.type === 'client') {
      return project.employmentType || 'クライアントワーク';
    }
    switch (project.type) {
      case 'contract': return '受託開発';
      case 'oss': return 'OSS貢献';
      case 'personal': return '自社プロダクト';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-white mt-20">
      {/* Header */}
       <Header />

      {/* Project Header */}
      <section className="relative py-16 border-b border-gray-200 overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.02) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(0, 0, 0, 0.02) 1px, transparent 1px)`,
          backgroundSize: '64px 64px'
        }}></div>
        <div className="relative container mx-auto px-6 max-w-5xl">
          <div className="mb-6">
            <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm">{getTypeLabel()}</span>
          </div>
          <h1 className="text-gray-900 mb-4">{project.title}</h1>
          {project.company && <p className="text-gray-500 mb-4">{project.company}</p>}
          <p className="text-gray-600 text-lg mb-8">{project.summary}</p>

          <div className="flex flex-wrap gap-6 mb-8">
            {project.period && (
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-gray-500 text-sm mb-1">期間</p>
                  <p className="text-gray-900">{project.period}</p>
                </div>
              </div>
            )}
            {project.role && (
              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-gray-500 text-sm mb-1">役割</p>
                  <p className="text-gray-900">
                    {project.role}
                    {project.employmentType && `（${project.employmentType}）`}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Project Details with MDX Content */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.02) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(0, 0, 0, 0.02) 1px, transparent 1px)`,
          backgroundSize: '64px 64px'
        }}></div>
        <div className="relative container mx-auto px-6 max-w-5xl">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Left Column - MDX Content */}
            <div className="md:col-span-2">
              <article className="prose prose-lg max-w-none">
                <MDXRemote
                  source={mdxContent.content}
                  options={{
                    mdxOptions: {
                      remarkPlugins: [remarkGfm],
                      rehypePlugins: [rehypeHighlight],
                    },
                  }}
                />
              </article>
            </div>

            {/* Right Column - Tech Stack */}
            <div>
              <div className="bg-gray-50 p-6 border border-gray-200 sticky top-24">
                <div className="flex items-center gap-2 mb-4">
                  <Code className="w-5 h-5 text-gray-600" />
                  <h3 className="text-gray-900">使用技術</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-white border border-gray-300 text-gray-700 text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8">
        <div className="container mx-auto px-6 max-w-5xl">
          <p className="text-gray-500">© 2025 {OWNER.NAME_EN}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
