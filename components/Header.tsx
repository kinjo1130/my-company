import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-semibold">
          Taro Yamada
        </Link>

        <ul className="flex items-center gap-8">
          <li>
            <Link href="about" className="text-gray-600 hover:text-gray-900 transition-colors">
              About
            </Link>
          </li>
          <li>
            <Link href="services" className="text-gray-600 hover:text-gray-900 transition-colors">
              Services
            </Link>
          </li>
          <li>
            <Link href="/works" className="text-gray-600 hover:text-gray-900 transition-colors">
              Works
            </Link>
          </li>
          <li>
            <Link href="contact" className="bg-gray-900 text-white px-6 py-2 rounded hover:bg-gray-800 transition-colors">
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
