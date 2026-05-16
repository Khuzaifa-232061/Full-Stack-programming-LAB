'use client';
import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store';
import { updateProfile } from '@/lib/api';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function ProfilePage() {
  const { user, setAuth, token } = useAuthStore();
  const router = useRouter();
  const [form, setForm] = useState({ name: '', phone: '', address: { street: '', city: '', country: '' } });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) { router.push('/login'); return; }
    setForm({ name: user.name || '', phone: user.phone || '', address: user.address || { street: '', city: '', country: '' } });
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await updateProfile(form);
      setAuth(res.data.data, token);
      toast.success('Profile updated!');
    } catch { toast.error('Update failed'); }
    finally { setLoading(false); }
  };

  return (
    <div className="container mx-auto px-4 max-w-2xl py-10">
      <h1 className="text-3xl font-heading font-bold text-wood-800 mb-8">My Profile</h1>
      <form onSubmit={handleSubmit} className="bg-white border border-wood-100 rounded-sm p-8 space-y-5">
        <div>
          <label className="block text-sm font-bold text-wood-700 mb-1.5">Full Name</label>
          <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="w-full border border-gray-200 px-4 py-3 text-sm outline-none focus:border-primary" />
        </div>
        <div>
          <label className="block text-sm font-bold text-wood-700 mb-1.5">Email</label>
          <input value={user?.email || ''} disabled className="w-full border border-gray-100 px-4 py-3 text-sm bg-wood-50 text-wood-400 cursor-not-allowed" />
        </div>
        <div>
          <label className="block text-sm font-bold text-wood-700 mb-1.5">Phone</label>
          <input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} className="w-full border border-gray-200 px-4 py-3 text-sm outline-none focus:border-primary" />
        </div>
        <div>
          <label className="block text-sm font-bold text-wood-700 mb-1.5">Street Address</label>
          <input value={form.address?.street || ''} onChange={e => setForm(f => ({ ...f, address: { ...f.address, street: e.target.value } }))} className="w-full border border-gray-200 px-4 py-3 text-sm outline-none focus:border-primary" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-wood-700 mb-1.5">City</label>
            <input value={form.address?.city || ''} onChange={e => setForm(f => ({ ...f, address: { ...f.address, city: e.target.value } }))} className="w-full border border-gray-200 px-4 py-3 text-sm outline-none focus:border-primary" />
          </div>
          <div>
            <label className="block text-sm font-bold text-wood-700 mb-1.5">Country</label>
            <input value={form.address?.country || ''} onChange={e => setForm(f => ({ ...f, address: { ...f.address, country: e.target.value } }))} className="w-full border border-gray-200 px-4 py-3 text-sm outline-none focus:border-primary" />
          </div>
        </div>
        <button type="submit" disabled={loading} className="btn-primary w-full py-3 disabled:opacity-60">
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}
