import { NextApiRequest, NextApiResponse } from 'next';

interface RewardDetails {
  amount?: number;
  type?: string;
  description?: string;
  code?: string;
}

interface EmailNotificationData {
  type: 'welcome' | 'reward_earned' | 'milestone_achieved' | 'referee_signup' | 'referee_purchase';
  recipientEmail: string;
  recipientName?: string;
  referralCode?: string;
  referrerName?: string;
  rewardDetails?: RewardDetails;
  customData?: Record<string, string | number | boolean>;
}

interface NotificationResponse {
  success: boolean;
  messageId?: string;
  error?: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<NotificationResponse>) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed'
    });
  }

  try {
    const notificationData: EmailNotificationData = req.body;

    if (!notificationData.type || !notificationData.recipientEmail) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: type, recipientEmail'
      });
    }

    // Generate email content based on notification type
    const emailContent = generateEmailContent(notificationData);

    // Send email (mock implementation - replace with actual email service)
    const messageId = await sendEmail(
      notificationData.recipientEmail,
      emailContent.subject,
      emailContent.html,
      emailContent.text
    );

    // Log notification for tracking
    await logNotification(notificationData, messageId);

    res.status(200).json({
      success: true,
      messageId
    });

  } catch (error) {
    console.error('Error sending notification:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to send notification'
    });
  }
}

function generateEmailContent(data: EmailNotificationData) {
  const { type, recipientName, referrerName, referralCode, rewardDetails } = data;

  switch (type) {
    case 'welcome':
      return {
        subject: `Welcome to Purrify Referrals! Your code: ${referralCode}`,
        html: generateWelcomeEmailHTML(recipientName, referralCode),
        text: generateWelcomeEmailText(recipientName, referralCode)
      };

    case 'reward_earned':
      return {
        subject: '🎉 You earned a referral reward!',
        html: generateRewardEmailHTML(recipientName, rewardDetails, referrerName),
        text: generateRewardEmailText(recipientName, rewardDetails, referrerName)
      };

    case 'milestone_achieved':
      return {
        subject: '🏆 Milestone Reached - Free Product Unlocked!',
        html: generateMilestoneEmailHTML(recipientName, rewardDetails),
        text: generateMilestoneEmailText(recipientName, rewardDetails)
      };

    case 'referee_signup':
      return {
        subject: `Great news! ${referrerName || 'Someone'} signed up with your code`,
        html: generateRefereeSignupEmailHTML(recipientName, referrerName, referralCode),
        text: generateRefereeSignupEmailText(recipientName, referrerName, referralCode)
      };

    case 'referee_purchase':
      return {
        subject: '💰 Referral reward earned - Someone bought Purrify!',
        html: generateRefereePurchaseEmailHTML(recipientName, referrerName, rewardDetails),
        text: generateRefereePurchaseEmailText(recipientName, referrerName, rewardDetails)
      };

    default:
      throw new Error(`Unknown notification type: ${type}`);
  }
}

// Welcome email templates
function generateWelcomeEmailHTML(recipientName?: string, referralCode?: string): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Welcome to Purrify Referrals</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <img src="https://www.purrify.ca/purrify-logo.png" alt="Purrify" style="width: 120px; height: auto;">
        </div>

        <h1 style="color: #FF6B35; text-align: center; margin-bottom: 30px;">Welcome to the Purrify Referral Program!</h1>

        <p>Hi ${recipientName || 'there'}! 👋</p>

        <p>Thank you for joining our referral program! You can now earn amazing rewards by sharing Purrify with friends and family.</p>

        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
          <h3 style="color: #FF6B35; margin-bottom: 10px;">Your Referral Code</h3>
          <div style="font-size: 24px; font-weight: bold; font-family: monospace; background: white; padding: 15px; border-radius: 5px; border: 2px dashed #FF6B35;">
            ${referralCode}
          </div>
          <p style="margin-top: 10px; font-size: 14px; color: #666;">Share this code for instant rewards!</p>
        </div>

        <h3>How It Works:</h3>
        <ul>
          <li><strong>Share:</strong> Give your friends your referral code</li>
          <li><strong>They Save:</strong> Friends get a FREE 12g trial (normally $6.99)</li>
          <li><strong>You Earn:</strong> Get 15% off your next order when they purchase</li>
          <li><strong>Bonus:</strong> Free products after every 3 successful referrals!</li>
        </ul>

        <div style="text-align: center; margin: 30px 0;">
          <a href="https://www.purrify.ca/customer/referrals" style="background: linear-gradient(45deg, #FF6B35, #F7931E); color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
            Start Sharing Now
          </a>
        </div>

        <p style="font-size: 12px; color: #666; text-align: center; margin-top: 30px;">
          Questions? Reply to this email or visit our <a href="https://www.purrify.ca/learn/faq">FAQ page</a>.
        </p>
      </body>
    </html>
  `;
}

function generateWelcomeEmailText(recipientName?: string, referralCode?: string): string {
  return `
Welcome to the Purrify Referral Program!

Hi ${recipientName || 'there'}!

Thank you for joining our referral program! You can now earn amazing rewards by sharing Purrify with friends and family.

Your Referral Code: ${referralCode}

How It Works:
• Share: Give your friends your referral code
• They Save: Friends get a FREE 12g trial (normally $6.99)
• You Earn: Get 15% off your next order when they purchase
• Bonus: Free products after every 3 successful referrals!

Start sharing: https://www.purrify.ca/customer/referrals

Questions? Reply to this email or visit our FAQ page.

Best,
The Purrify Team
  `;
}

// Reward earned email templates
function generateRewardEmailHTML(recipientName?: string, rewardDetails?: RewardDetails, referrerName?: string): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Referral Reward Earned!</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <img src="https://www.purrify.ca/purrify-logo.png" alt="Purrify" style="width: 120px; height: auto;">
        </div>

        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #28a745; font-size: 32px; margin-bottom: 10px;">🎉 Congratulations!</h1>
          <h2 style="color: #FF6B35;">You've Earned a Referral Reward!</h2>
        </div>

        <p>Hi ${recipientName || 'there'}!</p>

        <p>Great news! ${referrerName || 'Someone you referred'} just made their first Purrify purchase, and you've earned a reward!</p>

        <div style="background: linear-gradient(135deg, #28a745, #20c997); color: white; padding: 25px; border-radius: 10px; margin: 25px 0; text-align: center;">
          <h3 style="margin-bottom: 15px; font-size: 24px;">Your Reward</h3>
          <div style="font-size: 20px; font-weight: bold; margin-bottom: 10px;">
            ${rewardDetails?.description || '15% Off Your Next Purchase'}
          </div>
          ${rewardDetails?.code ? `
            <div style="background: rgba(255,255,255,0.2); padding: 10px; border-radius: 5px; margin-top: 15px;">
              <strong>Code: ${rewardDetails.code}</strong>
            </div>
          ` : ''}
        </div>

        <p>This reward is automatically applied to your account and will be available at checkout. Keep sharing to earn more rewards and unlock milestone bonuses!</p>

        <div style="text-align: center; margin: 30px 0;">
          <a href="https://www.purrify.ca/customer/referrals" style="background: #FF6B35; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
            View Your Dashboard
          </a>
        </div>

        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h4 style="color: #FF6B35; margin-bottom: 10px;">💡 Sharing Tip</h4>
          <p style="margin: 0;">Your success shows that your friends trust your recommendations! Keep sharing in cat parent groups, with neighbors, or anyone dealing with litter box odors.</p>
        </div>

        <p style="font-size: 12px; color: #666; text-align: center; margin-top: 30px;">
          Questions about your reward? <a href="mailto:support@purrify.ca">Contact our support team</a>.
        </p>
      </body>
    </html>
  `;
}

function generateRewardEmailText(recipientName?: string, rewardDetails?: RewardDetails, referrerName?: string): string {
  return `
🎉 Congratulations! You've Earned a Referral Reward!

Hi ${recipientName || 'there'}!

Great news! ${referrerName || 'Someone you referred'} just made their first Purrify purchase, and you've earned a reward!

Your Reward: ${rewardDetails?.description || '15% Off Your Next Purchase'}
${rewardDetails?.code ? `Code: ${rewardDetails.code}` : ''}

This reward is automatically applied to your account and will be available at checkout. Keep sharing to earn more rewards and unlock milestone bonuses!

View your dashboard: https://www.purrify.ca/customer/referrals

💡 Sharing Tip: Your success shows that your friends trust your recommendations! Keep sharing in cat parent groups, with neighbors, or anyone dealing with litter box odors.

Questions about your reward? Contact our support team at support@purrify.ca

Best,
The Purrify Team
  `;
}

// Additional email template functions would go here...
function generateMilestoneEmailHTML(recipientName?: string, rewardDetails?: RewardDetails): string {
  // Implementation for milestone emails
  return `<!-- Milestone email HTML -->`;
}

function generateMilestoneEmailText(recipientName?: string, rewardDetails?: RewardDetails): string {
  // Implementation for milestone emails
  return `Milestone email text`;
}

function generateRefereeSignupEmailHTML(_recipientName?: string, _referrerName?: string, _referralCode?: string): string {
  // Implementation for referee signup emails
  return `<!-- Referee signup email HTML -->`;
}

function generateRefereeSignupEmailText(_recipientName?: string, _referrerName?: string, _referralCode?: string): string {
  // Implementation for referee signup emails
  return `Referee signup email text`;
}

function generateRefereePurchaseEmailHTML(_recipientName?: string, _referrerName?: string, _rewardDetails?: RewardDetails): string {
  // Implementation for referee purchase emails
  return `<!-- Referee purchase email HTML -->`;
}

function generateRefereePurchaseEmailText(_recipientName?: string, _referrerName?: string, _rewardDetails?: RewardDetails): string {
  // Implementation for referee purchase emails
  return `Referee purchase email text`;
}

// Mock email sending function - replace with actual email service
async function sendEmail(to: string, subject: string, html: string, text: string): Promise<string> {
  // In production, integrate with services like:
  // - SendGrid
  // - Mailgun
  // - AWS SES
  // - Resend

  console.log('📧 Email would be sent:', { to, subject });

  // Simulate email sending delay
  await new Promise(resolve => setTimeout(resolve, 100));

  // Return mock message ID
  return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Log notification for tracking and analytics
async function logNotification(data: EmailNotificationData, messageId: string): Promise<void> {
  // In production, log to database for analytics
  console.log('📊 Notification logged:', {
    type: data.type,
    recipient: data.recipientEmail,
    messageId,
    timestamp: new Date().toISOString()
  });
}
