import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

const links = [
  { to: '/projects', label: 'Projects' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const overlay = pathname === '/';
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => setOpen(false), [pathname]);

  const solid = scrolled || !overlay || open;
  const tone = solid ? 'text-brown' : 'text-ivory';

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${solid ? 'border-b border-sand bg-ivory/95 backdrop-blur' : 'bg-transparent'}`}>
      <div className={`container-x flex h-20 items-center justify-between ${tone}`}>
        <Link to="/" className="font-serif text-xl uppercase tracking-[0.28em]" aria-label="Atelier Maison, home">
          Atelier Maison
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-10 md:flex">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className={({ isActive }) => `text-[11px] uppercase tracking-widest2 transition-opacity hover:opacity-60 ${isActive ? 'border-b border-current pb-1' : ''}`}>
              {l.label}
            </NavLink>
          ))}
        </nav>
        <button type="button" className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen((o) => !o)}>
          <span className={`h-px w-6 bg-current transition-transform ${open ? 'translate-y-[3.5px] rotate-45' : ''}`} />
          <span className={`h-px w-6 bg-current transition-transform ${open ? '-translate-y-[3.5px] -rotate-45' : ''}`} />
        </button>
      </div>
      {open && (
        <nav id="mobile-menu" aria-label="Mobile" className="border-t border-sand bg-ivory md:hidden">
          <ul className="container-x flex flex-col py-4">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink to={l.to} className="block border-b border-sand py-4 font-serif text-3xl text-brown">{l.label}</NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
