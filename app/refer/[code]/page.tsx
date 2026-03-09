import { cache } from 'react';
import { Metadata } from 'next';
import { SITE_NAME } from '@/lib/constants';
import { formatProductPrice } from '@/lib/pricing';
import { REFERRAL_CONFIG } from '@/lib/referral';
import { validateReferralCodeForEmail } from '@/lib/referral-program';
import { ReferralClient } from './ReferralClient';

interface ReferralPageProps {
  params: Promise<{ code: string }>;
}

interface ReferralData {
  isValid: boolean;
  referrerName?: string;
  referrerEmail?: string;
  discount?: {
    type: string;
    value: number;
    description: string;
  };
  message?: string;
  error?: string;
}

const getReferralData = cache(async (code: string): Promise<{ code: string; referralData: ReferralData }> => {
  try {
    const result = await validateReferralCodeForEmail(code);

    return {
      code,
      referralData: {
        isValid: true,
        referrerName: result.referrerName,
        discount: {
          type: 'fixed',
          value: REFERRAL_CONFIG.REFEREE_DISCOUNT,
          description: `$${REFERRAL_CONFIG.REFEREE_DISCOUNT} off qualifying orders over $${REFERRAL_CONFIG.MINIMUM_QUALIFYING_ORDER_SUBTOTAL}`,
        },
        message: `${result.referrerName} has shared Purrify with you! Get $${REFERRAL_CONFIG.REFEREE_DISCOUNT} off qualifying orders over $${REFERRAL_CONFIG.MINIMUM_QUALIFYING_ORDER_SUBTOTAL}.`,
      },
    };
  } catch (error) {
    console.error('Error fetching referral data:', error);
    const message = error instanceof Error ? error.message : 'Unable to validate referral code';

    return {
      code,
      referralData: {
        isValid: false,
        error: message,
      },
    };
  }
});

export async function generateMetadata({ params }: ReferralPageProps): Promise<Metadata> {
  const { code } = await params;
  const { referralData } = await getReferralData(code);

  const trialPrice = formatProductPrice('trial');
  const minimumOrder = `$${REFERRAL_CONFIG.MINIMUM_QUALIFYING_ORDER_SUBTOTAL}`;

  const pageTitle = referralData.isValid
    ? `${referralData.referrerName} recommends ${SITE_NAME} - Get $5 Off Qualifying Orders Over ${minimumOrder}!`
    : `Invalid Referral Code - ${SITE_NAME}`;

  const pageDescription = referralData.isValid
    ? `${referralData.referrerName} has shared Purrify with you! Get $5 off qualifying orders over ${minimumOrder} and see why they love this cat litter deodorizer. Trial size currently starts at ${trialPrice}.`
    : 'This referral code is not valid or has expired.';

  const canonicalUrl = `https://www.purrify.ca/refer/${code}/`;

  return {
    title: pageTitle,
    description: pageDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: canonicalUrl,
      type: 'website',
      images: [
        {
          url: 'https://www.purrify.ca/optimized/products/17g-transparent-v2.webp',
          width: 1200,
          height: 630,
          alt: 'Purrify Free Trial Offer',
        },
      ],
    },
    robots: referralData.isValid ? undefined : {
      index: false,
      follow: false,
    },
  };
}

export default async function ReferralPage({ params }: ReferralPageProps) {
  const { code } = await params;
  const { referralData } = await getReferralData(code);

  return <ReferralClient code={code} referralData={referralData} />;
}
