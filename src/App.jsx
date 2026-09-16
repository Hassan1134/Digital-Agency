import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/modules/Layout'
import { AboutPage } from './pages/AboutPage'
import { ContactPage } from './pages/ContactPage'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { ServicesPage } from './pages/ServicesPage'
import { BlogPage } from './pages/BlogPage'
import { BlogPostPage } from './pages/BlogPostPage'
import { ServicePage } from './pages/ServicePage'
import { ProcessPage } from './pages/ProcessPage'
import { IndustriesPage } from './pages/IndustriesPage'
import { IndustryPage } from './pages/IndustryPage'
import { ResourcesPage } from './pages/ResourcesPage'
import { LegalPage } from './pages/LegalPage'

export default function App() {
  return <Routes><Route element={<Layout />}><Route index element={<HomePage />} /><Route path="about" element={<AboutPage />} /><Route path="services" element={<ServicesPage />} /><Route path="services/:serviceId" element={<ServicePage />} /><Route path="industries" element={<IndustriesPage />} /><Route path="industries/:industryId" element={<IndustryPage />} /><Route path="process" element={<ProcessPage />} /><Route path="resources" element={<ResourcesPage />} /><Route path="privacy" element={<LegalPage policyId="privacy" />} /><Route path="cookies" element={<LegalPage policyId="cookies" />} /><Route path="accessibility" element={<LegalPage policyId="accessibility" />} /><Route path="terms" element={<LegalPage policyId="terms" />} /><Route path="blog" element={<BlogPage />} /><Route path="blog/:slug" element={<BlogPostPage />} /><Route path="contact" element={<ContactPage />} /><Route path="*" element={<NotFoundPage />} /></Route></Routes>
}
