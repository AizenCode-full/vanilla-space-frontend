import React, { useState } from "react";

const Contact: React.FC = () => {
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccess(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-14">
      {/* Header */}
      <h1 className="text-5xl font-light mb-3">Контакты</h1>

      <div className="text-gray-500 text-sm mb-12">
        Главная <span className="mx-2">—</span> Контакты
      </div>

      {/* Map */}
      <div>
       <iframe 
        src="https://yandex.com/map-widget/v1/?ll=75.143414%2C42.842397&mode=search&oid=9508028285&ol=biz&sctx=ZAAAAAgBEAAaKAoSCXU90XXhgz5AEbxXrUz4N0lAEhIJDJQUWABT9j8RdNL7xtce4T8iBgABAgMEBSgKOABAwKABSAFqAnVhnQHNzMw9oAEAqAEAvQFeIidMwgFMjrHsxpIDpKri6qcC6feOk%2FcEqLzvw9AF%2BuyA7FXkx%2Bb1mwT9%2FuO1I7XenejaBZi9ks79Bu7zq7DJA5SF2%2BDfAYb2m%2FH0AuHdnpfjBYICKNC80LDQs9Cw0LfQuNC9INC%2B0LTQtdC20LTRiyDQsdC40YjQutC10LqKAgCSAgUxMDMwOZoCDGRlc2t0b3AtbWFwcw%3D%3D&sll=75.143414%2C42.842397&sspn=1.735840%2C1.232908&text=%D0%BC%D0%B0%D0%B3%D0%B0%D0%B7%D0%B8%D0%BD%20%D0%BE%D0%B4%D0%B5%D0%B6%D0%B4%D1%8B%20%D0%B1%D0%B8%D1%88%D0%BA%D0%B5%D0%BA&z=9" 
        width="100%" 
        height="400" 
        frameBorder={1} 
        allowFullScreen={true} 
        loading="lazy" 
        style={{ position: 'relative' }}
        title="Бутик Max Mara на карте Бишкека"
      />
      
    </div>

      {/* Contacts */}
      <div className="grid md:grid-cols-3 gap-10 mb-20">
        <div>
          <h3 className="text-sm text-gray-500 mb-2">Связаться с командой Vanilla Space</h3>
          <p className="text-lg font-medium">+996 (312) 595 555</p>
        </div>

        <div>
          <h3 className="text-sm text-gray-500 mb-2">E-mail</h3>
          <p className="text-lg font-medium"> hello@vanillaspace.com</p>
        </div>

        <div>
          <h3 className="text-sm text-gray-500 mb-2">Адрес</h3>
          <p className="text-lg font-medium">
           Бишкек, бульвар Эркиндик, 9
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-md">
        <h2 className="text-3xl font-light mb-10">Напишите нам</h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          <input
            type="text"
            placeholder="Имя"
            className="w-full border-b border-gray-400 outline-none py-2"
          />

          <input
            type="email"
            placeholder="E-mail"
            className="w-full border-b border-gray-400 outline-none py-2"
          />

          <input
            type="tel"
            placeholder="Телефон"
            className="w-full border-b border-gray-400 outline-none py-2"
          />

          <textarea
            placeholder="Сообщение"
            rows={4}
            className="w-full border-b border-gray-400 outline-none resize-none py-2"
          />

          <button
            type="submit"
            className="bg-cyan-600 text-white px-10 py-3 hover:bg-cyan-700 transition"
          >
            Отправить
          </button>
        </form>

        {success && (
          <div className="mt-8 bg-amber-50 border border-amber-200 py-5 text-center">
            Сообщение успешно отправлено
          </div>
        )}
      </div>
    </div>
  );
};

export default Contact;