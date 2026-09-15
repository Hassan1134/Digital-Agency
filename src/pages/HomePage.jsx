import { useCallback, useEffect, useState } from 'react'
import { ArrowDown, ArrowUpRight, Check } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from '../components/elements/Button'
import { ProjectCard } from '../components/modules/ProjectCard'
import { ProjectDialog } from '../components/modules/ProjectDialog'
import { Reveal } from '../components/modules/Reveal'
import { Accordion } from '../components/modules/Accordion'
import { CTASection } from '../components/modules/CTASection'
import { Seo } from '../components/modules/Seo'
import { KineticSculpture } from '../components/modules/KineticSculpture'
import { CapabilityMarquee } from '../components/modules/CapabilityMarquee'
import { agency } from '../config/agency'
import { faqs, projects, services } from '../data/content'
import { siteSeo } from '../data/seo'
import { useMediaQuery } from '../hooks/useMediaQuery'

const workFilters = [
  { id: 'all', label: 'All work' },
  { id: 'morrow', label: 'Digital products' },
  { id: 'kindred', label: 'Brand systems' },
  { id: 'frequency', label: 'Campaigns' },
]

const siteOrigin = agency.siteUrl.replace(/\/$/, '')
const homeUrl = `${siteOrigin}/`
const organizationId = `${homeUrl}#organization`
const websiteId = `${homeUrl}#website`
const homeSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': organizationId,
      name: agency.name,
      legalName: agency.legalName,
      url: homeUrl,
      description: agency.description,
      logo: { '@type': 'ImageObject', url: `${siteOrigin}/favicon-512.png`, width: 512, height: 512 },
      image: `${siteOrigin}${agency.socialImagePath}`,
      slogan: agency.tagline,
      knowsAbout: services.map((service) => service.title),
      ...(agency.email ? { email: agency.email } : {}),
      ...(agency.whatsapp ? { telephone: agency.whatsapp } : {}),
      ...(agency.socialLinks.length ? { sameAs: agency.socialLinks.map((social) => social.url).filter(Boolean) } : {}),
    },
    {
      '@type': 'WebSite',
      '@id': websiteId,
      url: homeUrl,
      name: agency.name,
      description: siteSeo.home.description,
      publisher: { '@id': organizationId },
      inLanguage: 'en',
    },
    {
      '@type': ['WebPage', 'FAQPage'],
      '@id': `${homeUrl}#webpage`,
      url: homeUrl,
      name: siteSeo.home.title,
      description: siteSeo.home.description,
      isPartOf: { '@id': websiteId },
      about: { '@id': organizationId },
      inLanguage: 'en',
      mainEntity: faqs.map(([question, answer]) => ({
        '@type': 'Question',
        name: question,
        acceptedAnswer: { '@type': 'Answer', text: answer },
      })),
    },
  ],
}

function HeroArtwork() {
  const reduced = useReducedMotion()
  const finePointer = useMediaQuery('(pointer: fine)')
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const move = (event) => {
    if (reduced || !finePointer) return
    const rect = event.currentTarget.getBoundingClientRect()
    setOffset({ x: ((event.clientX - rect.left) / rect.width - 0.5) * 10, y: ((event.clientY - rect.top) / rect.height - 0.5) * 10 })
  }
  return <div className="hero-art" onPointerMove={move} onPointerLeave={() => setOffset({ x: 0, y: 0 })}>
    <div className="hero-art__frame" aria-hidden="true"></div>
    <motion.div className="hero-art__main" animate={{ x: offset.x, y: offset.y, rotateX: offset.y * -0.32, rotateY: offset.x * 0.4 }} transition={{ type: 'spring', stiffness: 140, damping: 20 }}><img src={projects[0].image} alt="Morrow ecommerce concept on a desktop screen" width="1536" height="1024" fetchPriority="high" /></motion.div>
    <motion.div className="hero-art__tile hero-art__tile--brand" animate={{ x: offset.x * -1.4, y: offset.y * -1.4, z: 28, rotateX: offset.y * 0.55, rotateY: offset.x * -0.65 }} transition={{ type: 'spring', stiffness: 150, damping: 22 }}><img src={projects[1].image} alt="Detail of Kindred brand identity concept" width="1536" height="1024" loading="lazy" decoding="async" /></motion.div>
    <motion.div className="hero-art__tile hero-art__tile--campaign" animate={{ x: offset.x * 1.7, y: offset.y * 1.7, z: 44, rotateX: offset.y * -0.7, rotateY: offset.x * 0.8 }} transition={{ type: 'spring', stiffness: 150, damping: 22 }}><img src={projects[2].image} alt="Detail of Frequency campaign concept" width="1536" height="1024" loading="lazy" decoding="async" /></motion.div>
    <motion.div className="hero-art__kinetic" animate={{ x: offset.x * -2, y: offset.y * -2, rotateX: offset.y, rotateY: offset.x }} transition={{ type: 'spring', stiffness: 120, damping: 18 }}><KineticSculpture /></motion.div>
    <span className="hero-art__label">Strategy / Design / Growth</span>
  </div>
}

export function HomePage() {
  const location = useLocation()
  const [project, setProject] = useState(null)
  const [workFilter, setWorkFilter] = useState('all')
  const reduced = useReducedMotion()
  const closeProject = useCallback(() => setProject(null), [])
  const visibleProjects = workFilter === 'all' ? projects : projects.filter((item) => item.id === workFilter)
  useEffect(() => {
    if (!location.hash.startsWith('#project-')) return undefined
    const frame = requestAnimationFrame(() => setWorkFilter('all'))
    return () => cancelAnimationFrame(frame)
  }, [location.hash])
  return <>
    <Seo {...siteSeo.home} schema={homeSchema} />
    <section className="hero surface-dark">
      <div className="container hero__grid">
        <div className="hero__copy"><motion.p className="eyebrow" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>Independent creative agency · Built for momentum</motion.p><motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06, duration: 0.55 }}>Make your brand<br />impossible <em>to ignore.</em></motion.h1><motion.p className="lede" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}>We build standout websites, memorable brands, and digital campaigns that help ambitious businesses attract and convert the right customers.</motion.p><motion.div className="hero__actions" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}><Button to="/contact">Start a Project</Button><Button href="#work" variant="ghost-light">Explore Our Work</Button></motion.div></div>
        <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.12, duration: 0.65 }}><HeroArtwork /></motion.div>
      </div>
      <a href="#work" className="hero__scroll"><ArrowDown size={18} /> Scroll to explore</a>
    </section>

    <CapabilityMarquee />

    <section id="work" className="section work-section"><div className="container"><div className="section-heading"><p className="eyebrow">Selected work · 01</p><h2>Ideas made<br /><em>visible.</em></h2><p>Original concept work showing how strategy, identity, and digital execution can move as one system.</p></div><div className="portfolio-toolbar"><div className="portfolio-filters" role="group" aria-label="Filter selected work">{workFilters.map((filter) => <button className={workFilter === filter.id ? 'is-active' : ''} aria-pressed={workFilter === filter.id} onClick={() => setWorkFilter(filter.id)} key={filter.id}>{filter.label}<span>{filter.id === 'all' ? projects.length : 1}</span></button>)}</div><p><strong>{String(visibleProjects.length).padStart(2, '0')}</strong> projects in view</p></div><div className="projects-list"><AnimatePresence mode="popLayout">{visibleProjects.map((item) => { const index = projects.findIndex((entry) => entry.id === item.id); return <motion.div layout key={item.id} initial={reduced ? false : { opacity: 0, y: 28, scale: .985 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={reduced ? undefined : { opacity: 0, y: -18, scale: .985 }} transition={{ duration: .42 }}><ProjectCard project={item} index={index} onOpen={setProject} /></motion.div> })}</AnimatePresence></div></div></section>

    <section className="section services-overview surface-dark"><div className="container"><div className="section-heading section-heading--light"><p className="eyebrow">What we do · 02</p><h2>One joined-up<br />growth partner.</h2><p>Strategy, design, technology, marketing, optimisation, and ongoing care in one place—so you can keep moving without coordinating a different provider for every challenge.</p></div><div className="service-rows">{services.map((service, index) => <Link key={service.id} to={`/services/${service.id}`} className="service-row"><span>{String(index + 1).padStart(2, '0')}</span><h3>{service.short}</h3><p>{service.intro}</p><ArrowUpRight /></Link>)}</div></div></section>

    <section className="section principles"><div className="container"><div className="principles__intro"><p className="eyebrow">Why work with us · 03</p><h2>Less theatre.<br /><em>More traction.</em></h2><p>We keep the work ambitious and the process grounded. You always know what we are solving, what comes next, and why it matters.</p></div><div className="principles__list">{[['01','Clear strategy before execution.','We agree on the audience, challenge, and commercial goal before pixels or campaigns.'],['02','Design and development together.','Creative ambition stays connected to usability, performance, and the realities of launch.'],['03','Transparent milestones.','Frequent working sessions and clear decision points keep momentum visible.'],['04','Measure and improve.','Launch is a learning point. We use meaningful signals to prioritise what comes next.']].map(([n,title,text]) => <Reveal key={n} className="principle"><span>{n}</span><div><h3>{title}</h3><p>{text}</p></div><Check /></Reveal>)}</div></div></section>

    <section className="section process-section"><div className="container"><div className="section-heading"><p className="eyebrow">How it works · 04</p><h2>From first question<br />to forward motion.</h2></div><div className="process-grid">{[['Discover','A focused brief, stakeholder insight, and a shared definition of success.'],['Plan','A prioritised roadmap, creative direction, and clearly staged deliverables.'],['Create','Visible work-in-progress, purposeful review rounds, and a flexible design system.'],['Launch & Improve','Quality checks, a confident handover, and a practical next-step plan.']].map(([title, text], index) => <Reveal key={title} delay={index * .05} className="process-step"><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p>{index < 3 && <ArrowUpRight aria-hidden="true" />}</Reveal>)}</div></div></section>

    <section className="section faq-section"><div className="container faq-grid"><div><p className="eyebrow">Good questions · 05</p><h2>Before we<br />begin.</h2><p>Clear answers make better starting points. If yours is not here, include it in your enquiry.</p><Button to="/contact" variant="secondary">Ask a question</Button></div><Accordion items={faqs} /></div></section>
    <CTASection />
    <ProjectDialog project={project} onClose={closeProject} />
  </>
}
