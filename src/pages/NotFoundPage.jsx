import { Button } from '../components/elements/Button'
import { Seo } from '../components/modules/Seo'

export function NotFoundPage() { return <><Seo title="Page not found — Growth Studio" description="The requested page could not be found." path="/404" /><section className="not-found surface-dark"><div className="container"><p className="eyebrow">Error 404</p><h1>This page took a<br /><em>wrong turn.</em></h1><p>The link may be old, or the page may have moved. Head home and keep exploring.</p><Button to="/">Back to home</Button></div></section></> }
