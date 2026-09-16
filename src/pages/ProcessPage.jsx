import { Check } from 'lucide-react'
import { CTASection } from '../components/modules/CTASection'
import { PageIntro } from '../components/modules/PageIntro'
import { Reveal } from '../components/modules/Reveal'
import { Seo } from '../components/modules/Seo'
import { processStages } from '../data/siteContent'
import { siteSeo } from '../data/seo'

export function ProcessPage() {
  return <>
    <Seo {...siteSeo.process} />
    <PageIntro dark eyebrow="How we work · Visible progress" title={<>One process from first question to <em>measured improvement.</em></>} copy="A clear sequence, named decisions, and visible work-in-progress keep ambitious projects moving without mystery." />
    <section className="section process-detail"><div className="container"><div className="section-heading"><p className="eyebrow">The delivery path · 01</p><h2>Six stages.<br /><em>One shared outcome.</em></h2><p>The shape adapts to the engagement, but the principles stay consistent: reduce uncertainty early, make decisions visible, and validate before scaling.</p></div><div className="process-detail__grid">{processStages.map(([title, description, output], index) => <Reveal className="process-detail__card" key={title} delay={index * .04}><span>{String(index + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{description}</p><div><Check aria-hidden="true" /><small>{output}</small></div></Reveal>)}</div></div></section>
    <section className="section working-agreement surface-dark"><div className="container"><div className="section-heading section-heading--light"><p className="eyebrow">Working agreement · 02</p><h2>Know what to expect.</h2></div><div className="working-agreement__grid">{[
      ['Communication', 'A named owner, regular working sessions, written decisions, and a shared view of priorities and progress.'],
      ['Feedback', 'Purposeful review rounds with the right decision-makers, tied to the agreed audience, objective, and constraints.'],
      ['Ownership', 'Your proposal defines intellectual property, third-party licences, access, hosting, and handover responsibilities clearly.'],
      ['After launch', 'Documentation, training, monitoring, and a prioritised improvement plan keep the work useful beyond release.'],
    ].map(([title, text]) => <article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>
    <CTASection title="Bring the challenge. We’ll make the next decisions clear." copy="Tell us what needs to change, what exists today, and what a useful outcome would look like." />
  </>
}
