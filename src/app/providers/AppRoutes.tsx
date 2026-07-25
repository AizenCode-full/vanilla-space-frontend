import type { JSX } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from '@/widgets/header' 
import {Home} from '@/pages/home/ui/home';


export default function AppRoutes(): JSX.Element {
  return (
    <>
    <Header/>
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home.html" element={<Home />} />
          <Route path="/catalog" element={<div className="py-10 text-center text-xl">Каталог </div>} /> 
          <Route path="/login" element={<div className="py-10 text-center text-xl">Страница входа </div>} />
          <Route path="/devs" element={<div className="py-10 text-center text-xl font-bold"> Раздел команды разработчиков Vanilla Space</div>} />
          <Route path="/contacts" element={<div className="py-10 text-center text-xl font-bold"> Контакты шоурума</div>} />
          <Route path="*" element={<div className="flex h-[50vh] items-center justify-center text-xl font-medium">404 — Страница не найдена</div>} />
        </Routes>
      </main>
    </>
  );
}