# Vergeform

A complete, responsive React marketing website for **Vergeform**, an independent multidisciplinary creative agency. The name combines **verge**—the edge of what is next—with **form**—the craft of turning strategy into something tangible. All business details and links are centralised in `src/config/agency.js`.

## Run locally

Requirements: Node.js 20.19+, 22.13+, or 24+ is recommended for the current Vite release.

```bash
npm install
npm run dev
```

Production checks:

```bash
npm run lint
npm run build
npm run preview
```

The production build outputs to `dist/` and prerenders every marketing and blog route as route-specific HTML with titles, descriptions, canonical URLs, Open Graph metadata, structured article data, and FAQ schema. It also generates `sitemap.xml`, `robots.txt`, and an RSS feed at `rss.xml`.

## Configuration

1. Edit `src/config/agency.js` to replace the working name and add approved email, WhatsApp, location, booking, or social details. Empty channels are hidden automatically.
2. Copy `.env.example` to `.env` and set `VITE_SITE_URL` to the final production origin.
3. Replace `public/robots.txt` and `public/sitemap.xml` only if your host serves the unbuilt public directory directly. The production build regenerates both files from `VITE_SITE_URL`.

No structured data is emitted yet because no verified legal business details, address, or final production URL were supplied. Add those details only after they are confirmed.

## Contact form and Excel

The contact form can add every validated enquiry to a private Microsoft Excel table through Power Automate. The browser posts to the same-site `/api/enquiry` function, which validates and normalises the submission before forwarding it to the private workflow. The Power Automate URL is never exposed in client JavaScript.

Follow [`docs/excel-contact-integration.md`](docs/excel-contact-integration.md) to create the workbook, flow, and two deployment environment variables. Until `VITE_ENQUIRY_ENDPOINT` is configured, the form remains visibly in demo mode and does not claim that data was sent.

## Hosting and direct routes

The build creates physical `index.html` files for all four marketing routes, so static hosts can serve direct visits and refreshes without a client-side fallback. For any future dynamic route, configure the host to fall back to `/index.html`. Common platforms such as Netlify, Vercel, and Cloudflare Pages can publish the `dist` directory directly.

## Content and concept work

- Services, goals, projects, and FAQs are centralised in `src/data/content.js`.
- Long-form insight articles, keyword clusters, FAQs, and primary research links are centralised in `src/data/blogPosts.js`.
- All three examples are visibly identified as concept projects. Replace their records and local assets when approved portfolio work is available; do not remove the concept label until the relationship and claims can be verified.
- No testimonials, client logos, awards, team identities, business history, prices, or performance results were invented.

### Visual asset sources

The Morrow, Kindred, and Frequency images in `src/assets/` were generated specifically for this project with OpenAI's built-in image generation tool, then exported as quality-optimised JPEG files. They are original fictional concepts, not assets from the reference agencies.

Prompt summaries:

- **Morrow:** editorial ecommerce browser concept for a fictional outdoor apparel label; forest, clay, cream, charcoal, and lime palette; no people, existing logos, or claims.
- **Kindred:** overhead botanical drinks identity presentation with cans, labels, and leaf symbols; cobalt, red, ivory, charcoal, and lime palette; no existing logos or claims.
- **Frequency:** modular audio launch campaign across poster, digital panel, and mobile; charcoal, ivory, lime, and violet palette; no people, logos, or fabricated results.

Typography is loaded from [Google Fonts](https://fonts.google.com/) using Space Grotesk and Inter. If a stricter privacy or offline policy is required, self-host licensed font files and replace the CSS import in `src/styles/global.css`.

## Accessibility and interaction notes

The implementation includes a skip link, visible focus states, semantic landmarks, reduced-motion handling, route focus management, keyboard-accessible navigation, focus-trapped project dialogs with Escape/restore behaviour, accessible accordions, labeled fields, inline validation, an error summary, and a non-obstructive mobile project action that is removed on the contact route.

## Reference direction

Ramotion, Instrument, and Work & Co were reviewed only for high-level patterns such as concise positioning, work-forward pacing, integrated service language, and clear enquiry routes. No text, layouts, client materials, images, or results were copied.
