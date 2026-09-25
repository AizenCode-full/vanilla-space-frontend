import { useState } from 'react';
import type { JSX } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Header } from '@/widgets/header';
import { Home } from '@/pages/home/ui/home';
import Brand from '@/pages/Brand/ui/Brand';
import Contact from '@/pages/Contact/ui/Contact';
import { AuthModal } from '@/widgets/authModal';
import { ProtectedRoute } from './ProtectedRoute';
import { MainPage } from '@/pages/mainPage';
import { getUserAuthData } from '@/entities/user'; 



export default function AppRoutes(): JSX.Element {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const isAuth = useSelector(getUserAuthData); 

  return (
    <>
      <Header onOpenAuth={() => setIsAuthOpen(true)} />
      
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Routes>
          <Route 
            path="/" 
            element={
              isAuth ? <Navigate to="/home" replace /> : <MainPage />
            } 
          />
          <Route 
            path="/home" 
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } 
          />
          <Route path="/Home.html" element={<Navigate to="/home" replace />} />
          <Route path="/catalog" element={<div className="py-10 text-center text-xl">Каталог </div>} /> 
          <Route path="/login" element={<div className="py-10 text-center text-xl">Страница входа </div>} />
          <Route path="/devs" element={<div className="py-10 text-center text-xl font-bold">Раздел команды разработчиков Vanilla Space</div>} />
          <Route path="/brand" element={<Brand />} />
          <Route path="/contact" element={<Contact />} />

          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <div className="py-10 text-center text-xl font-bold">Личный кабинет</div>
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<div className="py-10 text-center text-xl">Страница не найдена</div>} />
        </Routes>
      </main>

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
}
