'use client';
import { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';
import ProtectedRoute from '@/components/ProtectedRoute';
import { prescriptionAPI } from '@/lib/api';
import toast from 'react-hot-toast';
import { FileText, X, Pill } from 'lucide-react';

export default function PatientPrescriptions() {
  const [prescs, setPrescs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    prescriptionAPI.getAll().then(({data}) => setPrescs(data.data)).catch(() => toast.error('Failed')).finally(() => setLoading(false));
  }, []);

  return (
    <ProtectedRoute roles={['patient']}>
      <div className="app-layout">
        <Sidebar />
        <div className="main-content">
          <Topbar title="My Prescriptions" subtitle="View your medications and medical history" />
          <div className="page-content">
            {loading ? <div className="loading-spinner"><div className="spinner"/></div> : prescs.length === 0 ? (
              <div className="card"><div className="empty-state"><FileText /><h3>No prescriptions yet</h3><p>Your prescriptions will appear here after consultations</p></div></div>
            ) : (
              <div style={{ display:'grid', gap:16 }}>
                {prescs.map(p => (
                  <div className="card" key={p._id} style={{ cursor:'pointer' }} onClick={()=>setDetail(p)}>
                    <div style={{ padding:'18px 24px', display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
                      <div style={{ display:'flex', gap:14 }}>
                        <div style={{ width:46, height:46, background:'#f3e8ff', borderRadius:12, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                          <Pill size={20} color="#9333ea"/>
                        </div>
                        <div>
                          <div style={{ fontWeight:700, fontSize:15 }}>{p.diagnosis}</div>
                          <div style={{ fontSize:13, color:'var(--gray)', marginTop:3 }}>Dr. {p.doctor?.user?.name} · {new Date(p.createdAt).toDateString()}</div>
                          <div style={{ display:'flex', gap:6, marginTop:8, flexWrap:'wrap' }}>
                            {p.medications?.map((m,i) => <span key={i} className="badge badge-primary">{m.name} {m.dosage}</span>)}
                          </div>
                        </div>
                      </div>
                      <div style={{ textAlign:'right' }}>
                        {p.followUpRequired && <span className="badge badge-approved">Follow-up Required</span>}
                        <div style={{ fontSize:12, color:'var(--gray)', marginTop:6 }}>{p.medications?.length} medications</div>
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
              <h3 style={{ fontFamily:'Sora,sans-serif', fontSize:17 }}>Prescription Details</h3>
              <button onClick={()=>setDetail(null)} style={{ background:'none',border:'none',cursor:'pointer' }}><X size={20}/></button>
            </div>
            <div className="modal-body">
              <div className="form-grid" style={{ marginBottom:16 }}>
                <div><div className="info-label">Doctor</div><div className="info-value">{detail.doctor?.user?.name}</div></div>
                <div><div className="info-label">Date</div><div className="info-value">{new Date(detail.createdAt).toDateString()}</div></div>
                <div style={{ gridColumn:'1/-1' }}><div className="info-label">Diagnosis</div><div className="info-value">{detail.diagnosis}</div></div>
              </div>
              <div style={{ fontWeight:700, marginBottom:10 }}>Medications</div>
              {detail.medications?.map((m,i) => (
                <div key={i} style={{ background:'var(--primary-light)', borderRadius:8, padding:'14px 16px', marginBottom:8, border:'1px solid #bfdbfe' }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                    <strong style={{ fontSize:14 }}>{m.name}</strong>
                    <span className="badge badge-primary">{m.dosage}</span>
                  </div>
                  <div style={{ fontSize:13, color:'var(--gray)', marginTop:5 }}>{m.frequency} · {m.duration}{m.instructions && ` · ${m.instructions}`}</div>
                  {m.times?.length > 0 && <div style={{ fontSize:12, color:'var(--primary)', marginTop:4 }}>⏰ Take at: {m.times.join(', ')}</div>}
                </div>
              ))}
              {detail.labTests?.length > 0 && <div style={{ marginTop:12 }}><div className="info-label" style={{ marginBottom:8 }}>Lab Tests Ordered</div><div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>{detail.labTests.map((t,i)=><span key={i} className="badge badge-primary">{t}</span>)}</div></div>}
              {detail.followUpRequired && detail.followUpDate && <div style={{ marginTop:12 }} className="alert alert-info">📅 Follow-up scheduled: {new Date(detail.followUpDate).toDateString()}</div>}
              {detail.notes && <div style={{ marginTop:12 }}><div className="info-label">Doctor's Notes</div><div className="info-value" style={{ marginTop:4 }}>{detail.notes}</div></div>}
            </div>
            <div className="modal-footer"><button className="btn btn-secondary" onClick={()=>setDetail(null)}>Close</button></div>
          </div>
        </div>
      )}
    </ProtectedRoute>
  );
}
