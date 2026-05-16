'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/product/ProductCard';
import { getProducts, getCategories } from '@/lib/api';
import { FaFilter, FaTimes, FaSearch } from 'react-icons/fa';

function ShopContent() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    search: searchParams.get('search') || '',
    sort: '-createdAt',
    isFeatured: searchParams.get('isFeatured') || '',
    isSpecial: searchParams.get('isSpecial') || '',
    isNew: searchParams.get('isNew') || '',
    isPopular: searchParams.get('isPopular') || '',
  });

  useEffect(() => { getCategories().then(r => setCategories(r.data.data)); }, []);

  useEffect(() => {
    setLoading(true);
    const params = { page, limit: 12, ...filters };
    Object.keys(params).forEach(k => !params[k] && delete params[k]);
    getProducts(params).then(r => {
      setProducts(r.data.data);
      setTotal(r.data.total);
      setPages(r.data.pages);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [filters, page]);

  const updateFilter = (key, val) => { setFilters(f => ({ ...f, [key]: val })); setPage(1); };
  const clearFilters = () => { setFilters({ category: '', search: '', sort: '-createdAt', isFeatured: '', isSpecial: '', isNew: '', isPopular: '' }); setPage(1); };

  const catObj = categories.find(c => c.slug === filters.category);

  return (
    <div className="container mx-auto px-4 max-w-7xl py-10">
      {/* Breadcrumb */}
      <div className="text-sm text-wood-400 mb-6">
        <span>Home</span> / <span className="text-primary">{catObj ? catObj.name : 'Shop'}</span>
      </div>

      <div className="flex gap-8">
        {/* Sidebar */}
        <aside className={`w-64 flex-shrink-0 ${showFilter ? 'block fixed inset-0 z-50 bg-white p-6 overflow-y-auto md:relative md:block md:bg-transparent md:p-0' : 'hidden md:block'}`}>
          {showFilter && <button onClick={() => setShowFilter(false)} className="md:hidden mb-4 flex items-center gap-2 text-sm font-bold text-wood-700"><FaTimes /> Close Filters</button>}

          <div className="space-y-6">
            {/* Search */}
            <div>
              <h3 className="font-bold text-wood-800 text-sm uppercase tracking-widest mb-3 border-b border-wood-100 pb-2">Search</h3>
              <div className="flex">
                <input value={filters.search} onChange={e => updateFilter('search', e.target.value)} placeholder="Search..." className="flex-1 border border-gray-200 px-3 py-2 text-sm outline-none" />
                <span className="bg-primary text-white px-3 flex items-center"><FaSearch className="text-xs" /></span>
              </div>
            </div>

            {/* Categories */}
            <div>
              <h3 className="font-bold text-wood-800 text-sm uppercase tracking-widest mb-3 border-b border-wood-100 pb-2">Categories</h3>
              <ul className="space-y-1">
                <li>
                  <button onClick={() => updateFilter('category', '')}
                    className={`w-full text-left text-sm py-1.5 px-2 transition-colors ${!filters.category ? 'text-primary font-bold' : 'text-wood-600 hover:text-primary'}`}>
                    All Categories
                  </button>
                </li>
                {categories.map(cat => (
                  <li key={cat._id}>
                    <button onClick={() => updateFilter('category', cat.slug)}
                      className={`w-full text-left text-sm py-1.5 px-2 transition-colors ${filters.category === cat.slug ? 'text-primary font-bold' : 'text-wood-600 hover:text-primary'}`}>
                      {cat.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Filter by Type */}
            <div>
              <h3 className="font-bold text-wood-800 text-sm uppercase tracking-widest mb-3 border-b border-wood-100 pb-2">Filter By</h3>
              <div className="space-y-2">
                {[['isFeatured', 'Featured'], ['isPopular', 'Popular'], ['isSpecial', 'Special Offers'], ['isNew', 'New Arrivals']].map(([key, label]) => (
                  <label key={key} className="flex items-center gap-2 cursor-pointer text-sm text-wood-600 hover:text-primary">
                    <input type="checkbox" checked={!!filters[key]} onChange={e => updateFilter(key, e.target.checked ? 'true' : '')}
                      className="accent-primary" />
                    {label}
                  </label>
                ))}
              </div>
            </div>

            {/* Sort */}
            <div>
              <h3 className="font-bold text-wood-800 text-sm uppercase tracking-widest mb-3 border-b border-wood-100 pb-2">Sort By</h3>
              <select value={filters.sort} onChange={e => updateFilter('sort', e.target.value)}
                className="w-full border border-gray-200 px-3 py-2 text-sm outline-none">
                <option value="-createdAt">Newest First</option>
                <option value="price">Price: Low to High</option>
                <option value="-price">Price: High to Low</option>
                <option value="-rating">Top Rated</option>
              </select>
            </div>

            <button onClick={clearFilters} className="w-full text-sm text-red-500 hover:text-red-700 font-bold py-2 border border-red-200 hover:border-red-400 transition-colors">
              Clear All Filters
            </button>
          </div>
        </aside>

        {/* Products */}
        <main className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-wood-500">{loading ? '...' : `${total} product${total !== 1 ? 's' : ''} found`}</p>
            <button onClick={() => setShowFilter(true)} className="md:hidden flex items-center gap-2 text-sm font-bold text-wood-700 border border-wood-200 px-4 py-2">
              <FaFilter /> Filters
            </button>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => <div key={i} className="bg-wood-50 rounded-sm h-72 animate-pulse" />)}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-wood-400 text-lg mb-4">No products found</p>
              <button onClick={clearFilters} className="btn-primary">Clear Filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {products.map(p => <ProductCard key={p._id} product={p} />)}
            </div>
          )}

          {/* Pagination */}
          {pages > 1 && (
            <div className="flex justify-center gap-2 mt-10">
              {[...Array(pages)].map((_, i) => (
                <button key={i} onClick={() => setPage(i + 1)}
                  className={`w-10 h-10 text-sm font-bold transition-colors ${page === i + 1 ? 'bg-primary text-white' : 'border border-gray-200 text-wood-600 hover:bg-primary hover:text-white'}`}>
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return <Suspense fallback={<div className="text-center py-20 text-wood-400">Loading shop...</div>}><ShopContent /></Suspense>;
}
