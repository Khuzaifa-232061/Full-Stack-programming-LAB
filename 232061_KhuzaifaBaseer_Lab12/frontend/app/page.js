'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaArrowRight, FaTruck, FaShieldAlt, FaLeaf, FaTools } from 'react-icons/fa';
import ProductCard from '@/components/product/ProductCard';
import { getProducts, getCategories } from '@/lib/api';

export default function HomePage() {
  const [featured, setFeatured] = useState([]);
  const [popular, setPopular] = useState([]);
  const [special, setSpecial] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeTab, setActiveTab] = useState('featured');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [f, p, s, c] = await Promise.all([
          getProducts({ isFeatured: true, limit: 4 }),
          getProducts({ isPopular: true, limit: 4 }),
          getProducts({ isSpecial: true, limit: 4 }),
          getCategories(),
        ]);
        setFeatured(f.data.data);
        setPopular(p.data.data);
        setSpecial(s.data.data);
        setCategories(c.data.data);
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    };
    load();
  }, []);

  const tabProducts = activeTab === 'featured' ? featured : activeTab === 'popular' ? popular : special;

  return (
    <div>
      {/* HERO */}
      <section className="relative h-[85vh] min-h-[560px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1600&q=80" alt="Hero" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-wood-900/90 via-wood-900/60 to-transparent" />
        </div>
        <div className="relative container mx-auto px-4 max-w-7xl">
          <div className="max-w-xl">
            <p className="text-primary font-bold uppercase tracking-[0.3em] text-sm mb-4">Reclaimed &amp; Hand Crafted</p>
            <h1 className="text-5xl md:text-6xl font-heading font-black text-white leading-tight mb-6">
              Furniture With<br /><span className="text-primary">A Story</span>
            </h1>
            <p className="text-wood-200 text-lg mb-8 leading-relaxed">
              Every piece is handcrafted from reclaimed wood, bringing warmth, character and timeless beauty into your home.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/shop" className="btn-primary text-base px-8 py-3 flex items-center gap-2">
                Shop Now <FaArrowRight />
              </Link>
              <Link href="/about" className="btn-outline text-base px-8 py-3 border-white text-white hover:bg-white hover:text-wood-800">
                Our Story
              </Link>
            </div>
          </div>
        </div>
        {/* Sale Badge */}
        <div className="absolute bottom-10 right-10 hidden lg:flex flex-col items-center justify-center w-32 h-32 bg-primary rounded-full shadow-2xl animate-pulse">
          <span className="text-white text-3xl font-black">50%</span>
          <span className="text-white text-xs font-bold uppercase">Sale Off</span>
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-wood-800 py-8">
        <div className="container mx-auto px-4 max-w-7xl grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: FaTruck, title: 'Free Shipping', sub: 'On orders over £200' },
            { icon: FaShieldAlt, title: '2 Year Warranty', sub: 'On all products' },
            { icon: FaLeaf, title: 'Eco Friendly', sub: 'Reclaimed materials' },
            { icon: FaTools, title: 'Handcrafted', sub: 'By master craftsmen' },
          ].map(({ icon: Icon, title, sub }) => (
            <div key={title} className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Icon className="text-primary text-xl" />
              </div>
              <div>
                <p className="text-white font-bold text-sm">{title}</p>
                <p className="text-wood-400 text-xs">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HOT DEALS */}
      <section className="py-16 container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-10">
          <p className="text-primary font-bold uppercase tracking-widest text-xs mb-2">Limited Time</p>
          <h2 className="section-title text-center">Hot Deals</h2>
          <div className="orange-bar mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative rounded-sm overflow-hidden group cursor-pointer">
            <img src="https://images.unsplash.com/photo-1505693314120-0d443867891c?w=800&q=80" alt="Sale" className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-wood-900/80 to-transparent flex flex-col justify-end p-8">
              <p className="text-white text-sm font-bold uppercase tracking-widest mb-1">Reclaimed & Hand Crafted</p>
              <h3 className="text-white text-4xl font-heading font-black mb-4">Sale <span className="text-primary">50%</span> Off</h3>
              <Link href="/shop?isSpecial=true" className="btn-primary self-start">Shop Now</Link>
            </div>
          </div>
          <div className="relative rounded-sm overflow-hidden group cursor-pointer">
            <img src="https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80" alt="Elite" className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-wood-900/80 to-transparent flex flex-col justify-end p-8">
              <p className="text-primary text-sm font-bold uppercase tracking-widest mb-1">Premium Selection</p>
              <h3 className="text-white text-4xl font-heading font-black mb-2">Elite Collection</h3>
              <p className="text-white/80 text-sm mb-4">Best Furniture · Sale Off <span className="text-primary font-bold">35%</span></p>
              <Link href="/shop?isFeatured=true" className="btn-primary self-start">Explore</Link>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT TABS */}
      <section className="py-16 bg-wood-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-4">
            <div>
              <h2 className="section-title">Our Products</h2>
              <div className="orange-bar" />
            </div>
            <div className="flex border border-gray-200 overflow-hidden rounded-sm">
              {['featured', 'popular', 'special'].map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2.5 text-sm font-bold uppercase tracking-wide transition-colors ${activeTab === tab ? 'bg-primary text-white' : 'text-wood-600 hover:bg-wood-100'}`}>
                  {tab === 'featured' ? 'Featured' : tab === 'popular' ? 'Popular' : 'Special'}
                </button>
              ))}
            </div>
          </div>
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => <div key={i} className="bg-white rounded-sm h-72 animate-pulse" />)}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {tabProducts.map(p => <ProductCard key={p._id} product={p} />)}
            </div>
          )}
          <div className="text-center mt-10">
            <Link href="/shop" className="btn-outline px-10 py-3 text-base">View All Products</Link>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-16 container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-10">
          <h2 className="section-title text-center">Shop By Collection</h2>
          <div className="orange-bar mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: 'Chairs Collection', slug: 'chairs', img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80' },
            { name: 'Beds Collection', slug: 'beds', img: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=600&q=80' },
            { name: 'Tables Collection', slug: 'tables', img: 'https://images.unsplash.com/photo-1530018352490-8d1b3e1d2a56?w=600&q=80' },
          ].map(cat => (
            <Link href={`/shop?category=${cat.slug}`} key={cat.slug} className="relative rounded-sm overflow-hidden group block h-64">
              <img src={cat.img} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-wood-900/50 group-hover:bg-wood-900/30 transition-colors flex items-end p-6">
                <h3 className="text-white text-2xl font-heading font-bold uppercase tracking-wide">{cat.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* PROMO BANNER */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1600&q=80" alt="Promo" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-wood-900/70" />
        </div>
        <div className="relative container mx-auto px-4 max-w-7xl text-center">
          <p className="text-primary font-bold uppercase tracking-[0.3em] text-sm mb-3">Special Offer</p>
          <h2 className="text-4xl md:text-5xl font-heading font-black text-white mb-4">
            Buy Online · Pick Up In Store
          </h2>
          <p className="text-wood-200 text-lg mb-8 max-w-xl mx-auto">
            Now available in our store system. Available on select products.
          </p>
          <Link href="/shop" className="btn-primary text-base px-10 py-3 inline-flex items-center gap-2">
            Learn More <FaArrowRight />
          </Link>
        </div>
      </section>

      {/* FEATURED PRODUCT */}
      <section className="py-16 container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=700&q=80" alt="Featured" className="w-full rounded-sm shadow-2xl" />
            <div className="absolute -bottom-4 -right-4 bg-primary text-white p-6 rounded-sm shadow-xl text-center hidden md:block">
              <p className="text-3xl font-black">£129</p>
              <p className="text-xs uppercase tracking-wide font-bold">Our Price</p>
            </div>
          </div>
          <div>
            <p className="text-primary font-bold uppercase tracking-widest text-xs mb-3">Featured Product</p>
            <h2 className="text-4xl font-heading font-bold text-wood-800 mb-4">Designer Lounge Chair</h2>
            <div className="orange-bar" />
            <p className="text-wood-500 leading-relaxed mb-6">
              This stunning lounge chair is Photoshop's version of Lorem Ipsum. Proin sollicitudin, lorem quis bibendum auctor, nisi elit consequat ipsum, nec sagittis sem nibh id elit. Duis sed odio sit amet nibh vulputate cursus.
            </p>
            <div className="flex items-center gap-4 mb-8">
              <span className="text-4xl font-heading font-black text-wood-800">£129<span className="text-sm text-wood-400">.99</span></span>
            </div>
            <Link href="/shop" className="btn-primary px-10 py-3 text-base inline-flex items-center gap-2">
              Add to Cart <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* BRAND LOGOS */}
      <section className="py-10 bg-wood-50 border-y border-wood-100">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-40">
            {['Rockwell Collins', 'LexisNexis', 'Qantas', 'GE Money', 'Australian Convention', 'f4b'].map(b => (
              <span key={b} className="text-wood-800 font-bold text-sm uppercase tracking-widest">{b}</span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
