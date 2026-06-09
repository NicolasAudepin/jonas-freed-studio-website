import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import HomePage from './pages/HomePage.tsx'
import { DAProvider } from './components/DAContext.tsx'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DAProvider>
      <HomePage />
    </DAProvider>
  </StrictMode>,
)
