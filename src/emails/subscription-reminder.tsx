/**
 * Email Template: Subscription Reminder
 * Sent to subscribers before their next delivery
 */

interface SubscriptionItem {
  productName: string;
  quantity: number;
  price: number; // In dollars
  image?: string;
}

interface SubscriptionReminderEmailProps {
  customerName?: string;
  items: SubscriptionItem[];
  totalAmount: number; // In dollars
  nextDeliveryDate: string; // Formatted date string
  frequency: string; // e.g., "monthly", "biweekly"
  manageUrl: string;
  locale?: string;
}

export const SubscriptionReminderEmailHTML = ({
  customerName = 'Friend',
  items,
  totalAmount,
  nextDeliveryDate,
  frequency,
  manageUrl,
  locale = 'en',
}: SubscriptionReminderEmailProps) => {
  const content = {
    en: {
      subject: `Your Purrify subscription renews on ${nextDeliveryDate}`,
      greeting: `Hi ${customerName}`,
      intro: `Your ${frequency} Purrify subscription will renew soon! Here's a reminder of what's coming your way:`,
      deliveryDate: 'Next Delivery',
      orderSummary: 'Your Order',
      product: 'Product',
      quantity: 'Qty',
      price: 'Price',
      total: 'Total',
      needChanges: 'Need to make changes?',
      needChangesText:
        "You can skip, pause, or modify your subscription anytime. Just click below to manage your subscription.",
      manageButton: 'Manage Subscription',
      skipButton: 'Skip This Delivery',
      whySubscribe: 'Why Subscribers Love Purrify',
      benefit1: 'Never run out of odor control',
      benefit2: 'Save 15% on every delivery',
      benefit3: 'Free shipping on all orders',
      benefit4: 'Easy to pause or cancel anytime',
      questions: 'Questions?',
      questionsText: "We're here to help! Reply to this email or contact us at:",
      supportEmail: 'support@purrify.ca',
      thanks: 'Thank you for being a subscriber!',
      team: 'The Purrify Team',
      unsubscribe: "You're receiving this because you have an active Purrify subscription",
    },
    fr: {
      subject: `Votre abonnement Purrify sera renouvele le ${nextDeliveryDate}`,
      greeting: `Bonjour ${customerName}`,
      intro: `Votre abonnement ${frequency} Purrify sera bientot renouvele! Voici un rappel de ce qui vous attend:`,
      deliveryDate: 'Prochaine livraison',
      orderSummary: 'Votre commande',
      product: 'Produit',
      quantity: 'Qte',
      price: 'Prix',
      total: 'Total',
      needChanges: 'Besoin de faire des changements?',
      needChangesText:
        'Vous pouvez sauter, mettre en pause ou modifier votre abonnement a tout moment.',
      manageButton: 'Gerer mon abonnement',
      skipButton: 'Sauter cette livraison',
      whySubscribe: 'Pourquoi les abonnes adorent Purrify',
      benefit1: "Ne manquez jamais de controle des odeurs",
      benefit2: 'Economisez 15% sur chaque livraison',
      benefit3: 'Livraison gratuite sur toutes les commandes',
      benefit4: "Facile a mettre en pause ou annuler",
      questions: 'Des questions?',
      questionsText: 'Nous sommes la pour vous aider! Repondez a cet e-mail ou contactez-nous:',
      supportEmail: 'support@purrify.ca',
      thanks: "Merci d'etre abonne!",
      team: "L'equipe Purrify",
      unsubscribe: 'Vous recevez cet e-mail car vous avez un abonnement Purrify actif',
    },
    zh: {
      subject: `您的Purrify订阅将于${nextDeliveryDate}续订`,
      greeting: `您好 ${customerName}`,
      intro: `您的${frequency}Purrify订阅即将续订！以下是即将送达的订单提醒：`,
      deliveryDate: '下次配送',
      orderSummary: '您的订单',
      product: '产品',
      quantity: '数量',
      price: '价格',
      total: '总计',
      needChanges: '需要更改吗？',
      needChangesText: '您可以随时跳过、暂停或修改您的订阅。',
      manageButton: '管理订阅',
      skipButton: '跳过此次配送',
      whySubscribe: '为什么订阅者喜爱Purrify',
      benefit1: '永不断货的除臭控制',
      benefit2: '每次配送节省15%',
      benefit3: '所有订单免费配送',
      benefit4: '随时暂停或取消',
      questions: '有问题？',
      questionsText: '我们随时为您提供帮助！回复此邮件或联系我们：',
      supportEmail: 'support@purrify.ca',
      thanks: '感谢您成为我们的订阅者！',
      team: 'Purrify团队',
      unsubscribe: '您收到此邮件是因为您有活跃的Purrify订阅',
    },
  };

  const t = content[locale as keyof typeof content] || content.en;

  const itemRowsHTML = items
    .map(
      (item) => `
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">
          <div style="display: flex; align-items: center;">
            ${
              item.image
                ? `<img src="${item.image}" alt="${item.productName}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 8px; margin-right: 12px;">`
                : ''
            }
            <span style="color: #2d3748; font-weight: 500;">${item.productName}</span>
          </div>
        </td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; text-align: center; color: #4a5568;">
          ${item.quantity}
        </td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; text-align: right; color: #2d3748; font-weight: 600;">
          $${(item.price * item.quantity).toFixed(2)}
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
              <img src="https://www.purrify.ca/images/Logos/purrify-logo.png" alt="Purrify" style="width: 100px; height: auto; margin-bottom: 16px;">
              <h1 style="margin: 0; font-size: 22px; font-weight: 700; color: #ffffff;">Subscription Reminder</h1>
            </td>
          </tr>

          <!-- Delivery Date Banner -->
          <tr>
            <td style="padding: 20px 40px;">
              <div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border: 2px solid #03E46A; border-radius: 12px; padding: 20px; text-align: center;">
                <p style="margin: 0 0 5px; font-size: 12px; color: #16a34a; text-transform: uppercase; font-weight: 600; letter-spacing: 1px;">${t.deliveryDate}</p>
                <p style="margin: 0; font-size: 24px; font-weight: 700; color: #166534;">${nextDeliveryDate}</p>
              </div>
            </td>
          </tr>

          <!-- Greeting -->
          <tr>
            <td style="padding: 10px 40px 20px;">
              <h2 style="margin: 0 0 10px; font-size: 20px; font-weight: 600; color: #1a1a1a;">${t.greeting},</h2>
              <p style="margin: 0; color: #4a5568; font-size: 15px; line-height: 1.6;">
                ${t.intro}
              </p>
            </td>
          </tr>

          <!-- Order Summary -->
          <tr>
            <td style="padding: 0 40px 30px;">
              <div style="background-color: #f7fafc; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
                <h3 style="margin: 0; padding: 14px 20px; font-size: 16px; font-weight: 600; color: #1a1a1a; background-color: #edf2f7; border-bottom: 1px solid #e2e8f0;">${t.orderSummary}</h3>

                <table role="presentation" style="width: 100%; border-collapse: collapse;">
                  <thead>
                    <tr style="background-color: #f7fafc;">
                      <th style="padding: 12px; text-align: left; color: #718096; font-size: 11px; text-transform: uppercase; font-weight: 600;">${t.product}</th>
                      <th style="padding: 12px; text-align: center; color: #718096; font-size: 11px; text-transform: uppercase; font-weight: 600;">${t.quantity}</th>
                      <th style="padding: 12px; text-align: right; color: #718096; font-size: 11px; text-transform: uppercase; font-weight: 600;">${t.price}</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${itemRowsHTML}
                    <tr>
                      <td colspan="2" style="padding: 16px 12px; text-align: right; color: #1a1a1a; font-size: 16px; font-weight: 700;">${t.total}:</td>
                      <td style="padding: 16px 12px; text-align: right; color: #03E46A; font-size: 18px; font-weight: 700;">$${totalAmount.toFixed(2)} CAD</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </td>
          </tr>

          <!-- Need Changes Section -->
          <tr>
            <td style="padding: 0 40px 30px;">
              <div style="background-color: #fffbeb; border-left: 4px solid #f59e0b; padding: 20px; border-radius: 4px;">
                <h4 style="margin: 0 0 10px; font-size: 16px; font-weight: 600; color: #92400e;">${t.needChanges}</h4>
                <p style="margin: 0 0 16px; color: #78350f; font-size: 14px; line-height: 1.5;">
                  ${t.needChangesText}
                </p>
                <a href="${manageUrl}" style="display: inline-block; padding: 10px 20px; background: #f59e0b; color: #ffffff; font-size: 14px; font-weight: 600; text-decoration: none; border-radius: 6px;">
                  ${t.manageButton}
                </a>
              </div>
            </td>
          </tr>

          <!-- Why Subscribe Section -->
          <tr>
            <td style="padding: 0 40px 30px;">
              <h3 style="margin: 0 0 16px; font-size: 16px; font-weight: 600; color: #1a1a1a;">${t.whySubscribe}</h3>
              <table role="presentation" style="width: 100%;">
                <tr>
                  <td style="padding: 6px 0; color: #4a5568; font-size: 14px;">
                    <span style="color: #03E46A; margin-right: 8px;">&#10003;</span> ${t.benefit1}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #4a5568; font-size: 14px;">
                    <span style="color: #03E46A; margin-right: 8px;">&#10003;</span> ${t.benefit2}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #4a5568; font-size: 14px;">
                    <span style="color: #03E46A; margin-right: 8px;">&#10003;</span> ${t.benefit3}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #4a5568; font-size: 14px;">
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
                <p style="margin: 0 0 10px; color: #4a5568; font-size: 14px; line-height: 1.5;">
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
              <p style="margin: 0 0 8px; font-size: 15px; font-weight: 600; color: #2d3748;">
                ${t.thanks}
              </p>
              <p style="margin: 0; color: #718096; font-size: 14px;">
                ${t.team}
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px; background-color: #f7fafc; border-top: 1px solid #e2e8f0; text-align: center; color: #718096; font-size: 12px; line-height: 1.6; border-radius: 0 0 12px 12px;">
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

export const getSubscriptionReminderSubject = (
  locale: string = 'en',
  nextDeliveryDate: string
): string => {
  const subjects = {
    en: `Your Purrify subscription renews on ${nextDeliveryDate}`,
    fr: `Votre abonnement Purrify sera renouvele le ${nextDeliveryDate}`,
    zh: `您的Purrify订阅将于${nextDeliveryDate}续订`,
  };
  return subjects[locale as keyof typeof subjects] || subjects.en;
};
