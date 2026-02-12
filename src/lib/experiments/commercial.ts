export type ExperimentVariant = 'control' | 'variant';

export interface CommercialExperimentDefinition {
  slug: string;
  name: string;
  description: string;
  targetPage: string;
  trafficSplit: number;
  cookieName: string;
  headerName: string;
}

export interface SerializedExperimentAssignment {
  testSlug: string;
  variant: ExperimentVariant;
}

const AB_COOKIE_PREFIX = 'purrify_ab_';

export const COMMERCIAL_ROUTE_PATHS = [
  '/products',
  '/learn',
  '/try-free',
  '/reviews',
] as const;

export const COMMERCIAL_EXPERIMENTS: CommercialExperimentDefinition[] = [
  {
    slug: 'commercial-headline-test',
    name: 'Commercial Headline Test',
    description: 'Tests promise-first headline copy on commercial landing pages.',
    targetPage: '/products|/learn|/try-free|/reviews',
    trafficSplit: 50,
    cookieName: `${AB_COOKIE_PREFIX}commercial-headline-test`,
    headerName: 'x-purrify-exp-commercial-headline-test',
  },
  {
    slug: 'commercial-proof-order-test',
    name: 'Commercial Proof Order Test',
    description: 'Tests proof-first vs offer-first information ordering.',
    targetPage: '/products|/learn|/try-free|/reviews',
    trafficSplit: 50,
    cookieName: `${AB_COOKIE_PREFIX}commercial-proof-order-test`,
    headerName: 'x-purrify-exp-commercial-proof-order-test',
  },
  {
    slug: 'commercial-cta-copy-test',
    name: 'Commercial CTA Copy Test',
    description: 'Tests conversion-focused CTA copy variants on commercial pages.',
    targetPage: '/products|/learn|/try-free|/reviews',
    trafficSplit: 50,
    cookieName: `${AB_COOKIE_PREFIX}commercial-cta-copy-test`,
    headerName: 'x-purrify-exp-commercial-cta-copy-test',
  },
];

export function isExperimentVariant(value: string | undefined): value is ExperimentVariant {
  return value === 'control' || value === 'variant';
}

export function normalizeRoutePath(pathname: string): string {
  if (!pathname || pathname === '/') {
    return '/';
  }

  const stripped = pathname.replace(/\/+$/, '');
  return stripped.length === 0 ? '/' : stripped;
}

export function isCommercialRoute(pathname: string): boolean {
  return COMMERCIAL_ROUTE_PATHS.includes(normalizeRoutePath(pathname) as (typeof COMMERCIAL_ROUTE_PATHS)[number]);
}

export function getCommercialExperimentBySlug(slug: string): CommercialExperimentDefinition | undefined {
  return COMMERCIAL_EXPERIMENTS.find((experiment) => experiment.slug === slug);
}

export function getCommercialAssignmentsFromCookieReader(cookieReader: { get: (name: string) => { value: string } | undefined }): SerializedExperimentAssignment[] {
  const assignments: SerializedExperimentAssignment[] = [];

  for (const experiment of COMMERCIAL_EXPERIMENTS) {
    const cookieValue = cookieReader.get(experiment.cookieName)?.value;
    if (!isExperimentVariant(cookieValue)) {
      continue;
    }

    assignments.push({
      testSlug: experiment.slug,
      variant: cookieValue,
    });
  }

  return assignments;
}

export function serializeAssignments(assignments: SerializedExperimentAssignment[]): string {
  if (assignments.length === 0) {
    return '';
  }

  return assignments
    .map((assignment) => `${assignment.testSlug}:${assignment.variant}`)
    .join('|');
}

export function parseAssignments(serialized: string | undefined): SerializedExperimentAssignment[] {
  if (!serialized) {
    return [];
  }

  const assignments: SerializedExperimentAssignment[] = [];
  const pairs = serialized.split('|');

  for (const pair of pairs) {
    const [testSlug, variant] = pair.split(':');
    if (!testSlug || !isExperimentVariant(variant) || !getCommercialExperimentBySlug(testSlug)) {
      continue;
    }

    assignments.push({
      testSlug,
      variant,
    });
  }

  return assignments;
}
