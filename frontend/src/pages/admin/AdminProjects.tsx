import { useState, type FormEvent } from 'react';
import { createProject, deleteProject, errorMessage, getProjects, updateProject, type ProjectInput } from '../../services/api';
import { useFetch } from '../../hooks/useFetch';
import { ErrorState, Loader } from '../../components/StateViews';
import type { Project } from '../../types';

interface FormState {
  title: string; category: string; location: string; description: string; coverImage: string;
  gallery: string; year: string; area: string; featured: boolean;
}
const blank: FormState = { title: '', category: '', location: '', description: '', coverImage: '', gallery: '', year: '', area: '', featured: false };

const toForm = (p: Project): FormState => ({
  title: p.title, category: p.category, location: p.location, description: p.description, coverImage: p.coverImage,
  gallery: p.gallery.join('\n'), year: p.year ?? '', area: p.area ?? '', featured: p.featured,
});

export default function AdminProjects() {
  const { data, loading, error, reload } = useFetch(() => getProjects(), []);
  const [editing, setEditing] = useState<Project | 'new' | null>(null);
  const [form, setForm] = useState<FormState>(blank);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState('');
  const [formError, setFormError] = useState('');

  const open = (p: Project | 'new') => {
    setEditing(p);
    setForm(p === 'new' ? blank : toForm(p));
    setFormError('');
    setNotice('');
  };

  const set = (k: keyof FormState, v: string | boolean) => setForm((f) => ({ ...f, [k]: v }));

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setFormError('');
    const payload: ProjectInput = {
      title: form.title.trim(), category: form.category.trim(), location: form.location.trim(),
      description: form.description.trim(), coverImage: form.coverImage.trim(),
      gallery: form.gallery.split('\n').map((s) => s.trim()).filter(Boolean),
      featured: form.featured,
      year: form.year.trim() || undefined, area: form.area.trim() || undefined,
    };
    try {
      if (editing === 'new') await createProject(payload);
      else if (editing) await updateProject(editing._id, payload);
      setNotice(editing === 'new' ? 'Project created.' : 'Project updated.');
      setEditing(null);
      reload();
    } catch (err) {
      setFormError(errorMessage(err));
    } finally {
      setBusy(false);
    }
  };

  const toggleFeatured = async (p: Project) => {
    try { await updateProject(p._id, { featured: !p.featured }); reload(); } catch (err) { setNotice(errorMessage(err)); }
  };

  const remove = async (p: Project) => {
    if (!window.confirm(`Delete "${p.title}"? This cannot be undone.`)) return;
    try { await deleteProject(p._id); setNotice('Project deleted.'); reload(); } catch (err) { setNotice(errorMessage(err)); }
  };

  const input = (k: keyof FormState, label: string, required = true) => (
    <div>
      <label htmlFor={`p-${k}`} className="label">{label}</label>
      <input id={`p-${k}`} className="field" value={form[k] as string} onChange={(e) => set(k, e.target.value)} required={required} />
    </div>
  );

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-4xl">Projects</h1>
        <button type="button" className="btn btn-dark" onClick={() => open('new')}>New project</button>
      </div>
      {notice && <p role="status" className="mt-4 text-sm text-brown">{notice}</p>}

      {editing && (
        <form onSubmit={onSubmit} className="card mt-6 space-y-5" aria-label={editing === 'new' ? 'Create project' : 'Edit project'}>
          <h2 className="text-2xl">{editing === 'new' ? 'New project' : `Edit “${editing.title}”`}</h2>
          <div className="grid gap-5 md:grid-cols-2">
            {input('title', 'Title')}{input('category', 'Category (e.g. Residential)')}
            {input('location', 'Location')}{input('coverImage', 'Cover image URL')}
            {input('year', 'Year', false)}{input('area', 'Surface (e.g. 240 m²)', false)}
          </div>
          <div>
            <label htmlFor="p-description" className="label">Description</label>
            <textarea id="p-description" rows={4} className="field" value={form.description} onChange={(e) => set('description', e.target.value)} required />
          </div>
          <div>
            <label htmlFor="p-gallery" className="label">Gallery image URLs (one per line)</label>
            <textarea id="p-gallery" rows={3} className="field" value={form.gallery} onChange={(e) => set('gallery', e.target.value)} />
          </div>
          <label className="flex items-center gap-3 text-sm">
            <input type="checkbox" checked={form.featured} onChange={(e) => set('featured', e.target.checked)} /> Featured on the homepage
          </label>
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
        {data && data.length === 0 && <p className="text-sm text-brown/70">No projects yet.</p>}
        {data && data.length > 0 && (
          <table className="w-full text-left text-sm">
            <thead><tr className="bg-sand/70 text-xs uppercase tracking-widest2 text-brown">
              <th className="p-3">Title</th><th className="p-3">Category</th><th className="p-3">Location</th><th className="p-3">Featured</th><th className="p-3 text-right">Actions</th>
            </tr></thead>
            <tbody>
              {data.map((p) => (
                <tr key={p._id} className="border-b border-sand">
                  <td className="p-3 font-normal">{p.title}</td><td className="p-3">{p.category}</td><td className="p-3">{p.location}</td>
                  <td className="p-3">
                    <button type="button" onClick={() => toggleFeatured(p)} aria-pressed={p.featured} className={`border px-3 py-1 text-xs ${p.featured ? 'border-brown bg-brown text-ivory' : 'border-taupe text-brown'}`}>
                      {p.featured ? 'Featured' : 'Not featured'}
                    </button>
                  </td>
                  <td className="whitespace-nowrap p-3 text-right">
                    <button type="button" className="mr-4 underline underline-offset-4" onClick={() => open(p)}>Edit</button>
                    <button type="button" className="text-red-800 underline underline-offset-4" onClick={() => remove(p)}>Delete</button>
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
