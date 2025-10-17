import { Calendar, ArrowRight, Tag, ArrowLeft } from 'lucide-react';
import type { BlogPost } from '@/lib/mdx';

interface BlogListProps {
  posts: BlogPost[];
  onSelectBlog: (slug: string) => void;
  onBack: () => void;
}

export default function BlogList({ posts, onSelectBlog, onBack }: BlogListProps) {
  const blogPosts = posts;
  const categories = Array.from(new Set(blogPosts.map(post => post.category)));

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
            <h1 className="text-gray-900 mb-6">Blog</h1>
            <p className="text-gray-600 leading-relaxed">
              Web開発に関する技術記事、ベストプラクティス、実践的なノウハウを発信しています。
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-6xl">
          {/* Categories Filter */}
          <div className="mb-12 flex flex-wrap gap-3">
            <button className="px-4 py-2 bg-gray-900 text-white text-sm transition-colors">
              すべて
            </button>
            {categories.map((category) => (
              <button
                key={category}
                className="px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 text-sm transition-colors"
              >
                {category}
              </button>
            ))}
          </div>

          {/* Posts Grid */}
          <div className="space-y-8">
            {blogPosts.map((post) => (
              <button
                key={post.slug}
                onClick={() => onSelectBlog(post.slug)}
                className="w-full bg-white border border-gray-200 hover:border-gray-400 p-8 transition-all text-left group"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{post.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs">
                      {post.category}
                    </span>
                  </div>
                </div>

                <h2 className="text-gray-900 mb-3 group-hover:text-gray-600 transition-colors">
                  {post.title}
                </h2>

                <p className="text-gray-600 mb-4 leading-relaxed">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 text-xs text-gray-500"
                      >
                        <Tag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-gray-900 text-sm">
                    続きを読む
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
