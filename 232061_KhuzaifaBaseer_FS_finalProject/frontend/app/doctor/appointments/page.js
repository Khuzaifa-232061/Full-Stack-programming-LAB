'use client';
import { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';
import ProtectedRoute from '@/components/ProtectedRoute';
import { appointmentAPI } from '@/lib/api';
import toast from 'react-hot-toast';
import { CheckCircle, XCircle, X, Plus, Activity } from 'lucide-react';

const statusBadge = (s) => {
  const map = { Pending:'badge-pending', Approved:'badge-approved', Rejected:'badge-rejected', Completed:'badge-completed' };
  return <span className={`badge ${map[s]||'badge-primary'}`}>{s}</span>;
};
const CHECKUP = { weight:'', bloodPressure:'', temperature:'', heartRate:'', notes:'' };

export default function DoctorAppointments() {
  const [appts, setAppts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('Pending');
  const [checkupModal, setCheckupModal] = useState(null);
  const [checkupForm, setCheckupForm] = useState(CHECKUP);
  const [rejectModal, setRejectModal] = useState(null);
  const [rejectReason, setRejectReason] = useState('');

  const load = async () => {
    setLoading(true);
    try { const { data } = await appointmentAPI.getAll(); setAppts(data.data); }
    catch { toast.error('Failed to load'); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const filtered = tab === 'All' ? appts : appts.filter(a => a.status === tab);

  const approve = async (id) => {
    try { await appointmentAPI.updateStatus(id, { status: 'Approved' }); toast.success('Approved!'); load(); }
    catch { toast.error('Failed'); }
  };
  const reject = async () => {
    try { await appointmentAPI.updateStatus(rejectModal, { status: 'Rejected', rejectionReason: rejectReason }); toast.success('Rejected.'); setRejectModal(null); setRejectReason(''); load(); }
    catch { toast.error('Failed'); }
  };
  const complete = async (id) => {
    try { await appointmentAPI.updateStatus(id, { status: 'Completed' }); toast.success('Marked complete!'); load(); }
    catch { toast.error('Failed'); }
  };
  const saveCheckup = async () => {
    try { await appointmentAPI.addCheckup(checkupModal, { ...checkupForm, date: new Date() }); toast.success('Checkup recorded!'); setCheckupModal(null); setCheckupForm(CHECKUP); load(); }
    catch { toast.error('Failed to save checkup'); }
  };

  return (
    <ProtectedRoute roles={['doctor']}>
      <div className="app-layout">
        <Sidebar />
        <div className="main-content">
          <Topbar title="My Appointments" subtitle="Manage your patient appointments" />
          <div className="page-content">
            <div className="card">
              <div className="card-header">
                <div className="tabs" style={{ borderBottom:'none', margin:0 }}>
                  {['All','Pending','Approved','Completed','Rejected'].map(t => (
                    <button key={t} className={`tab ${tab===t?'active':''}`} onClick={()=>setTab(t)}>
                      {t}
                      <span style={{ background: tab===t?'var(--primary)':'var(--border)', color: tab===t?'white':'var(--gray)', borderRadius:10, padding:'1px 7px', fontSize:11, marginLeft:4 }}>
                        {t==='All' ? appts.length : appts.filter(a=>a.status===t).length}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="table-wrap">
                {loading ? <div className="loading-spinner"><div className="spinner"/></div> : filtered.length === 0 ? (
                  <div className="empty-state"><Activity /><h3>No appointments in this category</h3></div>
                ) : (
                  <table>
                    <thead><tr><th>Patient</th><th>Date</th><th>Time</th><th>Type</th><th>Symptoms</th><th>Status</th><th>Actions</th></tr></thead>
                    <tbody>
                      {filtered.map(a => (
                        <tr key={a._id}>
                          <td>
                            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                              <div className="avatar" style={{ width:28,height:28,fontSize:10,background:'#dcfce7',color:'#16a34a' }}>{a.patient?.user?.name?.slice(0,2).toUpperCase()}</div>
                              <div>
                                <div style={{ fontWeight:600, fontSize:13 }}>{a.patient?.user?.name}</div>
                                <div style={{ fontSize:11, color:'var(--gray)' }}>{a.patient?.user?.phone}</div>
                              </div>
                            </div>
                          </td>
                          <td style={{ fontSize:13 }}>{new Date(a.appointmentDate).toLocaleDateString('en-PK',{day:'numeric',month:'short',year:'numeric'})}</td>
                          <td style={{ fontSize:13 }}>{a.timeSlot}</td>
                          <td><span className="badge badge-primary">{a.type}</span></td>
                          <td style={{ fontSize:12, color:'var(--gray)', maxWidth:140 }}><div style={{ overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap' }}>{a.symptoms||'—'}</div></td>
                          <td>{statusBadge(a.status)}</td>
                          <td>
                            <div style={{ display:'flex', gap:4 }}>
                              {a.status === 'Pending' && <>
                                <button className="btn btn-success btn-sm" onClick={()=>approve(a._id)} title="Approve"><CheckCircle size={13}/></button>
                                <button className="btn btn-danger btn-sm" onClick={()=>setRejectModal(a._id)} title="Reject"><XCircle size={13}/></button>
                              </>}
                              {a.status === 'Approved' && <>
                                <button className="btn btn-primary btn-sm" onClick={()=>{setCheckupModal(a._id);setCheckupForm(CHECKUP);}}><Plus size={13}/> Checkup</button>
                                <button className="btn btn-secondary btn-sm" onClick={()=>complete(a._id)}>Complete</button>
                              </>}
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

      {/* Checkup Modal */}
      {checkupModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3 style={{ fontFamily:'Sora,sans-serif', fontSize:17 }}>Record Physical Checkup</h3>
              <button onClick={()=>setCheckupModal(null)} style={{ background:'none',border:'none',cursor:'pointer' }}><X size={20}/></button>
            </div>
            <div className="modal-body">
              <div className="form-grid">
                <div className="form-group"><label className="form-label">Weight (kg)</label><input className="form-control" type="number" value={checkupForm.weight} onChange={e=>setCheckupForm({...checkupForm,weight:e.target.value})} placeholder="70"/></div>
                <div className="form-group"><label className="form-label">Blood Pressure</label><input className="form-control" value={checkupForm.bloodPressure} onChange={e=>setCheckupForm({...checkupForm,bloodPressure:e.target.value})} placeholder="120/80"/></div>
                <div className="form-group"><label className="form-label">Temperature (°F)</label><input className="form-control" type="number" step="0.1" value={checkupForm.temperature} onChange={e=>setCheckupForm({...checkupForm,temperature:e.target.value})} placeholder="98.6"/></div>
                <div className="form-group"><label className="form-label">Heart Rate (bpm)</label><input className="form-control" type="number" value={checkupForm.heartRate} onChange={e=>setCheckupForm({...checkupForm,heartRate:e.target.value})} placeholder="72"/></div>
              </div>
              <div className="form-group"><label className="form-label">Clinical Notes</label><textarea className="form-control" rows={3} value={checkupForm.notes} onChange={e=>setCheckupForm({...checkupForm,notes:e.target.value})} placeholder="Observations and notes..."/></div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={()=>setCheckupModal(null)}>Cancel</button>
              <button className="btn btn-primary" onClick={saveCheckup}>Save Checkup</button>
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {rejectModal && (
        <div className="modal-overlay">
          <div className="modal" style={{ maxWidth:400 }}>
            <div className="modal-header">
              <h3 style={{ fontFamily:'Sora,sans-serif', fontSize:17 }}>Reject Appointment</h3>
              <button onClick={()=>setRejectModal(null)} style={{ background:'none',border:'none',cursor:'pointer' }}><X size={20}/></button>
            </div>
            <div className="modal-body">
              <div className="form-group"><label className="form-label">Reason</label>
                <textarea className="form-control" rows={3} value={rejectReason} onChange={e=>setRejectReason(e.target.value)} placeholder="Reason for rejection..."/>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={()=>setRejectModal(null)}>Cancel</button>
              <button className="btn btn-danger" onClick={reject}>Reject</button>
            </div>
          </div>
        </div>
      )}
    </ProtectedRoute>
  );
}
