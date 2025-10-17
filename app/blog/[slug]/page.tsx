import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getAllBlogSlugs, getBlogPost } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';
import Header from '@/components/Header';

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return {
      title: 'ブログが見つかりません',
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">ブログが見つかりません</h1>
          <Link href="/blog" className="text-blue-600 hover:underline">
            ブログ一覧に戻る
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 pt-20 relative overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.02) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(0, 0, 0, 0.02) 1px, transparent 1px)`,
          backgroundSize: '64px 64px'
        }}></div>
        <div className="relative container mx-auto px-6 max-w-4xl py-20">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          ブログ一覧に戻る
        </Link>

        <article className="bg-white rounded-lg p-8 md:p-12">
          <header className="mb-8 border-b border-gray-200 pb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded">
                {post.category}
              </span>
              <time className="text-gray-500">{post.date}</time>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>

            <p className="text-xl text-gray-600">{post.excerpt}</p>

            <div className="flex flex-wrap gap-2 mt-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>

          <div className="prose prose-lg max-w-none">
            <MDXRemote
              source={post.content}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [rehypeHighlight],
                },
              }}
            />
          </div>
        </article>
      </div>
    </div>
    </>
  );
}
