import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SITE_NAME } from '@/lib/constants';
import { formatProductPrice } from '@/lib/pricing';
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

async function getReferralData(code: string): Promise<{ code: string; referralData: ReferralData }> {
  try {
    // Validate referral code
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const response = await fetch(`${siteUrl}/api/referrals/validate/${code}`, {
      cache: 'no-store',
    });
    const referralData: ReferralData = await response.json();

    // Track referral click (fire and forget)
    if (referralData.isValid) {
      fetch(`${siteUrl}/api/referrals/track`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'click',
          referralCode: code,
          refereeEmail: '',
          trackingData: {
            source: 'referral_link',
            medium: 'direct',
            campaign: 'referral_program'
          }
        })
      }).catch(console.error);
    }

    return {
      code,
      referralData
    };
  } catch (error) {
    console.error('Error fetching referral data:', error);
    return {
      code,
      referralData: {
        isValid: false,
        error: 'Unable to validate referral code'
      }
    };
  }
}

export async function generateMetadata({ params }: ReferralPageProps): Promise<Metadata> {
  const { code } = await params;
  const { referralData } = await getReferralData(code);

  const trialPrice = formatProductPrice('trial');

  const pageTitle = referralData.isValid
    ? `${referralData.referrerName} recommends ${SITE_NAME} - Get Your FREE Trial!`
    : `Invalid Referral Code - ${SITE_NAME}`;

  const pageDescription = referralData.isValid
    ? `${referralData.referrerName} has shared Purrify with you! Get a FREE 12g trial size (normally ${trialPrice}) and see why they love this cat litter deodorizer.`
    : 'This referral code is not valid or has expired.';

  const canonicalUrl = `https://www.purrify.ca/refer/${code}`;

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
          url: 'https://www.purrify.ca/optimized/17g-transparent-v2.webp/',
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
