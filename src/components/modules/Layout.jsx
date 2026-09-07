import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Header } from './Header'
import { Footer } from './Footer'

export function Layout() {
  const location = useLocation()
  const reduced = useReducedMotion()
  useEffect(() => {
    window.scrollTo(0, 0)
    requestAnimationFrame(() => document.getElementById('main')?.focus({ preventScroll: true }))
  }, [location.pathname])
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
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
