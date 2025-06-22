// redux/lastOrdersSlice.js
import { createSlice } from '@reduxjs/toolkit';

const lastOrdersSlice = createSlice({
  name: 'lastOrders',
  initialState: [],
  reducers: {
    addOrders: (state, action) => {
      const newOrders = action.payload;
      const combined = [...newOrders, ...state];
      const unique = [];

      for (const item of combined) {
        if (!unique.some((i) => i.id === item.id)) {
          unique.push(item);
        }
      }

      return unique.slice(0, 10); // Keep max 10 items
    },
  },
});

export const { addOrders } = lastOrdersSlice.actions;
export default lastOrdersSlice.reducer;
