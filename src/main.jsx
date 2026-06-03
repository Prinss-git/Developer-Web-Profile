import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/globals.css'
import App from './App.jsx'
import NotFound from './pages/NotFound.jsx'

const isNotFound = window.location.pathname !== '/'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {isNotFound ? <NotFound /> : <App />}
  </StrictMode>,
)
