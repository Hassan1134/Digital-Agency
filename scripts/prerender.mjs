import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { loadEnv } from 'vite'
import { blogPosts, publishedAt } from '../src/data/blogPosts.js'
import { serviceSeo, siteSeo } from '../src/data/seo.js'
import { industries } from '../src/data/siteContent.js'

const root = resolve(process.cwd())
const template = await readFile(resolve(root, 'dist/index.html'), 'utf8')
const { render } = await import(pathToFileURL(resolve(root, 'dist-ssr/entry-server.js')).href)
const env = loadEnv('production', root, '')
const siteUrl = (env.VITE_SITE_URL || 'https://vergeform.netlify.app').replace(/\/$/, '')
const defaultImage = '/vergeform-og.jpg'
const indexDirective = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'

const escapeHtml = (value = '') => String(value).replace(/[<>&'"]/g, (character) => ({
  '<': '&lt;',
  '>': '&gt;',
  '&': '&amp;',
  "'": '&#39;',
  '"': '&quot;',
})[character])

const escapeXml = (value = '') => String(value).replace(/[<>&'"]/g, (character) => ({
  '<': '&lt;',
  '>': '&gt;',
  '&': '&amp;',
  "'": '&apos;',
  '"': '&quot;',
})[character])

const routes = [
  { ...siteSeo.home, lastModified: siteSeo.home.updatedAt },
  { ...siteSeo.about, lastModified: siteSeo.about.updatedAt },
  { ...siteSeo.services, lastModified: siteSeo.services.updatedAt },
  ...Object.entries(serviceSeo).map(([serviceId, seo]) => ({
    path: `/services/${serviceId}`,
    title: seo.title,
    description: seo.description,
    keywords: [seo.primaryKeyword, ...seo.keywords],
    lastModified: seo.updatedAt,
  })),
  { ...siteSeo.blog, lastModified: siteSeo.blog.updatedAt },
  ...blogPosts.map((post) => ({
    path: `/blog/${post.slug}`,
    title: `${post.seoTitle} | Vergeform`,
    description: post.description,
    type: 'article',
    keywords: [post.primaryKeyword, ...post.keywords],
    image: post.image,
    imageAlt: post.imageAlt,
    publishedTime: publishedAt,
    modifiedTime: post.modifiedAt || publishedAt,
    lastModified: post.modifiedAt || publishedAt,
  })),
  { ...siteSeo.contact, lastModified: siteSeo.contact.updatedAt },
  { ...siteSeo.process, lastModified: siteSeo.process.updatedAt },
  { ...siteSeo.industries, lastModified: siteSeo.industries.updatedAt },
  ...industries.map((industry) => ({ path: `/industries/${industry.id}`, title: `${industry.name} Digital Services | Vergeform`, description: industry.intro, keywords: [`${industry.name} digital agency`, `${industry.name} website services`], lastModified: '2026-09-16' })),
  { ...siteSeo.resources, lastModified: siteSeo.resources.updatedAt },
  { path: '/privacy', title: 'Privacy Notice | Vergeform', description: 'How Vergeform handles information submitted through this website.', lastModified: '2026-09-16' },
  { path: '/accessibility', title: 'Accessibility Statement | Vergeform', description: 'Vergeform’s commitment to a digital experience that more people can use.', lastModified: '2026-09-16' },
  { path: '/cookies', title: 'Cookie Notice | Vergeform', description: 'How Vergeform uses essential storage and optional consent-based analytics.', noIndex: true, lastModified: '2026-09-16' },
  { path: '/terms', title: 'Website Terms | Vergeform', description: 'General conditions for using the Vergeform website and its free resources.', noIndex: true, lastModified: '2026-09-16' },
]

const replaceMeta = (html, attribute, key, content) => html.replace(
  new RegExp(`<meta ${attribute}="${key}" content=".*?" \\/>`),
  `<meta ${attribute}="${key}" content="${escapeHtml(content)}" />`,
)

const replaceLink = (html, selectorPattern, replacement) => html.replace(selectorPattern, replacement)

function createHtml(route) {
  const app = render(route.path)
  const canonical = new URL(route.path === '/' ? '/' : route.path, `${siteUrl}/`).href
  const imagePath = route.image || defaultImage
  const imageUrl = new URL(imagePath, `${siteUrl}/`).href
  const imageAlt = route.imageAlt || 'Vergeform digital agency — strategy, design, technology, and growth'
  const robots = route.noIndex ? 'noindex, nofollow' : indexDirective
  const keywords = route.keywords?.length
    ? route.keywords.join(', ')
    : 'digital agency, web design agency, branding agency, AI development agency, SEO services'
  const imageHeight = imagePath.startsWith('/blog/') ? '675' : '630'

  let html = template
    .replace('<!--app-html-->', app)
    .replace(/<title>.*?<\/title>/s, `<title>${escapeHtml(route.title)}</title>`)

  html = replaceMeta(html, 'name', 'description', route.description)
  html = replaceMeta(html, 'name', 'robots', robots)
  html = replaceMeta(html, 'name', 'googlebot', robots)
  html = replaceMeta(html, 'name', 'author', route.type === 'article' ? 'Vergeform Editorial' : 'Vergeform')
  html = replaceMeta(html, 'name', 'keywords', keywords)
  html = replaceMeta(html, 'property', 'og:title', route.title)
  html = replaceMeta(html, 'property', 'og:description', route.description)
  html = replaceMeta(html, 'property', 'og:url', canonical)
  html = replaceMeta(html, 'property', 'og:type', route.type || 'website')
  html = replaceMeta(html, 'property', 'og:image', imageUrl)
  html = replaceMeta(html, 'property', 'og:image:secure_url', imageUrl)
  html = replaceMeta(html, 'property', 'og:image:width', '1200')
  html = replaceMeta(html, 'property', 'og:image:height', imageHeight)
  html = replaceMeta(html, 'property', 'og:image:alt', imageAlt)
  html = replaceMeta(html, 'name', 'twitter:title', route.title)
  html = replaceMeta(html, 'name', 'twitter:description', route.description)
  html = replaceMeta(html, 'name', 'twitter:image', imageUrl)
  html = replaceMeta(html, 'name', 'twitter:image:alt', imageAlt)
  html = replaceLink(html, /<link rel="canonical" href=".*?" \/>/, `<link rel="canonical" href="${escapeHtml(canonical)}" />`)
  html = replaceLink(html, /<link rel="alternate" hreflang="en" href=".*?" \/>/, `<link rel="alternate" hreflang="en" href="${escapeHtml(canonical)}" />`)
  html = replaceLink(html, /<link rel="alternate" hreflang="x-default" href=".*?" \/>/, `<link rel="alternate" hreflang="x-default" href="${escapeHtml(canonical)}" />`)

  if (route.type === 'article') {
    html = html.replace('</head>', `    <meta property="article:published_time" content="${escapeHtml(route.publishedTime)}" />\n    <meta property="article:modified_time" content="${escapeHtml(route.modifiedTime)}" />\n  </head>`)
  }

  return html
}

for (const route of routes) {
  const html = createHtml(route)
  const directory = route.path === '/' ? resolve(root, 'dist') : resolve(root, `dist${route.path}`)
  await mkdir(directory, { recursive: true })
  await writeFile(resolve(directory, 'index.html'), html)
}

const notFoundHtml = createHtml({
  path: '/404',
  title: 'Page Not Found | Vergeform',
  description: 'The requested page could not be found. Explore Vergeform services, insights, and selected work instead.',
  noIndex: true,
})
await writeFile(resolve(root, 'dist/404.html'), notFoundHtml)

const urls = routes.filter((route) => !route.noIndex).map((route) => {
  const location = new URL(route.path === '/' ? '/' : route.path, `${siteUrl}/`).href
  return `  <url>\n    <loc>${escapeXml(location)}</loc>\n    <lastmod>${escapeXml(route.lastModified)}</lastmod>\n  </url>`
}).join('\n')

await writeFile(resolve(root, 'dist/sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`)
await writeFile(resolve(root, 'dist/robots.txt'), `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${siteUrl}/sitemap.xml\n`)

const rssItems = blogPosts.map((post) => {
  const postUrl = `${siteUrl}/blog/${post.slug}`
  const imageUrl = `${siteUrl}${post.image}`
  return `    <item>\n      <title>${escapeXml(post.title)}</title>\n      <link>${escapeXml(postUrl)}</link>\n      <guid isPermaLink="true">${escapeXml(postUrl)}</guid>\n      <pubDate>${new Date(`${publishedAt}T00:00:00Z`).toUTCString()}</pubDate>\n      <description>${escapeXml(post.description)}</description>\n      <category>${escapeXml(post.category)}</category>\n      <media:content url="${escapeXml(imageUrl)}" medium="image" type="image/jpeg" />\n    </item>`
}).join('\n')

await writeFile(resolve(root, 'dist/rss.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0" xmlns:media="http://search.yahoo.com/mrss/">\n  <channel>\n    <title>Vergeform Insights</title>\n    <link>${siteUrl}/blog</link>\n    <description>Practical guidance on AI, software development, cybersecurity, and business automation.</description>\n    <language>en</language>\n    <lastBuildDate>${new Date(`${siteSeo.blog.updatedAt}T00:00:00Z`).toUTCString()}</lastBuildDate>\n${rssItems}\n  </channel>\n</rss>\n`)
