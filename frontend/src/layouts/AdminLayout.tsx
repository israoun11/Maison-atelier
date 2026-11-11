import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { usePageTitle } from '../hooks/usePageTitle';

const nav = [
  { to: '/admin/dashboard', label: 'Overview' },
  { to: '/admin/projects', label: 'Projects' },
  { to: '/admin/services', label: 'Services' },
  { to: '/admin/messages', label: 'Messages' },
];

export default function AdminLayout() {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  usePageTitle('Admin');

  const onLogout = () => {
    logout();
    navigate('/admin/login', { replace: true });
  };

  return (
    <div className="min-h-screen bg-sand/50 md:flex">
      <aside className="border-b border-sand bg-ivory md:sticky md:top-0 md:h-screen md:w-60 md:shrink-0 md:border-b-0 md:border-r">
        <div className="flex items-center justify-between px-6 py-5 md:block">
          <p className="font-serif text-lg uppercase tracking-[0.24em] text-brown">Atelier Maison</p>
          <p className="eyebrow md:mt-1">Admin</p>
        </div>
        <nav aria-label="Admin" className="flex gap-1 overflow-x-auto px-3 pb-3 md:flex-col md:pb-0">
          {nav.map((n) => (
            <NavLink key={n.to} to={n.to} className={({ isActive }) => `whitespace-nowrap px-4 py-2.5 text-sm transition-colors ${isActive ? 'bg-sand text-brown' : 'text-brown/70 hover:bg-sand/60'}`}>
              {n.label}
            </NavLink>
          ))}
          <a href="/" target="_blank" rel="noreferrer" className="whitespace-nowrap px-4 py-2.5 text-sm text-brown/70 hover:bg-sand/60">View site ↗</a>
        </nav>
      </aside>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between bg-brown px-6 py-4 text-ivory md:px-10">
          <p className="text-sm">Welcome, {admin?.name}</p>
          <button type="button" onClick={onLogout} className="rounded-sm bg-taupe px-4 py-2 text-[11px] uppercase tracking-widest2 text-charcoal transition-opacity hover:opacity-80">
            Log out
          </button>
        </div>
        <main className="p-6 md:p-10"><Outlet /></main>
      </div>
    </div>
  );
}
