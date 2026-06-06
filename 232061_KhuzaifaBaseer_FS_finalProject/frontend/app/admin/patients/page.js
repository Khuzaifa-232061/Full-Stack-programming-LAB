'use client';
import { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';
import ProtectedRoute from '@/components/ProtectedRoute';
import { patientAPI, doctorAPI } from '@/lib/api';
import toast from 'react-hot-toast';
import { Plus, Edit, Trash2, X, Users, Search, UserCheck } from 'lucide-react';

const EMPTY = { name:'', email:'', phone:'', dateOfBirth:'', gender:'Male', bloodGroup:'A+', address:'', allergies:'', chronicConditions:'' };

export default function AdminPatients() {
  const [patients, setPatients] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [assignModal, setAssignModal] = useState(null);
  const [editPat, setEditPat] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [search, setSearch] = useState('');
  const [saving, setSaving] = useState(false);
  const [assignDocId, setAssignDocId] = useState('');

  const load = async () => {
    setLoading(true);
    try {
      const [pd, dd] = await Promise.all([patientAPI.getAll(), doctorAPI.getAll()]);
      setPatients(pd.data.data); setFiltered(pd.data.data); setDoctors(dd.data.data);
    } catch { toast.error('Failed to load patients'); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);
  useEffect(() => {
    setFiltered(patients.filter(p =>
      p.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
      p.user?.email?.toLowerCase().includes(search.toLowerCase())
    ));
  }, [search, patients]);

  const openAdd = () => { setEditPat(null); setForm(EMPTY); setModal(true); };
  const openEdit = (p) => {
    setEditPat(p);
    setForm({ name: p.user?.name, email: p.user?.email, phone: p.user?.phone||'', dateOfBirth: p.dateOfBirth?.split('T')[0]||'', gender: p.gender||'Male', bloodGroup: p.bloodGroup||'A+', address: p.address||'', allergies: p.allergies?.join(', ')||'', chronicConditions: p.chronicConditions?.join(', ')||'' });
    setModal(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = { ...form, allergies: form.allergies.split(',').map(s=>s.trim()).filter(Boolean), chronicConditions: form.chronicConditions.split(',').map(s=>s.trim()).filter(Boolean) };
      if (editPat) { await patientAPI.update(editPat._id, payload); toast.success('Patient updated!'); }
      else { await patientAPI.create(payload); toast.success('Patient added!'); }
      setModal(false); load();
    } catch (err) { toast.error(err.response?.data?.message || 'Error'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this patient?')) return;
    try { await patientAPI.delete(id); toast.success('Deleted.'); load(); }
    catch { toast.error('Failed.'); }
  };

  const handleAssign = async () => {
    if (!assignDocId) { toast.error('Select a doctor'); return; }
    try { await patientAPI.assignDoctor(assignModal._id, assignDocId); toast.success('Doctor assigned!'); setAssignModal(null); load(); }
    catch { toast.error('Failed to assign.'); }
  };

  return (
    <ProtectedRoute roles={['admin']}>
      <div className="app-layout">
        <Sidebar />
        <div className="main-content">
          <Topbar title="Patient Management" subtitle="Manage hospital patients" />
          <div className="page-content">
            <div className="card">
              <div className="card-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1 }}>
                  <div style={{ position: 'relative', flex: 1, maxWidth: 320 }}>
                    <Search size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                    <input className="form-control" style={{ paddingLeft: 36 }} placeholder="Search patients..." value={search} onChange={e => setSearch(e.target.value)} />
                  </div>
                  <span style={{ fontSize: 13, color: 'var(--gray)' }}>{filtered.length} patients</span>
                </div>
                <button className="btn btn-primary" onClick={openAdd}><Plus size={16} /> Add Patient</button>
              </div>
              <div className="table-wrap">
                {loading ? <div className="loading-spinner"><div className="spinner" /></div> : filtered.length === 0 ? (
                  <div className="empty-state"><Users /><h3>No patients found</h3></div>
                ) : (
                  <table>
                    <thead><tr><th>Patient</th><th>Gender</th><th>Blood Group</th><th>Conditions</th><th>Assigned Doctor</th><th>Actions</th></tr></thead>
                    <tbody>
                      {filtered.map(p => (
                        <tr key={p._id}>
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                              <div className="avatar" style={{ background: '#dcfce7', color: '#16a34a' }}>{p.user?.name?.split(' ').map(n=>n[0]).join('').slice(0,2)}</div>
                              <div>
                                <div style={{ fontWeight: 600 }}>{p.user?.name}</div>
                                <div style={{ fontSize: 12, color: 'var(--gray)' }}>{p.user?.email}</div>
                              </div>
                            </div>
                          </td>
                          <td>{p.gender || '—'}</td>
                          <td>{p.bloodGroup ? <span className="badge badge-primary">{p.bloodGroup}</span> : '—'}</td>
                          <td>{p.chronicConditions?.length ? p.chronicConditions.join(', ') : <span style={{ color: 'var(--gray)' }}>None</span>}</td>
                          <td>{p.assignedDoctor?.user?.name || <span style={{ color: 'var(--gray)' }}>Unassigned</span>}</td>
                          <td>
                            <div style={{ display: 'flex', gap: 6 }}>
                              <button className="btn btn-secondary btn-sm" onClick={() => openEdit(p)}><Edit size={13} /></button>
                              <button className="btn btn-success btn-sm" onClick={() => { setAssignModal(p); setAssignDocId(p.assignedDoctor?._id||''); }}><UserCheck size={13} /></button>
                              <button className="btn btn-danger btn-sm" onClick={() => handleDelete(p._id)}><Trash2 size={13} /></button>
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

      {/* Add/Edit Modal */}
      {modal && (
        <div className="modal-overlay">
          <div className="modal modal-lg">
            <div className="modal-header">
              <h3 style={{ fontFamily: 'Sora,sans-serif', fontSize: 17 }}>{editPat ? 'Edit Patient' : 'Add New Patient'}</h3>
              <button onClick={() => setModal(false)} style={{ background:'none', border:'none', cursor:'pointer' }}><X size={20} /></button>
            </div>
            <div className="modal-body">
              <div className="form-grid">
                <div className="form-group"><label className="form-label">Full Name</label><input className="form-control" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} /></div>
                <div className="form-group"><label className="form-label">Email</label><input className="form-control" type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} /></div>
                <div className="form-group"><label className="form-label">Phone</label><input className="form-control" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} /></div>
                <div className="form-group"><label className="form-label">Date of Birth</label><input className="form-control" type="date" value={form.dateOfBirth} onChange={e=>setForm({...form,dateOfBirth:e.target.value})} /></div>
                <div className="form-group"><label className="form-label">Gender</label>
                  <select className="form-control" value={form.gender} onChange={e=>setForm({...form,gender:e.target.value})}>
                    <option>Male</option><option>Female</option><option>Other</option>
                  </select>
                </div>
                <div className="form-group"><label className="form-label">Blood Group</label>
                  <select className="form-control" value={form.bloodGroup} onChange={e=>setForm({...form,bloodGroup:e.target.value})}>
                    {['A+','A-','B+','B-','AB+','AB-','O+','O-'].map(b=><option key={b}>{b}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-group"><label className="form-label">Address</label><input className="form-control" value={form.address} onChange={e=>setForm({...form,address:e.target.value})} /></div>
              <div className="form-grid">
                <div className="form-group"><label className="form-label">Allergies (comma-separated)</label><input className="form-control" value={form.allergies} onChange={e=>setForm({...form,allergies:e.target.value})} placeholder="e.g. Penicillin, Aspirin" /></div>
                <div className="form-group"><label className="form-label">Chronic Conditions</label><input className="form-control" value={form.chronicConditions} onChange={e=>setForm({...form,chronicConditions:e.target.value})} placeholder="e.g. Diabetes, Hypertension" /></div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSave} disabled={saving}>{saving ? 'Saving...' : editPat ? 'Update' : 'Add Patient'}</button>
            </div>
          </div>
        </div>
      )}

      {/* Assign Doctor Modal */}
      {assignModal && (
        <div className="modal-overlay">
          <div className="modal" style={{ maxWidth: 420 }}>
            <div className="modal-header">
              <h3 style={{ fontFamily:'Sora,sans-serif', fontSize:17 }}>Assign Doctor to {assignModal.user?.name}</h3>
              <button onClick={() => setAssignModal(null)} style={{ background:'none', border:'none', cursor:'pointer' }}><X size={20} /></button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Select Doctor</label>
                <select className="form-control" value={assignDocId} onChange={e=>setAssignDocId(e.target.value)}>
                  <option value="">-- Select Doctor --</option>
                  {doctors.map(d => <option key={d._id} value={d._id}>{d.user?.name} — {d.specialization}</option>)}
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setAssignModal(null)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleAssign}>Assign Doctor</button>
            </div>
          </div>
        </div>
      )}
    </ProtectedRoute>
  );
}
