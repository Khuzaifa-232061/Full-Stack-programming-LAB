'use client';
import { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';
import ProtectedRoute from '@/components/ProtectedRoute';
import { appointmentAPI } from '@/lib/api';
import toast from 'react-hot-toast';
import { CheckCircle, XCircle, Trash2, X, Calendar, Search, Eye } from 'lucide-react';

const statusBadge = (s) => {
  const map = { Pending:'badge-pending', Approved:'badge-approved', Rejected:'badge-rejected', Completed:'badge-completed', Cancelled:'badge-cancelled' };
  return <span className={`badge ${map[s]||'badge-primary'}`}>{s}</span>;
};
const treatBadge = (s) => {
  const map = { 'Not Started':'badge-pending', 'Ongoing':'badge-approved', 'Completed':'badge-completed' };
  return <span className={`badge ${map[s]||'badge-primary'}`}>{s}</span>;
};

export default function AdminAppointments() {
  const [appts, setAppts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [rejectModal, setRejectModal] = useState(null);
  const [rejectReason, setRejectReason] = useState('');
  const [detailModal, setDetailModal] = useState(null);

  const load = async () => {
    setLoading(true);
    try { const { data } = await appointmentAPI.getAll(); setAppts(data.data); }
    catch { toast.error('Failed to load appointments'); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);
  useEffect(() => {
    let f = appts;
    if (statusFilter !== 'All') f = f.filter(a => a.status === statusFilter);
    if (search) f = f.filter(a => a.patient?.user?.name?.toLowerCase().includes(search.toLowerCase()) || a.doctor?.user?.name?.toLowerCase().includes(search.toLowerCase()));
    setFiltered(f);
  }, [search, statusFilter, appts]);

  const approve = async (id) => {
    try { await appointmentAPI.updateStatus(id, { status: 'Approved' }); toast.success('Appointment approved!'); load(); }
    catch { toast.error('Failed.'); }
  };
  const reject = async () => {
    try { await appointmentAPI.updateStatus(rejectModal, { status: 'Rejected', rejectionReason: rejectReason }); toast.success('Appointment rejected.'); setRejectModal(null); setRejectReason(''); load(); }
    catch { toast.error('Failed.'); }
  };
  const complete = async (id) => {
    try { await appointmentAPI.updateStatus(id, { status: 'Completed' }); toast.success('Marked as completed!'); load(); }
    catch { toast.error('Failed.'); }
  };
  const del = async (id) => {
    if (!confirm('Delete appointment?')) return;
    try { await appointmentAPI.delete(id); toast.success('Deleted.'); load(); }
    catch { toast.error('Failed.'); }
  };

  return (
    <ProtectedRoute roles={['admin']}>
      <div className="app-layout">
        <Sidebar />
        <div className="main-content">
          <Topbar title="Appointments" subtitle="Manage all patient appointments" />
          <div className="page-content">
            <div className="card">
              <div className="card-header" style={{ flexWrap: 'wrap', gap: 12 }}>
                <div style={{ display:'flex', alignItems:'center', gap:12, flex:1 }}>
                  <div style={{ position:'relative', maxWidth:280 }}>
                    <Search size={15} style={{ position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', color:'#94a3b8' }} />
                    <input className="form-control" style={{ paddingLeft:36 }} placeholder="Search..." value={search} onChange={e=>setSearch(e.target.value)} />
                  </div>
                  <div style={{ display:'flex', gap:6 }}>
                    {['All','Pending','Approved','Completed','Rejected'].map(s => (
                      <button key={s} onClick={()=>setStatusFilter(s)}
                        className={`btn btn-sm ${statusFilter===s?'btn-primary':'btn-secondary'}`}>{s}</button>
                    ))}
                  </div>
                </div>
                <span style={{ fontSize:13, color:'var(--gray)' }}>{filtered.length} appointments</span>
              </div>
              <div className="table-wrap">
                {loading ? <div className="loading-spinner"><div className="spinner"/></div> : filtered.length === 0 ? (
                  <div className="empty-state"><Calendar /><h3>No appointments found</h3></div>
                ) : (
                  <table>
                    <thead><tr><th>Patient</th><th>Doctor</th><th>Date & Time</th><th>Type</th><th>Status</th><th>Treatment</th><th>Actions</th></tr></thead>
                    <tbody>
                      {filtered.map(a => (
                        <tr key={a._id}>
                          <td>
                            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                              <div className="avatar" style={{ width:28, height:28, fontSize:10, background:'#dcfce7', color:'#16a34a' }}>{a.patient?.user?.name?.slice(0,2).toUpperCase()}</div>
                              <div>
                                <div style={{ fontWeight:600, fontSize:13 }}>{a.patient?.user?.name}</div>
                                <div style={{ fontSize:11, color:'var(--gray)' }}>{a.patient?.user?.phone}</div>
                              </div>
                            </div>
                          </td>
                          <td style={{ fontSize:13 }}>{a.doctor?.user?.name}</td>
                          <td>
                            <div style={{ fontSize:13, fontWeight:600 }}>{new Date(a.appointmentDate).toLocaleDateString('en-PK',{day:'numeric',month:'short',year:'numeric'})}</div>
                            <div style={{ fontSize:11, color:'var(--gray)' }}>{a.timeSlot}</div>
                          </td>
                          <td><span className="badge badge-primary">{a.type}</span></td>
                          <td>{statusBadge(a.status)}</td>
                          <td>{treatBadge(a.treatmentStatus)}</td>
                          <td>
                            <div style={{ display:'flex', gap:4 }}>
                              <button className="btn btn-secondary btn-sm" title="View" onClick={()=>setDetailModal(a)}><Eye size={13}/></button>
                              {a.status === 'Pending' && <>
                                <button className="btn btn-success btn-sm" onClick={()=>approve(a._id)} title="Approve"><CheckCircle size={13}/></button>
                                <button className="btn btn-danger btn-sm" onClick={()=>setRejectModal(a._id)} title="Reject"><XCircle size={13}/></button>
                              </>}
                              {a.status === 'Approved' && <button className="btn btn-primary btn-sm" onClick={()=>complete(a._id)}>Complete</button>}
                              <button className="btn btn-danger btn-sm" onClick={()=>del(a._id)} title="Delete"><Trash2 size={13}/></button>
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

      {/* Reject Modal */}
      {rejectModal && (
        <div className="modal-overlay">
          <div className="modal" style={{ maxWidth:420 }}>
            <div className="modal-header">
              <h3 style={{ fontFamily:'Sora,sans-serif', fontSize:17 }}>Reject Appointment</h3>
              <button onClick={()=>setRejectModal(null)} style={{ background:'none', border:'none', cursor:'pointer' }}><X size={20}/></button>
            </div>
            <div className="modal-body">
              <div className="form-group"><label className="form-label">Rejection Reason</label>
                <textarea className="form-control" rows={3} value={rejectReason} onChange={e=>setRejectReason(e.target.value)} placeholder="Reason for rejection..." />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={()=>setRejectModal(null)}>Cancel</button>
              <button className="btn btn-danger" onClick={reject}>Reject Appointment</button>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {detailModal && (
        <div className="modal-overlay">
          <div className="modal modal-lg">
            <div className="modal-header">
              <h3 style={{ fontFamily:'Sora,sans-serif', fontSize:17 }}>Appointment Details</h3>
              <button onClick={()=>setDetailModal(null)} style={{ background:'none', border:'none', cursor:'pointer' }}><X size={20}/></button>
            </div>
            <div className="modal-body">
              <div className="form-grid">
                <div><div className="info-label">Patient</div><div className="info-value">{detailModal.patient?.user?.name}</div></div>
                <div><div className="info-label">Doctor</div><div className="info-value">{detailModal.doctor?.user?.name}</div></div>
                <div><div className="info-label">Date</div><div className="info-value">{new Date(detailModal.appointmentDate).toDateString()}</div></div>
                <div><div className="info-label">Time Slot</div><div className="info-value">{detailModal.timeSlot}</div></div>
                <div><div className="info-label">Type</div><div className="info-value">{detailModal.type}</div></div>
                <div><div className="info-label">Status</div><div className="info-value">{statusBadge(detailModal.status)}</div></div>
              </div>
              {detailModal.symptoms && <><div className="info-label" style={{ marginTop:16 }}>Symptoms</div><div className="info-value" style={{ marginTop:4 }}>{detailModal.symptoms}</div></>}
              {detailModal.notes && <><div className="info-label" style={{ marginTop:12 }}>Notes</div><div className="info-value" style={{ marginTop:4 }}>{detailModal.notes}</div></>}
              {detailModal.checkupRecords?.length > 0 && (
                <div style={{ marginTop:16 }}>
                  <div className="info-label" style={{ marginBottom:8 }}>Checkup Records ({detailModal.checkupRecords.length})</div>
                  {detailModal.checkupRecords.map((r,i) => (
                    <div key={i} style={{ background:'var(--gray-light)', borderRadius:8, padding:'12px 14px', marginBottom:8, fontSize:13 }}>
                      <strong>BP:</strong> {r.bloodPressure} &nbsp;|&nbsp; <strong>Temp:</strong> {r.temperature}°F &nbsp;|&nbsp; <strong>HR:</strong> {r.heartRate} bpm &nbsp;|&nbsp; <strong>Weight:</strong> {r.weight} kg
                      {r.notes && <div style={{ marginTop:4, color:'var(--gray)' }}>{r.notes}</div>}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="modal-footer"><button className="btn btn-secondary" onClick={()=>setDetailModal(null)}>Close</button></div>
          </div>
        </div>
      )}
    </ProtectedRoute>
  );
}
