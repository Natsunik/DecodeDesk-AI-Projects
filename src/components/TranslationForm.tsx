import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from './Card';
import { Button } from './Button';
import { Textarea } from './Textarea';
import { ExamplePhrases } from './ExamplePhrases';
import { 
  translateCorporateSpeak, 
  translateGenZSpeak,
  generateCorporateWord, 
  generateGenZWord,
  translateGenZToCorporate,
  translateCorporateToGenZ,
  type TranslationMode 
} from '../lib/openai';
import { saveTranslation } from '../lib/analytics';
import { Copy, Shuffle, Sparkles, ArrowLeftRight, Zap } from 'lucide-react';
import { UsageAlert } from './ui/usage-alert';
import { QuotaModal } from './ui/quota-modal';
import { Tooltip } from './ui/tooltip';
import { 
  canUserTranslate, 
  incrementTranslationCount, 
  getDaysUntilReset,
  migrateGuestToUser
} from '../lib/translationLimits';
import toast from 'react-hot-toast';

interface TranslationResult {
  original: string;
  translation: string;
}

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

interface TranslationFormProps {
  onTranslationComplete?: () => void;
  onUpgrade?: () => void;
  onLogin?: () => void;
  onQuotaExhausted?: () => void;
  user?: any;
}

export function TranslationForm({ onTranslationComplete, onUpgrade, onLogin, onQuotaExhausted, user }: TranslationFormProps) {
  const [inputText, setInputText] = useState('');
  const [mode, setMode] = useState<TranslationMode>('decode');
  const [result, setResult] = useState<TranslationResult | null>(null);
  const [generationResult, setGenerationResult] = useState<GenerationResult | null>(null);
  const [crossResult, setCrossResult] = useState<CrossTranslationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showQuotaModal, setShowQuotaModal] = useState(false);
  const [quotaModalType, setQuotaModalType] = useState<'guest-limit' | 'user-limit'>('guest-limit');

  const isLoggedIn = !!user;
  const quotaInfo = canUserTranslate(isLoggedIn);
  
  // Show upgrade button instead of login for logged-in users
  const shouldShowUpgrade = isLoggedIn || !quotaInfo.canTranslate;
  
  // Migrate guest quota when user logs in (run once)
  React.useEffect(() => {
    if (isLoggedIn) {
      migrateGuestToUser();
    }
  }, [isLoggedIn]);

  const modes = [
    { id: 'decode', label: 'Decode Corporate', icon: Shuffle, description: 'Translate corporate speak to plain English', guestAllowed: true },
    { id: 'decode-genz', label: 'Decode GenZ', icon: Zap, description: 'Translate GenZ slang to plain English', guestAllowed: true },
    { id: 'generate-corporate', label: 'Generate Corporate', icon: Sparkles, description: 'Create new corporate buzzwords', guestAllowed: false },
    { id: 'generate-genz', label: 'Generate GenZ', icon: Zap, description: 'Create new GenZ slang', guestAllowed: false },
    { id: 'genz-to-corporate', label: 'GenZ → Corporate', icon: ArrowLeftRight, description: 'Translate GenZ to corporate speak', guestAllowed: false },
    { id: 'corporate-to-genz', label: 'Corporate → GenZ', icon: ArrowLeftRight, description: 'Translate corporate to GenZ slang', guestAllowed: false },
  ];

  const handleAction = async () => {
    // Check quota before proceeding
    if (!quotaInfo.canTranslate) {
      // Use the new quota exhausted modal for simpler UX
      onQuotaExhausted?.();
      return;
    }

    // Only require input for decode and cross-translation modes
    if ((mode === 'decode' || mode === 'decode-genz' || mode === 'genz-to-corporate' || mode === 'corporate-to-genz') && !inputText.trim()) {
      toast.error('Please enter some text to translate');
      return;
    }

    setLoading(true);
    setError('');
    clearResults();

    try {
      let actionResult;
      
      switch (mode) {
        case 'decode':
          actionResult = await translateCorporateSpeak(inputText);
          setResult(actionResult);
          await saveTranslation(actionResult.original, actionResult.translation);
          toast.success('Corporate speak decoded!');
          break;
          
        case 'decode-genz':
          actionResult = await translateGenZSpeak(inputText);
          setResult(actionResult);
          await saveTranslation(actionResult.original, actionResult.translation);
          toast.success('GenZ slang decoded!');
          break;
          
        case 'generate-corporate':
          actionResult = await generateCorporateWord(inputText.trim() || undefined);
          setGenerationResult(actionResult);
          await saveTranslation(
            inputText.trim() || 'Generated Corporate Word', 
            `${actionResult.word}: ${actionResult.meaning}`
          );
          toast.success('New corporate buzzword generated!');
          break;
          
        case 'generate-genz':
          actionResult = await generateGenZWord(inputText.trim() || undefined);
          setGenerationResult(actionResult);
          await saveTranslation(
            inputText.trim() || 'Generated GenZ Word', 
            `${actionResult.word}: ${actionResult.meaning}`
          );
          toast.success('New GenZ slang created!');
          break;
          
        case 'genz-to-corporate':
          actionResult = await translateGenZToCorporate(inputText);
          setCrossResult(actionResult);
          await saveTranslation(actionResult.original, actionResult.translated);
          toast.success('GenZ translated to corporate!');
          break;
          
        case 'corporate-to-genz':
          actionResult = await translateCorporateToGenZ(inputText);
          setCrossResult(actionResult);
          await saveTranslation(actionResult.original, actionResult.translated);
          toast.success('Corporate translated to GenZ!');
          break;
      }
      
      // Increment translation count after successful translation
      incrementTranslationCount(isLoggedIn);
      
      onTranslationComplete?.();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Action failed';
      console.error('Action error:', err);
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleExampleClick = async (phrase: string) => {
    // Check quota before proceeding
    if (!quotaInfo.canTranslate) {
      onQuotaExhausted?.();
      return;
    }

    setInputText(phrase);
    setError('');
    clearResults();
    setLoading(true);

    try {
      const translation = await translateCorporateSpeak(phrase);
      setResult(translation);
      await saveTranslation(translation.original, translation.translation, true, phrase);
      
      // Increment translation count after successful translation
      incrementTranslationCount(isLoggedIn);
      
      onTranslationComplete?.();
      toast.success('Example translated!');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Translation failed';
      console.error('Example translation error:', err);
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const clearResults = () => {
    setResult(null);
    setGenerationResult(null);
    setCrossResult(null);
  };

  const handleCopy = async () => {
    let textToCopy = '';
    
    if (result) {
      textToCopy = `Corporate Says: ${result.original}\n\nActually Means: ${result.translation}`;
    } else if (generationResult) {
      textToCopy = `New Word: ${generationResult.word}\n\nMeaning: ${generationResult.meaning}\n\nExample: ${generationResult.example}`;
    } else if (crossResult) {
      textToCopy = `Original: ${crossResult.original}\n\nTranslated: ${crossResult.translated}\n\nMeaning: ${crossResult.meaning}`;
    }
    
    try {
      await navigator.clipboard.writeText(textToCopy);
      toast.success('Copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy to clipboard');
    }
  };

  const handleClear = () => {
    setInputText('');
    clearResults();
    setError('');
  };

  const currentMode = modes.find(m => m.id === mode);
  const requiresInput = ['decode', 'decode-genz', 'genz-to-corporate', 'corporate-to-genz'].includes(mode);
  const allowsInput = ['decode', 'decode-genz', 'genz-to-corporate', 'corporate-to-genz', 'generate-corporate', 'generate-genz'].includes(mode);
  const hasResult = result || generationResult || crossResult;
  
  // Check if current mode is allowed for guests
  const isModeAllowed = isLoggedIn || currentMode?.guestAllowed;

  return (
    <div className="space-y-6">
      {!isLoggedIn && (
        quotaInfo.remaining <= 2 && (
          <UsageAlert 
            translationsLeft={quotaInfo.remaining} 
            onUpgrade={onUpgrade}
            isLoggedIn={false}
            isWeeklyLimit={false}
          />
        )
      )}
      
      {isLoggedIn && (
        quotaInfo.remaining <= 2 && (
          <UsageAlert 
            translationsLeft={quotaInfo.remaining} 
            onUpgrade={onUpgrade}
            isLoggedIn={true}
            isWeeklyLimit={quotaInfo.isWeeklyLimit}
          />
        )
      )}
      
      {/* Mode Selection */}
      <Card className="bg-gray-900/90 backdrop-blur-sm border-gray-600/50">
        <CardHeader>
          <h2 className="text-2xl font-bold text-white">Choose Your Mode</h2>
          <p className="text-sm text-gray-100">
            Decode corporate speak, generate new words, or translate between cultures
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {modes.map((modeOption) => {
              const isDisabled = !isLoggedIn && !modeOption.guestAllowed;
              const buttonContent = (
                <button
                  key={modeOption.id}
                  onClick={() => {
                    if (isDisabled) return;
                    setMode(modeOption.id as TranslationMode);
                    clearResults();
                    setError('');
                  }}
                  className={`p-4 rounded-lg border transition-all text-left ${
                    mode === modeOption.id && !isDisabled
                      ? 'bg-gradient-to-r from-purple-600/60 to-pink-600/60 border-purple-400/80 text-white shadow-lg'
                      : isDisabled
                      ? 'bg-gray-800/30 border-gray-700/30 text-gray-500 cursor-not-allowed opacity-50'
                      : 'bg-gray-800/60 border-gray-600/50 text-white/90 hover:bg-purple-600/20 hover:text-white cursor-pointer'
                  }`}
                  disabled={isDisabled}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <modeOption.icon className={`w-5 h-5 ${isDisabled ? 'text-gray-500' : ''}`} />
                    <span className="font-medium">{modeOption.label}</span>
                    {isDisabled && (
                      <span className="ml-auto text-xs bg-purple-600/30 text-purple-200 px-2 py-1 rounded-full">
                        Pro
                      </span>
                    )}
                  </div>
                  <p className={`text-xs ${isDisabled ? 'text-gray-600' : 'text-white/70'}`}>
                    {modeOption.description}
                  </p>
                </button>
              );
              
              return isDisabled ? (
                <Tooltip 
                  key={modeOption.id}
                  content="Upgrade to Pro to unlock this feature"
                >
                  {buttonContent}
                </Tooltip>
              ) : buttonContent;
            })}
          </div>
        </CardContent>
      </Card>
      
      {/* Input Form */}
      <Card className="bg-gray-900/90 backdrop-blur-sm border-gray-600/50">
        <CardHeader>
          <div className="flex items-center gap-3">
            {currentMode && <currentMode.icon className="w-6 h-6 text-purple-400" />}
            <div>
              <h2 className="text-xl font-bold text-white">{currentMode?.label}</h2>
              <p className="text-sm text-white/80">{currentMode?.description}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {allowsInput && (
            <Textarea
              placeholder={
                mode === 'decode' ? "Paste or type your corporate message..." :
                mode === 'decode-genz' ? "Enter GenZ slang to decode..." :
                mode === 'genz-to-corporate' ? "Enter GenZ slang to translate..." :
                mode === 'corporate-to-genz' ? "Enter corporate speak to translate..." :
                mode === 'generate-corporate' ? "Describe the scenario or meaning you want a new corporate word for..." :
                "Describe the scenario or meaning you want a new GenZ word for..."
              }
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              rows={4}
              className="min-h-[120px] bg-gray-800/70 border-gray-600/60 text-white/95 placeholder-white/50 focus:bg-gray-800/80 focus:border-purple-500/70"
              error={error}
            />
          )}
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleAction}
              loading={loading}
              disabled={(requiresInput && !inputText.trim()) || !isModeAllowed || !quotaInfo.canTranslate}
              className="w-full sm:flex-1"
            >
              {currentMode?.icon && <currentMode.icon className="w-4 h-4 mr-2" />}
              {loading ? 'Processing...' : 
                mode === 'decode' ? 'Decode' :
                mode === 'decode-genz' ? 'Decode' :
                mode === 'generate-corporate' ? 'Generate Corporate Word' :
                mode === 'generate-genz' ? 'Generate GenZ Slang' :
                'Translate'
              }
            </Button>
            
            {(inputText || hasResult) && (
              <Button
                variant="outline"
                onClick={handleClear}
                className="w-full sm:flex-1 text-white border-purple-500/60 hover:bg-purple-600/30"
              >
                Clear
              </Button>
            )}
          </div>
          
          {(mode === 'generate-corporate' || mode === 'generate-genz') && (
            <Button
              onClick={() => {
                setInputText('');
                handleAction();
              }}
              loading={loading}
              variant="secondary"
              className="w-full"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Ask AI to Generate
            </Button>
          )}
          
          {mode === 'decode' && <ExamplePhrases onPhraseClick={handleExampleClick} onQuotaExhausted={onQuotaExhausted} />}
          
          {mode === 'decode-genz' && (
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-white/90">Try these GenZ examples:</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "That's so slay",
                  "No cap, that's bussin",
                  "It's giving main character energy",
                  "That's lowkey fire",
                  "She's the moment",
                  "This is sending me",
                  "That's so cheugy",
                  "It's giving ick"
                ].map((example, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (!quotaInfo.canTranslate) {
                        onQuotaExhausted?.();
                        return;
                      }
                      handleExampleClick(example);
                    }}
                    className="cursor-pointer bg-purple-600/30 text-white/95 border border-purple-500/60 hover:bg-purple-600/50 hover:text-white transition-colors px-3 py-1 rounded-full text-xs font-medium"
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results */}
      {result && (
        <Card className="bg-gray-900/90 backdrop-blur-sm border-gray-600/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Translation Result</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                className="border-purple-500/60 text-white hover:bg-purple-600/30"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-red-500/15 border border-red-400/30 rounded-lg">
              <h4 className="font-medium text-red-200 mb-2">
                {mode === 'decode-genz' ? 'GenZ Says:' : 'Corporate Says:'}
              </h4>
              <p className="text-white">{result.original}</p>
            </div>
            
            <div className="p-4 bg-green-500/15 border border-green-400/30 rounded-lg">
              <h4 className="font-medium text-green-200 mb-2">Actually Means:</h4>
              <p className="text-white">{result.translation}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {generationResult && (
        <Card className="bg-gray-900/90 backdrop-blur-sm border-gray-600/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">
                {mode === 'generate-corporate' ? 'New Corporate Buzzword' : 'New GenZ Slang'}
              </h3>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                className="border-purple-500/60 text-white hover:bg-purple-600/30"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-purple-500/15 border border-purple-400/30 rounded-lg">
              <h4 className="font-medium text-purple-200 mb-2">New Word:</h4>
              <p className="text-white text-xl font-bold">{generationResult.word}</p>
            </div>
            
            <div className="p-4 bg-blue-500/15 border border-blue-400/30 rounded-lg">
              <h4 className="font-medium text-blue-200 mb-2">Meaning:</h4>
              <p className="text-white">{generationResult.meaning}</p>
            </div>
            
            <div className="p-4 bg-green-500/15 border border-green-400/30 rounded-lg">
              <h4 className="font-medium text-green-200 mb-2">Example Usage:</h4>
              <p className="text-white italic">"{generationResult.example}"</p>
            </div>
          </CardContent>
        </Card>
      )}

      {crossResult && (
        <Card className="bg-gray-900/90 backdrop-blur-sm border-gray-600/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Cross-Cultural Translation</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                className="border-purple-500/60 text-white hover:bg-purple-600/30"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-orange-500/15 border border-orange-400/30 rounded-lg">
              <h4 className="font-medium text-orange-200 mb-2">Original:</h4>
              <p className="text-white">{crossResult.original}</p>
            </div>
            
            <div className="p-4 bg-cyan-500/15 border border-cyan-400/30 rounded-lg">
              <h4 className="font-medium text-cyan-200 mb-2">Translated:</h4>
              <p className="text-white">{crossResult.translated}</p>
            </div>
            
            <div className="p-4 bg-green-500/15 border border-green-400/30 rounded-lg">
              <h4 className="font-medium text-green-200 mb-2">What It Actually Means:</h4>
              <p className="text-white">{crossResult.meaning}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* CTA for Signup */}
      {hasResult && !isLoggedIn && (
        <div className="bg-gradient-to-r from-purple-500/25 to-pink-500/25 border border-purple-400/40 rounded-lg p-4 mt-6">
          <div className="text-center">
            <p className="text-white font-medium mb-2">
              Love bridging generations? Create a free account for more translations and unlock viral word creation!
            </p>
            <Button 
              variant="secondary" 
              size="sm"
              onClick={() => {
                if (onUpgrade) {
                  onUpgrade();
                } else if (onLogin) {
                  onLogin();
                }
              }}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              {shouldShowUpgrade ? 'Upgrade to Pro' : 'Sign Up Free'}
            </Button>
          </div>
        </div>
      )}
      
      {/* Quota Modal */}
      <QuotaModal
        isOpen={showQuotaModal}
        onClose={() => setShowQuotaModal(false)}
        type={quotaModalType}
        onLogin={() => {
          setShowQuotaModal(false);
          onLogin?.();
        }}
        onUpgrade={() => {
          setShowQuotaModal(false);
          onUpgrade?.();
        }}
      />
    </div>
  );
}