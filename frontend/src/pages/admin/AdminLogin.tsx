import { useState, type FormEvent } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { errorMessage } from '../../services/api';
import { usePageTitle } from '../../hooks/usePageTitle';

export default function AdminLogin() {
  usePageTitle('Admin login');
  const { admin, loading, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  if (!loading && admin) return <Navigate to="/admin/dashboard" replace />;

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      await login(email.trim(), password);
      const from = (location.state as { from?: string } | null)?.from;
      navigate(from && from.startsWith('/admin') ? from : '/admin/dashboard', { replace: true });
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-sand/60 px-6">
      <form onSubmit={onSubmit} className="w-full max-w-md border border-sand bg-ivory p-8 md:p-10" aria-label="Admin login">
        <p className="font-serif text-2xl uppercase tracking-[0.24em] text-brown">Atelier Maison</p>
        <p className="eyebrow mt-1">Admin login</p>
        <div className="mt-8 space-y-6">
          <div>
            <label htmlFor="email" className="label">Email</label>
            <input id="email" type="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} className="field" required />
          </div>
          <div>
            <label htmlFor="password" className="label">Password</label>
            <input id="password" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} className="field" required />
          </div>
          {error && <p role="alert" className="text-sm text-red-800">{error}</p>}
          <button type="submit" className="btn btn-dark w-full" disabled={busy}>{busy ? 'Signing in…' : 'Sign in'}</button>
        </div>
      </form>
    </div>
  );
}
