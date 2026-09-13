import { useCallback, useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useFocusTrap } from '../../hooks/useFocusTrap'
import { Badge } from '../elements/Badge'

export function ProjectDialog({ project, onClose }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const close = useCallback(() => onClose(), [onClose])
  useFocusTrap(ref, Boolean(project), close)
  useEffect(() => {
    if (!project) return undefined
    document.body.classList.add('has-project-dialog')
    return () => document.body.classList.remove('has-project-dialog')
  }, [project])
  return (
    <AnimatePresence>
      {project && <motion.div className="dialog-backdrop" initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={reduced ? undefined : { opacity: 0 }} onMouseDown={(e) => e.target === e.currentTarget && close()}>
      <motion.section className="project-dialog" ref={ref} role="dialog" aria-modal="true" aria-labelledby="dialog-title" initial={reduced ? false : { opacity: 0, y: 50, rotateX: -4 }} animate={{ opacity: 1, y: 0, rotateX: 0 }} exit={reduced ? undefined : { opacity: 0, y: 30 }} transition={{ type: 'spring', stiffness: 170, damping: 22 }}>
        <button className="dialog-close" onClick={close} aria-label="Close project"><X /></button>
        <div className="project-dialog__image"><img src={project.image} alt={project.alt} width="1536" height="1024" /><span>Concept archive / {project.id}</span></div>
        <div className="project-dialog__content">
          <Badge tone="lime">Concept project</Badge><p className="eyebrow">{project.sector}</p><h2 id="dialog-title">{project.name}</h2>
          <div className="project-dialog__services">{project.services.map((service) => <span key={service}>{service}</span>)}</div>
          <div className="dialog-columns"><div><h3>The brief</h3><p>{project.brief}</p></div><div><h3>Our approach</h3><p>{project.approach}</p></div><div><h3>Deliverables</h3><ul>{project.deliverables.map((item) => <li key={item}>{item}</li>)}</ul></div></div>
        </div>
      </motion.section>
    </motion.div>}
    </AnimatePresence>
  )
}
