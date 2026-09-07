import { Link } from 'react-router-dom'
import { agency, navItems } from '../../config/agency'
import { services } from '../../data/content'
import { Button } from '../elements/Button'

export function Footer() {
  const contacts = [
    agency.email && { label: agency.email, href: `mailto:${agency.email}` },
    agency.whatsapp && { label: 'WhatsApp', href: `https://wa.me/${agency.whatsapp.replace(/\D/g, '')}` },
    agency.bookingUrl && { label: 'Book a call', href: agency.bookingUrl },
  ].filter(Boolean)
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top"><p className="eyebrow">Have a project in mind?</p><h2>Make the next move<br /><span>mean something.</span></h2><Button to="/contact">Start a Project</Button></div>
        <div className="footer-grid">
          <div><Link className="wordmark" to="/"><span className="wordmark__mark">↗</span>{agency.name}</Link><p>{agency.tagline}</p>{agency.location && <p>{agency.location}</p>}</div>
          <div><h3>Explore</h3>{navItems.map((item) => <Link key={item.to} to={item.to}>{item.label}</Link>)}</div>
          <div><h3>Services</h3>{services.slice(0, 5).map((service) => <Link key={service.id} to={`/services#${service.id}`}>{service.short}</Link>)}</div>
          {contacts.length > 0 && <div><h3>Contact</h3>{contacts.map((contact) => <a key={contact.href} href={contact.href}>{contact.label}</a>)}{agency.socialLinks.map((social) => <a key={social.url} href={social.url}>{social.label}</a>)}</div>}
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} {agency.name}</span><span>Strategy · Design · Technology · Growth</span></div>
      </div>
    </footer>
  )
}
