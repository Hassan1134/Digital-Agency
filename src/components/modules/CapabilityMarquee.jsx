import { services } from '../../data/content'

export function CapabilityMarquee() {
  const labels = services.map((service) => service.short)
  return (
    <section className="capability-marquee" aria-label={`Capabilities: ${labels.join(', ')}`}>
      <div className="capability-marquee__track" aria-hidden="true">
        {[...labels, ...labels].map((label, index) => <span key={`${label}-${index}`}>{label}<i>+</i></span>)}
      </div>
    </section>
  )
}
