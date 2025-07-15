// src/components/RecentSearches.js
import React from 'react';

const RecentSearches = ({ searches, onSearch }) => {
  return (
    <div className="recent-searches">
      <h3>Recent Searches:</h3>
      <div>
        {searches.map((search, index) => (
          <button key={index} onClick={() => onSearch(search)}>
            {search}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RecentSearches;