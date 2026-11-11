import { useMemo, useState } from 'react';
import { getProjects } from '../services/api';
import { useFetch } from '../hooks/useFetch';
import { usePageTitle } from '../hooks/usePageTitle';
import ProjectCard from '../components/ProjectCard';
import Reveal from '../components/Reveal';
import { ErrorState, Loader } from '../components/StateViews';

export default function Projects() {
  usePageTitle('Projects', 'Selected interior architecture and design projects by Atelier Maison.');
  const { data, loading, error, reload } = useFetch(() => getProjects(), []);
  const [category, setCategory] = useState('All');

  const categories = useMemo(() => ['All', ...Array.from(new Set((data ?? []).map((p) => p.category)))], [data]);
  const visible = (data ?? []).filter((p) => category === 'All' || p.category === category);

  return (
    <div className="container-x pb-24 pt-36 md:pb-32 md:pt-44">
      <Reveal>
        <p className="eyebrow">Portfolio</p>
        <h1 className="mt-4 text-5xl md:text-7xl">Projects</h1>
      </Reveal>

      {data && (
        <div role="group" aria-label="Filter projects by category" className="mt-12 flex flex-wrap gap-3">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={category === c}
              onClick={() => setCategory(c)}
              className={`border px-5 py-2.5 text-[11px] uppercase tracking-widest2 transition-colors ${category === c ? 'border-brown bg-brown text-ivory' : 'border-taupe/60 text-brown hover:border-brown'}`}
            >
              {c}
            </button>
          ))}
        </div>
      )}

      <div className="mt-14">
        {loading && <Loader label="Loading projects" />}
        {error && <ErrorState message={error} onRetry={reload} />}
        {data && visible.length === 0 && <p className="py-16 text-center text-sm text-brown/70">No projects in this category yet.</p>}
        <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p) => <ProjectCard key={p._id} project={p} />)}
        </div>
      </div>
    </div>
  );
}
