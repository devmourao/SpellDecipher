import { useState, useEffect } from 'react';

import { useSpellDecipher } from './hooks/useSpellDecipher';

import { InfoModal } from './components/InfoModal';

import { Globe, CircleHelp } from 'lucide-react';

import { GithubIcon } from './components/GithubIcon'; 

import './App.css';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

function App() {
  const { maskedSpell, flames, status, guessLetter, resetGame, correctGuesses, wrongGuesses, category } = useSpellDecipher();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    if (wrongGuesses.length > 0 && status === 'playing') {
      setIsShaking(true);
      const timer = setTimeout(() => setIsShaking(false), 500);
      return () => clearTimeout(timer);
    }
  }, [wrongGuesses.length, status]);


  if (status === 'loading') {
    return <div className="loading-screen">Summoning ancient grimoire...</div>;
  }





  return (
    <div className={`game-container ${isShaking ? 'shake-error' : ''}`}>
<InfoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <header className="game-header">
        <div className="header-top">
          <h1>Spell Decipher</h1>
          <div className="header-actions">
            <a href="https://dev.mourao.info" target="_blank" rel="noopener noreferrer" title="Portfolio" className="icon-btn">
              <Globe size={24} />
            </a>
            <a href="https://github.com/devmourao/SpellDecipher" target="_blank" rel="noopener noreferrer" title="GitHub" className="icon-btn">
               <GithubIcon size={24} />
            </a>
            <button onClick={() => setIsModalOpen(true)} title="About" className="icon-btn">
              <CircleHelp size={24} />
            </button>
          </div>
        </div>
        
        <div className="flames-container">
          Magical Flames: {'🔥'.repeat(flames)}{'❌'.repeat(5 - flames)}
        </div>
      </header>

<main>
        <div className="spell-display">
          <p className="category-hint">Hint: {category}</p> 
          <h2 className="word-container">
            
            {maskedSpell.split('').map((char, index) => (
              <span key={index} className={char !== '_' && char !== ' ' ? 'revealed-letter' : 'hidden-letter'}>
                {char}
              </span>
            ))}
          </h2>
        </div>

        {status === 'playing' && (
          <div className="keyboard">
            {ALPHABET.map((letter) => {
              const isCorrect = correctGuesses.includes(letter);
              const isWrong = wrongGuesses.includes(letter);
              const isGuessed = isCorrect || isWrong;

              let btnClass = "key-btn";
              if (isCorrect) btnClass += " correct";
              if (isWrong) btnClass += " wrong";

              return (
                <button 
                  key={letter} 
                  onClick={() => guessLetter(letter)}
                  className={btnClass}
                  disabled={isGuessed} 
                >
                  {letter}
                </button>
              );
            })}
          </div>
        )}

      
        {(status === 'victory' || status === 'game_over') && (
          <div className="modal-overlay">
            <div className={`modal-content end-game-modal ${status}`}>
              {status === 'victory' ? (
                <>
                  <h2 className="victory-title">✨ Spell Deciphered! ✨</h2>
                  <p>Your magical prowess grows.</p>
                </>
              ) : (
                <>
                  <h2 className="defeat-title">🔥 The Flames Extinguished... 🔥</h2>
                  <p>The spell consumed your energy.</p>
                </>
              )}
              <button className="primary-action-btn" onClick={resetGame}>
                {status === 'victory' ? 'Decipher Another' : 'Try Again'}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;