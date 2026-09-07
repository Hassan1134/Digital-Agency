import { Button } from '../elements/Button'
import { Reveal } from './Reveal'

export function CTASection({ title = 'Let’s build your next growth story.', copy = 'Tell us what you’re working on. We’ll help you define the right next step.' }) {
  return <section className="closing-cta surface-dark"><div className="container"><div className="closing-cta__motif" aria-hidden="true"><span></span><i>↗</i></div><Reveal><p className="eyebrow">Your next move</p><h2>{title}</h2><p>{copy}</p><Button to="/contact">Tell Us About Your Project</Button></Reveal></div></section>
}
