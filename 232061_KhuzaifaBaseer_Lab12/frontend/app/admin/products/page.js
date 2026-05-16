'use client';
import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store';
import { useRouter } from 'next/navigation';
import { getProducts, getCategories, createProduct, updateProduct, deleteProduct } from '@/lib/api';
import toast from 'react-hot-toast';
import { FaPlus, FaEdit, FaTrash, FaTimes } from 'react-icons/fa';

const EMPTY = { name: '', slug: '', description: '', price: '', oldPrice: '', category: '', stock: '', material: '', images: [''], isFeatured: false, isSpecial: false, isPopular: false, isNew: false };

export default function AdminProductsPage() {
  const { user } = useAuthStore();
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    if (!user || user.role !== 'admin') { router.push('/'); return; }
    load();
    getCategories().then(r => setCategories(r.data.data));
  }, [user, page]);

  const load = () => {
    setLoading(true);
    getProducts({ page, limit: 10 }).then(r => {
      setProducts(r.data.data);
      setPages(r.data.pages);
    }).finally(() => setLoading(false));
  };

  const openCreate = () => { setEditing(null); setForm(EMPTY); setModal(true); };
  const openEdit = (p) => {
    setEditing(p._id);
    setForm({ ...p, category: p.category?._id || '', price: p.price, oldPrice: p.oldPrice || '', images: p.images?.length ? p.images : [''] });
    setModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    const payload = { ...form, price: Number(form.price), oldPrice: form.oldPrice ? Number(form.oldPrice) : null, stock: Number(form.stock), images: form.images.filter(Boolean) };
    try {
      if (editing) { await updateProduct(editing, payload); toast.success('Product updated'); }
      else { await createProduct(payload); toast.success('Product created'); }
      setModal(false); load();
    } catch (err) { toast.error(err.response?.data?.message || 'Save failed'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id, name) => {
    if (!confirm(`Delete "${name}"?`)) return;
    try { await deleteProduct(id); toast.success('Deleted'); load(); }
    catch { toast.error('Delete failed'); }
  };

  const f = (key, val) => setForm(prev => ({ ...prev, [key]: val }));

  return (
    <div className="container mx-auto px-4 max-w-7xl py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-heading font-bold text-wood-800">Products</h1>
        <button onClick={openCreate} className="btn-primary flex items-center gap-2"><FaPlus /> Add Product</button>
      </div>

      {loading ? <div className="text-center py-20 text-wood-400">Loading...</div> : (
        <div className="bg-white border border-wood-100 rounded-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-wood-50">
                <tr>{['Image','Name','Category','Price','Stock','Featured',''].map(h => <th key={h} className="px-4 py-3 text-left text-xs font-bold text-wood-600 uppercase tracking-widest">{h}</th>)}</tr>
              </thead>
              <tbody className="divide-y divide-wood-50">
                {products.map(p => (
                  <tr key={p._id} className="hover:bg-wood-50 transition-colors">
                    <td className="px-4 py-3"><img src={p.images?.[0]} alt="" className="w-12 h-12 object-cover rounded-sm bg-wood-100" /></td>
                    <td className="px-4 py-3 font-semibold text-wood-800 max-w-xs truncate">{p.name}</td>
                    <td className="px-4 py-3 text-wood-500">{p.category?.name}</td>
                    <td className="px-4 py-3 font-bold text-primary">£{p.price}</td>
                    <td className="px-4 py-3"><span className={`text-xs font-bold px-2 py-1 rounded-full ${p.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{p.stock}</span></td>
                    <td className="px-4 py-3">{p.isFeatured ? <span className="text-xs font-bold bg-primary/10 text-primary px-2 py-1 rounded-full">Yes</span> : '—'}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button onClick={() => openEdit(p)} className="text-blue-500 hover:text-blue-700 p-1"><FaEdit /></button>
                        <button onClick={() => handleDelete(p._id, p.name)} className="text-red-400 hover:text-red-600 p-1"><FaTrash /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {pages > 1 && (
            <div className="flex justify-center gap-2 p-4 border-t border-wood-50">
              {[...Array(pages)].map((_,i) => <button key={i} onClick={() => setPage(i+1)} className={`w-9 h-9 text-sm font-bold ${page===i+1 ? 'bg-primary text-white' : 'border border-gray-200 text-wood-600 hover:bg-primary hover:text-white'}`}>{i+1}</button>)}
            </div>
          )}
        </div>
      )}

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-sm w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-wood-100 sticky top-0 bg-white z-10">
              <h2 className="font-heading font-bold text-xl text-wood-800">{editing ? 'Edit Product' : 'Add Product'}</h2>
              <button onClick={() => setModal(false)} className="text-wood-400 hover:text-wood-700"><FaTimes className="text-xl" /></button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-wood-700 mb-1">Name *</label>
                  <input value={form.name} onChange={e => { f('name', e.target.value); f('slug', e.target.value.toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9-]/g,'')); }} required className="w-full border border-gray-200 px-3 py-2 text-sm outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-wood-700 mb-1">Slug *</label>
                  <input value={form.slug} onChange={e => f('slug', e.target.value)} required className="w-full border border-gray-200 px-3 py-2 text-sm outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-wood-700 mb-1">Category *</label>
                  <select value={form.category} onChange={e => f('category', e.target.value)} required className="w-full border border-gray-200 px-3 py-2 text-sm outline-none focus:border-primary">
                    <option value="">Select...</option>
                    {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-wood-700 mb-1">Price (£) *</label>
                  <input type="number" min="0" step="0.01" value={form.price} onChange={e => f('price', e.target.value)} required className="w-full border border-gray-200 px-3 py-2 text-sm outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-wood-700 mb-1">Old Price (£)</label>
                  <input type="number" min="0" step="0.01" value={form.oldPrice} onChange={e => f('oldPrice', e.target.value)} className="w-full border border-gray-200 px-3 py-2 text-sm outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-wood-700 mb-1">Stock *</label>
                  <input type="number" min="0" value={form.stock} onChange={e => f('stock', e.target.value)} required className="w-full border border-gray-200 px-3 py-2 text-sm outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-wood-700 mb-1">Material</label>
                  <input value={form.material} onChange={e => f('material', e.target.value)} className="w-full border border-gray-200 px-3 py-2 text-sm outline-none focus:border-primary" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-wood-700 mb-1">Description *</label>
                  <textarea value={form.description} onChange={e => f('description', e.target.value)} required rows={3} className="w-full border border-gray-200 px-3 py-2 text-sm outline-none focus:border-primary resize-none" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-wood-700 mb-1">Image URL</label>
                  <input value={form.images[0]} onChange={e => f('images', [e.target.value])} className="w-full border border-gray-200 px-3 py-2 text-sm outline-none focus:border-primary" placeholder="https://..." />
                </div>
                <div className="col-span-2 flex flex-wrap gap-4">
                  {[['isFeatured','Featured'], ['isSpecial','Special'], ['isPopular','Popular'], ['isNew','New']].map(([key, label]) => (
                    <label key={key} className="flex items-center gap-2 cursor-pointer text-sm text-wood-600">
                      <input type="checkbox" checked={!!form[key]} onChange={e => f(key, e.target.checked)} className="accent-primary" /> {label}
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 pt-2">
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
