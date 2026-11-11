import { useState, type FormEvent } from 'react';
import { createService, deleteService, errorMessage, getServices, updateService } from '../../services/api';
import { useFetch } from '../../hooks/useFetch';
import { ErrorState, Loader } from '../../components/StateViews';
import type { Service } from '../../types';

const blank = { title: '', description: '', image: '' };

export default function AdminServices() {
  const { data, loading, error, reload } = useFetch(getServices, []);
  const [editing, setEditing] = useState<Service | 'new' | null>(null);
  const [form, setForm] = useState(blank);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState('');
  const [formError, setFormError] = useState('');

  const open = (s: Service | 'new') => {
    setEditing(s);
    setForm(s === 'new' ? blank : { title: s.title, description: s.description, image: s.image });
    setFormError('');
    setNotice('');
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setFormError('');
    const payload = { title: form.title.trim(), description: form.description.trim(), image: form.image.trim() };
    try {
      if (editing === 'new') await createService(payload);
      else if (editing) await updateService(editing._id, payload);
      setNotice(editing === 'new' ? 'Service created.' : 'Service updated.');
      setEditing(null);
      reload();
    } catch (err) {
      setFormError(errorMessage(err));
    } finally {
      setBusy(false);
    }
  };

  const remove = async (s: Service) => {
    if (!window.confirm(`Delete "${s.title}"? This cannot be undone.`)) return;
    try { await deleteService(s._id); setNotice('Service deleted.'); reload(); } catch (err) { setNotice(errorMessage(err)); }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-4xl">Services</h1>
        <button type="button" className="btn btn-dark" onClick={() => open('new')}>New service</button>
      </div>
      {notice && <p role="status" className="mt-4 text-sm text-brown">{notice}</p>}

      {editing && (
        <form onSubmit={onSubmit} className="card mt-6 space-y-5" aria-label={editing === 'new' ? 'Create service' : 'Edit service'}>
          <h2 className="text-2xl">{editing === 'new' ? 'New service' : `Edit “${editing.title}”`}</h2>
          <div>
            <label htmlFor="s-title" className="label">Title</label>
            <input id="s-title" className="field" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          </div>
          <div>
            <label htmlFor="s-image" className="label">Image URL</label>
            <input id="s-image" className="field" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} required />
          </div>
          <div>
            <label htmlFor="s-description" className="label">Description</label>
            <textarea id="s-description" rows={4} className="field" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
          </div>
          {formError && <p role="alert" className="text-sm text-red-800">{formError}</p>}
          <div className="flex gap-3">
            <button type="submit" className="btn btn-dark" disabled={busy}>{busy ? 'Saving…' : 'Save'}</button>
            <button type="button" className="btn btn-line" onClick={() => setEditing(null)}>Cancel</button>
          </div>
        </form>
      )}

      <div className="card mt-6 overflow-x-auto">
        {loading && <Loader />}
        {error && <ErrorState message={error} onRetry={reload} />}
        {data && data.length === 0 && <p className="text-sm text-brown/70">No services yet.</p>}
        {data && data.length > 0 && (
          <table className="w-full text-left text-sm">
            <thead><tr className="bg-sand/70 text-xs uppercase tracking-widest2 text-brown"><th className="p-3">Title</th><th className="p-3">Description</th><th className="p-3 text-right">Actions</th></tr></thead>
            <tbody>
              {data.map((s) => (
                <tr key={s._id} className="border-b border-sand align-top">
                  <td className="p-3 font-normal">{s.title}</td>
                  <td className="max-w-md p-3 text-brown/80">{s.description}</td>
                  <td className="whitespace-nowrap p-3 text-right">
                    <button type="button" className="mr-4 underline underline-offset-4" onClick={() => open(s)}>Edit</button>
                    <button type="button" className="text-red-800 underline underline-offset-4" onClick={() => remove(s)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
