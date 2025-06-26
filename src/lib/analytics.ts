import { supabase } from './supabase';

// Generate a simple session ID for anonymous tracking
export function getSessionId(): string {
  let sessionId = localStorage.getItem('decodedesk_session');
  if (!sessionId) {
    sessionId = 'session_' + Math.random().toString(36).substring(2) + Date.now().toString(36);
    localStorage.setItem('decodedesk_session', sessionId);
  }
  return sessionId;
}

// Save a translation to the database
export async function saveTranslation(
  originalText: string,
  translatedText: string,
  isExampleUsed: boolean = false,
  examplePhrase: string = ''
) {
  try {
    const sessionId = getSessionId();
    
    const { error } = await supabase
      .from('translations')
      .insert({
        original_text: originalText,
        translated_text: translatedText,
        session_id: sessionId,
        is_example_used: isExampleUsed,
        example_phrase: examplePhrase
      });

    if (error) throw error;

    // Update daily stats
    await updateDailyStats();
  } catch (error) {
    console.error('Error saving translation:', error);
  }
}

// Get total translation count
export async function getTotalTranslations(): Promise<number> {
  try {
    const { count, error } = await supabase
      .from('translations')
      .select('*', { count: 'exact', head: true });
    
    if (error) throw error;
    return count || 0;
  } catch (error) {
    console.error('Error getting total translations:', error);
    return 0;
  }
}

// Get example phrases with usage counts
export async function getExamplePhrases() {
  try {
    const { data, error } = await supabase
      .from('example_phrases')
      .select('*')
      .order('usage_count', { ascending: false });
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error getting example phrases:', error);
    return [];
  }
}

// Increment usage count for an example phrase
export async function incrementExampleUsage(phrase: string) {
  try {
    // First try to find the phrase
    const { data: existingPhrase, error: selectError } = await supabase
      .from('example_phrases')
      .select('usage_count')
      .eq('phrase', phrase)
      .single();
    
    if (selectError) {
      console.error('Error finding phrase:', selectError);
      return;
    }

    if (existingPhrase) {
      const { error: updateError } = await supabase
        .from('example_phrases')
        .update({ usage_count: existingPhrase.usage_count + 1 })
        .eq('phrase', phrase);
      
      if (updateError) {
        console.error('Error updating usage count:', updateError);
      }
    }
  } catch (error) {
    console.error('Error incrementing example usage:', error);
  }
}

// Update daily statistics
async function updateDailyStats() {
  try {
    const today = new Date().toISOString().split('T')[0];
    const sessionId = getSessionId();
    
    // Get today's stats
    const { data: existingStats } = await supabase
      .from('daily_stats')
      .select('*')
      .eq('date', today)
      .single();
    
    if (existingStats) {
      // Update existing stats
      const { error } = await supabase
        .from('daily_stats')
        .update({
          total_translations: existingStats.total_translations + 1
        })
        .eq('date', today);
      
      if (error) throw error;
    } else {
      // Create new daily stats entry
      const { error } = await supabase
        .from('daily_stats')
        .insert({
          date: today,
          total_translations: 1,
          unique_sessions: 1
        });
      
      if (error) throw error;
    }
  } catch (error) {
    console.error('Error updating daily stats:', error);
  }
}

// Get a random buzzword of the day
export function getBuzzwordOfTheDay(): string {
  const buzzwords = [
    "synergy",
    "paradigm shift", 
    "circle back",
    "leverage",
    "ideate",
    "bandwidth",
    "touch base",
    "move the needle",
    "low-hanging fruit",
    "think outside the box",
    "drill down",
    "take it offline",
    "ping",
    "scalable solution",
    "best practice"
  ];
  
  // Use date as seed for consistent daily buzzword
  const today = new Date().toDateString();
  const hash = today.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
  
  return buzzwords[Math.abs(hash) % buzzwords.length];
}