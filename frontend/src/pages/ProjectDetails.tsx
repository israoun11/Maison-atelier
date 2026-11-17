import { Link, useParams } from 'react-router-dom';
import { getProjectBySlug } from '../services/api';
import { useFetch } from '../hooks/useFetch';
import { usePageTitle } from '../hooks/usePageTitle';
import SmartImage from '../components/SmartImage';
import PageHeader from '../components/PageHeader';
import Reveal from '../components/Reveal';
import { ErrorState, Loader } from '../components/StateViews';

export default function ProjectDetails() {
  const { slug = '' } = useParams();
  const { data: project, loading, error, reload } = useFetch(() => getProjectBySlug(slug), [slug]);
  usePageTitle(
  project?.title ?? 'Project',
  project?.description?.slice(0, 155) ?? ''
);
  if (loading || error || !project) {
    return (
      <>
        <PageHeader eyebrow="Project" title={loading ? 'Loading…' : 'Project unavailable'} />
        <div className="container-x py-16">
          {loading && <Loader label="Loading project" />}
          {!loading && <ErrorState message={error ?? 'Project not found.'} onRetry={reload} />}
          <p className="text-center"><Link to="/projects" className="link-line text-brown">Back to projects</Link></p>
        </div>
      </>
    );
  }

  const info = [
    ['Location', project.location],
    ['Category', project.category],
    ...(project.year ? [['Year', project.year]] : []),
    ...(project.area ? [['Surface', project.area]] : []),
  ];

  return (
    <article>
      <section className="relative flex min-h-[75svh] items-end overflow-hidden bg-charcoal">
        <SmartImage src={project.coverImage} alt={`${project.title}, main view`} eager className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/25 to-charcoal/40" aria-hidden />
        <div className="container-x relative pb-12 pt-40 text-ivory md:pb-16">
          <Link to="/projects" className="link-line"><span aria-hidden>←</span> All projects</Link>
          <p className="eyebrow mt-8 !text-ivory/70">{project.category}</p>
          <h1 className="mt-3 text-5xl !text-ivory md:text-8xl">{project.title}</h1>
        </div>
      </section>

      <div className="container-x grid gap-12 py-16 md:grid-cols-12 md:py-24">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-8 md:col-span-4 md:grid-cols-1">
          {info.map(([k, v]) => (
            <div key={k} className="border-t border-taupe/50 pt-4">
              <dt className="eyebrow">{k}</dt>
              <dd className="mt-1 font-serif text-2xl">{v}</dd>
            </div>
          ))}
        </dl>
        <p className="text-lg leading-relaxed text-brown/85 md:col-span-7 md:col-start-6 md:text-xl">{project.description}</p>
      </div>

      {project.gallery?.length > 0 && (
        <div className="container-x grid gap-6 pb-24 md:grid-cols-2">
          {(project.gallery ?? []).map((src, i) => (
            <Reveal key={src + i} className={i % 3 === 0 ? 'md:col-span-2' : ''}>
              <div className={`overflow-hidden rounded-md ${i % 3 === 0 ? 'aspect-[16/9]' : 'aspect-[4/5]'}`}>
                <SmartImage src={src} alt={`${project.title}, detail ${i + 1}`} className="h-full w-full" />
              </div>
            </Reveal>
          ))}
        </div>
      )}

      <section className="bg-olive py-16 text-center text-ivory">
        <div className="container-x">
          <h2 className="text-4xl !text-ivory md:text-5xl">Imagine something similar?</h2>
          <Link to="/contact" className="btn btn-light mt-8">Book a consultation <span aria-hidden>→</span></Link>
        </div>
      </section>
    </article>
  );
}
