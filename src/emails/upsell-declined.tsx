/**
 * Email Template: Upsell Declined Follow-up
 * Sent when customer declines the post-purchase upsell offer
 */

interface UpsellDeclinedEmailProps {
  customerName?: string;
  locale?: string;
}

export const UpsellDeclinedEmailHTML = ({ customerName = 'Valued Customer', locale = 'en' }: UpsellDeclinedEmailProps) => {
  const content = {
    en: {
      subject: 'Last Chance: Save 25% on Purrify Autoship',
      greeting: `Hi ${customerName}`,
      intro: 'We noticed you passed on our special autoship offer. We understand—sometimes you need time to think it over.',
      headline: 'But we wanted to give you one more chance to save 25%',
      benefit1: '✓ Never run out of Purrify again',
      benefit2: '✓ Free shipping every 3 months',
      benefit3: '✓ Cancel or skip anytime—no commitment',
      benefit4: '✓ Lock in this special price forever',
      pricing: 'Just $31.99 every 3 months (3 bags)',
      savings: 'Regular price: $44.97 — You save: $12.98',
      cta: 'Claim Your 25% Discount Now',
      urgency: '⏰ This offer expires in 48 hours',
      testimonial: '"I almost skipped the autoship, but I\'m so glad I didn\'t! I never run out right when I need it most." — Sarah M., Toronto',
      guarantee: '30-Day Money-Back Guarantee • Cancel Anytime',
      footer: 'Questions? Reply to this email or contact us at support@purrify.ca'
    },
    fr: {
      subject: 'Dernière chance : Économisez 25% sur l\'abonnement Purrify',
      greeting: `Bonjour ${customerName}`,
      intro: 'Nous avons remarqué que vous avez refusé notre offre spéciale d\'abonnement automatique. Nous comprenons—parfois vous avez besoin de temps pour y réfléchir.',
      headline: 'Mais nous voulions vous donner une dernière chance d\'économiser 25%',
      benefit1: '✓ Ne manquez jamais de Purrify',
      benefit2: '✓ Livraison gratuite tous les 3 mois',
      benefit3: '✓ Annulez ou sautez à tout moment—aucun engagement',
      benefit4: '✓ Verrouillez ce prix spécial pour toujours',
      pricing: 'Seulement 31,99 $ tous les 3 mois (3 sachets)',
      savings: 'Prix régulier : 44,97 $ — Vous économisez : 12,98 $',
      cta: 'Réclamez votre réduction de 25% maintenant',
      urgency: '⏰ Cette offre expire dans 48 heures',
      testimonial: '"J\'ai failli sauter l\'abonnement automatique, mais je suis si content de ne pas l\'avoir fait! Je ne manque jamais quand j\'en ai le plus besoin." — Sarah M., Toronto',
      guarantee: 'Garantie de remboursement de 30 jours • Annulez à tout moment',
      footer: 'Des questions? Répondez à cet email ou contactez-nous à support@purrify.ca'
    },
    zh: {
      subject: '最后机会：Purrify自动订购节省25%',
      greeting: `您好 ${customerName}`,
      intro: '我们注意到您拒绝了我们的自动订购特别优惠。我们理解——有时您需要时间考虑。',
      headline: '但我们想再给您一次节省25%的机会',
      benefit1: '✓ 永不缺货',
      benefit2: '✓ 每3个月免费送货',
      benefit3: '✓ 随时取消或跳过——无需承诺',
      benefit4: '✓ 永久锁定此特惠价格',
      pricing: '每3个月仅需$31.99（3袋）',
      savings: '常规价格：$44.97 — 您节省：$12.98',
      cta: '立即领取25%折扣',
      urgency: '⏰ 此优惠将在48小时后过期',
      testimonial: '"我差点跳过自动订购，但我很高兴我没有这样做！我永远不会在最需要的时候用完。" — Sarah M., 多伦多',
      guarantee: '30天退款保证 • 随时取消',
      footer: '有疑问？回复此邮件或联系我们：support@purrify.ca'
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
              <img src="https://www.purrify.ca/images/Logos/purrify-logo.png" alt="Purrify" style="width: 120px; height: auto;">
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
            <td style="padding: 0 40px 30px;">
              <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 8px; text-align: center;">
                <h2 style="margin: 0; color: #ffffff; font-size: 22px; font-weight: 700;">${t.headline}</h2>
              </div>
            </td>
          </tr>

          <!-- Benefits -->
          <tr>
            <td style="padding: 0 40px 30px;">
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; color: #2d3748; font-size: 16px; line-height: 1.8;">
                    ${t.benefit1}<br>
                    ${t.benefit2}<br>
                    ${t.benefit3}<br>
                    ${t.benefit4}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Pricing -->
          <tr>
            <td style="padding: 0 40px 20px;">
              <div style="background-color: #f7fafc; border: 2px solid #03E46A; border-radius: 8px; padding: 20px; text-align: center;">
                <p style="margin: 0 0 10px; font-size: 20px; font-weight: 700; color: #1a1a1a;">${t.pricing}</p>
                <p style="margin: 0; font-size: 14px; color: #718096;">
                  <span style="text-decoration: line-through;">${t.savings.split('—')[0].trim()}</span>
                  <br>
                  <span style="color: #03E46A; font-weight: 600;">${t.savings.split('—')[1].trim()}</span>
                </p>
              </div>
            </td>
          </tr>

          <!-- CTA Button -->
          <tr>
            <td style="padding: 0 40px 30px; text-align: center;">
              <a href="https://www.purrify.ca/checkout?product=purrify-50g-autoship&email_offer=true"
                 style="display: inline-block; background: linear-gradient(135deg, #FF3131 0%, #FF6B6B 100%); color: #ffffff; text-decoration: none; padding: 18px 40px; border-radius: 8px; font-size: 18px; font-weight: 700; box-shadow: 0 4px 12px rgba(255, 49, 49, 0.3);">
                ${t.cta}
              </a>
            </td>
          </tr>

          <!-- Urgency -->
          <tr>
            <td style="padding: 0 40px 30px; text-align: center;">
              <p style="margin: 0; background-color: #fff5f5; color: #c53030; padding: 15px; border-radius: 8px; font-size: 16px; font-weight: 600;">
                ${t.urgency}
              </p>
            </td>
          </tr>

          <!-- Testimonial -->
          <tr>
            <td style="padding: 0 40px 30px;">
              <div style="background-color: #edf2f7; border-left: 4px solid #667eea; padding: 20px; border-radius: 4px;">
                <p style="margin: 0; font-size: 15px; font-style: italic; color: #2d3748; line-height: 1.6;">
                  ${t.testimonial}
                </p>
              </div>
            </td>
          </tr>

          <!-- Guarantee -->
          <tr>
            <td style="padding: 0 40px 30px; text-align: center; color: #4a5568; font-size: 14px;">
              ${t.guarantee}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; background-color: #f7fafc; border-top: 1px solid #e2e8f0; text-align: center; color: #718096; font-size: 14px; line-height: 1.6;">
              ${t.footer}
              <br><br>
              <a href="https://www.purrify.ca" style="color: #667eea; text-decoration: none;">www.purrify.ca</a>
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

export const getUpsellDeclinedEmailSubject = (locale: string = 'en'): string => {
  const subjects = {
    en: 'Last Chance: Save 25% on Purrify Autoship',
    fr: 'Dernière chance : Économisez 25% sur l\'abonnement Purrify',
    zh: '最后机会：Purrify自动订购节省25%'
  };
  return subjects[locale as keyof typeof subjects] || subjects.en;
};
