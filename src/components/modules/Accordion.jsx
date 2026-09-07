import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Plus } from 'lucide-react'

export function Accordion({ items }) {
  const [open, setOpen] = useState(0)
  const reduced = useReducedMotion()
  return <div className="accordion">{items.map(([question, answer], index) => { const expanded = open === index; return <div className="accordion__item" key={question}><h3><button aria-expanded={expanded} aria-controls={`faq-panel-${index}`} id={`faq-button-${index}`} onClick={() => setOpen(expanded ? -1 : index)}><span>{question}</span><Plus className={expanded ? 'is-open' : ''} /></button></h3><AnimatePresence initial={false}>{expanded && <motion.div id={`faq-panel-${index}`} role="region" aria-labelledby={`faq-button-${index}`} initial={reduced ? false : { height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: reduced ? 0 : .25 }} className="accordion__panel"><p>{answer}</p></motion.div>}</AnimatePresence></div>})}</div>
}
