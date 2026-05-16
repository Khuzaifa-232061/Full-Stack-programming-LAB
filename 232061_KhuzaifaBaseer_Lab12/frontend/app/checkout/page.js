'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCartStore, useAuthStore } from '@/store';
import { createOrder } from '@/lib/api';
import toast from 'react-hot-toast';
import { FaLock } from 'react-icons/fa';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || '', street: '', city: '', state: '', country: 'United Kingdom',
    zipCode: '', phone: '', paymentMethod: 'cod', notes: '',
  });

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal >= 200 ? 0 : 15;
  const total = subtotal + shipping;

  const update = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return router.push('/login');
    if (items.length === 0) return toast.error('Cart is empty');
    setSubmitting(true);
    try {
      const orderData = {
        items: items.map(i => ({ product: i._id, name: i.name, price: i.price, quantity: i.qty, image: i.images?.[0] })),
        shippingAddress: { name: form.name, street: form.street, city: form.city, state: form.state, country: form.country, zipCode: form.zipCode, phone: form.phone },
        paymentMethod: form.paymentMethod,
        subtotal, shippingCost: shipping, total, notes: form.notes,
      };
      const res = await createOrder(orderData);
      clearCart();
      toast.success('Order placed successfully!');
      router.push(`/account/orders`);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Order failed');
    } finally { setSubmitting(false); }
  };

  if (!user) return (
    <div className="container mx-auto px-4 max-w-lg py-24 text-center">
      <h2 className="text-2xl font-heading font-bold text-wood-800 mb-4">Please login to checkout</h2>
      <Link href="/login" className="btn-primary px-10 py-3">Login</Link>
    </div>
  );

  return (
    <div className="container mx-auto px-4 max-w-7xl py-10">
      <h1 className="text-3xl font-heading font-bold text-wood-800 mb-8 flex items-center gap-3">
        <FaLock className="text-primary text-2xl" /> Secure Checkout
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Shipping */}
            <div className="bg-white border border-wood-100 rounded-sm p-6">
              <h2 className="font-heading font-bold text-xl text-wood-800 mb-6">Shipping Address</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[['name','Full Name','Full Name', 'col-span-2'], ['phone','Phone','Phone Number','col-span-2'], ['street','Street','Street Address','col-span-2'],
                  ['city','City','City',''], ['state','State / County','State',''], ['zipCode','Postcode','Postcode',''], ['country','Country','Country','col-span-2']
                ].map(([name, label, placeholder, extra]) => (
                  <div key={name} className={extra}>
                    <label className="block text-sm font-bold text-wood-700 mb-1">{label} *</label>
                    <input name={name} value={form[name]} onChange={update} placeholder={placeholder} required
                      className="w-full border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-primary transition-colors" />
                  </div>
                ))}
              </div>
            </div>

            {/* Payment */}
            <div className="bg-white border border-wood-100 rounded-sm p-6">
              <h2 className="font-heading font-bold text-xl text-wood-800 mb-6">Payment Method</h2>
              <div className="space-y-3">
                {[['cod','Cash on Delivery','Pay when your order arrives'], ['card','Credit/Debit Card','Visa, Mastercard, Amex'], ['paypal','PayPal','Pay securely with PayPal']].map(([val, label, sub]) => (
                  <label key={val} className={`flex items-center gap-4 p-4 border rounded-sm cursor-pointer transition-colors ${form.paymentMethod === val ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-wood-300'}`}>
                    <input type="radio" name="paymentMethod" value={val} checked={form.paymentMethod === val} onChange={update} className="accent-primary" />
                    <div>
                      <p className="font-bold text-wood-800 text-sm">{label}</p>
                      <p className="text-xs text-wood-400">{sub}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div className="bg-white border border-wood-100 rounded-sm p-6">
              <h2 className="font-heading font-bold text-xl text-wood-800 mb-4">Order Notes</h2>
              <textarea name="notes" value={form.notes} onChange={update} rows={3} placeholder="Special instructions for delivery..."
                className="w-full border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-primary resize-none" />
            </div>
          </div>

          {/* Summary */}
          <div>
            <div className="bg-wood-50 p-6 border border-wood-100 rounded-sm sticky top-28">
              <h2 className="font-heading font-bold text-xl text-wood-800 mb-6">Order Summary</h2>
              <div className="space-y-3 mb-6 max-h-60 overflow-y-auto">
                {items.map(item => (
                  <div key={item._id} className="flex items-center gap-3">
                    <img src={item.images?.[0]} alt={item.name} className="w-12 h-12 object-cover rounded-sm bg-wood-100 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-wood-700 truncate">{item.name}</p>
                      <p className="text-xs text-wood-400">x{item.qty}</p>
                    </div>
                    <span className="text-sm font-bold text-wood-700">£{(item.price * item.qty).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-wood-200 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-wood-500">Subtotal</span>
                  <span className="font-bold">£{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-wood-500">Shipping</span>
                  <span className={`font-bold ${shipping === 0 ? 'text-green-600' : ''}`}>{shipping === 0 ? 'FREE' : `£${shipping.toFixed(2)}`}</span>
                </div>
                <div className="border-t border-wood-200 pt-2 flex justify-between">
                  <span className="font-black text-wood-800">Total</span>
                  <span className="font-black text-xl text-primary">£{total.toFixed(2)}</span>
                </div>
              </div>
              <button type="submit" disabled={submitting || items.length === 0}
                className="btn-primary w-full py-4 mt-6 text-base flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                <FaLock className="text-sm" />
                {submitting ? 'Placing Order...' : 'Place Order'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
