'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';
import {
  Heart, LayoutDashboard, Users, UserCog, Calendar, FileText,
  Bell, Activity, LogOut, Stethoscope, ClipboardList, PillBottle
} from 'lucide-react';

const adminNav = [
  { section: 'Overview', items: [{ href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard }] },
  { section: 'Management', items: [
    { href: '/admin/doctors', label: 'Doctors', icon: Stethoscope },
    { href: '/admin/patients', label: 'Patients', icon: Users },
    { href: '/admin/appointments', label: 'Appointments', icon: Calendar },
    { href: '/admin/prescriptions', label: 'Prescriptions', icon: FileText },
  ]},
  { section: 'System', items: [{ href: '/admin/notifications', label: 'Notifications', icon: Bell }] },
];

const doctorNav = [
  { section: 'Overview', items: [{ href: '/doctor/dashboard', label: 'Dashboard', icon: LayoutDashboard }] },
  { section: 'Clinical', items: [
    { href: '/doctor/appointments', label: 'Appointments', icon: Calendar },
    { href: '/doctor/patients', label: 'My Patients', icon: Users },
    { href: '/doctor/prescriptions', label: 'Prescriptions', icon: ClipboardList },
  ]},
  { section: 'Account', items: [{ href: '/doctor/notifications', label: 'Notifications', icon: Bell }] },
];

const patientNav = [
  { section: 'Overview', items: [{ href: '/patient/dashboard', label: 'Dashboard', icon: LayoutDashboard }] },
  { section: 'Healthcare', items: [
    { href: '/patient/appointments', label: 'My Appointments', icon: Calendar },
    { href: '/patient/treatments', label: 'Treatments', icon: Activity },
    { href: '/patient/prescriptions', label: 'Prescriptions', icon: FileText },
  ]},
  { section: 'Account', items: [{ href: '/patient/notifications', label: 'Notifications', icon: Bell }] },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const nav = user?.role === 'admin' ? adminNav : user?.role === 'doctor' ? doctorNav : patientNav;

  const initials = user?.name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'U';

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg,#0a6ebd,#00b4d8)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Heart size={18} color="white" fill="white" />
        </div>
        <span>HL<em>App</em></span>
      </div>

      <div className="sidebar-nav">
        {nav.map(section => (
          <div key={section.section}>
            <div className="nav-section-title">{section.section}</div>
            {section.items.map(item => {
              const Icon = item.icon;
              const active = pathname === item.href || pathname.startsWith(item.href + '/');
              return (
                <Link key={item.href} href={item.href} className={`nav-item ${active ? 'active' : ''}`}>
                  <Icon size={18} />
                  {item.label}
                </Link>
              );
            })}
          </div>
        ))}
      </div>

      {/* User info at bottom */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px 20px', borderTop: '1px solid rgba(255,255,255,0.08)', background: 'rgba(0,0,0,0.2)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <div className="avatar" style={{ width: 34, height: 34, fontSize: 12 }}>{initials}</div>
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'white', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.name}</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', textTransform: 'capitalize' }}>{user?.role}</div>
          </div>
        </div>
        <button onClick={logout} className="nav-item" style={{ width: '100%', padding: '8px 0', justifyContent: 'center', gap: 8, color: '#ef476f', borderLeft: 'none' }}>
          <LogOut size={15} /> Sign Out
        </button>
      </div>
    </div>
  );
}
