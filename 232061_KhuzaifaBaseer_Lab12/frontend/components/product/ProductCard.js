'use client';
import Link from 'next/link';
import Image from 'next/image';
import { FaShoppingCart, FaStar, FaHeart } from 'react-icons/fa';
import { useCartStore } from '@/store';
import toast from 'react-hot-toast';

export default function ProductCard({ product }) {
  const { addItem } = useCartStore();

  const handleAdd = (e) => {
    e.preventDefault();
    addItem(product);
    toast.success(`${product.name} added to cart!`);
  };

  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : null;

  return (
    <div className="group bg-white border border-gray-100 rounded-sm card-hover overflow-hidden">
      <Link href={`/products/${product._id}`}>
        <div className="relative overflow-hidden bg-wood-50 aspect-[4/3]">
          <img
            src={product.images?.[0] || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400'}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.isNew && <span className="bg-green-500 text-white text-xs px-2 py-0.5 font-bold uppercase">New</span>}
            {discount && <span className="bg-primary text-white text-xs px-2 py-0.5 font-bold">-{discount}%</span>}
            {product.isSpecial && !discount && <span className="bg-blue-500 text-white text-xs px-2 py-0.5 font-bold uppercase">Special</span>}
          </div>
          {/* Wishlist */}
          <button className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:text-primary shadow">
            <FaHeart className="text-sm" />
          </button>
          {/* Add to cart overlay */}
          <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button onClick={handleAdd} className="w-full bg-primary text-white py-2.5 text-sm font-bold uppercase tracking-wide hover:bg-primary-dark flex items-center justify-center gap-2">
              <FaShoppingCart /> Add to Cart
            </button>
          </div>
        </div>

        <div className="p-4">
          <p className="text-xs text-primary uppercase tracking-wide font-semibold mb-1">
            {product.category?.name || 'Furniture'}
          </p>
          <h3 className="font-heading font-semibold text-wood-800 text-base leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {product.name}
          </h3>
          {/* Stars */}
          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className={`text-xs ${i < Math.round(product.rating) ? 'text-yellow-400' : 'text-gray-200'}`} />
            ))}
            <span className="text-xs text-gray-400 ml-1">({product.numReviews})</span>
          </div>
          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-wood-800">£{product.price.toFixed(2)}</span>
            {product.oldPrice && (
              <span className="text-sm text-gray-400 line-through">£{product.oldPrice.toFixed(2)}</span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
