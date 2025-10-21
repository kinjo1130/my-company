export type ProjectType = 'client' | 'contract' | 'oss' | 'personal';

export interface Project {
  id: string;
  title: string;
  type: ProjectType;
  company?: string;
  period?: string;
  role?: string;
  summary: string;
  description: string;
  details?: string[];
  achievements?: string[];
  technologies: string[];
  teamSize?: string;
  client?: string; // プロジェクトのクライアント名
  employmentType?: string; // "業務委託" | "インターン" | "受託開発"
  duration?: string; // プロジェクト単体の期間
  links?: {
    github?: string;
    demo?: string;
    website?: string;
  };
}

export const projects: Project[] = [
  // 受託開発
  {
    id: 'contract-1',
    title: 'イベント登壇動画配信システム',
    type: 'contract',
    period: '2024年1月 - 2024年3月',
    role: 'フロントエンドエンジニア',
    summary: '長時間動画のクローズド配信システムの開発',
    description: 'イベント登壇の長時間動画をクローズド環境で配信するシステムを開発。視聴者の認証、動画プレイヤーのカスタマイズ、視聴ログの記録などを実装。',
    details: [
      'Next.jsによるフロントエンド開発',
      '認証機能の実装（メール認証）',
      'カスタム動画プレイヤーの実装',
      '視聴ログ記録機能の実装',
      'レスポンシブデザイン対応'
    ],
    achievements: [
      '安定した動画配信を実現',
      '視聴者満足度が高い評価を獲得',
      '予定通りのスケジュールで納品'
    ],
    technologies: ['Next.js', 'TypeScript', 'Vercel', 'Video.js']
  },
  {
    id: 'contract-2',
    title: 'コーポレートサイトリニューアル',
    type: 'contract',
    period: '2023年9月 - 2023年12月',
    role: 'フロントエンドエンジニア',
    summary: '静的サイトからNext.jsへのリプレイス',
    description: '老朽化した静的HTMLサイトをNext.jsでリニューアル。モダンなUIデザイン、SEO最適化、管理画面の構築を実施。',
    details: [
      '静的サイトからNext.jsへの移行',
      'ヘッドレスCMSの導入（Contentful）',
      'SEO対策の実施',
      'パフォーマンス最適化',
      '問い合わせフォームの実装'
    ],
    achievements: [
      'ページ表示速度を60%改善',
      'SEOスコアが大幅に向上',
      'コンテンツ更新の工数を70%削減'
    ],
    technologies: ['Next.js', 'TypeScript', 'Contentful', 'Tailwind CSS', 'Vercel']
  },
  {
    id: 'contract-3',
    title: 'Reactアプリケーション保守・改善',
    type: 'contract',
    period: '2023年5月 - 2023年8月',
    role: 'フロントエンドエンジニア',
    summary: 'Reactのバージョンアップとパフォーマンス改善',
    description: '既存のReactアプリケーションのバージョンアップ、パフォーマンス改善、API設計の見直しを実施。',
    details: [
      'React v16からv18へのアップグレード',
      'パフォーマンスボトルネックの特定と改善',
      'API設計の見直しと最適化',
      'コンポーネントのリファクタリング',
      'テストコードの追加'
    ],
    achievements: [
      'レンダリング速度を40%改善',
      'バンドルサイズを25%削減',
      'API呼び出し回数を50%削減'
    ],
    technologies: ['React', 'TypeScript', 'React Query', 'Vite']
  },

  // 個人プロダクト
  {
    id: 'personal-1',
    title: 'MapMemo',
    type: 'personal',
    period: '2025年4月',
    summary: 'LINE/LIFF上で旅のメモを管理',
    description: 'LINE/LIFF上でGoogleマップのURLを投げるだけで旅のメモを収集・整理・共有。グループ利用・タグ・検索・地図表示などを提供。',
    technologies: ['LIFF', 'Next.js', 'TypeScript', 'Firebase'],
    links: {
      website: 'https://www.kinjo.me/products/map-memo'
    }
  },
  {
    id: 'personal-2',
    title: '美しい言葉をまとめたサイト',
    type: 'personal',
    period: '2024年4月',
    summary: 'タイポグラフィ/アニメ表現の実験サイト',
    description: 'タイポグラフィ/アニメ表現の実験を兼ねたミニサイト。ブロックエディタ導入や表現検証の題材にも。',
    technologies: ['Next.js', 'TypeScript', 'CSS'],
    links: {
      website: 'https://www.kinjo.me/products/beautiful-words'
    }
  },

  // クライアントワーク（業務委託・インターン）
  {
    id: 'client-1',
    title: '既存機能の改善・UI最適化',
    type: 'client',
    company: 'Helpfeel（Gyazo チーム）',
    period: '2024年3月 - 現在',
    role: 'フロントエンドエンジニア',
    employmentType: '業務委託',
    client: 'Gyazo',
    summary: 'GyazoのUI/UX改善とパフォーマンス最適化',
    description: 'UI/UX課題の抽出と修正、アクセシビリティ/描画最適化、ViewTransition API/アニメーションの検証などを通じて体験を磨き込み。',
    duration: '継続中',
    technologies: ['React', 'Next.js', 'TypeScript']
  },
  {
    id: 'client-2',
    title: 'プロダクトのアニメーションを追加することでのUX体験の強化',
    type: 'client',
    company: 'サイバーエージェント',
    period: '2023年10月 - 2023年11月',
    role: 'フロントエンドエンジニア',
    employmentType: 'インターン',
    client: '社内プロジェクト',
    summary: 'ViewTransition APIを活用したインタラクション実装',
    description: 'パフォーマンスと視覚効果の両立を意識して実装を最適化。',
    duration: '1ヶ月',
    technologies: ['React', 'TypeScript', 'ViewTransition API']
  },
  {
    id: 'client-3',
    title: '既存機能の改修',
    type: 'client',
    company: 'BEENOS',
    period: '2023年10月',
    role: 'フロントエンドエンジニア',
    employmentType: 'インターン',
    client: '社内サービス',
    summary: 'Nuxt2のコードリーディングと改修',
    description: 'Nuxt2のコードリーディングと改修、PHP連携の動作検証。',
    duration: '2週間',
    technologies: ['Nuxt2', 'PHP']
  },
  {
    id: 'client-4',
    title: '自社プロダクトと受託案件の実装',
    type: 'client',
    company: 'Tavern',
    period: '2023年9月 - 現在',
    role: 'フロントエンドエンジニア',
    employmentType: '業務委託',
    summary: '開発AIの開発と受託案件のフロントエンドの実装',
    description: '開発AIの開発と受託案件のフロントエンドの実装、運用改善を担当。',
    technologies: ['React', 'TypeScript', 'Next.js','DDD']
  },
  {
    id: 'client-5',
    title: 'API実装と管理UI開発',
    type: 'client',
    company: 'BuySell Technologies',
    period: '2023年7月 - 2023年8月',
    role: 'フルスタックエンジニア',
    employmentType: 'インターン',
    summary: 'GoでのAPI実装とReact+Viteによる管理画面のUI作成',
    description: 'GoでのAPI実装およびReact+Viteによる管理画面のUI作成。',
    duration: '2ヶ月',
    technologies: ['Go', 'React', 'Vite', 'TypeScript']
  },
  {
    id: 'client-6',
    title: '自社/受託プロダクト群',
    type: 'client',
    company: '株式会社 ohmygod',
    period: '2023年1月 - 現在',
    role: 'プロダクトエンジニア',
    employmentType: '業務委託',
    client: '自社/クライアント',
    summary: 'Firebase + Nuxt3/Next.jsによる自社/受託開発',
    description: '受託案件の開発や自社プロダクトの「ザ・スタンプラリー」「ザ・クーポン」などのBtoCプロダクトを担当。',
    duration: '継続中',
    technologies: ['Nuxt3', 'Vue', 'Firebase', 'TypeScript','Mapbox']
  },
  {
    id: 'client-7',
    title: 'Quden開発',
    type: 'client',
    company: 'Zipunk',
    period: '2022年6月 - 2022年12月',
    role: 'フルスタックエンジニア',
    employmentType: '業務委託',
    summary: 'Next.js/Nest.jsによる新規開発',
    description: 'Qudenの新規開発。Next.js/Nest.jsを用いてフロント〜APIを一貫して担当。',
    technologies: ['Next.js', 'Nest.js', 'TypeScript']
  },
  {
    id: 'client-8',
    title: 'Nuxt2学習資料整備',
    type: 'client',
    company: 'エクスコア',
    period: '2021年11月 - 2022年5月',
    role: 'フロントエンドエンジニア',
    employmentType: '業務委託',
    summary: '社内向けの学習資料/テンプレの整備',
    description: '社内向けの学習資料/テンプレの整備、実装サポート。',
    technologies: ['Nuxt2', 'Vue', 'TypeScript']
  },
  {
    id: 'client-9',
    title: '自社サービス開発',
    type: 'client',
    company: 'NPO法人 Clipper',
    period: '2021年5月 - 現在',
    role: 'フロントエンドエンジニア',
    employmentType: '業務委託',
    summary: '学習支援/地域支援系の自社開発',
    description: '学習支援/地域支援系の自社開発に継続参画。',
    technologies: ['React', 'TypeScript', 'Firebase']
  },

  // OSS貢献
  {
    id: 'oss-1',
    title: 'liff-cli',
    type: 'oss',
    period: '2024年',
    summary: 'ngrok SDK対応の実装',
    description: 'liff-cliへのngrok SDK対応コントリビュート。LINE Developer Communityでの登壇も実施。',
    technologies: ['TypeScript', 'Node.js'],
    links: {
      github: 'https://github.com/line/liff-cli/pull/17'
    }
  }
];
