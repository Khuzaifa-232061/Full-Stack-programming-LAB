import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-blue-700 text-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold tracking-wide hover:text-blue-200 transition-colors">
          MyApp
        </Link>
        <nav>
          <ul className="flex gap-8 text-sm font-medium">
            <li>
              <Link
                href="/"
                className="hover:text-blue-200 transition-colors border-b-2 border-transparent hover:border-blue-200 pb-1"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="hover:text-blue-200 transition-colors border-b-2 border-transparent hover:border-blue-200 pb-1"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-blue-200 transition-colors border-b-2 border-transparent hover:border-blue-200 pb-1"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
