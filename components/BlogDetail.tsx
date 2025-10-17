import { ArrowLeft, Calendar, Tag } from 'lucide-react';
import type { BlogPost } from '@/lib/mdx';
import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { use } from 'react';

interface BlogDetailProps {
  blogPromise: Promise<BlogPost>;
  onBack: () => void;
}

export default function BlogDetail({ blogPromise, onBack }: BlogDetailProps) {
  const blog = use(blogPromise);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="container mx-auto px-6 py-5 max-w-4xl">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            ブログ一覧に戻る
          </button>
        </div>
      </header>

      {/* Article */}
      <article className="py-12">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Meta */}
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{blog.date}</span>
              </div>
              <span>•</span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs">
                {blog.category}
              </span>
            </div>

            <h1 className="text-gray-900 mb-6">{blog.title}</h1>

            <div className="flex flex-wrap gap-2">
              {blog.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-gray-50 text-gray-600 text-sm"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="h-px bg-gray-200 mb-12"></div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
              components={
                {
                  p({ children }) {
                    return <p className="mb-6 leading-loose text-gray-700">{children}</p>;
                  },
                  h1({ children }) {
                    return <h1 className="text-4xl font-bold mb-6 mt-12 text-gray-900">{children}</h1>;
                  },
                  h2({ children }) {
                    return <h2 className="text-3xl font-bold mb-4 mt-10 text-gray-900">{children}</h2>;
                  },
                  h3({ children }) {
                    return <h3 className="text-2xl font-bold mb-3 mt-8 text-gray-900">{children}</h3>;
                  },
                  ul({ children }) {
                    return <ul className="list-disc list-inside mb-6 space-y-3">{children}</ul>;
                  },
                  ol({ children }) {
                    return <ol className="list-decimal list-inside mb-6 space-y-3">{children}</ol>;
                  },
                  li({ children }) {
                    return <li className="leading-loose text-gray-700">{children}</li>;
                  },
                  pre({ children }) {
                    return <div className="relative mb-8 rounded-xl overflow-hidden border border-gray-700 shadow-lg">{children}</div>;
                  },
                  code({ children, className, ...rest }) {
                    const match = /language-(\w+)/.exec(className || '');

                    if (match) {
                      const language = match[1];
                      return (
                        <>
                          <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
                            <span className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
                              {language}
                            </span>
                          </div>
                          <pre className="bg-gray-900 p-6 overflow-x-auto">
                            <code className={className} {...rest}>
                              {children}
                            </code>
                          </pre>
                        </>
                      );
                    }

                    return (
                      <code className="bg-pink-50 border border-pink-200 px-2 py-0.5 rounded text-sm font-mono text-pink-700" {...rest}>
                        {children}
                      </code>
                    );
                  },
                } as Components
              }
            >
              {blog.content}
            </ReactMarkdown>
          </div>

          {/* Footer */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 text-gray-900 hover:text-gray-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              ブログ一覧に戻る
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}
