'use client';
import { useEffect, useState } from 'react';
import { Bell } from 'lucide-react';
import { notificationAPI } from '@/lib/api';
import { useAuth } from '@/lib/AuthContext';
import Link from 'next/link';

export default function Topbar({ title, subtitle }) {
  const { user } = useAuth();
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await notificationAPI.getUnreadCount();
        setUnread(data.count);
      } catch {}
    };
    fetch();
    const interval = setInterval(fetch, 30000);
    return () => clearInterval(interval);
  }, []);

  const notifHref = `/${user?.role}/notifications`;

  return (
    <div className="page-header">
      <div>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: 'var(--dark)' }}>{title}</h1>
        {subtitle && <p style={{ fontSize: 13, color: 'var(--gray)', marginTop: 2 }}>{subtitle}</p>}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Link href={notifHref}>
          <div className="notif-btn">
            <Bell size={18} color="var(--gray)" />
            {unread > 0 && <span className="notif-badge">{unread > 9 ? '9+' : unread}</span>}
          </div>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div className="avatar">
            {user?.name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--dark)' }}>{user?.name}</div>
            <div style={{ fontSize: 11, color: 'var(--gray)', textTransform: 'capitalize' }}>{user?.role}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
