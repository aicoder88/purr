"use client";

import Image from 'next/image';
import dynamic from 'next/dynamic';

const PieChart = dynamic(() => import('@/components/ui/charts').then((mod) => mod.PieChart), {
  ssr: false,
  loading: () => <div className="h-64 bg-gray-100 bg-gray-800 rounded-xl animate-pulse" />
});
const LineChart = dynamic(() => import('@/components/ui/charts').then((mod) => mod.LineChart), {
  ssr: false,
  loading: () => <div className="h-64 bg-gray-100 bg-gray-800 rounded-xl animate-pulse" />
});
const ProgressRing = dynamic(() => import('@/components/ui/charts').then((mod) => mod.ProgressRing), {
  ssr: false,
  loading: () => <div className="w-20 h-20 rounded-full bg-gray-100 bg-gray-800 animate-pulse" />
});

export default function OverviewSection() {
  return (
    <section className="space-y-12 relative z-10">
      {/* Hero Section - Only on overview tab */}
      <div className="text-center max-w-4xl mx-auto mb-16">
        <div className="mb-8">
          <Image
            src="/optimized/logos/purrify-logo.webp"
            alt="Purrify Logo"
            width={140}
            height={140}
            className="mx-auto mb-4"
          />
        </div>

        <h1 className="font-heading text-3xl lg:text-5xl font-bold tracking-tight mb-4 text-[#333333] text-white select-all cursor-text">
          Revolutionary Odor Solution for 52 Million North American Cat Owners
        </h1>

        <p className="text-xl lg:text-2xl text-[#333333] text-gray-300 mb-8 leading-relaxed">
          Growing pet care innovation company with molecular-level odor elimination technology
        </p>

        <div className="bg-white bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-xl p-8 mb-12 border border-white/20 border-gray-700/50 relative z-10">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="relative">
              <div className="text-3xl font-bold text-[#FF3131] mb-2 drop-shadow-sm">$50K</div>
              <div className="text-sm text-gray-600 text-gray-300">Current Round</div>
              <ProgressRing percentage={75} label="Target Progress" color="#FF3131" size={80} className="mt-4" />
            </div>
            <div className="relative">
              <div className="text-3xl font-bold text-[#5B2EFF] text-[#818CF8] mb-2 drop-shadow-sm">$1M</div>
              <div className="text-sm text-gray-600 text-gray-300">Pre-Money Valuation</div>
              <ProgressRing percentage={100} label="Validated" color="#5B2EFF" size={80} className="mt-4" />
            </div>
            <div className="relative">
              <div className="text-3xl font-bold text-[#FF3131] mb-2 drop-shadow-sm">16</div>
              <div className="text-sm text-gray-600 text-gray-300">Retail Partners</div>
              <ProgressRing percentage={68} label="Reorder Rate" color="#2ed573" size={80} className="mt-4" />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/20 border-gray-700/50">
        <h2 className="font-heading text-3xl font-bold text-[#333333] text-white mb-6 drop-shadow-sm">Executive Summary</h2>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="font-heading text-xl font-semibold text-[#FF3131] mb-4 drop-shadow-sm">The Opportunity</h3>
            <p className="text-gray-600 text-gray-200 mb-6 leading-relaxed">
              Purrify addresses the #1 pain point of urban cat owners: persistent litter box odor. Our premium activated carbon additive provides molecular-level odor elimination, creating a new product category in the $160M Canadian pet care market.
            </p>

            <h3 className="font-heading text-xl font-semibold text-[#5B2EFF] text-[#818CF8] mb-4 drop-shadow-sm">Competitive Advantages</h3>
            <ul className="space-y-2 text-gray-600 text-gray-200">
              <li className="flex items-start">
                <span className="text-[#FF3131] mr-2 font-bold">✓</span>
                First dedicated carbon additive in Canadian market
              </li>
              <li className="flex items-start">
                <span className="text-[#FF3131] mr-2 font-bold">✓</span>
                50%+ gross margins with retailer-friendly economics
              </li>
              <li className="flex items-start">
                <span className="text-[#FF3131] mr-2 font-bold">✓</span>
                Proven traction: 16 Montreal stores, 4 reorders this week
              </li>
              <li className="flex items-start">
                <span className="text-[#FF3131] mr-2 font-bold">✓</span>
                Superior coconut shell carbon technology
              </li>
            </ul>
          </div>

          <div>
            <PieChart
              data={[
                { label: 'Gross Margin', value: 47, color: '#FF3131' },
                { label: 'Cost of Goods', value: 53, color: '#E0EFC7' }
              ]}
              title="Unit Economics Breakdown"
              className="mb-6"
            />

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white bg-gray-900/60 backdrop-blur-sm rounded-xl p-4 border border-white/30 border-gray-600/50">
                <div className="text-2xl font-bold text-[#FF3131] drop-shadow-sm">$3K+</div>
                <div className="text-sm text-gray-600 text-gray-300">Early Revenue</div>
                <div className="text-xs text-gray-500 text-gray-400">Zero Paid Ads</div>
              </div>
              <div className="bg-white bg-gray-900/60 backdrop-blur-sm rounded-xl p-4 border border-white/30 border-gray-600/50">
                <div className="text-2xl font-bold text-[#5B2EFF] text-[#818CF8] drop-shadow-sm">18M</div>
                <div className="text-sm text-gray-600 text-gray-300">To EBITDA+</div>
                <div className="text-xs text-gray-500 text-gray-400">Months</div>
              </div>
            </div>
          </div>
        </div>

        {/* Growth trajectory visualization */}
        <LineChart
          data={[
            { label: '2024', value: 3000 },
            { label: '2025', value: 480000 },
            { label: '2026', value: 2400000 },
            { label: '2027', value: 8500000 },
            { label: '2028', value: 24000000 }
          ]}
          title="Revenue Growth Projection"
        />
      </div>
    </section>
  );
}
