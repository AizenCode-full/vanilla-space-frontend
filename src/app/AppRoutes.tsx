import type { JSX } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from '@/widgets/header' 
import {Home} from '@/pages/home/ui/home';
import Brand from '@/pages/Brand/ui/Brand';
import Contact from '@/pages/Contact/ui/Contact';
import Catalog from'@/pages/Catalog/ui/catalog';
import Product from '@/pages/Product/ui/product'


export default function AppRoutes(): JSX.Element {
  return (
    <>
    <Header/>
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home.html" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} /> 
          <Route path="/product/:id" element={<Product />} />
          <Route path="/login" element={<div className="py-10 text-center text-xl">Страница входа </div>} />
          <Route path="/devs" element={<div className="py-10 text-center text-xl font-bold"> Раздел команды разработчиков Vanilla Space</div>} />
          <Route path="/brand" element={<Brand/>} />
           <Route path="/contact" element={<Contact/>} />
        </Routes>
      </main>
    </>
  );
}