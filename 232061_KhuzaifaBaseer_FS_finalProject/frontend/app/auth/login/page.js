'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { authAPI } from '@/lib/api';
import { useAuth } from '@/lib/AuthContext';
import { Heart, Mail, Lock, Eye, EyeOff, Activity, Shield, Users } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await authAPI.login(form);
      login(data.token, data.user);
      toast.success(`Welcome back, ${data.user.name}!`);
      const dest = data.user.role === 'admin' ? '/admin/dashboard' : data.user.role === 'doctor' ? '/doctor/dashboard' : '/patient/dashboard';
      router.replace(dest);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally { setLoading(false); }
  };

  const quickLogin = (email, password) => setForm({ email, password });

  return (
    <div className="auth-page">
      {/* Left Panel */}
      <div className="auth-left">
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 40 }}>
            <div style={{ width: 52, height: 52, background: 'linear-gradient(135deg,#0a6ebd,#00b4d8)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Heart size={26} color="white" fill="white" />
            </div>
            <span style={{ fontFamily: 'Sora,sans-serif', fontSize: 26, fontWeight: 800, color: 'white' }}>HL<em style={{ color: '#00b4d8', fontStyle: 'normal' }}>App</em></span>
          </div>
          <h1 style={{ fontFamily: 'Sora,sans-serif', fontSize: 32, fontWeight: 800, color: 'white', marginBottom: 16 }}>Healthcare<br />Made Simple</h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 15, lineHeight: 1.7, maxWidth: 320, margin: '0 auto 48px' }}>
            Book appointments, track treatments, manage prescriptions — all in one place.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, textAlign: 'left' }}>
            {[
              { icon: <Shield size={18} />, label: 'Secure JWT Authentication', color: '#06d6a0' },
              { icon: <Activity size={18} />, label: 'Real-time Treatment Tracking', color: '#00b4d8' },
              { icon: <Users size={18} />, label: 'Multi-Role Access Control', color: '#ffd166' },
            ].map((f, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'rgba(255,255,255,0.06)', borderRadius: 10, padding: '12px 16px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <span style={{ color: f.color }}>{f.icon}</span>
                <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: 14, fontWeight: 500 }}>{f.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="auth-right">
        <div className="auth-form-box">
          <h2 className="auth-title">Welcome Back</h2>
          <p className="auth-subtitle">Sign in to your HLApp account</p>

          {error && <div className="alert alert-error"><Shield size={16} />{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input className="form-control" style={{ paddingLeft: 38 }} type="email" placeholder="you@example.com"
                  value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input className="form-control" style={{ paddingLeft: 38, paddingRight: 40 }} type={showPw ? 'text' : 'password'}
                  placeholder="Enter password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}>
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <button className="btn btn-primary btn-lg" type="submit" disabled={loading} style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: 24, fontSize: 14, color: '#64748b' }}>
            Don't have an account? <Link href="/auth/register" style={{ color: 'var(--primary)', fontWeight: 600 }}>Register here</Link>
          </p>

          {/* Quick Login Buttons */}
          <div style={{ marginTop: 28, padding: 16, background: '#f8fafc', borderRadius: 10, border: '1px solid var(--border)' }}>
            <p style={{ fontSize: 12, color: '#94a3b8', textAlign: 'center', marginBottom: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Quick Demo Login</p>
            <div style={{ display: 'flex', gap: 8 }}>
              {[
                { label: 'Admin', email: 'admin@hlapp.com', pw: 'Admin@123', color: 'var(--primary)' },
                { label: 'Doctor', email: 'ahmed.raza@hlapp.com', pw: 'Doctor@123', color: '#16a34a' },
                { label: 'Patient', email: 'arif@patient.com', pw: 'Patient@123', color: '#ea580c' },
              ].map(d => (
                <button key={d.label} onClick={() => quickLogin(d.email, d.pw)}
                  style={{ flex: 1, padding: '7px 4px', borderRadius: 8, border: `1px solid ${d.color}30`, background: `${d.color}10`, color: d.color, fontSize: 12, fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s' }}>
                  {d.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
