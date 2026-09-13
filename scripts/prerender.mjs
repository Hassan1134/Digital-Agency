import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { loadEnv } from 'vite'
import { blogPosts, publishedAt } from '../src/data/blogPosts.js'

const root = resolve(process.cwd())
const template = await readFile(resolve(root, 'dist/index.html'), 'utf8')
const { render } = await import(pathToFileURL(resolve(root, 'dist-ssr/entry-server.js')).href)
const env = loadEnv('production', root, '')
const siteUrl = (env.VITE_SITE_URL || 'https://example.com').replace(/\/$/, '')
const escapeXml = (value) => value.replace(/[<>&'"]/g, (character) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[character])
const routes = [
  { path: '/', title: 'Vergeform — Brand, Web & Growth', description: 'Vergeform creates standout websites, memorable brands, and digital campaigns for ambitious businesses.' },
  { path: '/about', title: 'About — Vergeform', description: 'Meet the thinking behind Vergeform: strategy, creativity, technology, and marketing moving together.' },
  { path: '/services', title: 'Services — Vergeform', description: 'Explore Vergeform’s connected website, brand, SEO, advertising, social, and creative services.' },
  { path: '/blog', title: 'AI, Development & Automation Insights — Vergeform', description: 'Practical guides on AI agents, AI-native software development, cybersecurity, full-stack engineering, and business automation.', keywords: 'AI business blog, AI software development, AI automation, cybersecurity insights' },
  ...blogPosts.map((post) => ({ path: `/blog/${post.slug}`, title: `${post.seoTitle} — Vergeform`, description: post.description, type: 'article', keywords: [post.primaryKeyword, ...post.keywords].join(', ') })),
  { path: '/contact', title: 'Contact — Vergeform', description: 'Tell Vergeform about your website, brand, or marketing project.' },
]
for (const route of routes) {
  const app = render(route.path)
  const canonical = `${siteUrl}${route.path === '/' ? '/' : route.path}`
  let html = template
    .replace('<!--app-html-->', app)
    .replace(/<title>.*?<\/title>/, `<title>${route.title}</title>`)
    .replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${route.description}" />`)
    .replace(/<link rel="canonical" href=".*?" \/>/, `<link rel="canonical" href="${canonical}" />`)
    .replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${route.title}" />`)
    .replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${route.description}" />`)
    .replace(/<meta property="og:url" content=".*?" \/>/, `<meta property="og:url" content="${canonical}" />`)
    .replace(/<meta property="og:type" content=".*?" \/>/, `<meta property="og:type" content="${route.type || 'website'}" />`)
    .replace(/<meta name="twitter:title" content=".*?" \/>/, `<meta name="twitter:title" content="${route.title}" />`)
    .replace(/<meta name="twitter:description" content=".*?" \/>/, `<meta name="twitter:description" content="${route.description}" />`)
    .replace(/<meta name="keywords" content=".*?" \/>/, `<meta name="keywords" content="${route.keywords || 'web design, branding, AI development, business automation'}" />`)
  if (route.type === 'article') html = html.replace('</head>', `    <meta property="article:published_time" content="${publishedAt}" />\n    <meta name="author" content="Vergeform Editorial" />\n  </head>`)
  const dir = route.path === '/' ? resolve(root, 'dist') : resolve(root, `dist${route.path}`)
  await mkdir(dir, { recursive: true })
  await writeFile(resolve(dir, 'index.html'), html)
  if (route.path !== '/') await writeFile(resolve(root, `dist${route.path}.html`), html)
}
const urls = routes.map((route) => `  <url><loc>${siteUrl}${route.path}</loc><lastmod>${publishedAt}</lastmod></url>`).join('\n')
await writeFile(resolve(root, 'dist/sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`)
await writeFile(resolve(root, 'dist/robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`)
const rssItems = blogPosts.map((post) => `    <item>\n      <title>${escapeXml(post.title)}</title>\n      <link>${siteUrl}/blog/${post.slug}</link>\n      <guid>${siteUrl}/blog/${post.slug}</guid>\n      <pubDate>${new Date(`${publishedAt}T00:00:00Z`).toUTCString()}</pubDate>\n      <description>${escapeXml(post.description)}</description>\n      <category>${escapeXml(post.category)}</category>\n    </item>`).join('\n')
await writeFile(resolve(root, 'dist/rss.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0">\n  <channel>\n    <title>Vergeform Insights</title>\n    <link>${siteUrl}/blog</link>\n    <description>Practical guidance on AI, software development, cybersecurity, and business automation.</description>\n    <language>en</language>\n${rssItems}\n  </channel>\n</rss>\n`)
