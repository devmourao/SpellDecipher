import { useState, useCallback, useEffect } from 'react';
import { SpellDecipherGame } from '../core/SpellDecipherGame';
import { SpellRepository } from '../data/SpellRepository';

type GameStatus = 'loading' | 'playing' | 'victory' | 'game_over';

export function useSpellDecipher() {
  const [game, setGame] = useState<SpellDecipherGame | null>(null);
  const [maskedSpell, setMaskedSpell] = useState<string>('');
  const [flames, setFlames] = useState<number>(5);
  const [status, setStatus] = useState<GameStatus>('loading');

  const initializeGame = useCallback(async () => {
    setStatus('loading');
    
    // Fetch data using our resilient repository
    const repository = new SpellRepository();
    const word = await repository.getRandomSpell();
    
    // Initialize the core engine
    const newGame = new SpellDecipherGame(word);
    
    setGame(newGame);
    setMaskedSpell(newGame.getMaskedSpell());
    setFlames(newGame.remainingFlames);
    setStatus('playing');
  }, []);

  // Fetch the first spell on component mount
  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  const guessLetter = useCallback((letter: string) => {
    if (!game || status !== 'playing') return;

    game.guess(letter);
    
    // Sync OOP state with React state to trigger re-renders
    setMaskedSpell(game.getMaskedSpell());
    setFlames(game.remainingFlames);

    if (game.isVictory()) {
      setStatus('victory');
    } else if (game.isGameOver()) {
      setStatus('game_over');
    }
  }, [game, status]);

  return { 
    maskedSpell, 
    flames, 
    status, 
    guessLetter, 
    resetGame: initializeGame 
  };
}