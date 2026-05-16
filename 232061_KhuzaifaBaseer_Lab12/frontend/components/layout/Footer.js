import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaPinterest, FaYoutube, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-wood-900 text-wood-200">
      {/* Newsletter */}
      <div className="bg-primary py-10">
        <div className="container mx-auto px-4 max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-white text-xl font-heading font-bold">Subscribe to Our Newsletter</h3>
            <p className="text-white/80 text-sm">Get exclusive deals, new arrivals and design inspiration</p>
          </div>
          <div className="flex w-full md:w-auto">
            <input type="email" placeholder="Your email address"
              className="px-4 py-3 text-sm outline-none flex-1 md:w-80 text-wood-800" />
            <button className="bg-wood-800 text-white px-6 py-3 text-sm font-bold uppercase hover:bg-wood-900 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 max-w-7xl py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="mb-5">
              <span className="text-3xl font-heading font-black text-white">Rustik</span>
              <span className="text-primary font-bold tracking-widest text-sm ml-2 uppercase">Plank</span>
            </div>
            <p className="text-wood-400 text-sm leading-relaxed mb-6">
              Premium handcrafted furniture from reclaimed and solid wood. Every piece tells a story of craftsmanship and natural beauty.
            </p>
            <div className="flex gap-3">
              {[FaFacebook, FaTwitter, FaInstagram, FaPinterest, FaYoutube].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 bg-wood-700 hover:bg-primary flex items-center justify-center text-sm transition-colors rounded-sm">
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-5 border-b border-wood-700 pb-2">Shop</h4>
            <ul className="space-y-2.5 text-sm">
              {['Beds', 'Chairs', 'Tables', 'Bookcases', 'Cabinets', 'Boxes'].map(cat => (
                <li key={cat}><Link href={`/shop?category=${cat.toLowerCase()}`} className="text-wood-400 hover:text-primary transition-colors">{cat}</Link></li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-5 border-b border-wood-700 pb-2">Information</h4>
            <ul className="space-y-2.5 text-sm">
              {[['About Us', '/about'], ['Contact', '/contact'], ['Blog', '/blog'], ['FAQ', '/faq'], ['Return Policy', '/returns'], ['Delivery', '/delivery']].map(([label, href]) => (
                <li key={href}><Link href={href} className="text-wood-400 hover:text-primary transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-5 border-b border-wood-700 pb-2">Contact Us</h4>
            <ul className="space-y-3 text-sm text-wood-400">
              <li className="flex items-start gap-3"><FaMapMarkerAlt className="text-primary mt-0.5 flex-shrink-0" /> 123 Woodcraft Lane, London, EC1A 1BB</li>
              <li className="flex items-center gap-3"><FaPhone className="text-primary flex-shrink-0" /> +1 (555) 123-4567</li>
              <li className="flex items-center gap-3"><FaEnvelope className="text-primary flex-shrink-0" /> info@rustikplank.com</li>
            </ul>
            <div className="mt-5 text-sm text-wood-400">
              <p className="font-semibold text-wood-300">Opening Hours</p>
              <p>Mon–Fri: 9am – 6pm</p>
              <p>Sat: 10am – 4pm</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-wood-800 py-5 text-center text-wood-500 text-xs">
        <p>© {new Date().getFullYear()} Rustik Plank Furniture. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
