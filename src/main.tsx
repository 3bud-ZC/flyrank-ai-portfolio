import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { initializeAnalytics } from './analytics'
import './styles.css'
import './week7-mobile.css'
import './crit-fix.css'
import './week8-9.css'

const root = document.getElementById('root')

if (!root) {
  throw new Error('Root element was not found')
}

initializeAnalytics()

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
