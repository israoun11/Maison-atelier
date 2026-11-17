import { Link } from 'react-router-dom';
import { getMessages, getStats } from '../../services/api';
import { useFetch } from '../../hooks/useFetch';
import { ErrorState, Loader } from '../../components/StateViews';

export default function AdminDashboard() {
  const stats = useFetch(getStats, []);
  const msgs = useFetch(() => getMessages(), []);

  const cards = stats.data
    ? [
        { label: 'Total projects', value: stats.data.projects, dark: true },
        { label: 'Total services', value: stats.data.services },
        { label: 'Total messages', value: stats.data.messages },
        { label: 'New messages', value: stats.data.newMessages },
      ]
    : [];

  return (
    <div>
      <h1 className="text-4xl">Overview</h1>
      {stats.loading && <Loader />}
      {stats.error && <ErrorState message={stats.error} onRetry={stats.reload} />}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((c) => (
          <div key={c.label} className={`p-6 ${c.dark ? 'bg-olive text-ivory' : 'rounded-md border border-sand bg-paper'}`}>
            <p className="text-xs uppercase tracking-widest2 opacity-70">{c.label}</p>
            <p className="mt-3 font-serif text-5xl">{c.value}</p>
          </div>
        ))}
      </div>

      <div className="card mt-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl">Latest messages</h2>
          <Link to="/admin/messages" className="text-xs uppercase tracking-widest2 text-brown underline underline-offset-4">View all</Link>
        </div>
        {msgs.loading && <Loader />}
        {msgs.error && <ErrorState message={msgs.error} onRetry={msgs.reload} />}
        {msgs.data && msgs.data.length === 0 && <p className="text-sm text-brown/70">No messages yet.</p>}
        {msgs.data && msgs.data.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead><tr className="bg-sand/70 text-xs uppercase tracking-widest2 text-brown"><th className="p-3">From</th><th className="p-3">Subject</th><th className="p-3">Status</th><th className="p-3">Received</th></tr></thead>
              <tbody>
                {msgs.data.slice(0, 5).map((m) => (
                  <tr key={m._id} className="border-b border-sand">
                    <td className="p-3">{m.name}</td><td className="p-3">{m.subject}</td>
                    <td className="p-3 capitalize">{m.status}</td><td className="p-3">{new Date(m.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
