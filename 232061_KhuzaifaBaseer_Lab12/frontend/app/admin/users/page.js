'use client';
import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store';
import { useRouter } from 'next/navigation';
import { getAllUsers } from '@/lib/api';

export default function AdminUsersPage() {
  const { user } = useAuthStore();
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== 'admin') { router.push('/'); return; }
    getAllUsers().then(r => setUsers(r.data.data)).finally(() => setLoading(false));
  }, [user]);

  if (loading) return <div className="text-center py-20 text-wood-400">Loading...</div>;

  return (
    <div className="container mx-auto px-4 max-w-5xl py-10">
      <h1 className="text-3xl font-heading font-bold text-wood-800 mb-8">Users ({users.length})</h1>
      <div className="bg-white border border-wood-100 rounded-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-wood-50">
            <tr>{['Name','Email','Role','Joined'].map(h => <th key={h} className="px-4 py-3 text-left text-xs font-bold text-wood-600 uppercase tracking-widest">{h}</th>)}</tr>
          </thead>
          <tbody className="divide-y divide-wood-50">
            {users.map(u => (
              <tr key={u._id} className="hover:bg-wood-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                      {u.name[0].toUpperCase()}
                    </div>
                    <span className="font-semibold text-wood-800">{u.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-wood-500">{u.email}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${u.role === 'admin' ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-600'}`}>{u.role}</span>
                </td>
                <td className="px-4 py-3 text-wood-400">{new Date(u.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
