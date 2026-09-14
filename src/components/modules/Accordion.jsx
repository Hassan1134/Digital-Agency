import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { Plus } from 'lucide-react'

export function Accordion({ items }) {
  const [open, setOpen] = useState(0)
  const reduced = useReducedMotion()
  return <div className="accordion">{items.map(([question, answer], index) => { const expanded = open === index; return <div className="accordion__item" key={question}><h3><button aria-expanded={expanded} aria-controls={`faq-panel-${index}`} id={`faq-button-${index}`} onClick={() => setOpen(expanded ? -1 : index)}><span>{question}</span><Plus className={expanded ? 'is-open' : ''} aria-hidden="true" /></button></h3><motion.div id={`faq-panel-${index}`} role="region" aria-labelledby={`faq-button-${index}`} aria-hidden={!expanded} initial={false} animate={expanded ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }} transition={{ duration: reduced ? 0 : .25 }} className="accordion__panel"><p>{answer}</p></motion.div></div>})}</div>
}
