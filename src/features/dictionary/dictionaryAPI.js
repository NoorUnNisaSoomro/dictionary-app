// src/features/dictionary/dictionaryAPI.js
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

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
        'https://random-words-api.vercel.app/word'
      );
      return response.data[0].word.toLowerCase();
    } catch (error) {
      return rejectWithValue('Could not fetch word of the day');
    }
  }
);