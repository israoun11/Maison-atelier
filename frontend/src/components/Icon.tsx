import type { ReactNode } from 'react';

export type IconName = 'listen' | 'assess' | 'plan' | 'guide' | 'calendar' | 'residential' | 'hospitality' | 'commercial' | 'renovation';

const paths: Record<IconName, ReactNode> = {
  listen: <><path d="M5 6h14v9H10l-4 3v-3H5z" /><path d="M9 10h6" /></>,
  assess: <><circle cx="11" cy="11" r="5" /><path d="m15 15 4 4" /></>,
  plan: <><rect x="5" y="5" width="14" height="14" /><path d="M5 11h14M11 5v14" /></>,
  guide: <><circle cx="12" cy="12" r="7" /><path d="m15 9-2 5-4 1 2-5z" /></>,
  calendar: <><rect x="5" y="6" width="14" height="13" rx="1" /><path d="M5 10h14M9 4v4M15 4v4" /></>,
  residential: <><path d="M5 11 12 5l7 6v8H5z" /><path d="M10 19v-5h4v5" /></>,
  hospitality: <><path d="M6 18V9h12v9" /><path d="M4 13h16M8 9V6h8v3" /></>,
  commercial: <><rect x="6" y="5" width="12" height="14" /><path d="M10 9h1M13 9h1M10 13h1M13 13h1M11 19v-3h2v3" /></>,
  renovation: <><path d="m14 6 4 4-8 8H6v-4z" /><path d="m12 8 4 4" /></>,
};

export default function Icon({ name, className = 'h-5 w-5' }: { name: IconName; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

// Picks a fitting icon from a service title; falls back to a neutral one.
export function serviceIcon(title: string): IconName {
  const t = title.toLowerCase();
  if (t.includes('residential')) return 'residential';
  if (t.includes('commercial')) return 'commercial';
  if (t.includes('hospitality')) return 'hospitality';
  if (t.includes('renovation') || t.includes('styling')) return 'renovation';
  return 'plan';
}
