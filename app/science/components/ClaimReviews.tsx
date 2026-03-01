'use client';

import { CheckCircle, FileText } from 'lucide-react';
import { CLAIM_REVIEWS, SCIENTIFIC_CITATIONS } from '@/lib/scientific-citations';

export function ClaimReviews() {
  return (
    <section className="mb-20">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-green-100 bg-green-900/30 rounded-lg">
          <CheckCircle className="w-6 h-6 text-green-600 text-green-400" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 text-gray-50 tracking-tight">Fact-Checked Claims</h2>
      </div>

      <div className="space-y-4">
        {CLAIM_REVIEWS.map((claim) => (
          <div
            key={claim.claim}
            className="bg-white/70 bg-gray-800/70 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/60 border-gray-700/50 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group"
          >
            <div className="flex items-start gap-5">
              <div
                className={`shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-inner ${claim.rating === 5
                  ? 'bg-gradient-to-br from-green-100 to-green-200 from-green-900/60 to-green-800/40 text-green-800 text-green-300 border border-green-200 border-green-800/50'
                  : 'bg-gradient-to-br from-yellow-100 to-yellow-200 from-yellow-900/60 to-yellow-800/40 text-yellow-800 text-yellow-400 border border-yellow-200 border-yellow-800/50'
                  }`}
              >
                {claim.rating}/5
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 text-gray-50 mb-2 group-hover:text-electric-indigo group-hover:text-blue-400 transition-colors">{claim.claim}</h3>
                <p className="text-base text-gray-600 text-gray-300 mb-4 leading-relaxed">{claim.explanation}</p>
                <div className="flex flex-wrap gap-2">
                  {claim.citationIds.map((id) => {
                    const citation = SCIENTIFIC_CITATIONS.find((c) => c.id === id);
                    return citation ? (
                      <a
                        key={id}
                        href={citation.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white bg-gray-900 border border-gray-200 border-gray-700 text-gray-700 text-gray-300 rounded-lg text-xs font-medium hover:bg-gray-50 hover:bg-gray-800 hover:border-electric-indigo/30 hover:border-blue-500/30 hover:text-electric-indigo hover:text-blue-400 transition-all shadow-sm"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        {citation.journal}{citation.year ? ` (${citation.year})` : ''}
                      </a>
                    ) : null;
                  })}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
