'use client';
import { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';
import ProtectedRoute from '@/components/ProtectedRoute';
import { notificationAPI } from '@/lib/api';
import toast from 'react-hot-toast';
import { Bell, CheckCheck, Trash2, Calendar, Pill, UserCheck, Info } from 'lucide-react';

const iconMap = {
  appointment_confirmed: <Calendar size={16} color="#16a34a" />,
  appointment_rejected: <Calendar size={16} color="#ef476f" />,
  appointment_reminder: <Calendar size={16} color="#0a6ebd" />,
  medication_reminder: <Pill size={16} color="#ea580c" />,
  followup_reminder: <UserCheck size={16} color="#9333ea" />,
  general: <Info size={16} color="#0a6ebd" />,
};

export default function NotificationsPage({ role }) {
  const [notifs, setNotifs] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try { const { data } = await notificationAPI.getAll(); setNotifs(data.data); }
    catch { toast.error('Failed to load notifications'); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const markRead = async (id) => {
    try { await notificationAPI.markRead(id); setNotifs(prev => prev.map(n => n._id === id ? { ...n, isRead: true } : n)); }
    catch {}
  };
  const markAll = async () => {
    try { await notificationAPI.markAllRead(); setNotifs(prev => prev.map(n => ({ ...n, isRead: true }))); toast.success('All marked as read.'); }
    catch { toast.error('Failed.'); }
  };
  const del = async (id) => {
    try { await notificationAPI.delete(id); setNotifs(prev => prev.filter(n => n._id !== id)); toast.success('Deleted.'); }
    catch { toast.error('Failed.'); }
  };

  const unreadCount = notifs.filter(n => !n.isRead).length;

  return (
    <ProtectedRoute roles={role ? [role] : ['admin','doctor','patient']}>
      <div className="app-layout">
        <Sidebar />
        <div className="main-content">
          <Topbar title="Notifications" subtitle="Stay updated on your healthcare" />
          <div className="page-content">
            <div className="card">
              <div className="card-header">
                <div>
                  <div className="section-title">All Notifications</div>
                  {unreadCount > 0 && <div className="section-sub">{unreadCount} unread</div>}
                </div>
                {unreadCount > 0 && (
                  <button className="btn btn-secondary" onClick={markAll}><CheckCheck size={15} /> Mark All Read</button>
                )}
              </div>
              <div style={{ padding: '0 8px' }}>
                {loading ? <div className="loading-spinner"><div className="spinner"/></div> : notifs.length === 0 ? (
                  <div className="empty-state"><Bell /><h3>No notifications</h3><p>You're all caught up!</p></div>
                ) : (
                  notifs.map(n => (
                    <div key={n._id} onClick={() => !n.isRead && markRead(n._id)}
                      style={{ display:'flex', alignItems:'flex-start', gap:14, padding:'16px 16px', borderBottom:'1px solid var(--border)', background: n.isRead ? 'transparent' : 'var(--primary-light)', cursor: n.isRead ? 'default' : 'pointer', transition:'background 0.2s' }}>
                      <div style={{ width:36, height:36, background:'var(--gray-light)', borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, border:'1px solid var(--border)' }}>
                        {iconMap[n.type] || <Bell size={16}/>}
                      </div>
                      <div style={{ flex:1 }}>
                        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
                          <div style={{ fontWeight: n.isRead ? 500 : 700, fontSize:14, color:'var(--dark)' }}>{n.title}</div>
                          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                            <span style={{ fontSize:11, color:'var(--gray)' }}>
                              {new Date(n.createdAt).toLocaleDateString('en-PK',{day:'numeric',month:'short'})}
                            </span>
                            {!n.isRead && <span style={{ width:8, height:8, borderRadius:'50%', background:'var(--primary)', display:'inline-block' }}/>}
                            <button onClick={(e)=>{e.stopPropagation(); del(n._id);}} style={{ background:'none', border:'none', cursor:'pointer', color:'#94a3b8', padding:2 }}><Trash2 size={13}/></button>
                          </div>
                        </div>
                        <div style={{ fontSize:13, color:'var(--gray)', marginTop:3 }}>{n.message}</div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
