export const agency = {
  name: 'Vergeform',
  legalName: 'Vergeform',
  description: 'A full-service digital agency for websites, ecommerce, software, mobile apps, branding, AI, marketing, analytics, security, and ongoing growth.',
  tagline: 'Strategy, design, technology, and growth—shaped to move.',
  email: '',
  whatsapp: '',
  location: '',
  bookingUrl: '',
  socialLinks: [],
  siteUrl: (import.meta.env.VITE_SITE_URL || 'https://vergeform.netlify.app').replace(/\/$/, ''),
  logoPath: '/favicon.svg',
  socialImagePath: '/vergeform-og.jpg',
  enquiryEndpoint: import.meta.env.VITE_ENQUIRY_ENDPOINT || '/api/enquiry',
}

export const navItems = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Insights', to: '/blog' },
  { label: 'Contact', to: '/contact' },
]
