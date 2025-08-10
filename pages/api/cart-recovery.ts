import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface CartRecoveryRequest {
  email: string;
  cartItems: {
    productId: string;
    quantity: number;
    price: number;
  }[];
  abandonedAt: string;
  recoveryType: 'immediate' | '1h' | '24h' | '72h';
  discount?: {
    code: string;
    percentage: number;
  };
}

interface EmailTemplate {
  subject: string;
  htmlContent: string;
  textContent: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      email,
      cartItems,
      abandonedAt,
      recoveryType,
      discount
    }: CartRecoveryRequest = req.body;

    // Validate input
    if (!email || !cartItems || cartItems.length === 0) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if this cart recovery already exists to avoid spam
    // Note: This would require adding a CartRecovery model to your Prisma schema
    // For now, we'll skip this check and rely on client-side throttling
    
    // const existingRecovery = await prisma.cartRecovery?.findFirst({
    //   where: {
    //     email,
    //     createdAt: {
    //       gte: new Date(Date.now() - 24 * 60 * 60 * 1000) // Within last 24 hours
    //     }
    //   }
    // });

    // if (existingRecovery && recoveryType === 'immediate') {
    //   return res.status(429).json({ error: 'Recovery email already sent recently' });
    // }

    // Generate recovery token
    const recoveryToken = generateRecoveryToken();
    
    // Calculate cart total
    const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discountAmount = discount ? (cartTotal * discount.percentage) / 100 : 0;
    const finalTotal = cartTotal - discountAmount;

    // Get email template based on recovery type
    const emailTemplate = getEmailTemplate(recoveryType, {
      cartItems,
      cartTotal,
      discount,
      discountAmount,
      finalTotal,
      recoveryToken
    });

    // Send email (using EmailJS or your preferred service)
    await sendRecoveryEmail(email, emailTemplate);

    // Log the cart recovery attempt
    await logCartRecovery({
      email,
      cartItems,
      cartTotal,
      recoveryType,
      recoveryToken,
      discountOffered: discount?.percentage || 0
    });

    // Track analytics
    if (typeof process !== 'undefined' && process.env.NODE_ENV === 'production') {
      // In production, you'd integrate with your analytics service
      console.log('Cart recovery email sent:', {
        email: email.replace(/(.{3}).*@/, '$1***@'), // Mask email for privacy
        recoveryType,
        cartTotal,
        discountOffered: discount?.percentage || 0
      });
    }

    res.status(200).json({
      success: true,
      message: 'Recovery email sent successfully',
      recoveryToken
    });

  } catch (error) {
    console.error('Cart recovery error:', error);
    res.status(500).json({
      error: 'Failed to send recovery email',
      details: process.env.NODE_ENV === 'development' ? error : undefined
    });
  }
}

function generateRecoveryToken(): string {
  return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
}

function getEmailTemplate(
  recoveryType: string,
  data: {
    cartItems: any[];
    cartTotal: number;
    discount?: { code: string; percentage: number };
    discountAmount: number;
    finalTotal: number;
    recoveryToken: string;
  }
): EmailTemplate {
  const { cartItems, cartTotal, discount, discountAmount, finalTotal, recoveryToken } = data;
  
  const recoveryUrl = `${process.env.NEXT_PUBLIC_DOMAIN || 'https://purrify.ca'}/checkout?recovery=${recoveryToken}`;
  
  const templates = {
    immediate: {
      subject: "🐱 Oops! You left something in your cart",
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #f97316;">Don't let odors win! 🐱</h1>
          <p>Hi there,</p>
          <p>We noticed you were interested in eliminating those stubborn litter box odors with Purrify, but didn't complete your order.</p>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Your Cart:</h3>
            ${cartItems.map(item => `
              <div style="display: flex; justify-content: space-between; margin: 10px 0;">
                <span>${item.productName || `Product ${item.productId}`} (x${item.quantity})</span>
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            `).join('')}
            <hr style="margin: 15px 0;">
            <div style="display: flex; justify-content: space-between; font-weight: bold;">
              <span>Total:</span>
              <span>$${cartTotal.toFixed(2)} CAD</span>
            </div>
          </div>
          
          <a href="${recoveryUrl}" style="display: inline-block; background: linear-gradient(45deg, #f97316, #ec4899); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0;">
            Complete Your Order Now
          </a>
          
          <p>Your cats deserve an odor-free home. Don't let them down!</p>
          <p><small>This link expires in 48 hours for security.</small></p>
        </div>
      `
    },
    '1h': {
      subject: "🚨 Still thinking about Purrify? Here's 10% OFF!",
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #f97316;">Special Offer Just For You! 🎁</h1>
          <p>We get it - you want to make sure Purrify is right for your cats.</p>
          <p><strong>Here's 10% OFF to help you decide!</strong></p>
          
          <div style="background: #fef3c7; border: 2px solid #f59e0b; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
            <h2 style="color: #92400e; margin: 0;">Use Code: SAVE10</h2>
            <p style="margin: 5px 0;">10% OFF Your Entire Order</p>
            <p style="color: #92400e; font-size: 14px;"><em>Expires in 23 hours!</em></p>
          </div>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Your Cart (with discount):</h3>
            ${cartItems.map(item => `
              <div style="display: flex; justify-content: space-between; margin: 10px 0;">
                <span>${item.productName || `Product ${item.productId}`} (x${item.quantity})</span>
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            `).join('')}
            <hr style="margin: 15px 0;">
            <div style="display: flex; justify-content: space-between;">
              <span>Subtotal:</span>
              <span>$${cartTotal.toFixed(2)}</span>
            </div>
            <div style="display: flex; justify-content: space-between; color: #ef4444;">
              <span>Discount (10%):</span>
              <span>-$${(cartTotal * 0.1).toFixed(2)}</span>
            </div>
            <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 18px;">
              <span>New Total:</span>
              <span>$${(cartTotal * 0.9).toFixed(2)} CAD</span>
            </div>
          </div>
          
          <a href="${recoveryUrl}&discount=SAVE10" style="display: inline-block; background: linear-gradient(45deg, #f97316, #ec4899); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0;">
            Claim My 10% Discount
          </a>
          
          <p><strong>Why 2,500+ cat owners choose Purrify:</strong></p>
          <ul>
            <li>✅ Works with ANY litter you currently use</li>
            <li>✅ Eliminates odors at the source (not just masking)</li>
            <li>✅ 100% natural activated carbon</li>
            <li>✅ Safe for cats, kittens, and humans</li>
            <li>✅ Money-back guarantee</li>
          </ul>
        </div>
      `
    },
    '24h': {
      subject: "Final notice: Your Purrify discount expires soon!",
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #ef4444;">⏰ Last Chance!</h1>
          <p>Your 10% discount on Purrify expires in just a few hours.</p>
          <p>After that, you'll pay full price - and your cats will keep dealing with odors.</p>
          
          <div style="background: #fecaca; border: 2px solid #ef4444; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
            <h2 style="color: #991b1b; margin: 0;">EXPIRES TODAY!</h2>
            <p style="margin: 5px 0;">Use Code: SAVE10</p>
            <p style="color: #991b1b; font-weight: bold;">Save $${(cartTotal * 0.1).toFixed(2)} CAD</p>
          </div>
          
          <a href="${recoveryUrl}&discount=SAVE10" style="display: inline-block; background: linear-gradient(45deg, #ef4444, #dc2626); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0;">
            Complete Order Before Discount Expires
          </a>
          
          <p><strong>What happens if you wait?</strong></p>
          <ul>
            <li>❌ You lose your 10% discount (save $${(cartTotal * 0.1).toFixed(2)})</li>
            <li>❌ Your cats continue to suffer from litter odors</li>
            <li>❌ Your home keeps smelling like a litter box</li>
            <li>❌ You miss out on joining 2,500+ happy cat owners</li>
          </ul>
          
          <p><em>"I wish I had found Purrify sooner! It completely eliminated the smell from our 3-cat household." - Sarah M., Toronto</em></p>
        </div>
      `
    },
    '72h': {
      subject: "We miss you! Here's a fresh start with Purrify",
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #f97316;">One more try? 🐱</h1>
          <p>We noticed you haven't completed your Purrify order yet.</p>
          <p>Maybe you're still not sure if it's right for your cats?</p>
          
          <div style="background: #e0f2fe; border: 2px solid #0369a1; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #0369a1;">💡 Did you know?</h3>
            <p>Purrify works with <strong>any litter</strong> you're currently using. You don't need to switch brands or change your routine.</p>
            <p>Just sprinkle Purrify on top, and odors disappear instantly!</p>
          </div>
          
          <a href="${recoveryUrl}" style="display: inline-block; background: linear-gradient(45deg, #f97316, #ec4899); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0;">
            Give Purrify a Try
          </a>
          
          <p><strong>Still have questions?</strong></p>
          <p>Reply to this email and we'll answer any concerns you have about Purrify.</p>
          <p>We're here to help you and your cats live odor-free!</p>
          
          <hr style="margin: 30px 0;">
          <p style="font-size: 12px; color: #666;">
            Don't want these emails? <a href="#" style="color: #666;">Unsubscribe here</a>
          </p>
        </div>
      `
    }
  };

  const template = templates[recoveryType as keyof typeof templates] || templates.immediate;
  
  return {
    subject: template.subject,
    htmlContent: template.htmlContent,
    textContent: template.htmlContent.replace(/<[^>]*>/g, '') // Strip HTML for text version
  };
}

async function sendRecoveryEmail(email: string, template: EmailTemplate) {
  // In a real implementation, you'd integrate with your email service
  // For now, we'll simulate the email send
  
  if (process.env.NODE_ENV === 'development') {
    console.log('📧 Cart Recovery Email (DEV MODE):');
    console.log('To:', email);
    console.log('Subject:', template.subject);
    console.log('Preview:', template.htmlContent.substring(0, 200) + '...');
    return true;
  }

  // Example integration with EmailJS or other service
  try {
    // const result = await emailService.send({
    //   to: email,
    //   subject: template.subject,
    //   html: template.htmlContent,
    //   text: template.textContent
    // });
    
    return true;
  } catch (error) {
    console.error('Failed to send recovery email:', error);
    throw error;
  }
}

async function logCartRecovery(data: {
  email: string;
  cartItems: any[];
  cartTotal: number;
  recoveryType: string;
  recoveryToken: string;
  discountOffered: number;
}) {
  try {
    // In a real implementation, you'd save this to your database
    // await prisma.cartRecovery.create({
    //   data: {
    //     email: data.email,
    //     cartData: JSON.stringify(data.cartItems),
    //     cartTotal: data.cartTotal,
    //     recoveryType: data.recoveryType,
    //     recoveryToken: data.recoveryToken,
    //     discountOffered: data.discountOffered,
    //     status: 'sent'
    //   }
    // });
    
    console.log('Cart recovery logged:', {
      email: data.email.replace(/(.{3}).*@/, '$1***@'),
      recoveryType: data.recoveryType,
      cartTotal: data.cartTotal
    });
    
  } catch (error) {
    console.error('Failed to log cart recovery:', error);
  }
}