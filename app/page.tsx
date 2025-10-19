'use client';
import { Mail, ExternalLink, ArrowRight, Github, Code2, Briefcase, Building2, MapPin } from 'lucide-react';
import { ImageWithFallback } from '@/components/Fallback';
import { useState, useEffect, Suspense } from 'react';
import CareerDetail from '@/components/CareerDetail';
import ProjectDetail from '@/components/ProjectDetail';
import BlogList from '@/components/BlogList';
import BlogDetail from '@/components/BlogDetail';
import NewsList from '@/components/NewsList';
import type { BlogPost } from '@/lib/mdx';
import { Loading } from '@/components/Loading';
import { projects } from '@/data/projects';
import { ROUTES, SECTIONS } from '@/lib/routes';
import Header from '@/components/Header';

type PageType = 'home' | 'career' | 'project' | 'blog' | 'blogDetail' | 'news';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [blogPromise, setBlogPromise] = useState<Promise<BlogPost> | null>(null);

  // URL パスの監視と初期化
  useEffect(() => {
    const handleRouteChange = () => {
      const path = window.location.pathname;

      if (path === ROUTES.CAREER) {
        setCurrentPage('career');
        setSelectedProjectId(null);
        setSelectedBlogId(null);
      } else if (path.startsWith('/project/')) {
        const projectId = path.replace('/project/', '');
        setCurrentPage('project');
        setSelectedProjectId(projectId);
        setSelectedBlogId(null);
      } else if (path === ROUTES.BLOG) {
        setCurrentPage('blog');
        setSelectedProjectId(null);
        setSelectedBlogId(null);
      } else if (path.startsWith('/blog/')) {
        const blogId = path.replace('/blog/', '');
        setCurrentPage('blogDetail');
        setSelectedProjectId(null);
        setSelectedBlogId(blogId);
      } else if (path === ROUTES.NEWS) {
        setCurrentPage('news');
        setSelectedProjectId(null);
        setSelectedBlogId(null);
      } else if (path === ROUTES.HOME) {
        setCurrentPage('home');
        setSelectedProjectId(null);
        setSelectedBlogId(null);
      }
    };

    // 初回ロード時のパス処理
    handleRouteChange();

    // popstate イベント（ブラウザの戻る/進むボタン）のリスナー
    window.addEventListener('popstate', handleRouteChange);

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  // ブログデータの取得
  useEffect(() => {
    if (currentPage === 'blog') {
      fetch('/api/blog')
        .then(res => res.json())
        .then((data: BlogPost[]) => setBlogPosts(data))
        .catch(err => console.error('Failed to fetch blog posts:', err));
    }
  }, [currentPage]);

  // 個別ブログの取得
  useEffect(() => {
    if (currentPage === 'blogDetail' && selectedBlogId) {
      const promise = fetch(`/api/blog/${selectedBlogId}`).then(res => res.json());
      setBlogPromise(promise);
    }
  }, [currentPage, selectedBlogId]);

  const selectedProject = projects.find(p => p.id === selectedProjectId);

  // ページ遷移関数（#なしで遷移）
  const navigate = (path: string) => {
    window.history.pushState(null, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const navigateToCareer = () => {
    navigate(ROUTES.CAREER);
  };

  const navigateToHome = () => {
    navigate(ROUTES.HOME);
  };

  const navigateToProject = (projectId: string) => {
    navigate(ROUTES.PROJECT(projectId));
  };

  const navigateToBlog = () => {
    navigate(ROUTES.BLOG);
  };

  const navigateToBlogDetail = (blogId: string) => {
    navigate(ROUTES.BLOG_DETAIL(blogId));
  };

  const navigateToNews = () => {
    navigate(ROUTES.NEWS);
  };

  // セクションへのスムーズスクロール（#なし）
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // URLから#を除去
      window.history.pushState(null, '', window.location.pathname);
    }
  };

  if (currentPage === 'career') {
    return <CareerDetail onBack={navigateToHome} />;
  }

  if (currentPage === 'project' && selectedProject) {
    return <ProjectDetail project={selectedProject} onBack={navigateToHome} />;
  }

  if (currentPage === 'blog') {
    return <BlogList posts={blogPosts} onSelectBlog={navigateToBlogDetail} onBack={navigateToHome} />;
  }

  if (currentPage === 'blogDetail' && blogPromise) {
    return (
      <Suspense fallback={
       <Loading />
      }>
        <BlogDetail blogPromise={blogPromise} onBack={navigateToBlog} />
      </Suspense>
    );
  }

  if (currentPage === 'news') {
    return <NewsList onBack={navigateToHome} />;
  }

  const clientProjects = projects.filter(p => p.type === 'client');
  const ossProjects = projects.filter(p => p.type === 'oss');
  const personalProjects = projects.filter(p => p.type === 'personal');

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
     <Header />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.03) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(0, 0, 0, 0.03) 1px, transparent 1px)`,
            backgroundSize: '64px 64px'
          }}></div>
        </div>

        <div className="relative container mx-auto px-6 max-w-6xl py-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 text-sm">
                  <Building2 className="w-4 h-4" />
                  Web Development Company
                </div>
                
                <h1 className="text-gray-900 leading-[1.1]">
                  モダンなWeb開発で<br />
                  ビジネスを加速
                </h1>
                
                <p className="text-gray-600 leading-relaxed max-w-xl">
                  Yamada Techは、Webアプリケーション開発を専門とする技術事務所です。
                  スタートアップから中小企業まで、要件定義から設計・開発・運���まで一貫してサポートいたします。
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => scrollToSection(SECTIONS.CONTACT)}
                  className="inline-flex items-center justify-center gap-2 bg-gray-900 text-white px-8 py-4 hover:bg-gray-800 transition-all"
                >
                  お問い合わせ
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => scrollToSection(SECTIONS.WORKS)}
                  className="inline-flex items-center justify-center gap-2 border-2 border-gray-900 text-gray-900 px-8 py-4 hover:bg-gray-900 hover:text-white transition-all"
                >
                  実績を見る
                </button>
              </div>
            </div>

            <div className="relative lg:block hidden">
              <div className="aspect-[4/5] relative">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-50"></div>
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1607434472257-d9f8e57a643d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3b3Jrc3BhY2UlMjBkZXNrfGVufDF8fHx8MTc2MDcxNzEzOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Workspace"
                  className="absolute inset-4 w-[calc(100%-32px)] h-[calc(100%-32px)] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="relative py-20 bg-gray-50 overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.02) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(0, 0, 0, 0.02) 1px, transparent 1px)`,
          backgroundSize: '64px 64px'
        }}></div>
        <div className="relative container mx-auto px-6 max-w-5xl">
          <h2 className="mb-12 text-gray-900">会社概要</h2>
          
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h3 className="text-gray-900 mb-6">代表について</h3>
              <div className="mb-8">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1624467719524-5d0a3da8d06c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMGJ1c2luZXNzJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc2MDcxNjQ5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="代表 山田太郎"
                  className="w-full aspect-[4/5] object-cover mb-4"
                />
                <p className="text-gray-900 mb-1">山田 太郎</p>
                <p className="text-gray-600 text-sm">代表 / フルスタックエンジニア</p>
              </div>
              
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  2015年に大手SIerに入社後、金融システム開発に従事。その後Web系スタートアップに転職し、
                  プロダクト開発の最前線を経験。2020年にYamada Techを創業しました。
                </p>
                <p className="text-gray-700 leading-relaxed">
                  これまでECサイト、SaaS、社内業務システムなど、30以上のプロジェクトに携わってきました。
                  技術選定から設計、実装、運用まで一貫して対応できることが強みです。
                </p>
                
                <button
                  onClick={navigateToCareer}
                  className="inline-flex items-center gap-2 text-gray-900 hover:text-gray-600 border-b border-gray-900 hover:border-gray-600 transition-colors pb-1"
                >
                  代表の��しい経歴
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-gray-900 mb-4">事業内容</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-gray-900 rounded-full mt-2"></div>
                    <p className="text-gray-700">Webアプリケーション開発</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-gray-900 rounded-full mt-2"></div>
                    <p className="text-gray-700">既存システムの改善・機能追加</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-gray-900 rounded-full mt-2"></div>
                    <p className="text-gray-700">技術コンサルティング</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-gray-900 rounded-full mt-2"></div>
                    <p className="text-gray-700">自社プロダクト開発</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-gray-900 mb-4">技術スタック</h3>
                <div className="flex flex-wrap gap-2">
                  {['JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'Python', 'PostgreSQL', 'Supabase', 'AWS', 'Docker', 'Git'].map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-white border border-gray-200 text-gray-700 text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6 space-y-3">
                <div className="flex items-start gap-3">
                  <Building2 className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-gray-500 text-sm">屋号名</p>
                    <p className="text-gray-900">Yamada Tech（山田技術事務所）</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-gray-500 text-sm">所在地</p>
                    <p className="text-gray-900">東京都渋谷区</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Code2 className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-gray-500 text-sm">創業</p>
                    <p className="text-gray-900">2020年4月</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="relative py-20 overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.02) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(0, 0, 0, 0.02) 1px, transparent 1px)`,
          backgroundSize: '64px 64px'
        }}></div>
        <div className="relative container mx-auto px-6 max-w-5xl">
          <h2 className="mb-12 text-gray-900">サービス</h2>
          
          <div className="space-y-16">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <h3 className="text-gray-900 mb-2">Webアプリケーション開発</h3>
                <p className="text-gray-500">New Development</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-gray-700 leading-relaxed mb-4">
                  React / Next.jsを中心としたモダンなフロントエンド開発から、
                  Node.js / Pythonを用いたバックエンド開発まで対応します。
                  要件定義の段階から参画し、技術選定・設計・実装を一貫してサポートします。
                </p>
                <p className="text-gray-600">
                  実績：ECサイト、予約システム、社内管理ツール、マッチングプラットフォーム など
                </p>
              </div>
            </div>

            <div className="h-px bg-gray-200"></div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <h3 className="text-gray-900 mb-2">システム改善・機能追加</h3>
                <p className="text-gray-500">Enhancement</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-gray-700 leading-relaxed mb-4">
                  既存システムの機能追加、パフォーマンス改善、リファクタリングに対応します。
                  レガシーコードの改善やモダンな技術スタックへの移行もサポート可能です。
                  コードレビューやアーキテクチャ設計の相談も承ります。
                </p>
                <p className="text-gray-600">
                  実績：レガシーシステムのReact化、API設計見直し、パフォーマンスチューニング など
                </p>
              </div>
            </div>

            <div className="h-px bg-gray-200"></div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <h3 className="text-gray-900 mb-2">技術コンサルティング</h3>
                <p className="text-gray-500">Consulting</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-gray-700 leading-relaxed mb-4">
                  技術選定のアドバイス、アーキテクチャ設計の支援、コードレビューなど、
                  技術面での課題解決をサポートします。
                  スタートアップの技術顧問や、開発チームのメンタリングも行っています。
                </p>
                <p className="text-gray-600">
                  実績：技術顧問契約、開発チームのメンタリング、採用面接の技術評価 など
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Works */}
      <section id="works" className="relative py-20 bg-gray-50 overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.02) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(0, 0, 0, 0.02) 1px, transparent 1px)`,
          backgroundSize: '64px 64px'
        }}></div>
        <div className="relative container mx-auto px-6 max-w-6xl">
          <h2 className="mb-12 text-gray-900">実績</h2>

          {/* Client Work */}
          <div className="mb-20">
            <div className="flex items-center gap-3 mb-8">
              <Briefcase className="w-6 h-6 text-gray-600" />
              <h3 className="text-gray-900">受託開発</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {clientProjects.map((project) => (
                <button
                  key={project.id}
                  onClick={() => navigateToProject(project.id)}
                  className="bg-white p-6 border border-gray-200 hover:border-gray-400 transition-all text-left group"
                >
                  <div className="mb-4">
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs">受託開発</span>
                  </div>
                  <h4 className="text-gray-900 mb-2 group-hover:text-gray-600 transition-colors">{project.title}</h4>
                  <p className="text-gray-600 text-sm mb-4">{project.summary}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech, i) => (
                      <span key={i} className="text-xs text-gray-500">{tech}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-gray-900 text-sm">
                    詳細を見る
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* OSS */}
          <div className="mb-20">
            <div className="flex items-center gap-3 mb-8">
              <Github className="w-6 h-6 text-gray-600" />
              <h3 className="text-gray-900">OSS貢献</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {ossProjects.map((project) => (
                <button
                  key={project.id}
                  onClick={() => navigateToProject(project.id)}
                  className="bg-white p-6 border border-gray-200 hover:border-gray-400 transition-all text-left group"
                >
                  <div className="mb-4">
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs">OSS</span>
                  </div>
                  <h4 className="text-gray-900 mb-2 group-hover:text-gray-600 transition-colors">{project.title}</h4>
                  <p className="text-gray-600 text-sm mb-4">{project.summary}</p>
                  <div className="flex items-center gap-2 text-gray-900 text-sm">
                    詳細を見る
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Personal */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <Code2 className="w-6 h-6 text-gray-600" />
              <h3 className="text-gray-900">自社プロダクト</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {personalProjects.map((project) => (
                <button
                  key={project.id}
                  onClick={() => navigateToProject(project.id)}
                  className="bg-white p-6 border border-gray-200 hover:border-gray-400 transition-all text-left group"
                >
                  <div className="mb-4">
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs">自社プロダクト</span>
                  </div>
                  <h4 className="text-gray-900 mb-2 group-hover:text-gray-600 transition-colors">{project.title}</h4>
                  <p className="text-gray-600 text-sm mb-4">{project.summary}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech, i) => (
                      <span key={i} className="text-xs text-gray-500">{tech}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-gray-900 text-sm">
                    詳細を見る
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.02) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(0, 0, 0, 0.02) 1px, transparent 1px)`,
          backgroundSize: '64px 64px'
        }}></div>
        <div className="relative container mx-auto px-6 max-w-5xl">
          <h2 className="mb-12 text-gray-900">開発の進め方</h2>
          
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
            <div>
              <h3 className="text-gray-900 mb-3">ビジネスへの理解</h3>
              <p className="text-gray-700 leading-relaxed">
                技術は手段であり、目的はビジネスの成長です。
                要件の背景にあるビジネス課題を理解し、本質的な解決策を提案します。
              </p>
            </div>

            <div>
              <h3 className="text-gray-900 mb-3">透明性のあるコミュニケーション</h3>
              <p className="text-gray-700 leading-relaxed">
                進捗状況を定期的に共有し、問題が発生した場合は早期に報告します。
                営業時間内は24時間以内の返信を心がけています。
              </p>
            </div>

            <div>
              <h3 className="text-gray-900 mb-3">保守性を考慮した設計</h3>
              <p className="text-gray-700 leading-relaxed">
                将来的な機能追加や改修を見据え、拡張性の高い設計を行います。
                適切なドキュメント作成により、引き継ぎもスムーズです。
              </p>
            </div>

            <div>
              <h3 className="text-gray-900 mb-3">継続的な技術学習</h3>
              <p className="text-gray-700 leading-relaxed">
                技術トレンドを常にキャッチアップし、最適な技術選定を提案します。
                新しい技術の導入により、開発効率や品質の向上を実現します。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="relative py-20 bg-gray-50 overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.02) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(0, 0, 0, 0.02) 1px, transparent 1px)`,
          backgroundSize: '64px 64px'
        }}></div>
        <div className="relative container mx-auto px-6 max-w-5xl">
          <h2 className="mb-8 text-gray-900">お問い合わせ</h2>
          
          <div className="max-w-2xl">
            <p className="text-gray-700 leading-relaxed mb-10">
              新規開発のご相談、既存システムの改善など、お気軽にお問い合わせください。
              ご相談・お見積もりは無料です。2営業日以内にご返信いたします。
            </p>

            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <p className="text-gray-600 mb-2">メール</p>
                <a href="mailto:contact@yamada-tech.com" className="text-gray-900 hover:text-gray-600 inline-flex items-center gap-2">
                  contact@yamada-tech.com
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              <a 
                href="mailto:contact@yamada-tech.com" 
                className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 hover:bg-gray-800 transition-colors mt-4"
              >
                <Mail className="w-4 h-4" />
                メールで問い合わせる
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8">
        <div className="container mx-auto px-6 max-w-5xl">
          <p className="text-gray-500">© 2025 Yamada Tech. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
