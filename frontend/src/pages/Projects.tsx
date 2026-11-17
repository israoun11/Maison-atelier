import { useMemo, useState } from 'react';
import { getProjects } from '../services/api';
import { useFetch } from '../hooks/useFetch';
import { usePageTitle } from '../hooks/usePageTitle';
import ProjectCard from '../components/ProjectCard';
import PageHeader from '../components/PageHeader';
import Reveal from '../components/Reveal';
import { ErrorState, Loader } from '../components/StateViews';

export default function Projects() {
  usePageTitle('Projects', 'Selected interior design projects by Maison Karima.');
  const { data, loading, error, reload } = useFetch(() => getProjects(), []);
  const [category, setCategory] = useState('All');

  const categories = useMemo(() => ['All', ...Array.from(new Set((data ?? []).map((p) => p.category)))], [data]);
  const visible = (data ?? []).filter((p) => category === 'All' || p.category === category);

  return (
    <>
      <PageHeader eyebrow="Portfolio" title="Projects">Homes, workplaces and renovations, each shaped around the people who use them.</PageHeader>
      <div className="container-x pb-24 pt-12 md:pb-32">
        {data && (
          <div role="group" aria-label="Filter projects by category" className="flex flex-wrap gap-3">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={category === c}
                onClick={() => setCategory(c)}
                className={`rounded-sm border px-5 py-2.5 text-[11px] uppercase tracking-widest2 transition-colors ${category === c ? 'border-olive-dark bg-olive-dark text-ivory' : 'border-taupe/60 text-brown hover:border-brown'}`}
              >
                {c}
              </button>
            ))}
          </div>
        )}
        <div className="mt-12">
          {loading && <Loader label="Loading projects" />}
          {error && <ErrorState message={error} onRetry={reload} />}
          {data && visible.length === 0 && <p className="py-16 text-center text-sm text-brown/70">No projects in this category yet.</p>}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((p, i) => (
              <Reveal key={p._id} delay={(i % 3) * 80}><ProjectCard project={p} /></Reveal>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
