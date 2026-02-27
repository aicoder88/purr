"use client";

import { Button } from '@/components/ui/button';
import { CONTACT_INFO } from '@/lib/constants';
import dynamic from 'next/dynamic';

const PieChart = dynamic(() => import('@/components/ui/charts').then((mod) => mod.PieChart), {
  ssr: false,
  loading: () => <div className="h-64 bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse" />
});

export default function InvestmentSection() {
  const handleCalendlyClick = () => {
    window.open('https://calendly.com/copywriting', '_blank');
  };

  return (
    <section className="space-y-8 relative z-10">
      <div className="bg-white dark:bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/20 dark:border-gray-700/50">
        <h2 className="font-heading text-3xl font-bold text-[#333333] dark:text-white mb-6 drop-shadow-sm">Investment Terms</h2>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div>
            <div className="bg-gradient-to-r from-[#FF3131]/10 to-[#5B2EFF]/10 dark:from-red-900/20 dark:to-purple-900/20 rounded-2xl p-6 mb-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-[#FF3131] mb-2">$50K</div>
                <div className="text-lg text-gray-600 dark:text-gray-400 mb-4">Current Round</div>
                <div className="text-2xl font-bold text-[#5B2EFF] dark:text-[#818CF8] mb-2">$1M Pre-Money</div>
                <div className="text-lg text-gray-600 dark:text-gray-400">SAFE Agreement</div>
              </div>
            </div>

            <h3 className="font-heading text-xl font-semibold text-[#FF3131] mb-4">Use of Funds</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-[#FF3131]/10 dark:bg-red-900/20 rounded-lg">
                <span className="text-gray-700 dark:text-gray-200">Marketing & Growth</span>
                <span className="font-bold">65% ($32.5K)</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-[#5B2EFF]/10 dark:bg-[#818CF8]/20 rounded-lg">
                <span className="text-gray-700 dark:text-gray-200">Inventory Scale-up</span>
                <span className="font-bold text-gray-800 dark:text-white">20% ($10K)</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-[#E0EFC7]/30 dark:bg-gray-700/50 rounded-lg">
                <span className="text-gray-700 dark:text-gray-200">Working Capital</span>
                <span className="font-bold">15% ($7.5K)</span>
              </div>
            </div>
          </div>

          <div>
            <PieChart
              data={[
                { label: 'Marketing & Growth', value: 65, color: '#FF3131' },
                { label: 'Inventory Scale-up', value: 20, color: '#5B2EFF' },
                { label: 'Working Capital', value: 15, color: '#2ed573' }
              ]}
              title="Use of Funds Breakdown"
              className="mb-6"
            />

            <h3 className="font-heading text-xl font-semibold text-[#5B2EFF] mb-4 drop-shadow-sm">Investment Highlights</h3>
            <div className="space-y-4">
              <div className="bg-[#E0EFC7]/20 dark:bg-gray-700/50 rounded-xl p-4 border-l-4 border-[#FF3131]">
                <h4 className="font-semibold mb-2">18-Month Runway</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Path to EBITDA positive with efficient cash use</p>
              </div>
              <div className="bg-[#E0EFC7]/20 dark:bg-gray-700/50 rounded-xl p-4 border-l-4 border-[#5B2EFF]">
                <h4 className="font-semibold mb-2">Proven Demand</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">16 stores onboarded, 4 reorders this week</p>
              </div>
              <div className="bg-[#E0EFC7]/20 dark:bg-gray-700/50 rounded-xl p-4 border-l-4 border-[#FF3131]">
                <h4 className="font-semibold mb-2">Experienced Team</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">5+ years in category, proven track record</p>
              </div>
              <div className="bg-[#E0EFC7]/20 dark:bg-gray-700/50 rounded-xl p-4 border-l-4 border-[#5B2EFF]">
                <h4 className="font-semibold mb-2">Multiple Exit Paths</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Strategic acquisition or dividend machine</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-[#FF3131]/10 to-[#5B2EFF]/10 dark:from-red-900/20 dark:to-purple-900/20 rounded-xl p-6 mb-8">
          <h3 className="font-heading text-xl font-semibold text-[#333333] dark:text-white mb-4 text-center">Why Invest Now?</h3>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-2xl mb-2">🚀</div>
              <h4 className="font-semibold mb-2">First Mover Advantage</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">No direct competitors in Canadian market</p>
            </div>
            <div>
              <div className="text-2xl mb-2">📈</div>
              <h4 className="font-semibold mb-2">Proven Unit Economics</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">47% gross margins scaling to 55%+</p>
            </div>
            <div>
              <div className="text-2xl mb-2">💰</div>
              <h4 className="font-semibold mb-2">Clear Exit Strategy</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">Target valuation: $150M - $300M</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            Ready to join us in revolutionizing pet care?
          </p>
          <div className="space-y-4">
            <Button
              onClick={handleCalendlyClick}
              size="lg"
              className="bg-gradient-primary text-white font-bold py-6 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Schedule Investor Call
            </Button>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Or contact us directly: <a href="mailto:hello@purrify.ca" className="text-[#FF3131] hover:underline">hello@purrify.ca</a> • <a href={CONTACT_INFO.phoneHref} className="text-[#FF3131] hover:underline">{CONTACT_INFO.phone}</a>
            </div>
            <div className="text-xs text-gray-400 dark:text-gray-500">
              Incorporated: BC1318076 | All financial projections are forward-looking statements
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
