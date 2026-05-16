'use client';
import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store';
import { useRouter } from 'next/navigation';
import { getAllOrders, updateOrderStatus } from '@/lib/api';
import toast from 'react-hot-toast';

const statusColors = { pending:'bg-yellow-100 text-yellow-700',confirmed:'bg-blue-100 text-blue-700',processing:'bg-purple-100 text-purple-700',shipped:'bg-indigo-100 text-indigo-700',delivered:'bg-green-100 text-green-700',cancelled:'bg-red-100 text-red-700' };

export default function AdminOrdersPage() {
  const { user } = useAuthStore();
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== 'admin') { router.push('/'); return; }
    getAllOrders().then(r => setOrders(r.data.data)).finally(() => setLoading(false));
  }, [user]);

  const handleStatus = async (id, status) => {
    try {
      await updateOrderStatus(id, status);
      setOrders(orders.map(o => o._id === id ? { ...o, orderStatus: status } : o));
      toast.success('Status updated');
    } catch { toast.error('Failed to update'); }
  };

  if (loading) return <div className="text-center py-20 text-wood-400">Loading orders...</div>;

  return (
    <div className="container mx-auto px-4 max-w-7xl py-10">
      <h1 className="text-3xl font-heading font-bold text-wood-800 mb-8">All Orders ({orders.length})</h1>
      <div className="bg-white border border-wood-100 rounded-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-wood-50">
              <tr>{['ID','Customer','Items','Total','Payment','Status','Date','Update Status'].map(h => <th key={h} className="px-4 py-3 text-left text-xs font-bold text-wood-600 uppercase tracking-widest whitespace-nowrap">{h}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-wood-50">
              {orders.map(order => (
                <tr key={order._id} className="hover:bg-wood-50 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-wood-500">{order._id.slice(-8).toUpperCase()}</td>
                  <td className="px-4 py-3">
                    <p className="font-semibold text-wood-800">{order.user?.name}</p>
                    <p className="text-xs text-wood-400">{order.user?.email}</p>
                  </td>
                  <td className="px-4 py-3 text-wood-500">{order.items.length}</td>
                  <td className="px-4 py-3 font-bold text-primary">£{order.total.toFixed(2)}</td>
                  <td className="px-4 py-3 capitalize text-wood-500">{order.paymentMethod}</td>
                  <td className="px-4 py-3"><span className={`text-xs font-bold px-2 py-1 rounded-full ${statusColors[order.orderStatus]}`}>{order.orderStatus}</span></td>
                  <td className="px-4 py-3 text-wood-400 whitespace-nowrap">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-3">
                    <select value={order.orderStatus} onChange={e => handleStatus(order._id, e.target.value)}
                      className="border border-gray-200 px-2 py-1 text-xs outline-none focus:border-primary rounded-sm">
                      {['pending','confirmed','processing','shipped','delivered','cancelled'].map(s => <option key={s} value={s} className="capitalize">{s}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
