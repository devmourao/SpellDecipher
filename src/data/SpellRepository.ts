import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { fallbackSpells } from './fallbackSpells';

export class SpellRepository {
  private supabase: SupabaseClient | null = null;

  constructor() {
    // Fetches environment variables 
    const supabaseUrl = import.meta.env?.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env?.VITE_SUPABASE_ANON_KEY;
    
    if (supabaseUrl && supabaseKey) {
      this.supabase = createClient(supabaseUrl, supabaseKey);
    }
  }

  /**
   * Attempts to fetch a random spell from the database.
   * If the network fails or credentials are missing, it safely falls back to the static dictionary.
   */
  public async getRandomSpell(): Promise<string> {
    try {
      if (!this.supabase) {
        throw new Error("Supabase client is not initialized. Missing environment variables.");
      }

      // Fetching a pool of words from the 'spells' table
      const { data, error } = await this.supabase
        .from('spells')
        .select('word')
        .limit(20);

      if (error || !data || data.length === 0) {
        throw new Error("Failed to fetch data from Supabase.");
      }

      const randomIndex = Math.floor(Math.random() * data.length);
      return data[randomIndex].word.toUpperCase();

    } catch (error) {
      console.warn("Database connection failed. Activating offline fallback dictionary.", error);
      
      const randomIndex = Math.floor(Math.random() * fallbackSpells.length);
      return fallbackSpells[randomIndex].word.toUpperCase();
    }
  }
}