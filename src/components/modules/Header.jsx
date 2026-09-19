import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Menu, X } from 'lucide-react'
import { NavLink, Link } from 'react-router-dom'
import { agency, navItems } from '../../config/agency'
import { Button } from '../elements/Button'
import { BrandLogo } from '../elements/BrandLogo'
import { useFocusTrap } from '../../hooks/useFocusTrap'

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const panelRef = useRef(null)
  const close = useCallback(() => setOpen(false), [])
  useFocusTrap(panelRef, open, close)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18)
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => {
    document.body.classList.toggle('has-mobile-menu', open)
    return () => document.body.classList.remove('has-mobile-menu')
  }, [open])

  const mobileMenu = open ? createPortal(
    <div className="menu-backdrop" onMouseDown={(event) => event.target === event.currentTarget && close()}>
      <div className="mobile-menu" id="mobile-menu" ref={panelRef} role="dialog" aria-modal="true" aria-label="Navigation menu">
        <div className="mobile-menu__top">
          <span>Menu</span>
          <button type="button" onClick={close} aria-label="Close menu"><X /></button>
        </div>
        <nav aria-label="Mobile navigation">
          {navItems.map((item, index) => (
            <NavLink key={item.to} to={item.to} end={item.to === '/'} onClick={close}>
              <span>0{index + 1}</span>{item.label}
            </NavLink>
          ))}
        </nav>
        <Button to="/contact" onClick={close}>Start a Project</Button>
      </div>
    </div>,
    document.body,
  ) : null

  return (
    <>
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="container site-header__inner">
          <Link className="wordmark" to="/" aria-label={`${agency.name} home`}><BrandLogo /></Link>
          <nav className="desktop-nav" aria-label="Primary navigation">
            {navItems.map((item) => <NavLink key={item.to} to={item.to} end={item.to === '/'}>{item.label}</NavLink>)}
          </nav>
          <Button to="/contact" className="header-cta">Start a Project</Button>
          <Link className="mobile-header-cta" to="/contact">Start</Link>
          <button type="button" className="menu-toggle" aria-label="Open menu" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(true)}><Menu /></button>
        </div>
      </header>
      {mobileMenu}
    </>
  )
}
