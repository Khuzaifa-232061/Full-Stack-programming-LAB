'use client';
import { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';
import ProtectedRoute from '@/components/ProtectedRoute';
import { treatmentAPI } from '@/lib/api';
import toast from 'react-hot-toast';
import { Activity, X } from 'lucide-react';

export default function PatientTreatments() {
  const [data, setData] = useState({ appointments: [], prescriptions: [] });
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    treatmentAPI.getMyTreatments().then(({data: r}) => setData(r.data)).catch(() => toast.error('Failed')).finally(() => setLoading(false));
  }, []);

  const treatBadge = (s) => {
    const map = { 'Not Started':'badge-pending', 'Ongoing':'badge-approved', 'Completed':'badge-completed' };
    return <span className={`badge ${map[s]||'badge-primary'}`}>{s}</span>;
  };

  return (
    <ProtectedRoute roles={['patient']}>
      <div className="app-layout">
        <Sidebar />
        <div className="main-content">
          <Topbar title="My Treatments" subtitle="Track your treatment progress" />
          <div className="page-content">
            <div className="tabs">
              <button className="tab active">Treatment Sessions</button>
            </div>
            {loading ? <div className="loading-spinner"><div className="spinner"/></div> : (
              <div style={{ display:'grid', gap:16 }}>
                {data.appointments.length === 0 ? (
                  <div className="card"><div className="empty-state"><Activity /><h3>No treatments yet</h3><p>Your treatment history will appear here after approved appointments</p></div></div>
                ) : data.appointments.map(a => (
                  <div className="card" key={a._id} style={{ cursor:'pointer' }} onClick={()=>setDetail(a)}>
                    <div style={{ padding:'18px 24px', display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
                      <div style={{ display:'flex', gap:14, alignItems:'flex-start' }}>
                        <div style={{ width:46, height:46, background:'var(--primary-light)', borderRadius:12, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                          <Activity size={20} color="var(--primary)"/>
                        </div>
                        <div>
                          <div style={{ fontWeight:700, fontSize:15 }}>{a.type} – {a.doctor?.user?.name}</div>
                          <div style={{ fontSize:13, color:'var(--gray)', marginTop:3 }}>{new Date(a.appointmentDate).toDateString()} · {a.timeSlot}</div>
                          {a.checkupRecords?.length > 0 && (
                            <div style={{ fontSize:12, color:'var(--primary)', marginTop:4 }}>
                              ✓ {a.checkupRecords.length} checkup record(s) on file
                            </div>
                          )}
                        </div>
                      </div>
                      <div style={{ textAlign:'right' }}>
                        {treatBadge(a.treatmentStatus)}
                        {a.followUpDate && <div style={{ fontSize:12, color:'var(--gray)', marginTop:6 }}>Follow-up: {new Date(a.followUpDate).toLocaleDateString()}</div>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {detail && (
        <div className="modal-overlay">
          <div className="modal modal-lg">
            <div className="modal-header">
              <h3 style={{ fontFamily:'Sora,sans-serif', fontSize:17 }}>Treatment Detail</h3>
              <button onClick={()=>setDetail(null)} style={{ background:'none',border:'none',cursor:'pointer' }}><X size={20}/></button>
            </div>
            <div className="modal-body">
              <div className="form-grid" style={{ marginBottom:16 }}>
                <div><div className="info-label">Doctor</div><div className="info-value">{detail.doctor?.user?.name}</div></div>
                <div><div className="info-label">Type</div><div className="info-value">{detail.type}</div></div>
                <div><div className="info-label">Date</div><div className="info-value">{new Date(detail.appointmentDate).toDateString()}</div></div>
                <div><div className="info-label">Treatment Status</div><div className="info-value">{detail.treatmentStatus}</div></div>
              </div>
              {detail.symptoms && <div style={{ marginBottom:12 }}><div className="info-label">Symptoms</div><div className="info-value" style={{ marginTop:4 }}>{detail.symptoms}</div></div>}
              {detail.checkupRecords?.length > 0 && (
                <div>
                  <div style={{ fontWeight:700, marginBottom:10 }}>Physical Checkup Records</div>
                  {detail.checkupRecords.map((r,i) => (
                    <div key={i} style={{ background:'var(--gray-light)', borderRadius:8, padding:'12px 16px', marginBottom:8, display:'grid', gridTemplateColumns:'1fr 1fr 1fr 1fr', gap:10, fontSize:13 }}>
                      <div><div className="info-label">Weight</div><div className="info-value">{r.weight} kg</div></div>
                      <div><div className="info-label">Blood Pressure</div><div className="info-value">{r.bloodPressure}</div></div>
                      <div><div className="info-label">Temperature</div><div className="info-value">{r.temperature}°F</div></div>
                      <div><div className="info-label">Heart Rate</div><div className="info-value">{r.heartRate} bpm</div></div>
                      {r.notes && <div style={{ gridColumn:'1/-1' }}><div className="info-label">Notes</div><div className="info-value">{r.notes}</div></div>}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="modal-footer"><button className="btn btn-secondary" onClick={()=>setDetail(null)}>Close</button></div>
          </div>
        </div>
      )}
    </ProtectedRoute>
  );
}
