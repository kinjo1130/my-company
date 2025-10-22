'use client';
import { ExternalLink, ArrowRight, Github, Code2, Briefcase, Building2, MapPin } from 'lucide-react';
import { ImageWithFallback } from '@/components/Fallback';
import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
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
import Footer from '@/components/Footer';

type PageType = 'home' | 'blog' | 'blogDetail' | 'news';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [blogPromise, setBlogPromise] = useState<Promise<BlogPost> | null>(null);

  // URL パスの監視と初期化
  useEffect(() => {
    const handleRouteChange = () => {
      const path = window.location.pathname;

      if (path === ROUTES.CAREER) {
        setSelectedBlogId(null);
      } else if (path === ROUTES.BLOG) {
        setCurrentPage('blog');
        setSelectedBlogId(null);
      } else if (path.startsWith('/blog/')) {
        const blogId = path.replace('/blog/', '');
        setCurrentPage('blogDetail');
        setSelectedBlogId(blogId);
      } else if (path === ROUTES.NEWS) {
        setCurrentPage('news');
        setSelectedBlogId(null);
      } else if (path === ROUTES.HOME) {
        setCurrentPage('home');
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

  const navigateToBlog = () => {
    navigate(ROUTES.BLOG);
  };

  const navigateToBlogDetail = (blogId: string) => {
    navigate(ROUTES.BLOG_DETAIL(blogId));
  };

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

  const contractProjects = projects.filter(p => p.type === 'contract');
  const clientProjects = projects.filter(p => p.type === 'client').sort((a, b) => {
    // 「現在」継続中のプロジェクトを優先
    const aIsCurrent = a.period?.includes('現在') ?? false;
    const bIsCurrent = b.period?.includes('現在') ?? false;

    if (aIsCurrent && !bIsCurrent) return -1;
    if (!aIsCurrent && bIsCurrent) return 1;

    // 両方とも現在、または両方とも過去の場合は開始年月で比較
    const getStartDate = (period?: string) => {
      if (!period) return 0;
      const match = period.match(/(\d{4})年(\d{1,2})月/);
      if (!match) return 0;
      return parseInt(match[1]) * 100 + parseInt(match[2]);
    };
    return getStartDate(b.period) - getStartDate(a.period);
  });
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
                <h3 className="text-gray-900 mb-2">アプリケーション開発</h3>
                <p className="text-gray-500">App Development</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-gray-700 leading-relaxed mb-4">
                  お客様のニーズに合わせたWebアプリケーション、モバイルアプリ、業務システムを開発します。
                  要件定義の段階から参画し、技術選定・設計・実装を一貫してサポートします。
                </p>
                <p className="text-gray-600">
                  実績：イベント登壇の長時間動画のクローズドでの配信システム、など
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
                  実績：静的なサイトからNext.jsへのリプレイス、Reactのversionアップ、API設計見直し、など
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
                  実績：AIチャットボット開発、文書検索システム（RAG）、業務自動化ツール など
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
        <div className="relative container mx-auto px-6 max-w-5xl">
          <h2 className="mb-12 text-gray-900 text-2xl">実績</h2>

          {/* Contract Work */}
          <div className="mb-20">
            <div className="flex items-center gap-3 mb-8">
              <Code2 className="w-6 h-6 text-gray-600" />
              <h3 className="text-gray-900">受託開発</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {contractProjects.map((project) => (
                <Link
                  key={project.id}
                  href={`/project/${project.id}`}
                  className="bg-white p-6 border-2 border-gray-200 rounded-xl hover:border-blue-400 hover:shadow-lg hover:-translate-y-1 transition-all block group"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-gray-900 group-hover:text-blue-600 transition-colors font-medium flex-1">
                      {project.title}
                    </h4>
                  </div>
                  {project.period && (
                    <p className="text-gray-500 text-sm mb-3">{project.period}</p>
                  )}
                  <p className="text-gray-700 leading-relaxed mb-4">{project.summary}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 4).map((tech, i) => (
                      <span key={i} className="px-3 py-1 bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-blue-600 text-sm font-medium">
                    詳細を見る
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Client Work */}
          <div className="mb-20">
            <div className="flex items-center gap-3 mb-8">
              <Briefcase className="w-6 h-6 text-gray-600" />
              <h3 className="text-gray-900">クライアントワーク</h3>
            </div>

            {/* デスクトップ: 表形式 */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full border-collapse bg-white">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="text-left py-3 px-4 text-gray-900 font-medium border-b border-gray-300">Date</th>
                    <th className="text-left py-3 px-4 text-gray-900 font-medium border-b border-gray-300">Company</th>
                    <th className="text-left py-3 px-4 text-gray-900 font-medium border-b border-gray-300">Job</th>
                  </tr>
                </thead>
                <tbody>
                  {clientProjects.map((project) => (
                    <tr
                      key={project.id}
                      onClick={() => window.location.href = `/project/${project.id}`}
                      className="border-b border-gray-200 hover:bg-gray-100 transition-all cursor-pointer group"
                    >
                      <td className="py-4 px-4 text-gray-700 align-top">{project.period}</td>
                      <td className="py-4 px-4 align-top">
                        <span className="text-blue-600 underline decoration-1 underline-offset-2">
                          {project.company}
                        </span>
                      </td>
                      <td className="py-4 px-4 align-top">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="text-gray-900 mb-1">
                              {project.role}
                              {project.employmentType && `（${project.employmentType}）`}
                            </div>
                            <div className="text-gray-600 text-sm leading-relaxed">{project.summary}</div>
                          </div>
                          <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-900 group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* モバイル: カード形式 */}
            <div className="md:hidden space-y-4">
              {clientProjects.map((project) => (
                <Link
                  key={project.id}
                  href={`/project/${project.id}`}
                  className="bg-white p-4 border-2 border-gray-200 rounded-lg hover:border-gray-400 hover:shadow-md hover:-translate-y-0.5 transition-all block group"
                >
                  <p className="text-gray-500 text-sm mb-2">{project.period}</p>
                  <h4 className="text-gray-900 mb-2 flex items-center justify-between">
                    <span>{project.company}</span>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-900 group-hover:translate-x-1 transition-all" />
                  </h4>
                  <p className="text-gray-700 mb-2">
                    {project.role}
                    {project.employmentType && `（${project.employmentType}）`}
                  </p>
                  <p className="text-gray-600 text-sm">{project.summary}</p>
                </Link>
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
                <Link
                  key={project.id}
                  href={`/project/${project.id}`}
                  className="bg-white p-6 border-2 border-gray-200 rounded-xl hover:border-blue-400 hover:shadow-lg hover:-translate-y-1 transition-all block group"
                >
                  <h4 className="text-gray-900 mb-2 group-hover:text-blue-600 transition-colors font-medium">
                    {project.title}
                  </h4>
                  {project.period && (
                    <p className="text-gray-500 text-sm mb-3">{project.period}</p>
                  )}
                  <p className="text-gray-700 leading-relaxed mb-4">{project.summary}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="px-3 py-1 bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-blue-600 text-sm font-medium">
                    詳細を見る
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </div>
                </Link>
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
                <Link
                  key={project.id}
                  href={`/project/${project.id}`}
                  className="bg-white p-6 border-2 border-gray-200 rounded-xl hover:border-blue-400 hover:shadow-lg hover:-translate-y-1 transition-all block group"
                >
                  <h4 className="text-gray-900 mb-2 group-hover:text-blue-600 transition-colors font-medium">
                    {project.title}
                  </h4>
                  {project.period && (
                    <p className="text-gray-500 text-sm mb-3">{project.period}</p>
                  )}
                  <p className="text-gray-700 leading-relaxed mb-4">{project.summary}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="px-3 py-1 bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-blue-600 text-sm font-medium">
                    詳細を見る
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </div>
                </Link>
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
      <Footer />
    </div>
  );
}
