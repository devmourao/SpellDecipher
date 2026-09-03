import { useSpellDecipher } from './hooks/useSpellDecipher';
import './App.css';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

function App() {
  const { maskedSpell, flames, status, guessLetter, resetGame, correctGuesses, wrongGuesses, category } = useSpellDecipher();

  if (status === 'loading') {
    return <div className="loading-screen">Summoning ancient grimoire...</div>;
  }





  return (
    <div className="game-container">
      <header>
        <h1>Spell Decipher</h1>
        <div className="flames-container">
          Magical Flames: {'🔥'.repeat(flames)}{'❌'.repeat(5 - flames)}
        </div>
      </header>

      <main>
        <div className="spell-display">
          <p className="category-hint">Hint: {category}</p> 
          <h2>{maskedSpell}</h2>
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

        {status === 'victory' && (
          <div className="game-end victory">
            <h2>Spell Deciphered!</h2>
            <p>Your magical prowess grows.</p>
            <button onClick={resetGame}>Decipher Another</button>
          </div>
        )}

        {status === 'game_over' && (
          <div className="game-end defeat">
            <h2>The Flames Extinguished...</h2>
            <p>The spell consumed your energy.</p>
            <button onClick={resetGame}>Try Again</button>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;