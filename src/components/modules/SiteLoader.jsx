import { useEffect } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { BrandLogo } from '../elements/BrandLogo'

export function SiteLoader({ onComplete }) {
  const reduced = useReducedMotion()

  useEffect(() => {
    const minimumDisplayTime = reduced ? 80 : 1250
    const startedAt = performance.now()
    let completionTimer
    let fallbackTimer
    let finished = false

    document.body.classList.add('is-site-loading')

    const finish = () => {
      if (finished) return
      finished = true
      const remaining = Math.max(0, minimumDisplayTime - (performance.now() - startedAt))
      completionTimer = window.setTimeout(onComplete, remaining)
    }

    if (document.readyState === 'complete') finish()
    else window.addEventListener('load', finish, { once: true })

    fallbackTimer = window.setTimeout(finish, reduced ? 160 : 3500)

    return () => {
      window.removeEventListener('load', finish)
      window.clearTimeout(completionTimer)
      window.clearTimeout(fallbackTimer)
      document.body.classList.remove('is-site-loading')
    }
  }, [onComplete, reduced])

  return (
    <motion.div
      className="site-loader"
      role="status"
      aria-live="polite"
      aria-label="Loading Vergeform"
      initial={false}
      exit={reduced ? { opacity: 0 } : { y: '-100%' }}
      transition={reduced ? { duration: 0 } : { duration: 0.72, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="site-loader__grid" aria-hidden="true" />
      <div className="site-loader__meta" aria-hidden="true">
        <span>01 / Forming digital impact</span>
        <span>Independent creative agency</span>
      </div>

      <div className="site-loader__center" aria-hidden="true">
        <span className="site-loader__line site-loader__line--left" />
        <motion.div
          className="site-loader__brand"
          initial={reduced ? false : { opacity: 0, scale: 0.86, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: reduced ? 0 : 0.55, delay: reduced ? 0 : 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <BrandLogo showDescriptor />
        </motion.div>
        <span className="site-loader__line site-loader__line--right" />
      </div>

      <div className="site-loader__progress" aria-hidden="true">
        <div>
          <span>Loading experience</span>
          <span>00 / 100</span>
        </div>
        <span className="site-loader__track"><i /></span>
      </div>
    </motion.div>
  )
}
