import React, { useState } from 'react';
import { FaVolumeUp, FaBook, FaQuoteLeft } from 'react-icons/fa';

const WordResults = ({ results, onSearch }) => {
  const [audioError, setAudioError] = useState(null);

  const getBestPhonetic = () => {
    if (!results.phonetics) return null;
    
    const perfectMatch = results.phonetics.find(p => p.text && p.audio);
    if (perfectMatch) return perfectMatch;
    
    const withAudio = results.phonetics.find(p => p.audio);
    if (withAudio) return withAudio;
  
    return results.phonetics.find(p => p.text);
  };

  const bestPhonetic = getBestPhonetic();
  const phoneticText = bestPhonetic?.text || results.phonetic;
  const audioSrc = bestPhonetic?.audio;

  const playAudio = () => {
    if (!audioSrc) return;
    
    setAudioError(null);
    const audio = new Audio(audioSrc.startsWith('http') ? audioSrc : `https:${audioSrc}`);
    
    audio.onerror = () => setAudioError('Audio unavailable');
    audio.play().catch(() => setAudioError('Playback failed'));
  };

  return (
    <div className="word-results">
      <div className="word-header">
        <h1>{results.word}</h1>
        
        {(phoneticText || audioSrc) && (
          <div className="phonetic-section">
            {phoneticText && <span className="phonetic-text">/{phoneticText}/</span>}
            {audioSrc && (
              <button 
                onClick={playAudio} 
                className="audio-button"
                aria-label="Play pronunciation"
              >
                <FaVolumeUp />
              </button>
            )}
            {audioError && <span className="audio-error">{audioError}</span>}
          </div>
        )}
      </div>

      {results.meanings?.map((meaning, index) => (
        <div key={`${meaning.partOfSpeech}-${index}`} className="meaning-section">
          <h2 className="part-of-speech">
            <FaBook /> {meaning.partOfSpeech}
          </h2>
          
          <ul className="definitions-list">
            {meaning.definitions?.slice(0, 5).map((def, defIndex) => (
              <li key={defIndex} className="definition-item">
                <p className="definition-text">{def.definition}</p>
                
                {def.example && (
                  <p className="example">
                    <FaQuoteLeft /> Example: <em>"{def.example}"</em>
                  </p>
                )}
                
                {def.synonyms?.length > 0 && (
                  <div className="synonyms">
                    <strong>Synonyms: </strong>
                    {def.synonyms.slice(0, 5).map((synonym, i) => (
                      <button
                        key={i}
                        onClick={() => onSearch(synonym)}
                        className="synonym-tag"
                      >
                        {synonym}
                      </button>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default WordResults;