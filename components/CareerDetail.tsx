import { OWNER } from '@/lib/constants';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';
import Header from './Header';

export default function CareerDetail() {
  // 年表（Timeline）: 公開情報ベース
  const experiences = [
    {
      period: '2024年3月 - 現在',
      company: 'Helpfeel（Gyazo チーム）',
      role: 'フロントエンドエンジニア（インターン/業務委託）',
      description:
        'Gyazo のフロント改善・機能追加。Ruby on Rails/React を中心に、既存コードの改修、パフォーマンス/UX 改善、新規機能の開発まわりや古い部分の整備などを継続。',
      projects: [
        {
          title: '既存機能の改善・UI最適化',
          client: 'Gyazo',
          role: 'フロントエンド',
          description:
            'UI/UX 課題の抽出と修正、新規機能の開発や保守など実装案の立案から実装まで一貫して担当。',
          tech: ['React', 'Next.js', 'TypeScript'],
          duration: '継続中'
        }
      ]
    },
    {
      period: '2023年1月 - 現在',
      company: '株式会社 ohmygod',
      role: 'プロダクトエンジニア（自社/受託）',
      description:
        'Firebase + Nuxt3を軸に自社/受託プロダクトを開発。「ザ・スタンプラリー」「ザ・クーポン」などの BtoC 施策も担当。',
      projects: [
        {
          title: '自社/受託プロダクト群',
          client: '自社/クライアント',
          role: 'フロントエンド/実装リード',
          description: 'UI 実装、DB設計、API実装まで機能を一気通貫して担当し、短サイクルでの追加開発に貢献。',
          tech: ['Nuxt3', 'Vue', 'Firebase', 'TypeScript'],
          duration: '継続中'
        }
      ]
    },
    {
      period: '2023年10月 - 2023年11月',
      company: 'サイバーエージェント（Tech Job）',
      role: 'フロントエンドエンジニア',
      description:
        'ViewTransition API やアニメーションを活用したインタラクション実装を短期で推進。',
      projects: [
        {
          title: 'SPA 体験の強化',
          client: '社内プロジェクト',
          role: 'フロントエンド',
          description: 'サイト内のパフォーマンスと視覚効果の両立を意識して実装を最適化。',
          tech: ['React', 'TypeScript', 'ViewTransition API'],
          duration: '1ヶ月'
        }
      ]
    },
    {
      period: '2023年10月',
      company: 'BEENOS',
      role: 'インターン（Nuxt2 / PHP）',
      description: '短期インターンで既存プロダクトの改善タスクを担当。',
      projects: [
        {
          title: '既存機能の改修',
          client: '社内サービス',
          role: 'フロントエンド',
          description: 'Nuxt2 のコードリーディングと改修、PHP 連携の動作検証。',
          tech: ['Nuxt2', 'PHP'],
          duration: '2週間'
        }
      ]
    },
    {
      period: '2023年9月 - 現在',
      company: 'Tavern',
      role: 'プロダクトエンジニア(業務委託)',
      description: '自社サービスの開発、受託案件の実装を担当。',
    },
    {
      period: '2023年7月 - 2023年8月',
      company: 'BuySell Technologies',
      role: 'サマーインターン（Go / React+Vite）',
      description: 'Go での API 実装および React+Vite による管理 UI の作成。',
    },
    {
      period: '2022年6月 - 2022年12月',
      company: 'Zipunk',
      role: 'フロントエンドエンジニア（Next.js / Nest.js）',
      description: '自社サービスのQudenの新規機能開発。Next.jsを用いてフロントエンド周りの実装をしていました。',
    },
    {
      period: '2021年11月 - 2022年5月',
      company: 'エクスコア',
      role: 'フロントエンド（Nuxt2 学習資料整備）',
      description: '社内向けの学習資料/テンプレの整備、実装サポート。',
    },
    {
      period: '2021年5月 - 2023年3月',
      company: 'NPO法人 Clipper',
      role: '業務委託（自社サービス開発）',
      description: '学習支援/地域支援系の自社開発に継続参画。',
    }
  ];

  // 個人プロダクト（主なプロジェクト）
  const personalProjects = [
    {
      title: 'MapMemo',
      year: '2025-04-06 公開',
      description:
        'LINE/LIFF 上で Google マップの URL を投げるだけで旅のメモを収集・整理・共有。グループ利用・タグ・検索・地図表示などを提供。',
      tech: ['LIFF', 'Next.js', 'TypeScript', 'Firebase'],
      link: 'https://www.kinjo.me/products/map-memo'
    },
    {
      title: 'rafutabi',
      year: '2024-04-13 公開',
      description:
        '訪問地点のストック/共有/検索に特化した旅行ロガー。位置情報×思い出を軽量 UI で扱える。',
      tech: ['Next.js', 'TypeScript', 'Firebase'],
      link: 'https://www.kinjo.me/products/rafutabi'
    },
    {
      title: '美しい言葉をまとめたサイト',
      year: '2024-04-29 公開',
      description:
        'タイポグラフィ/アニメ表現の実験を兼ねたミニサイト。ブロックエディタ導入や表現検証の題材にも。',
      tech: ['Next.js', 'TypeScript', 'CSS'],
      link: 'https://www.kinjo.me/products/beautiful-words'
    }
  ];

  // 技術要素マップ
  const skills = {
    frontend: [
      { name: 'TypeScript / JavaScript', level: 5, years: 5 },
      { name: 'React', level: 5, years: 4 },
      { name: 'Next.js', level: 5, years: 3 },
      { name: 'Nuxt (v2/v3)', level: 4, years: 3 },
      { name: 'HTML / CSS / Tailwind', level: 5, years: 5 }
    ],
    backend: [
      { name: 'Node.js / Express', level: 4, years: 3 },
      { name: 'Go', level: 3, years: 1 },
      { name: 'Firebase (Auth/Firestore/Storage)', level: 4, years: 3 },
      { name: 'REST API 設計', level: 4, years: 3 }
    ],
    infrastructure: [
      { name: 'Vercel / Netlify', level: 4, years: 3 },
      { name: 'Docker', level: 3, years: 2 },
      { name: 'GitHub Actions (CI/CD)', level: 4, years: 3 }
    ],
    other: [
      { name: 'Git / GitHub', level: 5, years: 5 },
      { name: 'TipTap（WYSIWYG）', level: 3, years: 1 },
      { name: 'アジャイル開発', level: 4, years: 3 }
    ]
  } as const;

  // 受賞
  const awards = [
    'Civictech Challenge Cup u-21 Code for Japan 賞',
    'ハックツハッカソン ツマジロカップ studist 賞',
    'ハックツハッカソン スピノカップ 最優秀賞'
  ];

  // 登壇・コミュニティ
  const talks = [
    {
      title: 'LINE DC Monthly LT「LINEbotと通学の時間」',
      host: 'LINE Developer Community',
      link: 'https://www.youtube.com/watch?v=dummy',
      year: '2023-2024'
    },
    {
      title: 'liff-cli への ngrok SDK 対応コントリビュート紹介',
      host: 'LINE Developer Community',
      link: 'https://www.youtube.com/watch?v=1UslPe4uqwo',
      year: '2024'
    }
  ];

  // 執筆/ブログ
  const writings = [
    { title: 'Zenn（@kinjyo）', link: 'https://zenn.dev/kinjyo' },
    { title: 'Qiita（@abcshotaro616）', link: 'https://qiita.com/abcshotaro616' }
  ];

  // リンク集
  const links = [
    { label: 'Portfolio（kinjo.me）', href: 'https://www.kinjo.me/' },
    { label: 'About', href: 'https://www.kinjo.me/about' },
    { label: 'Work', href: 'https://www.kinjo.me/work' },
    { label: 'Products', href: 'https://www.kinjo.me/products' },
    { label: 'Blog', href: 'https://www.kinjo.me/blog' }
  ];

  const renderSkillLevel = (level: number) => {
    return (
      <div className="flex gap-1" aria-label={`熟練度 ${level}/5`}>
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full ${i <= level ? 'bg-gray-900' : 'bg-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Career Timeline */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-5xl">
          <h2 className="mb-12 text-gray-900">職務経歴（Timeline）</h2>

          <div className="space-y-16">
            {experiences.map((exp, index) => (
              <div key={index} className="relative pl-8 border-l-2 border-gray-200">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-gray-900" />

                <div className="mb-6">
                  <p className="text-gray-500 mb-2">{exp.period}</p>
                  <h3 className="text-gray-900 mb-1">{exp.company}</h3>
                  <p className="text-gray-600 mb-4">{exp.role}</p>
                  <p className="text-gray-700 leading-relaxed">{exp.description}</p>
                </div>

                {/* 主なプロジェクト */}
                {(exp).projects && (
                  <div className="space-y-8 mt-8">
                    <h4 className="text-gray-900">主なプロジェクト</h4>
                    {(exp).projects.map((project, pIndex: number) => (
                      <div key={pIndex} className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 gap-2">
                          <h5 className="text-gray-900">{project.title}</h5>
                          <span className="text-gray-500 text-sm whitespace-nowrap sm:ml-4">{project.duration}</span>
                        </div>
                        <p className="text-gray-600 mb-2">{project.client} / {project.role}</p>
                        <p className="text-gray-700 leading-relaxed mb-4">{project.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((tech: string, tIndex: number) => (
                            <span key={tIndex} className="px-3 py-1 bg-white border border-gray-300 text-gray-700 text-sm rounded-full">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Personal Products */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-5xl">
          <h2 className="mb-12 text-gray-900">個人プロダクト</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {personalProjects.map((p, i) => (
              <div key={i} className="p-6 bg-white border border-gray-200 rounded-2xl">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-gray-900">{p.title}</h3>
                  {p.link && (
                    <Link href={p.link} target="_blank" className="text-gray-500 hover:text-gray-900" aria-label={`${p.title} を開く`}>
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  )}
                </div>
                <p className="text-gray-500 text-sm mb-3">{p.year}</p>
                <p className="text-gray-700 leading-relaxed mb-4">{p.description}</p>
                <div className="flex flex-wrap gap-2">
                  {p.tech.map((t, j) => (
                    <span key={j} className="px-3 py-1 bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-full">{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-5xl">
          <h2 className="mb-12 text-gray-900">技術要素マップ（Skill Map）</h2>

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
              <h3 className="text-gray-900 mb-6">バックエンド / BaaS</h3>
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

      {/* Awards */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-5xl">
          <h2 className="mb-12 text-gray-900">受賞</h2>
          <ul className="space-y-2">
            {awards.map((a, i) => (
              <li key={i} className="text-gray-700 pl-4 relative before:content-['•'] before:absolute before:left-0">{a}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Talks & Community */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-5xl">
          <h2 className="mb-12 text-gray-900">登壇・コミュニティ</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {talks.map((t, i) => (
              <div key={i} className="p-6 bg-white border border-gray-200 rounded-2xl">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-gray-900">{t.title}</h3>
                  {t.link && (
                    <Link href={t.link} target="_blank" className="text-gray-500 hover:text-gray-900" aria-label={`${t.title} を開く`}>
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  )}
                </div>
                <p className="text-gray-600">{t.host}</p>
                <p className="text-gray-500 text-sm">{t.year}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Writings */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-5xl">
          <h2 className="mb-12 text-gray-900">執筆 / ブログ</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {writings.map((w, i) => (
              <Link key={i} href={w.link} target="_blank" className="p-6 bg-white border border-gray-200 rounded-2xl hover:shadow">
                <div className="flex items-center justify-between">
                  <span className="text-gray-900">{w.title}</span>
                  <ExternalLink className="h-4 w-4 text-gray-500" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-5xl">
          <h2 className="mb-12 text-gray-900">学歴</h2>
          <div className="space-y-6">
            <div>
              <p className="text-gray-500 mb-2">2021年4月 - 2025年3月</p>
              <h3 className="text-gray-900 mb-1">関西大学 総合情報学部</h3>
              <p className="text-gray-600">情報分野を中心に、Web/アプリ開発・UI/UX・データ構造/ネットワークなどを学習。個人/インターン開発を通じ実践力を強化。</p>
            </div>
          </div>
        </div>
      </section>

      {/* Links */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-5xl">
          <h2 className="mb-6 text-gray-900">リンク集</h2>
          <div className="flex flex-wrap gap-3">
            {links.map((l, i) => (
              <Link key={i} href={l.href} target="_blank" className="inline-flex items-center gap-1 px-3 py-1 rounded-full border border-gray-300 bg-white text-gray-700 hover:border-gray-400">
                <ExternalLink className="h-3 w-3" />
                <span>{l.label}</span>
              </Link>
            ))}
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
