'use client';

import Link from 'next/link';

export function ScienceCTA() {
  return (
    <section className="pb-10">
      <div className="relative text-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-10 md:p-14 border border-white/50 dark:border-gray-700/50 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-[-10%] w-[30%] h-[100%] bg-gradient-to-l from-blue-100/30 dark:from-blue-900/20 to-transparent blur-[40px] pointer-events-none" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[40%] h-[100%] bg-gradient-to-t from-purple-100/30 dark:from-purple-900/20 to-transparent blur-[40px] pointer-events-none" />

        <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 mb-6 relative z-10">
          Experience the Science Yourself
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed relative z-10">
          Backed by peer-reviewed research and trusted by thousands of cat parents. Try Purrify risk-free and see
          why activated carbon is the gold standard for odor control.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
          <Link
            href="/products/"
            className="px-8 py-4 bg-gradient-to-r from-[#FF3131] to-[#FF5050] dark:from-[#FF4040] dark:to-[#FF6B6B] text-white rounded-full font-bold shadow-[0_0_20px_rgba(255,49,49,0.3)] hover:shadow-[0_0_30px_rgba(255,49,49,0.5)] hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto text-lg"
          >
            Shop Purrify
          </Link>
          <Link
            href="/learn/science/"
            className="px-8 py-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 rounded-full font-bold hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-750 shadow-sm hover:shadow-md transition-all duration-300 w-full sm:w-auto text-lg"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
}
