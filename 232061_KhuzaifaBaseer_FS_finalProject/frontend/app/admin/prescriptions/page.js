'use client';
import { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';
import ProtectedRoute from '@/components/ProtectedRoute';
import { prescriptionAPI } from '@/lib/api';
import toast from 'react-hot-toast';
import { FileText, X, Eye, Trash2 } from 'lucide-react';

export default function AdminPrescriptions() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState(null);

  const load = async () => {
    setLoading(true);
    try { const { data } = await prescriptionAPI.getAll(); setPrescriptions(data.data); }
    catch { toast.error('Failed to load'); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const del = async (id) => {
    if (!confirm('Delete this prescription?')) return;
    try { await prescriptionAPI.delete(id); toast.success('Deleted.'); load(); }
    catch { toast.error('Failed.'); }
  };

  return (
    <ProtectedRoute roles={['admin']}>
      <div className="app-layout">
        <Sidebar />
        <div className="main-content">
          <Topbar title="Prescriptions" subtitle="All patient prescriptions" />
          <div className="page-content">
            <div className="card">
              <div className="card-header">
                <div className="section-title">All Prescriptions</div>
                <span style={{ fontSize:13, color:'var(--gray)' }}>{prescriptions.length} total</span>
              </div>
              <div className="table-wrap">
                {loading ? <div className="loading-spinner"><div className="spinner"/></div> : prescriptions.length === 0 ? (
                  <div className="empty-state"><FileText /><h3>No prescriptions yet</h3></div>
                ) : (
                  <table>
                    <thead><tr><th>Patient</th><th>Doctor</th><th>Diagnosis</th><th>Medications</th><th>Date</th><th>Follow-up</th><th>Actions</th></tr></thead>
                    <tbody>
                      {prescriptions.map(p => (
                        <tr key={p._id}>
                          <td style={{ fontWeight:600 }}>{p.patient?.user?.name}</td>
                          <td>{p.doctor?.user?.name}</td>
                          <td style={{ maxWidth:200 }}><div style={{ overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{p.diagnosis}</div></td>
                          <td><span className="badge badge-primary">{p.medications?.length} meds</span></td>
                          <td style={{ fontSize:13 }}>{new Date(p.createdAt).toLocaleDateString('en-PK',{day:'numeric',month:'short',year:'numeric'})}</td>
                          <td>{p.followUpRequired ? <span className="badge badge-approved">Required</span> : <span className="badge" style={{ background:'#f3f4f6', color:'#6b7280' }}>No</span>}</td>
                          <td>
                            <div style={{ display:'flex', gap:6 }}>
                              <button className="btn btn-secondary btn-sm" onClick={()=>setDetail(p)}><Eye size={13}/></button>
                              <button className="btn btn-danger btn-sm" onClick={()=>del(p._id)}><Trash2 size={13}/></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {detail && (
        <div className="modal-overlay">
          <div className="modal modal-lg">
            <div className="modal-header">
              <h3 style={{ fontFamily:'Sora,sans-serif', fontSize:17 }}>Prescription Details</h3>
              <button onClick={()=>setDetail(null)} style={{ background:'none', border:'none', cursor:'pointer' }}><X size={20}/></button>
            </div>
            <div className="modal-body">
              <div className="form-grid" style={{ marginBottom:16 }}>
                <div><div className="info-label">Patient</div><div className="info-value">{detail.patient?.user?.name}</div></div>
                <div><div className="info-label">Doctor</div><div className="info-value">{detail.doctor?.user?.name}</div></div>
                <div><div className="info-label">Diagnosis</div><div className="info-value">{detail.diagnosis}</div></div>
                <div><div className="info-label">Date</div><div className="info-value">{new Date(detail.createdAt).toDateString()}</div></div>
              </div>
              <div className="info-label" style={{ marginBottom:10 }}>Medications</div>
              {detail.medications?.map((m, i) => (
                <div key={i} style={{ background:'var(--primary-light)', borderRadius:8, padding:'12px 16px', marginBottom:8, border:'1px solid #bfdbfe' }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                    <strong style={{ fontSize:14 }}>{m.name}</strong>
                    <span className="badge badge-primary">{m.dosage}</span>
                  </div>
                  <div style={{ fontSize:13, color:'var(--gray)', marginTop:4 }}>
                    {m.frequency} · {m.duration} {m.instructions && `· ${m.instructions}`}
                  </div>
                  {m.times?.length > 0 && <div style={{ fontSize:12, color:'var(--primary)', marginTop:3 }}>Times: {m.times.join(', ')}</div>}
                </div>
              ))}
              {detail.notes && <div style={{ marginTop:12 }}><div className="info-label">Notes</div><div className="info-value" style={{ marginTop:4 }}>{detail.notes}</div></div>}
              {detail.labTests?.length > 0 && <div style={{ marginTop:12 }}><div className="info-label">Lab Tests</div><div style={{ display:'flex', gap:6, flexWrap:'wrap', marginTop:6 }}>{detail.labTests.map((t,i)=><span key={i} className="badge badge-primary">{t}</span>)}</div></div>}
            </div>
            <div className="modal-footer"><button className="btn btn-secondary" onClick={()=>setDetail(null)}>Close</button></div>
          </div>
        </div>
      )}
    </ProtectedRoute>
  );
}
