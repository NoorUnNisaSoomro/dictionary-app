import React from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

const Header = ({ darkMode, setDarkMode }) => {
  return (
    <header>
      <h1>Noor's Dictionary</h1>
      <button 
        onClick={() => setDarkMode(!darkMode)}
        className="theme-toggle"
        aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {darkMode ? <FaSun /> : <FaMoon />}
      </button>
    </header>
  );
};

export default Header;