/**
 * Subscription Optimization System
 * Smart pricing, retention, and management for recurring revenue
 */

import { getProductPrice, formatCurrencyValue } from './pricing';
import { PaymentLinkKey } from './payment-links';

export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  billingPeriod: 'monthly' | 'quarterly' | 'biannual';
  price: number;
  savingsPercentage: number;
  features: string[];
  retentionRate: number; // Expected retention rate
  priority: number; // Sort order
}

export interface RetentionTrigger {
  day: number;
  type: 'reminder' | 'discount' | 'pause' | 'cancel';
  subject: string;
  message: string;
  discount?: {
    code: string;
    percentage: number;
  };
}

export interface SubscriptionAnalytics {
  planId: string;
  startDate: Date;
  nextBillingDate: Date;
  lifetimeValue: number;
  churnRisk: number; // 0-1, higher = more likely to cancel
  lastInteractionDays?: number;
  supportTickets?: number;
  deliveryIssues?: number;
  pauseCount?: number;
  paymentFailures?: number;
  usageFrequency?: 'low' | 'medium' | 'high';
}

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'monthly',
    name: 'Monthly Subscription',
    description: 'Flexibility to pause or cancel anytime',
    billingPeriod: 'monthly',
    price: getProductPrice('familyAutoship') / 3, // Quarterly price divided by 3
    savingsPercentage: 10,
    features: [
      'Delivered every month',
      'Pause or cancel anytime',
      'Free shipping included',
      'Email reminders before delivery',
      'Priority customer support'
    ],
    retentionRate: 0.65,
    priority: 1
  },
  {
    id: 'quarterly',
    name: 'Quarterly Subscription - BEST VALUE',
    description: 'Most popular - Save 20% with quarterly billing',
    billingPeriod: 'quarterly',
    price: getProductPrice('familyAutoship'),
    savingsPercentage: 20,
    features: [
      'Delivered every 3 months',
      'Save 20% vs monthly',
      'FREE shipping always',
      'Bonus scoop included',
      'VIP customer support',
      'Early access to new products'
    ],
    retentionRate: 0.90,
    priority: 2
  },
  {
    id: 'biannual',
    name: 'Bi-Annual Subscription - MAXIMUM SAVINGS',
    description: 'Commit longer, save more - Best for multi-cat homes',
    billingPeriod: 'biannual',
    price: getProductPrice('familyAutoship') * 1.8, // 10% additional discount
    savingsPercentage: 30,
    features: [
      'Delivered every 6 months',
      'Save 30% vs monthly',
      'FREE express shipping',
      'FREE premium scoop',
      'FREE odor spray',
      'Dedicated account manager',
      'Exclusive member benefits'
    ],
    retentionRate: 0.95,
    priority: 3
  }
];

export const RETENTION_TRIGGERS: RetentionTrigger[] = [
  {
    day: 25,
    type: 'reminder',
    subject: 'Your Purrify is running low 🐱',
    message: 'Your next delivery is scheduled soon. Need to make changes? You can pause, skip, or modify anytime.'
  },
  {
    day: 40,
    type: 'discount',
    subject: 'Exclusive: 15% off your next delivery!',
    message: 'As a valued subscriber, enjoy 15% off your next order. Use code SUBSCRIBER15 at checkout.',
    discount: {
      code: 'SUBSCRIBER15',
      percentage: 15
    }
  },
  {
    day: 60,
    type: 'reminder',
    subject: 'Upgrade & save even more',
    message: 'Love Purrify? Upgrade to quarterly billing and save 20% instantly. Reply to upgrade.'
  },
  {
    day: 80,
    type: 'pause',
    subject: 'Going on vacation? Pause your delivery',
    message: 'No worries! You can pause your subscription for up to 3 months. Just let us know.'
  },
  {
    day: 90,
    type: 'discount',
    subject: 'We miss you! 25% off to come back',
    message: 'It looks like you might be running low. Come back with 25% off using code COMEBACK25.',
    discount: {
      code: 'COMEBACK25',
      percentage: 25
    }
  }
];

export class SubscriptionOptimizer {
  /**
   * Get the optimal subscription plan for a customer based on their profile
   */
  static getOptimalPlan(customerProfile: {
    numberOfCats: number;
    householdSize: number;
    budget: 'low' | 'medium' | 'high';
    commitmentLevel: 'low' | 'medium' | 'high';
  }): SubscriptionPlan {
    const { numberOfCats, budget, commitmentLevel } = customerProfile;

    // Multi-cat households benefit most from quarterly/biannual
    if (numberOfCats >= 2) {
      if (commitmentLevel === 'high' && budget === 'high') {
        return SUBSCRIPTION_PLANS.find(p => p.id === 'biannual')!;
      }
      return SUBSCRIPTION_PLANS.find(p => p.id === 'quarterly')!;
    }

    // Single cat households - recommend based on commitment
    if (commitmentLevel === 'high') {
      return SUBSCRIPTION_PLANS.find(p => p.id === 'quarterly')!;
    }

    return SUBSCRIPTION_PLANS.find(p => p.id === 'monthly')!;
  }

  /**
   * Calculate lifetime value for a subscription
   */
  static calculateLTV(plan: SubscriptionPlan, months: number = 12): number {
    const monthlyPrice = plan.billingPeriod === 'quarterly' 
      ? plan.price / 3 
      : plan.billingPeriod === 'biannual'
      ? plan.price / 6
      : plan.price;

    // Account for retention rate decay
    let totalValue = 0;
    let retentionProbability = 1;

    for (let month = 1; month <= months; month++) {
      totalValue += monthlyPrice * retentionProbability;
      
      // Apply monthly retention decay
      retentionProbability *= plan.retentionRate;
    }

    return Math.round(totalValue);
  }

  /**
   * Get retention triggers for a specific day in the subscription lifecycle
   */
  static getRetentionTriggers(day: number): RetentionTrigger[] {
    return RETENTION_TRIGGERS.filter(trigger => trigger.day === day);
  }

  /**
   * Calculate churn risk based on user behavior
   */
  static calculateChurnRisk(analytics: Partial<SubscriptionAnalytics>): number {
    let riskScore = 0;

    // Days since last interaction
    if (analytics.lastInteractionDays) {
      if (analytics.lastInteractionDays > 30) riskScore += 0.3;
      else if (analytics.lastInteractionDays > 14) riskScore += 0.2;
    }

    // Support tickets opened
    if (analytics.supportTickets && analytics.supportTickets > 2) {
      riskScore += 0.25;
    }

    // Payment failures
    if (analytics.paymentFailures && analytics.paymentFailures > 0) {
      riskScore += 0.4;
    }

    // Usage pattern
    if (analytics.usageFrequency === 'low') {
      riskScore += 0.15;
    }

    // Clamp between 0 and 1
    return Math.min(1, Math.max(0, riskScore));
  }

  /**
   * Get upgrade path for a customer
   */
  static getUpgradePath(currentPlanId: string): SubscriptionPlan | null {
    const currentPlan = SUBSCRIPTION_PLANS.find(p => p.id === currentPlanId);
    if (!currentPlan) return null;

    const currentPriority = currentPlan.priority;
    const upgradePlan = SUBSCRIPTION_PLANS
      .filter(p => p.priority > currentPriority)
      .sort((a, b) => a.priority - b.priority)[0];

    return upgradePlan || null;
  }

  /**
   * Calculate savings for upgrading
   */
  static calculateUpgradeSavings(currentPlanId: string, targetPlanId: string, months: number = 12): {
    savings: number;
    percentage: number;
  } {
    const currentPlan = SUBSCRIPTION_PLANS.find(p => p.id === currentPlanId);
    const targetPlan = SUBSCRIPTION_PLANS.find(p => p.id === targetPlanId);

    if (!currentPlan || !targetPlan) {
      return { savings: 0, percentage: 0 };
    }

    const currentLTV = this.calculateLTV(currentPlan, months);
    const targetLTV = this.calculateLTV(targetPlan, months);

    const savings = currentLTV - targetLTV;
    const percentage = Math.round((savings / currentLTV) * 100);

    return { savings, percentage };
  }

  /**
   * Format subscription price for display
   */
  static formatSubscriptionPrice(plan: SubscriptionPlan, locale: string = 'en-CA'): string {
    const monthlyPrice = plan.billingPeriod === 'quarterly'
      ? plan.price / 3
      : plan.billingPeriod === 'biannual'
      ? plan.price / 6
      : plan.price;

    return formatCurrencyValue(monthlyPrice, locale);
  }

  /**
   * Get payment link key for a subscription plan
   */
  static getPaymentLinkKey(planId: string, productId: string = 'family'): PaymentLinkKey | null {
    const plan = SUBSCRIPTION_PLANS.find(p => p.id === planId);
    if (!plan) return null;

    // Map plan to payment link
    const linkMap: Record<string, PaymentLinkKey> = {
      'monthly': `${productId}Autoship` as PaymentLinkKey,
      'quarterly': `${productId}Autoship` as PaymentLinkKey,
      'biannual': `${productId}Autoship` as PaymentLinkKey
    };

    return linkMap[planId] || null;
  }
}

// Export singleton instance
export const subscriptionOptimizer = new SubscriptionOptimizer();
