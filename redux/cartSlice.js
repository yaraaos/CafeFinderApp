//redux/cartSlice.js

import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addItem: (state, action) => {
      const exists = state.find((item) => item.id === action.payload.id);
      if (exists) {
        exists.quantity += 1;
      } else {
        const newItem = { ...action.payload };
        if (!newItem.quantity) newItem.quantity = 1;
        state.push(newItem);
      }
    },
    removeItem: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
    updateQuantity: (state, action) => {
      const item = state.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
