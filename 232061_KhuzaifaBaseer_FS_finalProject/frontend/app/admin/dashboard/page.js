'use client';
import { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';
import ProtectedRoute from '@/components/ProtectedRoute';
import { treatmentAPI } from '@/lib/api';
import { Users, Stethoscope, Calendar, CheckCircle, Clock, FileText, XCircle, Activity } from 'lucide-react';

const statusBadge = (s) => {
  const map = { Pending: 'badge-pending', Approved: 'badge-approved', Rejected: 'badge-rejected', Completed: 'badge-completed', Cancelled: 'badge-cancelled' };
  return <span className={`badge ${map[s] || 'badge-primary'}`}>{s}</span>;
};

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    treatmentAPI.getDashboardStats().then(({ data }) => setStats(data.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return (
    <ProtectedRoute roles={['admin']}>
      <div className="app-layout">
        <Sidebar />
        <div className="main-content">
          <Topbar title="Admin Dashboard" subtitle="Healthcare system overview" />
          <div className="page-content">
            {loading ? <div className="loading-spinner"><div className="spinner" /></div> : (
              <>
                <div className="stats-grid">
                  {[
                    { label: 'Total Doctors', value: stats?.totalDoctors, icon: <Stethoscope size={22} />, cls: 'blue' },
                    { label: 'Total Patients', value: stats?.totalPatients, icon: <Users size={22} />, cls: 'green' },
                    { label: 'Total Appointments', value: stats?.totalAppointments, icon: <Calendar size={22} />, cls: 'orange' },
                    { label: 'Pending Review', value: stats?.pendingAppointments, icon: <Clock size={22} />, cls: 'purple' },
                    { label: 'Approved', value: stats?.approvedAppointments, icon: <CheckCircle size={22} />, cls: 'teal' },
                    { label: 'Prescriptions', value: stats?.totalPrescriptions, icon: <FileText size={22} />, cls: 'blue' },
                  ].map((s, i) => (
                    <div className="stat-card" key={i}>
                      <div className={`stat-icon ${s.cls}`}>{s.icon}</div>
                      <div>
                        <div className="stat-value">{s.value ?? '—'}</div>
                        <div className="stat-label">{s.label}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="card">
                  <div className="card-header">
                    <div>
                      <div className="section-title">Recent Appointments</div>
                      <div className="section-sub">Latest 5 appointment requests</div>
                    </div>
                    <Activity size={20} color="var(--gray)" />
                  </div>
                  <div className="table-wrap">
                    <table>
                      <thead><tr>
                        <th>Patient</th><th>Doctor</th><th>Date</th><th>Type</th><th>Status</th>
                      </tr></thead>
                      <tbody>
                        {stats?.recentAppointments?.length ? stats.recentAppointments.map(a => (
                          <tr key={a._id}>
                            <td>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                <div className="avatar" style={{ width: 30, height: 30, fontSize: 11 }}>
                                  {a.patient?.user?.name?.slice(0, 2).toUpperCase()}
                                </div>
                                {a.patient?.user?.name || 'N/A'}
                              </div>
                            </td>
                            <td>{a.doctor?.user?.name || 'N/A'}</td>
                            <td>{new Date(a.appointmentDate).toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                            <td><span className="badge badge-primary">{a.type}</span></td>
                            <td>{statusBadge(a.status)}</td>
                          </tr>
                        )) : (
                          <tr><td colSpan={5} style={{ textAlign: 'center', color: 'var(--gray)', padding: 30 }}>No appointments yet</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
