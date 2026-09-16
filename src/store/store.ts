import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import cartReducer from '../features/cart/cartSlice';
import categoriesReducer from '../features/home/categoriesSlice';
import productsReducer from '../features/home/productsSlice';
import productDetailReducer from '../features/product/productDetailSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categoriesReducer,
    products: productsReducer,
    productDetail: productDetailReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
