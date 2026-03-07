import { SITE_NAME, SITE_URL } from '@/lib/constants';

export type EditorialEntitySlug =
  | 'purrify-team'
  | 'purrify-science-team'
  | 'purrify-research-lab';

export interface EditorialEntity {
  slug: EditorialEntitySlug;
  name: string;
  publicLabel: string;
  summary: string;
  description: string;
  canonicalPath: `/about/team/${string}`;
  scope: string[];
  responsibilities: string[];
  evidenceStandards: string[];
  profileTitle: string;
  profileIntro: string;
}

const EDITORIAL_ENTITIES: EditorialEntity[] = [
  {
    slug: 'purrify-team',
    name: 'Purrify Team',
    publicLabel: 'Editorial Team',
    summary: 'Collective byline for consumer education, product explainers, and article maintenance.',
    description:
      'Purrify Team is the organization-level byline used when articles are written, edited, and updated collectively by Purrify staff.',
    canonicalPath: '/about/team/purrify-team',
    scope: [
      'Consumer-facing blog articles',
      'How-to explainers and product education',
      'Routine article refreshes, formatting updates, and link maintenance',
    ],
    responsibilities: [
      'Draft and update educational articles',
      'Keep article structure, bylines, and update dates current',
      'Escalate technical or performance claims for internal review when needed',
    ],
    evidenceStandards: [
      'Uses cited sources when making scientific, chemistry, or safety claims',
      'Separates product guidance from veterinary or medical advice',
      'Links to the editorial policy and testing policy for process details',
    ],
    profileTitle: 'Purrify Team',
    profileIntro:
      'This is the public byline we use when content is produced by the company as a team rather than a single named individual.',
  },
  {
    slug: 'purrify-science-team',
    name: 'Purrify Science Team',
    publicLabel: 'Science Review Team',
    summary: 'Internal group responsible for claim review on chemistry, odor control, and safety topics.',
    description:
      'Purrify Science Team is the organization-level reviewer used for articles that need internal review of technical explanations, odor-control claims, or safety framing.',
    canonicalPath: '/about/team/purrify-science-team',
    scope: [
      'Odor chemistry explanations',
      'Activated carbon mechanism claims',
      'Safety framing, limitations, and evidence summaries',
    ],
    responsibilities: [
      'Review scientific explanations for internal consistency',
      'Check that source-backed claims are described with appropriate limits',
      'Flag copy that overstates lab, household, or product results',
    ],
    evidenceStandards: [
      'Prefers primary sources, technical references, and clearly attributable guidance',
      'Requires internal copy to distinguish testing conditions from real-world variance',
      'Does not represent veterinary diagnosis, treatment, or individualized care advice',
    ],
    profileTitle: 'Purrify Science Team',
    profileIntro:
      'This public reviewer entity represents the internal group that reviews technical explanations and evidence-driven claims before or during substantive updates.',
  },
  {
    slug: 'purrify-research-lab',
    name: 'Purrify Research Lab',
    publicLabel: 'Research & Testing',
    summary: 'Organization-level entity for internal testing notes, claim documentation, and evidence synthesis.',
    description:
      'Purrify Research Lab is the organization-level label used for internal testing summaries, evidence synthesis, and bench-level product observations.',
    canonicalPath: '/about/team/purrify-research-lab',
    scope: [
      'Internal testing summaries',
      'Claim documentation and benchmark notes',
      'Evidence synthesis for product and odor-control content',
    ],
    responsibilities: [
      'Document internal testing conditions and observations',
      'Track which claims rely on internal testing versus outside sources',
      'Support article maintenance with testing notes and source references',
    ],
    evidenceStandards: [
      'Labels internal testing as internal testing rather than third-party validation',
      'Avoids presenting bench observations as universal outcomes',
      'Feeds testing limitations and context back into the editorial workflow',
    ],
    profileTitle: 'Purrify Research Lab',
    profileIntro:
      'This entity is used when content is primarily based on internal testing, claim documentation, or evidence synthesis maintained by Purrify.',
  },
];

const ENTITY_BY_NAME = new Map(
  EDITORIAL_ENTITIES.map((entity) => [entity.name.toLowerCase(), entity])
);

const ENTITY_BY_SLUG = new Map(
  EDITORIAL_ENTITIES.map((entity) => [entity.slug, entity])
);

export const editorialEntities = EDITORIAL_ENTITIES;

export function getEditorialEntityBySlug(slug: string): EditorialEntity | null {
  return ENTITY_BY_SLUG.get(slug as EditorialEntitySlug) ?? null;
}

export function getEditorialEntityByName(name?: string | null): EditorialEntity | null {
  if (!name) {
    return null;
  }

  return ENTITY_BY_NAME.get(name.trim().toLowerCase()) ?? null;
}

export function getPublicEditorialEntity(name?: string | null): EditorialEntity {
  return getEditorialEntityByName(name) ?? EDITORIAL_ENTITIES[0];
}

export function getPublicEditorialName(name?: string | null): string {
  return getPublicEditorialEntity(name).name;
}

export function getEditorialEntityHref(nameOrEntity: string | EditorialEntity): string {
  return typeof nameOrEntity === 'string'
    ? getPublicEditorialEntity(nameOrEntity).canonicalPath
    : nameOrEntity.canonicalPath;
}

export function getEditorialEntityUrl(entity: EditorialEntity): string {
  return `${SITE_URL}${entity.canonicalPath}`;
}

export function buildEditorialEntitySchema(entity: EditorialEntity) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: entity.name,
    url: getEditorialEntityUrl(entity),
    description: entity.description,
    parentOrganization: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}
