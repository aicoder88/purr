// Referral tracking utility functions

interface ReferralInfo {
  code: string;
  referrerName?: string;
  claimedAt: string;
}

interface CheckoutReferralData {
  referralCode?: string;
  referrerName?: string;
  isReferralPurchase: boolean;
  refereeEmail?: string;
}

/**
 * Get referral information from localStorage
 */
export function getReferralInfo(): ReferralInfo | null {
  if (typeof window === 'undefined') return null;

  try {
    const referralInfo = localStorage.getItem('referralInfo');
    return referralInfo ? JSON.parse(referralInfo) : null;
  } catch (error) {
    console.error('Error parsing referral info:', error);
    return null;
  }
}

/**
 * Clear referral information from localStorage
 */
export function clearReferralInfo(): void {
  if (typeof window === 'undefined') return;

  localStorage.removeItem('referralInfo');
}

/**
 * Track referral signup when user creates account or provides email
 */
export async function trackReferralSignup(
  email: string,
  userId?: string,
  additionalData?: Record<string, any>
): Promise<void> {
  const referralInfo = getReferralInfo();
  if (!referralInfo) return;

  try {
    await fetch('/api/referrals/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'signup',
        referralCode: referralInfo.code,
        refereeEmail: email,
        refereeId: userId,
        trackingData: {
          source: 'referral_signup',
          medium: 'checkout',
          signedUpAt: new Date().toISOString(),
          ...additionalData
        }
      })
    });

    // Track analytics event
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'referral_signup_completed', {
        event_category: 'referrals',
        event_label: 'user_registration',
        custom_parameter_1: referralInfo.code,
        custom_parameter_2: email
      });
    }

  } catch (error) {
    console.error('Error tracking referral signup:', error);
  }
}

/**
 * Track referral purchase completion
 */
export async function trackReferralPurchase(
  orderId: string,
  orderValue: number,
  customerEmail: string,
  customerId?: string,
  orderDetails?: any
): Promise<void> {
  const referralInfo = getReferralInfo();
  if (!referralInfo) return;

  try {
    const response = await fetch('/api/referrals/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'purchase',
        referralCode: referralInfo.code,
        refereeEmail: customerEmail,
        refereeId: customerId,
        orderId,
        orderValue,
        trackingData: {
          source: 'referral_purchase',
          medium: 'checkout',
          completedAt: new Date().toISOString(),
          orderDetails
        }
      })
    });

    const result = await response.json();

    if (result.success) {
      // Clear referral info after successful tracking
      clearReferralInfo();

      // Track analytics event
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'referral_purchase_completed', {
          event_category: 'referrals',
          event_label: 'purchase_conversion',
          value: orderValue,
          custom_parameter_1: referralInfo.code,
          custom_parameter_2: customerEmail
        });

        // Track purchase event
        window.gtag('event', 'purchase', {
          transaction_id: orderId,
          value: orderValue,
          currency: 'CAD',
          custom_parameter_1: 'referral_purchase',
          custom_parameter_2: referralInfo.code
        });
      }

      // Show success notification if rewards were issued
      if (result.rewardEligible && result.rewards) {
        showReferralSuccessNotification(referralInfo.referrerName, result.rewards);
      }
    }

  } catch (error) {
    console.error('Error tracking referral purchase:', error);
  }
}

/**
 * Get checkout referral data for display and processing
 */
export function getCheckoutReferralData(customerEmail?: string): CheckoutReferralData {
  const referralInfo = getReferralInfo();

  return {
    referralCode: referralInfo?.code,
    referrerName: referralInfo?.referrerName,
    isReferralPurchase: !!referralInfo,
    refereeEmail: customerEmail
  };
}

/**
 * Apply referral discount to cart items
 */
export function applyReferralDiscountToCart(cartItems: any[]): any[] {
  const referralInfo = getReferralInfo();
  if (!referralInfo) return cartItems;

  // Check if free trial is already in cart
  const hasReferralTrial = cartItems.some(item =>
    item.isReferralReward ||
    item.referralCode ||
    (item.price === 0 && item.name?.includes('FREE'))
  );

  if (hasReferralTrial) {
    return cartItems;
  }

  // Add free 17g trial to cart
  const freeTrialItem = {
    id: 'purrify-17g-referral',
    name: 'Purrify 17g Trial Size - FREE (Referral Reward)',
    price: 0,
    originalPrice: 6.99,
    quantity: 1,
    image: '/optimized/20g.webp',
    isReferralReward: true,
    referralCode: referralInfo.code,
    description: `Free trial thanks to ${referralInfo.referrerName}`,
    sku: 'PURRIFY-17G-REF'
  };

  return [...cartItems, freeTrialItem];
}

/**
 * Show referral success notification
 */
function showReferralSuccessNotification(referrerName?: string, rewards?: any): void {
  if (typeof window === 'undefined') return;

  // Create and show a toast notification
  const notification = document.createElement('div');
  notification.className = 'fixed top-4 right-4 z-50 bg-green-500 text-white p-4 rounded-lg shadow-lg max-w-sm';
  notification.innerHTML = `
    <div class="flex items-center space-x-2">
      <div class="w-6 h-6">
        🎉
      </div>
      <div>
        <p class="font-bold">Referral Rewards Issued!</p>
        <p class="text-sm">
          ${referrerName ? `${referrerName} earned a reward` : 'Referrer rewarded'}
          for sharing Purrify with you!
        </p>
      </div>
    </div>
  `;

  document.body.appendChild(notification);

  // Remove notification after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.parentNode.removeChild(notification);
    }
  }, 5000);
}

/**
 * Generate referral code for new users
 */
export async function generateReferralCode(
  userId: string,
  userName: string,
  userEmail: string
): Promise<string | null> {
  try {
    const response = await fetch('/api/referrals/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId,
        userName,
        email: userEmail
      })
    });

    const data = await response.json();

    if (data.success) {
      return data.data.code;
    }

    return null;
  } catch (error) {
    console.error('Error generating referral code:', error);
    return null;
  }
}

/**
 * Validate if user is eligible for referral program
 */
export function isEligibleForReferrals(
  userEmail: string,
  userId?: string
): boolean {
  // Check if user has made previous purchases (basic check)
  // In production, this would check against user purchase history

  const referralInfo = getReferralInfo();

  // Don't allow self-referrals
  if (referralInfo && referralInfo.referrerName === userEmail) {
    return false;
  }

  return true;
}

/**
 * Get referral statistics for user dashboard
 */
export async function getUserReferralStats(userId: string) {
  try {
    const response = await fetch(`/api/referrals/dashboard/${userId}`);
    const data = await response.json();

    if (data.success) {
      return data.data;
    }

    return null;
  } catch (error) {
    console.error('Error fetching referral stats:', error);
    return null;
  }
}