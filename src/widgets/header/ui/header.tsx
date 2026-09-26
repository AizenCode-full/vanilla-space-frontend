import { useState } from 'react';
import type { JSX } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface CartItem {
  id: string;
  name: string;
  priceCurrent: number;
  quantity: number;
}

export function Header(): JSX.Element {
  const [isCatalogOpen, setIsCatalogOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  
  const isAuth = false; 
  const isAdmin = false;
  const user = { name: 'Гость' };
  const cartItems: CartItem[] = []; 

  return (
    <header className="w-full relative z-50 font-sans select-none border-b border-gray-100">
    
      <div className="absolute inset-0 grid grid-cols-1 lg:grid-cols-12 -z-10 pointer-events-none">
        <div className="lg:col-span-6 bg-white" />
        <div className="lg:col-span-6 bg-[#F1EADC]" />
      </div>
      
      <div className="w-full xl:max-w-[1110px] mx-auto px-4 flex flex-col gap-4 py-4">
        <div className="flex justify-between items-center w-full gap-4">
          <div onClick={() => navigate('/')} className="flex items-center gap-2.5 cursor-pointer min-w-max">
            <img src="/favicon.svg" alt="Vanilla Space Логотип" className="w-6 h-6" />
            <span className="text-base sm:text-lg font-bold tracking-wider text-black uppercase">
              Vanilla Space
            </span>
          </div>
          <div className="hidden md:flex items-center flex-1 max-w-[380px] lg:max-w-[450px] mx-4 lg:mx-8 relative">
            <input 
              type="text" 
              placeholder="Поиск свитшоты, толстовки ..." 
              className="w-full px-4 py-1.5 text-sm border border-gray-200 bg-white rounded-xs focus:outline-none focus:border-[#6E9C9F] transition-colors"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-900 transition-colors">
              <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </button>
          </div>
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="hidden sm:flex items-center gap-2">
              <div className="flex justify-center items-center w-7 h-7 rounded-full bg-transparent hover:bg-[#6E9C9F] text-black hover:text-white transition-all duration-300 cursor-pointer p-1">
                <img src="/icon-call.svg" alt="Звонок" className="w-full h-full" />
              </div>
              <a href="tel:+996312595555" className="text-xs lg:text-sm font-medium text-black hover:text-[#6E9C9F] transition-colors whitespace-nowrap">
                +996 (312) 595 555
              </a>
            </div>

            {isAuth ? (
              <div className="flex items-center gap-3">
                {isAdmin && (
                  <Link to="/admin/add-product" className="hidden lg:block text-[10px] bg-[#6e9c9f]/20 text-[#6e9c9f] px-2.5 py-1 rounded-xs font-bold hover:bg-[#6e9c9f]/30 transition-colors uppercase tracking-wider">
                    + Товар
                  </Link>
                )}
                <span className="text-xs sm:text-sm font-semibold text-gray-700 max-w-[80px] truncate">{user?.name}</span>
                <button className="text-xs text-red-400 hover:text-red-600 transition-colors">Выйти</button>
              </div>
            ) : (
              <Link to="/login" className="flex items-center gap-1 text-black hover:text-[#6E9C9F] transition-colors group">
                <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-[#6E9C9F] scale-x-[-1]">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                </svg>
                <span className="text-xs sm:text-sm font-medium hidden sm:inline">Войти</span>
              </Link>
            )}

            <Link to="/cart" className="relative p-1 group">
              <img src="/icon-cart.svg" alt="Корзинка" className="w-6 h-6 group-hover:opacity-70 transition-opacity" />
              <span className="absolute -top-1.5 -right-1.5 bg-[#6E9C9F] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {cartItems.reduce((total: number, item: CartItem) => total + item.quantity, 0)}
              </span>
            </Link>

            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden text-black focus:outline-none p-1 text-2xl">
              {isMobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
        <div className="hidden lg:flex justify-between items-center w-full mt-1 pt-2 border-t border-gray-200/20">
          <button 
            onClick={() => setIsCatalogOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#2D323E] hover:bg-[#3d4454] text-white text-xs font-semibold rounded-xs transition-colors uppercase tracking-wide"
          >
            <span>☴</span> Каталог
          </button>
          
          <nav>
            <ul className="flex items-center gap-10 xl:gap-[45px] m-0 p-0 list-none">
              <li><Link to="/" className="text-[15px] font-bold text-black hover:text-[#6E9C9F] transition-colors no-underline">Главная</Link></li>
              <li><Link to="/catalog" className="text-[15px] font-bold text-black hover:text-[#6E9C9F] transition-colors no-underline">Магазин</Link></li>
              <li><Link to="/brand" className="text-[15px] font-bold text-black hover:text-[#6E9C9F] transition-colors no-underline">О бренде</Link></li>
              <li><Link to="/contact" className="text-[15px] font-bold text-black hover:text-[#6E9C9F] transition-colors no-underline">Контакты</Link></li>
            </ul>
          </nav>

          <div>
            <Link to="/devs" className="text-xs font-semibold text-gray-400 hover:text-[#6E9C9F] transition-colors no-underline">
              О разработчиках
            </Link>
          </div>
        </div>
        {isMobileMenuOpen && (
          <div className="lg:hidden w-full bg-white rounded-xs p-4 flex flex-col gap-4 shadow-md border border-gray-100 z-50">
            <button onClick={() => { setIsMobileMenuOpen(false); setIsCatalogOpen(true); }} className="w-full py-2.5 bg-[#2D323E] text-white text-xs font-semibold rounded-xs uppercase text-center">
              ☴ Открыть Каталог категорий
            </button>
            <nav className="w-full">
              <ul className="flex flex-col gap-3 m-0 p-0 list-none text-center">
                <li><Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="block py-1.5 text-sm font-bold text-black hover:text-[#6E9C9F] no-underline">Главная</Link></li>
                <li><Link to="/catalog" onClick={() => setIsMobileMenuOpen(false)} className="block py-1.5 text-sm font-bold text-black hover:text-[#6E9C9F] no-underline">Магазин</Link></li>
                <li><Link to="/brand" onClick={() => setIsMobileMenuOpen(false)} className="block py-1.5 text-sm font-bold text-black hover:text-[#6E9C9F] no-underline">О бренде</Link></li>
                <li><Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="block py-1.5 text-sm font-bold text-black hover:text-[#6E9C9F] no-underline">Контакты</Link></li>
              </ul>
            </nav>
          </div>
        )}

      </div>
      <div 
        className={`fixed inset-0 bg-black/40 z-50 transition-opacity duration-300 ${isCatalogOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} 
        onClick={() => setIsCatalogOpen(false)}
      >
        <div 
          className={`fixed top-0 left-0 w-[290px] sm:w-[350px] h-full bg-white shadow-2xl p-6 transition-transform duration-300 ease-out z-50 ${isCatalogOpen ? 'translate-x-0' : '-translate-x-full'}`} 
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-base sm:text-lg font-bold text-black uppercase tracking-wider">Категории</h3>
            <button onClick={() => setIsCatalogOpen(false)} className="text-2xl text-gray-400 hover:text-black">&times;</button>
          </div>
          
          <ul className="flex flex-col gap-5 text-sm sm:text-base font-medium text-gray-800 list-none p-0 m-0">
            <li onClick={() => { setIsCatalogOpen(false); navigate('/catalog'); }} className="hover:text-[#6E9C9F] cursor-pointer font-bold text-black border-b pb-2">Новая collection '26</li>
            <li onClick={() => { setIsCatalogOpen(false); navigate('/catalog'); }} className="hover:text-[#6E9C9F] cursor-pointer flex justify-between">Верхняя одежда <span>+</span></li>
            <li onClick={() => { setIsCatalogOpen(false); navigate('/catalog'); }} className="hover:text-[#6E9C9F] cursor-pointer flex justify-between">Платья и Юбки <span>+</span></li>
            <li onClick={() => { setIsCatalogOpen(false); navigate('/catalog'); }} className="hover:text-[#6E9C9F] cursor-pointer flex justify-between">Базовый трикотаж <span>+</span></li>
            <li onClick={() => { setIsCatalogOpen(false); navigate('/catalog'); }} className="hover:text-[#6E9C9F] cursor-pointer">Аксессуары</li>
          </ul>
          <div className="absolute bottom-6 left-6 right-6 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-400 mb-2">Нужна консультация стилиста?</p>
            <a 
              href="https://wa.me" 
              target="_blank" 
              rel="noreferrer" 
              className="inline-block w-full text-center py-2 bg-[#25D366] text-white rounded-xs font-semibold text-sm hover:bg-[#20ba56] transition-colors no-underline"
            >
              Написать в WhatsApp
            </a>
          </div>
        </div>
      </div>

    </header>
  );
}
