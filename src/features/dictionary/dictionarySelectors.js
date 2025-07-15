// src/features/dictionary/dictionarySelectors.js
export const selectWord = (state) => state.dictionary.word;
export const selectResults = (state) => state.dictionary.results;
export const selectLoading = (state) => state.dictionary.loading;
export const selectError = (state) => state.dictionary.error;
export const selectWordOfTheDay = (state) => state.dictionary.wordOfTheDay;