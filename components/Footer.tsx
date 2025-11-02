import { ROUTES } from '@/lib/routes';
import { SITE } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 py-8">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500">© 2025 {SITE.NAME}. All rights reserved.</p>
          <nav className="flex gap-6">
            <a href={ROUTES.PRIVACY} className="text-gray-500 hover:text-gray-900 transition-colors text-sm">
              プライバシーポリシー
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
