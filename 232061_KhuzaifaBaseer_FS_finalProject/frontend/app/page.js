'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../lib/AuthContext';

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) { router.replace('/auth/login'); return; }
      if (user.role === 'admin') router.replace('/admin/dashboard');
      else if (user.role === 'doctor') router.replace('/doctor/dashboard');
      else router.replace('/patient/dashboard');
    }
  }, [user, loading, router]);

  return (
    <div className="loading-spinner" style={{ height: '100vh' }}>
      <div className="spinner" />
    </div>
  );
}
