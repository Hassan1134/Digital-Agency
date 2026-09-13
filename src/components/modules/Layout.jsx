import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Header } from './Header'
import { Footer } from './Footer'
import { ExperienceLayer } from './ExperienceLayer'

export function Layout() {
  const location = useLocation()
  const reduced = useReducedMotion()
  useEffect(() => {
    const settle = window.setTimeout(() => {
      if (location.hash) document.getElementById(location.hash.slice(1))?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' })
      else window.scrollTo(0, 0)
      document.getElementById('main')?.focus({ preventScroll: true })
    }, reduced ? 0 : 220)
    return () => window.clearTimeout(settle)
  }, [location.hash, location.pathname, reduced])
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <ExperienceLayer />
      <Header />
      <AnimatePresence mode="wait" initial={false}>
        <motion.main id="main" key={location.pathname} tabIndex="-1" initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={reduced ? undefined : { opacity: 0 }} transition={{ duration: 0.18 }}>
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <Footer />
    </>
  )
}
