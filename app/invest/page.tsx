import { Metadata } from 'next';
import InvestorContentWrapper from './investor-content-wrapper';
import { SITE_NAME, SITE_URL } from '@/lib/constants';
import Link from 'next/link';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: `Invest in ${SITE_NAME} - Revolutionary Pet Care Innovation`,
  description: `Investment opportunity in ${SITE_NAME}: The first activated carbon cat litter additive in Canada. $1M pre-money valuation, 47% gross margins, proven traction with 16 retail partners.`,
  keywords: ['invest in Purrify', 'pet care investment', 'startup investment', 'angel investment Canada', 'pet industry startup'],
  alternates: {
    canonical: `${SITE_URL}/invest/`,
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

        <InvestorContentWrapper />
        
        {/* SEO Content Section - Investment Overview */}
        <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-xl border border-white/50 dark:border-gray-700/50">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                Investment Opportunity in <span className="text-[#FF3131]">Purrify</span>
              </h2>
              
              <div className="prose prose-lg max-w-none dark:prose-invert">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                  Purrify represents a compelling investment opportunity in the rapidly growing pet care industry. As the first dedicated activated carbon cat litter additive in the Canadian market, we have established a unique position addressing the number one pain point for cat owners: persistent litter box odor. Our proprietary coconut shell activated carbon technology eliminates odors at the molecular level, creating a new product category with significant growth potential.
                </p>
                
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                  Company Financial Highlights
                </h3>
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-[#E0EFC7]/30 dark:bg-green-900/20 rounded-xl p-6">
                    <div className="text-3xl font-bold text-[#FF3131] mb-2">$1M</div>
                    <div className="text-gray-700 dark:text-gray-300 font-medium">Pre-Money Valuation</div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Attractive entry point for early investors</p>
                  </div>
                  <div className="bg-[#E0EFC7]/30 dark:bg-green-900/20 rounded-xl p-6">
                    <div className="text-3xl font-bold text-[#5B2EFF] dark:text-[#818CF8] mb-2">47%</div>
                    <div className="text-gray-700 dark:text-gray-300 font-medium">Gross Margins</div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Scaling to 55%+ at volume</p>
                  </div>
                  <div className="bg-[#E0EFC7]/30 dark:bg-green-900/20 rounded-xl p-6">
                    <div className="text-3xl font-bold text-[#FF3131] mb-2">$3K+</div>
                    <div className="text-gray-700 dark:text-gray-300 font-medium">Early Revenue</div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Zero paid advertising spend</p>
                  </div>
                  <div className="bg-[#E0EFC7]/30 dark:bg-green-900/20 rounded-xl p-6">
                    <div className="text-3xl font-bold text-[#5B2EFF] dark:text-[#818CF8] mb-2">16</div>
                    <div className="text-gray-700 dark:text-gray-300 font-medium">Retail Partners</div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Montreal-based with expansion planned</p>
                  </div>
                </div>
                
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                  Why Invest in Purrify
                </h3>
                <ul className="space-y-4 text-gray-700 dark:text-gray-300 mb-8">
                  <li className="flex items-start">
                    <span className="text-[#FF3131] mr-3 text-xl">✓</span>
                    <span><strong>First-Mover Advantage:</strong> No direct competitors in the Canadian activated carbon additive market</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#FF3131] mr-3 text-xl">✓</span>
                    <span><strong>Proven Product-Market Fit:</strong> 16 stores onboarded with 68% reorder rate demonstrating strong demand</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#FF3131] mr-3 text-xl">✓</span>
                    <span><strong>Superior Unit Economics:</strong> 47% gross margins with clear path to 55%+ at scale</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#FF3131] mr-3 text-xl">✓</span>
                    <span><strong>Experienced Team:</strong> Leadership with proven track record in manufacturing and growth marketing</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#FF3131] mr-3 text-xl">✓</span>
                    <span><strong>Multiple Exit Paths:</strong> Strategic acquisition targets include major pet care brands</span>
                  </li>
                </ul>
                
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                  Growth Metrics & Projections
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                  The Canadian pet care market represents a $160 million opportunity with 6.2% annual growth driven by pet humanization trends. Our data-driven projections show revenue growing from $3K in early sales to $480K in 2025, $2.4M in 2026, and $8.5M by 2027. With the current $50K investment round focused on marketing and inventory scale-up, we project reaching EBITDA positivity within 18 months. The target exit valuation ranges from $150M to $300M based on comparable pet industry acquisitions, offering potential 150x-300x returns for early investors.
                </p>
                
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                  Contact Information for Investors
                </h3>
                <div className="bg-gradient-to-r from-[#FF3131]/10 to-[#5B2EFF]/10 dark:from-red-900/20 dark:to-purple-900/20 rounded-xl p-6 mb-8">
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    We welcome conversations with accredited investors, angel investors, and strategic partners who share our vision for revolutionizing pet care odor control.
                  </p>
                  <div className="space-y-2 text-gray-700 dark:text-gray-300">
                    <p><strong>Email:</strong> <a href="mailto:hello@purrify.ca" className="text-[#FF3131] hover:underline">hello@purrify.ca</a></p>
                    <p><strong>Phone:</strong> <a href="tel:+14385001369" className="text-[#FF3131] hover:underline">(438) 500-1369</a></p>
                    <p><strong>Company:</strong> Purrify Inc. (BC1318076)</p>
                    <p><strong>Location:</strong> Montreal, Quebec, Canada</p>
                  </div>
                </div>
                
                <div className="text-center mt-10">
                  <Link 
                    href="/invest/"
                    className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#FF3131] to-[#FF5050] text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    Schedule an Investor Call
                  </Link>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                    All financial projections are forward-looking statements. Please review our investor deck for complete terms.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
