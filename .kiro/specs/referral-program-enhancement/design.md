# Design Document

## Overview

The Referral Program Enhancement system provides a comprehensive referral marketing solution with unique referral links, conversion tracking, tiered rewards, fraud detection, and performance analytics. The system integrates with the existing Stripe payment system and customer database to automate reward distribution and track referral performance.

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Customer Dashboard                        │
│              (Referral Link Generation)                      │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                  Referral Tracking System                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Referral   │  │  Conversion  │  │    Reward    │     │
│  │   Manager    │  │   Tracker    │  │  Processor   │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │    Fraud     │  │     Tier     │  │  Analytics   │     │
│  │  Detection   │  │   Manager    │  │    Engine    │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│              Database (Prisma + PostgreSQL)                  │
│  Referrals | Conversions | Rewards | Tiers                  │
└─────────────────────────────────────────────────────────────┘
```

## Components and Interfaces

### 1. Referral Manager

**Purpose**: Generate and manage referral links

**Interface**:
```typescript
interface ReferralCode {
  id: string;
  code: string;
  customerId: string;
  createdAt: Date;
  expiresAt?: Date;
  isActive: boolean;
}

interface ReferralLink {
  code: string;
  url: string;
  shortUrl?: string;
  qrCode?: string;
}

class ReferralManager {
  async generateCode(customerId: string): Promise<ReferralCode>;
  async regenerateCode(customerId: string): Promise<ReferralCode>;
  async getReferralLink(code: string): Promise<ReferralLink>;
  async validateCode(code: string): Promise<boolean>;
  async deactivateCode(code: string): Promise<void>;
}
```

**Implementation**:
```typescript
import { nanoid } from 'nanoid';

class ReferralManager {
  async generateCode(customerId: string): Promise<ReferralCode> {
    // Check if customer already has a code
    const existing = await prisma.referralCode.findUnique({
      where: { customerId }
    });
    
    if (existing && existing.isActive) {
      return existing;
    }
    
    // Generate unique code
    const code = nanoid(8).toUpperCase();
    
    // Create referral code
    const referralCode = await prisma.referralCode.create({
      data: {
        code,
        customerId,
        isActive: true
      }
    });
    
    return referralCode;
  }
  
  async getReferralLink(code: string): Promise<ReferralLink> {
    const baseUrl = process.env.NEXT_PUBLIC_DOMAIN || 'https://purrify.ca';
    const url = `${baseUrl}?ref=${code}`;
    
    return {
      code,
      url,
      shortUrl: await this.generateShortUrl(url),
      qrCode: await this.generateQRCode(url)
    };
  }
  
  private async generateShortUrl(url: string): Promise<string> {
    // Integrate with URL shortener service
    // For now, return the original URL
    return url;
  }
  
  private async generateQRCode(url: string): Promise<string> {
    // Generate QR code as data URL
    // Implementation using qrcode library
    return 'data:image/png;base64,...';
  }
}
```

### 2. Conversion Tracker

**Purpose**: Track referral clicks and conversions

**Interface**:
```typescript
interface ReferralClick {
  id: string;
  referralCode: string;
  ipAddress: string;
  userAgent: string;
  timestamp: Date;
  converted: boolean;
}

interface ReferralConversion {
  id: string;
  referralCode: string;
  referrerId: string;
  refereeId: string;
  orderId: string;
  orderValue: number;
  rewardAmount: number;
  status: 'pending' | 'approved' | 'rejected' | 'paid';
  createdAt: Date;
}

class ConversionTracker {
  async trackClick(code: string, metadata: ClickMetadata): Promise<void>;
  async trackConversion(code: string, order: Order): Promise<ReferralConversion>;
  async getConversionRate(code: string): Promise<number>;
  async getPendingConversions(referrerId: string): Promise<ReferralConversion[]>;
}
```

**Implementation**:
```typescript
class ConversionTracker {
  async trackClick(code: string, metadata: ClickMetadata): Promise<void> {
    // Store referral code in cookie
    const cookieOptions = {
      maxAge: 30 * 24 * 60 * 60, // 30 days
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const
    };
    
    // Log click
    await prisma.referralClick.create({
      data: {
        referralCode: code,
        ipAddress: metadata.ipAddress,
        userAgent: metadata.userAgent,
        timestamp: new Date()
      }
    });
  }
  
  async trackConversion(code: string, order: Order): Promise<ReferralConversion> {
    // Get referrer
    const referralCode = await prisma.referralCode.findUnique({
      where: { code }
    });
    
    if (!referralCode) {
      throw new Error('Invalid referral code');
    }
    
    // Check if referee is new customer
    const isNewCustomer = await this.isNewCustomer(order.customerId);
    if (!isNewCustomer) {
      throw new Error('Referee is not a new customer');
    }
    
    // Prevent self-referral
    if (referralCode.customerId === order.customerId) {
      throw new Error('Self-referral not allowed');
    }
    
    // Calculate reward based on tier
    const tier = await this.getTier(referralCode.customerId);
    const rewardAmount = this.calculateReward(tier, order.total);
    
    // Create conversion record
    const conversion = await prisma.referralConversion.create({
      data: {
        referralCode: code,
        referrerId: referralCode.customerId,
        refereeId: order.customerId,
        orderId: order.id,
        orderValue: order.total,
        rewardAmount,
        status: 'pending'
      }
    });
    
    return conversion;
  }
  
  private async isNewCustomer(customerId: string): Promise<boolean> {
    const orderCount = await prisma.order.count({
      where: { customerId }
    });
    return orderCount === 1; // First order
  }
}
```

### 3. Reward Processor

**Purpose**: Process and distribute rewards

**Interface**:
```typescript
interface Reward {
  id: string;
  referrerId: string;
  conversionId: string;
  amount: number;
  type: 'credit' | 'discount' | 'cash';
  status: 'pending' | 'approved' | 'paid' | 'expired';
  createdAt: Date;
  paidAt?: Date;
}

class RewardProcessor {
  async processReward(conversion: ReferralConversion): Promise<Reward>;
  async approveReward(rewardId: string): Promise<void>;
  async rejectReward(rewardId: string, reason: string): Promise<void>;
  async distributeReward(reward: Reward): Promise<void>;
  async getAccountBalance(customerId: string): Promise<number>;
}
```

**Implementation**:
```typescript
class RewardProcessor {
  async processReward(conversion: ReferralConversion): Promise<Reward> {
    // Wait for order fulfillment (24 hours)
    const order = await prisma.order.findUnique({
      where: { id: conversion.orderId }
    });
    
    if (order.status !== 'fulfilled') {
      throw new Error('Order not yet fulfilled');
    }
    
    // Create reward
    const reward = await prisma.reward.create({
      data: {
        referrerId: conversion.referrerId,
        conversionId: conversion.id,
        amount: conversion.rewardAmount,
        type: 'credit',
        status: 'approved'
      }
    });
    
    // Distribute reward
    await this.distributeReward(reward);
    
    // Send notification
    await this.sendRewardNotification(reward);
    
    return reward;
  }
  
  async distributeReward(reward: Reward): Promise<void> {
    // Add to customer account balance
    await prisma.customer.update({
      where: { id: reward.referrerId },
      data: {
        accountCredit: {
          increment: reward.amount
        }
      }
    });
    
    // Mark reward as paid
    await prisma.reward.update({
      where: { id: reward.id },
      data: {
        status: 'paid',
        paidAt: new Date()
      }
    });
  }
  
  async getAccountBalance(customerId: string): Promise<number> {
    const customer = await prisma.customer.findUnique({
      where: { id: customerId },
      select: { accountCredit: true }
    });
    
    return customer?.accountCredit || 0;
  }
}
```

### 4. Fraud Detection

**Purpose**: Identify and prevent referral abuse

**Interface**:
```typescript
interface FraudCheck {
  passed: boolean;
  reason?: string;
  riskScore: number;
}

interface FraudRule {
  name: string;
  check: (conversion: ReferralConversion) => Promise<boolean>;
  severity: 'low' | 'medium' | 'high';
}

class FraudDetector {
  private rules: FraudRule[];
  
  async checkConversion(conversion: ReferralConversion): Promise<FraudCheck>;
  async flagSuspicious(conversionId: string, reason: string): Promise<void>;
  async getViolations(customerId: string): Promise<FraudViolation[]>;
}
```

**Implementation**:
```typescript
class FraudDetector {
  private rules: FraudRule[] = [
    {
      name: 'same-ip-address',
      check: async (conversion) => {
        const referrerOrders = await prisma.order.findMany({
          where: { customerId: conversion.referrerId },
          select: { ipAddress: true }
        });
        
        const refereeOrder = await prisma.order.findUnique({
          where: { id: conversion.orderId },
          select: { ipAddress: true }
        });
        
        return !referrerOrders.some(o => o.ipAddress === refereeOrder.ipAddress);
      },
      severity: 'high'
    },
    {
      name: 'same-payment-method',
      check: async (conversion) => {
        const referrerPayments = await prisma.payment.findMany({
          where: { customerId: conversion.referrerId },
          select: { last4: true }
        });
        
        const refereePayment = await prisma.payment.findFirst({
          where: { orderId: conversion.orderId },
          select: { last4: true }
        });
        
        return !referrerPayments.some(p => p.last4 === refereePayment.last4);
      },
      severity: 'high'
    },
    {
      name: 'excessive-referrals',
      check: async (conversion) => {
        const recentConversions = await prisma.referralConversion.count({
          where: {
            referrerId: conversion.referrerId,
            createdAt: {
              gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // Last 7 days
            }
          }
        });
        
        return recentConversions < 20;
      },
      severity: 'medium'
    }
  ];
  
  async checkConversion(conversion: ReferralConversion): Promise<FraudCheck> {
    let riskScore = 0;
    const failedRules: string[] = [];
    
    for (const rule of this.rules) {
      const passed = await rule.check(conversion);
      
      if (!passed) {
        failedRules.push(rule.name);
        riskScore += rule.severity === 'high' ? 50 : rule.severity === 'medium' ? 25 : 10;
      }
    }
    
    const passed = riskScore < 50;
    
    if (!passed) {
      await this.flagSuspicious(conversion.id, failedRules.join(', '));
    }
    
    return {
      passed,
      reason: failedRules.length > 0 ? `Failed rules: ${failedRules.join(', ')}` : undefined,
      riskScore
    };
  }
}
```

### 5. Tier Manager

**Purpose**: Manage referral tiers and rewards

**Interface**:
```typescript
interface ReferralTier {
  name: 'bronze' | 'silver' | 'gold';
  minReferrals: number;
  maxReferrals?: number;
  rewardAmount: number;
  benefits: string[];
}

class TierManager {
  private tiers: ReferralTier[] = [
    {
      name: 'bronze',
      minReferrals: 0,
      maxReferrals: 4,
      rewardAmount: 10,
      benefits: ['$10 per referral', 'Standard processing']
    },
    {
      name: 'silver',
      minReferrals: 5,
      maxReferrals: 14,
      rewardAmount: 15,
      benefits: ['$15 per referral', 'Priority support', 'Exclusive offers']
    },
    {
      name: 'gold',
      minReferrals: 15,
      rewardAmount: 20,
      benefits: ['$20 per referral', 'VIP support', 'Early access', 'Special recognition']
    }
  ];
  
  async getTier(customerId: string): Promise<ReferralTier>;
  async checkTierUpgrade(customerId: string): Promise<ReferralTier | null>;
  async upgradeTier(customerId: string, newTier: ReferralTier): Promise<void>;
}
```

### 6. Analytics Engine

**Purpose**: Track and report referral program performance

**Interface**:
```typescript
interface ReferralAnalytics {
  totalReferrals: number;
  totalConversions: number;
  conversionRate: number;
  totalRevenue: number;
  totalRewardsPaid: number;
  roi: number;
  topReferrers: TopReferrer[];
  performanceByMonth: MonthlyPerformance[];
}

interface TopReferrer {
  customerId: string;
  name: string;
  conversions: number;
  revenue: number;
  tier: string;
}

class AnalyticsEngine {
  async getOverallAnalytics(): Promise<ReferralAnalytics>;
  async getReferrerAnalytics(customerId: string): Promise<ReferrerAnalytics>;
  async getTopReferrers(limit: number): Promise<TopReferrer[]>;
  async calculateROI(): Promise<number>;
}
```

## Data Models

### Prisma Schema

```prisma
model ReferralCode {
  id         String   @id @default(cuid())
  code       String   @unique
  customerId String
  customer   Customer @relation(fields: [customerId], references: [id])
  isActive   Boolean  @default(true)
  createdAt  DateTime @default(now())
  expiresAt  DateTime?
  
  clicks      ReferralClick[]
  conversions ReferralConversion[]
}

model ReferralClick {
  id            String       @id @default(cuid())
  referralCode  String
  referral      ReferralCode @relation(fields: [referralCode], references: [code])
  ipAddress     String
  userAgent     String
  timestamp     DateTime     @default(now())
  converted     Boolean      @default(false)
}

model ReferralConversion {
  id            String       @id @default(cuid())
  referralCode  String
  referral      ReferralCode @relation(fields: [referralCode], references: [code])
  referrerId    String
  referrer      Customer     @relation("Referrer", fields: [referrerId], references: [id])
  refereeId     String
  referee       Customer     @relation("Referee", fields: [refereeId], references: [id])
  orderId       String       @unique
  order         Order        @relation(fields: [orderId], references: [id])
  orderValue    Float
  rewardAmount  Float
  status        String       @default("pending")
  createdAt     DateTime     @default(now())
  approvedAt    DateTime?
  
  reward        Reward?
}

model Reward {
  id           String             @id @default(cuid())
  referrerId   String
  referrer     Customer           @relation(fields: [referrerId], references: [id])
  conversionId String             @unique
  conversion   ReferralConversion @relation(fields: [conversionId], references: [id])
  amount       Float
  type         String             @default("credit")
  status       String             @default("pending")
  createdAt    DateTime           @default(now())
  paidAt       DateTime?
}

model Customer {
  id            String   @id @default(cuid())
  email         String   @unique
  name          String
  accountCredit Float    @default(0)
  
  referralCode  ReferralCode?
  referrals     ReferralConversion[] @relation("Referrer")
  referredBy    ReferralConversion[] @relation("Referee")
  rewards       Reward[]
}
```

## Error Handling

- Validate referral codes before processing
- Handle duplicate conversions gracefully
- Retry failed reward distributions
- Log fraud detection failures

## Testing Strategy

### Unit Tests
- Referral code generation
- Conversion tracking
- Reward calculation
- Fraud detection rules
- Tier upgrades

### Integration Tests
- End-to-end referral flow
- Reward distribution
- Fraud detection pipeline
- Analytics calculations

## Performance Considerations

- Index referral codes for fast lookup
- Cache tier calculations
- Batch reward processing
- Async fraud checks

## Integration Points

### API Routes

```typescript
// pages/api/referrals/generate.ts
export default async function handler(req, res) {
  const session = await getSession({ req });
  
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  const manager = new ReferralManager();
  const code = await manager.generateCode(session.user.id);
  const link = await manager.getReferralLink(code.code);
  
  res.json({ code: code.code, link });
}

// pages/api/referrals/track.ts
export default async function handler(req, res) {
  const { code } = req.query;
  
  const tracker = new ConversionTracker();
  await tracker.trackClick(code, {
    ipAddress: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
    userAgent: req.headers['user-agent']
  });
  
  // Set cookie
  res.setHeader('Set-Cookie', `ref=${code}; Max-Age=2592000; Path=/; HttpOnly; Secure; SameSite=Lax`);
  res.redirect('/');
}
```

### Stripe Webhook

```typescript
// pages/api/webhooks/stripe.ts
export default async function handler(req, res) {
  const event = stripe.webhooks.constructEvent(
    req.body,
    req.headers['stripe-signature'],
    process.env.STRIPE_WEBHOOK_SECRET
  );
  
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    
    // Check for referral cookie
    const refCode = req.cookies.ref;
    
    if (refCode) {
      const tracker = new ConversionTracker();
      await tracker.trackConversion(refCode, {
        id: session.metadata.orderId,
        customerId: session.customer,
        total: session.amount_total / 100
      });
    }
  }
  
  res.json({ received: true });
}
```
