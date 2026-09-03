/**
 * Static dictionary used as a resilient fallback
 * in case the Supabase database is unreachable.
 */
export const fallbackSpells = [
  { word: 'OBSIDIAN', category: 'Magical Artifacts', difficulty: 2 },
  { word: 'DRAGON', category: 'Mythological Creatures', difficulty: 1 },
  { word: 'NECROMANCER', category: 'RPG Classes', difficulty: 3 },
  { word: 'FIREBALL', category: 'Spells', difficulty: 1 },
  { word: 'GRIFFIN', category: 'Mythological Creatures', difficulty: 2 }
];