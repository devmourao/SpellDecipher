import { describe, it, expect, vi } from 'vitest';
import { SpellRepository } from './SpellRepository';
import { fallbackSpells } from './fallbackSpells';

describe('SpellRepository Data Service', () => {
  it('should return a spell from the fallback dictionary when database is unreachable', async () => {
    // Arrange: Create an array of valid uppercase fallback words
    const repository = new SpellRepository();
    const validFallbackWords = fallbackSpells.map(s => s.word.toUpperCase());

    // Act: Since Vite env vars are not loaded in this test runner context, 
    // the Supabase client will be null, forcing the fallback catch block.
   
    const spellData = await repository.getRandomSpell();

    // Assert: The returned spell must be one of the offline fallback words
    expect(validFallbackWords).toContain(spellData.word);
    expect(spellData.category).toBeDefined();
  });

  it('should log a warning to the console when falling back to offline mode', async () => {
    // Arrange: Spy on the console.warn to intercept the log without cluttering the terminal
    const repository = new SpellRepository();
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    // Act
    await repository.getRandomSpell();

    // Assert: Verify that our catch block correctly warned the system
    expect(consoleSpy).toHaveBeenCalledWith(
      "Database connection failed. Activating offline fallback dictionary.",
      expect.any(Error)
    );

    // Clean up
    consoleSpy.mockRestore();
  });
});