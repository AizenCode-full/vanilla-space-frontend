// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import '@/index.css'
// import App from '@/app/App'

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )
import  'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from '@/app/AppRoutes'; 
import "@/app/styles/App.css";

export default function App() {
  return (
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
  );
}
