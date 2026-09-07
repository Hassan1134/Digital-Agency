import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { loadEnv } from 'vite'

const root = resolve(process.cwd())
const template = await readFile(resolve(root, 'dist/index.html'), 'utf8')
const { render } = await import(pathToFileURL(resolve(root, 'dist-ssr/entry-server.js')).href)
const env = loadEnv('production', root, '')
const siteUrl = (env.VITE_SITE_URL || 'https://example.com').replace(/\/$/, '')
const routes = [
  { path: '/', title: 'Growth Studio — Brand, Web & Growth', description: 'Standout websites, memorable brands, and digital campaigns for ambitious businesses.' },
  { path: '/about', title: 'About — Growth Studio', description: 'Meet the thinking behind Growth Studio: strategy, creativity, technology, and marketing moving together.' },
  { path: '/services', title: 'Services — Growth Studio', description: 'Explore connected website, brand, SEO, advertising, social, and creative services built around meaningful business goals.' },
  { path: '/contact', title: 'Contact — Growth Studio', description: 'Tell Growth Studio about your website, brand, or marketing project.' },
]
for (const route of routes) {
  const app = render(route.path)
  const canonical = `${siteUrl}${route.path === '/' ? '/' : route.path}`
  const html = template
    .replace('<!--app-html-->', app)
    .replace(/<title>.*?<\/title>/, `<title>${route.title}</title>`)
    .replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${route.description}" />`)
    .replace(/<link rel="canonical" href=".*?" \/>/, `<link rel="canonical" href="${canonical}" />`)
    .replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${route.title}" />`)
    .replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${route.description}" />`)
    .replace(/<meta property="og:url" content=".*?" \/>/, `<meta property="og:url" content="${canonical}" />`)
  const dir = route.path === '/' ? resolve(root, 'dist') : resolve(root, `dist${route.path}`)
  await mkdir(dir, { recursive: true })
  await writeFile(resolve(dir, 'index.html'), html)
  if (route.path !== '/') await writeFile(resolve(root, `dist${route.path}.html`), html)
}
const urls = routes.map((route) => `  <url><loc>${siteUrl}${route.path}</loc></url>`).join('\n')
await writeFile(resolve(root, 'dist/sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`)
await writeFile(resolve(root, 'dist/robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`)
