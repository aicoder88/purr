"use client";

export default function TeamSection() {
  return (
    <section className="space-y-8 relative z-10">
      <div className="bg-white dark:bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/20 dark:border-gray-700/50">
        <h2 className="font-heading text-3xl font-bold text-[#333333] dark:text-white mb-6 drop-shadow-sm">Leadership Team</h2>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-[#FF3131] to-[#FF5050] rounded-full flex items-center justify-center">
              <span className="text-white dark:text-white font-bold text-2xl">D</span>
            </div>
            <h3 className="font-heading text-xl font-bold text-[#FF3131] mb-2">Mark Archer - CEO</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">The Marketing Genius</p>
            <div className="text-left space-y-2 text-sm">
              <div className="flex items-start">
                <span className="text-[#FF3131] mr-2">•</span>
                <span className="text-gray-700 dark:text-gray-200">Built manufacturing company from scratch twice</span>
              </div>
              <div className="flex items-start">
                <span className="text-[#FF3131] mr-2">•</span>
                <span className="text-gray-700 dark:text-gray-200">Growth marketer + direct response copywriter</span>
              </div>
              <div className="flex items-start">
                <span className="text-[#FF3131] mr-2">•</span>
                <span className="text-gray-700 dark:text-gray-200">Deep activated-carbon knowledge</span>
              </div>
            </div>
            <div className="mt-4 p-3 bg-[#FF3131]/10 dark:bg-red-900/20 rounded-lg">
              <div className="text-xs font-semibold text-[#FF3131]">SUPERPOWER</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Turns marketing into profit machines</div>
            </div>
          </div>

          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-[#5B2EFF] to-[#3694FF] rounded-full flex items-center justify-center">
              <span className="text-white dark:text-white font-bold text-2xl">S</span>
            </div>
            <h3 className="font-heading text-xl font-bold text-[#5B2EFF] dark:text-[#818CF8] mb-2">Sage Dean - COO</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">The Operations Machine</p>
            <div className="text-left space-y-2 text-sm">
              <div className="flex items-start">
                <span className="text-[#5B2EFF] mr-2">•</span>
                <span className="text-gray-700 dark:text-gray-200">Supply chain optimization expert</span>
              </div>
              <div className="flex items-start">
                <span className="text-[#5B2EFF] mr-2">•</span>
                <span className="text-gray-700 dark:text-gray-200">Sales & customer relations master</span>
              </div>
              <div className="flex items-start">
                <span className="text-[#5B2EFF] mr-2">•</span>
                <span className="text-gray-700 dark:text-gray-200">Backend systems architect</span>
              </div>
            </div>
            <div className="mt-4 p-3 bg-[#5B2EFF]/10 dark:bg-[#818CF8]/20 rounded-lg">
              <div className="text-xs font-semibold text-[#5B2EFF] dark:text-[#818CF8]">SUPERPOWER</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Makes impossible things happen</div>
            </div>
          </div>

          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-[#2ed573] to-[#7bed9f] rounded-full flex items-center justify-center">
              <span className="text-white dark:text-white font-bold text-2xl">K</span>
            </div>
            <h3 className="font-heading text-xl font-bold text-[#2ed573] mb-2">Key Advisor</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">Ex-P&G Brand Manager</p>
            <div className="text-left space-y-2 text-sm">
              <div className="flex items-start">
                <span className="text-[#2ed573] mr-2">•</span>
                <span className="text-gray-700 dark:text-gray-200">CPG discipline & merchandising</span>
              </div>
              <div className="flex items-start">
                <span className="text-[#2ed573] mr-2">•</span>
                <span className="text-gray-700 dark:text-gray-200">Retail partnership expertise</span>
              </div>
              <div className="flex items-start">
                <span className="text-[#2ed573] mr-2">•</span>
                <span className="text-gray-700 dark:text-gray-200">Scale-up guidance</span>
              </div>
            </div>
            <div className="mt-4 p-3 bg-[#2ed573]/10 dark:bg-green-900/20 rounded-lg">
              <div className="text-xs font-semibold text-[#2ed573]">SUPERPOWER</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Knows how to dominate retail</div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-[#E0EFC7]/20 dark:bg-gray-700/50 rounded-xl p-6">
          <h3 className="font-heading text-xl font-semibold text-[#333333] dark:text-white mb-4">Strategic Roadmap</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-[#FF3131] mb-3">Near Term (2025)</h4>
              <div className="space-y-2 text-sm">
                <div className="text-gray-600 dark:text-gray-300">• Quebec → Ontario expansion via rep network</div>
                <div className="text-gray-600 dark:text-gray-300">• Amazon Canada launch with keyword domination</div>
                <div className="text-gray-600 dark:text-gray-300">• British Columbia distributor partnerships</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-[#5B2EFF] dark:text-[#818CF8] mb-3">Medium Term (2026-2028)</h4>
              <div className="space-y-2 text-sm">
                <div className="text-gray-600 dark:text-gray-300">• Amazon US expansion + Chewy onboarding</div>
                <div className="text-gray-600 dark:text-gray-300">• Major chain discussions and rollout</div>
                <div className="text-gray-600 dark:text-gray-300">• Strategic acquisition opportunities</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
