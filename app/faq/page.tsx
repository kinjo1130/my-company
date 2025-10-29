'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Header from '@/components/Header';
import { faqs, faqCategories, type FAQCategory } from '@/data/faq';
import { SITE } from '@/lib/constants';

export default function FAQPage() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<FAQCategory | 'all'>('all');

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const filteredFaqs = selectedCategory === 'all'
    ? faqs
    : faqs.filter(faq => faq.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="relative min-h-[40vh] flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.03) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(0, 0, 0, 0.03) 1px, transparent 1px)`,
            backgroundSize: '64px 64px'
          }}></div>
        </div>

        <div className="relative container mx-auto px-6 max-w-4xl text-center">
          <h1 className="text-gray-900 leading-[1.1] text-4xl md:text-5xl font-bold mb-4">
            よくあるお問い合わせ
          </h1>
          <p className="text-gray-600 text-lg">
            {SITE.NAME}へのよくある質問とその回答をまとめました
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.02) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(0, 0, 0, 0.02) 1px, transparent 1px)`,
          backgroundSize: '64px 64px'
        }}></div>

        <div className="relative container mx-auto px-6 max-w-4xl">
          {/* Category Filter */}
          <div className="mb-12">
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 text-sm transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                すべて
              </button>
              {(Object.entries(faqCategories) as [FAQCategory, string][]).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(key)}
                  className={`px-4 py-2 text-sm transition-colors ${
                    selectedCategory === key
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* FAQ List */}
          <div className="space-y-4">
            {filteredFaqs.map((faq) => (
              <div
                key={faq.id}
                className="bg-white border-2 border-gray-200 overflow-hidden transition-all hover:border-gray-300"
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full px-6 py-5 flex items-start justify-between gap-4 text-left"
                >
                  <div className="flex-1">
                    <div className="text-xs text-gray-500 mb-2">
                      {faqCategories[faq.category]}
                    </div>
                    <h3 className="text-gray-900 font-medium leading-relaxed">
                      {faq.question}
                    </h3>
                  </div>
                  <div className="flex-shrink-0 mt-1">
                    {openId === faq.id ? (
                      <ChevronUp className="w-5 h-5 text-gray-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-600" />
                    )}
                  </div>
                </button>

                {openId === faq.id && (
                  <div className="px-6 pb-5 border-t border-gray-100">
                    <div className="pt-4 text-gray-700 leading-relaxed whitespace-pre-line">
                      {faq.answer}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-16 bg-gray-50 border-2 border-gray-200 p-8 text-center">
            <h3 className="text-gray-900 font-medium mb-3">
              その他のご質問がある場合
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              お問い合わせフォームよりお気軽にご連絡ください。<br />
              2営業日以内にご返信いたします。
            </p>
            <a
              href="/#contact"
              className="inline-flex items-center justify-center bg-gray-900 text-white px-8 py-3 hover:bg-gray-800 transition-colors"
            >
              お問い合わせはこちら
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500">© 2025 {SITE.NAME}. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
