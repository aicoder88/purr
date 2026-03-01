import { BookOpen, FlaskConical, ShieldCheck, Microscope, Award } from 'lucide-react';
import {
  getCitationsByCategory,
} from '@/lib/scientific-citations';
import { CitationCard } from './CitationCard';

const citationsByCategory = {
  ammonia: getCitationsByCategory('ammonia'),
  safety: getCitationsByCategory('safety'),
  sulfur: getCitationsByCategory('sulfur'),
  comparison: getCitationsByCategory('comparison'),
  health: getCitationsByCategory('health'),
  fundamentals: getCitationsByCategory('fundamentals'),
};

const sourceTypeIcons: Record<string, React.ReactNode> = {
  pubmed: <Microscope className="w-4 h-4" />,
  epa: <ShieldCheck className="w-4 h-4" />,
  veterinary: <Award className="w-4 h-4" />,
  'peer-reviewed': <BookOpen className="w-4 h-4" />,
};

const sourceTypeLabels: Record<string, string> = {
  pubmed: 'PubMed',
  epa: 'EPA',
  veterinary: 'Veterinary Resource',
  'peer-reviewed': 'Peer-Reviewed',
};

export function CitationsSection() {
  return (
    <section className="mb-16">
      <div className="flex items-center gap-3 mb-8">
        <BookOpen className="w-6 h-6 text-electric-indigo" />
        <h2 className="text-2xl font-bold text-gray-900 text-gray-50">Scientific Citations</h2>
      </div>

      <div className="space-y-8">
        {/* Fundamentals */}
        {citationsByCategory.fundamentals.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 text-gray-50 mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-electric-indigo" />
              Activated Carbon Adsorption Fundamentals
            </h3>
            <div className="space-y-4">
              {citationsByCategory.fundamentals.map((citation) => (
                <CitationCard
                  key={citation.id}
                  citation={citation}
                  sourceTypeIcons={sourceTypeIcons}
                  sourceTypeLabels={sourceTypeLabels}
                />
              ))}
            </div>
          </div>
        )}

        {/* Ammonia Research */}
        {citationsByCategory.ammonia.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 text-gray-50 mb-4 flex items-center gap-2">
              <FlaskConical className="w-5 h-5 text-blue-500 text-blue-400" />
              Ammonia Adsorption Research
            </h3>
            <div className="space-y-4">
              {citationsByCategory.ammonia.map((citation) => (
                <CitationCard
                  key={citation.id}
                  citation={citation}
                  sourceTypeIcons={sourceTypeIcons}
                  sourceTypeLabels={sourceTypeLabels}
                />
              ))}
            </div>
          </div>
        )}

        {/* Safety Research */}
        {citationsByCategory.safety.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 text-gray-50 mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-green-500 text-green-400" />
              Safety & Toxicology
            </h3>
            <div className="space-y-4">
              {citationsByCategory.safety.map((citation) => (
                <CitationCard
                  key={citation.id}
                  citation={citation}
                  sourceTypeIcons={sourceTypeIcons}
                  sourceTypeLabels={sourceTypeLabels}
                />
              ))}
            </div>
          </div>
        )}

        {/* Health Research */}
        {citationsByCategory.health.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 text-gray-50 mb-4 flex items-center gap-2">
              <Microscope className="w-5 h-5 text-purple-500 text-purple-400" />
              Health & Environmental Impact
            </h3>
            <div className="space-y-4">
              {citationsByCategory.health.map((citation) => (
                <CitationCard
                  key={citation.id}
                  citation={citation}
                  sourceTypeIcons={sourceTypeIcons}
                  sourceTypeLabels={sourceTypeLabels}
                />
              ))}
            </div>
          </div>
        )}

        {/* Comparison Studies */}
        {citationsByCategory.comparison.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 text-gray-50 mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-orange-500 text-orange-400" />
              Comparative Studies
            </h3>
            <div className="space-y-4">
              {citationsByCategory.comparison.map((citation) => (
                <CitationCard
                  key={citation.id}
                  citation={citation}
                  sourceTypeIcons={sourceTypeIcons}
                  sourceTypeLabels={sourceTypeLabels}
                />
              ))}
            </div>
          </div>
        )}

        {/* Sulfur Research */}
        {citationsByCategory.sulfur.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 text-gray-50 mb-4 flex items-center gap-2">
              <FlaskConical className="w-5 h-5 text-red-500 text-red-400" />
              Sulfur Compound Research
            </h3>
            <div className="space-y-4">
              {citationsByCategory.sulfur.map((citation) => (
                <CitationCard
                  key={citation.id}
                  citation={citation}
                  sourceTypeIcons={sourceTypeIcons}
                  sourceTypeLabels={sourceTypeLabels}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
