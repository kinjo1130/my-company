import Header from '@/components/Header';

interface NewsListProps {
  onBack?: () => void;
}

export default function NewsList({ onBack }: NewsListProps) {
  const newsList = [
    {
      id: 'news-1',
      title: "HPリニューアルのお知らせ",
      date: '2024-06-15',
      category: 'お知らせ',
      content:
        'このたび、弊社の公式ホームページをリニューアルしました。最新の情報をより見やすく提供できるようになりましたので、ぜひご覧ください。'
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
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 relative overflow-hidden pt-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.02) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(0, 0, 0, 0.02) 1px, transparent 1px)`,
          backgroundSize: '64px 64px'
        }}></div>
        <div className="relative container mx-auto px-6 max-w-4xl py-20">
          <h1 className="text-4xl font-bold mb-2">お知らせ</h1>
          <p className="text-gray-600 mb-12">最新情報、サービスのお知らせ、イベント情報などをお届けします</p>

          <div className="space-y-8">
            {newsList.map((news) => (
              <div
                key={news.id}
                className="block bg-white p-6 rounded-lg border border-gray-200 hover:border-gray-400 transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className={`px-3 py-1 text-xs rounded ${getCategoryColor(news.category)}`}>
                    {news.category}
                  </span>
                  <span className="text-sm text-gray-500">{news.date}</span>
                </div>

                <h2 className="text-2xl font-bold mb-2 text-gray-900">
                  {news.title}
                </h2>

                <p className="text-gray-600">{news.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
