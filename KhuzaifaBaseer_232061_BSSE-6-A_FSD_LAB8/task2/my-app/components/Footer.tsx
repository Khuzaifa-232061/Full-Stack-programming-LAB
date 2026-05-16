import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          <div>
            <h3 className="text-lg font-bold mb-2">ShopNext</h3>
            <p className="text-gray-400 text-sm">Your favourite online store built with Next.js.</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-400 mb-2">Navigation</h3>
            <ul className="space-y-1 text-sm">
              {[
                { href: "/", label: "Home" },
                { href: "/products", label: "Products" },
                { href: "/about", label: "About" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-400 mb-2">Contact</h3>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>📧 hello@shopnext.com</li>
              <li>📞 +92 300 0000000</li>
              <li>📍 Rawalpindi, Pakistan</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-4 text-center text-xs text-gray-500">
          © 2026 ShopNext. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
