/**
 * Core Game Engine for Spell Decipher
 * related to the guessing mechanics, win/loss conditions, and HP (Flames).
 */
export class SpellDecipherGame {
  private secretSpell: string;
  private guessedLetters: Set<string>;
  private _remainingFlames: number;
  
  private readonly MAX_FLAMES = 5; // Defined in DOC-001 (BR-003)

  constructor(spell: string) {
    // Normalizes the spell to uppercase and removes trailing/leading spaces
    this.secretSpell = spell.trim().toUpperCase();
    this.guessedLetters = new Set<string>();
    this._remainingFlames = this.MAX_FLAMES;
  }

  /**
   * Processes a player's letter guess.
   * @param letter The character guessed by the player.
   */
  public guess(letter: string): void {
    if (this.isGameOver() || this.isVictory()) {
      return;
    }

    const char = letter.toUpperCase();
    
    // BR-004: Ignore duplicate guesses without penalizing
    if (this.guessedLetters.has(char)) {
      return;
    }

    this.guessedLetters.add(char);

    // BR-003: Deduct a flame if the letter is not in the spell
    if (!this.secretSpell.includes(char)) {
      this._remainingFlames--;
    }
  }

  /**
   * Returns the spell string formatted for the UI, 
   * revealing guessed letters and masking hidden ones with underscores.
   */
  public getMaskedSpell(): string {
    return this.secretSpell
      .split('')
      .map(char => {
        if (char === ' ') return ' '; // Preserve spaces for multi-word spells
        return this.guessedLetters.has(char) ? char : '_';
      })
      .join(' ');
  }

  /**
   * BR-001: Player wins if all characters (excluding spaces) have been guessed.
   */
  public isVictory(): boolean {
    return this.secretSpell
      .split('')
      .every(char => char === ' ' || this.guessedLetters.has(char));
  }

  /**
   * BR-002: Player loses when flames reach zero.
   */
  public isGameOver(): boolean {
    return this._remainingFlames <= 0 && !this.isVictory();
  }

  // Getter to expose flames securely (read-only for the UI)
  public get remainingFlames(): number {
    return this._remainingFlames;
  }
}