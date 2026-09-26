import  'react';
import type { JSX } from 'react';
import { useNavigate } from 'react-router-dom';

export function Brand(): JSX.Element {
  const navigate = useNavigate();

  return (
    <div className="w-full xl:max-w-[1110px] mx-auto px-4 py-10 font-sans select-none overflow-x-hidden animate-fade-in"> 
      <div className="bg-white mb-10 sm:mb-16 mt-12 lg:mt-20">
        <h1 className="text-3xl sm:text-5xl font-medium text-black mb-4">О бренде</h1>
        <p className="text-sm sm:text-[17px] font-normal text-[#909090]"> 
          <span onClick={() => navigate('/')} className="hover:text-[#6E9C9F] cursor-pointer transition-colors">Главная</span>
          <span className="mx-2 text-gray-300">—</span>О бренде
        </p>
      </div>
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-[50px] mt-12 lg:mt-[130px]">
        <div className="w-full max-w-[442px] aspect-[442/547] overflow-hidden bg-gray-50 rounded-xs shadow-xs">
          <img className="w-full h-full object-cover" src="/brend1.png" alt="История бренда" />
        </div>
        <div className="w-full lg:w-[545px] flex flex-col gap-6 text-center lg:text-left">
          <h2 className="text-2xl sm:text-[25px] font-medium text-black tracking-wide">Идея и женщина</h2>
          <p className="text-sm sm:text-[17px] font-normal text-gray-700 leading-relaxed m-0">
            Vanilla Space была основана в 2010-ом и стала одной из самых успешных компаний нашей страны. Как и многие итальянские фирмы, наш бренд остаётся семейной компанией, хотя ни один из членов семьи не является модельером.
          </p>
          <p className="text-sm sm:text-[17px] font-normal text-gray-700 leading-relaxed m-0">
            Мы действуем по успешной формуле, прибегая к услугам известных модельеров для создания своих коллекций. Этот метод был описан критиком моды Колином Макдауэллом как форма дизайнерского со-творчества, характерная для ряда итальянских prêt-a-porter компаний.
          </p>
        </div>
      </div>
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-8 lg:gap-[80px] mt-20 lg:mt-[130px]">
        <div className="w-full lg:w-[545px] flex flex-col gap-6 text-center lg:text-left">
          <h2 className="text-2xl sm:text-[25px] font-medium text-black tracking-wide">Магия в деталях</h2>
          <p className="text-sm sm:text-[17px] font-normal text-gray-700 leading-relaxed m-0">
            Первый магазин Vanilla Space был открыт в маленьком городке на севере страны in 2010-ом году. Первая коллекция состояла из двух пальто и костюма, которые были копиями парижских моделей.
          </p>
          <p className="text-sm sm:text-[17px] font-normal text-gray-700 leading-relaxed m-0">
            Несмотря на то, что по образованию основательница была адвокатом, ее семья всегда была тесно связана с шитьём (прабабушка основательницы шила одежду для женщин, а мать основала профессиональную школу кроя и шитья). Стремление производить одежду для масс несло в себе большие перспективы, особенно в то время, когда высокая мода по-прежнему доминировала, а рынка качественного prêt-a-porter попросту не существовало.
          </p>
        </div>
        <div className="w-full max-w-[442px] aspect-[442/547] overflow-hidden bg-gray-50 rounded-xs shadow-xs">
          <img className="w-full h-full object-cover" src="/brend2.png" alt="Детали производства" />
        </div>
      </div>
      <div className="flex justify-center mt-16 lg:mt-[100px]">
        <button 
          onClick={() => navigate('/catalog')}
          className="w-[260px] h-[68px] bg-[#6E9C9F] text-white text-[17px] font-medium tracking-wide text-center transition-colors duration-300 hover:bg-[#52777a] rounded-xs shadow-xs"
        >
          Перейти в магазин
        </button>
      </div>

    </div>
  );
}
