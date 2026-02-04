export interface RiskSignal {
  type: string;
  message: string;
  score: number;
}

export interface RiskAssessment {
  totalScore: number;
  signals: RiskSignal[];
  recommendation: 'approve' | 'review' | 'decline';
}

export interface PaymentContext {
  amountCents: number;
  currency: string;
  email?: string;
  ip?: string;
  userAgent?: string;
  country?: string;
  velocity?: { lastHour: number; lastDay: number };
}

const SUSPICIOUS_EMAIL_DOMAINS = new Set([
  'tempmail.org', '10minutemail.com', 'guerrillamail.com', 'mailinator.com',
]);

/**
 * Lightweight fraud and abuse assessment to complement payment validation.
 * Purely heuristic, designed to be fast and dependency‑free.
 */
export function assessPaymentRisk(ctx: PaymentContext): RiskAssessment {
  const signals: RiskSignal[] = [];

  // Normalize amount to USD for thresholding (rough, avoids external deps)
  const usd = normalizeToUSD(ctx.amountCents, ctx.currency);
  if (usd > 50_000) {
    signals.push({ type: 'amount.high', message: 'High-value transaction', score: 30 });
  } else if (usd > 20_000) {
    signals.push({ type: 'amount.medium', message: 'Medium-value transaction', score: 15 });
  }

  // Email domain reputation
  const domain = (ctx.email?.split('@')[1] || '').toLowerCase();
  if (domain && SUSPICIOUS_EMAIL_DOMAINS.has(domain)) {
    signals.push({ type: 'email.disposable', message: 'Disposable email domain', score: 20 });
  }

  // Velocity checks (simple thresholds)
  if (ctx.velocity) {
    if (ctx.velocity.lastHour > 3) {
      signals.push({ type: 'velocity.hour', message: 'Multiple recent attempts (1h)', score: 15 });
    }
    if (ctx.velocity.lastDay > 10) {
      signals.push({ type: 'velocity.day', message: 'High daily volume', score: 10 });
    }
  }

  // User-Agent checks
  if (ctx.userAgent && isSuspiciousUA(ctx.userAgent)) {
    signals.push({ type: 'ua.suspicious', message: 'Suspicious user agent', score: 10 });
  }

  // Geo/IP coarse check (placeholder; enrich with IP data in backend)
  if (ctx.country && !['CA', 'US'].includes(ctx.country.toUpperCase())) {
    signals.push({ type: 'geo.foreign', message: 'Foreign country for business', score: 10 });
  }

  const totalScore = signals.reduce((s, x) => s + x.score, 0);
  const recommendation: RiskAssessment['recommendation'] = totalScore >= 50 ? 'decline' : totalScore >= 25 ? 'review' : 'approve';

  return { totalScore, signals, recommendation };
}

function normalizeToUSD(amountCents: number, currency: string): number {
  const c = currency.toUpperCase();
  const rate = c === 'CAD' ? 0.74 : c === 'USD' ? 1 : 1; // coarse default
  return amountCents * rate;
}

function isSuspiciousUA(ua: string): boolean {
  return /(bot|crawler|spider|curl|wget|python-requests)/i.test(ua);
}

// Backward-compatible service facade used by API routes
export class PaymentSecurityService {
  static async assessRisk(input: {
    email: string;
    amount: number;
    currency: string;
    ipAddress?: string;
    userAgent?: string;
    countryCode?: string;
    sessionDuration?: number;
  }): Promise<{
    riskScore: number;
    riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    recommendation: 'ALLOW' | 'REVIEW' | 'BLOCK';
    explanation: string;
    flags: Array<{ type: string; severity: 'LOW' | 'MEDIUM' | 'HIGH'; message: string }>;
  }> {
    const velocity = { lastHour: 0, lastDay: 0 }; // Placeholder; integrate with DB if needed
    const assessment = assessPaymentRisk({
      email: input.email,
      amountCents: Math.round(input.amount * 100),
      currency: input.currency,
      ip: input.ipAddress,
      userAgent: input.userAgent,
      country: input.countryCode,
      velocity,
    });

    const riskLevel = assessment.totalScore >= 70 ? 'CRITICAL' : assessment.totalScore >= 50 ? 'HIGH' : assessment.totalScore >= 25 ? 'MEDIUM' : 'LOW';
    const recommendation = assessment.recommendation === 'decline' ? 'BLOCK' : assessment.recommendation === 'review' ? 'REVIEW' : 'ALLOW';

    return {
      riskScore: assessment.totalScore,
      riskLevel,
      recommendation,
      explanation: 'Automated heuristic risk assessment',
      flags: assessment.signals.map(s => ({
        type: s.type,
        severity: s.score >= 20 ? 'HIGH' : s.score >= 10 ? 'MEDIUM' : 'LOW',
        message: s.message,
      })),
    };
  }

  static generateFingerprint(ctx: { email?: string; ipAddress?: string; userAgent?: string }): string {
    const raw = `${(ctx.email || '').toLowerCase()}|${ctx.ipAddress || ''}|${ctx.userAgent || ''}`;
    let hash = 0;
    for (let i = 0; i < raw.length; i++) {
      const chr = raw.charCodeAt(i);
      hash = ((hash << 5) - hash) + chr;
      hash |= 0;
    }
    return `fp_${Math.abs(hash).toString(36)}`;
  }

  static async logSecurityEvent(_type: string, _context: Record<string, unknown>, _result?: unknown): Promise<void> {
    // Security event logging is handled by external monitoring
  }
}
