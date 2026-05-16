'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/store';
import { useRouter } from 'next/navigation';
import { getAllOrders, getProducts, getAllUsers, getCategories } from '@/lib/api';
import { FaBox, FaShoppingBag, FaUsers, FaLayerGroup, FaArrowRight } from 'react-icons/fa';

const statusColors = { pending: 'bg-yellow-100 text-yellow-700', confirmed: 'bg-blue-100 text-blue-700', processing: 'bg-purple-100 text-purple-700', shipped: 'bg-indigo-100 text-indigo-700', delivered: 'bg-green-100 text-green-700', cancelled: 'bg-red-100 text-red-700' };

export default function AdminPage() {
  const { user } = useAuthStore();
  const router = useRouter();
  const [stats, setStats] = useState({ orders: 0, products: 0, users: 0, revenue: 0 });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { router.push('/login'); return; }
    if (user.role !== 'admin') { router.push('/'); return; }
    Promise.all([getAllOrders(), getProducts({ limit: 1 }), getAllUsers(), getCategories()])
      .then(([orders, prods, users]) => {
        const ords = orders.data.data;
        setRecentOrders(ords.slice(0, 5));
        const revenue = ords.filter(o => o.orderStatus !== 'cancelled').reduce((s, o) => s + o.total, 0);
        setStats({ orders: ords.length, products: prods.data.total, users: users.data.data.length, revenue });
      }).finally(() => setLoading(false));
  }, [user]);

  if (loading) return <div className="text-center py-20 text-wood-400">Loading dashboard...</div>;

  return (
    <div className="container mx-auto px-4 max-w-7xl py-10">
      <h1 className="text-3xl font-heading font-bold text-wood-800 mb-8">Admin Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          { icon: FaShoppingBag, label: 'Total Orders', val: stats.orders, color: 'text-blue-500', bg: 'bg-blue-50' },
          { icon: FaBox, label: 'Products', val: stats.products, color: 'text-green-500', bg: 'bg-green-50' },
          { icon: FaUsers, label: 'Users', val: stats.users, color: 'text-purple-500', bg: 'bg-purple-50' },
          { icon: FaLayerGroup, label: 'Revenue', val: `£${stats.revenue.toFixed(0)}`, color: 'text-primary', bg: 'bg-orange-50' },
        ].map(({ icon: Icon, label, val, color, bg }) => (
          <div key={label} className="bg-white border border-wood-100 rounded-sm p-6 flex items-center gap-4">
            <div className={`w-14 h-14 ${bg} rounded-full flex items-center justify-center flex-shrink-0`}>
              <Icon className={`text-2xl ${color}`} />
            </div>
            <div>
              <p className="text-xs text-wood-400 font-bold uppercase tracking-widest">{label}</p>
              <p className="text-2xl font-black text-wood-800">{val}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[['Products', '/admin/products'], ['Orders', '/admin/orders'], ['Users', '/admin/users'], ['Categories', '/admin/categories']].map(([label, href]) => (
          <Link key={href} href={href} className="bg-wood-800 text-white p-4 rounded-sm flex items-center justify-between group hover:bg-primary transition-colors">
            <span className="font-bold">{label}</span>
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white border border-wood-100 rounded-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-wood-100 flex justify-between items-center">
          <h2 className="font-heading font-bold text-xl text-wood-800">Recent Orders</h2>
          <Link href="/admin/orders" className="text-sm text-primary font-bold hover:underline">View All</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-wood-50">
              <tr>{['Order ID', 'Customer', 'Items', 'Total', 'Status', 'Date'].map(h => <th key={h} className="px-4 py-3 text-left text-xs font-bold text-wood-600 uppercase tracking-widest">{h}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-wood-50">
              {recentOrders.map(order => (
                <tr key={order._id} className="hover:bg-wood-50 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-wood-600">{order._id.slice(-8).toUpperCase()}</td>
                  <td className="px-4 py-3 font-semibold text-wood-700">{order.user?.name || 'N/A'}</td>
                  <td className="px-4 py-3 text-wood-500">{order.items.length} item(s)</td>
                  <td className="px-4 py-3 font-bold text-primary">£{order.total.toFixed(2)}</td>
                  <td className="px-4 py-3"><span className={`text-xs font-bold px-2 py-1 rounded-full ${statusColors[order.orderStatus]}`}>{order.orderStatus}</span></td>
                  <td className="px-4 py-3 text-wood-400">{new Date(order.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
