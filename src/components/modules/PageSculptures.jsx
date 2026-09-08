const serviceLabels = ['WEB', 'BRAND', 'SEARCH', 'MEDIA', 'SOCIAL', 'FILM']

export function ServiceConstellation() {
  return (
    <div className="service-constellation" aria-hidden="true">
      <div className="service-constellation__scene">
        <div className="service-constellation__ring">
          {serviceLabels.map((label, index) => (
            <span className="service-constellation__card" style={{ '--item': index }} key={label}>{label}</span>
          ))}
        </div>
        <div className="service-constellation__core"><span>01</span><i>06</i></div>
      </div>
    </div>
  )
}

export function ConnectionCore() {
  return (
    <div className="connection-core" aria-hidden="true">
      <div className="connection-core__rig">
        <span className="connection-core__axis connection-core__axis--x" />
        <span className="connection-core__axis connection-core__axis--y" />
        <span className="connection-core__axis connection-core__axis--z" />
        <span className="connection-core__node connection-core__node--one">S</span>
        <span className="connection-core__node connection-core__node--two">D</span>
        <span className="connection-core__node connection-core__node--three">T</span>
        <span className="connection-core__node connection-core__node--four">M</span>
        <span className="connection-core__sphere" />
      </div>
    </div>
  )
}

export function ContactPortal() {
  return (
    <div className="contact-portal" aria-hidden="true">
      <div className="contact-portal__stage">
        {[0, 1, 2, 3].map((index) => (
          <span className="contact-portal__frame" style={{ '--frame': index }} key={index} />
        ))}
        <span className="contact-portal__message"><i /><i /><i /></span>
      </div>
      <p><span>Brief</span><i />Momentum</p>
    </div>
  )
}
