/**
 * Email Template: Post-Purchase Review Request
 * Sent 7+ days after order delivery to request customer feedback
 */

interface ReviewRequestEmailProps {
  customerName?: string;
  customerEmail: string;
  orderNumber?: string;
  productName?: string;
  locale?: string;
}

export const ReviewRequestEmailHTML = ({
  customerName = 'Valued Customer',
  customerEmail,
  orderNumber = '',
  productName = 'Purrify',
  locale = 'en'
}: ReviewRequestEmailProps) => {
  const content = {
    en: {
      subject: 'How is Purrify working for you?',
      greeting: `Hi ${customerName}`,
      intro: 'We hope you and your furry friend are enjoying a fresher-smelling home with Purrify!',
      request: 'We would love to hear about your experience. Your feedback helps other cat parents make informed decisions and helps us continue to improve.',
      orderReminder: orderNumber ? `Order #${orderNumber}` : '',
      productReminder: `Product: ${productName}`,
      incentiveTitle: 'Get 10% Off Your Next Order!',
      incentiveText: 'As a thank you for taking the time to share your experience, use code REVIEW10 at checkout for 10% off your next purchase.',
      ctaButton: 'Leave a Review',
      ctaUrl: 'https://www.purrify.ca/reviews',
      alternativeText: 'You can also leave us a review on Google:',
      googleReviewCta: 'Review on Google',
      benefits: {
        title: 'Why Your Review Matters:',
        item1: 'Help other cat owners discover odor-free living',
        item2: 'Share tips that worked for you',
        item3: 'Your feedback shapes future products'
      },
      discountCode: 'REVIEW10',
      discountNote: 'Use this code at checkout for 10% off your next order',
      questions: 'Questions or Concerns?',
      questionsText: 'If Purrify hasn\'t met your expectations, we want to make it right. Please reply to this email or contact us directly.',
      supportEmail: 'support@purrify.ca',
      thanks: 'Thank you for being part of the Purrify family!',
      team: 'The Purrify Team',
      unsubscribe: 'If you no longer wish to receive these emails, click here to unsubscribe.',
      unsubscribeUrl: 'https://www.purrify.ca/unsubscribe?email=' + encodeURIComponent(customerEmail),
      footer: 'You received this email because you made a purchase at purrify.ca'
    },
    fr: {
      subject: 'Comment Purrify fonctionne-t-il pour vous ?',
      greeting: `Bonjour ${customerName}`,
      intro: 'Nous esperons que vous et votre ami a fourrure profitez d\'une maison plus fraiche avec Purrify !',
      request: 'Nous aimerions connaitre votre experience. Vos commentaires aident d\'autres proprietaires de chats a prendre des decisions eclairees et nous aident a continuer a nous ameliorer.',
      orderReminder: orderNumber ? `Commande #${orderNumber}` : '',
      productReminder: `Produit : ${productName}`,
      incentiveTitle: 'Obtenez 10% de reduction sur votre prochaine commande !',
      incentiveText: 'En remerciement pour votre temps, utilisez le code REVIEW10 lors de votre prochain achat pour obtenir 10% de reduction.',
      ctaButton: 'Laisser un avis',
      ctaUrl: 'https://www.purrify.ca/fr/reviews',
      alternativeText: 'Vous pouvez egalement nous laisser un avis sur Google :',
      googleReviewCta: 'Avis sur Google',
      benefits: {
        title: 'Pourquoi votre avis compte :',
        item1: 'Aidez d\'autres proprietaires de chats a decouvrir une vie sans odeur',
        item2: 'Partagez les astuces qui ont fonctionne pour vous',
        item3: 'Vos commentaires faconnent les futurs produits'
      },
      discountCode: 'REVIEW10',
      discountNote: 'Utilisez ce code lors du paiement pour 10% de reduction sur votre prochaine commande',
      questions: 'Des questions ou des preoccupations ?',
      questionsText: 'Si Purrify n\'a pas repondu a vos attentes, nous voulons arranger les choses. Veuillez repondre a cet email ou nous contacter directement.',
      supportEmail: 'support@purrify.ca',
      thanks: 'Merci de faire partie de la famille Purrify !',
      team: 'L\'equipe Purrify',
      unsubscribe: 'Si vous ne souhaitez plus recevoir ces emails, cliquez ici pour vous desabonner.',
      unsubscribeUrl: 'https://www.purrify.ca/unsubscribe?email=' + encodeURIComponent(customerEmail),
      footer: 'Vous avez recu cet email car vous avez effectue un achat sur purrify.ca'
    },
    zh: {
      subject: 'Purrify对您有效吗？',
      greeting: `您好 ${customerName}`,
      intro: '我们希望您和您的毛茸茸的朋友正在享受使用Purrify带来的清新家居环境！',
      request: '我们很想听听您的使用体验。您的反馈可以帮助其他猫主人做出明智的决定，也帮助我们不断改进。',
      orderReminder: orderNumber ? `订单号 #${orderNumber}` : '',
      productReminder: `产品：${productName}`,
      incentiveTitle: '下次订单可享受10%折扣！',
      incentiveText: '感谢您抽出时间分享您的体验，在结账时使用代码 REVIEW10 即可享受下次购买10%的折扣。',
      ctaButton: '留下评价',
      ctaUrl: 'https://www.purrify.ca/zh/reviews',
      alternativeText: '您也可以在Google上给我们留下评价：',
      googleReviewCta: '在Google上评价',
      benefits: {
        title: '为什么您的评价很重要：',
        item1: '帮助其他猫主人发现无异味的生活',
        item2: '分享对您有效的技巧',
        item3: '您的反馈塑造未来的产品'
      },
      discountCode: 'REVIEW10',
      discountNote: '在结账时使用此代码可享受下次订单10%的折扣',
      questions: '有问题或疑虑？',
      questionsText: '如果Purrify没有达到您的期望，我们希望能够解决。请回复此邮件或直接与我们联系。',
      supportEmail: 'support@purrify.ca',
      thanks: '感谢您成为Purrify大家庭的一员！',
      team: 'Purrify团队',
      unsubscribe: '如果您不想再收到这些邮件，请点击这里取消订阅。',
      unsubscribeUrl: 'https://www.purrify.ca/unsubscribe?email=' + encodeURIComponent(customerEmail),
      footer: '您收到此邮件是因为您在purrify.ca上进行了购买'
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
        <table role="presentation" style="width: 100%; max-width: 600px; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">

          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center; background: linear-gradient(135deg, #03E46A 0%, #02C55A 100%); border-radius: 12px 12px 0 0;">
              <img src="https://www.purrify.ca/optimized/logos/purrify-logo.png" alt="Purrify" style="width: 120px; height: auto; margin-bottom: 20px;">
              <h1 style="margin: 0; font-size: 26px; font-weight: 700; color: #ffffff;">${t.subject}</h1>
            </td>
          </tr>

          <!-- Greeting -->
          <tr>
            <td style="padding: 30px 40px 20px;">
              <h2 style="margin: 0 0 10px; font-size: 22px; font-weight: 600; color: #1a1a1a;">${t.greeting},</h2>
              <p style="margin: 0 0 15px; color: #4a5568; font-size: 16px; line-height: 1.6;">
                ${t.intro}
              </p>
              <p style="margin: 0; color: #4a5568; font-size: 16px; line-height: 1.6;">
                ${t.request}
              </p>
            </td>
          </tr>

          <!-- Order Reminder -->
          ${t.orderReminder ? `
          <tr>
            <td style="padding: 0 40px 20px;">
              <div style="background-color: #f7fafc; border-radius: 8px; padding: 15px;">
                <p style="margin: 0; color: #718096; font-size: 14px;">
                  ${t.orderReminder}<br>
                  ${t.productReminder}
                </p>
              </div>
            </td>
          </tr>
          ` : ''}

          <!-- Main CTA Button -->
          <tr>
            <td style="padding: 10px 40px 30px; text-align: center;">
              <a href="${t.ctaUrl}"
                 style="display: inline-block; background: linear-gradient(135deg, #03E46A 0%, #02C55A 100%); color: #ffffff; text-decoration: none; padding: 18px 50px; border-radius: 8px; font-size: 18px; font-weight: 700; box-shadow: 0 4px 12px rgba(3, 228, 106, 0.3);">
                ${t.ctaButton}
              </a>
            </td>
          </tr>

          <!-- Incentive Box -->
          <tr>
            <td style="padding: 0 40px 30px;">
              <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px; padding: 25px; text-align: center;">
                <h3 style="margin: 0 0 10px; font-size: 20px; font-weight: 700; color: #ffffff;">${t.incentiveTitle}</h3>
                <p style="margin: 0 0 15px; color: #ffffff; font-size: 15px; opacity: 0.9;">
                  ${t.incentiveText}
                </p>
                <div style="background-color: rgba(255,255,255,0.2); border: 2px dashed #ffffff; border-radius: 8px; padding: 12px 20px; display: inline-block;">
                  <span style="font-size: 24px; font-weight: 700; color: #ffffff; letter-spacing: 3px;">${t.discountCode}</span>
                </div>
              </div>
            </td>
          </tr>

          <!-- Why Your Review Matters -->
          <tr>
            <td style="padding: 0 40px 30px;">
              <h4 style="margin: 0 0 15px; font-size: 16px; font-weight: 600; color: #2d3748;">${t.benefits.title}</h4>
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #4a5568; font-size: 15px;">
                    <span style="color: #03E46A; margin-right: 8px;">&#10003;</span> ${t.benefits.item1}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #4a5568; font-size: 15px;">
                    <span style="color: #03E46A; margin-right: 8px;">&#10003;</span> ${t.benefits.item2}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #4a5568; font-size: 15px;">
                    <span style="color: #03E46A; margin-right: 8px;">&#10003;</span> ${t.benefits.item3}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Google Review Alternative -->
          <tr>
            <td style="padding: 0 40px 30px; text-align: center;">
              <p style="margin: 0 0 15px; color: #718096; font-size: 14px;">
                ${t.alternativeText}
              </p>
              <a href="https://g.page/r/purrify/review"
                 style="display: inline-block; background-color: #ffffff; color: #4285f4; text-decoration: none; padding: 12px 25px; border-radius: 8px; font-size: 14px; font-weight: 600; border: 2px solid #4285f4;">
                ${t.googleReviewCta}
              </a>
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
              <br><br>
              <a href="${t.unsubscribeUrl}" style="color: #a0aec0; text-decoration: underline; font-size: 11px;">
                ${t.unsubscribe}
              </a>
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

export const getReviewRequestEmailSubject = (locale: string = 'en'): string => {
  const subjects = {
    en: 'How is Purrify working for you?',
    fr: 'Comment Purrify fonctionne-t-il pour vous ?',
    zh: 'Purrify对您有效吗？'
  };
  return subjects[locale as keyof typeof subjects] || subjects.en;
};
