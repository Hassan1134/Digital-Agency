import { ArrowDownRight, Asterisk, CircleDot, MoveUpRight } from 'lucide-react'
import { Button } from '../components/elements/Button'
import { CTASection } from '../components/modules/CTASection'
import { PageIntro } from '../components/modules/PageIntro'
import { Reveal } from '../components/modules/Reveal'
import { Seo } from '../components/modules/Seo'
import { ConnectionCore } from '../components/modules/PageSculptures'
import { agency } from '../config/agency'
import { siteSeo } from '../data/seo'

const siteOrigin = agency.siteUrl.replace(/\/$/, '')
const homeUrl = `${siteOrigin}/`
const aboutUrl = `${siteOrigin}${siteSeo.about.path}`
const organizationId = `${homeUrl}#organization`
const websiteId = `${homeUrl}#website`
const breadcrumbId = `${aboutUrl}#breadcrumb`
const aboutSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'AboutPage',
      '@id': `${aboutUrl}#webpage`,
      url: aboutUrl,
      name: siteSeo.about.title,
      description: siteSeo.about.description,
      isPartOf: { '@id': websiteId },
      about: { '@id': organizationId },
      breadcrumb: { '@id': breadcrumbId },
      inLanguage: 'en',
    },
    {
      '@type': 'BreadcrumbList',
      '@id': breadcrumbId,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: homeUrl },
        { '@type': 'ListItem', position: 2, name: 'About Vergeform', item: aboutUrl },
      ],
    },
    { '@type': 'Organization', '@id': organizationId, name: agency.name, url: homeUrl },
    { '@type': 'WebSite', '@id': websiteId, name: agency.name, url: homeUrl, publisher: { '@id': organizationId } },
  ],
}

export function AboutPage() {
  return <>
    <Seo {...siteSeo.about} schema={aboutSchema} />
    <PageIntro dark eyebrow="About us · Built around the work" title={<>Good growth starts with a <em>clear point of view.</em></>} copy="Vergeform is an independent creative partner built to connect the decisions that shape a brand—from positioning and experience to launch and ongoing growth." />
    <section className="section about-purpose"><div className="container editorial-split"><p className="eyebrow">Our purpose · 01</p><Reveal><h2>Make ambitious businesses easier to choose.</h2></Reveal><Reveal><div className="rich-copy"><p>Being noticed is only the start. A useful brand makes the offer understandable, the experience intuitive, and the next action natural.</p><p>That is why we bring strategy, design, development, and marketing into one connected process. The idea carries through—from the first headline to the final interaction.</p></div></Reveal></div></section>
    <section className="section connection surface-dark"><div className="container"><div className="section-heading section-heading--light"><p className="eyebrow">Connected by design · 02</p><h2>Four disciplines.<br />One direction.</h2></div><div className="connection-map"><div className="connection-map__center"><ConnectionCore /><span className="connection-map__label">Shared outcome</span></div>{[['Strategy','Find the sharpest opportunity.'],['Design','Make the value tangible.'],['Technology','Turn the system into reality.'],['Marketing','Put it in front of the right people.']].map(([title, text], i) => <Reveal key={title} className={`connection-card connection-card--${i + 1}`}><span>0{i + 1}</span><h3>{title}</h3><p>{text}</p></Reveal>)}</div></div></section>
    <section className="section beliefs"><div className="container"><div className="section-heading"><p className="eyebrow">Working principles · 03</p><h2>How we make<br />the work better.</h2></div><div className="belief-grid">{[
      [Asterisk,'Clarity earns attention','We reduce noise before adding expression. The strongest idea is the one people can grasp and remember.'],
      [CircleDot,'Systems create freedom','Reusable decisions make teams faster. We build tools, not one-off decoration.'],
      [ArrowDownRight,'Progress stays visible','Early prototypes and regular milestones turn feedback into forward motion.'],
      [MoveUpRight,'Useful beats fashionable','We care about craft, but every creative choice needs a job to do.'],
    ].map(([Icon,title,text], i) => <Reveal className="belief-card" key={title} delay={i*.05}><Icon /><span>0{i+1}</span><h3>{title}</h3><p>{text}</p></Reveal>)}</div></div></section>
    <section className="section collaborate"><div className="container editorial-split"><p className="eyebrow">How we collaborate · 04</p><div><h2>The right people around the right problem.</h2><p className="lede">Vergeform works as a focused multidisciplinary studio, bringing together the strategic, creative, technical, and channel expertise each brief needs. One shared direction keeps every decision connected from discovery through delivery.</p></div><div className="collab-note"><h3>You bring</h3><p>Context, ambition, customer knowledge, and timely decisions.</p><h3>We bring</h3><p>A clear process, connected craft, constructive challenge, and ownership of the detail.</p><Button to="/contact">Meet on a real brief</Button></div></div></section>
    {(agency.team.length > 0 || agency.credentials.length > 0) && <section className="section team-section surface-dark"><div className="container"><div className="section-heading section-heading--light"><p className="eyebrow">People & credentials · 05</p><h2>Meet the people responsible for the work.</h2></div>{agency.team.length > 0 && <div className="team-grid">{agency.team.map((person) => <article key={person.name}>{person.image && <img src={person.image} alt={person.imageAlt || person.name} />}<p className="mini-label">{person.role}</p><h3>{person.name}</h3><p>{person.bio}</p>{person.link && <a href={person.link}>View profile</a>}</article>)}</div>}{agency.credentials.length > 0 && <ul className="credential-list">{agency.credentials.map((credential) => <li key={credential}>{credential}</li>)}</ul>}</div></section>}
    <CTASection title="Bring us the ambition. We’ll help shape the path." />
  </>
}
