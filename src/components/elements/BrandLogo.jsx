export function BrandLogo({ showDescriptor = false }) {
  return (
    <span className="brand-logo">
      <svg className="brand-logo__symbol" viewBox="0 0 48 48" aria-hidden="true">
        <rect className="brand-logo__field" x="1" y="1" width="46" height="46" rx="2" />
        <path className="brand-logo__v" d="M7 9h8.5L23 31.2 30.5 9H39L27 40h-8L7 9Z" />
        <path className="brand-logo__f" d="M27 9h14v7h-7v5h6v7h-6v12h-7V9Z" />
        <path className="brand-logo__cut" d="M30 9h11v11" />
      </svg>
      <span className="brand-logo__type">
        <span className="brand-logo__name">Verge<span>form</span></span>
        {showDescriptor && <span className="brand-logo__descriptor">Strategy / Design / Growth</span>}
      </span>
    </span>
  )
}
