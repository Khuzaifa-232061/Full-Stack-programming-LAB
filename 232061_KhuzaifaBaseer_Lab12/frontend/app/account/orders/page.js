'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getMyOrders, cancelOrder } from '@/lib/api';
import { useAuthStore } from '@/store';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const statusColors = { pending: 'bg-yellow-100 text-yellow-700', confirmed: 'bg-blue-100 text-blue-700', processing: 'bg-purple-100 text-purple-700', shipped: 'bg-indigo-100 text-indigo-700', delivered: 'bg-green-100 text-green-700', cancelled: 'bg-red-100 text-red-700' };

export default function OrdersPage() {
  const { user } = useAuthStore();
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { router.push('/login'); return; }
    getMyOrders().then(r => setOrders(r.data.data)).finally(() => setLoading(false));
  }, [user]);

  const handleCancel = async (id) => {
    try {
      await cancelOrder(id);
      setOrders(orders.map(o => o._id === id ? { ...o, orderStatus: 'cancelled' } : o));
      toast.success('Order cancelled');
    } catch { toast.error('Cannot cancel this order'); }
  };

  if (loading) return <div className="container mx-auto px-4 py-20 text-center text-wood-400">Loading orders...</div>;

  return (
    <div className="container mx-auto px-4 max-w-5xl py-10">
      <h1 className="text-3xl font-heading font-bold text-wood-800 mb-8">My Orders</h1>
      {orders.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-wood-400 text-lg mb-4">No orders yet</p>
          <Link href="/shop" className="btn-primary">Start Shopping</Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map(order => (
            <div key={order._id} className="bg-white border border-wood-100 rounded-sm overflow-hidden">
              <div className="bg-wood-50 px-6 py-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs text-wood-400 font-bold uppercase tracking-widest">Order ID</p>
                  <p className="font-mono text-sm text-wood-700">{order._id.slice(-8).toUpperCase()}</p>
                </div>
                <div>
                  <p className="text-xs text-wood-400 font-bold uppercase tracking-widest">Date</p>
                  <p className="text-sm text-wood-700">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-xs text-wood-400 font-bold uppercase tracking-widest">Total</p>
                  <p className="text-sm font-black text-primary">£{order.total.toFixed(2)}</p>
                </div>
                <div>
                  <span className={`text-xs font-bold uppercase px-3 py-1 rounded-full ${statusColors[order.orderStatus]}`}>
                    {order.orderStatus}
                  </span>
                </div>
                {['pending','confirmed'].includes(order.orderStatus) && (
                  <button onClick={() => handleCancel(order._id)} className="text-xs text-red-500 hover:text-red-700 font-bold border border-red-200 px-3 py-1 hover:border-red-400 transition-colors">
                    Cancel
                  </button>
                )}
              </div>
              <div className="px-6 py-4">
                <div className="space-y-3">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded-sm bg-wood-50 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm font-bold text-wood-700">{item.name}</p>
                        <p className="text-xs text-wood-400">Qty: {item.quantity} × £{item.price.toFixed(2)}</p>
                      </div>
                      <span className="text-sm font-bold text-wood-700">£{(item.quantity * item.price).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
