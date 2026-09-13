import { useEffect } from 'react'
import { agency } from '../../config/agency'

export function Seo({ title, description, path = '/', type = 'website', keywords = [], schema, publishedTime }) {
  useEffect(() => {
    const canonicalUrl = new URL(path, agency.siteUrl).href
    document.title = title
    const setMeta = (selector, attributes, value) => {
      let element = document.querySelector(selector)
      if (!element) {
        element = document.createElement('meta')
        Object.entries(attributes).forEach(([name, content]) => element.setAttribute(name, content))
        document.head.appendChild(element)
      }
      element.setAttribute('content', value)
    }
    setMeta('meta[name="description"]', { name: 'description' }, description)
    setMeta('meta[name="robots"]', { name: 'robots' }, 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1')
    setMeta('meta[property="og:title"]', { property: 'og:title' }, title)
    setMeta('meta[property="og:description"]', { property: 'og:description' }, description)
    setMeta('meta[property="og:url"]', { property: 'og:url' }, canonicalUrl)
    setMeta('meta[property="og:type"]', { property: 'og:type' }, type)
    setMeta('meta[name="twitter:card"]', { name: 'twitter:card' }, 'summary_large_image')
    setMeta('meta[name="twitter:title"]', { name: 'twitter:title' }, title)
    setMeta('meta[name="twitter:description"]', { name: 'twitter:description' }, description)
    setMeta('meta[name="keywords"]', { name: 'keywords' }, keywords.length ? keywords.join(', ') : 'web design, branding, AI development, business automation')
    const previousPublished = document.querySelector('meta[property="article:published_time"]')
    if (publishedTime) setMeta('meta[property="article:published_time"]', { property: 'article:published_time' }, publishedTime)
    else previousPublished?.remove()
    const canonical = document.querySelector('link[rel="canonical"]')
    if (canonical) canonical.setAttribute('href', canonicalUrl)
  }, [description, keywords, path, publishedTime, title, type])
  if (!schema) return null
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
}
