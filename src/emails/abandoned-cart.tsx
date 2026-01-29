/**
 * Email Template: Abandoned Cart Recovery
 * Sent to users who have abandoned their cart
 */

import type { CartItem } from '../lib/cart-tracking';

interface AbandonedCartEmailProps {
  customerName?: string;
  items: CartItem[];
  totalAmount: number; // In cents
  discountCode?: string;
  discountPercentage?: number;
  locale?: string;
  recoveryUrl: string;
  isSecondEmail?: boolean;
}

export const AbandonedCartEmailHTML = ({
  customerName = 'Friend',
  items,
  totalAmount,
  discountCode,
  discountPercentage = 10,
  locale = 'en',
  recoveryUrl,
  isSecondEmail = false,
}: AbandonedCartEmailProps) => {
  const content = {
    en: {
      subject: isSecondEmail
        ? 'Last chance! Your cart is about to expire'
        : 'Did you forget something?',
      greeting: `Hi ${customerName}`,
      intro: isSecondEmail
        ? 'Your cart is still waiting for you, but it will expire soon! Complete your order now and enjoy fresh, odor-free air.'
        : "We noticed you left some items in your cart. Your furry friend's fresh air solution is just a click away!",
      cartTitle: 'Your Cart',
      product: 'Product',
      quantity: 'Qty',
      price: 'Price',
      subtotal: 'Subtotal',
      discountTitle: 'Special Offer Just For You!',
      discountText: `Use code <strong style="color: #03E46A;">${discountCode}</strong> for ${discountPercentage}% off your order.`,
      discountExpiry: 'This offer expires in 24 hours.',
      ctaButton: isSecondEmail ? 'Complete My Order Now' : 'Return to My Cart',
      whyPurrify: 'Why Cat Owners Love Purrify',
      benefit1: 'Eliminates odor at the molecular level',
      benefit2: 'Works with any cat litter',
      benefit3: '100% natural coconut shell activated carbon',
      benefit4: 'No harsh chemicals or fragrances',
      questions: 'Questions?',
      questionsText: "We're here to help! Reply to this email or contact us at:",
      supportEmail: 'support@purrify.ca',
      thanks: 'Hoping to see you back soon!',
      team: 'The Purrify Team',
      unsubscribe: 'You received this email because you started an order at purrify.ca',
      unsubscribeLink: 'Unsubscribe',
    },
    fr: {
      subject: isSecondEmail
        ? 'Derniere chance! Votre panier va bientot expirer'
        : 'Avez-vous oublie quelque chose?',
      greeting: `Bonjour ${customerName}`,
      intro: isSecondEmail
        ? "Votre panier vous attend toujours, mais il expirera bientot! Completez votre commande maintenant et profitez d'un air frais et sans odeur."
        : "Nous avons remarque que vous avez laisse des articles dans votre panier. La solution d'air frais pour votre ami a fourrure n'est qu'a un clic!",
      cartTitle: 'Votre Panier',
      product: 'Produit',
      quantity: 'Qte',
      price: 'Prix',
      subtotal: 'Sous-total',
      discountTitle: 'Offre Speciale Pour Vous!',
      discountText: `Utilisez le code <strong style="color: #03E46A;">${discountCode}</strong> pour ${discountPercentage}% de reduction sur votre commande.`,
      discountExpiry: 'Cette offre expire dans 24 heures.',
      ctaButton: isSecondEmail ? 'Finaliser Ma Commande' : 'Retourner a Mon Panier',
      whyPurrify: 'Pourquoi les proprietaires de chats adorent Purrify',
      benefit1: "Elimine les odeurs au niveau moleculaire",
      benefit2: 'Fonctionne avec toutes les litieres',
      benefit3: 'Charbon actif 100% naturel de coque de noix de coco',
      benefit4: 'Sans produits chimiques ni parfums agressifs',
      questions: 'Des questions?',
      questionsText: "Nous sommes la pour vous aider! Repondez a cet e-mail ou contactez-nous a:",
      supportEmail: 'support@purrify.ca',
      thanks: 'En esperant vous revoir bientot!',
      team: "L'equipe Purrify",
      unsubscribe: 'Vous avez recu cet e-mail car vous avez commence une commande sur purrify.ca',
      unsubscribeLink: 'Se desabonner',
    },
    zh: {
      subject: isSecondEmail
        ? '最后机会！您的购物车即将过期'
        : '您是否忘记了什么？',
      greeting: `您好 ${customerName}`,
      intro: isSecondEmail
        ? '您的购物车仍在等待您，但即将过期！立即完成订单，享受清新无异味的空气。'
        : '我们注意到您的购物车中还有一些商品。您毛茸茸朋友的清新空气解决方案只需点击一下即可获得！',
      cartTitle: '您的购物车',
      product: '产品',
      quantity: '数量',
      price: '价格',
      subtotal: '小计',
      discountTitle: '专属优惠！',
      discountText: `使用代码 <strong style="color: #03E46A;">${discountCode}</strong> 享受订单 ${discountPercentage}% 折扣。`,
      discountExpiry: '此优惠24小时后过期。',
      ctaButton: isSecondEmail ? '立即完成订单' : '返回购物车',
      whyPurrify: '为什么猫主人喜爱Purrify',
      benefit1: '在分子级别消除异味',
      benefit2: '适用于任何猫砂',
      benefit3: '100%天然椰壳活性炭',
      benefit4: '无刺激性化学物质或香料',
      questions: '有问题？',
      questionsText: '我们随时为您提供帮助！回复此邮件或联系我们：',
      supportEmail: 'support@purrify.ca',
      thanks: '期待您的回来！',
      team: 'Purrify团队',
      unsubscribe: '您收到此邮件是因为您在purrify.ca开始了订单',
      unsubscribeLink: '取消订阅',
    },
  };

  const t = content[locale as keyof typeof content] || content.en;
  const formattedTotal = (totalAmount / 100).toFixed(2);

  // Generate item rows HTML
  const itemRowsHTML = items
    .map(
      (item) => `
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">
          <div style="display: flex; align-items: center;">
            ${
              item.image
                ? `<img src="${item.image}" alt="${item.productName}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px; margin-right: 12px;">`
                : ''
            }
            <span style="color: #2d3748; font-weight: 500;">${item.productName}</span>
          </div>
        </td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; text-align: center; color: #4a5568;">
          ${item.quantity}
        </td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; text-align: right; color: #2d3748; font-weight: 600;">
          $${((item.price * item.quantity) / 100).toFixed(2)}
        </td>
      </tr>
    `
    )
    .join('');

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
              <img src="https://www.purrify.ca/images/purrify-logo.png" alt="Purrify" style="width: 120px; height: auto; margin-bottom: 20px;">
              <h1 style="margin: 0; font-size: 28px; font-weight: 700; color: #ffffff;">${t.subject}</h1>
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

          <!-- Cart Items -->
          <tr>
            <td style="padding: 0 40px 30px;">
              <div style="background-color: #f7fafc; border: 2px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
                <h3 style="margin: 0; padding: 16px 20px; font-size: 18px; font-weight: 600; color: #1a1a1a; background-color: #edf2f7; border-bottom: 1px solid #e2e8f0;">${t.cartTitle}</h3>

                <table role="presentation" style="width: 100%; border-collapse: collapse;">
                  <thead>
                    <tr style="background-color: #f7fafc;">
                      <th style="padding: 12px; text-align: left; color: #718096; font-size: 12px; text-transform: uppercase; font-weight: 600;">${t.product}</th>
                      <th style="padding: 12px; text-align: center; color: #718096; font-size: 12px; text-transform: uppercase; font-weight: 600;">${t.quantity}</th>
                      <th style="padding: 12px; text-align: right; color: #718096; font-size: 12px; text-transform: uppercase; font-weight: 600;">${t.price}</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${itemRowsHTML}
                    <tr>
                      <td colspan="2" style="padding: 16px 12px; text-align: right; color: #1a1a1a; font-size: 16px; font-weight: 700;">${t.subtotal}:</td>
                      <td style="padding: 16px 12px; text-align: right; color: #03E46A; font-size: 18px; font-weight: 700;">$${formattedTotal} CAD</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </td>
          </tr>

          ${
            discountCode
              ? `
          <!-- Discount Code -->
          <tr>
            <td style="padding: 0 40px 30px;">
              <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border: 2px dashed #f59e0b; border-radius: 8px; padding: 20px; text-align: center;">
                <h3 style="margin: 0 0 10px; font-size: 18px; font-weight: 700; color: #92400e;">${t.discountTitle}</h3>
                <p style="margin: 0 0 10px; font-size: 16px; color: #78350f;">
                  ${t.discountText}
                </p>
                <p style="margin: 0; font-size: 13px; color: #a16207;">
                  ${t.discountExpiry}
                </p>
              </div>
            </td>
          </tr>
          `
              : ''
          }

          <!-- CTA Button -->
          <tr>
            <td style="padding: 0 40px 30px; text-align: center;">
              <a href="${recoveryUrl}" style="display: inline-block; padding: 16px 40px; background: linear-gradient(135deg, #03E46A 0%, #02C55A 100%); color: #ffffff; font-size: 18px; font-weight: 700; text-decoration: none; border-radius: 8px; box-shadow: 0 4px 12px rgba(3, 228, 106, 0.4);">
                ${t.ctaButton}
              </a>
            </td>
          </tr>

          <!-- Why Purrify Section -->
          <tr>
            <td style="padding: 0 40px 30px;">
              <h3 style="margin: 0 0 16px; font-size: 18px; font-weight: 600; color: #1a1a1a;">${t.whyPurrify}</h3>
              <table role="presentation" style="width: 100%;">
                <tr>
                  <td style="padding: 8px 0; color: #4a5568; font-size: 14px;">
                    <span style="color: #03E46A; margin-right: 8px;">&#10003;</span> ${t.benefit1}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #4a5568; font-size: 14px;">
                    <span style="color: #03E46A; margin-right: 8px;">&#10003;</span> ${t.benefit2}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #4a5568; font-size: 14px;">
                    <span style="color: #03E46A; margin-right: 8px;">&#10003;</span> ${t.benefit3}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #4a5568; font-size: 14px;">
                    <span style="color: #03E46A; margin-right: 8px;">&#10003;</span> ${t.benefit4}
                  </td>
                </tr>
              </table>
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
              ${t.unsubscribe}
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

export const getAbandonedCartEmailSubject = (locale: string = 'en', isSecondEmail: boolean = false): string => {
  const subjects = {
    en: isSecondEmail
      ? 'Last chance! Your cart is about to expire'
      : 'Did you forget something?',
    fr: isSecondEmail
      ? 'Derniere chance! Votre panier va bientot expirer'
      : 'Avez-vous oublie quelque chose?',
    zh: isSecondEmail
      ? '最后机会！您的购物车即将过期'
      : '您是否忘记了什么？',
  };
  return subjects[locale as keyof typeof subjects] || subjects.en;
};
