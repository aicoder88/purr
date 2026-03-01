'use client';

import { CheckCircle } from 'lucide-react';

export function KeyTakeaways() {
  return (
    <section className="mb-20">
      <div className="relative overflow-hidden bg-gradient-to-br from-[#E0EFC7] to-[#d4e8b8] from-green-900/40 to-green-800/30 rounded-3xl p-8 md:p-10 border border-green-200/50 border-green-800/50 shadow-xl">
        {/* Decorative blob */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 bg-black/10 rounded-full blur-[60px] -mr-20 -mt-20 pointer-events-none" />

        <h2 className="text-3xl font-extrabold text-gray-900 text-gray-50 mb-8 relative z-10">Key Takeaways</h2>
        <div className="key-takeaway space-y-5 relative z-10">
          <div className="flex items-start gap-4 p-4 bg-white/40 bg-gray-900/40 rounded-2xl backdrop-blur-sm shadow-sm border border-white/30 border-gray-700/30">
            <CheckCircle className="w-6 h-6 text-green-700 text-green-400 shrink-0 mt-0.5" />
            <p className="text-gray-800 text-gray-200 leading-relaxed text-lg">
              <strong>Activated carbon can adsorb ammonia</strong>, the key odor compound in cat urine, and its
              performance depends on carbon properties and environment (e.g., moisture).
            </p>
          </div>
          <div className="flex items-start gap-4 p-4 bg-white/40 bg-gray-900/40 rounded-2xl backdrop-blur-sm shadow-sm border border-white/30 border-gray-700/30">
            <CheckCircle className="w-6 h-6 text-green-700 text-green-400 shrink-0 mt-0.5" />
            <p className="text-gray-800 text-gray-200 leading-relaxed text-lg">
              <strong>Activated carbon is used for gas-phase adsorption</strong> in many contexts, including
              sulfur-containing odor compounds like hydrogen sulfide (H2S).
            </p>
          </div>
          <div className="flex items-start gap-4 p-4 bg-white/40 bg-gray-900/40 rounded-2xl backdrop-blur-sm shadow-sm border border-white/30 border-gray-700/30">
            <CheckCircle className="w-6 h-6 text-green-700 text-green-400 shrink-0 mt-0.5" />
            <p className="text-gray-800 text-gray-200 leading-relaxed text-lg">
              <strong>For indoor odor and gas reduction</strong>, EPA guidance describes activated carbon
              filtration as an option for certain pollutants.
            </p>
          </div>
          <div className="flex items-start gap-4 p-4 bg-white/40 bg-gray-900/40 rounded-2xl backdrop-blur-sm shadow-sm border border-white/30 border-gray-700/30">
            <CheckCircle className="w-6 h-6 text-green-700 text-green-400 shrink-0 mt-0.5" />
            <p className="text-gray-800 text-gray-200 leading-relaxed text-lg">
              <strong>Pet health concerns should be discussed with your veterinarian</strong>, especially for
              households with sensitive cats or respiratory issues.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
