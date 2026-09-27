// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import '@/index.css'
// import App from '@/app/App'

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app/App' // Относительный путь железно сработает

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
