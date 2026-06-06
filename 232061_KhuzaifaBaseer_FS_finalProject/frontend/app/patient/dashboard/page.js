'use client';
import { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';
import ProtectedRoute from '@/components/ProtectedRoute';
import { appointmentAPI, prescriptionAPI, patientAPI } from '@/lib/api';
import { Calendar, FileText, Clock, CheckCircle, Activity, Stethoscope } from 'lucide-react';

const statusBadge = (s) => {
  const map = { Pending:'badge-pending', Approved:'badge-approved', Rejected:'badge-rejected', Completed:'badge-completed' };
  return <span className={`badge ${map[s]||'badge-primary'}`}>{s}</span>;
};

export default function PatientDashboard() {
  const [appts, setAppts] = useState([]);
  const [prescs, setPrescs] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([appointmentAPI.getAll(), prescriptionAPI.getAll(), patientAPI.getMe()])
      .then(([a, p, pr]) => { setAppts(a.data.data); setPrescs(p.data.data); setProfile(pr.data.data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const upcoming = appts.filter(a => a.status === 'Approved' && new Date(a.appointmentDate) >= new Date()).slice(0, 4);
  const activeMeds = prescs.flatMap(p => p.medications || []).slice(0, 5);

  return (
    <ProtectedRoute roles={['patient']}>
      <div className="app-layout">
        <Sidebar />
        <div className="main-content">
          <Topbar title="Patient Dashboard" subtitle="Your health overview" />
          <div className="page-content">
            {loading ? <div className="loading-spinner"><div className="spinner"/></div> : (
              <>
                {profile?.assignedDoctor && (
                  <div className="alert alert-info" style={{ marginBottom:24 }}>
                    <Stethoscope size={16}/>
                    Your assigned doctor is <strong>{profile.assignedDoctor?.user?.name}</strong> – {profile.assignedDoctor?.specialization}
                  </div>
                )}
                <div className="stats-grid">
                  {[
                    { label:'Total Appointments', value:appts.length, icon:<Calendar size={22}/>, cls:'blue' },
                    { label:'Upcoming', value:appts.filter(a=>a.status==='Approved').length, icon:<Clock size={22}/>, cls:'orange' },
                    { label:'Completed', value:appts.filter(a=>a.status==='Completed').length, icon:<CheckCircle size={22}/>, cls:'green' },
                    { label:'Prescriptions', value:prescs.length, icon:<FileText size={22}/>, cls:'purple' },
                  ].map((s,i) => (
                    <div className="stat-card" key={i}>
                      <div className={`stat-icon ${s.cls}`}>{s.icon}</div>
                      <div><div className="stat-value">{s.value}</div><div className="stat-label">{s.label}</div></div>
                    </div>
                  ))}
                </div>

                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 }}>
                  <div className="card">
                    <div className="card-header"><div className="section-title">Upcoming Appointments</div><Calendar size={18} color="var(--gray)"/></div>
                    {upcoming.length === 0 ? <div style={{ padding:'30px 24px', textAlign:'center', color:'var(--gray)', fontSize:14 }}>No upcoming appointments</div> :
                      upcoming.map(a => (
                        <div key={a._id} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'14px 24px', borderBottom:'1px solid var(--border)' }}>
                          <div>
                            <div style={{ fontWeight:600, fontSize:13 }}>{a.doctor?.user?.name}</div>
                            <div style={{ fontSize:12, color:'var(--gray)' }}>{a.type} · {a.timeSlot}</div>
                          </div>
                          <div style={{ textAlign:'right' }}>
                            <div style={{ fontSize:12, fontWeight:600 }}>{new Date(a.appointmentDate).toLocaleDateString('en-PK',{day:'numeric',month:'short'})}</div>
                            {statusBadge(a.status)}
                          </div>
                        </div>
                      ))
                    }
                  </div>

                  <div className="card">
                    <div className="card-header"><div className="section-title">Active Medications</div><Activity size={18} color="var(--gray)"/></div>
                    {activeMeds.length === 0 ? <div style={{ padding:'30px 24px', textAlign:'center', color:'var(--gray)', fontSize:14 }}>No active medications</div> :
                      activeMeds.map((m, i) => (
                        <div key={i} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'12px 24px', borderBottom:'1px solid var(--border)' }}>
                          <div>
                            <div style={{ fontWeight:600, fontSize:13 }}>{m.name}</div>
                            <div style={{ fontSize:12, color:'var(--gray)' }}>{m.frequency} · {m.duration}</div>
                          </div>
                          <span className="badge badge-primary">{m.dosage}</span>
                        </div>
                      ))
                    }
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
