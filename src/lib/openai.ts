import { PROMPTS, MODE_TO_PROMPT_MAP, safePromptInject, getPromptByMode } from './prompts';

const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

export type TranslationMode = 'decode' | 'decode-genz' | 'generate-corporate' | 'generate-genz' | 'genz-to-corporate' | 'corporate-to-genz';

interface GenerationResult {
  word: string;
  meaning: string;
  example: string;
}

interface CrossTranslationResult {
  original: string;
  translated: string;
  meaning: string;
}

export async function translateCorporateSpeak(text: string): Promise<{ original: string; translation: string }> {
  return performTranslation(text, 'decode');
}

export async function translateGenZSpeak(text: string): Promise<{ original: string; translation: string }> {
  return performTranslation(text, 'decode-genz');
}

export async function generateCorporateWord(userInput?: string): Promise<GenerationResult> {
  const response = await performTranslation(userInput || '', 'generate-corporate');
  return parseGenerationResult(response.translation);
}

export async function generateGenZWord(userInput?: string): Promise<GenerationResult> {
  const response = await performTranslation(userInput || '', 'generate-genz');
  return parseGenerationResult(response.translation);
}

export async function translateGenZToCorporate(text: string): Promise<CrossTranslationResult> {
  const response = await performTranslation(text, 'genz-to-corporate');
  return parseCrossTranslationResult(response.translation);
}

export async function translateCorporateToGenZ(text: string): Promise<CrossTranslationResult> {
  const response = await performTranslation(text, 'corporate-to-genz');
  return parseCrossTranslationResult(response.translation);
}

async function performTranslation(text: string, mode: TranslationMode): Promise<{ original: string; translation: string }> {
  if (!OPENROUTER_API_KEY) {
    throw new Error('OpenRouter API key is not configured');
  }

  // Get the appropriate prompt template for the mode
  const promptTemplate = getPromptByMode(mode);
  
  // Safely inject user input into the prompt
  const finalPrompt = safePromptInject(promptTemplate, text);

  let lastError: Error | null = null;
  
  // Retry logic - try up to 3 times
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      console.log(`Translation attempt ${attempt}/3 using DeepSeek model via OpenRouter...`);
      console.log(`Mode: ${mode}, Input length: ${text.length} chars`);
      
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'deepseek/deepseek-r1-0528-qwen3-8b:free',
          messages: [
            { role: 'user', content: finalPrompt }
          ],
          max_tokens: 400,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error(`OpenRouter API error (attempt ${attempt}):`, response.status, errorData);
        
        // Handle specific error cases
        if (response.status === 401) {
          throw new Error('API key is invalid. Please check your OpenRouter configuration.');
        } else if (response.status === 429) {
          throw new Error('Rate limit exceeded. Please try again in a moment.');
        } else if (response.status === 402) {
          throw new Error('Insufficient credits. Please check your OpenRouter account.');
        } else {
          lastError = new Error(`API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
          
          // If not the last attempt, wait before retrying
          if (attempt < 3) {
            await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
            continue;
          }
        }
      } else {
        const data = await response.json();
        console.log(`DeepSeek response received successfully on attempt ${attempt}`);
        
        const content = data.choices[0]?.message?.content || '';
        console.log('AI response content:', content);
        
        if (!content) {
          lastError = new Error('Empty response from AI model');
          if (attempt < 3) {
            await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
            continue;
          }
        } else {
          // Parse the response based on the mode
          const parsedResult = parseResponse(content, mode, text);
          console.log('Parsed result:', parsedResult);
          
          return parsedResult;
        }
      }
    } catch (error) {
      console.error(`Translation error (attempt ${attempt}):`, error);
      lastError = error instanceof Error ? error : new Error('Unknown error occurred');
      
      // If not the last attempt, wait before retrying
      if (attempt < 3) {
        await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
        continue;
      }
    }
  }

  // If all attempts failed, throw the last error with a user-friendly message
  throw new Error(lastError?.message || 'Translation service is temporarily unavailable. Please try again later.');
}

function parseResponse(content: string, mode: TranslationMode, originalText: string): { original: string; translation: string } {
  const lines = content.split('\n').filter(line => line.trim());
  
  // For decode modes, look for "Plain English:" or "Actually Means:"
  if (mode === 'decode' || mode === 'decode-genz') {
    let translation = '';
    
    for (const line of lines) {
      if (line.toLowerCase().includes('plain english:')) {
        translation = line.replace(/plain english:/i, '').trim();
        break;
      } else if (line.toLowerCase().includes('actually means:')) {
        translation = line.replace(/actually means:/i, '').trim();
        break;
      }
    }
    
    return {
      original: originalText,
      translation: translation || content.trim()
    };
  }
  
  // For other modes, return the full content as translation
  return {
    original: originalText,
    translation: content.trim()
  };
}

function parseGenerationResult(content: string): GenerationResult {
  const lines = content.split('\n').filter(line => line.trim());
  
  let word = '';
  let meaning = '';
  let example = '';
  
  for (const line of lines) {
    if (line.toLowerCase().includes('new corporate word') || line.toLowerCase().includes('new genz word')) {
      word = line.split(':')[1]?.trim() || '';
    } else if (line.toLowerCase().includes('meaning:')) {
      meaning = line.split(':')[1]?.trim() || '';
    } else if (line.toLowerCase().includes('example:')) {
      example = line.split(':')[1]?.trim() || '';
    }
  }
  
  return {
    word: word || 'Synergistic Alignmentality',
    meaning: meaning || 'A fancy way of saying "working together"',
    example: example || 'We need more synergistic alignmentality in our quarterly initiatives.'
  };
}

function parseCrossTranslationResult(content: string): CrossTranslationResult {
  const lines = content.split('\n').filter(line => line.trim());
  
  let original = '';
  let translated = '';
  let meaning = '';
  
  for (const line of lines) {
    if (line.toLowerCase().includes('genz says:') || line.toLowerCase().includes('corporate says:')) {
      original = line.split(':')[1]?.trim() || '';
    } else if (line.toLowerCase().includes('corporate version:') || line.toLowerCase().includes('genz version:')) {
      translated = line.split(':')[1]?.trim() || '';
    } else if (line.toLowerCase().includes('explanation:')) {
      meaning = line.split(':')[1]?.trim() || '';
    }
  }
  
  return {
    original: original || 'Translation completed',
    translated: translated || 'Successfully converted',
    meaning: meaning || 'The message has been transformed between communication styles'
  };
}