'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { authAPI } from '@/lib/api';
import { useAuth } from '@/lib/AuthContext';
import { Heart, User, Mail, Lock, Phone, UserCheck } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '', role: 'patient', phone: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirmPassword) { setError('Passwords do not match.'); return; }
    if (form.password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    setLoading(true);
    try {
      const { data } = await authAPI.register({ name: form.name, email: form.email, password: form.password, role: form.role, phone: form.phone });
      login(data.token, data.user);
      toast.success('Account created successfully!');
      router.replace(data.user.role === 'doctor' ? '/doctor/dashboard' : '/patient/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
    } finally { setLoading(false); }
  };

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 32 }}>
            <div style={{ width: 52, height: 52, background: 'linear-gradient(135deg,#0a6ebd,#00b4d8)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Heart size={26} color="white" fill="white" />
            </div>
            <span style={{ fontFamily: 'Sora,sans-serif', fontSize: 26, fontWeight: 800, color: 'white' }}>HL<em style={{ color: '#00b4d8', fontStyle: 'normal' }}>App</em></span>
          </div>
          <h1 style={{ fontFamily: 'Sora,sans-serif', fontSize: 30, fontWeight: 800, color: 'white', marginBottom: 16 }}>Join HLApp<br />Today</h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 15, lineHeight: 1.8, maxWidth: 300, margin: '0 auto' }}>
            Create your account and get access to world-class healthcare management at your fingertips.
          </p>
        </div>
      </div>
      <div className="auth-right">
        <div className="auth-form-box">
          <h2 className="auth-title">Create Account</h2>
          <p className="auth-subtitle">Fill in your details to get started</p>
          {error && <div className="alert alert-error">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <div style={{ position: 'relative' }}>
                  <User size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                  <input className="form-control" style={{ paddingLeft: 36 }} placeholder="John Doe" value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })} required />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Phone</label>
                <div style={{ position: 'relative' }}>
                  <Phone size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                  <input className="form-control" style={{ paddingLeft: 36 }} placeholder="0300-1234567" value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })} />
                </div>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input className="form-control" style={{ paddingLeft: 36 }} type="email" placeholder="you@example.com" value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })} required />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Register As</label>
              <div style={{ position: 'relative' }}>
                <UserCheck size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <select className="form-control" style={{ paddingLeft: 36 }} value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
                  <option value="patient">Patient</option>
                  <option value="doctor">Doctor</option>
                </select>
              </div>
            </div>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Password</label>
                <div style={{ position: 'relative' }}>
                  <Lock size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                  <input className="form-control" style={{ paddingLeft: 36 }} type="password" placeholder="Min 6 chars" value={form.password}
                    onChange={e => setForm({ ...form, password: e.target.value })} required />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Confirm Password</label>
                <div style={{ position: 'relative' }}>
                  <Lock size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                  <input className="form-control" style={{ paddingLeft: 36 }} type="password" placeholder="Repeat password" value={form.confirmPassword}
                    onChange={e => setForm({ ...form, confirmPassword: e.target.value })} required />
                </div>
              </div>
            </div>
            <button className="btn btn-primary btn-lg" type="submit" disabled={loading} style={{ width: '100%', justifyContent: 'center', marginTop: 4 }}>
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>
          <p style={{ textAlign: 'center', marginTop: 20, fontSize: 14, color: '#64748b' }}>
            Already have an account? <Link href="/auth/login" style={{ color: 'var(--primary)', fontWeight: 600 }}>Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
