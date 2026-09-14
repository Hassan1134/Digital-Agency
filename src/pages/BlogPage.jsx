import { useMemo, useState } from 'react'
import { ArrowDown, ArrowUpRight, Clock, Search, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { BlogVisual } from '../components/modules/BlogVisual'
import { CTASection } from '../components/modules/CTASection'
import { Reveal } from '../components/modules/Reveal'
import { Seo } from '../components/modules/Seo'
import { agency } from '../config/agency'
import { blogPosts, publishedAt } from '../data/blogPosts'
import { siteSeo } from '../data/seo'

const categories = ['All', ...new Set(blogPosts.map((post) => post.category))]
const publicationDate = 'September 13, 2026'
const siteOrigin = agency.siteUrl.replace(/\/$/, '')
const homeUrl = `${siteOrigin}/`
const blogUrl = `${siteOrigin}${siteSeo.blog.path}`
const organizationId = `${homeUrl}#organization`
const websiteId = `${homeUrl}#website`
const blogId = `${blogUrl}#blog`
const articleListId = `${blogUrl}#article-list`
const breadcrumbId = `${blogUrl}#breadcrumb`
const blogPostSchemas = blogPosts.map((post) => {
  const articleUrl = `${blogUrl}/${post.slug}`
  return {
    '@type': 'BlogPosting',
    '@id': `${articleUrl}#article`,
    headline: post.title,
    description: post.description,
    url: articleUrl,
    mainEntityOfPage: articleUrl,
    image: new URL(post.image, homeUrl).href,
    datePublished: post.publishedAt || publishedAt,
    dateModified: post.modifiedAt || post.publishedAt || publishedAt,
    author: { '@id': organizationId },
    publisher: { '@id': organizationId },
    articleSection: post.category,
    inLanguage: 'en',
  }
})
const blogSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': `${blogUrl}#webpage`,
      url: blogUrl,
      name: siteSeo.blog.title,
      description: siteSeo.blog.description,
      isPartOf: { '@id': websiteId },
      about: { '@id': blogId },
      breadcrumb: { '@id': breadcrumbId },
      mainEntity: [{ '@id': blogId }, { '@id': articleListId }],
      inLanguage: 'en',
    },
    {
      '@type': 'Blog',
      '@id': blogId,
      url: blogUrl,
      name: 'Vergeform Insights',
      description: siteSeo.blog.description,
      publisher: { '@id': organizationId },
      blogPost: blogPostSchemas.map((post) => ({ '@id': post['@id'] })),
      inLanguage: 'en',
    },
    {
      '@type': 'ItemList',
      '@id': articleListId,
      name: 'Vergeform insight articles',
      numberOfItems: blogPostSchemas.length,
      itemListElement: blogPostSchemas.map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: { '@id': post['@id'] },
      })),
    },
    {
      '@type': 'BreadcrumbList',
      '@id': breadcrumbId,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: homeUrl },
        { '@type': 'ListItem', position: 2, name: 'Insights', item: blogUrl },
      ],
    },
    { '@type': 'Organization', '@id': organizationId, name: agency.name, url: homeUrl },
    { '@type': 'WebSite', '@id': websiteId, name: agency.name, url: homeUrl, publisher: { '@id': organizationId } },
    ...blogPostSchemas,
  ],
}

function ArticleMeta({ post }) {
  return <div className="blog-card__meta"><time dateTime={publishedAt}>{publicationDate}</time><span><Clock size={13} aria-hidden="true" />{post.readTime}</span></div>
}

export function BlogPage() {
  const [category, setCategory] = useState('All')
  const [query, setQuery] = useState('')
  const visiblePosts = useMemo(() => {
    const term = query.trim().toLowerCase()
    return blogPosts.filter((post) => (category === 'All' || post.category === category) && (!term || `${post.title} ${post.excerpt} ${post.keywords.join(' ')}`.toLowerCase().includes(term)))
  }, [category, query])

  const isDefaultView = category === 'All' && !query.trim()
  const featuredPost = isDefaultView ? visiblePosts[0] : null
  const articles = featuredPost ? visiblePosts.slice(1) : visiblePosts
  return <>
    <Seo {...siteSeo.blog} schema={blogSchema} />

    <section className="blog-masthead surface-dark">
      <div className="blog-masthead__orb" aria-hidden="true"><span>V/F</span></div>
      <div className="container blog-masthead__inner">
        <div className="blog-masthead__top"><p className="eyebrow"><Sparkles size={14} aria-hidden="true" /> Vergeform intelligence · Vol. 01</p><p>Independent thinking for teams building what comes next.</p></div>
        <div className="blog-masthead__grid">
          <Reveal><h1>Signals beyond<br />the <em>noise.</em></h1></Reveal>
          <Reveal className="blog-masthead__aside" delay={0.08}><p className="lede">Practical, source-backed intelligence on AI, software, security, and automation—made for ambitious business leaders.</p><div className="blog-masthead__stats"><div><strong>05</strong><span>Deep dives</span></div><div><strong>04</strong><span>Core disciplines</span></div><div><strong>0%</strong><span>Empty hype</span></div></div></Reveal>
        </div>
        <a className="blog-masthead__jump" href="#latest"><ArrowDown aria-hidden="true" /> Explore the journal</a>
      </div>
    </section>

    <div className="blog-index" id="latest">
      {featuredPost && <section className="blog-feature container" aria-labelledby="featured-title"><Reveal className="blog-feature__shell">
        <Link className="blog-feature__visual" to={`/blog/${featuredPost.slug}`} aria-label={`Read ${featuredPost.title}`}><BlogVisual variant={featuredPost.visual} image={featuredPost.image} imageAlt={featuredPost.imageAlt} /><span className="blog-feature__edition">01 <small>/ Editor’s pick</small></span></Link>
        <div className="blog-feature__body"><div className="blog-feature__label"><span>Featured intelligence</span><span>{featuredPost.category}</span></div><ArticleMeta post={featuredPost} /><h2 id="featured-title"><Link to={`/blog/${featuredPost.slug}`}>{featuredPost.title}</Link></h2><p>{featuredPost.excerpt}</p><Link className="blog-feature__link" to={`/blog/${featuredPost.slug}`}><span>Read the full perspective</span><ArrowUpRight aria-hidden="true" /></Link></div>
      </Reveal></section>}

      <section className="section blog-library" aria-labelledby="library-title"><div className="container">
        <div className="blog-library__heading"><div><p className="eyebrow">The knowledge library</p><h2 id="library-title">Ideas you can<br /><em>put to work.</em></h2></div><p>Explore strategic guidance for making smarter technology decisions and turning emerging capabilities into durable business value.</p></div>
        <div className="blog-tools"><label><Search aria-hidden="true" /><span className="sr-only">Search insights</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search the journal..." /></label><div className="blog-categories" role="group" aria-label="Filter articles by category">{categories.map((item) => <button className={category === item ? 'is-active' : ''} aria-pressed={category === item} onClick={() => setCategory(item)} key={item}>{item}</button>)}</div></div>
        <div className="blog-index__summary"><p><strong>{String(visiblePosts.length).padStart(2, '0')}</strong> articles found</p><p>Research-led · Action-oriented · No hype</p></div>
        <div className="blog-grid">{articles.map((post, index) => <Reveal className="blog-card" delay={Math.min(index * 0.04, 0.12)} key={post.slug}><Link className="blog-card__visual" to={`/blog/${post.slug}`} aria-label={`Read ${post.title}`}><BlogVisual variant={post.visual} image={post.image} imageAlt={post.imageAlt} /><span>{post.category}</span><b className="blog-card__number">{String((featuredPost ? index + 2 : index + 1)).padStart(2, '0')}</b></Link><div className="blog-card__body"><ArticleMeta post={post} /><h3><Link to={`/blog/${post.slug}`}>{post.title}</Link></h3><p>{post.excerpt}</p><Link className="blog-card__link" to={`/blog/${post.slug}`}>Read the guide <ArrowUpRight aria-hidden="true" /></Link></div></Reveal>)}</div>
        {visiblePosts.length === 0 && <div className="blog-empty"><span>00</span><h2>No signal found.</h2><p>Try a broader term or reset the category to explore every article.</p><button onClick={() => { setQuery(''); setCategory('All') }}>Show all insights</button></div>}
      </div></section>
    </div>

    <CTASection title="Need a useful AI roadmap—not another trend report?" copy="Tell us which process, product, or customer experience you want to improve. We’ll help turn the opportunity into a practical scope." />
  </>
}
