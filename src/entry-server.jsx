import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import App from './App'
import './styles/global.css'

export function render(url) { return renderToString(<StaticRouter location={url}><App /></StaticRouter>) }
