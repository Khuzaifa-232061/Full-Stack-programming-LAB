'use client';
import { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';
import ProtectedRoute from '@/components/ProtectedRoute';
import { patientAPI, treatmentAPI } from '@/lib/api';
import toast from 'react-hot-toast';
import { Users, X, Eye, Activity } from 'lucide-react';

export default function DoctorPatients() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState(null);
  const [history, setHistory] = useState(null);

  useEffect(() => {
    patientAPI.getAll().then(({data}) => setPatients(data.data)).catch(() => toast.error('Failed')).finally(() => setLoading(false));
  }, []);

  const viewHistory = async (id) => {
    try {
      const { data } = await treatmentAPI.getPatientHistory(id);
      setHistory(data.data);
    } catch { toast.error('Failed to load history'); }
  };

  return (
    <ProtectedRoute roles={['doctor']}>
      <div className="app-layout">
        <Sidebar />
        <div className="main-content">
          <Topbar title="My Patients" subtitle="View assigned patients" />
          <div className="page-content">
            <div className="card">
              <div className="card-header">
                <div className="section-title">All Patients</div>
                <span style={{ fontSize:13, color:'var(--gray)' }}>{patients.length} patients</span>
              </div>
              <div className="table-wrap">
                {loading ? <div className="loading-spinner"><div className="spinner"/></div> : patients.length === 0 ? (
                  <div className="empty-state"><Users /><h3>No patients found</h3></div>
                ) : (
                  <table>
                    <thead><tr><th>Patient</th><th>Age / Gender</th><th>Blood Group</th><th>Allergies</th><th>Conditions</th><th>Actions</th></tr></thead>
                    <tbody>
                      {patients.map(p => {
                        const age = p.dateOfBirth ? Math.floor((new Date() - new Date(p.dateOfBirth)) / (365.25*24*60*60*1000)) : '—';
                        return (
                          <tr key={p._id}>
                            <td>
                              <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                                <div className="avatar" style={{ background:'#dcfce7',color:'#16a34a' }}>{p.user?.name?.slice(0,2).toUpperCase()}</div>
                                <div><div style={{ fontWeight:600 }}>{p.user?.name}</div><div style={{ fontSize:12, color:'var(--gray)' }}>{p.user?.email}</div></div>
                              </div>
                            </td>
                            <td>{age} yrs / {p.gender||'—'}</td>
                            <td>{p.bloodGroup ? <span className="badge badge-primary">{p.bloodGroup}</span> : '—'}</td>
                            <td style={{ fontSize:13 }}>{p.allergies?.join(', ')||<span style={{ color:'var(--gray)' }}>None</span>}</td>
                            <td style={{ fontSize:13 }}>{p.chronicConditions?.join(', ')||<span style={{ color:'var(--gray)' }}>None</span>}</td>
                            <td>
                              <div style={{ display:'flex', gap:6 }}>
                                <button className="btn btn-secondary btn-sm" onClick={()=>setDetail(p)}><Eye size={13}/> Profile</button>
                                <button className="btn btn-primary btn-sm" onClick={()=>{setDetail(p); viewHistory(p._id);}}><Activity size={13}/> History</button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
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
              <h3 style={{ fontFamily:'Sora,sans-serif', fontSize:17 }}>Patient Profile – {detail.user?.name}</h3>
              <button onClick={()=>{setDetail(null);setHistory(null);}} style={{ background:'none',border:'none',cursor:'pointer' }}><X size={20}/></button>
            </div>
            <div className="modal-body">
              <div className="form-grid" style={{ marginBottom:16 }}>
                {[
                  ['Name', detail.user?.name], ['Email', detail.user?.email], ['Phone', detail.user?.phone||'—'],
                  ['Gender', detail.gender||'—'], ['Blood Group', detail.bloodGroup||'—'],
                  ['Date of Birth', detail.dateOfBirth ? new Date(detail.dateOfBirth).toLocaleDateString() : '—'],
                  ['Address', detail.address||'—'],
                  ['Allergies', detail.allergies?.join(', ')||'None'],
                  ['Chronic Conditions', detail.chronicConditions?.join(', ')||'None'],
                ].map(([label, value]) => (
                  <div key={label}><div className="info-label">{label}</div><div className="info-value">{value}</div></div>
                ))}
              </div>
              {history && (
                <>
                  <div style={{ fontFamily:'Sora,sans-serif', fontWeight:700, fontSize:15, margin:'16px 0 10px', color:'var(--dark)' }}>Treatment History</div>
                  {history.appointments?.slice(0,3).map(a => (
                    <div key={a._id} style={{ background:'var(--gray-light)', borderRadius:8, padding:'10px 14px', marginBottom:8, fontSize:13 }}>
                      <strong>{a.type}</strong> on {new Date(a.appointmentDate).toDateString()} – <span className={`badge badge-${a.status.toLowerCase()}`}>{a.status}</span>
                    </div>
                  ))}
                  {history.prescriptions?.slice(0,2).map(p => (
                    <div key={p._id} style={{ background:'var(--primary-light)', borderRadius:8, padding:'10px 14px', marginBottom:8, fontSize:13, border:'1px solid #bfdbfe' }}>
                      <strong>Rx:</strong> {p.diagnosis} – {p.medications?.length} medications
                    </div>
                  ))}
                </>
              )}
            </div>
            <div className="modal-footer"><button className="btn btn-secondary" onClick={()=>{setDetail(null);setHistory(null);}}>Close</button></div>
          </div>
        </div>
      )}
    </ProtectedRoute>
  );
}
