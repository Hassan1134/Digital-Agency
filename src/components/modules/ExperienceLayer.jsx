import { useEffect } from 'react'
import { motion, useScroll } from 'motion/react'
import { CommandMenu } from './CommandMenu'

export function ExperienceLayer() {
  const { scrollYProgress } = useScroll()

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
    </>
  )
}
