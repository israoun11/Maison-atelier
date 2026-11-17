import { Link } from 'react-router-dom';
import type { Project } from '../types';
import SmartImage from './SmartImage';

export default function ProjectCard({ project, tall = false }: { project: Project; tall?: boolean }) {
  return (
    <Link
      to={`/projects/${project.slug}`}
      className="group block overflow-hidden rounded-md border border-sand bg-paper transition-shadow duration-500 hover:shadow-float"
      aria-label={`${project.title}, ${project.category}, ${project.location}`}
    >
      <div className={`img-zoom overflow-hidden ${tall ? 'aspect-[4/5]' : 'aspect-[4/3]'}`}>
        <SmartImage src={project.coverImage} alt={`${project.title} interior in ${project.location}`} className="h-full w-full" />
      </div>
      <div className="flex items-end justify-between gap-4 p-5">
        <div>
          <p className="eyebrow">{project.category}</p>
          <h3 className="mt-2 text-2xl md:text-3xl">{project.title}</h3>
          <p className="mt-1 text-sm text-brown/65">{project.location}</p>
        </div>
        <span aria-hidden className="text-lg transition-transform duration-300 group-hover:translate-x-1">→</span>
      </div>
    </Link>
  );
}
