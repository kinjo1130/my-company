'use client';
import { ExternalLink, ArrowRight, Github, Code2, Briefcase, Building2, MapPin } from 'lucide-react';
import { ImageWithFallback } from '@/components/Fallback';
import { useState, useEffect, Suspense } from 'react';
import ProjectDetail from '@/components/ProjectDetail';
import BlogList from '@/components/BlogList';
import BlogDetail from '@/components/BlogDetail';
import NewsList from '@/components/NewsList';
import type { BlogPost } from '@/lib/mdx';
import { Loading } from '@/components/Loading';
import { projects } from '@/data/projects';
import { ROUTES } from '@/lib/routes';
import { SITE, OWNER } from '@/lib/constants';
import Header from '@/components/Header';
import ContactForm from '@/components/ContactForm';

type PageType = 'home' | 'project' | 'blog' | 'blogDetail' | 'news';

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
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.03) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(0, 0, 0, 0.03) 1px, transparent 1px)`,
            backgroundSize: '64px 64px'
          }}></div>
        </div>

        <div className="relative container mx-auto px-6 max-w-4xl text-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 text-sm">
              <Building2 className="w-4 h-4" />
              Web Development Company
            </div>

            <h1 className="text-gray-900 leading-[1.1] text-5xl md:text-6xl font-bold">
              ソフトウェアで<br />
              ビジネスを加速
            </h1>

            <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
              {SITE.NAME}は、お客様のビジネス課題を一緒に伴走しながら、多角的な視点からソフトウェアで解決します。<br />
              要件定義から設計・開発・運用まで一貫してサポートいたします。
            </p>

            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 bg-gray-900 text-white px-8 py-4 hover:bg-gray-800 transition-all"
              >
                お問い合わせ
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#works"
                className="inline-flex items-center justify-center gap-2 border-2 border-gray-900 text-gray-900 px-8 py-4 hover:bg-gray-900 hover:text-white transition-all"
              >
                実績を見る
              </a>
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
          <h2 className="mb-12 text-gray-900">事業者情報</h2>
          
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h3 className="text-gray-900 mb-6">代表について</h3>
              <div className="mb-8">
                <ImageWithFallback
                  src="/images/representative.jpg"
                  alt={`代表 ${OWNER.NAME}`}
                  className="w-full aspect-[4/5] object-cover mb-4"
                />
                <p className="text-gray-900 mb-1">{OWNER.NAME}</p>
                <p className="text-gray-600 text-sm">{OWNER.TITLE}</p>
              </div>
                <button
                  onClick={navigateToCareer}
                  className="inline-flex items-center gap-2 text-gray-900 hover:text-gray-600 border-b border-gray-900 hover:border-gray-600 transition-colors pb-1"
                >
                  代表の詳しい経歴
                  <ArrowRight className="w-4 h-4" />
                </button>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-gray-900 mb-4">経歴</h3>
                <div className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    関西大学 総合情報学部在学中（2021-2025）から、スタートアップを中心に複数の企業でインターンシップや業務委託を経験。
                    フロントエンド開発を中心に、自社サービスや受託開発に携わってきました。
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    個人開発では「rafutabi」「MapMemo」など旅行×テクノロジーのプロダクトを公開。OSSにもコントリビュート経験あり。
                    複数のハッカソンで受賞経験があり、技術力とプロダクト志向を評価されています。
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6 space-y-3">
                <div className="flex items-start gap-3">
                  <Building2 className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-gray-500 text-sm">屋号名</p>
                    <p className="text-gray-900">{SITE.FULL_NAME}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-gray-500 text-sm">所在地</p>
                    <p className="text-gray-900">{SITE.LOCATION}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Code2 className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-gray-500 text-sm">創業</p>
                    <p className="text-gray-900">{SITE.FOUNDED}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-gray-900 mb-4">外部リンク</h3>
                <div className="space-y-2">
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-gray-900 rounded-full mt-2"></div>
                    <a href="https://www.kinjo.me/" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-900 underline">
                      ポートフォリオサイト
                    </a>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-gray-900 rounded-full mt-2"></div>
                    <a href="https://zenn.dev/kinjyo" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-900 underline">
                      Zenn
                    </a>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-gray-900 rounded-full mt-2"></div>
                    <a href="https://qiita.com/abcshotaro616" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-900 underline">
                      Qiita
                    </a>
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
          <h2 className="mb-12 text-gray-900 text-2xl">サービス</h2>
          
          <div className="space-y-16">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <h3 className="text-gray-900 mb-2">Webアプリケーション開発</h3>
                <p className="text-gray-500">Web Development</p>
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
                <h3 className="text-gray-900 mb-2">スマートフォンアプリ開発</h3>
                <p className="text-gray-500">Mobile App Development</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-gray-700 leading-relaxed mb-4">
                  iOS/Androidのネイティブアプリケーション開発を行います。
                  Swift/Kotlin、React Nativeなど、プロジェクトの要件に最適な技術を選定し、
                  高品質なモバイルアプリケーションを提供します。
                </p>
                <p className="text-gray-600">
                  実績：業務支援アプリ、ヘルスケアアプリ、コミュニケーションアプリ など
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
                <h3 className="text-gray-900 mb-2">AI活用開発</h3>
                <p className="text-gray-500">AI Integration</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-gray-700 leading-relaxed mb-4">
                  LLM（大規模言語モデル）を活用したWebアプリケーション開発を支援します。
                  OpenAI、Anthropicなどの各種AI APIの統合、RAGシステムの構築、
                  AIチャットボットやアシスタント機能の実装に対応。業務効率化やユーザー体験向上に貢献します。
                </p>
                <p className="text-gray-600">
                  実績：AIチャットボット開発、文書検索システム（RAG）、画像生成機能統合、業務自動化ツール など
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
          <h2 className="mb-12 text-gray-900 text-2xl">実績</h2>

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
          <h2 className="mb-12 text-gray-900 text-2xl">強み</h2>
          
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

          <div className="grid md:grid-cols-2 gap-12">
            {/* Left: Form */}
            <div>
              <p className="text-gray-700 leading-relaxed mb-8">
                新規開発のご相談、既存システムの改善など、お気軽にお問い合わせください。
                ご相談・お見積もりは無料です。2営業日以内にご返信いたします。
              </p>

              <ContactForm />
            </div>

            {/* Right: Info */}
            <div className="space-y-6">
              <div className="bg-white p-6 border border-gray-200">
                <h3 className="text-gray-900 mb-4">直接メールで問い合わせる</h3>
                <p className="text-gray-600 mb-3">
                  フォームではなく、メールでのお問い合わせをご希望の方はこちらからお願いします。
                </p>
                <a href={`mailto:${SITE.EMAIL}`} className="text-gray-900 hover:text-gray-600 inline-flex items-center gap-2">
                  {SITE.EMAIL}
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              <div className="bg-white p-6 border border-gray-200">
                <h3 className="text-gray-900 mb-4">営業時間</h3>
                <p className="text-gray-700 mb-2">平日 9:00 - 18:00</p>
                <p className="text-gray-600 text-sm">※土日祝日は返信が遅れる場合があります</p>
              </div>

              <div className="bg-white p-6 border border-gray-200">
                <h3 className="text-gray-900 mb-4">料金目安</h3>
                <p className="text-gray-700 mb-1">時間単価：5,000円〜 / 時</p>
                <p className="text-gray-700 mb-2">月額契約：応相談</p>
                <p className="text-gray-600 text-sm">※プロジェクトの内容に応じて柔軟に対応いたします</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500">© 2025 {SITE.NAME}. All rights reserved.</p>
            <nav className="flex gap-6">
              <a href={ROUTES.PRIVACY} className="text-gray-500 hover:text-gray-900 transition-colors text-sm">
                プライバシーポリシー
              </a>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
