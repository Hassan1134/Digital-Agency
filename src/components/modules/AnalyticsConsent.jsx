import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { agency } from '../../config/agency'

const storageKey = 'vergeform-analytics-consent'

export function AnalyticsConsent() {
  const location = useLocation()
  const [choice, setChoice] = useState(null)
  const measurementId = agency.analyticsMeasurementId

  useEffect(() => {
    if (!measurementId) return
    const timer = window.setTimeout(() => setChoice(window.localStorage.getItem(storageKey)), 0)
    return () => window.clearTimeout(timer)
  }, [measurementId])

  useEffect(() => {
    if (!measurementId || choice !== 'accepted') return
    window.dataLayer = window.dataLayer || []
    window.gtag = window.gtag || function gtag() { window.dataLayer.push(arguments) }
    window.gtag('js', new Date())
    window.gtag('config', measurementId, { anonymize_ip: true, send_page_view: false })
    if (!document.querySelector(`script[data-vergeform-analytics="${measurementId}"]`)) {
      const script = document.createElement('script')
      script.async = true
      script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`
      script.dataset.vergeformAnalytics = measurementId
      document.head.appendChild(script)
    }
  }, [choice, measurementId])

  useEffect(() => {
    if (choice !== 'accepted' || !window.gtag) return
    window.gtag('event', 'page_view', { page_path: `${location.pathname}${location.search}`, page_title: document.title })
  }, [choice, location.pathname, location.search])

  const decide = (nextChoice) => {
    window.localStorage.setItem(storageKey, nextChoice)
    setChoice(nextChoice)
  }

  if (!measurementId || choice) return null
  return <aside className="analytics-consent" aria-label="Analytics preference"><div><p className="mini-label">Your privacy</p><p>We use optional analytics to understand which journeys are useful. You can decline and the site will work normally. <a href="/cookies">Cookie details</a></p></div><div><button type="button" onClick={() => decide('declined')}>Decline</button><button type="button" onClick={() => decide('accepted')}>Accept analytics</button></div></aside>
}
