import  'react';
import type { JSX } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from '@/widgets/header'; 
import { Footer } from '@/widgets/footer/ui/footer'; 
import { Home } from '@/pages/home/ui/home';
import {Brand } from '@/pages/Brand/ui/Brand';
import  Contact  from '@/pages/Contact/ui/Contact';
import { Catalog } from '@/pages/Catalog/ui/catalog'; 



export default function AppRoutes(): JSX.Element {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-grow w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home.html" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} /> 
          <Route path="/shop" element={<Catalog />} /> 
    
          <Route path="/login" element={<div className="py-20 text-center text-xl font-medium">Страница входа</div>} />
          <Route path="/devs" element={
            <div className="max-w-[1110px] mx-auto px-4 py-20 text-center text-xl font-bold text-gray-800">
              Раздел команды разработчиков Vanilla Space 
            </div>
          } />
          <Route path="/brand" element={<Brand />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<div className="py-20 text-center text-xl text-gray-500">404 — Страница не найдена</div>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

