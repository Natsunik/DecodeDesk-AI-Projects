import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from './Card';
import { Badge } from './Badge';
import { getTotalTranslations, getExamplePhrases, getBuzzwordOfTheDay } from '../lib/analytics';
import { TrendingUp, Zap } from 'lucide-react';
import type { ExamplePhrase } from '../lib/supabase';

export function Analytics() {
  const [totalTranslations, setTotalTranslations] = useState(0);
  const [topExamples, setTopExamples] = useState<ExamplePhrase[]>([]);
  const [buzzword, setBuzzword] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      const [total, examples] = await Promise.all([
        getTotalTranslations(),
        getExamplePhrases()
      ]);
      
      setTotalTranslations(total);
      setTopExamples(examples.slice(0, 5));
      setBuzzword(getBuzzwordOfTheDay());
    } catch (error) {
      console.error('Failed to load analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-600/40">
          <CardContent>
            <div className="h-20 bg-gray-700/60 rounded animate-pulse"></div>
          </CardContent>
        </Card>
        <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-600/40">
          <CardContent>
            <div className="h-20 bg-gray-700/60 rounded animate-pulse"></div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Stats Card */}
      <Card className="bg-gray-900/90 backdrop-blur-sm border-gray-600/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-purple-400" />
            <h3 className="font-semibold text-white">Usage Stats</h3>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="text-2xl font-bold text-purple-400">{totalTranslations.toLocaleString()}</p>
              <p className="text-sm text-gray-100">Total phrases decoded</p>
            </div>
            
            {topExamples.length > 0 && (
              <div>
                <p className="text-sm font-medium text-gray-100 mb-2">Most popular examples:</p>
                <div className="space-y-1">
                  {topExamples.map((example, index) => (
                    <div key={example.id} className="flex items-center justify-between text-xs">
                      <span className="text-white/90 truncate max-w-48">
                        {index + 1}. {example.phrase}
                      </span>
                      <Badge variant="secondary" className="ml-2 bg-purple-600/30 text-white border-purple-500/60">
                        {example.usage_count}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Buzzword of the Day */}
      <Card className="bg-gray-900/90 backdrop-blur-sm border-gray-600/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-pink-400" />
            <h3 className="font-semibold text-white">Buzzword of the Day</h3>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">
            <p className="text-3xl font-bold text-pink-400 mb-2">"{buzzword}"</p>
            <p className="text-sm text-white/90">
              Today's most overused corporate term. Use sparingly! 😉
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}