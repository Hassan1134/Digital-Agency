import { ArrowUpRight } from 'lucide-react'
import { Badge } from '../elements/Badge'

export function ProjectCard({ project, onOpen, index }) {
  return (
    <article className={`project-card project-card--${index + 1}`}>
      <button className="project-card__visual" onClick={() => onOpen(project)} aria-label={`View ${project.name} concept project details`}>
        <img src={project.image} alt={project.alt} width="1536" height="1024" loading={index === 0 ? 'eager' : 'lazy'} />
        <span className="project-card__open">View project <ArrowUpRight size={18} /></span>
      </button>
      <div className="project-card__meta"><div><Badge>Concept project</Badge><p className="eyebrow">{project.sector}</p><h3>{project.name}</h3></div><p>{project.summary}</p></div>
      <div className="project-card__tags">{project.services.map((service) => <span key={service}>{service}</span>)}</div>
    </article>
  )
}
