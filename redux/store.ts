// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import favoritesReducer from './favoritesSlice';
import lastOrdersReducer from './lastOrdersSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    favorites: favoritesReducer,
    lastOrders: lastOrdersReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
