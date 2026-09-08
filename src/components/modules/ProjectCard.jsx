import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { Badge } from '../elements/Badge'
import { useMediaQuery } from '../../hooks/useMediaQuery'

export function ProjectCard({ project, onOpen, index }) {
  const reduced = useReducedMotion()
  const finePointer = useMediaQuery('(pointer: fine)')
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, y: 0 })
  const move = (event) => {
    if (reduced || !finePointer) return
    const rect = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5
    setTilt({ rotateX: y * -5, rotateY: x * 7, y: -4 })
  }
  const reset = () => setTilt({ rotateX: 0, rotateY: 0, y: 0 })

  return (
    <article className={`project-card project-card--${index + 1}`}>
      <motion.button
        className="project-card__visual"
        onClick={() => onOpen(project)}
        onPointerMove={move}
        onPointerLeave={reset}
        onBlur={reset}
        animate={reduced || !finePointer ? undefined : tilt}
        transition={{ type: 'spring', stiffness: 180, damping: 22, mass: 0.7 }}
        style={{ transformPerspective: 1200, transformStyle: 'preserve-3d' }}
        aria-label={`View ${project.name} concept project details`}
      >
        <img src={project.image} alt={project.alt} width="1536" height="1024" loading={index === 0 ? 'eager' : 'lazy'} />
        <span className="project-card__open">View project <ArrowUpRight size={18} /></span>
        <span className="project-card__depth-line" aria-hidden="true" />
      </motion.button>
      <div className="project-card__meta"><div><Badge>Concept project</Badge><p className="eyebrow">{project.sector}</p><h3>{project.name}</h3></div><p>{project.summary}</p></div>
      <div className="project-card__tags">{project.services.map((service) => <span key={service}>{service}</span>)}</div>
    </article>
  )
}
