// src/features/recentSearches/recentSearchesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searches: []
};

const recentSearchesSlice = createSlice({
  name: 'recentSearches',
  initialState,
  reducers: {
    addSearch: (state, action) => {
      const newSearches = [
        action.payload,
        ...state.searches.filter(w => w !== action.payload)
      ].slice(0, 5);
      state.searches = newSearches;
    }
  }
});

export const { addSearch } = recentSearchesSlice.actions;
export default recentSearchesSlice.reducer;

export const selectRecentSearches = (state) => state.recentSearches.searches;