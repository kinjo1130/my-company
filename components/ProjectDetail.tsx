import { OWNER } from '@/lib/constants';
import { Calendar, Building2, User, Code, Github, ExternalLink } from 'lucide-react';
import Header from './Header';

interface ProjectDetailProps {
  project: {
    id: string;
    title: string;
    type: 'client' | 'contract' | 'oss' | 'personal';
    period?: string;
    company?: string;
    role?: string;
    summary: string;
    description: string;
    details?: string[];
    achievements?: string[];
    technologies: string[];
    teamSize?: string;
    client?: string;
    employmentType?: string;
    duration?: string;
    links?: {
      github?: string;
      demo?: string;
      website?: string;
    };
  };
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
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
                  {project.duration && (
                    <p className="text-gray-600 text-sm mt-1">プロジェクト期間: {project.duration}</p>
                  )}
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
            {project.client && (
              <div className="flex items-start gap-3">
                <Building2 className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-gray-500 text-sm mb-1">クライアント</p>
                  <p className="text-gray-900">{project.client}</p>
                </div>
              </div>
            )}
            {project.teamSize && (
              <div className="flex items-start gap-3">
                <Building2 className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-gray-500 text-sm mb-1">チーム規模</p>
                  <p className="text-gray-900">{project.teamSize}</p>
                </div>
              </div>
            )}
          </div>

          {/* Links */}
          {project.links && (
            <div className="flex flex-wrap gap-4">
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
              )}
              {project.links.demo && (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  デモを見る
                </a>
              )}
              {project.links.website && (
                <a
                  href={project.links.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Webサイト
                </a>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Project Details */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.02) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(0, 0, 0, 0.02) 1px, transparent 1px)`,
          backgroundSize: '64px 64px'
        }}></div>
        <div className="relative container mx-auto px-6 max-w-5xl">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Left Column */}
            <div className="md:col-span-2 space-y-12">
              {/* Description */}
              <div>
                <h2 className="text-gray-900 mb-6">概要</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {project.description}
                </p>
              </div>

              {/* Details */}
              {project.details && project.details.length > 0 && (
                <div>
                  <h2 className="text-gray-900 mb-6">
                    {project.type === 'client'
                      ? '担当業務'
                      : project.type === 'contract'
                      ? '実装内容'
                      : project.type === 'oss'
                      ? '貢献内容'
                      : '実装内容'}
                  </h2>
                  <ul className="space-y-3">
                    {project.details.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700 leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Achievements */}
              {project.achievements && project.achievements.length > 0 && (
                <div>
                  <h2 className="text-gray-900 mb-6">成果・実績</h2>
                  <ul className="space-y-3">
                    {project.achievements.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 bg-gray-900 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700 leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
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
