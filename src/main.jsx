import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BioProvider } from './context/BioContext.jsx' // Import the provider

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BioProvider>  {/* Wrap your App inside the Provider */}
      <App />
    </BioProvider>
  </StrictMode>,
)