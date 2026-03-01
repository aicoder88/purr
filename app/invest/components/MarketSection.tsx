"use client";

import dynamic from 'next/dynamic';

const BarChart = dynamic(() => import('@/components/ui/charts').then((mod) => mod.BarChart), {
  ssr: false,
  loading: () => <div className="h-64 bg-gray-100 bg-gray-800 rounded-xl animate-pulse" />
});

export default function MarketSection() {
  return (
    <section className="space-y-8 relative z-10">
      <div className="bg-white bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/20 border-gray-700/50">
        <h2 className="font-heading text-3xl font-bold text-[#333333] text-white mb-6 drop-shadow-sm">Market Opportunity</h2>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="font-heading text-xl font-semibold text-[#FF3131] mb-4 drop-shadow-sm">The Problem</h3>
            <div className="space-y-4">
              <div className="bg-white bg-gray-900/60 backdrop-blur-sm rounded-xl p-4 border border-[#FF3131]/30 border-l-4 border-l-[#FF3131]">
                <h4 className="font-semibold mb-2 text-gray-800 text-white">Urban Cat Owners&apos; #1 Complaint</h4>
                <p className="text-gray-600 text-gray-200">Persistent litter box odor in small apartments with no escape</p>
              </div>
              <div className="bg-white bg-gray-900/60 backdrop-blur-sm rounded-xl p-4 border border-[#FF3131]/30 border-l-4 border-l-[#FF3131]">
                <h4 className="font-semibold mb-2 text-gray-800 text-white">Inadequate Solutions</h4>
                <p className="text-gray-600 text-gray-200">Existing products only mask odors or require constant maintenance</p>
              </div>
              <div className="bg-white bg-gray-900/60 backdrop-blur-sm rounded-xl p-4 border border-[#FF3131]/30 border-l-4 border-l-[#FF3131]">
                <h4 className="font-semibold mb-2 text-gray-800 text-white">Multi-Cat Households</h4>
                <p className="text-gray-600 text-gray-200">Problem multiplies with multiple cats, demanding better solutions</p>
              </div>
            </div>
          </div>

          <div>
            <BarChart
              data={[
                { label: 'Cat Owners (Millions)', value: 52, color: 'bg-gradient-to-r from-[#FF3131] to-[#FF5050]' },
                { label: 'Market Size ($M)', value: 160, color: 'bg-gradient-to-r from-[#5B2EFF] from-[#818CF8] to-[#3694FF]' },
                { label: 'Online CAGR (%)', value: 6.2, color: 'bg-gradient-to-r from-[#2ed573] to-[#7bed9f]' }
              ]}
              title="Canadian Market Overview"
              className="mb-6"
            />

            <div className="grid grid-cols-3 gap-3">
              <div className="text-center bg-white bg-gray-900/60 backdrop-blur-sm rounded-xl p-3 border border-white/30 border-gray-600/50">
                <div className="text-2xl font-bold text-[#FF3131] drop-shadow-sm">52M</div>
                <div className="text-xs text-gray-600 text-gray-300">Cat Owners</div>
              </div>
              <div className="text-center bg-white bg-gray-900/60 backdrop-blur-sm rounded-xl p-3 border border-white/30 border-gray-600/50">
                <div className="text-2xl font-bold text-[#5B2EFF] text-[#818CF8] drop-shadow-sm">$160M</div>
                <div className="text-xs text-gray-600 text-gray-300">TAM</div>
              </div>
              <div className="text-center bg-white bg-gray-900/60 backdrop-blur-sm rounded-xl p-3 border border-white/30 border-gray-600/50">
                <div className="text-2xl font-bold text-[#2ed573] drop-shadow-sm">6.2%</div>
                <div className="text-xs text-gray-600 text-gray-300">CAGR</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white bg-gray-900/60 backdrop-blur-md rounded-xl p-6 border border-white/30 border-gray-600/50">
          <h3 className="font-heading text-xl font-semibold text-[#333333] text-white mb-4 drop-shadow-sm">Market Drivers</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center p-3 bg-white bg-gray-900/40 rounded-lg backdrop-blur-sm">
                <span className="text-[#FF3131] text-xl mr-3 font-bold">✓</span>
                <div>
                  <span className="font-medium text-gray-800 text-white">Pet Humanization</span>
                  <p className="text-sm text-gray-600 text-gray-300">76% consider cats family members</p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-white bg-gray-900/40 rounded-lg backdrop-blur-sm">
                <span className="text-[#5B2EFF] text-[#818CF8] text-xl mr-3 font-bold">✓</span>
                <div>
                  <span className="font-medium text-gray-800 text-white">Premium Shift</span>
                  <p className="text-sm text-gray-600 text-gray-300">Medium-high price segment dominates (35.2%)</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center p-3 bg-white bg-gray-900/40 rounded-lg backdrop-blur-sm">
                <span className="text-[#2ed573] text-xl mr-3 font-bold">✓</span>
                <div>
                  <span className="font-medium text-gray-800 text-white">Sustainability Focus</span>
                  <p className="text-sm text-gray-600 text-gray-300">Eco-products grow 9.63% faster</p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-white bg-gray-900/40 rounded-lg backdrop-blur-sm">
                <span className="text-[#FF3131] text-xl mr-3 font-bold">✓</span>
                <div>
                  <span className="font-medium text-gray-800 text-white">Urban Density</span>
                  <p className="text-sm text-gray-600 text-gray-300">Apartment living drives demand for odor solutions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
