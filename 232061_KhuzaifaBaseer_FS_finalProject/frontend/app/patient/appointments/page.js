'use client';
import { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';
import ProtectedRoute from '@/components/ProtectedRoute';
import { appointmentAPI, doctorAPI } from '@/lib/api';
import toast from 'react-hot-toast';
import { Plus, X, Calendar } from 'lucide-react';

const TIMES = ['09:00 AM','10:00 AM','11:00 AM','12:00 PM','02:00 PM','03:00 PM','04:00 PM','05:00 PM'];
const statusBadge = (s) => {
  const map = { Pending:'badge-pending', Approved:'badge-approved', Rejected:'badge-rejected', Completed:'badge-completed', Cancelled:'badge-cancelled' };
  return <span className={`badge ${map[s]||'badge-primary'}`}>{s}</span>;
};

export default function PatientAppointments() {
  const [appts, setAppts] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ doctorId:'', appointmentDate:'', timeSlot:'', type:'Consultation', symptoms:'', notes:'' });
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const [ad, dd] = await Promise.all([appointmentAPI.getAll(), doctorAPI.getAll()]);
      setAppts(ad.data.data); setDoctors(dd.data.data);
    } catch { toast.error('Failed to load'); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const handleBook = async () => {
    if (!form.doctorId || !form.appointmentDate || !form.timeSlot) { toast.error('Please fill all required fields'); return; }
    setSaving(true);
    try {
      await appointmentAPI.book(form);
      toast.success('Appointment booked successfully! Awaiting approval.');
      setModal(false);
      setForm({ doctorId:'', appointmentDate:'', timeSlot:'', type:'Consultation', symptoms:'', notes:'' });
      load();
    } catch (err) { toast.error(err.response?.data?.message || 'Booking failed'); }
    finally { setSaving(false); }
  };

  return (
    <ProtectedRoute roles={['patient']}>
      <div className="app-layout">
        <Sidebar />
        <div className="main-content">
          <Topbar title="My Appointments" subtitle="Book and track your appointments" />
          <div className="page-content">
            <div className="card">
              <div className="card-header">
                <div className="section-title">Appointment History</div>
                <button className="btn btn-primary" onClick={()=>setModal(true)}><Plus size={16}/> Book Appointment</button>
              </div>
              <div className="table-wrap">
                {loading ? <div className="loading-spinner"><div className="spinner"/></div> : appts.length === 0 ? (
                  <div className="empty-state"><Calendar /><h3>No appointments yet</h3><p>Book your first appointment to get started</p></div>
                ) : (
                  <table>
                    <thead><tr><th>Doctor</th><th>Specialization</th><th>Date</th><th>Time</th><th>Type</th><th>Status</th><th>Notes</th></tr></thead>
                    <tbody>
                      {appts.map(a => (
                        <tr key={a._id}>
                          <td style={{ fontWeight:600 }}>{a.doctor?.user?.name}</td>
                          <td style={{ fontSize:12, color:'var(--gray)' }}>{a.doctor?.specialization}</td>
                          <td style={{ fontSize:13 }}>{new Date(a.appointmentDate).toLocaleDateString('en-PK',{day:'numeric',month:'short',year:'numeric'})}</td>
                          <td style={{ fontSize:13 }}>{a.timeSlot}</td>
                          <td><span className="badge badge-primary">{a.type}</span></td>
                          <td>{statusBadge(a.status)}</td>
                          <td style={{ fontSize:12, color:'var(--gray)', maxWidth:160 }}>
                            {a.status === 'Rejected' && a.rejectionReason ? <span style={{ color:'var(--danger)' }}>{a.rejectionReason}</span> : (a.symptoms || '—')}
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

      {modal && (
        <div className="modal-overlay">
          <div className="modal modal-lg">
            <div className="modal-header">
              <h3 style={{ fontFamily:'Sora,sans-serif', fontSize:17 }}>Book New Appointment</h3>
              <button onClick={()=>setModal(false)} style={{ background:'none',border:'none',cursor:'pointer' }}><X size={20}/></button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Select Doctor *</label>
                <select className="form-control" value={form.doctorId} onChange={e=>setForm({...form,doctorId:e.target.value})}>
                  <option value="">-- Choose a Doctor --</option>
                  {doctors.map(d => (
                    <option key={d._id} value={d._id}>{d.user?.name} – {d.specialization} (PKR {d.consultationFee?.toLocaleString()})</option>
                  ))}
                </select>
              </div>
              {form.doctorId && (
                <div style={{ background:'var(--primary-light)', borderRadius:8, padding:'10px 14px', marginBottom:16, fontSize:13 }}>
                  {(() => {
                    const doc = doctors.find(d => d._id === form.doctorId);
                    return doc ? <span>📅 Available: <strong>{doc.availableDays?.join(', ')}</strong> · Fee: <strong>PKR {doc.consultationFee?.toLocaleString()}</strong></span> : null;
                  })()}
                </div>
              )}
              <div className="form-grid">
                <div className="form-group"><label className="form-label">Appointment Date *</label><input className="form-control" type="date" min={new Date().toISOString().split('T')[0]} value={form.appointmentDate} onChange={e=>setForm({...form,appointmentDate:e.target.value})}/></div>
                <div className="form-group">
                  <label className="form-label">Time Slot *</label>
                  <select className="form-control" value={form.timeSlot} onChange={e=>setForm({...form,timeSlot:e.target.value})}>
                    <option value="">-- Select Time --</option>
                    {TIMES.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Appointment Type *</label>
                  <select className="form-control" value={form.type} onChange={e=>setForm({...form,type:e.target.value})}>
                    {['Consultation','Follow-up','Checkup','Emergency'].map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-group"><label className="form-label">Symptoms / Reason</label><textarea className="form-control" rows={2} value={form.symptoms} onChange={e=>setForm({...form,symptoms:e.target.value})} placeholder="Describe your symptoms or reason for visit..."/></div>
              <div className="form-group"><label className="form-label">Additional Notes</label><textarea className="form-control" rows={2} value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})} placeholder="Any additional information..."/></div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={()=>setModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleBook} disabled={saving}>{saving ? 'Booking...' : 'Book Appointment'}</button>
            </div>
          </div>
        </div>
      )}
    </ProtectedRoute>
  );
}
