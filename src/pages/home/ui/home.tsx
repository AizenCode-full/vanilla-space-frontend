import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

interface Product {
  id: string;
  name: string;
  priceCurrent: number;
  priceOld: number | null;
  image: string;
  category?: string;
}

export function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/db.json')
      .then((response) => response.json())
      .then((data) => {
  
        const targetProducts = data.product || data.clothing || data.products;
        if (targetProducts && Array.isArray(targetProducts)) {
          setProducts(targetProducts);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Ошибка загрузки продуктов:', error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center font-sans text-lg text-gray-500">
        Загрузка вселенной Vanilla Space...
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-white font-sans select-none overflow-x-hidden">
      <main className="relative bg-gradient-to-r from-white from-50% to-[#F1EADC] to-50% pt-8 pb-16 lg:pt-12 lg:pb-24 overflow-visible">
        <div className="w-full xl:max-w-[1110px] mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative">
          <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left z-10 mt-4 lg:mt-0">
            <h1 className="text-4xl sm:text-5xl lg:text-[55px] font-medium leading-[1.1] text-black mb-6">
              {/* Новые поступления<br />в этом сезоне */}
              Проект находится в процессе разработки 
            </h1>
            <p className="max-w-md text-base sm:text-lg lg:text-[20px] font-normal leading-[1.4] text-gray-600 mb-10">
              Утонченные сочетания и бархатные оттенки — вот то, что вы искали в этом сезоне. Время исследовать.
            </p>
            <div className="flex items-center gap-3">
              <button className="w-14 h-14 bg-[#6E9C9F]/10 flex items-center justify-center transition-colors duration-200 hover:bg-[#6E9C9F]/20 rounded-xs">
                <img src="/icon-arrow-down.svg" alt="Вниз" className="w-5 h-5 animate-bounce" />
              </button>
              <button 
                onClick={() => navigate('/catalog')}
                className="w-52 sm:w-60 h-14 bg-[#6E9C9F] text-white text-base sm:text-[17px] font-medium tracking-wide flex items-center justify-center transition-colors duration-200 hover:bg-[#578487] shadow-xs rounded-xs"
              >
                Открыть магазин
              </button>
            </div>
          </div>
          <div className="lg:col-span-6 relative w-full h-[450px] sm:h-[550px] lg:h-[640px] flex items-center justify-center z-10">
            <div className="absolute left-[8%] sm:left-[12%] top-6 w-[68%] sm:w-[62%] h-[84%] z-10 overflow-hidden shadow-xs bg-gray-50 rounded-xs">
              <img 
                src="/hero-first.png" 
                alt="Главная модель" 
                className="w-full h-full object-cover transform hover:scale-102 transition-transform duration-500" 
              />
            </div>
            <div className="absolute right-[-1vw] sm:right-2 top-[16%] w-[38%] aspect-square z-20 overflow-hidden shadow-sm bg-gray-50 rounded-xs hidden sm:block">
              <img src="/hero-second.png" alt="Стильный элемент" className="w-full h-full object-cover" />
            </div>
            <div className="absolute left-[-2vw] sm:left-2 bottom-2 w-[34%] h-[40%] z-20 overflow-hidden shadow-sm bg-gray-50 rounded-xs hidden sm:block">
              <img src="/hero-third.png" alt="Нижний акцент" className="w-full h-full object-cover" />
            </div>
          </div>

        </div>
      </main>
      <section className="py-16 sm:py-20 bg-white border-t border-gray-50">
        <div className="w-full xl:max-w-[1110px] mx-auto px-4 flex flex-col">
          <h2 className="text-3xl sm:text-[40px] font-medium text-black mb-12 text-center lg:text-left">
            Новая коллекция
          </h2>
          
          <div className="w-full mb-12">
            <Swiper
              modules={[Pagination]}
              pagination={{ clickable: true }}
              spaceBetween={30}
              breakpoints={{
                320: { slidesPerView: 1 },
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 }
              }}
              className="w-full pb-12"
            >
              {products.slice(0, 3).map((product) => (
                <SwiperSlide key={product.id}>
                  <div 
                    onClick={() => navigate(`/product/${product.id}`)} 
                    className="flex flex-col items-center no-underline text-black group cursor-pointer animate-fade-in"
                  >
                    <div className="w-full aspect-[3/4] max-w-[350px] relative overflow-hidden mb-6 bg-gray-50 rounded-xs shadow-xs">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300" 
                      />
                      <div className="absolute top-0 left-0 w-full h-full bg-[#6E9C9F]/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <img src="/icon-arrow-right-white.svg" alt="Подробнее" className="w-8 h-8" />
                      </div>
                    </div>
                    <h3 className="text-xl font-medium mb-2 text-center group-hover:text-[#6E9C9F] transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex gap-3 items-center">
                      {product.priceOld && (
                        <span className="text-sm line-through text-gray-400">
                          \${product.priceOld}
                        </span>
                      )}
                      <span className="text-sm font-medium text-[#6E9C9F]">
                        \${product.priceCurrent || (product as any).price} \$
                      </span>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          
          <button 
            onClick={() => navigate('/catalog')}
            className="w-60 h-14 border border-[#6E9C9F] bg-transparent text-[#6E9C9F] text-base font-medium flex items-center justify-center self-center transition-all duration-300 hover:bg-[#6E9C9F] hover:text-white rounded-xs"
          >
            Открыть магазин
          </button>
        </div>
      </section>
      <section className="py-16 sm:py-20 bg-white border-t border-gray-50">
        <div className="w-full xl:max-w-[1110px] mx-auto px-4">
          <h2 className="text-3xl sm:text-[40px] font-medium text-black mb-16 text-center lg:text-left">
            Что для нас важно
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-8">
            
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <div className="w-16 h-16 mb-6 flex items-center justify-center bg-gray-50 p-3 rounded-xs">
                <img src="/icon-badge.svg" alt="Качество" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-lg font-semibold text-black mb-4">Качество</h3>
              <p className="text-sm sm:text-base font-normal text-gray-600 leading-relaxed max-w-sm">
                Наши профессионалы работают на лучшем оборудовании для пошива одежды беспрецедентного качества.
              </p>
            </div>

            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <div className="w-16 h-16 mb-6 flex items-center justify-center bg-gray-50 p-3 rounded-xs">
                <img src="/icon-gear.svg" alt="Скорость" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-lg font-semibold text-black mb-4">Скорость</h3>
              <p className="text-sm sm:text-base font-normal text-gray-600 leading-relaxed max-w-sm">
                Благодаря отлаженной системе мы можем отшивать до 20-ти единиц продукции в наших собственных цехах.
              </p>
            </div>
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left md:col-span-2 lg:col-span-1 md:max-w-md md:mx-auto lg:w-full">
              <div className="w-16 h-16 mb-6 flex items-center justify-center bg-gray-50 p-3 rounded-xs">
                <img src="/icon-hand.svg" alt="Ответственность" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-lg font-semibold text-black mb-4">Ответственность</h3>
              <p className="text-sm sm:text-base font-normal text-gray-600 leading-relaxed max-w-sm">
                Мы заботимся о людях и планете. Безотходное производство и комфортные условия труда — всё это про нас.
              </p>
            </div>

          </div>
        </div>
      </section>
      <section className="py-16 sm:py-24 lg:py-30 bg-white border-t border-gray-50">
        <div className="w-full xl:max-w-[1110px] mx-auto px-4 flex flex-col">
          <h2 className="text-3xl sm:text-[40px] font-medium text-black mb-12 sm:mb-16 text-center lg:text-left">
            Команда мечты Womazing
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full">
            <div className="lg:col-span-7 w-full aspect-[4/3] max-h-[480px] relative rounded-xs overflow-hidden shadow-xs">
              <Swiper
                modules={[Pagination]}
                pagination={{
                  clickable: true,
                  bulletClass: 'inline-block w-[30px] h-[4px] bg-white/40 cursor-pointer transition-colors duration-300 mx-[4px]',
                  bulletActiveClass: '!bg-white',
                }}
                className="w-full h-full"
              >
                <SwiperSlide>
                  <img src="/team-slide-1.webp" alt="Команда Womazing" className="w-full h-full object-cover block" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src="/team-slide-2.webp" alt="Команда Womazing 2" className="w-full h-full object-cover block brightness-90" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src="/team-slide-3.jpg" alt="Команда Womazing 3" className="w-full h-full object-cover block brightness-75" />
                </SwiperSlide>
              </Swiper>
            </div>
            <div className="hidden xl:flex lg:col-span-1 items-center justify-center px-2">
              <img src="/icon-arrow-right-black.svg" alt="Разделитель" className="w-6 h-6 animate-pulse" />
            </div>
            <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left max-w-md mx-auto lg:w-full">
              <h3 className="text-2xl sm:text-[25px] font-medium leading-[1.3] text-black mb-6">
                Для каждой
              </h3>
              <div className="flex flex-col gap-4 mb-6 text-sm sm:text-[17px] font-normal text-gray-700 leading-relaxed">
                <p className="m-0">
                  Каждая девушка уникальна. Однако, мы схожи в миллионе мелочей.
                </p>
                <p className="m-0">
                  Womazing ищет эти мелочи и создает прекрасные вещи, которые выгодно подчеркивают достоинства каждой девушки.
                </p>
              </div>
              <span 
                onClick={() => navigate('/brand')}
                className="text-base sm:text-[17px] font-medium text-[#6E9C9F] cursor-pointer no-underline border-b border-transparent transition-all duration-300 hover:border-[#6E9C9F]"
              >
                Подробнее о бренде
              </span>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
