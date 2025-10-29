import { NextRequest, NextResponse } from 'next/server';
import { getBlogPost } from '@/lib/mdx';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const post = await getBlogPost(slug);

    if (!post) {
      return NextResponse.json(
        { error: 'ブログが見つかりません' },
        { status: 404 }
      );
    }

    return NextResponse.json(post);
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: 'ブログの取得に失敗しました' },
      { status: 500 }
    );
  }
}
