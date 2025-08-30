import crypto from 'crypto';

export interface RiskAssessment {
  riskScore: number;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  flags: SecurityFlag[];
  recommendation: 'APPROVE' | 'REVIEW' | 'DECLINE' | 'BLOCK';
  explanation: string;
}

export interface SecurityFlag {
  type: 'VELOCITY' | 'AMOUNT' | 'LOCATION' | 'DEVICE' | 'EMAIL' | 'BEHAVIORAL';
  severity: 'LOW' | 'MEDIUM' | 'HIGH';
  message: string;
  score: number;
}

export interface TransactionContext {
  email: string;
  amount: number;
  currency: string;
  ipAddress?: string;
  userAgent?: string;
  fingerprint?: string;
  countryCode?: string;
  timestamp: Date;
  sessionDuration?: number;
  referrer?: string;
}

export class PaymentSecurityService {
  private static readonly VELOCITY_LIMITS = {
    EMAIL_HOUR: 5,
    IP_HOUR: 10,
    EMAIL_DAY: 20,
    IP_DAY: 50,
  };

  private static readonly AMOUNT_THRESHOLDS = {
    MEDIUM_RISK: 100,
    HIGH_RISK: 500,
    CRITICAL_RISK: 1000,
  };

  private static readonly SUSPICIOUS_EMAIL_PATTERNS = [
    /temp.*mail/i,
    /disposable/i,
    /fake.*mail/i,
    /test.*email/i,
    /spam.*box/i,
  ];

  private static readonly SUSPICIOUS_DOMAINS = [
    'tempmail.org',
    '10minutemail.com',
    'guerrillamail.com',
    'mailinator.com',
    'throwaway.email',
  ];

  static async assessRisk(context: TransactionContext): Promise<RiskAssessment> {
    const flags: SecurityFlag[] = [];
    let totalScore = 0;

    const velocityFlags = await this.checkVelocityLimits(context);
    flags.push(...velocityFlags);
    totalScore += velocityFlags.reduce((sum, flag) => sum + flag.score, 0);

    const amountFlags = this.checkAmountRisk(context);
    flags.push(...amountFlags);
    totalScore += amountFlags.reduce((sum, flag) => sum + flag.score, 0);

    const emailFlags = this.checkEmailRisk(context);
    flags.push(...emailFlags);
    totalScore += emailFlags.reduce((sum, flag) => sum + flag.score, 0);

    const deviceFlags = this.checkDeviceRisk(context);
    flags.push(...deviceFlags);
    totalScore += deviceFlags.reduce((sum, flag) => sum + flag.score, 0);

    const behavioralFlags = this.checkBehavioralRisk(context);
    flags.push(...behavioralFlags);
    totalScore += behavioralFlags.reduce((sum, flag) => sum + flag.score, 0);

    const locationFlags = await this.checkLocationRisk(context);
    flags.push(...locationFlags);
    totalScore += locationFlags.reduce((sum, flag) => sum + flag.score, 0);

    const { riskLevel, recommendation, explanation } = this.calculateOverallRisk(totalScore, flags);

    return {
      riskScore: Math.min(totalScore, 100),
      riskLevel,
      flags,
      recommendation,
      explanation,
    };
  }

  private static async checkVelocityLimits(context: TransactionContext): Promise<SecurityFlag[]> {
    const flags: SecurityFlag[] = [];

    try {
      if (context.email) {
        const emailCountHour = await this.getTransactionCount(context.email, 'email', 1);
        const emailCountDay = await this.getTransactionCount(context.email, 'email', 24);

        if (emailCountHour > this.VELOCITY_LIMITS.EMAIL_HOUR) {
          flags.push({
            type: 'VELOCITY',
            severity: 'HIGH',
            message: `Email exceeded hourly limit: ${emailCountHour} transactions`,
            score: 25,
          });
        }

        if (emailCountDay > this.VELOCITY_LIMITS.EMAIL_DAY) {
          flags.push({
            type: 'VELOCITY',
            severity: 'HIGH',
            message: `Email exceeded daily limit: ${emailCountDay} transactions`,
            score: 30,
          });
        }
      }

      if (context.ipAddress) {
        const ipCountHour = await this.getTransactionCount(context.ipAddress, 'ip', 1);
        const ipCountDay = await this.getTransactionCount(context.ipAddress, 'ip', 24);

        if (ipCountHour > this.VELOCITY_LIMITS.IP_HOUR) {
          flags.push({
            type: 'VELOCITY',
            severity: 'MEDIUM',
            message: `IP address exceeded hourly limit: ${ipCountHour} transactions`,
            score: 20,
          });
        }

        if (ipCountDay > this.VELOCITY_LIMITS.IP_DAY) {
          flags.push({
            type: 'VELOCITY',
            severity: 'HIGH',
            message: `IP address exceeded daily limit: ${ipCountDay} transactions`,
            score: 25,
          });
        }
      }
    } catch (error) {
      console.error('Velocity check failed:', error);
    }

    return flags;
  }

  private static checkAmountRisk(context: TransactionContext): SecurityFlag[] {
    const flags: SecurityFlag[] = [];
    const amountCAD = context.currency === 'USD' ? context.amount * 1.35 : context.amount;

    if (amountCAD >= this.AMOUNT_THRESHOLDS.CRITICAL_RISK) {
      flags.push({
        type: 'AMOUNT',
        severity: 'HIGH',
        message: `Critical amount: $${amountCAD.toFixed(2)} CAD`,
        score: 20,
      });
    } else if (amountCAD >= this.AMOUNT_THRESHOLDS.HIGH_RISK) {
      flags.push({
        type: 'AMOUNT',
        severity: 'MEDIUM',
        message: `High amount: $${amountCAD.toFixed(2)} CAD`,
        score: 15,
      });
    } else if (amountCAD >= this.AMOUNT_THRESHOLDS.MEDIUM_RISK) {
      flags.push({
        type: 'AMOUNT',
        severity: 'LOW',
        message: `Medium amount: $${amountCAD.toFixed(2)} CAD`,
        score: 5,
      });
    }

    return flags;
  }

  private static checkEmailRisk(context: TransactionContext): SecurityFlag[] {
    const flags: SecurityFlag[] = [];

    if (!context.email) return flags;

    const domain = context.email.split('@')[1]?.toLowerCase();
    
    if (this.SUSPICIOUS_DOMAINS.includes(domain)) {
      flags.push({
        type: 'EMAIL',
        severity: 'HIGH',
        message: `Suspicious email domain: ${domain}`,
        score: 30,
      });
    }

    if (this.SUSPICIOUS_EMAIL_PATTERNS.some(pattern => pattern.test(context.email))) {
      flags.push({
        type: 'EMAIL',
        severity: 'MEDIUM',
        message: 'Email matches suspicious pattern',
        score: 15,
      });
    }

    if (!domain || domain.length < 4) {
      flags.push({
        type: 'EMAIL',
        severity: 'MEDIUM',
        message: 'Invalid or suspicious email format',
        score: 20,
      });
    }

    const emailParts = context.email.split('@')[0];
    if (emailParts && emailParts.length > 50) {
      flags.push({
        type: 'EMAIL',
        severity: 'LOW',
        message: 'Unusually long email address',
        score: 5,
      });
    }

    return flags;
  }

  private static checkDeviceRisk(context: TransactionContext): SecurityFlag[] {
    const flags: SecurityFlag[] = [];

    if (!context.userAgent) return flags;

    const suspiciousAgents = [
      /bot/i, /crawler/i, /spider/i, /curl/i, /wget/i, 
      /python-requests/i, /postman/i, /insomnia/i
    ];

    if (suspiciousAgents.some(pattern => pattern.test(context.userAgent!))) {
      flags.push({
        type: 'DEVICE',
        severity: 'HIGH',
        message: 'Suspicious user agent detected',
        score: 35,
      });
    }

    if (context.userAgent.length < 20 || context.userAgent.length > 500) {
      flags.push({
        type: 'DEVICE',
        severity: 'MEDIUM',
        message: 'Unusual user agent length',
        score: 10,
      });
    }

    return flags;
  }

  private static checkBehavioralRisk(context: TransactionContext): SecurityFlag[] {
    const flags: SecurityFlag[] = [];

    if (context.sessionDuration !== undefined) {
      if (context.sessionDuration < 10) {
        flags.push({
          type: 'BEHAVIORAL',
          severity: 'MEDIUM',
          message: `Very short session: ${context.sessionDuration}s`,
          score: 15,
        });
      }

      if (context.sessionDuration > 3600) {
        flags.push({
          type: 'BEHAVIORAL',
          severity: 'LOW',
          message: `Very long session: ${Math.round(context.sessionDuration / 60)}m`,
          score: 5,
        });
      }
    }

    if (context.referrer) {
      const suspiciousReferrers = ['facebook.com', 'vk.com', 'telegram.org'];
      const referrerDomain = new URL(context.referrer).hostname.toLowerCase();
      
      if (suspiciousReferrers.some(domain => referrerDomain.includes(domain))) {
        flags.push({
          type: 'BEHAVIORAL',
          severity: 'LOW',
          message: `Traffic from social media: ${referrerDomain}`,
          score: 3,
        });
      }
    }

    return flags;
  }

  private static async checkLocationRisk(context: TransactionContext): Promise<SecurityFlag[]> {
    const flags: SecurityFlag[] = [];

    if (!context.countryCode) return flags;

    const highRiskCountries = ['CN', 'RU', 'BD', 'NG', 'PK'];
    const mediumRiskCountries = ['VN', 'PH', 'ID', 'IN'];

    if (highRiskCountries.includes(context.countryCode)) {
      flags.push({
        type: 'LOCATION',
        severity: 'HIGH',
        message: `High-risk country: ${context.countryCode}`,
        score: 25,
      });
    } else if (mediumRiskCountries.includes(context.countryCode)) {
      flags.push({
        type: 'LOCATION',
        severity: 'MEDIUM',
        message: `Medium-risk country: ${context.countryCode}`,
        score: 10,
      });
    }

    return flags;
  }

  private static calculateOverallRisk(score: number, flags: SecurityFlag[]): {
    riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    recommendation: 'APPROVE' | 'REVIEW' | 'DECLINE' | 'BLOCK';
    explanation: string;
  } {
    const highSeverityCount = flags.filter(f => f.severity === 'HIGH').length;
    
    if (score >= 70 || highSeverityCount >= 3) {
      return {
        riskLevel: 'CRITICAL',
        recommendation: 'BLOCK',
        explanation: 'Multiple high-risk indicators detected. Transaction blocked.',
      };
    } else if (score >= 50 || highSeverityCount >= 2) {
      return {
        riskLevel: 'HIGH',
        recommendation: 'DECLINE',
        explanation: 'High risk score with significant security concerns.',
      };
    } else if (score >= 25 || highSeverityCount >= 1) {
      return {
        riskLevel: 'MEDIUM',
        recommendation: 'REVIEW',
        explanation: 'Medium risk transaction requiring manual review.',
      };
    } else {
      return {
        riskLevel: 'LOW',
        recommendation: 'APPROVE',
        explanation: 'Low risk transaction approved automatically.',
      };
    }
  }

  static generateFingerprint(context: TransactionContext): string {
    const data = [
      context.ipAddress || '',
      context.userAgent || '',
      context.email,
      context.countryCode || '',
    ].join('|');

    return crypto.createHash('sha256').update(data).digest('hex');
  }

  private static async getTransactionCount(
    identifier: string, 
    type: 'email' | 'ip', 
    hours: number
  ): Promise<number> {
    return 0;
  }

  static async logSecurityEvent(
    eventType: 'RISK_ASSESSMENT' | 'BLOCKED_TRANSACTION' | 'SUSPICIOUS_ACTIVITY',
    context: TransactionContext,
    assessment?: RiskAssessment
  ): Promise<void> {
    try {
      const logData = {
        timestamp: new Date().toISOString(),
        eventType,
        email: context.email,
        amount: context.amount,
        currency: context.currency,
        ipAddress: context.ipAddress,
        userAgent: context.userAgent,
        countryCode: context.countryCode,
        riskScore: assessment?.riskScore,
        riskLevel: assessment?.riskLevel,
        recommendation: assessment?.recommendation,
        flags: assessment?.flags?.map(f => f.message),
      };

      console.log('Security Event:', JSON.stringify(logData, null, 2));
      
    } catch (error) {
      console.error('Failed to log security event:', error);
    }
  }
}