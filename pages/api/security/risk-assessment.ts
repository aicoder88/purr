import { NextApiRequest, NextApiResponse } from 'next';
import { PaymentSecurityService } from '../../../src/lib/payment-security';

function getClientIp(req: NextApiRequest): string | undefined {
  const xForwardedFor = req.headers['x-forwarded-for'];
  const xRealIp = req.headers['x-real-ip'];
  const connectionRemoteAddress = req.connection?.remoteAddress;
  const socketRemoteAddress = req.socket?.remoteAddress;

  if (xForwardedFor) {
    return Array.isArray(xForwardedFor) ? xForwardedFor[0] : xForwardedFor.split(',')[0].trim();
  }
  if (xRealIp) {
    return Array.isArray(xRealIp) ? xRealIp[0] : xRealIp;
  }
  return connectionRemoteAddress || socketRemoteAddress;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const {
        email,
        amount,
        currency,
        fingerprint,
        countryCode,
        sessionDuration,
        referrer,
      } = req.body;

      if (!email || !amount || !currency) {
        return res.status(400).json({ 
          error: 'Email, amount, and currency are required' 
        });
      }

      const ipAddress = getClientIp(req);
      const userAgent = req.headers['user-agent'];

      const context = {
        email,
        amount: parseFloat(amount),
        currency,
        ipAddress,
        userAgent,
        fingerprint,
        countryCode,
        timestamp: new Date(),
        sessionDuration: sessionDuration ? parseInt(sessionDuration) : undefined,
        referrer,
      };

      const riskAssessment = await PaymentSecurityService.assessRisk(context);

      await PaymentSecurityService.logSecurityEvent(
        'RISK_ASSESSMENT',
        context,
        riskAssessment
      );

      if (riskAssessment.recommendation === 'BLOCK') {
        await PaymentSecurityService.logSecurityEvent(
          'BLOCKED_TRANSACTION',
          context,
          riskAssessment
        );
      }

      const responseData = {
        success: true,
        assessment: {
          riskScore: riskAssessment.riskScore,
          riskLevel: riskAssessment.riskLevel,
          recommendation: riskAssessment.recommendation,
          explanation: riskAssessment.explanation,
          flags: riskAssessment.flags.map(flag => ({
            type: flag.type,
            severity: flag.severity,
            message: flag.message,
          })),
        },
        fingerprint: PaymentSecurityService.generateFingerprint(context),
        timestamp: context.timestamp,
      };

      const statusCode = riskAssessment.recommendation === 'BLOCK' ? 403 : 200;
      res.status(statusCode).json(responseData);

    } catch (error) {
      console.error('Risk assessment failed:', error);
      
      await PaymentSecurityService.logSecurityEvent(
        'SUSPICIOUS_ACTIVITY',
        {
          email: req.body.email || 'unknown',
          amount: parseFloat(req.body.amount) || 0,
          currency: req.body.currency || 'unknown',
          ipAddress: getClientIp(req),
          userAgent: req.headers['user-agent'],
          timestamp: new Date(),
        }
      );

      res.status(500).json({ 
        success: false, 
        error: 'Risk assessment failed',
        assessment: {
          riskScore: 100,
          riskLevel: 'CRITICAL',
          recommendation: 'DECLINE',
          explanation: 'System error during risk assessment',
          flags: [{
            type: 'BEHAVIORAL',
            severity: 'HIGH',
            message: 'System error during processing',
          }],
        },
      });
    }
  } else if (req.method === 'GET') {
    try {
      const { fingerprint } = req.query;

      if (!fingerprint || typeof fingerprint !== 'string') {
        return res.status(400).json({ error: 'Fingerprint is required' });
      }

      res.status(200).json({
        success: true,
        message: 'Fingerprint lookup would be implemented with database storage',
        fingerprint,
      });
    } catch (error) {
      console.error('Fingerprint lookup failed:', error);
      res.status(500).json({ error: 'Fingerprint lookup failed' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).json({ error: 'Method not allowed' });
  }
}