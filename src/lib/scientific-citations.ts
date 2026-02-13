/**
 * Scientific Citations Library for GEO (Generative Engine Optimization)
 * Peer-reviewed sources from PubMed, EPA, and scientific journals
 */

export interface ScientificCitation {
  id: string;
  title: string;
  authors: string;
  journal: string;
  year?: number;
  doi?: string;
  pmid?: string;
  url: string;
  summary: string;
  claims: string[]; // Claims this citation supports
  sourceType: 'pubmed' | 'epa' | 'veterinary' | 'peer-reviewed';
}

export interface ClaimReview {
  claim: string;
  rating: 1 | 2 | 3 | 4 | 5; // 1=False, 5=True
  ratingLabel: string;
  citationIds: string[];
  explanation: string;
}

/**
 * Peer-reviewed scientific citations supporting activated carbon efficacy
 */
export const SCIENTIFIC_CITATIONS: ScientificCitation[] = [
  {
    id: 'ammonia-removal-activated-carbon-2011',
    title: 'Ammonia Removal Using Activated Carbons: Effect of the Surface Chemistry in Dry and Moist Conditions',
    authors: 'Goncalves, M.; Sanchez-Garcia, L.; de Oliveira Jardim, E.; Silvestre-Albero, J.; Rodriguez-Reinoso, F.',
    journal: 'Environmental Science & Technology',
    year: 2011,
    doi: '10.1021/es203093v',
    pmid: '22049916',
    url: 'https://pubmed.ncbi.nlm.nih.gov/22049916/',
    summary: 'Study evaluating activated carbons for ammonia (NH3) removal under dry and moist conditions, including how surface chemistry influences adsorption performance.',
    claims: [
      'Activated carbon adsorbs ammonia molecules',
      'Activated carbon can remove ammonia under different humidity conditions',
    ],
    sourceType: 'pubmed',
  },
  {
    id: 'h2s-removal-biogas-2020',
    title: 'Removal of hydrogen sulfide from biogas using activated carbon synthesized from different locally available biomass wastes',
    authors: 'Sawalha, H., Maghalseh, M., Qutaina, J., Junaidi, K., Rene, E.R.',
    journal: 'Bioengineered',
    year: 2020,
    doi: '10.1080/21655979.2020.1768736',
    pmid: '32463312',
    url: 'https://pubmed.ncbi.nlm.nih.gov/32463312/',
    summary: 'Study evaluating activated carbon derived from biomass for hydrogen sulfide (H2S) removal via adsorption.',
    claims: [
      'Activated carbon removes hydrogen sulfide',
      'Activated carbon adsorbs sulfur-containing odor compounds',
    ],
    sourceType: 'pubmed',
  },
  {
    id: 'epa-activated-carbon-adsorption-pdf-2018',
    title: 'EPA - Activated Carbon Adsorption',
    authors: 'United States Environmental Protection Agency (EPA)',
    journal: 'United States Environmental Protection Agency',
    url: 'https://www.epa.gov/sites/default/files/2018-11/documents/activated_carbon_adsorption_intro_0.pdf',
    summary: 'EPA introductory document on activated carbon adsorption.',
    claims: [
      'Activated carbon adsorption is driven by surface area and pore structure',
      'Activated carbon can adsorb odor-causing molecules',
    ],
    sourceType: 'epa',
  },
  {
    id: 'epa-guide-air-cleaners-2023',
    title: 'Guide to Air Cleaners in the Home',
    authors: 'United States Environmental Protection Agency (EPA)',
    journal: 'United States Environmental Protection Agency',
    year: 2023,
    url: 'https://www.epa.gov/indoor-air-quality-iaq/guide-air-cleaners-home',
    summary: 'EPA consumer guidance describing which types of home air cleaners can help with different pollutants, including activated carbon for certain gases.',
    claims: [
      'Activated carbon filters can help reduce certain gases and odors indoors',
    ],
    sourceType: 'epa',
  },
];

/**
 * Claim Reviews with scientific backing
 * Maps specific claims to their veracity ratings and supporting citations
 */
export const CLAIM_REVIEWS: ClaimReview[] = [
  {
    claim: 'Activated carbon traps ammonia molecules',
    rating: 5,
    ratingLabel: 'True',
    citationIds: ['ammonia-removal-activated-carbon-2011'],
    explanation: 'A PubMed-indexed study evaluates activated carbons for ammonia removal, including performance under dry and moist conditions.',
  },
  {
    claim: 'Activated carbon removes hydrogen sulfide',
    rating: 5,
    ratingLabel: 'True',
    citationIds: ['h2s-removal-biogas-2020'],
    explanation: 'A PubMed-indexed study evaluates activated carbon for hydrogen sulfide (H2S) adsorption.',
  },
  {
    claim: 'Activated carbon is effective for indoor air quality',
    rating: 5,
    ratingLabel: 'True',
    citationIds: ['epa-guide-air-cleaners-2023'],
    explanation: 'EPA guidance describes activated carbon filters as an option for reducing certain indoor gases and odors.',
  },
];

/**
 * Get citations supporting a specific claim
 */
export function getCitationsForClaim(claimText: string): ScientificCitation[] {
  const claim = CLAIM_REVIEWS.find(
    c => c.claim.toLowerCase().includes(claimText.toLowerCase()) ||
      claimText.toLowerCase().includes(c.claim.toLowerCase())
  );

  if (!claim) return [];

  return claim.citationIds
    .map(id => SCIENTIFIC_CITATIONS.find(c => c.id === id))
    .filter(Boolean) as ScientificCitation[];
}

/**
 * Get ClaimReview schema for a specific claim
 */
export function getClaimReviewSchema(claimText: string, pageUrl: string): object | null {
  const claim = CLAIM_REVIEWS.find(
    c => c.claim.toLowerCase().includes(claimText.toLowerCase()) ||
      claimText.toLowerCase().includes(c.claim.toLowerCase())
  );

  if (!claim) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'ClaimReview',
    url: pageUrl,
    claimReviewed: claim.claim,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: claim.rating,
      bestRating: 5,
      worstRating: 1,
      alternateName: claim.ratingLabel,
    },
    author: {
      '@type': 'Organization',
      name: 'Purrify',
      url: 'https://www.purrify.ca',
    },
    datePublished: new Date().toISOString(),
    citation: claim.citationIds.map(id => {
      const citation = SCIENTIFIC_CITATIONS.find(c => c.id === id);
      if (!citation) return null;

      const scholarlyArticle: Record<string, unknown> = {
        '@type': 'ScholarlyArticle',
        headline: citation.title,
        author: citation.authors,
        isPartOf: {
          '@type': 'Periodical',
          name: citation.journal,
        },
        identifier: citation.doi || citation.pmid,
        url: citation.url,
      };

      if (citation.year) {
        scholarlyArticle.datePublished = citation.year;
      }

      return scholarlyArticle;
    }).filter(Boolean),
  };
}

/**
 * Get all citations for a specific category
 */
export function getCitationsByCategory(category: 'ammonia' | 'safety' | 'sulfur' | 'comparison' | 'health' | 'fundamentals'): ScientificCitation[] {
  const keywords: Record<string, string[]> = {
    ammonia: ['ammonia', 'nh3', 'nitrogen'],
    safety: ['safety', 'non-toxic', 'pet care', 'iaq'],
    sulfur: ['sulfur', 'hydrogen sulfide', 'h2s'],
    comparison: ['zeolite', 'comparison', 'versus'],
    health: ['health', 'exposure', 'respiratory', 'iaq'],
    fundamentals: ['activated carbon adsorption'],
  };

  const searchTerms = keywords[category] || [];

  return SCIENTIFIC_CITATIONS.filter(citation =>
    searchTerms.some(term =>
      citation.title.toLowerCase().includes(term.toLowerCase()) ||
      citation.summary.toLowerCase().includes(term.toLowerCase()) ||
      citation.claims.some(claim => claim.toLowerCase().includes(term.toLowerCase()))
    )
  );
}

export default {
  SCIENTIFIC_CITATIONS,
  CLAIM_REVIEWS,
  getCitationsForClaim,
  getClaimReviewSchema,
  getCitationsByCategory,
};
