import { Link } from 'react-router-dom';
import type { Project } from '../types';
import SmartImage from './SmartImage';

export default function ProjectCard({ project, tall = true }: { project: Project; tall?: boolean }) {
  return (
    <Link to={`/projects/${project.slug}`} className="group block" aria-label={`${project.title}, ${project.category}, ${project.location}`}>
      <div className={`img-zoom overflow-hidden ${tall ? 'aspect-[4/5]' : 'aspect-[4/3]'}`}>
        <SmartImage src={project.coverImage} alt={`${project.title} interior in ${project.location}`} className="h-full w-full" />
      </div>
      <div className="mt-5 flex items-baseline justify-between gap-4">
        <h3 className="text-2xl md:text-3xl">{project.title}</h3>
        <span className="shrink-0 text-[11px] uppercase tracking-widest2 text-taupe">{project.category}</span>
      </div>
      <p className="mt-1 text-sm text-brown/70">{project.location}</p>
    </Link>
  );
}
