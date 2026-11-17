import type { ReactNode } from 'react';
import Reveal from './Reveal';

export default function PageHeader({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <header className="bg-charcoal pb-16 pt-36 md:pb-24 md:pt-48">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow !text-ivory/60">{eyebrow}</p>
          <h1 className="mt-5 max-w-4xl text-5xl leading-[1.05] !text-ivory md:text-7xl">{title}</h1>
          {children && <div className="mt-6 max-w-lg text-sm leading-relaxed text-ivory/70">{children}</div>}
        </Reveal>
      </div>
    </header>
  );
}
