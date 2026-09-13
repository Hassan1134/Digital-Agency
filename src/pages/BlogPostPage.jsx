import { ArrowLeft, ArrowUpRight, Clock } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Accordion } from '../components/modules/Accordion'
import { BlogVisual } from '../components/modules/BlogVisual'
import { CTASection } from '../components/modules/CTASection'
import { Reveal } from '../components/modules/Reveal'
import { Seo } from '../components/modules/Seo'
import { agency } from '../config/agency'
import { blogPosts, getBlogPost, publishedAt } from '../data/blogPosts'

export function BlogPostPage() {
  const { slug } = useParams()
  const post = getBlogPost(slug)
  if (!post) return <Navigate to="/blog" replace />
  const canonical = `${agency.siteUrl}/blog/${post.slug}`
  const wordCount = [...post.intro, ...post.sections.flatMap((section) => [...section.paragraphs, ...(section.bullets || [])]), ...post.faqs.flat()].join(' ').split(/\s+/).length
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BlogPosting', headline: post.title, description: post.description, datePublished: publishedAt, dateModified: publishedAt, url: canonical, mainEntityOfPage: canonical, inLanguage: 'en', isAccessibleForFree: true, wordCount, author: { '@type': 'Organization', name: agency.name }, publisher: { '@type': 'Organization', name: agency.name, logo: { '@type': 'ImageObject', url: `${agency.siteUrl}/favicon.svg` } }, keywords: [post.primaryKeyword, ...post.keywords].join(', '), articleSection: post.category },
      { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: `${agency.siteUrl}/` }, { '@type': 'ListItem', position: 2, name: 'Insights', item: `${agency.siteUrl}/blog` }, { '@type': 'ListItem', position: 3, name: post.title, item: canonical }] },
      { '@type': 'FAQPage', mainEntity: post.faqs.map(([question, answer]) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } })) },
    ],
  }
  const related = blogPosts.filter((item) => item.slug !== post.slug).slice(0, 2)

  return <>
    <Seo title={`${post.seoTitle} — Vergeform`} description={post.description} path={`/blog/${post.slug}`} type="article" keywords={[post.primaryKeyword, ...post.keywords]} schema={schema} publishedTime={publishedAt} />
    <article className="article-page">
      <header className="article-hero surface-dark"><div className="container"><nav className="breadcrumbs" aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><Link to="/blog">Insights</Link><span>/</span><span>{post.category}</span></nav><div className="article-hero__grid"><div><p className="eyebrow">{post.category} · Field guide</p><h1>{post.title}</h1><p className="lede">{post.excerpt}</p><div className="article-byline"><span>By Vergeform Editorial</span><time dateTime={publishedAt}>September 13, 2026</time><span><Clock size={14} />{post.readTime}</span></div></div><BlogVisual variant={post.visual} /></div></div></header>
      <div className="container article-layout"><aside className="article-sidebar"><Link className="article-back" to="/blog"><ArrowLeft />All insights</Link><nav aria-label="Article contents"><p className="mini-label">In this guide</p>{post.sections.map((section, index) => <a href={`#section-${index + 1}`} key={section.heading}><span>{String(index + 1).padStart(2, '0')}</span>{section.heading}</a>)}</nav><div className="article-keywords"><p className="mini-label">Topics</p>{[post.primaryKeyword, ...post.keywords.slice(0, 4)].map((keyword) => <span key={keyword}>{keyword}</span>)}</div></aside>
        <div className="article-content"><div className="article-intro">{post.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>{post.sections.map((section, index) => <Reveal className="article-section" key={section.heading}><section id={`section-${index + 1}`}><span className="article-section__number">{String(index + 1).padStart(2, '0')}</span><h2>{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{section.bullets && <ul>{section.bullets.map((item) => <li key={item}>{item}</li>)}</ul>}</section></Reveal>)}
          <section className="article-faq"><p className="eyebrow">Frequently asked questions</p><h2>Useful answers,<br />without the noise.</h2><Accordion items={post.faqs} /></section>
          <section className="article-sources"><p className="eyebrow">Sources and further reading</p><p>This article is editorial guidance, not legal, security, or financial advice. These primary sources informed the analysis:</p><ol>{post.sources.map(([title, url]) => <li key={url}><a href={url} target="_blank" rel="noreferrer">{title}<ArrowUpRight /></a></li>)}</ol></section>
        </div>
      </div>
    </article>
    <section className="section related-posts"><div className="container"><div className="related-posts__head"><p className="eyebrow">Continue exploring</p><h2>Related thinking.</h2></div><div>{related.map((item) => <Link to={`/blog/${item.slug}`} key={item.slug}><span>{item.category}</span><h3>{item.title}</h3><ArrowUpRight /></Link>)}</div></div></section>
    <CTASection title="Turn this insight into a working advantage." copy="We connect AI strategy, product design, engineering, and automation around a clear business outcome." />
  </>
}
