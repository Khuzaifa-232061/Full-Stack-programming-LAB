'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { register } from '@/lib/api';
import { useAuthStore } from '@/store';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const router = useRouter();
  const { setAuth } = useAuthStore();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) return toast.error('Passwords do not match');
    setLoading(true);
    try {
      const res = await register({ name: form.name, email: form.email, password: form.password });
      setAuth(res.data.data, res.data.token);
      toast.success('Account created!');
      router.push('/');
    } catch (err) { toast.error(err.response?.data?.message || 'Registration failed'); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-heading font-bold text-wood-800 mb-2">Create Account</h1>
          <p className="text-wood-400">Join the Rustik Plank family</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-white border border-wood-100 rounded-sm p-8 shadow-sm space-y-5">
          {[['name','Full Name','text','John Doe'],['email','Email','email','you@example.com'],['password','Password','password','••••••••'],['confirm','Confirm Password','password','••••••••']].map(([key, label, type, ph]) => (
            <div key={key}>
              <label className="block text-sm font-bold text-wood-700 mb-1.5">{label}</label>
              <input type={type} value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} required
                placeholder={ph} className="w-full border border-gray-200 px-4 py-3 text-sm outline-none focus:border-primary transition-colors" />
            </div>
          ))}
          <button type="submit" disabled={loading} className="btn-primary w-full py-3 text-base disabled:opacity-60">
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
        <p className="text-center text-sm text-wood-500 mt-6">
          Already have an account? <Link href="/login" className="text-primary font-bold hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
