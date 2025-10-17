import Link from 'next/link';
import { getAllBlogPosts } from '@/lib/mdx';
import Header from '@/components/Header';

export default async function BlogPage() {
  const posts = await getAllBlogPosts();

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

        <h1 className="text-4xl font-bold mb-2">ブログ</h1>
        <p className="text-gray-600 mb-12">技術や開発に関する記事を書いています</p>

        <div className="space-y-8">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block bg-white p-6 rounded-lg border border-gray-200 hover:border-gray-400 transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                  {post.category}
                </span>
                <span className="text-sm text-gray-500">{post.date}</span>
              </div>

              <h2 className="text-2xl font-bold mb-2 text-gray-900 hover:text-gray-600 transition-colors">
                {post.title}
              </h2>

              <p className="text-gray-600 mb-4">{post.excerpt}</p>

              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}
