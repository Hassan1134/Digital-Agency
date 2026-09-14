# Vergeform SEO launch checklist

The production build now creates a crawlable HTML page for every public route, unique metadata, JSON-LD, a canonical URL, social previews, `robots.txt`, `sitemap.xml`, and an RSS feed. The build fails if those essentials regress.

## Primary search-intent map

| Page | Primary intent |
| --- | --- |
| `/` | digital agency; web design, branding, AI, SEO, and growth partner |
| `/services/web-design-development` | web design and development services; React development |
| `/services/ai-solutions-automation` | AI solutions, AI agents, custom chatbots, and business automation services |
| `/services/branding-ui-ux` | branding and UI/UX design services |
| `/services/seo-content` | SEO and content strategy services |
| `/services/paid-advertising` | paid advertising and PPC services |
| `/services/social-media` | social media marketing services |
| `/services/content-creative` | creative content production services |
| `/blog/*` | the specific AI, software, cybersecurity, full-stack, or automation topic in each article |
| `/contact` | contact or hire Vergeform for a digital project |

Do not repeat keywords mechanically. Keep each page focused on its assigned search intent, answer the visitor's questions completely, and add relevant internal links when publishing new pages.

## After each deployment

1. Open `https://vergeform.netlify.app/robots.txt` and `https://vergeform.netlify.app/sitemap.xml` and confirm they return `200`.
2. Run `npm run seo:validate` against the latest production build before deployment.
3. Verify the site in Google Search Console, submit `https://vergeform.netlify.app/sitemap.xml`, and inspect the homepage plus each new service/article URL.
4. Add the site to Bing Webmaster Tools and submit the same sitemap.
5. Review indexing, search queries, click-through rate, Core Web Vitals, broken links, and enquiry conversions every month.

## Business details still requiring the owner's input

Complete the truthful public fields in `src/config/agency.js`: business email, service location, booking URL, WhatsApp number, and verified social profiles. Do not add a street address, team member, review, award, or customer claim unless it is real and can be shown publicly. These details can then be included safely in organization and contact structured data.

When Vergeform moves to a custom domain, change `VITE_SITE_URL` in Netlify and the fallback in `src/config/agency.js`, then permanently redirect the Netlify subdomain to the preferred HTTPS domain. Rebuild, submit the new sitemap, and request indexing for the new canonical URLs.

## Content maintenance

- Update the relevant `updatedAt` value in `src/data/seo.js` only when that page's visible content changes materially.
- Give every new article an original 1200-pixel image, descriptive alt text, a clear author/publisher, source links, and a genuine published/modified date.
- Link new articles to the most relevant service page and link useful service pages back to supporting articles.
- Refresh articles when facts, tools, or recommendations change; do not change dates without a substantive update.
- Earn mentions and links through useful work, partnerships, original research, and credible directories. Avoid paid link schemes or mass-generated pages.

`meta keywords` are retained as an editorial keyword map, but Google does not use that tag for ranking. Titles, headings, useful page copy, crawlability, internal links, reputation, and real-world relevance matter more.
