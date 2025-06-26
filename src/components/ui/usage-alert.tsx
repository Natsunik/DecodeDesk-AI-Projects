import React from 'react';
import { AlertTriangle, Calendar, Zap } from 'lucide-react';
import { Button } from '../Button';
import { getDaysUntilReset } from '../../lib/translationLimits';

interface UsageAlertProps {
  translationsLeft: number;
  onUpgrade?: () => void;
  isLoggedIn?: boolean;
  isWeeklyLimit?: boolean;
}

export function UsageAlert({ translationsLeft, onUpgrade, isLoggedIn = false, isWeeklyLimit = false }: UsageAlertProps) {
  const daysUntilReset = getDaysUntilReset();
  
  // Only show alert when getting close to limit
  if (translationsLeft > 2) return null;

  const getAlertColor = () => {
    if (translationsLeft === 0) return 'bg-red-500/30 border-red-400/60';
    if (translationsLeft === 1) return 'bg-orange-500/30 border-orange-400/60';
    return 'bg-yellow-500/30 border-yellow-400/60';
  };

  const getIcon = () => {
    if (translationsLeft === 0) return <AlertTriangle className="w-5 h-5 text-red-200" />;
    if (isWeeklyLimit) return <Calendar className="w-5 h-5 text-yellow-200" />;
    return <Zap className="w-5 h-5 text-yellow-200" />;
  };

  const getMessage = () => {
    if (translationsLeft === 0) {
      return isLoggedIn 
        ? "You've reached your weekly limit. Upgrade to Pro or wait for reset."
        : "You've used all free translations. Login for more or upgrade to Pro.";
    }
    
    const baseMessage = `You have ${translationsLeft} translation${translationsLeft !== 1 ? 's' : ''} left`;
    
    if (isLoggedIn && isWeeklyLimit) {
      return `${baseMessage} this week. Resets in ${daysUntilReset} day${daysUntilReset !== 1 ? 's' : ''}.`;
    }
    
    return `${baseMessage}. ${isLoggedIn ? 'Upgrade for unlimited access!' : 'Login for more free translations!'}`;
  };

  return (
    <div className={`${getAlertColor()} rounded-lg p-4 mb-6`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {getIcon()}
          <div>
            <p className="text-sm font-medium text-white/95">
              {getMessage()}
            </p>
            {isLoggedIn && isWeeklyLimit && translationsLeft > 0 && (
              <p className="text-xs text-white/80 mt-1">
                Your quota resets in {daysUntilReset} day{daysUntilReset !== 1 ? 's' : ''}
              </p>
            )}
          </div>
        </div>
        <Button 
          size="sm" 
          onClick={onUpgrade || (() => {})}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
        >
          {isLoggedIn ? 'Login' : 'Upgrade'}
        </Button>
      </div>
    </div>
  );
}