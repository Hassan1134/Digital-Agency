import { useCallback, useRef } from 'react'
import { X } from 'lucide-react'
import { useFocusTrap } from '../../hooks/useFocusTrap'
import { Badge } from '../elements/Badge'

export function ProjectDialog({ project, onClose }) {
  const ref = useRef(null)
  const close = useCallback(() => onClose(), [onClose])
  useFocusTrap(ref, Boolean(project), close)
  if (!project) return null
  return (
    <div className="dialog-backdrop" onMouseDown={(e) => e.target === e.currentTarget && close()}>
      <section className="project-dialog" ref={ref} role="dialog" aria-modal="true" aria-labelledby="dialog-title">
        <button className="dialog-close" onClick={close} aria-label="Close project"><X /></button>
        <img src={project.image} alt={project.alt} width="1536" height="1024" />
        <div className="project-dialog__content">
          <Badge tone="lime">Concept project</Badge><p className="eyebrow">{project.sector}</p><h2 id="dialog-title">{project.name}</h2>
          <div className="dialog-columns"><div><h3>The brief</h3><p>{project.brief}</p></div><div><h3>Our approach</h3><p>{project.approach}</p></div><div><h3>Deliverables</h3><ul>{project.deliverables.map((item) => <li key={item}>{item}</li>)}</ul></div></div>
        </div>
      </section>
    </div>
  )
}
