import { createSlice } from '@reduxjs/toolkit';

// Описываем структуру текстового блока страницы
export interface BrandBlock {
  id: number;
  title: string;
  textFirst: string;
  textSecond: string;
  image: string;
  isImageLeft: boolean; // Для чередования картинок (лево/право)
}

export interface BrandState {
  title: string;
  subtitle: string;
  blocks: BrandBlock[];
}

const initialState: BrandState = {
  title: "О бренде",
  subtitle: "Главная — О бренде",
  blocks: [
    {
      id: 1,
      title: "Идея и женщина",
      textFirst: "Vanilla Space была основана в 2010-ом году и стала одной из самых успешных компаний нашей страны. Как и многие итальянские фирмы, наш бренд остаётся семейной компанией, хотя ни один из членов семьи не является модельером.",
      textSecond: "Мы действуем по успешной формуле, прибегая к услугам известных модельеров для создания своих коллекций. Этот метод был описан критиком моды Колином Макдауэллом как форма дизайнерского со-творчества, характерная для ряда итальянских prêt-a-porter компаний.",
      image: "/brend1.png",
      isImageLeft: true
    },
    {
      id: 2,
      title: "Магия в деталях",
      textFirst: "Первый магазин Vanilla Space был открыт в маленьком городке на севере страны в 2010-ом году. Первая коллекция состояла из двух пальто и костюма, которые были копиями парижских моделей.",
      textSecond: "Несмотря на то, что по образованию основательница была адвокатом, ее семья всегда была тесно связана с шитьём (прабабушка основательницы шила одежду для женщин, а мать основала профессиональную школу кроя и шитья). Стремление производить одежду для масс несло в себе большие перспективы, особенно в то время, когда рынка качественного prêt-a-porter попросту не существовало.",
      image: "/brend2.png",
      isImageLeft: false
    }
  ]
};

const brandSlice = createSlice({
  name: 'brand',
  initialState,
  reducers: {} // Пока страница статична, экшены изменения не нужны
});

export default brandSlice.reducer;