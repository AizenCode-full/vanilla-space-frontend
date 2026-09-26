import  'react';
import type { JSX } from 'react';
import { Link } from 'react-router-dom';

export function Footer(): JSX.Element {
  return (
    <footer className="bg-[#F1EADC] py-12 border-t border-gray-200/30 font-sans select-none w-full">
      <div className="w-full xl:max-w-[1110px] mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 items-start text-center md:text-left">
        <div className="flex flex-col items-center md:items-start">
          <Link to="/" className="flex items-center gap-2 mb-6 no-underline group">
            <img src="/favicon.svg" alt="Vanilla Space" className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            <span className="text-sm font-bold tracking-widest text-black uppercase">
              Vanilla Space
            </span>
          </Link>

          <div className="text-xs text-gray-600 flex flex-col gap-2 leading-relaxed">
            <p className="m-0">© Все права защищены</p>
            <p className="hover:text-[#6E9C9F] cursor-pointer transition-colors m-0">Политика конфиденциальности</p>
            <p className="hover:text-[#6E9C9F] cursor-pointer transition-colors m-0">Публичная оферта</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 w-full max-w-xs mx-auto md:mx-0">
          <nav className="flex flex-col gap-3 text-xs font-semibold text-black">
            <Link to="/" className="hover:text-[#6E9C9F] transition-colors no-underline">Главная</Link>
            <Link to="/catalog" className="hover:text-[#6E9C9F] transition-colors no-underline">Магазин</Link>
            <Link to="/brand" className="hover:text-[#6E9C9F] transition-colors no-underline">О бренде</Link>
            <Link to="/contact" className="hover:text-[#6E9C9F] transition-colors no-underline">Контакты</Link>
          </nav>
          <div className="flex flex-col gap-3 text-xs text-gray-600">
            <Link to="/catalog" className="hover:text-[#6E9C9F] transition-colors no-underline">Пальто</Link>
            <Link to="/catalog" className="hover:text-[#6E9C9F] transition-colors no-underline">Свитеры</Link>
            <Link to="/catalog" className="hover:text-[#6E9C9F] transition-colors no-underline">Кардиганы</Link>
            <Link to="/catalog" className="hover:text-[#6E9C9F] transition-colors no-underline">Толстовки</Link>
          </div>
        </div>
        <div className="flex flex-col items-center md:items-end text-xs w-full gap-3">
          <a 
            href="tel:+996555123412" 
            className="font-medium text-black hover:text-[#6E9C9F] transition-colors no-underline"
          >
            +996 (555) 123-412
          </a>
          <a 
            href="mailto:hello@vanillaspace.com" 
            className="text-gray-600 hover:text-[#6E9C9F] transition-colors no-underline"
          >
            hello@vanillaspace.com
          </a>
          <div className="mt-2 flex gap-4 text-base">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-black hover:text-[#6E9C9F] transition-colors no-underline">
              ◎
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-black hover:text-[#6E9C9F] transition-colors no-underline">
              f
            </a>
            <a href="https://pinterest.com" target="_blank" rel="noreferrer" className="text-black hover:text-[#6E9C9F] transition-colors no-underline">
              p
            </a>
          </div>
          <div className="mt-4 flex items-center gap-2 text-[10px] text-gray-400 tracking-wider">
            <span className="border border-gray-300/40 px-1 py-0.5 rounded-xs bg-white/50">VISA</span>
            <span className="border border-gray-300/40 px-1 py-0.5 rounded-xs bg-white/50">MASTERCARD</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
