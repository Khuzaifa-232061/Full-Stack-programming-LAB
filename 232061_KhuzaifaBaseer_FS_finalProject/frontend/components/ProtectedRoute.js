'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';

export default function ProtectedRoute({ children, roles }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) { router.replace('/auth/login'); return; }
      if (roles && !roles.includes(user.role)) {
        router.replace(`/${user.role}/dashboard`);
      }
    }
  }, [user, loading, roles, router]);

  if (loading || !user) {
    return <div className="loading-spinner" style={{ height: '100vh' }}><div className="spinner" /></div>;
  }

  return children;
}
