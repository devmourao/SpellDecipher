import { describe, it, expect, beforeEach } from 'vitest';
import { SpellDecipherGame } from './SpellDecipherGame';

describe('SpellDecipherGame Core Engine', () => {
  let game: SpellDecipherGame;

  // Runs before each test to ensure a fresh game state
  beforeEach(() => {
    game = new SpellDecipherGame('OBSIDIAN');
  });

  it('should initialize with max flames and a masked spell', () => {
    expect(game.remainingFlames).toBe(5);
    // 'OBSIDIAN' has 8 letters, so it should be 8 underscores separated by spaces
    expect(game.getMaskedSpell()).toBe('_ _ _ _ _ _ _ _');
  });

  it('should reveal correctly guessed letters (BR-001 related)', () => {
    game.guess('I');
    // The letter 'I' appears twice in 'OBSIDIAN' (indices 3 and 6)
    expect(game.getMaskedSpell()).toBe('_ _ _ I _ I _ _');
    expect(game.remainingFlames).toBe(5); // Flames should not decrease
  });

  it('should deduct a flame for an incorrect guess (BR-003)', () => {
    game.guess('X');
    expect(game.remainingFlames).toBe(4);
  });

  it('should ignore duplicate guesses without penalizing (BR-004)', () => {
    game.guess('X'); // 1st wrong guess -> 4 flames
    game.guess('X'); // 2nd wrong guess (duplicate) -> should remain 4
    expect(game.remainingFlames).toBe(4);

    game.guess('O'); // Correct guess
    game.guess('O'); // Duplicate correct guess -> flames still intact
    expect(game.remainingFlames).toBe(4);
  });

  it('should trigger victory when all letters are guessed (BR-001)', () => {
    const letters = ['O', 'B', 'S', 'I', 'D', 'A', 'N'];
    letters.forEach(letter => game.guess(letter));
    
    expect(game.isVictory()).toBe(true);
    expect(game.isGameOver()).toBe(false);
  });

  it('should trigger game over when flames reach zero (BR-002)', () => {
    const wrongLetters = ['X', 'Y', 'Z', 'W', 'Q'];
    wrongLetters.forEach(letter => game.guess(letter));
    
    expect(game.remainingFlames).toBe(0);
    expect(game.isGameOver()).toBe(true);
    expect(game.isVictory()).toBe(false);
  });
});