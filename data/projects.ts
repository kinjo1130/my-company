export type ProjectType = 'client' | 'oss' | 'personal';

export interface Project {
  id: string;
  title: string;
  type: ProjectType;
  company?: string;
  period?: string;
  role?: string;
  summary: string;
  description: string;
  details: string[];
  achievements: string[];
  technologies: string[];
  teamSize?: string;
  links?: {
    github?: string;
    demo?: string;
    website?: string;
  };
}

export const projects: Project[] = [
  // 業務委託
  {
    id: 'client-1',
    title: 'ECサイトリニューアル',
    type: 'client',
    company: 'アパレルブランドA社',
    period: '2024年7月 - 2024年12月（5ヶ月）',
    role: 'フロントエンドリード',
    summary: 'Next.js + Headless CMSでのECサイト全面リニューアル',
    description: `老朽化したECサイトを Next.js + Shopify Storefront API で全面リニューアル。ヘッドレスコマースアーキテクチャを採用し、マーケティング施策の柔軟性を向上させました。

パフォーマンス最適化に注力し、画像の最適化、コード分割、SSG/ISRの適切な使い分けにより、ページ速度を40%改善。SEO対策も実施し、自然検索流入が25%増加しました。`,
    details: [
      'Next.jsによるフロントエンド開発全般',
      'Shopify Storefront APIとの連携実装',
      'パフォーマンス最適化（画像最適化、コード分割、SSG/ISR）',
      'SEO対策の実施',
      'レスポンシブデザインの実装',
      'コードレビュー・品質管理'
    ],
    achievements: [
      'ページ表示速度を40%改善（Lighthouse スコア 95点達成）',
      '自然検索流入を25%増加',
      'コンバージョン率を15%向上',
      '予定より2週間早くリリース完了'
    ],
    technologies: ['Next.js', 'TypeScript', 'Shopify API', 'Tailwind CSS', 'Vercel'],
    teamSize: '4名（PM1名、デザイナー1名、エンジニア2名）'
  },
  {
    id: 'client-2',
    title: '予約管理SaaS MVP開発',
    type: 'client',
    company: '美容室向けSaaSスタートアップB社',
    period: '2023年4月 - 現在（継続中）',
    role: 'フルスタックエンジニア',
    summary: '美容室向け予約管理システムのゼロからの構築',
    description: `美容室向けの予約管理システムをゼロから構築。MVPフェーズから参画し、予約カレンダー機能、顧客管理、決済機能を実装しました。

Supabaseを活用することでバックエンド開発を効率化し、3ヶ月でローンチを実現。リリース後も継続的に機能追加や改善を行っています。`,
    details: [
      'Next.jsによるフロントエンド開発',
      'Supabaseを用いたバックエンド設計・実装',
      'Stripe決済機能の実装',
      '予約カレンダーUIの実装',
      'リアルタイム通知機能の実装',
      '運用保守・機能追加対応'
    ],
    achievements: [
      'MVPを3ヶ月でローンチ',
      '導入店舗数50店舗を突破',
      '予約完了率が従来の電話予約比で30%向上',
      'ユーザー満足度4.5/5.0を達成'
    ],
    technologies: ['Next.js', 'TypeScript', 'Supabase', 'Stripe', 'React Query'],
    teamSize: '3名（創業者1名、デザイナー1名、エンジニア1名）'
  },
  {
    id: 'client-3',
    title: '社内業務システム開発',
    type: 'client',
    company: '製造業C社',
    period: '2022年6月 - 2022年12月（6ヶ月）',
    role: 'フルスタックエンジニア',
    summary: 'Excel管理からWebシステムへの移行',
    description: `Excel管理していた在庫・発注業務をWebシステム化するプロジェクト。要件定義から設計、実装、導入研修まで一貫して担当しました。

バーコードスキャナー連携や帳票出力機能も実装し、現場の業務フローに合わせた使いやすいシステムを構築。導入後、業務効率が30%改善されました。`,
    details: [
      '要件定義・ヒアリング',
      'システム設計（DB設計、API設計）',
      'React + Node.jsによる開発',
      'バーコードスキャナー連携実装',
      'PDF帳票出力機能の実装',
      '導入研修・マニュアル作成'
    ],
    achievements: [
      '業務効率を30%改善',
      '在庫管理ミスをゼロに削減',
      '発注業務の所要時間を50%短縮',
      'ユーザー研修を実施し、スムーズな導入を実現'
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker'],
    teamSize: '1名（単独開発）'
  },
  // OSS貢献
  {
    id: 'oss-1',
    title: 'React Hook Form',
    type: 'oss',
    summary: 'TypeScript型定義の改善とバグ修正',
    description: `人気のフォーム管理ライブラリReact Hook Formへの貢献。TypeScriptの型定義の改善と、ネストされたフォームフィールドに関するバグ修正を実施しました。

特に複雑なフォームバリデーションでの型安全性が向上し、開発者体験の改善に貢献しました。`,
    details: [
      'TypeScript型定義の改善（ネストされたフィールド対応）',
      'useFieldArrayのバグ修正',
      'ドキュメントの更新・翻訳',
      'Issue対応とコードレビュー参加'
    ],
    achievements: [
      'マージされたPR: 5件',
      'Star数: 40,000+のプロジェクトへの貢献',
      'TypeScript型安全性の向上'
    ],
    technologies: ['TypeScript', 'React', 'Jest'],
    links: {
      github: 'https://github.com/react-hook-form/react-hook-form'
    }
  },
  {
    id: 'oss-2',
    title: 'Tailwind CSS',
    type: 'oss',
    summary: '日本語ドキュメントの翻訳とプラグイン開発',
    description: `Tailwind CSSの日本語ドキュメント翻訳プロジェクトに参加。また、独自のユーティリティを追加するプラグインも開発・公開しました。

翻訳では技術用語の統一や読みやすさに配慮し、日本のコミュニティへの貢献を実現しました。`,
    details: [
      '公式ドキュメントの日本語翻訳（30ページ以上）',
      'カスタムプラグインの開発・公開',
      '翻訳レビューとメンテナンス',
      'コミュニティでの質問対応'
    ],
    achievements: [
      '翻訳ページ閲覧数: 月間10,000PV以上',
      'カスタムプラグインのダウンロード数: 1,000+',
      '日本語コミュニティの活性化に貢献'
    ],
    technologies: ['CSS', 'PostCSS', 'JavaScript'],
    links: {
      github: 'https://github.com/tailwindlabs/tailwindcss'
    }
  },
  // 個人開発
  {
    id: 'personal-1',
    title: 'TaskFlow',
    type: 'personal',
    summary: 'シンプルなタスク管理アプリ',
    description: `自社プロダクトとして、シンプルで使いやすいタスク管理アプリを開発。既存のタスク管理ツールが複雑すぎると感じ、最小限の機能で使いやすいものを目指しました。

リアルタイム同期、オフライン対応、ドラッグ&ドロップなど、使い勝手にこだわって実装。100名以上のユーザーに利用されています。`,
    details: [
      'Next.js + Supabaseによるフルスタック開発',
      'リアルタイム同期機能の実装',
      'PWA対応（オフライン機能）',
      'ドラッグ&ドロップによる直感的な操作',
      'ダークモード対応',
      'モバイルファーストデザイン'
    ],
    achievements: [
      'ユーザー数: 100+',
      'Product Hunt掲載',
      '平均評価: 4.7/5.0',
      '技術ブログで紹介され1万PV達成'
    ],
    technologies: ['Next.js', 'TypeScript', 'Supabase', 'Tailwind CSS', 'PWA'],
    links: {
      github: 'https://github.com/taroy/taskflow',
      demo: 'https://taskflow-demo.vercel.app'
    }
  },
  {
    id: 'personal-2',
    title: 'DevResources',
    type: 'personal',
    summary: '開発者向けリソース共有プラットフォーム',
    description: `開発者が役立つリソース（記事、ツール、ライブラリなど）を共有・発見できるプラットフォーム。技術カテゴリーごとに整理され、検索やタグ付けも可能です。

コミュニティ機能も実装し、ユーザー同士でおすすめのリソースを共有できる場を提供しています。`,
    details: [
      'Next.js + PostgreSQLによる開発',
      '全文検索機能の実装',
      'ユーザー認証・プロフィール機能',
      'いいね・ブックマーク機能',
      'タグベースの分類システム',
      'レスポンシブデザイン'
    ],
    achievements: [
      '登録リソース数: 500+',
      'ユーザー数: 200+',
      '月間アクティブユーザー: 50+',
      'GitHub Stars: 120+'
    ],
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'NextAuth.js'],
    links: {
      github: 'https://github.com/taroyamada/devresources',
      website: 'https://devresources.io'
    }
  }
];
