import { useMemo, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const needs = [
  ['launch', 'Launch something new'],
  ['improve', 'Improve what exists'],
  ['grow', 'Generate demand and sales'],
  ['operate', 'Automate or strengthen operations'],
]

const routes = {
  launch: { service: 'branding-ui-ux', title: 'Launch programme' },
  improve: { service: 'web-design-development', title: 'Focused transformation' },
  grow: { service: 'analytics-conversion', title: 'Growth programme' },
  operate: { service: 'ai-solutions-automation', title: 'Operations programme' },
}

export function ProjectPlanner() {
  const [need, setNeed] = useState('launch')
  const [workstreams, setWorkstreams] = useState('2')
  const [readiness, setReadiness] = useState('some')
  const result = useMemo(() => {
    const score = Number(workstreams) + (readiness === 'little' ? 2 : readiness === 'some' ? 1 : 0)
    if (score <= 2) return { scope: 'Focused sprint', timing: 'A useful starting shape is 3-6 weeks.' }
    if (score <= 4) return { scope: 'Connected project', timing: 'A useful starting shape is 6-12 weeks.' }
    return { scope: 'Phased programme', timing: 'Plan for 12+ weeks with staged releases.' }
  }, [readiness, workstreams])
  const route = routes[need]

  return <section className="section project-planner"><div className="container"><div className="section-heading"><p className="eyebrow">Project planner</p><h2>Find a sensible<br /><em>starting shape.</em></h2><p>This is a planning guide, not an automated quote. Three quick choices will help frame the first conversation.</p></div><div className="project-planner__panel"><div className="planner-fields"><label><span>Primary outcome</span><select value={need} onChange={(event) => setNeed(event.target.value)}>{needs.map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></label><label><span>Workstreams involved</span><select value={workstreams} onChange={(event) => setWorkstreams(event.target.value)}><option value="1">One focused capability</option><option value="2">Two connected capabilities</option><option value="4">Three or more capabilities</option></select></label><label><span>How ready is the brief?</span><select value={readiness} onChange={(event) => setReadiness(event.target.value)}><option value="clear">Clear requirements and content</option><option value="some">Some decisions still needed</option><option value="little">Early idea or complex unknowns</option></select></label></div><div className="planner-result" aria-live="polite"><p className="mini-label">Suggested starting point</p><strong>{result.scope}</strong><h3>{route.title}</h3><p>{result.timing} Final timing and investment depend on requirements, integrations, content, and review availability.</p><Link to={`/contact?service=${route.service}`}>Turn this into a brief <ArrowRight aria-hidden="true" /></Link></div></div></div></section>
}
