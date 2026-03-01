import { ExternalLink } from 'lucide-react';
import { SCIENTIFIC_CITATIONS } from '@/lib/scientific-citations';

interface CitationCardProps {
  citation: (typeof SCIENTIFIC_CITATIONS)[0];
  sourceTypeIcons: Record<string, React.ReactNode>;
  sourceTypeLabels: Record<string, string>;
}

export function CitationCard({
  citation,
  sourceTypeIcons,
  sourceTypeLabels,
}: CitationCardProps) {
  return (
    <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-md rounded-2xl p-6 border border-white/40 dark:border-gray-700/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
      <div className="flex items-start gap-5">
        <div className="shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center text-gray-700 dark:text-gray-300 shadow-inner border border-white/50 dark:border-gray-600/30 group-hover:scale-110 transition-transform">
          {sourceTypeIcons[citation.sourceType]}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <span className="px-2.5 py-1 bg-white/80 dark:bg-gray-900/80 border border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-md text-xs font-semibold uppercase tracking-wider shadow-sm">
              {sourceTypeLabels[citation.sourceType]}
            </span>
            {citation.year && (
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center before:content-[''] before:w-1 before:h-1 before:bg-gray-300 dark:before:bg-gray-600 before:rounded-full before:mr-2">
                {citation.year}
              </span>
            )}
          </div>
          <h4 className="text-lg font-bold text-gray-900 dark:text-gray-50 mb-1.5 leading-snug group-hover:text-electric-indigo dark:group-hover:text-blue-400 transition-colors">{citation.title}</h4>
          <p className="text-sm font-medium text-electric-indigo/80 dark:text-blue-400/80 mb-3">
            {citation.authors} <span className="text-gray-400 dark:text-gray-600 mx-1">•</span> {citation.journal}
          </p>
          <p className="text-base text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">{citation.summary}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {citation.claims.slice(0, 3).map((claim, index) => (
              <span key={index} className="px-2.5 py-1 bg-blue-50/80 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg text-xs font-medium border border-blue-100/50 dark:border-blue-800/30">
                {claim}
              </span>
            ))}
          </div>
          <a
            href={citation.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-electric-indigo dark:text-blue-400 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            View Full Source
            <span className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 ml-2">
              {citation.doi && <span className="text-xs font-normal text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">DOI: {citation.doi}</span>}
              {citation.pmid && <span className="text-xs font-normal text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">PMID: {citation.pmid}</span>}
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
