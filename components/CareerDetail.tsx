import { ArrowLeft } from 'lucide-react';

interface CareerDetailProps {
  onBack: () => void;
}

export default function CareerDetail({ onBack }: CareerDetailProps) {
  const experiences = [
    {
      period: '2020年4月 - 現在',
      company: 'フリーランス',
      role: 'Webエンジニア',
      description: 'スタートアップから中小企業まで、幅広いクライアントのWeb開発プロジェクトに参画。新規開発から既存システムの改善、技術顧問まで多岐にわたる業務を担当。',
      projects: [
        {
          title: 'ECサイトリニューアル（2024年）',
          client: 'アパレルブランドA社',
          role: 'フロントエンドリード',
          description: '老朽化したECサイトを Next.js + Shopify Storefront API で全面リニューアル。ヘッドレスコマースアーキテクチャを採用し、ページ速度を40%改善。SEO対策も実施し、自然検索流入が25%増加。',
          tech: ['Next.js', 'TypeScript', 'Shopify Storefront API', 'Tailwind CSS'],
          duration: '5ヶ月'
        },
        {
          title: '予約管理SaaS開発（2023年）',
          client: '美容室���けSaaSスタートアップB社',
          role: 'フルスタックエンジニア',
          description: 'MVPフェーズから参画し、予約カレンダー機能、顧客管理、決済機能を実装。Supabaseを活用することで開発期間を短縮し、3ヶ月でローンチを実現。リリース後の機能追加も継続的にサポート。',
          tech: ['Next.js', 'Supabase', 'Stripe', 'React Query'],
          duration: '8ヶ月（継続中）'
        },
        {
          title: '社内業務システム開発（2022年）',
          client: '製造業C社',
          role: 'システムアーキテクト・開発リード',
          description: 'Excel管理していた在庫・発注業務をWebシステム化。要件定義から設計、実装、導入研修まで一貫して担当。バーコードスキャナー連携や帳票出力機能も実装し、業務効率を30%改善。',
          tech: ['React', 'Node.js', 'PostgreSQL', 'Docker'],
          duration: '6ヶ月'
        },
        {
          title: 'マッチングプラットフォーム改善（2021年）',
          client: '人材マッチングサービスD社',
          role: 'フロントエンドエンジニア',
          description: '既存システムのパフォーマンス改善とUI/UX刷新を担当。不要な再レンダリングの削減、画像最適化、コード分割などにより、初期表示速度を50%改善。ユーザー離脱率が15%減少。',
          tech: ['React', 'Redux', 'Webpack', 'AWS CloudFront'],
          duration: '4ヶ月'
        }
      ]
    },
    {
      period: '2018年4月 - 2020年3月',
      company: '株式会社テックスタートアップ（仮名）',
      role: 'フルスタックエンジニア',
      description: 'BtoB SaaS プロダクトの開発チームに所属。少数精鋭のチームで、フロントエンド・バックエンド・インフラまで幅広く担当。アジャイル開発を実践し、2週間スプリントで機能をリリース。',
      achievements: [
        '新機能の設計・実装を主導し、ユーザー数を2倍に拡大',
        'CI/CDパイプラインを構築し、デプロイ時間を70%短縮',
        '新卒エンジニア2名のメンター役を担当',
        'コードレビュー文化の定着に貢献'
      ],
      tech: ['React', 'Ruby on Rails', 'PostgreSQL', 'AWS (EC2, RDS, S3)', 'CircleCI', 'Docker']
    },
    {
      period: '2015年4月 - 2018年3月',
      company: 'システムインテグレーター株式会社（仮名）',
      role: 'システムエンジニア',
      description: '大手金融機関向けシステム開発プロジェクトに��画。主に勘定系システムのバッチ処理開発を担当。大規模システムの開発経験を通じて、堅牢性・保守性の重要性を学ぶ。',
      achievements: [
        '月次バッチ処理の性能改善により、処理時間を40%削減',
        '詳細設計書の作成・レビュー担当',
        '結合テスト・総合テストのテストリーダー経験',
        '若手勉強会の企画・運営'
      ],
      tech: ['Java', 'Oracle Database', 'UNIX', 'Shell Script']
    }
  ];

  const skills = {
    frontend: [
      { name: 'JavaScript / TypeScript', level: 5, years: 8 },
      { name: 'React', level: 5, years: 6 },
      { name: 'Next.js', level: 5, years: 3 },
      { name: 'HTML / CSS', level: 5, years: 8 },
      { name: 'Tailwind CSS', level: 4, years: 2 },
      { name: 'Redux / Zustand', level: 4, years: 4 }
    ],
    backend: [
      { name: 'Node.js / Express', level: 4, years: 5 },
      { name: 'Python / FastAPI', level: 3, years: 2 },
      { name: 'Ruby on Rails', level: 3, years: 2 },
      { name: 'PostgreSQL / MySQL', level: 4, years: 6 },
      { name: 'REST API設計', level: 5, years: 6 }
    ],
    infrastructure: [
      { name: 'AWS (EC2, S3, RDS, Lambda)', level: 4, years: 5 },
      { name: 'Docker', level: 4, years: 4 },
      { name: 'Vercel / Netlify', level: 4, years: 3 },
      { name: 'CI/CD (GitHub Actions)', level: 4, years: 3 }
    ],
    other: [
      { name: 'Git / GitHub', level: 5, years: 8 },
      { name: 'Figma', level: 3, years: 3 },
      { name: 'アジャイル開発', level: 4, years: 5 },
      { name: '要件定義・設計', level: 4, years: 6 }
    ]
  };

  const certifications = [
    { name: '応用情報技術者', organization: 'IPA（情報処理推進機構）', year: '2017年' },
    { name: 'AWS Certified Solutions Architect - Associate', organization: 'Amazon Web Services', year: '2021年' }
  ];

  const renderSkillLevel = (level: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full ${
              i <= level ? 'bg-gray-900' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="container mx-auto px-6 py-5 max-w-5xl">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            トップに戻る
          </button>
        </div>
      </header>

      {/* Page Title */}
      <section className="py-16 border-b border-gray-200">
        <div className="container mx-auto px-6 max-w-5xl">
          <h1 className="text-gray-900 mb-4">経歴詳細</h1>
          <p className="text-gray-600">
            これまでの職務経験、プロジェクト実績、保有スキルの詳細をご紹介します
          </p>
        </div>
      </section>

      {/* Career Timeline */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-5xl">
          <h2 className="mb-12 text-gray-900">職務経歴</h2>
          
          <div className="space-y-16">
            {experiences.map((exp, index) => (
              <div key={index} className="relative pl-8 border-l-2 border-gray-200">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-gray-900"></div>
                
                <div className="mb-6">
                  <p className="text-gray-500 mb-2">{exp.period}</p>
                  <h3 className="text-gray-900 mb-1">{exp.company}</h3>
                  <p className="text-gray-600 mb-4">{exp.role}</p>
                  <p className="text-gray-700 leading-relaxed">{exp.description}</p>
                </div>

                {exp.projects && (
                  <div className="space-y-8 mt-8">
                    <h4 className="text-gray-900">主なプロジェクト</h4>
                    {exp.projects.map((project, pIndex) => (
                      <div key={pIndex} className="bg-gray-50 p-6">
                        <div className="flex justify-between items-start mb-3">
                          <h5 className="text-gray-900">{project.title}</h5>
                          <span className="text-gray-500 text-sm whitespace-nowrap ml-4">{project.duration}</span>
                        </div>
                        <p className="text-gray-600 mb-2">{project.client} / {project.role}</p>
                        <p className="text-gray-700 leading-relaxed mb-4">{project.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((tech, tIndex) => (
                            <span key={tIndex} className="px-3 py-1 bg-white border border-gray-300 text-gray-700 text-sm">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {exp.achievements && (
                  <div className="mt-8">
                    <h4 className="text-gray-900 mb-4">主な実績</h4>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, aIndex) => (
                        <li key={aIndex} className="text-gray-700 pl-4 relative before:content-['•'] before:absolute before:left-0">
                          {achievement}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6">
                      <p className="text-gray-600 mb-2">使用技術</p>
                      <div className="flex flex-wrap gap-2">
                        {exp.tech?.map((tech, tIndex) => (
                          <span key={tIndex} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-5xl">
          <h2 className="mb-12 text-gray-900">スキルセット</h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-gray-900 mb-6">フロントエンド</h3>
              <div className="space-y-4">
                {skills.frontend.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-900">{skill.name}</span>
                      <span className="text-gray-500 text-sm">{skill.years}年</span>
                    </div>
                    {renderSkillLevel(skill.level)}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-gray-900 mb-6">バックエンド</h3>
              <div className="space-y-4">
                {skills.backend.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-900">{skill.name}</span>
                      <span className="text-gray-500 text-sm">{skill.years}年</span>
                    </div>
                    {renderSkillLevel(skill.level)}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-gray-900 mb-6">インフラ・DevOps</h3>
              <div className="space-y-4">
                {skills.infrastructure.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-900">{skill.name}</span>
                      <span className="text-gray-500 text-sm">{skill.years}年</span>
                    </div>
                    {renderSkillLevel(skill.level)}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-gray-900 mb-6">その他</h3>
              <div className="space-y-4">
                {skills.other.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-900">{skill.name}</span>
                      <span className="text-gray-500 text-sm">{skill.years}年</span>
                    </div>
                    {renderSkillLevel(skill.level)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-5xl">
          <h2 className="mb-12 text-gray-900">保有資格</h2>
          
          <div className="space-y-6">
            {certifications.map((cert, index) => (
              <div key={index} className="border-b border-gray-200 pb-6">
                <h3 className="text-gray-900 mb-2">{cert.name}</h3>
                <p className="text-gray-600">{cert.organization}</p>
                <p className="text-gray-500">{cert.year}取得</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-5xl">
          <h2 className="mb-12 text-gray-900">学歴</h2>
          
          <div className="space-y-6">
            <div>
              <p className="text-gray-500 mb-2">2011年4月 - 2015年3月</p>
              <h3 className="text-gray-900 mb-1">〇〇大学 工学部 情報工学科</h3>
              <p className="text-gray-600">アルゴリズム、データ構造、ネットワーク、データベースなどの基礎を学習</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8">
        <div className="container mx-auto px-6 max-w-5xl">
          <p className="text-gray-500">© 2025 Taro Yamada. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
