import { Bot, Braces, Layers3, ShieldCheck, Workflow } from 'lucide-react'

const visualThemes = {
  agents: { Icon: Bot, code: '01', label: 'Autonomous systems', short: 'AGENT' },
  native: { Icon: Braces, code: '02', label: 'Intelligent software', short: 'BUILD' },
  security: { Icon: ShieldCheck, code: '03', label: 'Active defense', short: 'SECURE' },
  fullstack: { Icon: Layers3, code: '04', label: 'Modern architecture', short: 'STACK' },
  automation: { Icon: Workflow, code: '05', label: 'Connected operations', short: 'FLOW' },
}

export function BlogVisual({ variant = 'agents' }) {
  const theme = visualThemes[variant] || visualThemes.agents
  const Icon = theme.Icon

  return (
    <div className={`blog-visual blog-visual--${variant}`} aria-hidden="true">
      <div className="blog-visual__atmosphere" />
      <div className="blog-visual__grid" />
      <div className="blog-visual__header"><span>{theme.label}</span><b>VF / {theme.code}</b></div>
      <div className="blog-visual__core"><Icon strokeWidth={1.35} /><span>{theme.short}</span></div>
      <div className="blog-visual__particles">
        {[0, 1, 2, 3, 4, 5].map((index) => <i style={{
          '--visual-index': index,
          '--visual-angle': `${index * 60}deg`,
          '--visual-angle-reverse': `${index * -60}deg`,
          '--visual-delay': `${index * -0.55}s`,
          '--visual-top': `${18 + index * 10}%`,
          '--visual-left': `${13 + index * 10}%`,
          '--visual-depth': `${index * 7}px`,
          '--visual-scale': 0.42 + index * 0.14,
          '--visual-width': `${76 - index * 6}%`,
          '--automation-top': `${20 + index * 10}%`,
        }} key={index} />)}
      </div>
      <div className="blog-visual__markers"><b /><b /><b /></div>
    </div>
  )
}
