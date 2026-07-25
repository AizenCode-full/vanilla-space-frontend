import { useState } from 'react';
import type { JSX } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAuthData, userActions } from '@/entities/user';

interface HeaderProps {
    onOpenAuth?: () => void;
}

interface CartItem {
  id: string;
  name: string;
  priceCurrent: number;
  quantity: number;
}


export function Header({ onOpenAuth }: HeaderProps): JSX.Element {
  const [isCatalogOpen, setIsCatalogOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  const authData = useSelector(getUserAuthData);
  const isAuth = !!authData;
  const isAdmin = false;
  const user = { name: authData?.username || 'Гость' };
  const cartItems: CartItem[] = [];
   
  const handleAuthClick = (e: React.MouseEvent) => {
    e.preventDefault(); 
    if (onOpenAuth) onOpenAuth();
  };
  const handleLogoutClick = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(userActions.logout());
  };
  return (
    <header className="header flex flex-col w-full max-w-[1200px] mx-auto px-4 mt-5 gap-4 font-sans">
      <div className="header__top flex justify-between items-center w-full">
        <div className="header__logo logo flex items-center gap-2.5">
          <img src="/favicon.svg" alt="Vanilla Space Логотип" className="logo__icon w-6 h-6" />
          <span className="logo__text text-lg font-bold tracking-wider text-black uppercase">
            Vanilla Space
          </span>
        </div>

       
        <div className="header__search search flex items-center flex-1 max-w-[450px] mx-8 relative">
          <input 
            type="text" 
            placeholder="Поиск свитшоты, толстовки ..." 
            className="search__input w-full px-4 py-2 text-sm border border-gray-200 rounded-sm focus:outline-none focus:border-[#6E9C9F] transition-colors"
          />
          <button className="search__button absolute right-3 w-4 h-4 flex items-center justify-center">
            <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-gray-400 hover:text-gray-900 transition-colors">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </button>
        </div>

        <div className="header__actions actions flex items-center gap-6">
          <div className="actions__phone phone flex items-center gap-3">
            <div className="phone__icon-wrapper flex justify-center items-center w-[27px] h-[27px] rounded-full hover:bg-[#6E9C9F] text-black hover:text-white transition-all duration-300 cursor-pointer">
              <img src="/icon-call.svg" alt="Звонок" className="phone__icon w-[27px] h-[27px]" />
            </div>
            <a href="tel:+996312595555" className="phone__number text-sm font-medium text-black hover:text-[#6E9C9F] transition-colors">
              +996 (312) 595 555
            </a>
          </div>

          {isAuth ? (
           <div 
              onClick={handleLogoutClick}
              className="actions__auth auth flex items-center gap-1.5 cursor-pointer text-black hover:text-red-500 transition-colors group"
            >
    
              <svg 
                xmlns="http://w3.org" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth="1.5" 
                stroke="currentColor" 
                className="size-8 text-red-500 group-hover:text-red-600 transition-colors" 
              >
              <path 
                 strokeLinecap="round" 
                 strokeLinejoin="round" 
                 d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" 
              />
              </svg>
    
              <span className="auth__link text-sm font-medium">
                  Выйти
              </span>
            </div>
          ) : (
            
             <div className="actions__auth auth flex items-center gap-1.5 cursor-pointer text-black hover:text-[#6E9C9F] transition-colors group">
               <svg 
                 xmlns="http://w3.org" 
                 fill="none" 
                 viewBox="0 0 24 24" 
                 strokeWidth="1.5" 
                 stroke="currentColor" 
                 className="size-8 scale-x-[-1] text-[#6E9C9F]" 
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" 
                />
              </svg>
               <Link 
                 to="/login" 
                 onClick={handleAuthClick} 
                  className="auth__link text-sm font-medium"
                   >
                 Войти
               </Link>
             </div>
          )}

          <Link to="/cart" className="actions__cart cart relative cursor-pointer group">
            <img src="/icon-cart.svg" alt="Корзинка" className="cart__icon w-6 h-6 group-hover:opacity-70 transition-opacity" />
             <span className="cart__badge absolute -top-2 -right-2 bg-[#6E9C9F] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold px-1">
               {cartItems.reduce((total: number, item: CartItem) => total + item.quantity, 0)}
             </span>
          </Link>
        </div>
      </div>

      <div className="header__bottom flex justify-between items-center w-full mt-2">
        <button 
          onClick={() => setIsCatalogOpen(true)}
          className="header__catalog-btn catalog-btn flex items-center gap-2 px-5 py-2.5 bg-[#2D323E] hover:bg-[#3d4454] text-white text-sm font-semibold rounded-sm transition-colors uppercase tracking-wide"
        >
          <span className="catalog-btn__burger text-base">☴</span> Каталог
        </button>
        
        <nav className="header__navigation navigation">
          <ul className="navigation__list flex items-center gap-[45px] list-none">
            <li className="navigation__item">
              <Link to="/" className="navigation__link text-[15px] font-bold text-black hover:text-[#6E9C9F] transition-colors">
                Главная
              </Link>
            </li>
            <li className="navigation__item">
              <Link to="/catalog" className="navigation__link text-[15px] font-bold text-black hover:text-[#6E9C9F] transition-colors">
                Магазин
              </Link>
            </li>
            <li className="navigation__item">
              <Link to="/brand" className="navigation__link text-[15px] font-bold text-black hover:text-[#6E9C9F] transition-colors">
                О бренде
              </Link>
            </li>
            <li className="navigation__item">
              <Link to="/contact" className="navigation__link text-[15px] font-bold text-black hover:text-[#6E9C9F] transition-colors">
                Контакты
              </Link>
            </li>
          </ul>
        </nav>

        <div className="header__dev dev">
          <Link to="/devs" className="dev__link text-xs font-semibold text-gray-400 hover:text-[#6E9C9F] flex items-center gap-1 transition-colors">
            <span>О разработчиках</span>
          </Link>
        </div>
      </div>

      <div 
        className={`fixed inset-0 bg-black/40 z-50 transition-opacity duration-300 ${isCatalogOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsCatalogOpen(false)}
      >
        <div 
          className={`fixed top-0 left-0 w-[350px] h-full bg-white shadow-2xl p-6 transition-transform duration-300 ease-out z-50 ${isCatalogOpen ? 'translate-x-0' : '-translate-x-full'}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-bold text-black uppercase tracking-wider">Категории</h3>
            <button onClick={() => setIsCatalogOpen(false)} className="text-2xl text-gray-400 hover:text-black">&times;</button>
          </div>
          <ul className="flex flex-col gap-5 text-base font-medium text-gray-800">
            <li className="hover:text-[#6E9C9F] cursor-pointer font-bold text-black border-b pb-2">Новая коллекция '26</li>
            <li className="hover:text-[#6E9C9F] cursor-pointer flex justify-between">Верхняя одежда <span>+</span></li>
            <li className="hover:text-[#6E9C9F] cursor-pointer flex justify-between">Платья и Юбки <span>+</span></li>
            <li className="hover:text-[#6E9C9F] cursor-pointer flex justify-between">Базовый трикотаж <span>+</span></li>
            <li className="hover:text-[#6E9C9F] cursor-pointer">Аксессуары</li>
          </ul>
          <div className="absolute bottom-6 left-6 right-6 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-400 mb-2">Нужна консультация стилиста?</p>
            <a href="https://wa.me" target="_blank" rel="noreferrer" className="inline-block w-full text-center py-2 bg-[#25D366] text-white rounded-sm font-semibold text-sm hover:bg-[#20ba56] transition-colors">
              Написать в WhatsApp
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}