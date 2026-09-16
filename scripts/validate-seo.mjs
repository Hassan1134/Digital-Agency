import { access, readFile, readdir } from 'node:fs/promises'
import { resolve } from 'node:path'
import { loadEnv } from 'vite'
import { blogPosts } from '../src/data/blogPosts.js'
import { serviceSeo, siteSeo } from '../src/data/seo.js'
import { industries } from '../src/data/siteContent.js'

const root = resolve(process.cwd())
const dist = resolve(root, 'dist')
const env = loadEnv('production', root, '')
const siteUrl = (env.VITE_SITE_URL || 'https://vergeform.netlify.app').replace(/\/$/, '')
const routes = [
  siteSeo.home.path,
  siteSeo.about.path,
  siteSeo.services.path,
  ...Object.keys(serviceSeo).map((serviceId) => `/services/${serviceId}`),
  siteSeo.blog.path,
  ...blogPosts.map((post) => `/blog/${post.slug}`),
  siteSeo.contact.path,
  siteSeo.process.path,
  siteSeo.industries.path,
  ...industries.map((industry) => `/industries/${industry.id}`),
  siteSeo.resources.path,
  '/privacy',
  '/accessibility',
]
const articleRoutes = new Map(blogPosts.map((post) => [`/blog/${post.slug}`, post]))

const failures = []
const titles = new Map()
const descriptions = new Map()
const fail = (message) => failures.push(message)
const routeFile = (route) => route === '/' ? resolve(dist, 'index.html') : resolve(dist, `.${route}`, 'index.html')
const matchContent = (html, attribute, key) => html.match(new RegExp(`<meta ${attribute}="${key}" content="([^"]*)" \\/>`))?.[1]

for (const route of routes) {
  let html
  try {
    html = await readFile(routeFile(route), 'utf8')
  } catch {
    fail(`${route}: prerendered index.html is missing`)
    continue
  }

  const canonical = new URL(route === '/' ? '/' : route, `${siteUrl}/`).href
  const title = html.match(/<title>(.*?)<\/title>/s)?.[1]
  const description = matchContent(html, 'name', 'description')
  const robots = matchContent(html, 'name', 'robots')
  const googlebot = matchContent(html, 'name', 'googlebot')
  const ogUrl = matchContent(html, 'property', 'og:url')
  const ogImage = matchContent(html, 'property', 'og:image')
  const ogImageAlt = matchContent(html, 'property', 'og:image:alt')
  const ogImageWidth = matchContent(html, 'property', 'og:image:width')
  const twitterImage = matchContent(html, 'name', 'twitter:image')
  const canonicalTag = html.match(/<link rel="canonical" href="([^"]*)" \/>/)?.[1]
  const englishAlternate = html.match(/<link rel="alternate" hreflang="en" href="([^"]*)" \/>/)?.[1]
  const defaultAlternate = html.match(/<link rel="alternate" hreflang="x-default" href="([^"]*)" \/>/)?.[1]
  const h1Count = (html.match(/<h1(?:\s|>)/g) || []).length
  const schemas = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)]

  if (!title) fail(`${route}: title is missing`)
  else if (titles.has(title)) fail(`${route}: duplicate title also used by ${titles.get(title)}`)
  else titles.set(title, route)
  if (!description) fail(`${route}: description is missing`)
  else if (descriptions.has(description)) fail(`${route}: duplicate description also used by ${descriptions.get(description)}`)
  else descriptions.set(description, route)
  if (!robots?.startsWith('index, follow')) fail(`${route}: indexable robots directive is missing`)
  if (googlebot !== robots) fail(`${route}: Googlebot directive does not match robots`)
  if (canonicalTag !== canonical) fail(`${route}: canonical is ${canonicalTag || 'missing'}, expected ${canonical}`)
  if (ogUrl !== canonical) fail(`${route}: og:url does not match the canonical`)
  if (!ogImage?.startsWith(`${siteUrl}/`)) fail(`${route}: absolute same-site og:image is missing`)
  if (!ogImageAlt) fail(`${route}: og:image alt text is missing`)
  if (ogImageWidth !== '1200') fail(`${route}: og:image width is missing or incorrect`)
  if (twitterImage !== ogImage) fail(`${route}: Twitter image does not match og:image`)
  if (englishAlternate !== canonical || defaultAlternate !== canonical) fail(`${route}: hreflang alternates do not match the canonical`)
  if (h1Count !== 1) fail(`${route}: expected one h1, found ${h1Count}`)
  if (!schemas.length) fail(`${route}: JSON-LD is missing`)
  schemas.forEach((schema, index) => {
    try { JSON.parse(schema[1]) } catch { fail(`${route}: JSON-LD block ${index + 1} is invalid`) }
  })
  if (html.includes('example.com')) fail(`${route}: placeholder example.com URL remains`)

  const article = articleRoutes.get(route)
  if (article) {
    if (matchContent(html, 'property', 'og:type') !== 'article') fail(`${route}: og:type is not article`)
    if (!matchContent(html, 'property', 'article:published_time')) fail(`${route}: article publication time is missing`)
    if (ogImage !== `${siteUrl}${article.image}`) fail(`${route}: article social image does not match its editorial image`)
  }
}

for (const post of blogPosts) {
  try { await access(resolve(root, `public${post.image}`)) } catch { fail(`${post.slug}: blog image is missing at ${post.image}`) }
}

const sitemap = await readFile(resolve(dist, 'sitemap.xml'), 'utf8')
const sitemapUrls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1])
const expectedUrls = routes.map((route) => new URL(route === '/' ? '/' : route, `${siteUrl}/`).href)
if (new Set(sitemapUrls).size !== sitemapUrls.length) fail('sitemap.xml contains duplicate URLs')
if (sitemapUrls.length !== expectedUrls.length || expectedUrls.some((url) => !sitemapUrls.includes(url))) fail('sitemap.xml does not match the indexable route set')
if ((sitemap.match(/<lastmod>/g) || []).length !== expectedUrls.length) fail('sitemap.xml is missing lastmod values')

const robots = await readFile(resolve(dist, 'robots.txt'), 'utf8')
if (!robots.includes(`Sitemap: ${siteUrl}/sitemap.xml`)) fail('robots.txt points to the wrong sitemap')
if (!robots.includes('Disallow: /api/')) fail('robots.txt does not exclude API routes')
if (`${sitemap}\n${robots}`.includes('example.com')) fail('placeholder example.com URL remains in crawl directives')

const notFound = await readFile(resolve(dist, '404.html'), 'utf8')
if (matchContent(notFound, 'name', 'robots') !== 'noindex, nofollow') fail('404.html is not noindex')

const rootFiles = await readdir(dist)
const duplicateHtmlAliases = rootFiles.filter((name) => name.endsWith('.html') && !['index.html', '404.html'].includes(name))
if (duplicateHtmlAliases.length) fail(`duplicate HTML aliases found: ${duplicateHtmlAliases.join(', ')}`)

if (failures.length) {
  console.error(`SEO validation failed:\n- ${failures.join('\n- ')}`)
  process.exitCode = 1
} else {
  console.log(`SEO validation passed for ${routes.length} indexable routes, ${blogPosts.length} article images, sitemap.xml, robots.txt, and 404.html.`)
}
