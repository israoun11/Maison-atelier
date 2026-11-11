import { useState } from 'react';
import { deleteMessage, errorMessage, getMessages, updateMessageStatus } from '../../services/api';
import { useFetch } from '../../hooks/useFetch';
import { ErrorState, Loader } from '../../components/StateViews';
import type { ContactMessage, MessageStatus } from '../../types';

const statuses: MessageStatus[] = ['new', 'read', 'archived'];

export default function AdminMessages() {
  const [filter, setFilter] = useState<MessageStatus | ''>('');
  const { data, loading, error, reload } = useFetch(() => getMessages(filter || undefined), [filter]);
  const [selected, setSelected] = useState<ContactMessage | null>(null);
  const [notice, setNotice] = useState('');

  const open = async (m: ContactMessage) => {
    setSelected(m);
    setNotice('');
    if (m.status === 'new') {
      try {
        const updated = await updateMessageStatus(m._id, 'read');
        setSelected(updated);
        reload();
      } catch (err) { setNotice(errorMessage(err)); }
    }
  };

  const setStatus = async (m: ContactMessage, status: MessageStatus) => {
    try {
      const updated = await updateMessageStatus(m._id, status);
      setSelected(updated);
      setNotice(`Marked as ${status}.`);
      reload();
    } catch (err) { setNotice(errorMessage(err)); }
  };

  const remove = async (m: ContactMessage) => {
    if (!window.confirm('Delete this message permanently?')) return;
    try {
      await deleteMessage(m._id);
      setSelected(null);
      setNotice('Message deleted.');
      reload();
    } catch (err) { setNotice(errorMessage(err)); }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-4xl">Messages</h1>
        <div>
          <label htmlFor="status-filter" className="sr-only">Filter by status</label>
          <select id="status-filter" className="field !w-auto" value={filter} onChange={(e) => { setFilter(e.target.value as MessageStatus | ''); setSelected(null); }}>
            <option value="">All messages</option>
            {statuses.map((s) => <option key={s} value={s}>{s[0].toUpperCase() + s.slice(1)}</option>)}
          </select>
        </div>
      </div>
      {notice && <p role="status" className="mt-4 text-sm text-brown">{notice}</p>}

      <div className="mt-6 grid gap-6 lg:grid-cols-5">
        <div className="card overflow-hidden !p-0 lg:col-span-2">
          {loading && <Loader />}
          {error && <ErrorState message={error} onRetry={reload} />}
          {data && data.length === 0 && <p className="p-6 text-sm text-brown/70">No messages.</p>}
          <ul>
            {data?.map((m) => (
              <li key={m._id} className="border-b border-sand">
                <button type="button" onClick={() => open(m)} className={`block w-full px-5 py-4 text-left transition-colors hover:bg-sand/50 ${selected?._id === m._id ? 'bg-sand/70' : ''}`}>
                  <span className="flex items-center justify-between gap-3">
                    <span className={`text-sm ${m.status === 'new' ? 'font-normal text-brown' : 'text-brown/70'}`}>{m.name}</span>
                    <span className="text-[10px] uppercase tracking-widest2 text-taupe">{m.status}</span>
                  </span>
                  <span className="mt-1 block truncate text-sm text-brown/80">{m.subject}</span>
                  <span className="mt-1 block text-xs text-taupe">{new Date(m.createdAt).toLocaleString()}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="card lg:col-span-3" aria-live="polite">
          {!selected && <p className="text-sm text-brown/70">Select a message to read it.</p>}
          {selected && (
            <div>
              <p className="eyebrow">{selected.status}</p>
              <h2 className="mt-2 text-3xl">{selected.subject}</h2>
              <p className="mt-3 text-sm text-brown/80">
                From {selected.name} · <a className="underline underline-offset-4" href={`mailto:${selected.email}`}>{selected.email}</a>
              </p>
              <p className="text-xs text-taupe">{new Date(selected.createdAt).toLocaleString()}</p>
              <p className="mt-6 whitespace-pre-wrap text-sm leading-relaxed">{selected.message}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                {statuses.filter((s) => s !== selected.status).map((s) => (
                  <button key={s} type="button" className="btn btn-line !py-2.5" onClick={() => setStatus(selected, s)}>Mark {s}</button>
                ))}
                <button type="button" className="btn border border-red-800/50 !py-2.5 text-red-800 hover:bg-red-800 hover:text-ivory" onClick={() => remove(selected)}>Delete</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
