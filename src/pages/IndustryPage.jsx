import { ArrowRight, Check } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Button } from '../components/elements/Button'
import { CTASection } from '../components/modules/CTASection'
import { Seo } from '../components/modules/Seo'
import { agency } from '../config/agency'
import { services } from '../data/content'
import { industries } from '../data/siteContent'

export function IndustryPage() {
  const { industryId } = useParams()
  const industry = industries.find((item) => item.id === industryId)
  if (!industry) return <Navigate to="/industries" replace />
  const relatedServices = industry.serviceIds.map((id) => services.find((service) => service.id === id)).filter(Boolean)
  const path = `/industries/${industry.id}`
  const title = `${industry.name} Digital Services | Vergeform`
  const description = `${industry.intro} Explore connected strategy, design, technology, and growth support from Vergeform.`
  return <>
    <Seo title={title} description={description} path={path} keywords={[`${industry.name.toLowerCase()} digital agency`, `${industry.name.toLowerCase()} web design`, `${industry.name.toLowerCase()} marketing`]} />
    <header className="industry-hero surface-dark"><div className="container"><nav className="breadcrumbs" aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><Link to="/industries">Industries</Link><span>/</span><span>{industry.name}</span></nav><p className="eyebrow">{industry.eyebrow}</p><h1>{industry.name}</h1><p className="lede">{industry.intro}</p><Button to={`/contact?service=${industry.serviceIds[0]}`}>Discuss your priorities</Button></div></header>
    <section className="section industry-challenges"><div className="container"><div className="section-heading"><p className="eyebrow">Common priorities · 01</p><h2>Where we can<br /><em>create momentum.</em></h2></div><div className="service-outcomes__grid">{industry.challenges.map((challenge, index) => <article className="service-outcome" key={challenge}><span>0{index + 1}</span><Check aria-hidden="true" /><h3>{challenge}</h3></article>)}</div></div></section>
    <section className="section surface-dark industry-services"><div className="container"><div className="section-heading section-heading--light"><p className="eyebrow">Connected capabilities · 02</p><h2>A team shaped around the challenge.</h2></div><div className="industry-services__list">{relatedServices.map((service, index) => <Link to={`/services/${service.id}`} key={service.id}><span>{String(index + 1).padStart(2, '0')}</span><h3>{service.short}</h3><p>{service.intro}</p><ArrowRight aria-hidden="true" /></Link>)}</div></div></section>
    <CTASection title={`Build a stronger ${industry.name.toLowerCase()} experience.`} copy={`Share the customer journey, commercial goal, and systems involved. ${agency.name} will help frame the right starting point.`} />
  </>
}
