'use client';
import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store';
import { useRouter } from 'next/navigation';
import { getCategories, createCategory, updateCategory, deleteCategory } from '@/lib/api';
import toast from 'react-hot-toast';
import { FaPlus, FaEdit, FaTrash, FaTimes } from 'react-icons/fa';

export default function AdminCategoriesPage() {
  const { user } = useAuthStore();
  const router = useRouter();
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', slug: '', description: '' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user || user.role !== 'admin') { router.push('/'); return; }
    load();
  }, [user]);

  const load = () => { setLoading(true); getCategories().then(r => setCats(r.data.data)).finally(() => setLoading(false)); };

  const openCreate = () => { setEditing(null); setForm({ name: '', slug: '', description: '' }); setModal(true); };
  const openEdit = (c) => { setEditing(c._id); setForm({ name: c.name, slug: c.slug, description: c.description || '' }); setModal(true); };

  const handleSave = async (e) => {
    e.preventDefault(); setSaving(true);
    try {
      if (editing) { await updateCategory(editing, form); toast.success('Updated'); }
      else { await createCategory(form); toast.success('Created'); }
      setModal(false); load();
    } catch (err) { toast.error(err.response?.data?.message || 'Failed'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id, name) => {
    if (!confirm(`Delete "${name}"?`)) return;
    try { await deleteCategory(id); toast.success('Deleted'); load(); }
    catch { toast.error('Delete failed'); }
  };

  return (
    <div className="container mx-auto px-4 max-w-4xl py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-heading font-bold text-wood-800">Categories</h1>
        <button onClick={openCreate} className="btn-primary flex items-center gap-2"><FaPlus /> Add Category</button>
      </div>
      {loading ? <div className="text-center py-10 text-wood-400">Loading...</div> : (
        <div className="bg-white border border-wood-100 rounded-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-wood-50">
              <tr>{['Name','Slug','Description',''].map(h => <th key={h} className="px-4 py-3 text-left text-xs font-bold text-wood-600 uppercase tracking-widest">{h}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-wood-50">
              {cats.map(c => (
                <tr key={c._id} className="hover:bg-wood-50">
                  <td className="px-4 py-3 font-semibold text-wood-800">{c.name}</td>
                  <td className="px-4 py-3 font-mono text-xs text-wood-500">{c.slug}</td>
                  <td className="px-4 py-3 text-wood-400 max-w-xs truncate">{c.description || '—'}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => openEdit(c)} className="text-blue-500 hover:text-blue-700 p-1"><FaEdit /></button>
                      <button onClick={() => handleDelete(c._id, c.name)} className="text-red-400 hover:text-red-600 p-1"><FaTrash /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-sm w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="font-heading font-bold text-xl text-wood-800">{editing ? 'Edit Category' : 'Add Category'}</h2>
              <button onClick={() => setModal(false)}><FaTimes className="text-wood-400 hover:text-wood-700" /></button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-wood-700 mb-1">Name *</label>
                <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g,'-') }))} required className="w-full border border-gray-200 px-3 py-2 text-sm outline-none focus:border-primary" />
              </div>
              <div>
                <label className="block text-xs font-bold text-wood-700 mb-1">Slug *</label>
                <input value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))} required className="w-full border border-gray-200 px-3 py-2 text-sm outline-none focus:border-primary" />
              </div>
              <div>
                <label className="block text-xs font-bold text-wood-700 mb-1">Description</label>
                <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={3} className="w-full border border-gray-200 px-3 py-2 text-sm outline-none focus:border-primary resize-none" />
              </div>
              <div className="flex gap-3">
                <button type="submit" disabled={saving} className="btn-primary flex-1 py-3 disabled:opacity-60">{saving ? 'Saving...' : editing ? 'Update' : 'Create'}</button>
                <button type="button" onClick={() => setModal(false)} className="btn-outline flex-1 py-3">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
