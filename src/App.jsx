import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/modules/Layout'
import { AboutPage } from './pages/AboutPage'
import { ContactPage } from './pages/ContactPage'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { ServicesPage } from './pages/ServicesPage'

export default function App() {
  return <Routes><Route element={<Layout />}><Route index element={<HomePage />} /><Route path="about" element={<AboutPage />} /><Route path="services" element={<ServicesPage />} /><Route path="contact" element={<ContactPage />} /><Route path="*" element={<NotFoundPage />} /></Route></Routes>
}
