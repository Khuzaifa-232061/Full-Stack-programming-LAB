'use client';
import { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';
import ProtectedRoute from '@/components/ProtectedRoute';
import { doctorAPI } from '@/lib/api';
import toast from 'react-hot-toast';
import { Plus, Edit, Trash2, X, Stethoscope, Search } from 'lucide-react';

const EMPTY = { name:'', email:'', password:'', phone:'', specialization:'', qualification:'', experience:'', department:'', licenseNumber:'', consultationFee:'', bio:'' };

export default function AdminDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editDoc, setEditDoc] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [search, setSearch] = useState('');
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    try { const { data } = await doctorAPI.getAll(); setDoctors(data.data); setFiltered(data.data); }
    catch { toast.error('Failed to load doctors'); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);
  useEffect(() => {
    setFiltered(doctors.filter(d =>
      d.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
      d.specialization?.toLowerCase().includes(search.toLowerCase()) ||
      d.department?.toLowerCase().includes(search.toLowerCase())
    ));
  }, [search, doctors]);

  const openAdd = () => { setEditDoc(null); setForm(EMPTY); setModal(true); };
  const openEdit = (d) => {
    setEditDoc(d);
    setForm({ name: d.user?.name, email: d.user?.email, phone: d.user?.phone || '', password: '', specialization: d.specialization, qualification: d.qualification, experience: d.experience, department: d.department, licenseNumber: d.licenseNumber, consultationFee: d.consultationFee, bio: d.bio || '' });
    setModal(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editDoc) {
        await doctorAPI.update(editDoc._id, form);
        toast.success('Doctor updated!');
      } else {
        await doctorAPI.create(form);
        toast.success('Doctor added!');
      }
      setModal(false); load();
    } catch (err) { toast.error(err.response?.data?.message || 'Error saving doctor'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this doctor? This cannot be undone.')) return;
    try { await doctorAPI.delete(id); toast.success('Doctor deleted.'); load(); }
    catch { toast.error('Failed to delete.'); }
  };

  return (
    <ProtectedRoute roles={['admin']}>
      <div className="app-layout">
        <Sidebar />
        <div className="main-content">
          <Topbar title="Doctor Management" subtitle="Manage hospital doctors" />
          <div className="page-content">
            <div className="card">
              <div className="card-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1 }}>
                  <div style={{ position: 'relative', flex: 1, maxWidth: 320 }}>
                    <Search size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                    <input className="form-control" style={{ paddingLeft: 36 }} placeholder="Search doctors..." value={search} onChange={e => setSearch(e.target.value)} />
                  </div>
                  <span style={{ fontSize: 13, color: 'var(--gray)' }}>{filtered.length} doctors</span>
                </div>
                <button className="btn btn-primary" onClick={openAdd}><Plus size={16} /> Add Doctor</button>
              </div>
              <div className="table-wrap">
                {loading ? <div className="loading-spinner"><div className="spinner" /></div> : filtered.length === 0 ? (
                  <div className="empty-state"><Stethoscope /><h3>No doctors found</h3><p>Add your first doctor to get started</p></div>
                ) : (
                  <table>
                    <thead><tr><th>Doctor</th><th>Specialization</th><th>Department</th><th>Experience</th><th>Fee (PKR)</th><th>License</th><th>Actions</th></tr></thead>
                    <tbody>
                      {filtered.map(d => (
                        <tr key={d._id}>
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                              <div className="avatar">{d.user?.name?.split(' ').map(n=>n[0]).join('').slice(0,2)}</div>
                              <div>
                                <div style={{ fontWeight: 600 }}>{d.user?.name}</div>
                                <div style={{ fontSize: 12, color: 'var(--gray)' }}>{d.user?.email}</div>
                              </div>
                            </div>
                          </td>
                          <td><span className="badge badge-primary">{d.specialization}</span></td>
                          <td>{d.department}</td>
                          <td>{d.experience} yrs</td>
                          <td>{d.consultationFee?.toLocaleString()}</td>
                          <td style={{ fontFamily: 'monospace', fontSize: 12 }}>{d.licenseNumber}</td>
                          <td>
                            <div style={{ display: 'flex', gap: 6 }}>
                              <button className="btn btn-secondary btn-sm" onClick={() => openEdit(d)}><Edit size={13} /></button>
                              <button className="btn btn-danger btn-sm" onClick={() => handleDelete(d._id)}><Trash2 size={13} /></button>
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

      {modal && (
        <div className="modal-overlay">
          <div className="modal modal-lg">
            <div className="modal-header">
              <h3 style={{ fontFamily: 'Sora,sans-serif', fontSize: 17 }}>{editDoc ? 'Edit Doctor' : 'Add New Doctor'}</h3>
              <button onClick={() => setModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
            </div>
            <div className="modal-body">
              <div className="form-grid">
                <div className="form-group"><label className="form-label">Full Name</label><input className="form-control" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Dr. Full Name" /></div>
                <div className="form-group"><label className="form-label">Email</label><input className="form-control" type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="doctor@hlapp.com" /></div>
                {!editDoc && <div className="form-group"><label className="form-label">Password</label><input className="form-control" type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} placeholder="Min 6 chars" /></div>}
                <div className="form-group"><label className="form-label">Phone</label><input className="form-control" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} placeholder="0300-0000000" /></div>
                <div className="form-group"><label className="form-label">Specialization</label><input className="form-control" value={form.specialization} onChange={e=>setForm({...form,specialization:e.target.value})} placeholder="e.g. Cardiology" /></div>
                <div className="form-group"><label className="form-label">Department</label><input className="form-control" value={form.department} onChange={e=>setForm({...form,department:e.target.value})} placeholder="e.g. Cardiology" /></div>
                <div className="form-group"><label className="form-label">Qualification</label><input className="form-control" value={form.qualification} onChange={e=>setForm({...form,qualification:e.target.value})} placeholder="MBBS, FCPS" /></div>
                <div className="form-group"><label className="form-label">Experience (years)</label><input className="form-control" type="number" value={form.experience} onChange={e=>setForm({...form,experience:e.target.value})} /></div>
                <div className="form-group"><label className="form-label">License Number</label><input className="form-control" value={form.licenseNumber} onChange={e=>setForm({...form,licenseNumber:e.target.value})} placeholder="PMC-XXXX" /></div>
                <div className="form-group"><label className="form-label">Consultation Fee (PKR)</label><input className="form-control" type="number" value={form.consultationFee} onChange={e=>setForm({...form,consultationFee:e.target.value})} /></div>
              </div>
              <div className="form-group"><label className="form-label">Bio</label><textarea className="form-control" rows={3} value={form.bio} onChange={e=>setForm({...form,bio:e.target.value})} placeholder="Brief doctor bio..." /></div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSave} disabled={saving}>{saving ? 'Saving...' : editDoc ? 'Update Doctor' : 'Add Doctor'}</button>
            </div>
          </div>
        </div>
      )}
    </ProtectedRoute>
  );
}
