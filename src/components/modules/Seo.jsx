import { useEffect } from 'react'
import { agency } from '../../config/agency'

const indexDirective = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
const noIndexDirective = 'noindex, nofollow'

export function Seo({
  title,
  description,
  path = '/',
  type = 'website',
  keywords = [],
  schema,
  publishedTime,
  modifiedTime,
  image = agency.socialImagePath,
  imageAlt = 'Vergeform digital agency — strategy, design, technology, and growth',
  noIndex = false,
}) {
  const keywordContent = keywords.length
    ? keywords.join(', ')
    : 'digital agency, web design agency, branding agency, AI development agency, SEO services'

  useEffect(() => {
    const canonicalUrl = new URL(path, agency.siteUrl).href
    const imageUrl = new URL(image, agency.siteUrl).href
    const robots = noIndex ? noIndexDirective : indexDirective
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

    const setLink = (selector, attributes, href) => {
      let element = document.querySelector(selector)
      if (!element) {
        element = document.createElement('link')
        Object.entries(attributes).forEach(([name, value]) => element.setAttribute(name, value))
        document.head.appendChild(element)
      }
      element.setAttribute('href', href)
    }

    setMeta('meta[name="description"]', { name: 'description' }, description)
    setMeta('meta[name="robots"]', { name: 'robots' }, robots)
    setMeta('meta[name="googlebot"]', { name: 'googlebot' }, robots)
    setMeta('meta[name="author"]', { name: 'author' }, type === 'article' ? 'Vergeform Editorial' : agency.name)
    if (agency.searchVerification) setMeta('meta[name="google-site-verification"]', { name: 'google-site-verification' }, agency.searchVerification)
    setMeta('meta[name="keywords"]', { name: 'keywords' }, keywordContent)
    setMeta('meta[property="og:title"]', { property: 'og:title' }, title)
    setMeta('meta[property="og:description"]', { property: 'og:description' }, description)
    setMeta('meta[property="og:url"]', { property: 'og:url' }, canonicalUrl)
    setMeta('meta[property="og:type"]', { property: 'og:type' }, type)
    setMeta('meta[property="og:image"]', { property: 'og:image' }, imageUrl)
    setMeta('meta[property="og:image:secure_url"]', { property: 'og:image:secure_url' }, imageUrl)
    setMeta('meta[property="og:image:width"]', { property: 'og:image:width' }, '1200')
    setMeta('meta[property="og:image:height"]', { property: 'og:image:height' }, image.startsWith('/blog/') ? '675' : '630')
    setMeta('meta[property="og:image:alt"]', { property: 'og:image:alt' }, imageAlt)
    setMeta('meta[name="twitter:card"]', { name: 'twitter:card' }, 'summary_large_image')
    setMeta('meta[name="twitter:title"]', { name: 'twitter:title' }, title)
    setMeta('meta[name="twitter:description"]', { name: 'twitter:description' }, description)
    setMeta('meta[name="twitter:image"]', { name: 'twitter:image' }, imageUrl)
    setMeta('meta[name="twitter:image:alt"]', { name: 'twitter:image:alt' }, imageAlt)

    const previousPublished = document.querySelector('meta[property="article:published_time"]')
    if (publishedTime) setMeta('meta[property="article:published_time"]', { property: 'article:published_time' }, publishedTime)
    else previousPublished?.remove()

    const previousModified = document.querySelector('meta[property="article:modified_time"]')
    if (modifiedTime) setMeta('meta[property="article:modified_time"]', { property: 'article:modified_time' }, modifiedTime)
    else previousModified?.remove()

    setLink('link[rel="canonical"]', { rel: 'canonical' }, canonicalUrl)
    setLink('link[rel="alternate"][hreflang="en"]', { rel: 'alternate', hreflang: 'en' }, canonicalUrl)
    setLink('link[rel="alternate"][hreflang="x-default"]', { rel: 'alternate', hreflang: 'x-default' }, canonicalUrl)
  }, [description, image, imageAlt, keywordContent, modifiedTime, noIndex, path, publishedTime, title, type])

  const effectiveSchema = schema || {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: new URL(path, agency.siteUrl).href,
    isPartOf: { '@type': 'WebSite', name: agency.name, url: agency.siteUrl },
    inLanguage: 'en',
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(effectiveSchema).replace(/</g, '\\u003c') }} />
}
