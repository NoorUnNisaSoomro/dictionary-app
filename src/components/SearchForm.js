// src/components/SearchForm.js
import React, { useState } from 'react';

const SearchForm = ({ onSearch, currentWord, loading }) => {
  const [word, setWord] = useState(currentWord || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(word);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={word}
        onChange={(e) => setWord(e.target.value)}
        placeholder="Enter a word..."
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Searching...' : 'Search'}
      </button>
    </form>
  );
};

export default SearchForm;