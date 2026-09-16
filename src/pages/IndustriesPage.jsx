import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { CTASection } from '../components/modules/CTASection'
import { PageIntro } from '../components/modules/PageIntro'
import { Reveal } from '../components/modules/Reveal'
import { Seo } from '../components/modules/Seo'
import { industries } from '../data/siteContent'
import { siteSeo } from '../data/seo'

export function IndustriesPage() {
  return <>
    <Seo {...siteSeo.industries} />
    <PageIntro dark eyebrow="Industries · Context changes the answer" title={<>Connected expertise shaped around <em>your market.</em></>} copy="The disciplines may be familiar, but the priorities are not. We adapt the team and delivery path to the buying journey, operating reality, and responsibilities of each sector." />
    <section className="section industry-library"><div className="container"><div className="section-heading"><p className="eyebrow">Sector pathways · 01</p><h2>Start where your<br /><em>customers are.</em></h2><p>Each pathway connects the capabilities most useful for a common set of commercial and customer challenges.</p></div><div className="industry-grid">{industries.map((industry, index) => <Reveal key={industry.id}><Link className="industry-card" to={`/industries/${industry.id}`}><span>{String(index + 1).padStart(2, '0')}</span><p className="mini-label">{industry.eyebrow}</p><h3>{industry.name}</h3><p>{industry.intro}</p><strong>Explore this industry <ArrowUpRight aria-hidden="true" /></strong></Link></Reveal>)}</div></div></section>
    <CTASection title="Your sector is not a box." copy="If your market is not listed, share the audience, buying journey, and operational challenge. We’ll assemble the right capabilities around it." />
  </>
}
