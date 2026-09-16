import { ArrowUpRight, Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import { CTASection } from '../components/modules/CTASection'
import { PageIntro } from '../components/modules/PageIntro'
import { Seo } from '../components/modules/Seo'
import { resources } from '../data/siteContent'
import { siteSeo } from '../data/seo'

export function ResourcesPage() {
  return <>
    <Seo {...siteSeo.resources} />
    <PageIntro dark eyebrow="Free resources · Useful before a sales call" title={<>Practical tools for making <em>better digital decisions.</em></>} copy="Use these checklists and workshop prompts with your team. No email gate, no generic download, and no obligation to contact us." />
    <section className="section resource-library"><div className="container resource-list">{resources.map((resource, index) => <article className="resource-card" id={resource.id} key={resource.id}><div className="resource-card__intro"><span>{String(index + 1).padStart(2, '0')}</span><p className="mini-label">{resource.type} · {resource.readTime}</p><h2>{resource.title}</h2><p>{resource.intro}</p><Link to={`/contact?service=${resource.serviceId}`}>Get help applying it <ArrowUpRight aria-hidden="true" /></Link></div><ol>{resource.items.map((item) => <li key={item}><Check aria-hidden="true" /><span>{item}</span></li>)}</ol></article>)}</div></section>
    <CTASection title="A checklist can reveal the gap. A focused team can close it." />
  </>
}
