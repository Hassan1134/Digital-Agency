import { Reveal } from './Reveal'

export function PageIntro({ eyebrow, title, copy, dark = false }) {
  return (
    <section className={`page-intro ${dark ? 'surface-dark' : ''}`}>
      <div className="container page-intro__grid">
        <p className="eyebrow">{eyebrow}</p>
        <Reveal><h1>{title}</h1></Reveal>
        <Reveal delay={0.08}><p className="lede">{copy}</p></Reveal>
      </div>
    </section>
  )
}
