//redux/favoritesSlice.jsx
import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: [],
  reducers: {
    toggleFavorite(state, action) {
      const exists = state.find(c => c.id === action.payload.id);
      if (exists) {
        return state.filter(c => c.id !== action.payload.id);
      } else {
        state.push(action.payload);
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
