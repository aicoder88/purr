import { Metadata } from 'next';
import InvestorContentWrapper from './investor-content-wrapper';
import { SITE_NAME, SITE_URL } from '@/lib/constants';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: `Invest in ${SITE_NAME} - Revolutionary Pet Care Innovation`,
  description: `Investment opportunity in ${SITE_NAME}: The first activated carbon cat litter additive in Canada. $1M pre-money valuation, 47% gross margins, proven traction with 16 retail partners.`,
  keywords: ['invest in Purrify', 'pet care investment', 'startup investment', 'angel investment Canada', 'pet industry startup'],
  alternates: {
    canonical: `${SITE_URL}/invest/`,
  },
  openGraph: {
    url: `${SITE_URL}/invest/`,
    images: [
      {
        url: '/optimized/logos/purrify-logo.png',
        width: 1200,
        height: 800,
        alt: 'Purrify',
        type: 'image/png',
      },
    ],
  },
};

// Organization schema for investor page
const investorSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://www.purrify.ca/invest/#organization',
  name: SITE_NAME,
  description: 'Investment opportunity in Purrify: The first activated carbon cat litter additive in Canada. $1M pre-money valuation, 47% gross margins, proven traction with 16 retail partners.',
  url: `${SITE_URL}/invest/`,
  logo: `${SITE_URL}/optimized/logos/purrify-logo.png`,
  sameAs: [
    'https://www.crunchbase.com/organization/purrify',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'investor relations',
    areaServed: 'CA',
    availableLanguage: 'English'
  }
};

export default function InvestorRelations() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(investorSchema) }}
      />
      <main className="min-h-screen bg-gradient-to-br from-[#FFFFF5] via-[#FFFFFF] to-[#E0EFC7]/30 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/20 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-30 dark:opacity-20">
          <div className="absolute top-10 left-10 w-72 h-72 bg-[#FF3131]/20 dark:bg-[#FF5050]/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 right-10 w-96 h-96 bg-[#5B2EFF]/20 dark:bg-[#818CF8]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-[#E0EFC7]/30 dark:bg-green-900/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        <section className="relative z-10 max-w-4xl mx-auto px-4 pt-12">
          <h1 className="font-heading text-3xl md:text-5xl font-bold text-gray-900 dark:text-gray-100">
            Invest in Purrify
          </h1>
          <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
            Review traction, unit economics, and terms for our current investor round.
          </p>
        </section>

        <InvestorContentWrapper />
      </main>
    </>
  );
}
