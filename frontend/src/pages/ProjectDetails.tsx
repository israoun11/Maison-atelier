import { Link, useParams } from 'react-router-dom';
import { getProjectBySlug } from '../services/api';
import { useFetch } from '../hooks/useFetch';
import { usePageTitle } from '../hooks/usePageTitle';
import SmartImage from '../components/SmartImage';
import Reveal from '../components/Reveal';
import { ErrorState, Loader } from '../components/StateViews';

export default function ProjectDetails() {
  const { slug = '' } = useParams();
  const { data: project, loading, error, reload } = useFetch(() => getProjectBySlug(slug), [slug]);
  usePageTitle(project?.title ?? 'Project', project?.description.slice(0, 155));

  if (loading) return <div className="pt-40"><Loader label="Loading project" /></div>;
  if (error || !project) {
    return (
      <div className="container-x pt-40">
        <ErrorState message={error ?? 'Project not found.'} onRetry={reload} />
        <p className="text-center"><Link to="/projects" className="link-line text-brown">Back to projects</Link></p>
      </div>
    );
  }

  const info = [
    ['Location', project.location],
    ['Category', project.category],
    ...(project.year ? [['Year', project.year]] : []),
    ...(project.area ? [['Surface', project.area]] : []),
  ];

  return (
    <article className="pb-24 pt-32 md:pb-32 md:pt-40">
      <div className="container-x">
        <Link to="/projects" className="link-line text-brown"><span aria-hidden>←</span> All projects</Link>
        <Reveal>
          <p className="eyebrow mt-10">{project.category}</p>
          <h1 className="mt-4 text-5xl md:text-8xl">{project.title}</h1>
        </Reveal>
      </div>

      <div className="container-x mt-12">
        <div className="aspect-[16/10] overflow-hidden">
          <SmartImage src={project.coverImage} alt={`${project.title}, main view`} eager className="h-full w-full" />
        </div>
      </div>

      <div className="container-x mt-16 grid gap-12 md:grid-cols-12">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-8 md:col-span-4 md:grid-cols-1">
          {info.map(([k, v]) => (
            <div key={k} className="border-t border-taupe/50 pt-4">
              <dt className="eyebrow">{k}</dt>
              <dd className="mt-1 font-serif text-2xl text-brown">{v}</dd>
            </div>
          ))}
        </dl>
        <p className="text-lg leading-relaxed text-brown/85 md:col-span-7 md:col-start-6 md:text-xl">{project.description}</p>
      </div>

      {project.gallery.length > 0 && (
        <div className="container-x mt-20 grid gap-6 md:grid-cols-2">
          {project.gallery.map((src, i) => (
            <Reveal key={src + i} className={i % 3 === 0 ? 'md:col-span-2' : ''}>
              <div className={`overflow-hidden ${i % 3 === 0 ? 'aspect-[16/9]' : 'aspect-[4/5]'}`}>
                <SmartImage src={src} alt={`${project.title}, detail ${i + 1}`} className="h-full w-full" />
              </div>
            </Reveal>
          ))}
        </div>
      )}

      <div className="container-x mt-24 text-center">
        <Link to="/contact" className="btn btn-dark">Start a similar project</Link>
      </div>
    </article>
  );
}
