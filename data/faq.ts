export type FAQCategory = 'service' | 'contract' | 'technical' | 'price' | 'other';

export interface FAQ {
  id: string;
  category: FAQCategory;
  question: string;
  answer: string;
}

export const faqCategories: Record<FAQCategory, string> = {
  service: 'サービスについて',
  contract: '契約について',
  technical: '技術について',
  price: '料金について',
  other: 'その他',
};

export const faqs: FAQ[] = [
  // サービスについて
  {
    id: 'service-1',
    category: 'service',
    question: 'どのような開発を依頼できますか？',
    answer: 'Webアプリケーション、モバイルアプリ、業務システムなど幅広い開発に対応しています。要件定義から設計・開発・運用まで一貫してサポートいたします。また、既存システムの改善や機能追加、技術的なコンサルティングも承っております。',
  },
  {
    id: 'service-2',
    category: 'service',
    question: '対応可能な技術スタックは何ですか？',
    answer: 'フロントエンドはJavaScript, TypeScript, React、Next.js、Vue.js、Nuxt.js、バックエンドはNode.js、Go、Ruby, Python、PHP(Laravel)などに対応しています。データベースはPostgreSQL、MySQL、Firebase、クラウドはAWS、Azure、GCPでの開発実績があります。プロジェクトに最適な技術スタックをご提案します。',
  },
  {
    id: 'service-3',
    category: 'service',
    question: '開発期間はどのくらいかかりますか？',
    answer: 'プロジェクトの規模や要件により異なりますが、小規模なサイトであれば1〜2ヶ月、中規模なアプリケーションで3〜6ヶ月程度が目安です。初回のヒアリング時に詳細なスケジュールをご提示いたします。',
  },
  {
    id: 'service-4',
    category: 'service',
    question: '遠方からの依頼も可能ですか？',
    answer: 'はい、可能です。オンラインでのコミュニケーションを活用し、全国どこからでもご依頼いただけます。必要に応じて対面でのミーティングも調整可能です。',
  },

  // 契約について
  {
    id: 'contract-1',
    category: 'contract',
    question: '相談や見積もりは無料ですか？',
    answer: 'はい、初回のご相談・お見積もりは無料です。プロジェクトの概要をお聞きし、最適なプランをご提案いたします。お気軽にお問い合わせください。',
  },
  {
    id: 'contract-2',
    category: 'contract',
    question: '契約形態はどのようなものがありますか？',
    answer: '主に受託開発契約と準委任契約（業務委託）の2種類があります。プロジェクトの性質や期間に応じて、最適な契約形態をご提案いたします。',
  },
  {
    id: 'contract-3',
    category: 'contract',
    question: '小規模な案件でも依頼できますか？',
    answer: 'はい、規模に関わらずご相談ください。既存サイトの小規模な改修から、新規プロダクトの開発まで幅広く対応しております。',
  },
  {
    id: 'contract-4',
    category: 'contract',
    question: '納品後のサポートはありますか？',
    answer: 'はい、納品後の保守・運用サポートも承っております。バグ修正や機能追加、技術的なサポートなど、継続的なサポートプランをご用意しています。',
  },

  // 技術について
  {
    id: 'technical-1',
    category: 'technical',
    question: 'SEO対策は含まれますか？',
    answer: 'はい、基本的なSEO対策（メタタグ設定、構造化データ、パフォーマンス最適化など）は開発に含まれます。より高度なSEO戦略が必要な場合は別途ご相談ください。',
  },
  {
    id: 'technical-2',
    category: 'technical',
    question: 'レスポンシブデザインに対応していますか？',
    answer: 'はい、すべてのプロジェクトでスマートフォン、タブレット、PCなど様々なデバイスに対応したレスポンシブデザインを実装しています。',
  },
  {
    id: 'technical-3',
    category: 'technical',
    question: 'AI（ChatGPT等）を活用した開発は可能ですか？',
    answer: 'はい、OpenAI、Anthropicなどの各種AI APIの統合、RAGシステムの構築、AIチャットボット開発など、AI活用開発に対応しています。業務効率化やユーザー体験向上にAIを活用した開発実績があります。',
  },
  {
    id: 'technical-4',
    category: 'technical',
    question: 'セキュリティ対策はどのように行われますか？',
    answer: '認証・認可の実装、データの暗号化、脆弱性対策など、業界標準のセキュリティ対策を実施しています。プロジェクトの要件に応じて、より高度なセキュリティ対策もご提案いたします。',
  },

  // 料金について
  {
    id: 'price-1',
    category: 'price',
    question: '料金体系について教えてください',
    answer: 'プロジェクトの規模や期間により異なりますが、時間単価制または固定報酬制でのご契約が可能です。初回のお打ち合わせ時に詳細なお見積もりをご提示いたします。',
  },
  {
    id: 'price-2',
    category: 'price',
    question: '支払い方法は？',
    answer: '銀行振込にてお願いしております。プロジェクトの規模に応じて、着手金・中間金・完了金の分割払いも可能です。',
  },
  {
    id: 'price-3',
    category: 'price',
    question: '追加開発が発生した場合の料金は？',
    answer: '当初の見積もり範囲外の追加開発が発生した場合は、事前にお見積もりをご提示し、ご承認いただいた上で着手いたします。透明性のある料金体系を心がけています。',
  },

  // その他
  {
    id: 'other-1',
    category: 'other',
    question: 'どのような業種のお客様と取引がありますか？',
    answer: 'スタートアップ企業、中小企業、NPO法人など、幅広い業種のお客様と取引実績がございます。業種を問わず、お客様のビジネス課題をソフトウェアで解決することに注力しています。',
  },
  {
    id: 'other-2',
    category: 'other',
    question: '急ぎの案件にも対応できますか？',
    answer: 'スケジュールの状況によりますが、可能な限り対応させていただきます。まずは一度ご相談ください。',
  },
  {
    id: 'other-3',
    category: 'other',
    question: '守秘義務契約（NDA）の締結は可能ですか？',
    answer: 'はい、プロジェクト開始前にNDAの締結が可能です。お客様の機密情報は厳重に管理いたします。',
  },
];
