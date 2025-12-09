/**
 * Email Template: Upsell Timer Expired Recovery
 * Sent when customer lets the 10-minute timer expire without taking action
 */

interface UpsellExpiredEmailProps {
  customerName?: string;
  locale?: string;
}

export const UpsellExpiredEmailHTML = ({ customerName = 'Valued Customer', locale = 'en' }: UpsellExpiredEmailProps) => {
  const content = {
    en: {
      subject: 'Your Special 25% Discount Expired—We\'re Extending It!',
      greeting: `Hi ${customerName}`,
      intro: 'We noticed the timer ran out on your special autoship offer. Life gets busy—we get it!',
      headline: 'Good news: We\'re giving you another chance',
      subheadline: 'Same great deal, extended just for you',
      benefit1: '✓ Save 25% on quarterly autoship',
      benefit2: '✓ Free shipping every 3 months',
      benefit3: '✓ Never run out at the worst time',
      benefit4: '✓ Cancel or pause anytime—zero commitment',
      pricing: 'Just $31.99 every 3 months (3 × 50g bags)',
      savings: 'Regular price: $44.97 — You save: $12.98 (29%)',
      cta: 'Activate My Autoship Discount',
      urgency: '⏰ Extended for 24 hours only',
      whyAutoship: 'Why customers love autoship:',
      reason1: '• "I never forget to reorder anymore" — Lisa K.',
      reason2: '• "The savings add up fast!" — Michael P.',
      reason3: '• "One less thing to think about" — Jessica R.',
      guarantee: 'Try risk-free for 30 days • Full money-back guarantee',
      footer: 'Have questions? Our team is here to help at support@purrify.ca'
    },
    fr: {
      subject: 'Votre réduction de 25% a expiré—Nous la prolongeons!',
      greeting: `Bonjour ${customerName}`,
      intro: 'Nous avons remarqué que le minuteur de votre offre spéciale d\'abonnement automatique a expiré. La vie est occupée—nous comprenons!',
      headline: 'Bonne nouvelle : Nous vous donnons une autre chance',
      subheadline: 'La même excellente offre, prolongée juste pour vous',
      benefit1: '✓ Économisez 25% sur l\'abonnement trimestriel',
      benefit2: '✓ Livraison gratuite tous les 3 mois',
      benefit3: '✓ Ne manquez jamais au pire moment',
      benefit4: '✓ Annulez ou suspendez à tout moment—aucun engagement',
      pricing: 'Seulement 31,99 $ tous les 3 mois (3 × 50g sachets)',
      savings: 'Prix régulier : 44,97 $ — Vous économisez : 12,98 $ (29%)',
      cta: 'Activer ma réduction d\'abonnement',
      urgency: '⏰ Prolongé pour 24 heures seulement',
      whyAutoship: 'Pourquoi les clients adorent l\'abonnement automatique :',
      reason1: '• "Je n\'oublie plus jamais de recommander" — Lisa K.',
      reason2: '• "Les économies s\'accumulent rapidement!" — Michael P.',
      reason3: '• "Une chose de moins à penser" — Jessica R.',
      guarantee: 'Essayez sans risque pendant 30 jours • Garantie de remboursement intégral',
      footer: 'Vous avez des questions? Notre équipe est là pour vous aider à support@purrify.ca'
    },
    zh: {
      subject: '您的25%折扣已过期——我们为您延期！',
      greeting: `您好 ${customerName}`,
      intro: '我们注意到您的自动订购特别优惠计时器已过期。生活很忙碌——我们理解！',
      headline: '好消息：我们再给您一次机会',
      subheadline: '同样的优惠，专为您延期',
      benefit1: '✓ 季度自动订购节省25%',
      benefit2: '✓ 每3个月免费送货',
      benefit3: '✓ 永不在最糟糕的时候用完',
      benefit4: '✓ 随时取消或暂停——零承诺',
      pricing: '每3个月仅需$31.99（3 × 50g袋）',
      savings: '常规价格：$44.97 — 您节省：$12.98（29%）',
      cta: '激活我的自动订购折扣',
      urgency: '⏰ 仅延期24小时',
      whyAutoship: '为什么客户喜欢自动订购：',
      reason1: '• "我再也不会忘记重新订购了" — Lisa K.',
      reason2: '• "节省的费用累积很快！" — Michael P.',
      reason3: '• "少了一件需要考虑的事" — Jessica R.',
      guarantee: '30天无风险试用 • 全额退款保证',
      footer: '有疑问？我们的团队随时为您提供帮助：support@purrify.ca'
    }
  };

  const t = content[locale as keyof typeof content] || content.en;

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
        <table role="presentation" style="width: 100%; max-width: 600px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">

          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center;">
              <img src="https://www.purrify.ca/purrify-logo.png" alt="Purrify" style="width: 120px; height: auto;">
            </td>
          </tr>

          <!-- Urgency Banner -->
          <tr>
            <td style="padding: 0 40px 20px;">
              <div style="background: linear-gradient(135deg, #f56565 0%, #ed8936 100%); padding: 15px; border-radius: 8px; text-align: center; color: #ffffff; font-size: 15px; font-weight: 600;">
                ${t.urgency}
              </div>
            </td>
          </tr>

          <!-- Greeting -->
          <tr>
            <td style="padding: 0 40px 20px;">
              <h1 style="margin: 0; font-size: 24px; font-weight: 600; color: #1a1a1a;">${t.greeting},</h1>
            </td>
          </tr>

          <!-- Intro -->
          <tr>
            <td style="padding: 0 40px 20px; color: #4a5568; font-size: 16px; line-height: 1.6;">
              ${t.intro}
            </td>
          </tr>

          <!-- Headline -->
          <tr>
            <td style="padding: 0 40px 10px;">
              <h2 style="margin: 0; color: #1a1a1a; font-size: 26px; font-weight: 700; text-align: center;">${t.headline}</h2>
            </td>
          </tr>

          <!-- Subheadline -->
          <tr>
            <td style="padding: 0 40px 30px; text-align: center; color: #718096; font-size: 16px;">
              ${t.subheadline}
            </td>
          </tr>

          <!-- Benefits -->
          <tr>
            <td style="padding: 0 40px 30px;">
              <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f7fafc; border-radius: 8px; padding: 20px;">
                <tr>
                  <td style="padding: 10px; color: #2d3748; font-size: 16px; line-height: 1.8;">
                    ${t.benefit1}<br>
                    ${t.benefit2}<br>
                    ${t.benefit3}<br>
                    ${t.benefit4}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Pricing Box -->
          <tr>
            <td style="padding: 0 40px 20px;">
              <div style="background: linear-gradient(135deg, #03E46A 0%, #03C45B 100%); border-radius: 12px; padding: 25px; text-align: center; box-shadow: 0 4px 12px rgba(3, 228, 106, 0.3);">
                <p style="margin: 0 0 10px; font-size: 22px; font-weight: 700; color: #ffffff;">${t.pricing}</p>
                <p style="margin: 0; font-size: 15px; color: #ffffff; opacity: 0.95;">
                  <span style="text-decoration: line-through; opacity: 0.8;">${t.savings.split('—')[0].trim()}</span>
                  <br>
                  <span style="font-weight: 700; font-size: 18px;">${t.savings.split('—')[1].trim()}</span>
                </p>
              </div>
            </td>
          </tr>

          <!-- CTA Button -->
          <tr>
            <td style="padding: 0 40px 30px; text-align: center;">
              <a href="https://www.purrify.ca/checkout?product=purrify-50g-autoship&email_recovery=true"
                 style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; padding: 18px 45px; border-radius: 8px; font-size: 18px; font-weight: 700; box-shadow: 0 4px 16px rgba(102, 126, 234, 0.4);">
                ${t.cta}
              </a>
            </td>
          </tr>

          <!-- Social Proof -->
          <tr>
            <td style="padding: 0 40px 30px;">
              <div style="background-color: #edf2f7; border-radius: 8px; padding: 25px;">
                <p style="margin: 0 0 15px; font-size: 17px; font-weight: 600; color: #2d3748;">${t.whyAutoship}</p>
                <p style="margin: 0; font-size: 15px; color: #4a5568; line-height: 1.8;">
                  ${t.reason1}<br>
                  ${t.reason2}<br>
                  ${t.reason3}
                </p>
              </div>
            </td>
          </tr>

          <!-- Guarantee -->
          <tr>
            <td style="padding: 0 40px 30px; text-align: center;">
              <div style="border: 2px solid #03E46A; border-radius: 8px; padding: 20px; background-color: #f0fdf4;">
                <p style="margin: 0; color: #166534; font-size: 16px; font-weight: 600;">
                  ✓ ${t.guarantee}
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; background-color: #f7fafc; border-top: 1px solid #e2e8f0; text-align: center; color: #718096; font-size: 14px; line-height: 1.6;">
              ${t.footer}
              <br><br>
              <a href="https://www.purrify.ca" style="color: #667eea; text-decoration: none;">www.purrify.ca</a>
              <br><br>
              <a href="https://www.purrify.ca/unsubscribe?email={email}" style="color: #a0aec0; text-decoration: underline; font-size: 12px;">Unsubscribe</a>
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

export const getUpsellExpiredEmailSubject = (locale: string = 'en'): string => {
  const subjects = {
    en: 'Your Special 25% Discount Expired—We\'re Extending It!',
    fr: 'Votre réduction de 25% a expiré—Nous la prolongeons!',
    zh: '您的25%折扣已过期——我们为您延期！'
  };
  return subjects[locale as keyof typeof subjects] || subjects.en;
};
