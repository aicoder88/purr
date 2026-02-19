import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { SITE_NAME } from '@/lib/constants';
import {
  SCIENTIFIC_CITATIONS,
  CLAIM_REVIEWS,
  getCitationsByCategory,
} from '@/lib/scientific-citations';
import { stripContext } from '@/lib/seo-utils';
import {
  Microscope,
  BookOpen,
  CheckCircle,
  ExternalLink,
  FileText,
  ShieldCheck,
  Award,
  FlaskConical,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Science Behind Purrify: Research & Citations | Purrify',
  description:
    'Explore scientific research and authoritative resources supporting activated carbon for cat litter odor control, with citations to primary and trusted sources.',
  keywords: [
    'activated carbon research',
    'ammonia adsorption',
    'cat litter science',
    'peer-reviewed citations',
    'pubmed research',
  ],
  alternates: {
    canonical: 'https://www.purrify.ca/science/'
  },
  openGraph: {
    title: 'Science Behind Purrify: Research & Citations | Purrify',
    description:
      'Explore the peer-reviewed scientific research supporting activated carbon for cat litter odor control.',
    url: 'https://www.purrify.ca/science/',
    type: 'article',
    siteName: SITE_NAME,
    locale: 'en_CA',
    publishedTime: '2025-01-15',
    modifiedTime: new Date().toISOString(),
    images: [
      {
        url: 'https://www.purrify.ca/optimized/science-hub-og.jpg',
        width: 1200,
        height: 630,
        alt: 'The Science Behind Purrify',
      },
    ],
  },
  other: {
    'last-modified': '2026-01-27',
  },
};

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

export default function SciencePage() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'The Science Behind Purrify: Peer-Reviewed Research & Citations',
    description:
      'Explore the peer-reviewed scientific research supporting activated carbon for cat litter odor control.',
    datePublished: '2025-01-15',
    dateModified: new Date().toISOString().split('T')[0],
    image: 'https://www.purrify.ca/optimized/science-hub-og.jpg',
    author: {
      '@type': 'Organization',
      name: 'Purrify',
      url: 'https://www.purrify.ca',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Purrify',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.purrify.ca/optimized/purrify-logo.avif',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://www.purrify.ca/science',
    },
  };


  const collectionPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Scientific Research & Citations',
    description: 'Peer-reviewed research supporting activated carbon for cat litter odor control',
    url: 'https://www.purrify.ca/science/',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: SCIENTIFIC_CITATIONS.map((citation, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'ScholarlyArticle',
          headline: citation.title,
          author: citation.authors,
          isPartOf: {
            '@type': 'Periodical',
            name: citation.journal,
          },
          identifier: citation.doi || citation.pmid,
          url: citation.url,
        },
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              stripContext(articleSchema),
              stripContext(collectionPageSchema),
            ],
          }),
        }}
      />

      <main className="py-16 bg-gradient-to-br from-[#FFFFFF] via-[#FFFFF5] to-[#FFFFFF] dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
        <Container>
          <div className="max-w-5xl mx-auto">
            {/* Breadcrumb */}
            <nav className="mb-8">
              <ol className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <li>
                  <Link href="/" className="hover:text-[#FF3131] dark:hover:text-[#FF6B6B]">
                    Home
                  </Link>
                </li>
                <li>/</li>
                <li className="text-[#FF3131] dark:text-[#FF6B6B]">Science Hub</li>
              </ol>
            </nav>

            {/* Hero Section */}
            <header className="mb-16 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-electric-indigo/10 text-electric-indigo rounded-full text-sm font-medium mb-6">
                <Microscope className="w-4 h-4" />
                <span>Evidence-Based Research</span>
              </div>

              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 leading-tight">
                The Science Behind <span className="text-[#FF3131] dark:text-[#FF5050]">Purrify</span>
              </h1>

              <p className="article-summary text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
                This hub links to scientific research and authoritative guidance on activated carbon adsorption and odor
                control. Use the citations below to verify specific claims and explore the underlying science.
              </p>
            </header>

            {/* Key Statistics */}
            <section className="mb-16">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                    {SCIENTIFIC_CITATIONS.length}
                  </div>
                  <div className="text-sm text-blue-700 dark:text-blue-300">Citations</div>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">
                    {CLAIM_REVIEWS.length}
                  </div>
                  <div className="text-sm text-green-700 dark:text-green-300">Claim Checks</div>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                    {citationTopicCount}
                  </div>
                  <div className="text-sm text-purple-700 dark:text-purple-300">Topics Covered</div>
                </div>
                <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-1">
                    {citationSourceTypeCount}
                  </div>
                  <div className="text-sm text-orange-700 dark:text-orange-300">Source Types</div>
                </div>
              </div>
            </section>

            {/* Claim Reviews Section */}
            <section className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <CheckCircle className="w-6 h-6 text-green-500 dark:text-green-400" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50">Fact-Checked Claims</h2>
              </div>

              <div className="space-y-4">
                {CLAIM_REVIEWS.map((claim) => (
                  <div
                    key={claim.claim}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${claim.rating === 5
                          ? 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300'
                          : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                          }`}
                      >
                        {claim.rating}/5
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-gray-50 mb-1">{claim.claim}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{claim.explanation}</p>
                        <div className="flex flex-wrap gap-2">
                          {claim.citationIds.map((id) => {
                            const citation = SCIENTIFIC_CITATIONS.find((c) => c.id === id);
                            return citation ? (
                              <a
                                key={id}
                                href={citation.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                              >
                                <FileText className="w-3 h-3" />
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

            {/* Citations by Category */}
            <section className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <BookOpen className="w-6 h-6 text-electric-indigo" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50">Scientific Citations</h2>
              </div>

              <div className="space-y-8">
                {/* Fundamentals */}
                {citationsByCategory.fundamentals.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-4 flex items-center gap-2">
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
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-4 flex items-center gap-2">
                      <FlaskConical className="w-5 h-5 text-blue-500 dark:text-blue-400" />
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
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-4 flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-green-500 dark:text-green-400" />
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
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-4 flex items-center gap-2">
                      <Microscope className="w-5 h-5 text-purple-500 dark:text-purple-400" />
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
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-4 flex items-center gap-2">
                      <Award className="w-5 h-5 text-orange-500 dark:text-orange-400" />
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
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-4 flex items-center gap-2">
                      <FlaskConical className="w-5 h-5 text-red-500 dark:text-red-400" />
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

            {/* Key Takeaways */}
            <section className="mb-16">
              <div className="bg-gradient-to-br from-[#E0EFC7] to-[#d4e8b8] dark:from-green-900/30 dark:to-green-800/20 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-6">Key Takeaways</h2>
                <div className="key-takeaway space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                    <p className="text-gray-700 dark:text-gray-200">
                      <strong>Activated carbon can adsorb ammonia</strong>, the key odor compound in cat urine, and its
                      performance depends on carbon properties and environment (e.g., moisture).
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                    <p className="text-gray-700 dark:text-gray-200">
                      <strong>Activated carbon is used for gas-phase adsorption</strong> in many contexts, including
                      sulfur-containing odor compounds like hydrogen sulfide (H2S).
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                    <p className="text-gray-700 dark:text-gray-200">
                      <strong>For indoor odor and gas reduction</strong>, EPA guidance describes activated carbon
                      filtration as an option for certain pollutants.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                    <p className="text-gray-700 dark:text-gray-200">
                      <strong>Pet health concerns should be discussed with your veterinarian</strong>, especially for
                      households with sensitive cats or respiratory issues.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section>
              <div className="text-center bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-4">
                  Experience the Science Yourself
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
                  Backed by peer-reviewed research and trusted by thousands of cat parents. Try Purrify risk-free and see
                  why activated carbon is the gold standard for odor control.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href="/products/standard"
                    className="px-8 py-3 bg-[#FF3131] dark:bg-[#FF5050] text-white dark:text-gray-100 rounded-full font-semibold shadow-lg hover:bg-[#FF5151] transition-colors"
                  >
                    Shop Purrify
                  </Link>
                  <Link
                    href="/learn/science"
                    className="px-8 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-full font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </Container>
      </main>
    </>
  );
}

// Citation Card Component
function CitationCard({
  citation,
  sourceTypeIcons,
  sourceTypeLabels,
}: {
  citation: (typeof SCIENTIFIC_CITATIONS)[0];
  sourceTypeIcons: Record<string, React.ReactNode>;
  sourceTypeLabels: Record<string, string>;
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        <div className="shrink-0 w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-400">
          {sourceTypeIcons[citation.sourceType]}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded text-xs font-medium">
              {sourceTypeLabels[citation.sourceType]}
            </span>
            {citation.year && (
              <span className="text-xs text-gray-500 dark:text-gray-400">{citation.year}</span>
            )}
          </div>
          <h4 className="font-semibold text-gray-900 dark:text-gray-50 mb-1">{citation.title}</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            {citation.authors} • {citation.journal}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{citation.summary}</p>
          <div className="flex flex-wrap gap-2 mb-3">
            {citation.claims.slice(0, 3).map((claim, index) => (
              <span key={index} className="px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded text-xs">
                {claim}
              </span>
            ))}
          </div>
          <a
            href={citation.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-electric-indigo dark:text-blue-400 hover:underline"
          >
            <ExternalLink className="w-3 h-3" />
            View Source
            {citation.doi && <span className="text-gray-500 dark:text-gray-400">• DOI: {citation.doi}</span>}
            {citation.pmid && <span className="text-gray-500 dark:text-gray-400">• PMID: {citation.pmid}</span>}
          </a>
        </div>
      </div>
    </div>
  );
}
