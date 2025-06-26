import React, { useState, useEffect } from 'react';
import { Badge } from './Badge';
import { getExamplePhrases, incrementExampleUsage } from '../lib/analytics';
import type { ExamplePhrase } from '../lib/supabase';

interface ExamplePhrasesProps {
  onPhraseClick: (phrase: string) => void;
  onQuotaExhausted?: () => void;
}

// Hardcoded fallback examples to guarantee they always show
const FALLBACK_EXAMPLES = [
  "Let's circle back on this",
  "We need to leverage our synergies",
  "This is a paradigm shift",
  "Let's touch base offline",
  "We should ideate some solutions",
  "Do you have bandwidth for this?",
  "Let's move the needle",
  "We need to think outside the box",
  "This is low-hanging fruit",
  "Let's drill down into the details"
];

export function ExamplePhrases({ onPhraseClick, onQuotaExhausted }: ExamplePhrasesProps) {
  const [examples, setExamples] = useState<ExamplePhrase[]>([]);
  const [loading, setLoading] = useState(true);
  const [useFallback, setUseFallback] = useState(false);

  useEffect(() => {
    loadExamples();
  }, []);

  const loadExamples = async () => {
    try {
      const data = await getExamplePhrases();
      if (data && data.length > 0) {
        setExamples(data);
        setUseFallback(false);
      } else {
        // No data from Supabase, use fallback
        setUseFallback(true);
      }
    } catch (error) {
      console.error('Failed to load examples from Supabase, using fallback:', error);
      setUseFallback(true);
    } finally {
      setLoading(false);
    }
  };

  const handlePhraseClick = async (phrase: string) => {
    // Check quota before proceeding
    const { canUserTranslate } = await import('../lib/translationLimits');
    const quotaInfo = canUserTranslate(false); // Assuming guest for example phrases
    
    if (!quotaInfo.canTranslate) {
      onQuotaExhausted?.();
      return;
    }
    
    // Increment usage count if not using fallback
    if (!useFallback) {
      try {
        await incrementExampleUsage(phrase);
      } catch (error) {
        console.error('Failed to increment usage count:', error);
      }
    }
    
    // Call the parent handler
    onPhraseClick(phrase);
  };

  // Show loading state briefly
  if (loading) {
    return (
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-200">Try these examples:</h3>
        <div className="flex flex-wrap gap-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-7 w-32 bg-white/20 rounded-full animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  // Use fallback examples if Supabase failed
  const displayExamples = useFallback 
    ? FALLBACK_EXAMPLES.slice(0, 8).map((phrase, index) => ({
        id: `fallback-${index}`,
        phrase,
        usage_count: 0,
        created_at: new Date().toISOString()
      }))
    : examples.slice(0, 8);

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-white/90">Try these examples:</h3>
      <div className="flex flex-wrap gap-2">
        {displayExamples.map((example) => (
          <Badge
            key={example.id}
            variant="default"
            onClick={() => handlePhraseClick(example.phrase)}
            className="cursor-pointer bg-purple-600/30 text-white/95 border-purple-500/60 hover:bg-purple-600/50 hover:text-white transition-colors"
          >
            {example.phrase}
          </Badge>
        ))}
      </div>
    </div>
  );
}