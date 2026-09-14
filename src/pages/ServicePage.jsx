import { ArrowRight, ArrowUpRight, Check } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Button } from '../components/elements/Button'
import { Accordion } from '../components/modules/Accordion'
import { CTASection } from '../components/modules/CTASection'
import { Reveal } from '../components/modules/Reveal'
import { Seo } from '../components/modules/Seo'
import { agency } from '../config/agency'
import { services } from '../data/content'
import { getServiceSeo } from '../data/seo'

export function ServicePage() {
  const { serviceId } = useParams()
  const service = services.find((item) => item.id === serviceId)
  const seo = getServiceSeo(serviceId)
  if (!service || !seo) return <Navigate to="/services" replace />

  const path = `/services/${service.id}`
  const canonical = `${agency.siteUrl}${path}`
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'Service', '@id': `${canonical}#service`, name: service.title, serviceType: service.title, description: seo.description, url: canonical, provider: { '@id': `${agency.siteUrl}/#organization` } },
      { '@type': 'WebPage', '@id': `${canonical}#webpage`, url: canonical, name: seo.title, description: seo.description, isPartOf: { '@id': `${agency.siteUrl}/#website` }, about: { '@id': `${canonical}#service` }, inLanguage: 'en' },
      { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: `${agency.siteUrl}/` }, { '@type': 'ListItem', position: 2, name: 'Services', item: `${agency.siteUrl}/services` }, { '@type': 'ListItem', position: 3, name: service.title, item: canonical }] },
      { '@type': 'FAQPage', mainEntity: seo.faqs.map(([question, answer]) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } })) },
    ],
  }
  const related = services.filter((item) => item.id !== service.id).slice(0, 3)

  return <>
    <Seo title={seo.title} description={seo.description} path={path} keywords={[seo.primaryKeyword, ...seo.keywords]} schema={schema} />
    <header className="service-page-hero surface-dark"><div className="container">
      <nav className="breadcrumbs" aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><Link to="/services">Services</Link><span>/</span><span>{service.short}</span></nav>
      <div className="service-page-hero__grid"><div><p className="eyebrow">Vergeform service · {seo.primaryKeyword}</p><h1>{service.title}</h1></div><div><p className="lede">{service.intro}</p><Button to={`/contact?service=${service.id}`}>Discuss your project</Button></div></div>
    </div></header>

    <section className="section service-page-overview"><div className="container service-page-overview__grid">
      <div><p className="eyebrow">What this service solves · 01</p><h2>Built for clarity,<br /><em>made for progress.</em></h2></div>
      <Reveal className="rich-copy">{seo.overview.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</Reveal>
    </div></section>

    <section className="section service-outcomes surface-dark"><div className="container"><div className="section-heading section-heading--light"><p className="eyebrow">The intended outcomes · 02</p><h2>What the work<br />moves forward.</h2></div><div className="service-outcomes__grid">{seo.outcomes.map((outcome, index) => <Reveal className="service-outcome" delay={index * .05} key={outcome}><span>0{index + 1}</span><Check aria-hidden="true" /><h3>{outcome}</h3></Reveal>)}</div></div></section>

    <section className="section service-page-scope"><div className="container service-page-scope__grid">
      <div><p className="eyebrow">A practical scope · 03</p><h2>What we can<br /><em>deliver.</em></h2><p>{service.suits}</p></div>
      <Reveal><ul>{service.deliverables.map((item) => <li key={item}><Check aria-hidden="true" />{item}</li>)}</ul></Reveal>
      <Reveal className="service-page-process"><p className="mini-label">How we work</p><h3>A connected process, shaped around the outcome.</h3><p>{service.process}</p><Button to={`/contact?service=${service.id}`} variant="secondary">Request a tailored scope</Button></Reveal>
    </div></section>

    <section className="section service-page-faq"><div className="container faq-grid"><div><p className="eyebrow">Frequently asked · 04</p><h2>Useful details<br />before we begin.</h2><p>Every engagement is shaped around the actual brief. These answers cover the most common starting questions.</p></div><Accordion items={seo.faqs} /></div></section>

    <section className="section related-services surface-dark"><div className="container"><div className="related-services__head"><p className="eyebrow">Connected expertise</p><h2>Explore related services.</h2></div><div className="related-services__grid">{related.map((item) => <Link to={`/services/${item.id}`} key={item.id}><span>{item.short}</span><ArrowUpRight aria-hidden="true" /><p>{item.intro}</p><strong>Explore service <ArrowRight aria-hidden="true" /></strong></Link>)}</div></div></section>
    <CTASection title={`Ready to explore ${service.short.toLowerCase()}?`} copy="Share the outcome you need, what exists today, and any useful constraints. We’ll help frame the right next step." />
  </>
}
