"use client";

import dynamic from 'next/dynamic';

const BarChart = dynamic(() => import('@/components/ui/charts').then((mod) => mod.BarChart), {
  ssr: false,
  loading: () => <div className="h-64 bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse" />
});
const ProgressRing = dynamic(() => import('@/components/ui/charts').then((mod) => mod.ProgressRing), {
  ssr: false,
  loading: () => <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 animate-pulse" />
});

export default function TractionSection() {
  return (
    <section className="space-y-8 relative z-10">
      <div className="bg-white dark:bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/20 dark:border-gray-700/50">
        <h2 className="font-heading text-3xl font-bold text-[#333333] dark:text-white mb-6 drop-shadow-sm">Market Traction</h2>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="text-center bg-white dark:bg-gray-900/60 backdrop-blur-sm rounded-xl p-6 border border-white/30 dark:border-gray-600/50">
            <ProgressRing percentage={100} label="Stores Onboarded" color="#FF3131" size={60} />
            <div className="text-4xl font-bold text-[#FF3131] mb-2 drop-shadow-sm mt-4">16</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Montreal Stores</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Onboarded</div>
          </div>
          <div className="text-center bg-white dark:bg-gray-900/60 backdrop-blur-sm rounded-xl p-6 border border-white/30 dark:border-gray-600/50">
            <ProgressRing percentage={25} label="Reorder Rate" color="#5B2EFF" size={60} />
            <div className="text-4xl font-bold text-[#5B2EFF] dark:text-[#818CF8] mb-2 drop-shadow-sm mt-4">4</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Stores Reordered</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">This Week</div>
          </div>
          <div className="text-center bg-white dark:bg-gray-900/60 backdrop-blur-sm rounded-xl p-6 border border-white/30 dark:border-gray-600/50">
            <ProgressRing percentage={85} label="Revenue Growth" color="#2ed573" size={60} />
            <div className="text-4xl font-bold text-[#2ed573] mb-2 drop-shadow-sm mt-4">$3K+</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Early Revenue</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Zero Paid Ads</div>
          </div>
          <div className="text-center bg-white dark:bg-gray-900/60 backdrop-blur-sm rounded-xl p-6 border border-white/30 dark:border-gray-600/50">
            <ProgressRing percentage={68} label="Product Mix" color="#5B2EFF" size={60} />
            <div className="text-4xl font-bold text-[#5B2EFF] dark:text-[#818CF8] mb-2 drop-shadow-sm mt-4">68%</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Choose Medium</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Highest Margin</div>
          </div>
        </div>

        <div className="mb-8">
          <BarChart
            data={[
              { label: 'Stores Onboarded', value: 16, color: 'bg-gradient-to-r from-[#FF3131] to-[#FF5050]' },
              { label: 'Reorders This Week', value: 4, color: 'bg-gradient-to-r from-[#5B2EFF] dark:from-[#818CF8] to-[#3694FF]' },
              { label: 'Revenue ($K)', value: 3, color: 'bg-gradient-to-r from-[#2ed573] to-[#7bed9f]' }
            ]}
            title="Current Traction Metrics"
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h3 className="font-heading text-xl font-semibold text-[#FF3131] mb-4">Customer Testimonials</h3>
            <div className="space-y-4">
              <div className="bg-[#E0EFC7]/20 dark:bg-gray-700/50 rounded-xl p-4 border-l-4 border-[#FF3131]">
                <p className="italic mb-2 text-gray-700 dark:text-gray-200">&quot;My customers keep asking when you&apos;re restocking Purrify. They say it&apos;s the first thing that actually works!&quot;</p>
                <div className="text-sm text-gray-600 dark:text-gray-400">— Chico Pet Store, Montreal</div>
              </div>
              <div className="bg-[#E0EFC7]/20 dark:bg-gray-700/50 rounded-xl p-4 border-l-4 border-[#5B2EFF] dark:border-[#818CF8]">
                <p className="italic mb-2 text-gray-700 dark:text-gray-200">&quot;Finally, a product that eliminates odor instead of just covering it up. My apartment stays fresh for days.&quot;</p>
                <div className="text-sm text-gray-600 dark:text-gray-400">— Verified Customer Review</div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-heading text-xl font-semibold text-[#5B2EFF] dark:text-[#818CF8] mb-4">Foundation Built</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <span className="text-[#FF3131] text-xl mr-3">✓</span>
                <span className="text-gray-700 dark:text-gray-200">Brand & packaging perfected</span>
              </div>
              <div className="flex items-center">
                <span className="text-[#FF3131] text-xl mr-3">✓</span>
                <span className="text-gray-700 dark:text-gray-200">Website & SEO optimized</span>
              </div>
              <div className="flex items-center">
                <span className="text-[#FF3131] text-xl mr-3">✓</span>
                <span className="text-gray-700 dark:text-gray-200">Supply chain tested & proven</span>
              </div>
              <div className="flex items-center">
                <span className="text-[#FF3131] text-xl mr-3">✓</span>
                <span className="text-gray-700 dark:text-gray-200">Customer testimonials flowing in</span>
              </div>
              <div className="flex items-center">
                <span className="text-[#FF3131] text-xl mr-3">✓</span>
                <span className="text-gray-700 dark:text-gray-200">Retailer relationships established</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
