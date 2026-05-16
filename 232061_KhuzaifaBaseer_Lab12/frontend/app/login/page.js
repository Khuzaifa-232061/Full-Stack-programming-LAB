'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { login } from '@/lib/api';
import { useAuthStore } from '@/store';
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function LoginPage() {
  const router = useRouter();
  const { setAuth } = useAuthStore();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await login(form);
      setAuth(res.data.data, res.data.token);
      toast.success(`Welcome back, ${res.data.data.name}!`);
      router.push(res.data.data.role === 'admin' ? '/admin' : '/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-heading font-bold text-wood-800 mb-2">Welcome Back</h1>
          <p className="text-wood-400">Sign in to your Rustik Plank account</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-white border border-wood-100 rounded-sm p-8 shadow-sm space-y-5">
          <div>
            <label className="block text-sm font-bold text-wood-700 mb-1.5">Email Address</label>
            <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required
              placeholder="you@example.com" className="w-full border border-gray-200 px-4 py-3 text-sm outline-none focus:border-primary transition-colors" />
          </div>
          <div>
            <label className="block text-sm font-bold text-wood-700 mb-1.5">Password</label>
            <div className="relative">
              <input type={showPw ? 'text' : 'password'} value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} required
                placeholder="••••••••" className="w-full border border-gray-200 px-4 py-3 text-sm outline-none focus:border-primary transition-colors pr-12" />
              <button type="button" onClick={() => setShowPw(s => !s)} className="absolute right-4 top-1/2 -translate-y-1/2 text-wood-400 hover:text-primary">
                {showPw ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full py-3 text-base disabled:opacity-60">
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
          <div className="bg-wood-50 rounded-sm p-3 text-xs text-wood-500">
            <p className="font-bold mb-1">Demo Credentials:</p>
            <p>Admin: admin@rustikplank.com / admin123</p>
            <p>User: john@example.com / user123</p>
          </div>
        </form>
        <p className="text-center text-sm text-wood-500 mt-6">
          Don't have an account? <Link href="/register" className="text-primary font-bold hover:underline">Create one</Link>
        </p>
      </div>
    </div>
  );
}
