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
  title: 'Science Behind Purrify: Research & Citations',
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
    title: 'Science Behind Purrify: Research & Citations',
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
        url: 'https://www.purrify.ca/optimized/blog/benefits-hero-science.webp',
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
    image: 'https://www.purrify.ca/optimized/blog/benefits-hero-science.webp',
    author: {
      '@type': 'Organization',
      name: 'Purrify',
      url: 'https://www.purrify.ca/',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Purrify',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.purrify.ca/optimized/logos/purrify-logo.avif',
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

      <main className="relative py-16 lg:py-24 overflow-hidden bg-gradient-to-br from-[#FFFFFF] via-[#F4F7FF] to-[#FFFFFF] dark:from-gray-900 dark:via-[#1A1C29] dark:to-gray-900">
        {/* Decorative Background Elements */}
        <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] bg-blue-400/20 dark:bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] bg-electric-indigo/20 dark:bg-electric-indigo/20 rounded-full blur-[120px] pointer-events-none" />

        <Container className="relative z-10">
          <div className="max-w-5xl mx-auto relative">
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
            <header className="mb-20 text-center relative">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-md border border-gray-100 dark:border-gray-700 rounded-full text-sm font-medium mb-8 shadow-sm hover:shadow-md transition-shadow">
                <Microscope className="w-4 h-4 text-electric-indigo dark:text-blue-400" />
                <span className="text-gray-800 dark:text-gray-200">Evidence-Based Research</span>
              </div>

              <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-gray-300 mb-6 leading-tight drop-shadow-sm tracking-tight">
                The Science Behind <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF3131] to-[#FF6B6B] dark:from-[#FF5050] dark:to-[#FF8A8A]">Purrify</span>
              </h1>

              <p className="article-summary text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                This hub links to scientific research and authoritative guidance on activated carbon adsorption and odor
                control. Use the citations below to verify specific claims and explore the underlying science.
              </p>
            </header>

            {/* Key Statistics */}
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

            {/* Claim Reviews Section */}
            <section className="mb-20">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50 tracking-tight">Fact-Checked Claims</h2>
              </div>

              <div className="space-y-4">
                {CLAIM_REVIEWS.map((claim) => (
                  <div
                    key={claim.claim}
                    className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/60 dark:border-gray-700/50 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group"
                  >
                    <div className="flex items-start gap-5">
                      <div
                        className={`shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-inner ${claim.rating === 5
                          ? 'bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/60 dark:to-green-800/40 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-800/50'
                          : 'bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-900/60 dark:to-yellow-800/40 text-yellow-800 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-800/50'
                          }`}
                      >
                        {claim.rating}/5
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-2 group-hover:text-electric-indigo dark:group-hover:text-blue-400 transition-colors">{claim.claim}</h3>
                        <p className="text-base text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">{claim.explanation}</p>
                        <div className="flex flex-wrap gap-2">
                          {claim.citationIds.map((id) => {
                            const citation = SCIENTIFIC_CITATIONS.find((c) => c.id === id);
                            return citation ? (
                              <a
                                key={id}
                                href={citation.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-xs font-medium hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-electric-indigo/30 dark:hover:border-blue-500/30 hover:text-electric-indigo dark:hover:text-blue-400 transition-all shadow-sm"
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
            <section className="mb-20">
              <div className="relative overflow-hidden bg-gradient-to-br from-[#E0EFC7] to-[#d4e8b8] dark:from-green-900/40 dark:to-green-800/30 rounded-3xl p-8 md:p-10 border border-green-200/50 dark:border-green-800/50 shadow-xl">
                {/* Decorative blob */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 dark:bg-black/10 rounded-full blur-[60px] -mr-20 -mt-20 pointer-events-none" />

                <h2 className="text-3xl font-extrabold text-gray-900 dark:text-gray-50 mb-8 relative z-10">Key Takeaways</h2>
                <div className="key-takeaway space-y-5 relative z-10">
                  <div className="flex items-start gap-4 p-4 bg-white/40 dark:bg-gray-900/40 rounded-2xl backdrop-blur-sm shadow-sm border border-white/30 dark:border-gray-700/30">
                    <CheckCircle className="w-6 h-6 text-green-700 dark:text-green-400 shrink-0 mt-0.5" />
                    <p className="text-gray-800 dark:text-gray-200 leading-relaxed text-lg">
                      <strong>Activated carbon can adsorb ammonia</strong>, the key odor compound in cat urine, and its
                      performance depends on carbon properties and environment (e.g., moisture).
                    </p>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-white/40 dark:bg-gray-900/40 rounded-2xl backdrop-blur-sm shadow-sm border border-white/30 dark:border-gray-700/30">
                    <CheckCircle className="w-6 h-6 text-green-700 dark:text-green-400 shrink-0 mt-0.5" />
                    <p className="text-gray-800 dark:text-gray-200 leading-relaxed text-lg">
                      <strong>Activated carbon is used for gas-phase adsorption</strong> in many contexts, including
                      sulfur-containing odor compounds like hydrogen sulfide (H2S).
                    </p>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-white/40 dark:bg-gray-900/40 rounded-2xl backdrop-blur-sm shadow-sm border border-white/30 dark:border-gray-700/30">
                    <CheckCircle className="w-6 h-6 text-green-700 dark:text-green-400 shrink-0 mt-0.5" />
                    <p className="text-gray-800 dark:text-gray-200 leading-relaxed text-lg">
                      <strong>For indoor odor and gas reduction</strong>, EPA guidance describes activated carbon
                      filtration as an option for certain pollutants.
                    </p>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-white/40 dark:bg-gray-900/40 rounded-2xl backdrop-blur-sm shadow-sm border border-white/30 dark:border-gray-700/30">
                    <CheckCircle className="w-6 h-6 text-green-700 dark:text-green-400 shrink-0 mt-0.5" />
                    <p className="text-gray-800 dark:text-gray-200 leading-relaxed text-lg">
                      <strong>Pet health concerns should be discussed with your veterinarian</strong>, especially for
                      households with sensitive cats or respiratory issues.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* CTA Section */}
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
