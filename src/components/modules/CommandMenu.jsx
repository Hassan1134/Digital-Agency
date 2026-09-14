import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ArrowUpRight, Command, Search, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { navItems } from '../../config/agency'
import { projects, services } from '../../data/content'
import { useFocusTrap } from '../../hooks/useFocusTrap'

const commands = [
  ...navItems.map((item) => ({ label: item.label, detail: 'Page', to: item.to })),
  ...projects.map((project) => ({ label: project.name, detail: `Project / ${project.sector}`, to: `/#project-${project.id}` })),
  ...services.map((service) => ({ label: service.short, detail: 'Service', to: `/services/${service.id}` })),
]

export function CommandMenu() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const panelRef = useRef(null)
  const navigate = useNavigate()
  const close = useCallback(() => { setOpen(false); setQuery('') }, [])
  useFocusTrap(panelRef, open, close)

  useEffect(() => {
    const onKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setOpen((current) => !current)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('has-command-menu', open)
    return () => document.body.classList.remove('has-command-menu')
  }, [open])

  const results = useMemo(() => {
    const term = query.trim().toLowerCase()
    return term ? commands.filter((item) => `${item.label} ${item.detail}`.toLowerCase().includes(term)) : commands
  }, [query])

  const select = (to) => {
    close()
    navigate(to)
  }

  return (
    <>
      <button className="command-trigger" onClick={() => setOpen(true)} aria-label="Open quick navigation">
        <Command size={15} /><span>Quick find</span><kbd>Ctrl K</kbd>
      </button>
      {open && <div className="command-backdrop" onMouseDown={(event) => event.target === event.currentTarget && close()}>
        <section className="command-menu" ref={panelRef} role="dialog" aria-modal="true" aria-labelledby="command-title">
          <div className="command-menu__top"><div><p className="eyebrow">Vergeform navigator</p><h2 id="command-title">Go anywhere.</h2></div><button onClick={close} aria-label="Close quick navigation"><X /></button></div>
          <label className="command-search"><Search aria-hidden="true" /><span className="sr-only">Search pages, work and services</span><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search pages, work and services..." /></label>
          <div className="command-results" role="list">
            {results.map((item, index) => <button role="listitem" onClick={() => select(item.to)} key={`${item.to}-${item.label}-${index}`}><span>{String(index + 1).padStart(2, '0')}</span><div><strong>{item.label}</strong><small>{item.detail}</small></div><ArrowUpRight /></button>)}
            {results.length === 0 && <p className="command-empty">No matches yet. Try “brand”, “web”, or “contact”.</p>}
          </div>
          <div className="command-menu__footer"><span><kbd>Esc</kbd> close</span><span><kbd>Tab</kbd> navigate</span></div>
        </section>
      </div>}
    </>
  )
}
