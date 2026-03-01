"use client";

import dynamic from 'next/dynamic';

const BarChart = dynamic(() => import('@/components/ui/charts').then((mod) => mod.BarChart), {
  ssr: false,
  loading: () => <div className="h-64 bg-gray-100 bg-gray-800 rounded-xl animate-pulse" />
});

export default function SolutionSection() {
  return (
    <section className="space-y-8 relative z-10">
      <div className="bg-white bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/20 border-gray-700/50">
        <h2 className="font-heading text-3xl font-bold text-[#333333] text-white mb-6 drop-shadow-sm">Our Solution</h2>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="font-heading text-xl font-semibold text-[#FF3131] mb-4">Purrify Activated Carbon Additive</h3>
            <p className="text-gray-600 text-gray-300 mb-6 leading-relaxed">
              Premium coconut shell activated carbon that adsorbs odor molecules at the molecular level. Unlike competitors who mask odors with chemicals, we eliminate them completely through proven scientific principles.
            </p>

            <h4 className="text-lg font-semibold text-[#5B2EFF] text-[#818CF8] mb-3">Key Benefits</h4>
            <div className="space-y-3">
              <div className="flex items-start">
                <span className="text-[#FF3131] text-xl mr-3">✓</span>
                <div>
                  <span className="font-medium text-gray-800 text-white">Molecular Odor Elimination</span>
                  <p className="text-sm text-gray-600 text-gray-300">Activated carbon adsorbs odor molecules permanently</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-[#FF3131] text-xl mr-3">✓</span>
                <div>
                  <span className="font-medium text-gray-800 text-white">Universal Compatibility</span>
                  <p className="text-sm text-gray-600 text-gray-300">Works with any litter type - no switching required</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-[#FF3131] text-xl mr-3">✓</span>
                <div>
                  <span className="font-medium text-gray-800 text-white">100% Natural & Fragrance-Free</span>
                  <p className="text-sm text-gray-600 text-gray-300">Filtration-grade coconut shell carbon; no added fragrances or dyes</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-[#FF3131] text-xl mr-3">✓</span>
                <div>
                  <span className="font-medium text-gray-800 text-white">Simple Application</span>
                  <p className="text-sm text-gray-600 text-gray-300">Sprinkle, mix, done - immediate results</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <BarChart
              data={[
                { label: 'Trial Size (12g)', value: 28, color: 'bg-gradient-to-r from-[#FF3131] to-[#FF5050]' },
                { label: 'Medium (50g)', value: 47, color: 'bg-gradient-to-r from-[#5B2EFF] from-[#818CF8] to-[#3694FF]' },
                { label: 'Large (120g)', value: 40, color: 'bg-gradient-to-r from-[#2ed573] to-[#7bed9f]' }
              ]}
              title="Product Line Margins (%)"
              className="mb-6"
            />

            <div className="space-y-4">
              <div className="bg-white bg-gray-900/60 backdrop-blur-sm rounded-xl p-4 border border-white/30 border-gray-600/50">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-semibold text-gray-800 text-white">Trial Size (12g)</h4>
                  <span className="text-[#FF3131] font-bold drop-shadow-sm">28% margin</span>
                </div>
                <p className="text-sm text-gray-600 text-gray-300">Perfect impulse buy, proves efficacy fast</p>
              </div>
              <div className="bg-white bg-gray-900/60 backdrop-blur-sm rounded-xl p-4 border border-white/30 border-gray-600/50">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-semibold text-gray-800 text-white">Medium (50g)</h4>
                  <span className="text-[#5B2EFF] text-[#818CF8] font-bold drop-shadow-sm">47% margin</span>
                </div>
                <p className="text-sm text-gray-600 text-gray-300">Most popular, ideal for single-cat homes</p>
              </div>
              <div className="bg-white bg-gray-900/60 backdrop-blur-sm rounded-xl p-4 border border-white/30 border-gray-600/50">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-semibold text-gray-800 text-white">Large (120g)</h4>
                  <span className="text-[#2ed573] font-bold drop-shadow-sm">40% margin</span>
                </div>
                <p className="text-sm text-gray-600 text-gray-300">Multi-cat powerhouse, best value</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-[#FF3131]/10 to-[#5B2EFF]/10 from-red-900/20 to-purple-900/20 rounded-xl p-6">
          <h3 className="font-heading text-xl font-semibold text-[#333333] text-white mb-4">Competitive Differentiation</h3>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-lg font-bold text-[#FF3131] mb-2">Competitors</div>
              <p className="text-sm text-gray-600 text-gray-300">Chemical fragrances that mask odors temporarily</p>
            </div>
            <div>
              <div className="text-lg font-bold text-[#5B2EFF] mb-2">VS</div>
              <div className="w-8 h-8 mx-auto bg-[#5B2EFF] bg-[#818CF8] rounded-full flex items-center justify-center">
                <span className="text-white text-white text-xl">⚡</span>
              </div>
            </div>
            <div>
              <div className="text-lg font-bold text-[#FF3131] mb-2">Purrify</div>
              <p className="text-sm text-gray-600 text-gray-300">Scientific molecular adsorption that eliminates odors permanently</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
