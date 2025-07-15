import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRandomWord, fetchWordDefinition } from './features/dictionary/dictionarySlice';
import { addSearch } from './features/recentSearches/recentSearchesSlice';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import WordResults from './components/WordResults';
import RecentSearches from './components/RecentSearches';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const [darkMode, setDarkMode] = useState(false);
  
  // Properly get loading state from Redux
  const { word, results, loading, error } = useSelector(state => ({
    word: state.dictionary.word,
    results: state.dictionary.results,
    loading: state.dictionary.loading,
    error: state.dictionary.error
  }));

  const recentSearches = useSelector(state => state.recentSearches.searches);

  useEffect(() => {
    dispatch(fetchRandomWord())
      .unwrap()
      .then(randomWord => dispatch(fetchWordDefinition(randomWord)));
  }, [dispatch]);

  const handleSearch = (searchWord) => {
    if (!searchWord.trim()) return;
    dispatch(fetchWordDefinition(searchWord));
    dispatch(addSearch(searchWord));
  };

  return (
    <div className={`App ${darkMode ? 'dark' : 'light'}`}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      
      <main className="container">
        <SearchForm onSearch={handleSearch} currentWord={word} loading={loading} />
        
        {recentSearches.length > 0 && (
          <RecentSearches searches={recentSearches} onSearch={handleSearch} />
        )}

        {loading && <div className="loading-text">Loading...</div>}
        
        {error && (
          <div className="error-message">
            {error}
            <button onClick={() => dispatch(fetchRandomWord())}>Try a random word</button>
          </div>
        )}

        {results && <WordResults results={results} onSearch={handleSearch} />}
      </main>
      
      <footer>
        <p>Dictionary App © {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

export default App;