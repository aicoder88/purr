import { Microscope } from 'lucide-react';

export function ScienceHero() {
  return (
    <header className="mb-20 text-center relative">
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 bg-gray-800/60 backdrop-blur-md border border-gray-100 border-gray-700 rounded-full text-sm font-medium mb-8 shadow-sm hover:shadow-md transition-shadow">
        <Microscope className="w-4 h-4 text-electric-indigo text-blue-400" />
        <span className="text-gray-800 text-gray-200">Evidence-Based Research</span>
      </div>

      <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 from-white via-gray-100 to-gray-300 mb-6 leading-tight drop-shadow-sm tracking-tight">
        The Science Behind <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF3131] to-[#FF6B6B] from-[#FF5050] to-[#FF8A8A]">Purrify</span>
      </h1>

      <p className="article-summary text-xl md:text-2xl text-gray-600 text-gray-300 max-w-3xl mx-auto leading-relaxed">
        This hub links to scientific research and authoritative guidance on activated carbon adsorption and odor
        control. Use the citations below to verify specific claims and explore the underlying science.
      </p>
    </header>
  );
}
