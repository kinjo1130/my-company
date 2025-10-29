import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // バリデーション
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: '必須項目が入力されていません' },
        { status: 400 }
      );
    }

    // メールアドレスの簡易バリデーション
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: '有効なメールアドレスを入力してください' },
        { status: 400 }
      );
    }

    // TODO: 実際のメール送信処理を実装
    // 例: SendGrid, AWS SES, Resendなどのメールサービスを使用

    // 開発中はコンソールに出力
    console.log('お問い合わせ受信:', {
      name,
      email,
      subject,
      message,
      timestamp: new Date().toISOString(),
    });

    // 成功レスポンス
    return NextResponse.json(
      {
        success: true,
        message: 'お問い合わせを受け付けました。2営業日以内にご返信いたします。'
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('お問い合わせ送信エラー:', error);
    return NextResponse.json(
      { error: '送信に失敗しました。時間をおいて再度お試しください。' },
      { status: 500 }
    );
  }
}
