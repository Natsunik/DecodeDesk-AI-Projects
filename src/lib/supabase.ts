import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables are missing. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');

// Database types
export interface Translation {
  id: string;
  original_text: string;
  translated_text: string;
  session_id: string;
  created_at: string;
  is_example_used: boolean;
  example_phrase: string;
}

export interface ExamplePhrase {
  id: string;
  phrase: string;
  usage_count: number;
  created_at: string;
}

export interface DailyStats {
  id: string;
  date: string;
  total_translations: number;
  unique_sessions: number;
  created_at: string;
}