'use client';
import { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';
import ProtectedRoute from '@/components/ProtectedRoute';
import { appointmentAPI, prescriptionAPI } from '@/lib/api';
import { Calendar, FileText, Clock, CheckCircle, Users, Activity } from 'lucide-react';

const statusBadge = (s) => {
  const map = { Pending:'badge-pending', Approved:'badge-approved', Rejected:'badge-rejected', Completed:'badge-completed' };
  return <span className={`badge ${map[s]||'badge-primary'}`}>{s}</span>;
};

export default function DoctorDashboard() {
  const [appts, setAppts] = useState([]);
  const [prescs, setPrescs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([appointmentAPI.getAll(), prescriptionAPI.getAll()])
      .then(([a, p]) => { setAppts(a.data.data); setPrescs(p.data.data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const pending = appts.filter(a => a.status === 'Pending').length;
  const approved = appts.filter(a => a.status === 'Approved').length;
  const completed = appts.filter(a => a.status === 'Completed').length;
  const upcoming = appts.filter(a => a.status === 'Approved' && new Date(a.appointmentDate) >= new Date()).slice(0, 5);

  return (
    <ProtectedRoute roles={['doctor']}>
      <div className="app-layout">
        <Sidebar />
        <div className="main-content">
          <Topbar title="Doctor Dashboard" subtitle="Your clinical overview" />
          <div className="page-content">
            {loading ? <div className="loading-spinner"><div className="spinner"/></div> : (
              <>
                <div className="stats-grid">
                  {[
                    { label:'Total Appointments', value:appts.length, icon:<Calendar size={22}/>, cls:'blue' },
                    { label:'Pending Review', value:pending, icon:<Clock size={22}/>, cls:'orange' },
                    { label:'Active Patients', value:approved, icon:<Users size={22}/>, cls:'green' },
                    { label:'Completed', value:completed, icon:<CheckCircle size={22}/>, cls:'teal' },
                    { label:'Prescriptions', value:prescs.length, icon:<FileText size={22}/>, cls:'purple' },
                  ].map((s,i) => (
                    <div className="stat-card" key={i}>
                      <div className={`stat-icon ${s.cls}`}>{s.icon}</div>
                      <div><div className="stat-value">{s.value}</div><div className="stat-label">{s.label}</div></div>
                    </div>
                  ))}
                </div>

                <div className="card">
                  <div className="card-header">
                    <div className="section-title">Upcoming Appointments</div>
                    <Activity size={18} color="var(--gray)"/>
                  </div>
                  <div className="table-wrap">
                    <table>
                      <thead><tr><th>Patient</th><th>Date</th><th>Time</th><th>Type</th><th>Status</th></tr></thead>
                      <tbody>
                        {upcoming.length ? upcoming.map(a => (
                          <tr key={a._id}>
                            <td>
                              <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                                <div className="avatar" style={{ width:28,height:28,fontSize:10,background:'#dcfce7',color:'#16a34a' }}>{a.patient?.user?.name?.slice(0,2).toUpperCase()}</div>
                                {a.patient?.user?.name}
                              </div>
                            </td>
                            <td>{new Date(a.appointmentDate).toLocaleDateString('en-PK',{day:'numeric',month:'short'})}</td>
                            <td>{a.timeSlot}</td>
                            <td><span className="badge badge-primary">{a.type}</span></td>
                            <td>{statusBadge(a.status)}</td>
                          </tr>
                        )) : <tr><td colSpan={5} style={{ textAlign:'center', color:'var(--gray)', padding:30 }}>No upcoming appointments</td></tr>}
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
