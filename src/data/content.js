import morrowImage from '../assets/morrow-concept.jpg'
import kindredImage from '../assets/kindred-concept.jpg'
import frequencyImage from '../assets/frequency-concept.jpg'

export const projects = [
  {
    id: 'morrow', name: 'Morrow', sector: 'Outdoor ecommerce', services: ['Strategy', 'Web design', 'React development'], image: morrowImage,
    summary: 'A product-led storefront concept that makes technical outerwear feel clear, tactile, and easy to explore.',
    brief: 'Create a distinctive ecommerce experience for a new outdoor label without losing practical product detail.',
    approach: 'We paired an editorial product story with direct shopping paths, strong category cues, and modular campaign space.',
    deliverables: ['Discovery and sitemap', 'Ecommerce UX', 'Responsive UI system', 'React storefront concept'],
    alt: 'Morrow outdoor clothing ecommerce website concept in a desktop browser',
  },
  {
    id: 'kindred', name: 'Kindred', sector: 'Botanical drinks', services: ['Brand strategy', 'Identity', 'Packaging'], image: kindredImage,
    summary: 'A bright identity system designed to give a botanical drinks range energy, shelf presence, and cohesion.',
    brief: 'Build a flexible identity that feels lively and contemporary across packaging, retail, and digital touchpoints.',
    approach: 'A leaf-based symbol system, expressive colour blocks, and confident typography create one recognisable family.',
    deliverables: ['Brand positioning', 'Visual identity', 'Packaging direction', 'Launch toolkit'],
    alt: 'Kindred botanical drinks identity concept with cans, labels and graphic symbols',
  },
  {
    id: 'frequency', name: 'Frequency', sector: 'Audio culture', services: ['Campaign concept', 'Art direction', 'Social creative'], image: frequencyImage,
    summary: 'A modular launch campaign concept built to move confidently from city posters to mobile screens.',
    brief: 'Make a new audio platform visually unmistakable across a fast-moving digital and out-of-home launch.',
    approach: 'Kinetic type, waveform textures, and a strict modular grid give every placement a shared pulse.',
    deliverables: ['Campaign platform', 'Art direction', 'Paid social templates', 'Landing page concept'],
    alt: 'Frequency audio campaign concept across a poster, digital panel and mobile screen',
  },
]

export const services = [
  {
    id: 'web-design-development', short: 'Website Design & Development', title: 'Website Design & Development', icon: 'MonitorSmartphone',
    intro: 'High-performing websites that explain your value, feel unmistakably yours, and make action easy.',
    suits: 'Startups, service businesses, and ecommerce teams launching or outgrowing an existing site.',
    problem: 'Your website feels generic, hard to update, slow, or unclear about what visitors should do next.',
    deliverables: ['Discovery and sitemap', 'Responsive interface design', 'React implementation', 'Lead capture integration', 'Technical SEO foundations', 'Performance and accessibility checks'],
    process: 'We align on goals, map the journey, prototype key pages, build a reusable system, then test before launch.',
    goals: ['launch', 'website', 'enquiries', 'sales'],
  },
  {
    id: 'branding-ui-ux', short: 'Branding & UI/UX', title: 'Branding & UI/UX Design', icon: 'Shapes',
    intro: 'A clear identity and digital experience that help the right audience recognise and trust you.',
    suits: 'New brands, growing companies preparing for a next chapter, and digital products needing more clarity.',
    problem: 'Your message, visuals, and product experience do not feel connected or distinctive enough.',
    deliverables: ['Positioning direction', 'Visual identity system', 'Messaging framework', 'UX flows and wireframes', 'Interface design', 'Practical brand guidelines'],
    process: 'We uncover what makes the offer relevant, establish a creative territory, and turn it into a usable system.',
    goals: ['launch', 'website', 'brand'],
  },
  {
    id: 'seo-content', short: 'SEO & Content', title: 'Search Engine Optimisation', icon: 'Search',
    intro: 'Search foundations and useful content that help qualified customers discover your business.',
    suits: 'Businesses with expertise to share and a need for more dependable organic discovery.',
    problem: 'Your pages are difficult to find, target the wrong searches, or do not answer buyer questions clearly.',
    deliverables: ['Search and competitor research', 'Technical SEO review', 'Content architecture', 'On-page optimisation', 'Editorial briefs', 'Measurement plan'],
    process: 'We connect search demand to commercial priorities, fix foundations, publish intentionally, and review signals.',
    goals: ['enquiries', 'sales', 'website'],
  },
  {
    id: 'paid-advertising', short: 'Paid Advertising', title: 'Paid Advertising', icon: 'MousePointerClick',
    intro: 'Focused campaigns that pair the right message and creative with accountable media decisions.',
    suits: 'Brands ready to test demand, accelerate acquisition, or improve an established paid programme.',
    problem: 'Spend is fragmented, creative has gone stale, or campaign learning is not shaping the next move.',
    deliverables: ['Channel and audience plan', 'Campaign structure', 'Creative concepts', 'Landing page direction', 'Tracking specification', 'Optimisation reporting'],
    process: 'We define the test, build the message and creative, launch in controlled phases, then optimise from evidence.',
    goals: ['launch', 'enquiries', 'sales'],
  },
  {
    id: 'social-media', short: 'Social Media Marketing', title: 'Social Media Marketing', icon: 'MessagesSquare',
    intro: 'A practical social system that keeps your brand present, useful, and recognisable.',
    suits: 'Teams that need consistent direction and content without adding a full in-house studio.',
    problem: 'Posting is inconsistent, disconnected from the brand, or difficult to sustain week after week.',
    deliverables: ['Channel strategy', 'Content pillars', 'Monthly calendar', 'Social templates', 'Community guidance', 'Performance review'],
    process: 'We set a sustainable rhythm, create reusable formats, produce priority content, and learn from audience response.',
    goals: ['launch', 'sales', 'brand'],
  },
  {
    id: 'content-creative', short: 'Content & Creative', title: 'Content & Creative Production', icon: 'Clapperboard',
    intro: 'Campaign-ready words and visuals that turn your strategy into a consistent stream of useful assets.',
    suits: 'Marketing teams with a clear plan but limited capacity to make high-quality creative at pace.',
    problem: 'The ideas exist, but production is slow, inconsistent, or not adapted to each channel.',
    deliverables: ['Creative direction', 'Campaign copy', 'Social assets', 'Website content', 'Motion concepts', 'Reusable production templates'],
    process: 'We translate the brief into a creative system, produce channel-ready assets, and refine against feedback.',
    goals: ['launch', 'enquiries', 'sales', 'brand'],
  },
]

export const goals = [
  { id: 'launch', label: 'Launch a business' },
  { id: 'website', label: 'Improve an existing website' },
  { id: 'enquiries', label: 'Generate more enquiries' },
  { id: 'sales', label: 'Grow online sales' },
  { id: 'brand', label: 'Strengthen a brand' },
]

export const faqs = [
  ['What can a typical project include?', 'Scope is shaped around the outcome you need. A website project might include strategy, messaging, UX, interface design, development, SEO foundations, and launch support. Your proposal will separate essentials from optional additions.'],
  ['How long does a project take?', 'Timelines depend on scope, review speed, and technical complexity. After a short discovery conversation, we provide a staged schedule with clear milestones rather than a one-size-fits-all promise.'],
  ['How do pricing and proposals work?', 'We price against an agreed scope, team, and timeline. Your proposal explains the work, deliverables, assumptions, and payment stages so you can make an informed decision.'],
  ['Can you redesign an existing website?', 'Yes. We can audit what is working, retain useful content or technology, and reshape the areas that are limiting clarity, performance, or conversion.'],
  ['Do you offer ongoing marketing support?', 'Yes. Monthly marketing support and ongoing creative partnerships are available where there is a clear roadmap, suitable working rhythm, and shared measurement approach.'],
  ['What content and assets do we need to provide?', 'We begin with what you have: business context, existing brand files, product information, access needs, and internal insight. We identify gaps early and can scope content creation where needed.'],
  ['How does a project begin?', 'Send a short enquiry with your priorities. We review the fit and, when useful, arrange a discovery conversation before preparing a tailored proposal.'],
]
