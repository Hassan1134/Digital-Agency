import { useCallback, useState } from 'react'
import { ArrowDown, ArrowUpRight, Check } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { Link } from 'react-router-dom'
import { Button } from '../components/elements/Button'
import { ProjectCard } from '../components/modules/ProjectCard'
import { ProjectDialog } from '../components/modules/ProjectDialog'
import { Reveal } from '../components/modules/Reveal'
import { Accordion } from '../components/modules/Accordion'
import { CTASection } from '../components/modules/CTASection'
import { Seo } from '../components/modules/Seo'
import { faqs, projects, services } from '../data/content'
import { useMediaQuery } from '../hooks/useMediaQuery'

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
    <motion.div className="hero-art__main" animate={offset} transition={{ type: 'spring', stiffness: 140, damping: 20 }}><img src={projects[0].image} alt="Morrow ecommerce concept on a desktop screen" width="1536" height="1024" fetchPriority="high" /></motion.div>
    <motion.div className="hero-art__tile hero-art__tile--brand" animate={{ x: offset.x * -1.4, y: offset.y * -1.4 }}><img src={projects[1].image} alt="Detail of Kindred brand identity concept" width="1536" height="1024" /></motion.div>
    <motion.div className="hero-art__tile hero-art__tile--campaign" animate={{ x: offset.x * 1.7, y: offset.y * 1.7 }}><img src={projects[2].image} alt="Detail of Frequency campaign concept" width="1536" height="1024" /></motion.div>
    <span className="hero-art__label">Strategy / Design / Growth</span><span className="hero-art__arrow" aria-hidden="true">↗</span>
  </div>
}

export function HomePage() {
  const [project, setProject] = useState(null)
  const closeProject = useCallback(() => setProject(null), [])
  return <>
    <Seo title="Growth Studio — Brand, Web & Growth" description="Standout websites, memorable brands, and digital campaigns for ambitious businesses." />
    <section className="hero surface-dark">
      <div className="container hero__grid">
        <div className="hero__copy"><motion.p className="eyebrow" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>Independent creative agency · Built for momentum</motion.p><motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06, duration: 0.55 }}>Make your brand<br />impossible <em>to ignore.</em></motion.h1><motion.p className="lede" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}>We build standout websites, memorable brands, and digital campaigns that help ambitious businesses attract and convert the right customers.</motion.p><motion.div className="hero__actions" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}><Button to="/contact">Start a Project</Button><Button href="#work" variant="ghost-light">Explore Our Work</Button></motion.div></div>
        <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.12, duration: 0.65 }}><HeroArtwork /></motion.div>
      </div>
      <a href="#work" className="hero__scroll"><ArrowDown size={18} /> Scroll to explore</a>
    </section>

    <section id="work" className="section work-section"><div className="container"><div className="section-heading"><p className="eyebrow">Selected work · 01</p><h2>Ideas made<br /><em>visible.</em></h2><p>Original concept work showing how strategy, identity, and digital execution can move as one system.</p></div><div className="projects-list">{projects.map((item, index) => <Reveal key={item.id}><ProjectCard project={item} index={index} onOpen={setProject} /></Reveal>)}</div></div></section>

    <section className="section services-overview surface-dark"><div className="container"><div className="section-heading section-heading--light"><p className="eyebrow">What we do · 02</p><h2>One joined-up<br />growth partner.</h2><p>Get the thinking and making in the same room—so every customer touchpoint feels clear, consistent, and useful.</p></div><div className="service-rows">{services.slice(0, 5).map((service, index) => <Link key={service.id} to={`/services#${service.id}`} className="service-row"><span>0{index + 1}</span><h3>{service.short}</h3><p>{service.intro}</p><ArrowUpRight /></Link>)}</div></div></section>

    <section className="section principles"><div className="container"><div className="principles__intro"><p className="eyebrow">Why work with us · 03</p><h2>Less theatre.<br /><em>More traction.</em></h2><p>We keep the work ambitious and the process grounded. You always know what we are solving, what comes next, and why it matters.</p></div><div className="principles__list">{[['01','Clear strategy before execution.','We agree on the audience, challenge, and commercial goal before pixels or campaigns.'],['02','Design and development together.','Creative ambition stays connected to usability, performance, and the realities of launch.'],['03','Transparent milestones.','Frequent working sessions and clear decision points keep momentum visible.'],['04','Measure and improve.','Launch is a learning point. We use meaningful signals to prioritise what comes next.']].map(([n,title,text]) => <Reveal key={n} className="principle"><span>{n}</span><div><h3>{title}</h3><p>{text}</p></div><Check /></Reveal>)}</div></div></section>

    <section className="section process-section"><div className="container"><div className="section-heading"><p className="eyebrow">How it works · 04</p><h2>From first question<br />to forward motion.</h2></div><div className="process-grid">{[['Discover','A focused brief, stakeholder insight, and a shared definition of success.'],['Plan','A prioritised roadmap, creative direction, and clearly staged deliverables.'],['Create','Visible work-in-progress, purposeful review rounds, and a flexible design system.'],['Launch & Improve','Quality checks, a confident handover, and a practical next-step plan.']].map(([title, text], index) => <Reveal key={title} delay={index * .05} className="process-step"><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p>{index < 3 && <ArrowUpRight aria-hidden="true" />}</Reveal>)}</div></div></section>

    <section className="section faq-section"><div className="container faq-grid"><div><p className="eyebrow">Good questions · 05</p><h2>Before we<br />begin.</h2><p>Clear answers make better starting points. If yours is not here, include it in your enquiry.</p><Button to="/contact" variant="secondary">Ask a question</Button></div><Accordion items={faqs} /></div></section>
    <CTASection />
    <ProjectDialog project={project} onClose={closeProject} />
  </>
}
