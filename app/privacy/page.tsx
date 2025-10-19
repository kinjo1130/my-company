import Header from '@/components/Header';
import { SITE } from '@/lib/constants';

export const metadata = {
  title: `プライバシーポリシー | ${SITE.NAME}`,
  description: '個人情報の取り扱いに関する方針',
};

export default function PrivacyPage() {
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
          <h1 className="text-4xl font-bold mb-2">プライバシーポリシー</h1>
          <p className="text-gray-600 mb-12">個人情報の取り扱いについて</p>

          <div className="bg-white p-8 md:p-12 rounded-lg border border-gray-200">
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed mb-8">
                {SITE.FULL_NAME}（以下、「当事務所」といいます。）は、お客様からお預かりする個人情報の重要性を認識し、
                個人情報の保護に関する法律（以下「個人情報保護法」といいます。）を遵守すると共に、
                以下のプライバシーポリシー（以下「本ポリシー」といいます。）に従って、
                適切な取扱い及び保護に努めます。
              </p>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                  1. 個人情報の定義
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  本ポリシーにおいて、個人情報とは、個人情報保護法第2条第1項により定義された個人情報、
                  すなわち、生存する個人に関する情報であって、当該情報に含まれる氏名、生年月日その他の記述等により
                  特定の個人を識別することができるもの（他の情報と容易に照合することができ、
                  それにより特定の個人を識別することができることとなるものを含みます。）を指します。
                </p>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                  2. 個人情報の収集
                </h2>
                <p className="text-gray-700 leading-relaxed mb-3">
                  当事務所は、以下の場合に個人情報を収集することがあります。
                </p>
                <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2 ml-4">
                  <li>お問い合わせフォームからのご連絡時</li>
                  <li>サービスのお申し込み時</li>
                  <li>契約締結時</li>
                  <li>各種アンケートへのご協力時</li>
                </ul>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                  3. 個人情報の利用目的
                </h2>
                <p className="text-gray-700 leading-relaxed mb-3">
                  当事務所は、お客様からお預かりした個人情報を以下の目的で利用いたします。
                </p>
                <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2 ml-4">
                  <li>お客様からのお問い合わせへの対応</li>
                  <li>サービスの提供及び契約の履行</li>
                  <li>サービスに関するアフターサービスの提供</li>
                  <li>新サービス、新商品のご案内</li>
                  <li>統計データの作成（個人を特定できない形式）</li>
                </ul>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                  4. 個人情報の第三者提供
                </h2>
                <p className="text-gray-700 leading-relaxed mb-3">
                  当事務所は、以下の場合を除き、お客様の同意なく個人情報を第三者に提供することはありません。
                </p>
                <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2 ml-4">
                  <li>お客様の同意がある場合</li>
                  <li>法令に基づく場合</li>
                  <li>人の生命、身体又は財産の保護のために必要がある場合</li>
                  <li>公衆衛生の向上又は児童の健全な育成の推進のために特に必要がある場合</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mt-3">
                  なお、業務委託先に個人情報を預ける場合は、適切な監督を行います。
                </p>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                  5. 個人情報の管理
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  当事務所は、お客様の個人情報を正確かつ最新の状態に保ち、個人情報への不正アクセス・紛失・破損・改ざん・漏洩などを防止するため、
                  セキュリティシステムの維持・管理体制の整備・社員教育の徹底等の必要な措置を講じ、
                  安全対策を実施し個人情報の厳重な管理を行います。
                </p>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                  6. 個人情報の開示・訂正・削除
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  お客様ご本人が、個人情報の照会・修正・削除などをご希望される場合には、
                  ご本人であることを確認の上、対応させていただきます。
                  ただし、法令により保存が義務付けられている場合等、削除できない場合がございます。
                </p>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                  7. Cookieの使用
                </h2>
                <p className="text-gray-700 leading-relaxed mb-3">
                  当事務所のウェブサイトでは、ユーザーの利便性向上及びサービス改善のため、Cookieを使用することがあります。
                  Cookieとは、ウェブサイトを利用したときに、ブラウザとサーバーとの間で送受信した利用履歴や入力内容などを、
                  お客様のコンピュータにファイルとして保存しておく仕組みです。
                </p>
                <p className="text-gray-700 leading-relaxed mb-3">
                  また、当サイトでは、Google Analyticsを使用してアクセス解析を行っています。
                  Google Analyticsは、Cookieを使用して個人を特定する情報を含まずにアクセス情報を収集します。
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Cookieの使用を望まない場合は、ブラウザの設定でCookieを無効にすることができます。
                </p>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                  8. プライバシーポリシーの変更
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  当事務所は、法令の変更や事業内容の変更に伴い、本ポリシーの内容を変更することがあります。
                  変更後のプライバシーポリシーは、本ページに掲載した時点から効力を生じるものとします。
                </p>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                  9. お問い合わせ
                </h2>
                <p className="text-gray-700 leading-relaxed mb-3">
                  本ポリシーに関するお問い合わせは、以下の連絡先までお願いいたします。
                </p>
                <div className="bg-gray-50 p-4 rounded border border-gray-200">
                  <p className="text-gray-900 font-semibold mb-2">{SITE.FULL_NAME}</p>
                  <p className="text-gray-700 mb-1">所在地: {SITE.LOCATION}</p>
                  <p className="text-gray-700">
                    メールアドレス: <a href={`mailto:${SITE.EMAIL}`} className="text-gray-900 hover:text-gray-600 underline">{SITE.EMAIL}</a>
                  </p>
                </div>
              </section>

              <div className="text-right text-gray-600 text-sm mt-12">
                制定日: 2020年4月1日<br />
                最終更新日: 2025年1月1日
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
