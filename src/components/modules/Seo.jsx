import { useEffect } from 'react'
import { agency } from '../../config/agency'

export function Seo({ title, description, path = '/' }) {
  useEffect(() => {
    const canonicalUrl = new URL(path, agency.siteUrl).href
    document.title = title
    const setMeta = (selector, attr, value) => {
      const el = document.querySelector(selector)
      if (el) el.setAttribute(attr, value)
    }
    setMeta('meta[name="description"]', 'content', description)
    setMeta('meta[property="og:title"]', 'content', title)
    setMeta('meta[property="og:description"]', 'content', description)
    setMeta('meta[property="og:url"]', 'content', canonicalUrl)
    setMeta('link[rel="canonical"]', 'href', canonicalUrl)
  }, [description, path, title])
  return null
}
