import Link from "next/link";
import { ROUTES, SECTIONS } from "@/lib/routes";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex justify-between items-center h-20">
          <div>
            <Link href={ROUTES.HOME} className="text-gray-900 hover:text-gray-600 transition-colors tracking-tight">
              Yamada Tech
            </Link>
          </div>
          <nav className="hidden md:flex gap-12 items-center">
            <Link href={`${ROUTES.HOME}#${SECTIONS.ABOUT}`} className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
              会社概要
            </Link>
            <Link href={`${ROUTES.HOME}#${SECTIONS.SERVICES}`} className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
              サービス
            </Link>
            <Link href={`${ROUTES.HOME}#${SECTIONS.WORKS}`} className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
              実績
            </Link>
            <Link href={ROUTES.BLOG} className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
              ブログ
            </Link>
            <Link href={ROUTES.NEWS} className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
              お知らせ
            </Link>
            <Link
              href={`${ROUTES.HOME}#${SECTIONS.CONTACT}`}
              className="bg-gray-900 text-white px-6 py-2.5 hover:bg-gray-800 transition-colors text-sm"
            >
              お問い合わせ
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
