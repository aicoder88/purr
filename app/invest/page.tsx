import { Metadata } from 'next';
import InvestorContentWrapper from './investor-content-wrapper';
import { SITE_NAME } from '@/lib/constants';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: `Invest in ${SITE_NAME} - Revolutionary Pet Care Innovation`,
  description: `Investment opportunity in ${SITE_NAME}: The first activated carbon cat litter additive in Canada. $1M pre-money valuation, 47% gross margins, proven traction with 16 retail partners.`,
  keywords: ['invest in Purrify', 'pet care investment', 'startup investment', 'angel investment Canada', 'pet industry startup'],
};

export default function InvestorRelations() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#FFFFF5] via-[#FFFFFF] to-[#E0EFC7]/30 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/20 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30 dark:opacity-20">
        <div className="absolute top-10 left-10 w-72 h-72 bg-[#FF3131]/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 right-10 w-96 h-96 bg-[#5B2EFF]/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-[#E0EFC7]/30 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <InvestorContentWrapper />
    </main>
  );
}
