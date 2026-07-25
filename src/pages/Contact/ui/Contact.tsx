import React, { useState } from "react";
import type { JSX } from 'react';

export function Contact(): JSX.Element {
// const Contact: React.FC = () => {
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
      <div className="w-full h-[380px] bg-gray-200 flex items-center justify-center text-gray-500 mb-12">
        Карта с любой точкой
      </div>

      {/* Contacts */}
      <div className="grid md:grid-cols-3 gap-10 mb-20">
        <div>
          <h3 className="text-sm text-gray-500 mb-2">Телефон</h3>
          <p className="text-lg font-medium">+7 (495) 823-54-12</p>
        </div>

        <div>
          <h3 className="text-sm text-gray-500 mb-2">E-mail</h3>
          <p className="text-lg font-medium">info@sitename.com</p>
        </div>

        <div>
          <h3 className="text-sm text-gray-500 mb-2">Адрес</h3>
          <p className="text-lg font-medium">
            г. Москва, 3-я улица Строителей, 25
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