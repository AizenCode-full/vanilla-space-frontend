const Footer = () => {
  return (
    <footer className="bg-[#F1EADC] py-[45px]">
      <div className="mx-auto flex max-w-[1110px] items-start justify-between">

        {/* Логотип и информация */}
        <div>
          <div className="mb-[30px] text-[13px] tracking-[1px]">
            ♧ WOMAZING
          </div>

          <div className="text-[11px] text-[#333]">
            <p className="mb-2">© Все права защищены</p>
            <p className="mb-2">Политика конфиденциальности</p>
            <p>Публичная оферта</p>
          </div>
        </div>

        {/* Навигация */}
        <nav className="flex items-start gap-[35px] text-[12px]">
          <a href="#" className="text-[#333] no-underline">
            Главная
          </a>

          <a href="#" className="text-[#333] no-underline">
            Магазин
          </a>

          <a href="#" className="text-[#333] no-underline">
            О бренде
          </a>

          <a href="#" className="text-[#333] no-underline">
            Контакты
          </a>

          {/* Категории */}
          <div className="ml-[-180px] mt-[30px] flex flex-col gap-2 text-[11px]">
            <a href="#" className="text-[#333]">
              Пальто
            </a>
            <a href="#" className="text-[#333]">
              Свитеры
            </a>
            <a href="#" className="text-[#333]">
              Кардиганы
            </a>
            <a href="#" className="text-[#333]">
              Толстовки
            </a>
          </div>
        </nav>

        {/* Контакты */}
        <div className="flex flex-col items-end text-[11px]">
          <a href="tel:+996555123412" className="mb-2 text-[#333]">
            +996 (555) 123-412
          </a>

          <a href="mailto:hello@womazing.com" className="mb-2 text-[#333]">
            hello@womazing.com
          </a>

          {/* Соцсети */}
          <div className="mt-2 flex gap-3 text-[15px]">
            <a href="#" className="text-[#222]">
              ◎
            </a>
            <a href="#" className="text-[#222]">
              f
            </a>
            <a href="#" className="text-[#222]">
              p
            </a>
          </div>

          {/* Карты */}
          <div className="mt-[15px] flex gap-1 text-[9px]">
            <span>VISA</span>
            <span>🔴🟡</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;