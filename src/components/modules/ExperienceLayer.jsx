import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react'
import { CommandMenu } from './CommandMenu'

export function ExperienceLayer() {
  const { scrollYProgress } = useScroll()
  const [showBackToTop, setShowBackToTop] = useState(false)
  const reduced = useReducedMotion()

  useMotionValueEvent(scrollYProgress, 'change', (value) => setShowBackToTop(value > 0.12))

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return undefined
    let frame
    const move = (event) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        document.documentElement.style.setProperty('--cursor-x', `${event.clientX}px`)
        document.documentElement.style.setProperty('--cursor-y', `${event.clientY}px`)
      })
    }
    window.addEventListener('pointermove', move, { passive: true })
    return () => { cancelAnimationFrame(frame); window.removeEventListener('pointermove', move) }
  }, [])

  return (
    <>
      <motion.div className="scroll-progress" style={{ scaleX: scrollYProgress }} />
      <div className="site-grid" aria-hidden="true" />
      <div className="site-spotlight" aria-hidden="true" />
      <CommandMenu />
      <AnimatePresence>
        {showBackToTop && <motion.button
          className="back-to-top"
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })}
          initial={reduced ? false : { opacity: 0, y: 14, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduced ? undefined : { opacity: 0, y: 10, scale: 0.94 }}
          aria-label="Back to top"
        ><ArrowUp aria-hidden="true" /><span>Back to top</span></motion.button>}
      </AnimatePresence>
    </>
  )
}
