// Admin functions for user management
// WARNING: These functions should only be used by authorized administrators

import { supabase } from './supabase';

export interface UserSubscriptionUpdate {
  email: string;
  subscriptionPlan: 'free' | 'pro' | 'team';
  translationsLimit?: number;
  translationsUsed?: number;
}

// Grant pro access to a user by email
export async function grantProAccess(email: string): Promise<{ success: boolean; message: string }> {
  try {
    // First, check if user exists
    const { data: existingUser, error: findError } = await supabase
      .from('users')
      .select('id, email, subscription_plan')
      .eq('email', email)
      .single();

    if (findError || !existingUser) {
      return {
        success: false,
        message: `User with email ${email} not found. They need to sign up first.`
      };
    }

    // Update user to pro plan
    const { error: updateError } = await supabase
      .from('users')
      .update({
        subscription_plan: 'pro',
        translations_limit: 999999, // Unlimited for pro
        translations_used: 0, // Reset usage
        updated_at: new Date().toISOString()
      })
      .eq('email', email);

    if (updateError) {
      console.error('Error updating user subscription:', updateError);
      return {
        success: false,
        message: `Failed to update subscription: ${updateError.message}`
      };
    }

    // Create subscription record
    const { error: subscriptionError } = await supabase
      .from('subscriptions')
      .insert({
        user_id: existingUser.id,
        plan_name: 'pro',
        price_monthly: 10.00,
        status: 'active',
        current_period_start: new Date().toISOString(),
        current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days from now
      });

    if (subscriptionError) {
      console.warn('Failed to create subscription record:', subscriptionError);
      // Don't fail the whole operation for this
    }

    return {
      success: true,
      message: `Successfully granted Pro access to ${email}`
    };

  } catch (error) {
    console.error('Error in grantProAccess:', error);
    return {
      success: false,
      message: `Unexpected error: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
}

// Revoke pro access (downgrade to free)
export async function revokeProAccess(email: string): Promise<{ success: boolean; message: string }> {
  try {
    const { data: existingUser, error: findError } = await supabase
      .from('users')
      .select('id, email')
      .eq('email', email)
      .single();

    if (findError || !existingUser) {
      return {
        success: false,
        message: `User with email ${email} not found.`
      };
    }

    // Update user to free plan
    const { error: updateError } = await supabase
      .from('users')
      .update({
        subscription_plan: 'free',
        translations_limit: 10, // Free plan limit
        translations_used: 0, // Reset usage
        updated_at: new Date().toISOString()
      })
      .eq('email', email);

    if (updateError) {
      return {
        success: false,
        message: `Failed to update subscription: ${updateError.message}`
      };
    }

    // Deactivate subscription records
    await supabase
      .from('subscriptions')
      .update({ status: 'cancelled' })
      .eq('user_id', existingUser.id);

    return {
      success: true,
      message: `Successfully revoked Pro access for ${email}`
    };

  } catch (error) {
    return {
      success: false,
      message: `Unexpected error: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
}

// List all users with their subscription status
export async function listUsers(): Promise<{ success: boolean; users?: any[]; message: string }> {
  try {
    const { data: users, error } = await supabase
      .from('users')
      .select(`
        id,
        email,
        full_name,
        subscription_plan,
        translations_used,
        translations_limit,
        created_at,
        updated_at
      `)
      .order('created_at', { ascending: false });

    if (error) {
      return {
        success: false,
        message: `Failed to fetch users: ${error.message}`
      };
    }

    return {
      success: true,
      users: users || [],
      message: `Found ${users?.length || 0} users`
    };

  } catch (error) {
    return {
      success: false,
      message: `Unexpected error: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
}

// Admin console function - USE WITH CAUTION
export async function adminConsole() {
  console.log('🔧 DecodeDesk Admin Console');
  console.log('Available functions:');
  console.log('- grantProAccess(email)');
  console.log('- revokeProAccess(email)');
  console.log('- listUsers()');
  console.log('');
  console.log('Example usage:');
  console.log('await grantProAccess("nikhil.singh@gmail.com")');
  
  // Grant pro access to the specified email
  const result = await grantProAccess('nikhil.singh@gmail.com');
  console.log('Result:', result);
  
  return result;
}

// Export for browser console access (development only)
if (typeof window !== 'undefined') {
  (window as any).adminConsole = adminConsole;
  (window as any).grantProAccess = grantProAccess;
  (window as any).revokeProAccess = revokeProAccess;
  (window as any).listUsers = listUsers;
}