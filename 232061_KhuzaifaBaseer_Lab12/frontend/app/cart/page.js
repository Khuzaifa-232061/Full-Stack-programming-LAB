'use client';
import { useCartStore } from '@/store';
import Link from 'next/link';
import { FaTrash, FaMinus, FaPlus, FaShoppingBag, FaArrowRight } from 'react-icons/fa';

export default function CartPage() {
  const { items, removeItem, updateQty, clearCart } = useCartStore();
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal >= 200 ? 0 : 15;
  const total = subtotal + shipping;

  if (items.length === 0) return (
    <div className="container mx-auto px-4 max-w-7xl py-24 text-center">
      <FaShoppingBag className="text-6xl text-wood-200 mx-auto mb-6" />
      <h2 className="text-2xl font-heading font-bold text-wood-700 mb-3">Your cart is empty</h2>
      <p className="text-wood-400 mb-8">Discover our handcrafted furniture collection</p>
      <Link href="/shop" className="btn-primary px-10 py-3 text-base">Start Shopping</Link>
    </div>
  );

  return (
    <div className="container mx-auto px-4 max-w-7xl py-10">
      <h1 className="text-3xl font-heading font-bold text-wood-800 mb-8">Shopping Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Items */}
        <div className="lg:col-span-2">
          <div className="bg-wood-50 px-4 py-3 grid grid-cols-12 text-xs font-bold text-wood-600 uppercase tracking-widest mb-4 hidden md:grid">
            <span className="col-span-6">Product</span>
            <span className="col-span-2 text-center">Price</span>
            <span className="col-span-2 text-center">Qty</span>
            <span className="col-span-2 text-right">Total</span>
          </div>
          <div className="space-y-4">
            {items.map(item => (
              <div key={item._id} className="bg-white border border-wood-100 p-4 grid grid-cols-12 gap-4 items-center">
                <div className="col-span-12 md:col-span-6 flex items-center gap-4">
                  <img src={item.images?.[0]} alt={item.name} className="w-20 h-20 object-cover rounded-sm flex-shrink-0 bg-wood-50" />
                  <div>
                    <Link href={`/products/${item._id}`} className="font-heading font-semibold text-wood-800 text-sm hover:text-primary transition-colors line-clamp-2">
                      {item.name}
                    </Link>
                    <p className="text-xs text-wood-400 mt-1">{item.category?.name}</p>
                    <button onClick={() => removeItem(item._id)} className="text-xs text-red-400 hover:text-red-600 flex items-center gap-1 mt-2">
                      <FaTrash className="text-xs" /> Remove
                    </button>
                  </div>
                </div>
                <div className="col-span-4 md:col-span-2 text-center">
                  <span className="text-sm font-bold text-wood-700">£{item.price.toFixed(2)}</span>
                </div>
                <div className="col-span-4 md:col-span-2 flex justify-center">
                  <div className="flex items-center border border-gray-200 rounded-sm overflow-hidden">
                    <button onClick={() => updateQty(item._id, item.qty - 1)} className="w-8 h-8 flex items-center justify-center text-wood-600 hover:bg-wood-50">
                      <FaMinus className="text-xs" />
                    </button>
                    <span className="w-8 text-center text-sm font-bold">{item.qty}</span>
                    <button onClick={() => updateQty(item._id, item.qty + 1)} className="w-8 h-8 flex items-center justify-center text-wood-600 hover:bg-wood-50">
                      <FaPlus className="text-xs" />
                    </button>
                  </div>
                </div>
                <div className="col-span-4 md:col-span-2 text-right">
                  <span className="text-sm font-bold text-primary">£{(item.price * item.qty).toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-6">
            <Link href="/shop" className="btn-outline text-sm">Continue Shopping</Link>
            <button onClick={clearCart} className="text-sm text-red-500 hover:text-red-700 font-bold flex items-center gap-2">
              <FaTrash /> Clear Cart
            </button>
          </div>
        </div>

        {/* Summary */}
        <div>
          <div className="bg-wood-50 p-6 border border-wood-100 rounded-sm">
            <h2 className="font-heading font-bold text-xl text-wood-800 mb-6">Order Summary</h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-wood-500">Subtotal ({items.reduce((s, i) => s + i.qty, 0)} items)</span>
                <span className="font-bold text-wood-700">£{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-wood-500">Shipping</span>
                <span className={`font-bold ${shipping === 0 ? 'text-green-600' : 'text-wood-700'}`}>
                  {shipping === 0 ? 'FREE' : `£${shipping.toFixed(2)}`}
                </span>
              </div>
              {shipping > 0 && <p className="text-xs text-wood-400">Free shipping on orders over £200</p>}
              <div className="border-t border-wood-200 pt-3 flex justify-between">
                <span className="font-bold text-wood-800">Total</span>
                <span className="font-black text-xl text-primary">£{total.toFixed(2)}</span>
              </div>
            </div>
            <Link href="/checkout" className="btn-primary w-full text-center py-4 flex items-center justify-center gap-2 text-base">
              Proceed to Checkout <FaArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
