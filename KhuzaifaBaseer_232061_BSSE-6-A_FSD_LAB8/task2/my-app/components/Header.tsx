import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-indigo-700 text-white shadow-lg">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold tracking-wide hover:text-indigo-200 transition-colors">
          ShopNext
        </Link>
        <nav>
          <ul className="flex gap-8 text-sm font-medium">
            {[
              { href: "/", label: "Home" },
              { href: "/products", label: "Products" },
              { href: "/about", label: "About" },
              { href: "/contact", label: "Contact" },
            ].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="hover:text-indigo-200 transition-colors border-b-2 border-transparent hover:border-indigo-200 pb-1"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
