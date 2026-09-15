import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './styles/global.css'

const app = <StrictMode><BrowserRouter><App /></BrowserRouter></StrictMode>
const root = document.getElementById('root')
if (root.childElementCount > 0) hydrateRoot(root, app)
else createRoot(root).render(app)
