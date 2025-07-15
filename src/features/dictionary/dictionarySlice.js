import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const FALLBACK_WORDS = ['serendipity', 'ephemeral', 'quintessential', 'eloquent', 'luminous'];

export const fetchWordDefinition = createAsyncThunk(
  'dictionary/fetchWordDefinition',
  async (word, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      return response.data[0];
    } catch (error) {
      return rejectWithValue('Word not found. Please try another word.');
    }
  }
);

export const fetchRandomWord = createAsyncThunk(
  'dictionary/fetchRandomWord',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        'https://random-word-api.herokuapp.com/word'
      );
      return response.data[0].toLowerCase();
    } catch (error) {
      const randomIndex = Math.floor(Math.random() * FALLBACK_WORDS.length);
      return FALLBACK_WORDS[randomIndex];
    }
  }
);

const initialState = {
  word: '',
  results: null,
  loading: false,
  error: null
};

const dictionarySlice = createSlice({
  name: 'dictionary',
  initialState,
  reducers: {
    setWord: (state, action) => {
      state.word = action.payload;
    },
    clearResults: (state) => {
      state.results = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWordDefinition.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWordDefinition.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload;
        state.word = action.payload.word;
        state.error = null;
      })
      .addCase(fetchWordDefinition.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchRandomWord.fulfilled, (state, action) => {
        state.word = action.payload;
      });
  }
});

export const { setWord, clearResults } = dictionarySlice.actions;
export default dictionarySlice.reducer;

export const selectDictionary = (state) => state.dictionary;