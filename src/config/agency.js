export const agency = {
  name: 'Vergeform',
  legalName: 'Vergeform',
  description: 'A full-service digital agency for websites, ecommerce, software, mobile apps, branding, AI, marketing, analytics, security, and ongoing growth.',
  tagline: 'Strategy, design, technology, and growth—shaped to move.',
  email: import.meta.env.VITE_PUBLIC_EMAIL || '',
  whatsapp: import.meta.env.VITE_PUBLIC_WHATSAPP || '',
  location: import.meta.env.VITE_PUBLIC_LOCATION || '',
  bookingUrl: import.meta.env.VITE_BOOKING_URL || '',
  socialLinks: [
    import.meta.env.VITE_LINKEDIN_URL && { label: 'LinkedIn', url: import.meta.env.VITE_LINKEDIN_URL },
    import.meta.env.VITE_INSTAGRAM_URL && { label: 'Instagram', url: import.meta.env.VITE_INSTAGRAM_URL },
  ].filter(Boolean),
  team: [],
  testimonials: [],
  clientLogos: [],
  credentials: [],
  analyticsMeasurementId: import.meta.env.VITE_GA_MEASUREMENT_ID || '',
  searchVerification: import.meta.env.VITE_GOOGLE_SITE_VERIFICATION || '',
  siteUrl: (import.meta.env.VITE_SITE_URL || 'https://vergeform.netlify.app').replace(/\/$/, ''),
  logoPath: '/favicon.svg',
  socialImagePath: '/vergeform-og.jpg',
  enquiryEndpoint: import.meta.env.VITE_ENQUIRY_ENDPOINT || '/api/enquiry',
}

export const navItems = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Industries', to: '/industries' },
  { label: 'Process', to: '/process' },
  { label: 'Insights', to: '/blog' },
  { label: 'Contact', to: '/contact' },
]
