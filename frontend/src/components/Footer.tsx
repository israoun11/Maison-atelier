import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-charcoal text-ivory">
      <div className="container-x grid gap-12 py-16 md:grid-cols-3">
        <div>
          <p className="font-serif text-2xl uppercase tracking-[0.28em]">Atelier Maison</p>
          <p className="mt-4 max-w-xs text-sm text-taupe">Interior architecture and design for calm, material-led spaces.</p>
        </div>
        <nav aria-label="Footer">
          <p className="eyebrow">Explore</p>
          <ul className="mt-4 space-y-2 text-sm">
            {[['/projects', 'Projects'], ['/services', 'Services'], ['/about', 'About'], ['/contact', 'Contact']].map(([to, label]) => (
              <li key={to}><Link to={to} className="transition-opacity hover:opacity-60">{label}</Link></li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="eyebrow">Studio</p>
          <address className="mt-4 space-y-2 text-sm not-italic">
            <p>12 Rue des Archives, 75003 Paris</p>
            <p><a href="mailto:hello@ateliermaison.example" className="transition-opacity hover:opacity-60">hello@ateliermaison.example</a></p>
          </address>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col justify-between gap-2 py-6 text-xs text-taupe md:flex-row">
          <p>© {new Date().getFullYear()} Atelier Maison. A fictional studio.</p>
          <Link to="/admin/login" className="transition-opacity hover:opacity-60">Admin</Link>
        </div>
      </div>
    </footer>
  );
}
