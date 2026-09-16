import { Navigate } from 'react-router-dom'
import { PageIntro } from '../components/modules/PageIntro'
import { Seo } from '../components/modules/Seo'
import { agency } from '../config/agency'

const policies = {
  privacy: {
    title: 'Privacy Notice', updated: '16 September 2026',
    intro: 'How Vergeform handles information submitted through this website.',
    sections: [
      ['Information we collect', 'When you submit an enquiry, we may receive your name, email address, company, website, phone number, project interests, budget, timeline, and the information you include in your message. We also receive the source page needed to understand the enquiry.'],
      ['Why we use it', 'We use enquiry information to assess your request, respond, prepare a proposal, prevent misuse, and maintain an appropriate business record. We do not add enquiry details to a marketing list without a separate choice.'],
      ['How it is handled', 'Information is processed through the configured website enquiry endpoint and may be stored in the agency’s project-enquiry records. Access should be limited to people who need it for the purposes described here.'],
      ['Sharing and retention', 'We do not sell personal information. Data may be handled by essential hosting, email, scheduling, analytics, or business-service providers when configured. Information should be retained only as long as needed for the enquiry, a resulting relationship, legal obligations, or legitimate record keeping.'],
      ['Your choices', 'Depending on where you live, you may have rights to request access, correction, deletion, restriction, or objection. Use the contact route below to make a request. Identity may need to be verified before acting on it.'],
      ['Contact', agency.email ? `Privacy questions can be sent to ${agency.email}.` : 'Privacy questions can be submitted through the contact page. Add the subject “Privacy request” so it can be routed correctly.'],
    ],
  },
  cookies: {
    title: 'Cookie Notice', updated: '16 September 2026',
    intro: 'A clear account of storage and measurement used by this website.',
    sections: [
      ['Essential storage', 'The site may use local browser storage for essential interface preferences, such as remembering a cookie choice. This does not create an advertising profile.'],
      ['Analytics', 'Optional analytics is loaded only when a measurement ID is configured and a visitor accepts analytics. It is used to understand aggregate website use and improve important journeys.'],
      ['Third-party services', 'External services such as scheduling, embedded media, maps, or chat may set their own cookies when added or opened. Their notices govern that processing.'],
      ['Managing your choice', 'You can accept or decline optional analytics from the website notice when it is enabled. You can also remove stored choices using your browser settings.'],
    ],
  },
  accessibility: {
    title: 'Accessibility Statement', updated: '16 September 2026',
    intro: 'Our commitment to a digital experience that more people can use.',
    sections: [
      ['Our approach', 'We aim to make this website perceivable, operable, understandable, and robust across modern devices and assistive technologies. Accessibility is considered in structure, keyboard use, focus, colour, motion, forms, and responsive layouts.'],
      ['Known limitations', 'Digital experiences and content evolve. Some limitations may remain, particularly in third-party services or older documents. We prioritise issues that prevent someone from completing an important journey.'],
      ['Feedback', 'If you encounter a barrier, tell us which page or feature was involved, what happened, and any assistive technology or browser that may help us reproduce it. Use the contact page and include “Accessibility” in your message.'],
      ['Ongoing improvement', 'We review important journeys during design and development and aim to address reported barriers through the normal improvement process.'],
    ],
  },
  terms: {
    title: 'Website Terms', updated: '16 September 2026',
    intro: 'General conditions for using the Vergeform website and its free resources.',
    sections: [
      ['Website information', 'Content is provided for general information and may change. It is not legal, financial, security, or other regulated professional advice. You should assess information against your own circumstances.'],
      ['Proposals and services', 'Website descriptions are illustrative and do not create a service commitment. Any client work, fees, timing, responsibilities, ownership, warranties, and support terms are governed by an agreed proposal or contract.'],
      ['Intellectual property', 'Unless stated otherwise, the website’s design, writing, graphics, and original resources belong to Vergeform or their respective licensors. You may use free checklists internally, but may not resell or present them as your own work.'],
      ['External links', 'Links to third-party websites are provided for convenience. We do not control their availability, content, security, or privacy practices.'],
      ['Liability', 'To the extent permitted by applicable law, Vergeform is not responsible for loss caused by relying solely on general website content or by third-party services outside its control. Nothing here excludes rights or liability that cannot legally be excluded.'],
    ],
  },
}

export function LegalPage({ policyId }) {
  const policy = policies[policyId]
  if (!policy) return <Navigate to="/" replace />
  const path = `/${policyId}`
  return <>
    <Seo title={`${policy.title} | Vergeform`} description={policy.intro} path={path} noIndex={policyId === 'terms' || policyId === 'cookies'} />
    <PageIntro dark eyebrow={`Last updated · ${policy.updated}`} title={<>{policy.title}</>} copy={policy.intro} />
    <section className="section legal-content"><div className="container"><aside><p className="mini-label">Important</p><p>These website notices describe the current site setup. They should be reviewed against your business details, providers, and applicable law before launch.</p></aside><div>{policy.sections.map(([title, text]) => <section key={title}><h2>{title}</h2><p>{text}</p></section>)}</div></div></section>
  </>
}
