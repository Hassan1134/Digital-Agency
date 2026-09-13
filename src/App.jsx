import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/modules/Layout'
import { AboutPage } from './pages/AboutPage'
import { ContactPage } from './pages/ContactPage'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { ServicesPage } from './pages/ServicesPage'
import { BlogPage } from './pages/BlogPage'
import { BlogPostPage } from './pages/BlogPostPage'

export default function App() {
  return <Routes><Route element={<Layout />}><Route index element={<HomePage />} /><Route path="about" element={<AboutPage />} /><Route path="services" element={<ServicesPage />} /><Route path="blog" element={<BlogPage />} /><Route path="blog/:slug" element={<BlogPostPage />} /><Route path="contact" element={<ContactPage />} /><Route path="*" element={<NotFoundPage />} /></Route></Routes>
}
