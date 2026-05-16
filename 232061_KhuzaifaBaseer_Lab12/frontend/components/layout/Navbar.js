'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaSearch, FaShoppingCart, FaUser, FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';
import { useCartStore, useAuthStore } from '@/store';
import toast from 'react-hot-toast';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/shop', children: [
    { label: 'Beds', href: '/shop?category=beds' },
    { label: 'Chairs', href: '/shop?category=chairs' },
    { label: 'Tables', href: '/shop?category=tables' },
    { label: 'Bookcases', href: '/shop?category=bookcases' },
    { label: 'Cabinets', href: '/shop?category=cabinets' },
    { label: 'Boxes', href: '/shop?category=boxes' },
  ]},
  { label: 'About Us', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact Us', href: '/contact' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const { count } = useCartStore();
  const { user, logout } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) { router.push(`/shop?search=${search}`); setSearch(''); }
  };

  const handleLogout = () => { logout(); toast.success('Logged out'); router.push('/'); };

  return (
    <header className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${scrolled ? 'shadow-lg' : 'shadow-sm'}`}>
      {/* Main Nav */}
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex flex-col leading-none">
              <span className="text-2xl font-heading font-black text-wood-800 tracking-tight">Rustik</span>
              <span className="text-xs font-bold text-primary uppercase tracking-[0.3em]">Plank</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div key={link.href} className="relative group">
                <Link href={link.href}
                  className="flex items-center gap-1 px-4 py-2 text-sm font-semibold text-wood-700 hover:text-primary uppercase tracking-wide transition-colors">
                  {link.label}
                  {link.children && <FaChevronDown className="text-xs" />}
                </Link>
                {link.children && (
                  <div className="absolute top-full left-0 bg-white shadow-xl border-t-2 border-primary min-w-[180px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    {link.children.map(child => (
                      <Link key={child.href} href={child.href}
                        className="block px-4 py-2.5 text-sm text-wood-700 hover:bg-primary hover:text-white transition-colors">
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <form onSubmit={handleSearch} className="hidden md:flex items-center border border-gray-200 rounded-sm overflow-hidden">
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search products..." className="px-3 py-2 text-sm outline-none w-48" />
              <button type="submit" className="bg-primary text-white px-3 py-2 hover:bg-primary-dark transition-colors">
                <FaSearch className="text-sm" />
              </button>
            </form>

            {/* Cart */}
            <Link href="/cart" className="relative p-2 text-wood-700 hover:text-primary transition-colors">
              <FaShoppingCart className="text-xl" />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {count}
                </span>
              )}
            </Link>

            {/* User */}
            {user ? (
              <div className="relative group">
                <button className="flex items-center gap-2 p-2 text-wood-700 hover:text-primary transition-colors">
                  <FaUser className="text-xl" />
                  <span className="hidden md:inline text-sm font-semibold">{user.name.split(' ')[0]}</span>
                </button>
                <div className="absolute right-0 top-full bg-white shadow-xl border-t-2 border-primary min-w-[180px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <Link href="/account/orders" className="block px-4 py-2.5 text-sm text-wood-700 hover:bg-primary hover:text-white transition-colors">My Orders</Link>
                  <Link href="/account/profile" className="block px-4 py-2.5 text-sm text-wood-700 hover:bg-primary hover:text-white transition-colors">Profile</Link>
                  {user.role === 'admin' && <Link href="/admin" className="block px-4 py-2.5 text-sm text-wood-700 hover:bg-primary hover:text-white transition-colors">Admin Panel</Link>}
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors border-t">Logout</button>
                </div>
              </div>
            ) : (
              <Link href="/login" className="flex items-center gap-1 p-2 text-wood-700 hover:text-primary transition-colors">
                <FaUser className="text-xl" />
              </Link>
            )}

            {/* Mobile toggle */}
            <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden p-2 text-wood-700">
              {menuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
            </button>
          </div>
        </div>
      </div>

      {/* Category bar */}
      <div className="hidden lg:block bg-wood-800">
        <div className="container mx-auto px-4 max-w-7xl flex items-center gap-8 h-10">
          {['Beds', 'Chairs', 'Tables', 'Bookcases', 'Cabinets', 'Boxes'].map(cat => (
            <Link key={cat} href={`/shop?category=${cat.toLowerCase()}`}
              className="text-wood-200 text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors">
              {cat}
            </Link>
          ))}
          <div className="ml-auto flex gap-4">
            <Link href="/shop?isNew=true" className="text-primary text-xs font-bold uppercase tracking-widest hover:text-primary-light transition-colors">New Products</Link>
            <Link href="/shop?isSpecial=true" className="text-primary text-xs font-bold uppercase tracking-widest hover:text-primary-light transition-colors">Specials</Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t shadow-lg">
          <form onSubmit={handleSearch} className="flex m-4">
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." className="flex-1 px-3 py-2 border border-gray-200 text-sm outline-none" />
            <button type="submit" className="bg-primary text-white px-4"><FaSearch /></button>
          </form>
          {navLinks.map(link => (
            <div key={link.href}>
              <Link href={link.href} onClick={() => setMenuOpen(false)}
                className="block px-4 py-3 border-b text-sm font-semibold text-wood-700 hover:text-primary hover:bg-cream">
                {link.label}
              </Link>
              {link.children && link.children.map(child => (
                <Link key={child.href} href={child.href} onClick={() => setMenuOpen(false)}
                  className="block px-8 py-2 border-b text-sm text-wood-600 hover:text-primary bg-wood-50">
                  {child.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
      )}
    </header>
  );
}
