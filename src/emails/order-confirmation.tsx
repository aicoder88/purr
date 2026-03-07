/**
 * Email Template: Order Confirmation / Thank You
 * Sent immediately after successful payment via Stripe
 */
import { renderFreshnessPlanSection } from '@/emails/freshness-plan-section';

interface OrderConfirmationEmailProps {
    customerName?: string;
    customerEmail: string;
    orderNumber?: string;
    productName: string;
    quantity: number;
    amount: number;
    locale?: string;
    catCount?: number;
    homeType?: string;
    odorSeverity?: string;
    currentRemedy?: string;
    riskLevel?: string;
    score?: number;
    recommendedProductId?: string;
}

export const OrderConfirmationEmailHTML = ({
    customerName = 'Valued Customer',
    customerEmail,
    orderNumber = 'N/A',
    productName,
    quantity,
    amount,
    locale = 'en',
    catCount,
    homeType,
    odorSeverity,
    currentRemedy,
    riskLevel,
    score,
    recommendedProductId,
}: OrderConfirmationEmailProps) => {
    const freshnessPlanSection = renderFreshnessPlanSection(
        {
            locale,
            catCount,
            homeType,
            odorSeverity,
            currentRemedy,
            riskLevel,
            score,
            recommendedProductId,
        },
        { backgroundColor: '#f0fdf4' }
    );

    const content = {
        en: {
            subject: 'Thank You for Your Order! 🎉',
            greeting: `Hi ${customerName}`,
            thankYou: 'Thank you for your purchase!',
            intro: 'We\'re excited to get your order to you. Here are the details:',
            orderDetails: 'Order Details',
            orderNumberLabel: 'Order Number',
            product: 'Product',
            quantityLabel: 'Quantity',
            total: 'Total',
            whatNext: 'What Happens Next?',
            step1Title: '📦 We\'ll Process Your Order',
            step1Desc: 'Our team will carefully prepare your order and reach out to coordinate delivery.',
            step2Title: '📧 Stay Tuned',
            step2Desc: 'We\'ll send you updates via email as we process and ship your order.',
            step3Title: '✨ Enjoy Purrify',
            step3Desc: 'Get ready to experience odor-free litter happiness!',
            questions: 'Questions?',
            questionsText: 'If you have any questions about your order, feel free to reply to this email or contact us at:',
            supportEmail: 'support@purrify.ca',
            thanks: 'Thanks for choosing Purrify!',
            team: 'The Purrify Team',
            footer: 'This is an automated confirmation email. Please do not reply directly to this message.'
        },
        fr: {
            subject: 'Merci pour votre commande! 🎉',
            greeting: `Bonjour ${customerName}`,
            thankYou: 'Merci pour votre achat!',
            intro: 'Nous sommes ravis de vous livrer votre commande. Voici les détails:',
            orderDetails: 'Détails de la commande',
            orderNumberLabel: 'Numéro de commande',
            product: 'Produit',
            quantityLabel: 'Quantité',
            total: 'Total',
            whatNext: 'Et Maintenant?',
            step1Title: '📦 Nous traiterons votre commande',
            step1Desc: 'Notre équipe préparera soigneusement votre commande et vous contactera pour coordonner la livraison.',
            step2Title: '📧 Restez à l\'écoute',
            step2Desc: 'Nous vous enverrons des mises à jour par e-mail lors du traitement et de l\'expédition de votre commande.',
            step3Title: '✨ Profitez de Purrify',
            step3Desc: 'Préparez-vous à vivre le bonheur d\'une litière sans odeur!',
            questions: 'Des questions?',
            questionsText: 'Si vous avez des questions sur votre commande, n\'hésitez pas à répondre à cet e-mail ou à nous contacter à:',
            supportEmail: 'support@purrify.ca',
            thanks: 'Merci d\'avoir choisi Purrify!',
            team: 'L\'équipe Purrify',
            footer: 'Ceci est un e-mail de confirmation automatique. Veuillez ne pas répondre directement à ce message.'
        },
        zh: {
            subject: '感谢您的订单！🎉',
            greeting: `您好 ${customerName}`,
            thankYou: '感谢您的购买！',
            intro: '我们很高兴为您送货。以下是详细信息：',
            orderDetails: '订单详情',
            orderNumberLabel: '订单号',
            product: '产品',
            quantityLabel: '数量',
            total: '总计',
            whatNext: '接下来会发生什么？',
            step1Title: '📦 我们将处理您的订单',
            step1Desc: '我们的团队将仔细准备您的订单，并联系您协调交货。',
            step2Title: '📧 保持关注',
            step2Desc: '在我们处理和发货您的订单时，我们会通过电子邮件向您发送更新。',
            step3Title: '✨ 享受Purrify',
            step3Desc: '准备好体验无异味的猫砂幸福吧！',
            questions: '有问题吗？',
            questionsText: '如果您对订单有任何疑问，请随时回复此电子邮件或通过以下方式联系我们：',
            supportEmail: 'support@purrify.ca',
            thanks: '感谢您选择Purrify！',
            team: 'Purrify团队',
            footer: '这是一封自动确认电子邮件。请勿直接回复此消息。'
        }
    };

    const t = content[locale as keyof typeof content] || content.en;
    const formattedAmount = (amount / 100).toFixed(2);

    return `
<!DOCTYPE html>
<html lang="${locale}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${t.subject}</title>
</head>
<body style="margin: 0; padding: 0; font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="width: 100%; max-width: 600px; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">

          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center; background: linear-gradient(135deg, #03E46A 0%, #02C55A 100%); border-radius: 12px 12px 0 0;">
              <img src="https://www.purrify.ca/optimized/logos/purrify-logo.png" alt="Purrify" style="width: 120px; height: auto; margin-bottom: 20px;">
              <h1 style="margin: 0; font-size: 28px; font-weight: 700; color: #ffffff;">${t.thankYou}</h1>
            </td>
          </tr>

          <!-- Greeting -->
          <tr>
            <td style="padding: 30px 40px 20px;">
              <h2 style="margin: 0 0 10px; font-size: 22px; font-weight: 600; color: #1a1a1a;">${t.greeting},</h2>
              <p style="margin: 0; color: #4a5568; font-size: 16px; line-height: 1.6;">
                ${t.intro}
              </p>
            </td>
          </tr>

          <!-- Order Details Box -->
          <tr>
            <td style="padding: 0 40px 30px;">
              <div style="background-color: #f7fafc; border: 2px solid #03E46A; border-radius: 8px; padding: 24px;">
                <h3 style="margin: 0 0 20px; font-size: 18px; font-weight: 600; color: #1a1a1a;">${t.orderDetails}</h3>
                
                <table role="presentation" style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #718096; font-size: 14px;">${t.orderNumberLabel}:</td>
                    <td style="padding: 8px 0; color: #2d3748; font-size: 14px; font-weight: 600; text-align: right;">${orderNumber}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #718096; font-size: 14px;">${t.product}:</td>
                    <td style="padding: 8px 0; color: #2d3748; font-size: 14px; font-weight: 600; text-align: right;">${productName}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #718096; font-size: 14px;">${t.quantityLabel}:</td>
                    <td style="padding: 8px 0; color: #2d3748; font-size: 14px; font-weight: 600; text-align: right;">${quantity}</td>
                  </tr>
                  <tr style="border-top: 1px solid #e2e8f0;">
                    <td style="padding: 12px 0 0; color: #1a1a1a; font-size: 16px; font-weight: 700;">${t.total}:</td>
                    <td style="padding: 12px 0 0; color: #03E46A; font-size: 18px; font-weight: 700; text-align: right;">$${formattedAmount} CAD</td>
                  </tr>
                </table>

                <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid #e2e8f0;">
                  <p style="margin: 0; color: #718096; font-size: 13px;">
                    📧 Confirmation sent to: ${customerEmail}
                  </p>
                </div>
              </div>
            </td>
          </tr>

          ${
            freshnessPlanSection
              ? `
          <tr>
            <td style="padding: 0 40px 30px;">
              ${freshnessPlanSection}
            </td>
          </tr>`
              : ''
          }

          <!-- What's Next Section -->
          <tr>
            <td style="padding: 0 40px 30px;">
              <h3 style="margin: 0 0 20px; font-size: 20px; font-weight: 600; color: #1a1a1a;">${t.whatNext}</h3>
              
              <!-- Step 1 -->
              <div style="margin-bottom: 20px; padding: 16px; background-color: #f7fafc; border-radius: 8px;">
                <h4 style="margin: 0 0 8px; font-size: 16px; font-weight: 600; color: #2d3748;">${t.step1Title}</h4>
                <p style="margin: 0; color: #4a5568; font-size: 14px; line-height: 1.6;">
                  ${t.step1Desc}
                </p>
              </div>

              <!-- Step 2 -->
              <div style="margin-bottom: 20px; padding: 16px; background-color: #f7fafc; border-radius: 8px;">
                <h4 style="margin: 0 0 8px; font-size: 16px; font-weight: 600; color: #2d3748;">${t.step2Title}</h4>
                <p style="margin: 0; color: #4a5568; font-size: 14px; line-height: 1.6;">
                  ${t.step2Desc}
                </p>
              </div>

              <!-- Step 3 -->
              <div style="padding: 16px; background-color: #f7fafc; border-radius: 8px;">
                <h4 style="margin: 0 0 8px; font-size: 16px; font-weight: 600; color: #2d3748;">${t.step3Title}</h4>
                <p style="margin: 0; color: #4a5568; font-size: 14px; line-height: 1.6;">
                  ${t.step3Desc}
                </p>
              </div>
            </td>
          </tr>

          <!-- Questions Section -->
          <tr>
            <td style="padding: 0 40px 30px;">
              <div style="background-color: #edf2f7; border-left: 4px solid #03E46A; padding: 20px; border-radius: 4px;">
                <h4 style="margin: 0 0 10px; font-size: 16px; font-weight: 600; color: #2d3748;">${t.questions}</h4>
                <p style="margin: 0 0 10px; color: #4a5568; font-size: 14px; line-height: 1.6;">
                  ${t.questionsText}
                </p>
                <p style="margin: 0;">
                  <a href="mailto:${t.supportEmail}" style="color: #03E46A; text-decoration: none; font-weight: 600;">${t.supportEmail}</a>
                </p>
              </div>
            </td>
          </tr>

          <!-- Closing -->
          <tr>
            <td style="padding: 0 40px 30px; text-align: center;">
              <p style="margin: 0 0 10px; font-size: 16px; font-weight: 600; color: #2d3748;">
                ${t.thanks}
              </p>
              <p style="margin: 0; color: #718096; font-size: 14px;">
                ${t.team}
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; background-color: #f7fafc; border-top: 1px solid #e2e8f0; text-align: center; color: #718096; font-size: 12px; line-height: 1.6; border-radius: 0 0 12px 12px;">
              ${t.footer}
              <br><br>
              <a href="https://www.purrify.ca" style="color: #03E46A; text-decoration: none; font-weight: 600;">www.purrify.ca</a>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
};

export const getOrderConfirmationEmailSubject = (locale: string = 'en'): string => {
    const subjects = {
        en: 'Thank You for Your Order! 🎉',
        fr: 'Merci pour votre commande! 🎉',
        zh: '感谢您的订单！🎉'
    };
    return subjects[locale as keyof typeof subjects] || subjects.en;
};
