import { useEffect, useMemo, useState } from 'react'
import { ArrowRight, Check, Clapperboard, MessagesSquare, MonitorSmartphone, MousePointerClick, Search, Shapes } from 'lucide-react'
import { Link, useSearchParams } from 'react-router-dom'
import { Button } from '../components/elements/Button'
import { CTASection } from '../components/modules/CTASection'
import { PageIntro } from '../components/modules/PageIntro'
import { Reveal } from '../components/modules/Reveal'
import { Seo } from '../components/modules/Seo'
import { goals, services } from '../data/content'

const icons = { MonitorSmartphone, Shapes, Search, MousePointerClick, MessagesSquare, Clapperboard }

export function ServicesPage() {
  const [params] = useSearchParams()
  const initialGoal = goals.some((g) => g.id === params.get('goal')) ? params.get('goal') : ''
  const [goal, setGoal] = useState('')
  useEffect(() => {
    if (!initialGoal) return undefined
    const frame = requestAnimationFrame(() => setGoal(initialGoal))
    return () => cancelAnimationFrame(frame)
  }, [initialGoal])
  const relevant = useMemo(() => new Set(services.filter((s) => !goal || s.goals.includes(goal)).map((s) => s.id)), [goal])
  return <>
    <Seo title="Services — Growth Studio" description="Explore connected website, brand, SEO, advertising, social, and creative services built around meaningful business goals." path="/services" />
    <PageIntro dark eyebrow="Services · Strategy to momentum" title={<>Expertise that works <em>better together.</em></>} copy="Choose a focused project or connect the disciplines around a bigger commercial goal. Either way, the work starts with clarity and ends with something your team can use." />
    <section className="section goal-selector"><div className="container"><p className="eyebrow">Start with the outcome · 01</p><div className="goal-selector__head"><h2>What are you trying<br />to achieve?</h2><p>Select a goal to highlight the services most likely to help. It is a useful starting point, not a fixed package.</p></div><div className="goal-options" role="group" aria-label="Business goal">{goals.map((item) => <button className={goal === item.id ? 'is-active' : ''} onClick={() => setGoal(goal === item.id ? '' : item.id)} key={item.id}><span>{goal === item.id ? <Check size={18} /> : '↗'}</span>{item.label}</button>)}</div>{goal && <div className="goal-result" aria-live="polite"><span>{relevant.size} relevant services highlighted</span><Button to={`/contact?goal=${goal}`}>Discuss this goal</Button></div>}</div></section>
    <section className="service-details"><div className="container">{services.map((service, index) => { const Icon = icons[service.icon]; const isRelevant = relevant.has(service.id); return <article id={service.id} className={`service-detail ${goal && !isRelevant ? 'is-muted' : ''}`} key={service.id}><div className="service-detail__title"><span>0{index + 1}</span><Icon /><h2>{service.title}</h2><p>{service.intro}</p></div><div className="service-detail__body"><Reveal><div><p className="mini-label">Who it suits</p><p>{service.suits}</p></div><div><p className="mini-label">The problem it addresses</p><p>{service.problem}</p></div><div><p className="mini-label">How we work</p><p>{service.process}</p></div></Reveal><Reveal><div className="deliverables"><p className="mini-label">Typical deliverables</p><ul>{service.deliverables.map((item) => <li key={item}><Check size={17} />{item}</li>)}</ul><Button to={`/contact?service=${service.id}${goal ? `&goal=${goal}` : ''}`} variant="secondary">Enquire about this service</Button></div></Reveal></div></article>})}</div></section>
    <section className="section engagements surface-dark"><div className="container"><div className="section-heading section-heading--light"><p className="eyebrow">Ways to work together · 02</p><h2>Built around the<br />rhythm you need.</h2></div><div className="engagement-grid">{[['One-time project','A defined outcome, scope, and delivery window—ideal for a launch, redesign, or focused campaign.'],['Monthly marketing support','A prioritised monthly roadmap combining selected channel, content, and optimisation work.'],['Ongoing creative partnership','Flexible design and production capacity for teams with a steady pipeline of briefs.']].map(([title,text], i) => <div className="engagement-card" key={title}><span>0{i+1}</span><h3>{title}</h3><p>{text}</p><Link to="/contact">Find the right fit <ArrowRight /></Link></div>)}</div></div></section>
    <CTASection title="Not sure which service fits? Start with the outcome." copy="Share where you are and where you want to get to. We’ll help frame the right scope." />
  </>
}
