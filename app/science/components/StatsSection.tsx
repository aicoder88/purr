import {
  SCIENTIFIC_CITATIONS,
  CLAIM_REVIEWS,
  getCitationsByCategory,
} from '@/lib/scientific-citations';

const citationsByCategory = {
  ammonia: getCitationsByCategory('ammonia'),
  safety: getCitationsByCategory('safety'),
  sulfur: getCitationsByCategory('sulfur'),
  comparison: getCitationsByCategory('comparison'),
  health: getCitationsByCategory('health'),
  fundamentals: getCitationsByCategory('fundamentals'),
};

const citationTopicCount = Object.values(citationsByCategory).filter((list) => list.length > 0).length;
const citationSourceTypeCount = new Set(SCIENTIFIC_CITATIONS.map((c) => c.sourceType)).size;

export function StatsSection() {
  return (
    <section className="mb-20">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-md border border-white/40 dark:border-gray-700/50 shadow-lg hover:-translate-y-1 hover:shadow-xl transition-all duration-300 rounded-2xl p-6 text-center group">
          <div className="text-4xl font-extrabold text-blue-600 dark:text-blue-400 mb-2 group-hover:scale-110 transition-transform">
            {SCIENTIFIC_CITATIONS.length}
          </div>
          <div className="text-sm font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">Citations</div>
        </div>
        <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-md border border-white/40 dark:border-gray-700/50 shadow-lg hover:-translate-y-1 hover:shadow-xl transition-all duration-300 rounded-2xl p-6 text-center group">
          <div className="text-4xl font-extrabold text-green-600 dark:text-green-400 mb-2 group-hover:scale-110 transition-transform">
            {CLAIM_REVIEWS.length}
          </div>
          <div className="text-sm font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">Claim Checks</div>
        </div>
        <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-md border border-white/40 dark:border-gray-700/50 shadow-lg hover:-translate-y-1 hover:shadow-xl transition-all duration-300 rounded-2xl p-6 text-center group">
          <div className="text-4xl font-extrabold text-purple-600 dark:text-purple-400 mb-2 group-hover:scale-110 transition-transform">
            {citationTopicCount}
          </div>
          <div className="text-sm font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">Topics Covered</div>
        </div>
        <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-md border border-white/40 dark:border-gray-700/50 shadow-lg hover:-translate-y-1 hover:shadow-xl transition-all duration-300 rounded-2xl p-6 text-center group">
          <div className="text-4xl font-extrabold text-orange-600 dark:text-orange-400 mb-2 group-hover:scale-110 transition-transform">
            {citationSourceTypeCount}
          </div>
          <div className="text-sm font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">Source Types</div>
        </div>
      </div>
    </section>
  );
}
