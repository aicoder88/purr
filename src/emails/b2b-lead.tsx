/**
 * B2B Lead Notification Email Template
 *
 * Sent to the business team when a B2B partner inquiry is submitted.
 */

interface B2BLeadEmailProps {
  businessName: string;
  contactName: string;
  email: string;
  phone?: string;
  businessType: 'veterinarian' | 'catCafe' | 'shelter' | 'groomer' | 'hospitality' | 'retailer';
  location?: string;
  catCount?: string;
  message?: string;
  submittedAt: string;
}

const businessTypeLabels: Record<string, string> = {
  veterinarian: 'Veterinary Clinic',
  catCafe: 'Cat Cafe',
  shelter: 'Animal Shelter',
  groomer: 'Pet Grooming Salon',
  hospitality: 'Pet-Friendly Hospitality',
  retailer: 'Retail Partner',
};

export function B2BLeadEmailHTML({
  businessName,
  contactName,
  email,
  phone,
  businessType,
  location,
  catCount,
  message,
  submittedAt,
}: B2BLeadEmailProps): string {
  const businessTypeLabel = businessTypeLabels[businessType] || businessType;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New B2B Lead: ${businessName}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f3f4f6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">

          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #10B981 0%, #3694FF 100%); padding: 32px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: bold;">
                🎉 New B2B Lead!
              </h1>
              <p style="margin: 8px 0 0; color: rgba(255,255,255,0.9); font-size: 16px;">
                ${businessTypeLabel}
              </p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 32px;">

              <!-- Business Info -->
              <div style="background-color: #f0fdf4; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
                <h2 style="margin: 0 0 16px; color: #166534; font-size: 18px;">
                  📋 Business Information
                </h2>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280; font-size: 14px; width: 40%;">Business Name:</td>
                    <td style="padding: 8px 0; color: #111827; font-size: 14px; font-weight: 600;">${businessName}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Type:</td>
                    <td style="padding: 8px 0; color: #111827; font-size: 14px; font-weight: 600;">${businessTypeLabel}</td>
                  </tr>
                  ${location ? `
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Location:</td>
                    <td style="padding: 8px 0; color: #111827; font-size: 14px; font-weight: 600;">${location}</td>
                  </tr>
                  ` : ''}
                  ${catCount ? `
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Number of Cats:</td>
                    <td style="padding: 8px 0; color: #111827; font-size: 14px; font-weight: 600;">${catCount}</td>
                  </tr>
                  ` : ''}
                </table>
              </div>

              <!-- Contact Info -->
              <div style="background-color: #eff6ff; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
                <h2 style="margin: 0 0 16px; color: #1e40af; font-size: 18px;">
                  👤 Contact Information
                </h2>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280; font-size: 14px; width: 40%;">Contact Name:</td>
                    <td style="padding: 8px 0; color: #111827; font-size: 14px; font-weight: 600;">${contactName}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Email:</td>
                    <td style="padding: 8px 0; color: #111827; font-size: 14px; font-weight: 600;">
                      <a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a>
                    </td>
                  </tr>
                  ${phone ? `
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Phone:</td>
                    <td style="padding: 8px 0; color: #111827; font-size: 14px; font-weight: 600;">
                      <a href="tel:${phone}" style="color: #2563eb; text-decoration: none;">${phone}</a>
                    </td>
                  </tr>
                  ` : ''}
                </table>
              </div>

              ${message ? `
              <!-- Message -->
              <div style="background-color: #fef3c7; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
                <h2 style="margin: 0 0 12px; color: #92400e; font-size: 18px;">
                  💬 Message
                </h2>
                <p style="margin: 0; color: #451a03; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
              </div>
              ` : ''}

              <!-- Action Buttons -->
              <div style="text-align: center; margin-top: 32px;">
                <a href="mailto:${email}?subject=Re: Purrify Partnership Inquiry - ${businessName}"
                   style="display: inline-block; background: linear-gradient(135deg, #10B981 0%, #059669 100%); color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-weight: bold; font-size: 16px; margin: 0 8px;">
                  📧 Reply to Lead
                </a>
              </div>

              <!-- Timestamp -->
              <p style="margin: 24px 0 0; text-align: center; color: #9ca3af; font-size: 12px;">
                Submitted on ${submittedAt}
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; color: #6b7280; font-size: 12px;">
                This is an automated notification from the Purrify B2B Lead System
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

export function getB2BLeadEmailSubject(businessName: string, businessType: string): string {
  const typeLabel = businessTypeLabels[businessType] || businessType;
  return `🎯 New B2B Lead: ${businessName} (${typeLabel})`;
}

/**
 * B2B Lead Confirmation Email Template
 *
 * Sent to the lead to confirm we received their inquiry.
 */
export function B2BLeadConfirmationEmailHTML({
  contactName,
  businessType,
  locale = 'en',
}: {
  contactName: string;
  businessType: string;
  locale?: string;
}): string {
  const businessTypeLabel = businessTypeLabels[businessType] || businessType;

  const content = {
    en: {
      subject: 'Thank you for your interest in Purrify Partnership',
      greeting: `Hi ${contactName},`,
      thanks: `Thank you for your interest in becoming a Purrify ${businessTypeLabel} partner!`,
      received: 'We have received your inquiry and our partnerships team will be in touch within 1-2 business days.',
      whileWait: 'While you wait, here\'s what you can expect:',
      benefit1: '✓ Personalized wholesale pricing based on your needs',
      benefit2: '✓ Free sample kit to try before committing',
      benefit3: '✓ Marketing materials and partnership resources',
      benefit4: '✓ Dedicated support from our B2B team',
      questions: 'If you have any urgent questions, feel free to reach out to us at:',
      signature: 'Best regards,<br>The Purrify Partnerships Team',
    },
    fr: {
      subject: 'Merci pour votre intérêt au partenariat Purrify',
      greeting: `Bonjour ${contactName},`,
      thanks: `Merci pour votre intérêt à devenir un partenaire ${businessTypeLabel} Purrify!`,
      received: 'Nous avons reçu votre demande et notre équipe de partenariats vous contactera dans 1-2 jours ouvrables.',
      whileWait: 'En attendant, voici ce à quoi vous pouvez vous attendre:',
      benefit1: '✓ Prix de gros personnalisés selon vos besoins',
      benefit2: '✓ Kit d\'échantillons gratuit pour essayer avant de s\'engager',
      benefit3: '✓ Matériel marketing et ressources de partenariat',
      benefit4: '✓ Support dédié de notre équipe B2B',
      questions: 'Si vous avez des questions urgentes, n\'hésitez pas à nous contacter à:',
      signature: 'Cordialement,<br>L\'équipe de partenariats Purrify',
    },
    zh: {
      subject: '感谢您对Purrify合作伙伴关系的兴趣',
      greeting: `您好 ${contactName}，`,
      thanks: `感谢您有兴趣成为Purrify ${businessTypeLabel}合作伙伴！`,
      received: '我们已收到您的咨询，我们的合作团队将在1-2个工作日内与您联系。',
      whileWait: '在等待期间，以下是您可以期待的：',
      benefit1: '✓ 根据您的需求定制的批发价格',
      benefit2: '✓ 免费样品套装，可在承诺前试用',
      benefit3: '✓ 营销材料和合作伙伴资源',
      benefit4: '✓ B2B团队的专属支持',
      questions: '如果您有任何紧急问题，请随时通过以下方式联系我们：',
      signature: '此致敬礼，<br>Purrify合作团队',
    },
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
<body style="margin: 0; padding: 0; background-color: #f3f4f6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">

          <!-- Header with Logo -->
          <tr>
            <td style="background: linear-gradient(135deg, #10B981 0%, #3694FF 100%); padding: 32px; text-align: center;">
              <img src="https://www.purrify.ca/images/Logos/purrify-logo.png" alt="Purrify" style="height: 40px; margin-bottom: 16px;" />
              <h1 style="margin: 0; color: #ffffff; font-size: 22px; font-weight: bold;">
                🤝 Partnership Inquiry Received
              </h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 32px;">
              <p style="margin: 0 0 16px; color: #111827; font-size: 16px;">
                ${t.greeting}
              </p>
              <p style="margin: 0 0 16px; color: #374151; font-size: 15px; line-height: 1.6;">
                ${t.thanks}
              </p>
              <p style="margin: 0 0 24px; color: #374151; font-size: 15px; line-height: 1.6;">
                ${t.received}
              </p>

              <!-- Benefits Box -->
              <div style="background-color: #f0fdf4; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
                <h3 style="margin: 0 0 16px; color: #166534; font-size: 16px; font-weight: 600;">
                  ${t.whileWait}
                </h3>
                <p style="margin: 0 0 8px; color: #15803d; font-size: 14px;">${t.benefit1}</p>
                <p style="margin: 0 0 8px; color: #15803d; font-size: 14px;">${t.benefit2}</p>
                <p style="margin: 0 0 8px; color: #15803d; font-size: 14px;">${t.benefit3}</p>
                <p style="margin: 0; color: #15803d; font-size: 14px;">${t.benefit4}</p>
              </div>

              <!-- Contact Info -->
              <p style="margin: 0 0 12px; color: #374151; font-size: 14px;">
                ${t.questions}
              </p>
              <p style="margin: 0 0 24px; color: #2563eb; font-size: 14px;">
                <a href="mailto:wholesale@purrify.ca" style="color: #2563eb; text-decoration: none;">📧 wholesale@purrify.ca</a>
              </p>

              <!-- Signature -->
              <p style="margin: 0; color: #374151; font-size: 14px; line-height: 1.6;">
                ${t.signature}
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 8px; color: #6b7280; font-size: 12px;">
                © ${new Date().getFullYear()} Purrify. Made with ❤️ in Canada
              </p>
              <p style="margin: 0; color: #9ca3af; font-size: 11px;">
                <a href="https://www.purrify.ca" style="color: #9ca3af; text-decoration: none;">www.purrify.ca</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

export function getB2BLeadConfirmationSubject(locale: string = 'en'): string {
  const subjects = {
    en: '✅ We received your Purrify partnership inquiry!',
    fr: '✅ Nous avons reçu votre demande de partenariat Purrify!',
    zh: '✅ 我们已收到您的Purrify合作伙伴咨询！',
  };
  return subjects[locale as keyof typeof subjects] || subjects.en;
}
