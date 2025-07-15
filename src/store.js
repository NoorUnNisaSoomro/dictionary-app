// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import dictionaryReducer from './features/dictionary/dictionarySlice';
import recentSearchesReducer from './features/recentSearches/recentSearchesSlice';

export const store = configureStore({
  reducer: {
    dictionary: dictionaryReducer,
    recentSearches: recentSearchesReducer
  }
});