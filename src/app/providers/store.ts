// import { configureStore } from '@reduxjs/toolkit';
// import authReducer from '@/app/providers/store/authSlice';
// import brandReducer from './store/brandSlice';

// export const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     brand: brandReducer,
    
//     // ВРЕМЕННЫЕ ХОЛОСТЫЕ ЗАГЛУШКИ (Вместо закомментированных слайсов)
//     // Они возвращают пустые массивы, чтобы шапка и каталог не падали при чтении!
//     catalog: (state = { products: [] }) => state,
//     cart: (state = { items: [], couponDiscount: 0, reservationExpiresAt: null }) => state,
//   },
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

import { configureStore } from '@reduxjs/toolkit';
import brandReducer from './store/brandSlice';

export const store = configureStore({
  reducer: {
    // ВРЕМЕННЫЕ ХОЛОСТЫЕ ЗАГЛУШКИ
    // Убрали импорт authSlice и заменили на безопасную пустую функцию-редюсер
    auth: (state = { user: null, isAuthenticated: false }) => state,
    catalog: (state = { products: [] }) => state,
    cart: (state = { items: [], couponDiscount: 0, reservationExpiresAt: null }) => state,
    
    // Рабочий редюсер для страницы бренда
    brand: brandReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
