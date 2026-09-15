import { useEffect, useMemo, useState } from 'react'
import { AppWindow, ArrowRight, Bot, ChartSpline, Check, Clapperboard, MailCheck, MessagesSquare, MonitorSmartphone, MousePointerClick, Search, Shapes, ShieldCheck, ShoppingCart, Smartphone } from 'lucide-react'
import { Link, useSearchParams } from 'react-router-dom'
import { Button } from '../components/elements/Button'
import { CTASection } from '../components/modules/CTASection'
import { PageIntro } from '../components/modules/PageIntro'
import { Reveal } from '../components/modules/Reveal'
import { Seo } from '../components/modules/Seo'
import { ServiceConstellation } from '../components/modules/PageSculptures'
import { agency } from '../config/agency'
import { goals, services } from '../data/content'
import { siteSeo } from '../data/seo'

const icons = { MonitorSmartphone, ShoppingCart, AppWindow, Smartphone, Bot, Shapes, Search, MousePointerClick, MessagesSquare, Clapperboard, MailCheck, ChartSpline, ShieldCheck }
const siteOrigin = agency.siteUrl.replace(/\/$/, '')
const homeUrl = `${siteOrigin}/`
const servicesUrl = `${siteOrigin}${siteSeo.services.path}`
const organizationId = `${homeUrl}#organization`
const websiteId = `${homeUrl}#website`
const serviceListId = `${servicesUrl}#service-list`
const breadcrumbId = `${servicesUrl}#breadcrumb`
const servicesSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': `${servicesUrl}#webpage`,
      url: servicesUrl,
      name: siteSeo.services.title,
      description: siteSeo.services.description,
      isPartOf: { '@id': websiteId },
      about: { '@id': organizationId },
      breadcrumb: { '@id': breadcrumbId },
      mainEntity: { '@id': serviceListId },
      inLanguage: 'en',
    },
    {
      '@type': 'ItemList',
      '@id': serviceListId,
      name: 'Vergeform digital agency services',
      numberOfItems: services.length,
      itemListElement: services.map((service, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Service',
          '@id': `${siteOrigin}/services/${service.id}#service`,
          name: service.title,
          description: service.intro,
          url: `${siteOrigin}/services/${service.id}`,
          provider: { '@id': organizationId },
        },
      })),
    },
    {
      '@type': 'BreadcrumbList',
      '@id': breadcrumbId,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: homeUrl },
        { '@type': 'ListItem', position: 2, name: 'Services', item: servicesUrl },
      ],
    },
    { '@type': 'Organization', '@id': organizationId, name: agency.name, url: homeUrl },
    { '@type': 'WebSite', '@id': websiteId, name: agency.name, url: homeUrl, publisher: { '@id': organizationId } },
  ],
}

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
    <Seo {...siteSeo.services} schema={servicesSchema} />
    <PageIntro dark eyebrow="Services · Strategy to momentum" title={<>Expertise that works <em>better together.</em></>} copy="Choose a focused project or connect the disciplines around a bigger commercial goal. Either way, the work starts with clarity and ends with something your team can use." />
    <section className="section goal-selector"><div className="container"><p className="eyebrow">Start with the outcome · 01</p><div className="goal-selector__head"><h2>What are you trying<br />to achieve?</h2><p>Select a goal to highlight the services most likely to help. It is a useful starting point, not a fixed package.</p><div className="goal-selector__visual"><ServiceConstellation /><span>Connected capabilities</span></div></div><div className="goal-options" role="group" aria-label="Business goal">{goals.map((item) => <button className={goal === item.id ? 'is-active' : ''} onClick={() => setGoal(goal === item.id ? '' : item.id)} key={item.id}><span>{goal === item.id ? <Check size={18} /> : '↗'}</span>{item.label}</button>)}</div>{goal && <div className="goal-result" aria-live="polite"><span>{relevant.size} relevant services highlighted</span><Button to={`/contact?goal=${goal}`}>Discuss this goal</Button></div>}</div></section>
    <section className="service-details"><div className="container">{services.map((service, index) => { const Icon = icons[service.icon]; const isRelevant = relevant.has(service.id); return <article id={service.id} className={`service-detail ${goal && !isRelevant ? 'is-muted' : ''}`} key={service.id}><div className="service-detail__title"><span>{String(index + 1).padStart(2, '0')}</span><Icon /><h2>{service.title}</h2><p>{service.intro}</p></div><div className="service-detail__body"><Reveal><div><p className="mini-label">Who it suits</p><p>{service.suits}</p></div><div><p className="mini-label">The problem it addresses</p><p>{service.problem}</p></div><div><p className="mini-label">How we work</p><p>{service.process}</p></div></Reveal><Reveal><div className="deliverables"><p className="mini-label">Typical deliverables</p><ul>{service.deliverables.map((item) => <li key={item}><Check size={17} />{item}</li>)}</ul><div className="service-detail__actions"><Button to={`/services/${service.id}`} variant="secondary">Explore this service</Button><Button to={`/contact?service=${service.id}${goal ? `&goal=${goal}` : ''}`}>Enquire now</Button></div></div></Reveal></div></article>})}</div></section>
    <section className="section engagements surface-dark"><div className="container"><div className="section-heading section-heading--light"><p className="eyebrow">Ways to work together · 02</p><h2>Built around the<br />rhythm you need.</h2></div><div className="engagement-grid">{[['One-time project','A defined outcome, scope, and delivery window—ideal for a launch, redesign, or focused campaign.'],['Monthly marketing support','A prioritised monthly roadmap combining selected channel, content, and optimisation work.'],['Ongoing creative partnership','Flexible design and production capacity for teams with a steady pipeline of briefs.']].map(([title,text], i) => <div className="engagement-card" key={title}><span>0{i+1}</span><h3>{title}</h3><p>{text}</p><Link to="/contact">Find the right fit <ArrowRight /></Link></div>)}</div></div></section>
    <CTASection title="Not sure which service fits? Start with the outcome." copy="Share where you are and where you want to get to. We’ll help frame the right scope." />
  </>
}
