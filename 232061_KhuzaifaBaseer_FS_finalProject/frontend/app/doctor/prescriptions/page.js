'use client';
import { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';
import ProtectedRoute from '@/components/ProtectedRoute';
import { prescriptionAPI, appointmentAPI } from '@/lib/api';
import toast from 'react-hot-toast';
import { Plus, X, FileText, Trash2, Eye } from 'lucide-react';

const EMPTY_MED = { name:'', dosage:'', frequency:'', duration:'', instructions:'', times:'' };

export default function DoctorPrescriptions() {
  const [prescs, setPrescs] = useState([]);
  const [appts, setAppts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [detail, setDetail] = useState(null);
  const [form, setForm] = useState({ appointmentId:'', diagnosis:'', notes:'', followUpRequired:false, followUpDate:'', labTests:'' });
  const [meds, setMeds] = useState([{ ...EMPTY_MED }]);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const [pd, ad] = await Promise.all([prescriptionAPI.getAll(), appointmentAPI.getAll()]);
      setPrescs(pd.data.data);
      setAppts(ad.data.data.filter(a => a.status === 'Approved'));
    } catch { toast.error('Failed to load'); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const addMed = () => setMeds([...meds, { ...EMPTY_MED }]);
  const removeMed = (i) => setMeds(meds.filter((_, idx) => idx !== i));
  const updateMed = (i, field, val) => setMeds(meds.map((m, idx) => idx === i ? { ...m, [field]: val } : m));

  const handleSave = async () => {
    if (!form.appointmentId) { toast.error('Select an appointment'); return; }
    if (!form.diagnosis) { toast.error('Enter diagnosis'); return; }
    if (meds.some(m => !m.name || !m.dosage)) { toast.error('Fill all medication fields'); return; }
    setSaving(true);
    try {
      const payload = {
        ...form,
        labTests: form.labTests.split(',').map(s=>s.trim()).filter(Boolean),
        medications: meds.map(m => ({ ...m, times: m.times.split(',').map(s=>s.trim()).filter(Boolean) })),
      };
      await prescriptionAPI.create(payload);
      toast.success('Prescription created!');
      setModal(false);
      setForm({ appointmentId:'', diagnosis:'', notes:'', followUpRequired:false, followUpDate:'', labTests:'' });
      setMeds([{ ...EMPTY_MED }]);
      load();
    } catch (err) { toast.error(err.response?.data?.message || 'Failed'); }
    finally { setSaving(false); }
  };

  return (
    <ProtectedRoute roles={['doctor']}>
      <div className="app-layout">
        <Sidebar />
        <div className="main-content">
          <Topbar title="Prescriptions" subtitle="Write and manage patient prescriptions" />
          <div className="page-content">
            <div className="card">
              <div className="card-header">
                <div className="section-title">My Prescriptions</div>
                <button className="btn btn-primary" onClick={()=>setModal(true)}><Plus size={16}/> New Prescription</button>
              </div>
              <div className="table-wrap">
                {loading ? <div className="loading-spinner"><div className="spinner"/></div> : prescs.length === 0 ? (
                  <div className="empty-state"><FileText /><h3>No prescriptions yet</h3></div>
                ) : (
                  <table>
                    <thead><tr><th>Patient</th><th>Diagnosis</th><th>Medications</th><th>Date</th><th>Follow-up</th><th>Actions</th></tr></thead>
                    <tbody>
                      {prescs.map(p => (
                        <tr key={p._id}>
                          <td style={{ fontWeight:600 }}>{p.patient?.user?.name}</td>
                          <td>{p.diagnosis}</td>
                          <td><span className="badge badge-primary">{p.medications?.length} medications</span></td>
                          <td style={{ fontSize:13 }}>{new Date(p.createdAt).toLocaleDateString('en-PK',{day:'numeric',month:'short',year:'numeric'})}</td>
                          <td>{p.followUpRequired ? <span className="badge badge-approved">Yes – {p.followUpDate ? new Date(p.followUpDate).toLocaleDateString() : 'TBD'}</span> : '—'}</td>
                          <td><button className="btn btn-secondary btn-sm" onClick={()=>setDetail(p)}><Eye size={13}/></button></td>
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

      {/* New Prescription Modal */}
      {modal && (
        <div className="modal-overlay">
          <div className="modal modal-lg">
            <div className="modal-header">
              <h3 style={{ fontFamily:'Sora,sans-serif', fontSize:17 }}>Write New Prescription</h3>
              <button onClick={()=>setModal(false)} style={{ background:'none',border:'none',cursor:'pointer' }}><X size={20}/></button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Select Appointment</label>
                <select className="form-control" value={form.appointmentId} onChange={e=>setForm({...form,appointmentId:e.target.value})}>
                  <option value="">-- Select Approved Appointment --</option>
                  {appts.map(a => <option key={a._id} value={a._id}>{a.patient?.user?.name} – {new Date(a.appointmentDate).toLocaleDateString()} {a.timeSlot}</option>)}
                </select>
              </div>
              <div className="form-group"><label className="form-label">Diagnosis</label><textarea className="form-control" rows={2} value={form.diagnosis} onChange={e=>setForm({...form,diagnosis:e.target.value})} placeholder="Clinical diagnosis..."/></div>

              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', margin:'16px 0 10px' }}>
                <label className="form-label" style={{ margin:0 }}>Medications</label>
                <button className="btn btn-secondary btn-sm" onClick={addMed}><Plus size={13}/> Add Medication</button>
              </div>
              {meds.map((m, i) => (
                <div key={i} style={{ background:'var(--gray-light)', borderRadius:10, padding:'14px 16px', marginBottom:10, border:'1px solid var(--border)' }}>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:10 }}>
                    <span style={{ fontSize:13, fontWeight:600, color:'var(--primary)' }}>Medication #{i+1}</span>
                    {meds.length > 1 && <button onClick={()=>removeMed(i)} style={{ background:'none',border:'none',cursor:'pointer',color:'var(--danger)' }}><Trash2 size={14}/></button>}
                  </div>
                  <div className="form-grid">
                    <div className="form-group" style={{ marginBottom:8 }}><label className="form-label">Drug Name</label><input className="form-control" value={m.name} onChange={e=>updateMed(i,'name',e.target.value)} placeholder="e.g. Paracetamol"/></div>
                    <div className="form-group" style={{ marginBottom:8 }}><label className="form-label">Dosage</label><input className="form-control" value={m.dosage} onChange={e=>updateMed(i,'dosage',e.target.value)} placeholder="e.g. 500mg"/></div>
                    <div className="form-group" style={{ marginBottom:8 }}><label className="form-label">Frequency</label><input className="form-control" value={m.frequency} onChange={e=>updateMed(i,'frequency',e.target.value)} placeholder="e.g. Twice daily"/></div>
                    <div className="form-group" style={{ marginBottom:8 }}><label className="form-label">Duration</label><input className="form-control" value={m.duration} onChange={e=>updateMed(i,'duration',e.target.value)} placeholder="e.g. 7 days"/></div>
                    <div className="form-group" style={{ marginBottom:8 }}><label className="form-label">Times (comma-sep)</label><input className="form-control" value={m.times} onChange={e=>updateMed(i,'times',e.target.value)} placeholder="08:00, 20:00"/></div>
                    <div className="form-group" style={{ marginBottom:8 }}><label className="form-label">Instructions</label><input className="form-control" value={m.instructions} onChange={e=>updateMed(i,'instructions',e.target.value)} placeholder="After meals"/></div>
                  </div>
                </div>
              ))}

              <div className="form-grid">
                <div className="form-group"><label className="form-label">Lab Tests (comma-sep)</label><input className="form-control" value={form.labTests} onChange={e=>setForm({...form,labTests:e.target.value})} placeholder="CBC, Blood Sugar"/></div>
                <div className="form-group">
                  <label className="form-label">Follow-up Required?</label>
                  <div style={{ display:'flex', alignItems:'center', gap:10, marginTop:8 }}>
                    <input type="checkbox" id="followup" checked={form.followUpRequired} onChange={e=>setForm({...form,followUpRequired:e.target.checked})} style={{ width:16,height:16 }} />
                    <label htmlFor="followup" style={{ fontSize:14 }}>Yes, schedule follow-up</label>
                  </div>
                </div>
              </div>
              {form.followUpRequired && <div className="form-group"><label className="form-label">Follow-up Date</label><input className="form-control" type="date" value={form.followUpDate} onChange={e=>setForm({...form,followUpDate:e.target.value})}/></div>}
              <div className="form-group"><label className="form-label">Additional Notes</label><textarea className="form-control" rows={2} value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})} placeholder="Any additional notes..."/></div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={()=>setModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSave} disabled={saving}>{saving ? 'Saving...' : 'Create Prescription'}</button>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {detail && (
        <div className="modal-overlay">
          <div className="modal modal-lg">
            <div className="modal-header">
              <h3 style={{ fontFamily:'Sora,sans-serif', fontSize:17 }}>Prescription – {detail.patient?.user?.name}</h3>
              <button onClick={()=>setDetail(null)} style={{ background:'none',border:'none',cursor:'pointer' }}><X size={20}/></button>
            </div>
            <div className="modal-body">
              <div className="form-grid" style={{ marginBottom:16 }}>
                <div><div className="info-label">Patient</div><div className="info-value">{detail.patient?.user?.name}</div></div>
                <div><div className="info-label">Date</div><div className="info-value">{new Date(detail.createdAt).toDateString()}</div></div>
                <div><div className="info-label">Diagnosis</div><div className="info-value">{detail.diagnosis}</div></div>
                <div><div className="info-label">Follow-up</div><div className="info-value">{detail.followUpRequired ? new Date(detail.followUpDate)?.toDateString() : 'Not required'}</div></div>
              </div>
              {detail.medications?.map((m,i) => (
                <div key={i} style={{ background:'var(--primary-light)', borderRadius:8, padding:'12px 16px', marginBottom:8, border:'1px solid #bfdbfe' }}>
                  <div style={{ display:'flex', justifyContent:'space-between' }}>
                    <strong>{m.name}</strong><span className="badge badge-primary">{m.dosage}</span>
                  </div>
                  <div style={{ fontSize:13, color:'var(--gray)', marginTop:4 }}>{m.frequency} · {m.duration}{m.instructions && ` · ${m.instructions}`}</div>
                  {m.times?.length > 0 && <div style={{ fontSize:12, color:'var(--primary)', marginTop:3 }}>⏰ {m.times.join(', ')}</div>}
                </div>
              ))}
            </div>
            <div className="modal-footer"><button className="btn btn-secondary" onClick={()=>setDetail(null)}>Close</button></div>
          </div>
        </div>
      )}
    </ProtectedRoute>
  );
}
