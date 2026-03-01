"use client";

import dynamic from 'next/dynamic';

const PieChart = dynamic(() => import('@/components/ui/charts').then((mod) => mod.PieChart), {
  ssr: false,
  loading: () => <div className="h-64 bg-gray-100 bg-gray-800 rounded-xl animate-pulse" />
});

export default function FinancialsSection() {
  return (
    <section className="space-y-8 relative z-10">
      <div className="bg-white bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/20 border-gray-700/50">
        <h2 className="font-heading text-3xl font-bold text-[#333333] text-white mb-6 drop-shadow-sm">Unit Economics</h2>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="font-heading text-xl font-semibold text-[#FF3131] mb-4">Medium SKU Breakdown (50g)</h3>
            <div className="overflow-hidden rounded-xl border border-gray-200 border-gray-700">
              <table className="w-full">
                <tbody>
                  <tr className="bg-gray-50 bg-gray-700">
                    <td className="px-4 py-3 font-medium text-gray-800 text-white">Wholesale Price</td>
                    <td className="px-4 py-3 text-right font-bold text-[#FF3131]">$2.25</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-gray-700 text-gray-200">Raw Materials</td>
                    <td className="px-4 py-3 text-right text-gray-700 text-gray-200">$0.60</td>
                  </tr>
                  <tr className="bg-gray-50 bg-gray-700">
                    <td className="px-4 py-3 text-gray-700 text-gray-200">Packaging</td>
                    <td className="px-4 py-3 text-right text-gray-700 text-gray-200">$0.14</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-gray-700 text-gray-200">Labor</td>
                    <td className="px-4 py-3 text-right text-gray-700 text-gray-200">$0.12</td>
                  </tr>
                  <tr className="bg-gray-50 bg-gray-700">
                    <td className="px-4 py-3 text-gray-700 text-gray-200">Fixed Costs</td>
                    <td className="px-4 py-3 text-right text-gray-700 text-gray-200">$0.13</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-gray-700 text-gray-200">Marketing & Admin</td>
                    <td className="px-4 py-3 text-right text-gray-700 text-gray-200">$0.20</td>
                  </tr>
                  <tr className="bg-[#FF3131]/10 bg-red-900/20 border-t-2 border-[#FF3131]">
                    <td className="px-4 py-3 font-bold text-gray-800 text-white">GROSS PROFIT</td>
                    <td className="px-4 py-3 text-right font-bold text-[#FF3131]">$1.06 (47%)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <PieChart
              data={[
                { label: 'Gross Profit', value: 47, color: '#FF3131' },
                { label: 'Raw Materials', value: 26.7, color: '#5B2EFF' },
                { label: 'Packaging', value: 6.2, color: '#2ed573' },
                { label: 'Labor', value: 5.3, color: '#FF6B47' },
                { label: 'Fixed Costs', value: 5.8, color: '#3694FF' },
                { label: 'Marketing & Admin', value: 8.9, color: '#7bed9f' }
              ]}
              title="Cost Breakdown (Medium SKU)"
              className="mb-6"
            />

            <h3 className="font-heading text-xl font-semibold text-[#5B2EFF] text-[#818CF8] mb-4 drop-shadow-sm">Scale Economics</h3>
            <div className="space-y-4">
              <div className="bg-[#5B2EFF]/10 bg-[#818CF8]/20 rounded-xl p-4">
                <h4 className="font-semibold mb-2 text-gray-800 text-white">Current Scale (1K bags/month)</h4>
                <div className="text-2xl font-bold text-[#5B2EFF] text-[#818CF8] mb-1">47%</div>
                <p className="text-sm text-gray-600 text-gray-300">Gross Margin</p>
              </div>
              <div className="bg-[#FF3131]/10 bg-red-900/20 rounded-xl p-4">
                <h4 className="font-semibold mb-2 text-gray-800 text-white">Target Scale (100K bags/month)</h4>
                <div className="text-2xl font-bold text-[#FF3131] mb-1">55%+</div>
                <p className="text-sm text-gray-600 text-gray-300">Gross Margin (Fixed costs drop to $0.05/bag)</p>
              </div>
              <div className="bg-[#E0EFC7]/30 bg-gray-700/50 rounded-xl p-4">
                <h4 className="font-semibold mb-2 text-gray-800 text-white">Cash Efficiency</h4>
                <div className="text-sm space-y-1 text-gray-600 text-gray-300">
                  <div className="text-gray-600 text-gray-300">• Retailers pay on delivery</div>
                  <div className="text-gray-600 text-gray-300">• Suppliers on COD</div>
                  <div className="text-gray-600 text-gray-300">• Tight working capital cycle</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-[#FF3131]/10 to-[#5B2EFF]/10 from-red-900/20 to-purple-900/20 rounded-xl p-6">
          <h3 className="font-heading text-xl font-semibold text-[#333333] text-white mb-4">Growth Projections</h3>
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-lg font-bold mb-1 text-gray-800 text-white">2025</div>
              <div className="text-2xl font-bold text-[#FF3131] mb-1">$480K</div>
              <div className="text-sm text-gray-600 text-gray-400">Revenue</div>
            </div>
            <div>
              <div className="text-lg font-bold mb-1 text-gray-800 text-white">2026</div>
              <div className="text-2xl font-bold text-[#5B2EFF] text-[#818CF8] mb-1">$2.4M</div>
              <div className="text-sm text-gray-600 text-gray-400">Revenue</div>
            </div>
            <div>
              <div className="text-lg font-bold mb-1 text-gray-800 text-white">2027</div>
              <div className="text-2xl font-bold text-[#FF3131] mb-1">$8.5M</div>
              <div className="text-sm text-gray-600 text-gray-400">Revenue</div>
            </div>
            <div>
              <div className="text-lg font-bold mb-1 text-gray-800 text-white">2028</div>
              <div className="text-2xl font-bold text-[#5B2EFF] text-[#818CF8] mb-1">$24M</div>
              <div className="text-sm text-gray-600 text-gray-400">Target Exit</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
