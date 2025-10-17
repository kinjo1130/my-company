import { NextResponse } from 'next/server';
import { getAllBlogPosts } from '@/lib/mdx';

export async function GET() {
  try {
    const posts = await getAllBlogPosts();
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json(
      { error: 'ブログ記事の取得に失敗しました' },
      { status: 500 }
    );
  }
}
