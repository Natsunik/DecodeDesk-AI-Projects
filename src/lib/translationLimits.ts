// Translation limits and quota management
export interface TranslationQuota {
  guestUsed: number;
  userUsed: number;
  weekStartDate: string;
  firstTranslationDate?: string;
}

export interface UserQuotaInfo {
  canTranslate: boolean;
  remaining: number;
  total: number;
  isWeeklyLimit?: boolean;
  daysUntilReset?: number;
}

const GUEST_LIMIT = 8;
const USER_WEEKLY_LIMIT = 5;
const TOTAL_WEEKLY_LIMIT = 13; // 3 guest + 3 user if used guest first

// Get current week start date (Monday)
function getWeekStartDate(): string {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  const monday = new Date(now);
  monday.setDate(now.getDate() - daysToMonday);
  monday.setHours(0, 0, 0, 0);
  return monday.toISOString();
}

// Check if a week has passed since the given date
function hasWeekPassed(dateString: string): boolean {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = now.getTime() - date.getTime();
  const diffDays = diffTime / (1000 * 60 * 60 * 24);
  return diffDays >= 7;
}

// Get guest quota from localStorage
export function getGuestQuota(): TranslationQuota {
  try {
    const stored = localStorage.getItem('decodedesk_guest_quota');
    if (stored) {
      const quota = JSON.parse(stored);
      
      // Check if we need to reset based on first translation date
      if (quota.firstTranslationDate && hasWeekPassed(quota.firstTranslationDate)) {
        const resetQuota = {
          guestUsed: 0,
          userUsed: 0,
          weekStartDate: getWeekStartDate(),
          firstTranslationDate: undefined
        };
        localStorage.setItem('decodedesk_guest_quota', JSON.stringify(resetQuota));
        return resetQuota;
      }
      
      return quota;
    }
  } catch (error) {
    console.error('Error reading guest quota:', error);
  }
  
  // Default quota
  const defaultQuota = {
    guestUsed: 0,
    userUsed: 0,
    weekStartDate: getWeekStartDate()
  };
  localStorage.setItem('decodedesk_guest_quota', JSON.stringify(defaultQuota));
  return defaultQuota;
}

// Update guest quota
export function updateGuestQuota(guestUsed: number, userUsed: number = 0): void {
  const quota = getGuestQuota();
  const now = new Date().toISOString();
  
  const updatedQuota: TranslationQuota = {
    guestUsed,
    userUsed,
    weekStartDate: getWeekStartDate(),
    firstTranslationDate: quota.firstTranslationDate || (guestUsed > 0 || userUsed > 0 ? now : undefined)
  };
  
  localStorage.setItem('decodedesk_guest_quota', JSON.stringify(updatedQuota));
}

// Migrate guest quota to user on login
export function migrateGuestToUser(): void {
  const quota = getGuestQuota();
  
  // If user had guest translations, they get limited to 6 total
  // If no guest translations, they get full 5 user translations
  if (quota.guestUsed > 0) {
    // Keep guest count, reset user count
    updateGuestQuota(quota.guestUsed, 0);
  } else {
    // Reset everything for fresh start
    updateGuestQuota(0, 0);
  }
}

// Check if guest can translate
export function canGuestTranslate(): boolean {
  const quota = getGuestQuota();
  return quota.guestUsed < GUEST_LIMIT;
}

// Check if user can translate (considering guest usage)
export function canUserTranslate(isLoggedIn: boolean): UserQuotaInfo {
  if (!isLoggedIn) {
    const quota = getGuestQuota();
    return {
      canTranslate: quota.guestUsed < GUEST_LIMIT,
      remaining: GUEST_LIMIT - quota.guestUsed,
      total: GUEST_LIMIT,
      isWeeklyLimit: false
    };
  }
  
  const quota = getGuestQuota();
  const totalUsed = quota.guestUsed + quota.userUsed;
  
  // Determine limit based on whether guest quota was used
  const limit = quota.guestUsed > 0 ? TOTAL_WEEKLY_LIMIT : USER_WEEKLY_LIMIT;
  const daysUntilReset = getDaysUntilReset();
  
  return {
    canTranslate: totalUsed < limit,
    remaining: limit - totalUsed,
    total: limit,
    isWeeklyLimit: true,
    daysUntilReset
  };
}

// Increment translation count
export function incrementTranslationCount(isLoggedIn: boolean): void {
  const quota = getGuestQuota();
  
  if (!isLoggedIn) {
    updateGuestQuota(quota.guestUsed + 1, quota.userUsed);
  } else {
    updateGuestQuota(quota.guestUsed, quota.userUsed + 1);
  }
}

// Get days until quota reset
export function getDaysUntilReset(): number {
  const quota = getGuestQuota();
  
  if (!quota.firstTranslationDate) {
    return 7; // Full week if no translations yet
  }
  
  const firstTranslation = new Date(quota.firstTranslationDate);
  const resetDate = new Date(firstTranslation);
  resetDate.setDate(firstTranslation.getDate() + 7);
  
  const now = new Date();
  const diffTime = resetDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return Math.max(0, diffDays);
}

// Reset quota (for testing or manual reset)
export function resetQuota(): void {
  localStorage.removeItem('decodedesk_guest_quota');
  localStorage.removeItem('decodedesk_session');
  console.log('✅ All quota data and session cookies have been reset!');
}

// Call reset quota immediately when this module loads (for development)
if (typeof window !== 'undefined') {
  // Uncomment the line below to auto-reset quota on page load (for testing)
  // resetQuota();
}

// Get quota summary for display
export function getQuotaSummary(isLoggedIn: boolean): {
  used: number;
  total: number;
  remaining: number;
  resetIn: number;
  type: 'guest' | 'user';
} {
  const quota = getGuestQuota();
  const info = canUserTranslate(isLoggedIn);
  
  return {
    used: quota.guestUsed + quota.userUsed,
    total: info.total,
    remaining: info.remaining,
    resetIn: getDaysUntilReset(),
    type: isLoggedIn ? 'user' : 'guest'
  };
}