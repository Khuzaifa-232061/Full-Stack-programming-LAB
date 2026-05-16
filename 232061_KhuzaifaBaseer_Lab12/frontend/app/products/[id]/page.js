'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { FaStar, FaShoppingCart, FaMinus, FaPlus, FaHeart, FaShare } from 'react-icons/fa';
import { getProduct, getReviews, createReview } from '@/lib/api';
import { useCartStore, useAuthStore } from '@/store';
import ProductCard from '@/components/product/ProductCard';
import toast from 'react-hot-toast';

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState('description');
  const [reviewForm, setReviewForm] = useState({ rating: 5, title: '', comment: '' });
  const [submitting, setSubmitting] = useState(false);
  const { addItem } = useCartStore();
  const { user } = useAuthStore();

  useEffect(() => {
    if (!id) return;
    getProduct(id).then(r => setProduct(r.data.data)).catch(console.error);
    getReviews(id).then(r => setReviews(r.data.data)).catch(console.error);
  }, [id]);

  if (!product) return (
    <div className="container mx-auto px-4 max-w-7xl py-20 text-center">
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-wood-100 rounded w-1/3 mx-auto" />
        <div className="h-96 bg-wood-100 rounded" />
      </div>
    </div>
  );

  const handleAddToCart = () => { addItem(product, qty); toast.success(`${product.name} added to cart!`); };

  const handleReview = async (e) => {
    e.preventDefault();
    if (!user) return toast.error('Please login to leave a review');
    setSubmitting(true);
    try {
      const r = await createReview({ ...reviewForm, product: id });
      setReviews(prev => [r.data.data, ...prev]);
      setReviewForm({ rating: 5, title: '', comment: '' });
      toast.success('Review submitted!');
    } catch { toast.error('Could not submit review'); }
    finally { setSubmitting(false); }
  };

  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : null;

  return (
    <div className="container mx-auto px-4 max-w-7xl py-10">
      {/* Breadcrumb */}
      <div className="text-sm text-wood-400 mb-8 flex items-center gap-2">
        <Link href="/" className="hover:text-primary">Home</Link> /
        <Link href="/shop" className="hover:text-primary">Shop</Link> /
        <Link href={`/shop?category=${product.category?.slug}`} className="hover:text-primary">{product.category?.name}</Link> /
        <span className="text-primary truncate">{product.name}</span>
      </div>

      {/* Main Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Images */}
        <div>
          <div className="bg-wood-50 rounded-sm overflow-hidden mb-4 aspect-square">
            <img src={product.images?.[activeImg] || product.images?.[0]} alt={product.name}
              className="w-full h-full object-cover" />
          </div>
          {product.images?.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {product.images.map((img, i) => (
                <button key={i} onClick={() => setActiveImg(i)}
                  className={`w-20 h-20 flex-shrink-0 rounded-sm overflow-hidden border-2 transition-colors ${activeImg === i ? 'border-primary' : 'border-transparent'}`}>
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            {product.isNew && <span className="bg-green-500 text-white text-xs px-2 py-0.5 font-bold uppercase rounded-sm">New</span>}
            {discount && <span className="bg-primary text-white text-xs px-2 py-0.5 font-bold rounded-sm">-{discount}% Off</span>}
          </div>
          <h1 className="text-3xl font-heading font-bold text-wood-800 mb-3">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className={`text-sm ${i < Math.round(product.rating) ? 'text-yellow-400' : 'text-gray-200'}`} />
              ))}
            </div>
            <span className="text-sm text-wood-400">{product.rating} ({product.numReviews} reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-end gap-3 mb-6 py-4 border-y border-wood-100">
            <span className="text-4xl font-heading font-black text-wood-800">£{product.price.toFixed(2)}</span>
            {product.oldPrice && <span className="text-xl text-gray-400 line-through mb-1">£{product.oldPrice.toFixed(2)}</span>}
          </div>

          <p className="text-wood-500 leading-relaxed mb-6">{product.description}</p>

          {/* Meta */}
          <div className="space-y-2 text-sm mb-6">
            {product.material && <p><span className="font-bold text-wood-700 w-24 inline-block">Material:</span><span className="text-wood-500">{product.material}</span></p>}
            {product.color && <p><span className="font-bold text-wood-700 w-24 inline-block">Color:</span><span className="text-wood-500">{product.color}</span></p>}
            <p><span className="font-bold text-wood-700 w-24 inline-block">Category:</span><Link href={`/shop?category=${product.category?.slug}`} className="text-primary hover:underline">{product.category?.name}</Link></p>
            <p><span className="font-bold text-wood-700 w-24 inline-block">Stock:</span>
              <span className={product.stock > 0 ? 'text-green-600 font-bold' : 'text-red-500 font-bold'}>
                {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
              </span>
            </p>
          </div>

          {/* Qty & Cart */}
          {product.stock > 0 && (
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border border-gray-200 rounded-sm overflow-hidden">
                <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-10 h-12 flex items-center justify-center text-wood-600 hover:bg-wood-50 transition-colors">
                  <FaMinus className="text-xs" />
                </button>
                <span className="w-14 text-center font-bold text-wood-800">{qty}</span>
                <button onClick={() => setQty(q => Math.min(product.stock, q + 1))} className="w-10 h-12 flex items-center justify-center text-wood-600 hover:bg-wood-50 transition-colors">
                  <FaPlus className="text-xs" />
                </button>
              </div>
              <button onClick={handleAddToCart} className="btn-primary flex items-center gap-2 flex-1 justify-center py-3">
                <FaShoppingCart /> Add to Cart
              </button>
              <button className="w-12 h-12 border border-gray-200 flex items-center justify-center text-wood-600 hover:text-primary hover:border-primary transition-colors">
                <FaHeart />
              </button>
            </div>
          )}

          <Link href="/checkout" className="block text-center border-2 border-wood-800 text-wood-800 font-bold uppercase tracking-wide py-3 hover:bg-wood-800 hover:text-white transition-colors">
            Buy Now
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-16">
        <div className="border-b border-wood-100 flex gap-0 mb-8">
          {['description', 'details', 'reviews'].map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-6 py-3 text-sm font-bold uppercase tracking-wide transition-colors border-b-2 -mb-px ${tab === t ? 'border-primary text-primary' : 'border-transparent text-wood-500 hover:text-primary'}`}>
              {t === 'reviews' ? `Reviews (${reviews.length})` : t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {tab === 'description' && (
          <div className="prose max-w-3xl text-wood-500 leading-relaxed">
            <p>{product.description}</p>
            <p className="mt-4">Each piece in our collection is handcrafted by skilled artisans using reclaimed and sustainably sourced timber. The natural variations in grain, texture and colour are what make every Rustik Plank piece truly unique.</p>
          </div>
        )}

        {tab === 'details' && (
          <div className="max-w-lg space-y-3">
            {[['SKU', product.sku || 'N/A'], ['Material', product.material || 'N/A'], ['Color', product.color || 'Natural'], ['Category', product.category?.name], ['Stock', product.stock]].map(([k, v]) => (
              <div key={k} className="flex border-b border-wood-50 py-2">
                <span className="w-36 font-bold text-wood-700 text-sm">{k}</span>
                <span className="text-wood-500 text-sm">{v}</span>
              </div>
            ))}
          </div>
        )}

        {tab === 'reviews' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="font-heading font-bold text-xl text-wood-800 mb-6">Customer Reviews</h3>
              {reviews.length === 0 ? (
                <p className="text-wood-400">No reviews yet. Be the first!</p>
              ) : (
                <div className="space-y-6">
                  {reviews.map(r => (
                    <div key={r._id} className="border-b border-wood-50 pb-6">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                          {r.user?.name?.[0]?.toUpperCase()}
                        </div>
                        <div>
                          <p className="font-bold text-wood-800 text-sm">{r.user?.name}</p>
                          <div className="flex">{[...Array(5)].map((_, i) => <FaStar key={i} className={`text-xs ${i < r.rating ? 'text-yellow-400' : 'text-gray-200'}`} />)}</div>
                        </div>
                        <span className="ml-auto text-xs text-wood-400">{new Date(r.createdAt).toLocaleDateString()}</span>
                      </div>
                      <p className="font-bold text-wood-700 text-sm mb-1">{r.title}</p>
                      <p className="text-wood-500 text-sm">{r.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <h3 className="font-heading font-bold text-xl text-wood-800 mb-6">Write a Review</h3>
              {user ? (
                <form onSubmit={handleReview} className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-wood-700 mb-1">Rating</label>
                    <div className="flex gap-1">
                      {[1,2,3,4,5].map(n => (
                        <button key={n} type="button" onClick={() => setReviewForm(f => ({ ...f, rating: n }))}
                          className={`text-2xl transition-colors ${n <= reviewForm.rating ? 'text-yellow-400' : 'text-gray-200 hover:text-yellow-300'}`}>
                          ★
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-wood-700 mb-1">Title</label>
                    <input value={reviewForm.title} onChange={e => setReviewForm(f => ({ ...f, title: e.target.value }))} required
                      className="w-full border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-primary" placeholder="Review title" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-wood-700 mb-1">Comment</label>
                    <textarea value={reviewForm.comment} onChange={e => setReviewForm(f => ({ ...f, comment: e.target.value }))} required rows={4}
                      className="w-full border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-primary resize-none" placeholder="Your experience..." />
                  </div>
                  <button type="submit" disabled={submitting} className="btn-primary w-full py-3 disabled:opacity-50">
                    {submitting ? 'Submitting...' : 'Submit Review'}
                  </button>
                </form>
              ) : (
                <div className="bg-wood-50 p-6 text-center rounded-sm">
                  <p className="text-wood-500 mb-4">Please login to leave a review</p>
                  <Link href="/login" className="btn-primary">Login</Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
