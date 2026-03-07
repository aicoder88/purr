import { SITE_URL } from '@/lib/constants';
import { renderFreshnessPlanSection } from '@/emails/freshness-plan-section';

interface QuizResultEmailProps {
  customerEmail: string;
  locale?: string;
  score: number;
  riskLevel: string;
  catCount?: number;
  homeType?: string;
  odorSeverity?: string;
  currentRemedy?: string;
  recommendedProductId?: string;
  recommendedProductName: string;
  recommendationReason?: string | null;
  productUrl: string;
}

export function getQuizResultEmailSubject(locale = 'en'): string {
  if (locale === 'fr') {
    return 'Votre resultat Quiz Odeur Purrify';
  }

  return 'Your Purrify Smell Quiz Result';
}

export function QuizResultEmailHTML({
  customerEmail,
  locale = 'en',
  score,
  riskLevel,
  catCount,
  homeType,
  odorSeverity,
  currentRemedy,
  recommendedProductId,
  recommendedProductName,
  recommendationReason,
  productUrl,
}: QuizResultEmailProps) {
  const isFrench = locale === 'fr';
  const copy = isFrench
    ? {
        title: 'Voici votre resultat Quiz Odeur',
        greeting: 'Bonjour,',
        intro: 'Nous avons enregistre votre recommandation Purrify pour que vous puissiez la retrouver plus tard.',
        scoreLabel: 'Score de risque',
        riskLabel: 'Niveau de risque',
        recommendationLabel: 'Produit recommande',
        whyLabel: 'Pourquoi cette recommandation',
        cta: 'Voir ma recommandation',
        footer: `Vous recevez cet e-mail parce que vous avez demande votre resultat sur ${SITE_URL}.`,
        unsubscribe: `https://www.purrify.ca/unsubscribe?email=${encodeURIComponent(customerEmail)}`,
        unsubscribeLabel: 'Se desabonner',
      }
    : {
        title: 'Here is your Smell Quiz result',
        greeting: 'Hi,',
        intro: 'We saved your Purrify recommendation so you can come back to it later.',
        scoreLabel: 'Risk score',
        riskLabel: 'Risk level',
        recommendationLabel: 'Recommended product',
        whyLabel: 'Why this recommendation',
        cta: 'View my recommendation',
        footer: `You received this email because you asked for your result on ${SITE_URL}.`,
        unsubscribe: `https://www.purrify.ca/unsubscribe?email=${encodeURIComponent(customerEmail)}`,
        unsubscribeLabel: 'Unsubscribe',
      };

  return `<!DOCTYPE html>
<html lang="${locale}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${copy.title}</title>
  </head>
  <body style="margin:0;padding:0;background:#f5f7fb;font-family:Inter,Arial,sans-serif;color:#111827;">
    <table role="presentation" style="width:100%;border-collapse:collapse;">
      <tr>
        <td align="center" style="padding:32px 16px;">
          <table role="presentation" style="width:100%;max-width:620px;border-collapse:collapse;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 10px 35px rgba(15,23,42,0.08);">
            <tr>
              <td style="padding:32px;background:linear-gradient(135deg,#0f172a 0%,#166534 100%);color:#ffffff;">
                <p style="margin:0 0 10px;font-size:12px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;opacity:0.8;">Purrify</p>
                <h1 style="margin:0;font-size:30px;line-height:1.2;">${copy.title}</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:32px;">
                <p style="margin:0 0 12px;font-size:18px;font-weight:600;">${copy.greeting}</p>
                <p style="margin:0 0 24px;font-size:16px;line-height:1.6;color:#4b5563;">${copy.intro}</p>

                <table role="presentation" style="width:100%;border-collapse:separate;border-spacing:0 12px;">
                  <tr>
                    <td style="width:50%;padding:18px;background:#f8fafc;border:1px solid #e5e7eb;border-radius:16px;">
                      <p style="margin:0 0 6px;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280;">${copy.scoreLabel}</p>
                      <p style="margin:0;font-size:28px;font-weight:800;color:#111827;">${score}/100</p>
                    </td>
                    <td style="width:50%;padding:18px;background:#f8fafc;border:1px solid #e5e7eb;border-radius:16px;">
                      <p style="margin:0 0 6px;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280;">${copy.riskLabel}</p>
                      <p style="margin:0;font-size:22px;font-weight:800;color:#111827;text-transform:capitalize;">${riskLevel}</p>
                    </td>
                  </tr>
                </table>

                <div style="margin-top:24px;padding:22px;background:#ecfdf5;border:1px solid #a7f3d0;border-radius:18px;">
                  <p style="margin:0 0 6px;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#047857;">${copy.recommendationLabel}</p>
                  <p style="margin:0;font-size:24px;font-weight:800;color:#064e3b;">${recommendedProductName}</p>
                  ${
                    recommendationReason
                      ? `<p style="margin:14px 0 0;font-size:15px;line-height:1.6;color:#065f46;"><strong>${copy.whyLabel}:</strong> ${recommendationReason}</p>`
                      : ''
                  }
                </div>

                ${renderFreshnessPlanSection({
                  locale,
                  catCount,
                  homeType,
                  odorSeverity,
                  currentRemedy,
                  riskLevel,
                  score,
                  recommendedProductId,
                })}

                <div style="margin-top:28px;">
                  <a href="${productUrl}" style="display:inline-block;padding:14px 22px;border-radius:999px;background:#111827;color:#ffffff;text-decoration:none;font-weight:700;">
                    ${copy.cta}
                  </a>
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:0 32px 32px;">
                <p style="margin:0;font-size:12px;line-height:1.6;color:#6b7280;">
                  ${copy.footer}
                  <a href="${copy.unsubscribe}" style="color:#6b7280;text-decoration:underline;">${copy.unsubscribeLabel}</a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}
