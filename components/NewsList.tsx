import { Calendar, Bell, ArrowLeft } from 'lucide-react';

interface NewsListProps {
  onBack: () => void;
}

export default function NewsList({ onBack }: NewsListProps) {
  const newsList = [
    {
      id: 'news-1',
      date: '2024年12月20日',
      category: 'お知らせ',
      title: '年末年始の営業について',
      content: '誠に勝手ながら、2024年12月29日（金）～2025年1月5日（日）まで年末年始休業とさせていただきます。休業期間中にいただいたお問い合わせは、1月6日（月）以降、順次対応させていただきます。'
    },
    {
      id: 'news-2',
      date: '2024年12月1日',
      category: 'サービス',
      title: '新サービス「技術顧問プラン」の提供開始',
      content: 'スタートアップ企業様向けに、月額制の技術顧問サービスの提供を開始しました。技術選定、アーキテクチャ設計、コードレビューなど、開発フェーズに応じた柔軟なサポートを提供いたします。詳細はお問い合わせください。'
    },
    {
      id: 'news-3',
      date: '2024年11月15日',
      category: '実績',
      title: 'ECサイトリニューアルプロジェクト完了のお知らせ',
      content: 'アパレルブランドA社様のECサイトリニューアルプロジェクトが無事完了いたしました。Next.js + Shopify Storefront APIを採用し、パフォーマンスとユーザー体験の大幅な改善を実現しました。'
    },
    {
      id: 'news-4',
      date: '2024年10月20日',
      category: 'イベント',
      title: '技術勉強会「Next.js 14実践入門」開催のお知らせ',
      content: '11月10日（金）19:00より、オンライン技術勉強会を開催します。Next.js 14のApp Routerを使った実践的な開発手法について解説します。参加費無料、事前登録制です。'
    },
    {
      id: 'news-5',
      date: '2024年10月1日',
      category: 'お知らせ',
      title: 'コーポレートサイトをリニューアルしました',
      content: 'より見やすく、わかりやすいサイトを目指してリニューアルいたしました。サービス内容や実績をより詳しくご覧いただけるようになりました。'
    },
    {
      id: 'news-6',
      date: '2024年9月15日',
      category: '実績',
      title: '自社プロダクト「TaskFlow」をリリース',
      content: 'タスク管理アプリ「TaskFlow」の一般公開を開始しました。シンプルで使いやすいインターフェースと、チーム向けの協働機能が特徴です。'
    },
    {
      id: 'news-7',
      date: '2024年8月1日',
      category: 'お知らせ',
      title: '夏季休業のお知らせ',
      content: '8月13日（火）～8月16日（金）まで夏季休業とさせていただきます。休業期間中のお問い合わせは、8月19日（月）以降に順次対応いたします。'
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'お知らせ':
        return 'bg-blue-100 text-blue-700';
      case 'サービス':
        return 'bg-green-100 text-green-700';
      case '実績':
        return 'bg-purple-100 text-purple-700';
      case 'イベント':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="container mx-auto px-6 py-5 max-w-6xl">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            ホームに戻る
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative py-20 bg-gray-50 overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.02) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(0, 0, 0, 0.02) 1px, transparent 1px)`,
          backgroundSize: '64px 64px'
        }}></div>
        <div className="relative container mx-auto px-6 max-w-6xl">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <Bell className="w-8 h-8 text-gray-900" />
              <h1 className="text-gray-900">お知らせ</h1>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Yamada Techの最新情報、サービスのお知らせ、イベント情報などをお届けします。
            </p>
          </div>
        </div>
      </section>

      {/* News List */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="max-w-4xl mx-auto space-y-6">
            {newsList.map((news) => (
              <div
                key={news.id}
                className="bg-white border border-gray-200 hover:border-gray-300 p-8 transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>{news.date}</span>
                  </div>
                  <span className={`px-3 py-1 text-xs w-fit ${getCategoryColor(news.category)}`}>
                    {news.category}
                  </span>
                </div>

                <h2 className="text-gray-900 mb-3">
                  {news.title}
                </h2>

                <p className="text-gray-600 leading-relaxed">
                  {news.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
