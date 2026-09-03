import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { fallbackSpells } from './fallbackSpells';

export interface SpellData {
  word: string;
  category: string;
}

export class SpellRepository {
  private supabase: SupabaseClient | null = null;

  constructor() {
    const supabaseUrl = import.meta.env?.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env?.VITE_SUPABASE_ANON_KEY;
    
    if (supabaseUrl && supabaseKey) {
      this.supabase = createClient(supabaseUrl, supabaseKey);
    }
  }

  public async getRandomSpell(): Promise<SpellData> {
    try {
      if (!this.supabase) throw new Error("Supabase client is not initialized.");

 
      const { data, error } = await this.supabase
        .from('spells')
        .select('word, category')
        .limit(20);

      if (error || !data || data.length === 0) throw new Error("Failed to fetch data.");

      const randomIndex = Math.floor(Math.random() * data.length);
      return {
        word: data[randomIndex].word.toUpperCase(),
        category: data[randomIndex].category
      };

    } catch (error) {
      console.warn("Database connection failed. Activating offline fallback dictionary.", error);
      
      const randomIndex = Math.floor(Math.random() * fallbackSpells.length);
      const fallback = fallbackSpells[randomIndex];
      
      return {
        word: fallback.word.toUpperCase(),
        category: fallback.category
      };
    }
  }
}