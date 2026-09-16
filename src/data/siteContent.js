export const serviceGroups = [
  {
    id: 'strategy-brand',
    title: 'Strategy & Brand',
    summary: 'Clarify the opportunity and create a distinctive system people can recognise and trust.',
    serviceIds: ['branding-ui-ux', 'content-creative'],
  },
  {
    id: 'products-commerce',
    title: 'Websites & Digital Products',
    summary: 'Turn ideas, services, and operations into useful customer-facing technology.',
    serviceIds: ['web-design-development', 'ecommerce-development', 'custom-software-saas', 'mobile-app-development'],
  },
  {
    id: 'marketing-growth',
    title: 'Marketing & Growth',
    summary: 'Create demand, improve conversion, and build stronger customer relationships.',
    serviceIds: ['seo-content', 'paid-advertising', 'social-media', 'crm-email-marketing', 'analytics-conversion'],
  },
  {
    id: 'ai-operations',
    title: 'AI, Security & Operations',
    summary: 'Automate valuable work and keep the systems behind it reliable, observable, and secure.',
    serviceIds: ['ai-solutions-automation', 'cybersecurity-support'],
  },
]

export const packages = [
  {
    title: 'Launch Foundation',
    ideal: 'New businesses and focused offers',
    duration: 'Typical shape: 6-10 weeks',
    investment: 'Investment: tailored to scope',
    includes: ['Positioning and messaging direction', 'Visual identity essentials', 'Conversion-focused website', 'SEO and analytics foundations'],
    serviceId: 'branding-ui-ux',
  },
  {
    title: 'Commerce Growth',
    ideal: 'Retail and direct-to-customer brands',
    duration: 'Typical shape: 8-14 weeks',
    investment: 'Investment: tailored to platform',
    includes: ['Store architecture and UX', 'Responsive ecommerce build', 'Payments and core integrations', 'Measurement and optimisation plan'],
    serviceId: 'ecommerce-development',
  },
  {
    title: 'Product MVP',
    ideal: 'Founders and innovation teams',
    duration: 'Typical shape: 10-16 weeks',
    investment: 'Investment: tailored after discovery',
    includes: ['Product discovery and roadmap', 'Interactive prototype', 'Focused first release', 'Deployment and learning plan'],
    serviceId: 'custom-software-saas',
  },
  {
    title: 'Growth Partnership',
    ideal: 'Teams ready for continuous improvement',
    duration: 'Typical shape: 3+ months',
    investment: 'Monthly scope: tailored to priorities',
    includes: ['Prioritised growth roadmap', 'Campaign and content delivery', 'Conversion experiments', 'Monthly decisions and reporting'],
    serviceId: 'analytics-conversion',
  },
]

export const processStages = [
  ['Discover', 'We align on the business context, audience, constraints, existing evidence, and the decision the work needs to improve.', 'Brief, stakeholder inputs, baseline and success measures'],
  ['Define', 'We turn discovery into a prioritised scope, clear responsibilities, technical direction, milestones, and decision points.', 'Roadmap, scope, schedule and delivery plan'],
  ['Design', 'We make the strategy tangible through journeys, prototypes, creative systems, and realistic content before committing to full production.', 'Flows, prototypes, creative direction and design system'],
  ['Build', 'Design, engineering, content, and integrations move together in visible increments with regular reviews.', 'Working releases, content, integrations and documentation'],
  ['Validate', 'We test the critical experience across devices, browsers, accessibility needs, performance targets, data flows, and acceptance criteria.', 'Quality report, resolved priorities and launch checklist'],
  ['Launch & improve', 'We release with monitoring and a clear handover, then use real signals to prioritise support, optimisation, and the next useful move.', 'Deployment, training, measurement and improvement plan'],
]

export const industries = [
  {
    id: 'startups-saas', name: 'Startups & SaaS', eyebrow: 'From idea to useful release',
    intro: 'Focused product strategy, identity, software, and growth support for teams that need to learn quickly without building carelessly.',
    challenges: ['Defining a valuable first release', 'Explaining a new category or product clearly', 'Balancing speed with a maintainable foundation'],
    serviceIds: ['branding-ui-ux', 'custom-software-saas', 'mobile-app-development', 'ai-solutions-automation', 'analytics-conversion'],
  },
  {
    id: 'ecommerce-retail', name: 'Ecommerce & Retail', eyebrow: 'Discovery to repeat purchase',
    intro: 'Connected brand, storefront, acquisition, CRM, and measurement for retailers that want a stronger customer journey.',
    challenges: ['Reducing friction from discovery to checkout', 'Connecting commerce and fulfilment systems', 'Improving retention beyond constant discounting'],
    serviceIds: ['ecommerce-development', 'branding-ui-ux', 'paid-advertising', 'crm-email-marketing', 'analytics-conversion'],
  },
  {
    id: 'professional-services', name: 'Professional Services', eyebrow: 'Expertise made easier to choose',
    intro: 'Positioning, websites, content, and lead systems that turn complex expertise into a clear and credible buying experience.',
    challenges: ['Differentiating similar-looking services', 'Building trust before a first conversation', 'Creating a dependable enquiry pipeline'],
    serviceIds: ['branding-ui-ux', 'web-design-development', 'seo-content', 'crm-email-marketing', 'content-creative'],
  },
  {
    id: 'healthcare-wellness', name: 'Healthcare & Wellness', eyebrow: 'Clear, careful digital experiences',
    intro: 'Accessible customer journeys and operational tools shaped around trust, privacy, clarity, and responsible communication.',
    challenges: ['Making important information understandable', 'Designing inclusive and accessible journeys', 'Handling data and automation with appropriate controls'],
    serviceIds: ['web-design-development', 'mobile-app-development', 'content-creative', 'cybersecurity-support', 'ai-solutions-automation'],
  },
  {
    id: 'real-estate-property', name: 'Real Estate & Property', eyebrow: 'Better journeys for considered decisions',
    intro: 'Digital platforms, campaigns, and automation that help property teams present opportunities and manage enquiries more effectively.',
    challenges: ['Presenting complex listings and developments', 'Connecting campaigns to qualified enquiries', 'Reducing manual lead routing and follow-up'],
    serviceIds: ['web-design-development', 'custom-software-saas', 'paid-advertising', 'crm-email-marketing', 'content-creative'],
  },
  {
    id: 'education-training', name: 'Education & Training', eyebrow: 'Learning made easier to access',
    intro: 'Clear brands, platforms, content, and learner journeys for organisations delivering knowledge at scale.',
    challenges: ['Structuring complex programmes and content', 'Improving enrolment and learner onboarding', 'Supporting accessible experiences across devices'],
    serviceIds: ['branding-ui-ux', 'web-design-development', 'custom-software-saas', 'mobile-app-development', 'seo-content'],
  },
]

export const resources = [
  {
    id: 'website-launch-checklist', title: 'Website launch checklist', type: 'Checklist', readTime: '12 checks',
    intro: 'A practical final review covering clarity, search, accessibility, measurement, performance, and operational readiness.',
    items: ['Confirm one clear purpose and primary action for every key page', 'Test navigation, forms, validation, and confirmation messages', 'Review titles, descriptions, headings, internal links, sitemap, and robots rules', 'Check keyboard access, focus states, labels, contrast, and alternative text', 'Test responsive layouts and real content on common device sizes', 'Compress images and review Core Web Vitals', 'Verify analytics events and consent behaviour', 'Document domains, hosting, backups, owners, and recovery contacts', 'Check redirects and broken links', 'Proofread legal, contact, pricing, and service information', 'Test social sharing metadata', 'Monitor errors, uptime, forms, and indexing after release'],
    serviceId: 'web-design-development',
  },
  {
    id: 'brand-brief-template', title: 'Brand brief builder', type: 'Workshop', readTime: '10 prompts',
    intro: 'Questions that turn opinions about a brand into a useful strategic and creative starting point.',
    items: ['What business change should this work support?', 'Who must understand or choose you?', 'What problem are they trying to solve?', 'What alternatives do they consider?', 'Why should they believe your offer?', 'What should people remember after one encounter?', 'Which parts of the current identity still have value?', 'Where must the new system work in practice?', 'Who decides and who contributes?', 'How will you judge whether the work helped?'],
    serviceId: 'branding-ui-ux',
  },
  {
    id: 'ecommerce-conversion-checklist', title: 'Ecommerce conversion checklist', type: 'Audit guide', readTime: '10 checks',
    intro: 'A focused review of the decisions and friction points between product discovery and completed purchase.',
    items: ['Make product categories match how customers shop', 'Keep search and filters useful on mobile', 'Answer material product questions before checkout', 'Show delivery, returns, availability, and total cost early', 'Use credible imagery and specific product information', 'Protect performance on listing and product pages', 'Keep baskets persistent and easy to edit', 'Minimise checkout fields and distractions', 'Measure product views, basket actions, checkout steps, and purchases', 'Build useful post-purchase and replenishment journeys'],
    serviceId: 'ecommerce-development',
  },
  {
    id: 'ai-opportunity-workbook', title: 'AI opportunity worksheet', type: 'Decision tool', readTime: '9 questions',
    intro: 'A responsible way to identify workflows where AI may create measurable value without hiding operational risk.',
    items: ['What repeated workflow are we improving?', 'Who performs it and who is affected by the output?', 'What baseline time, cost, delay, or error rate exists?', 'Which data and systems are required?', 'What could go wrong if the output is incorrect?', 'Where must a person review or approve?', 'How will access, logs, and sensitive data be controlled?', 'What representative cases will test quality?', 'What result would justify expanding the solution?'],
    serviceId: 'ai-solutions-automation',
  },
]
