import { SITE_NAME, SITE_URL } from '@/lib/constants';
import { createBreadcrumbSchema, serializeSchemaGraph } from '@/lib/seo/indexed-content-schema';
import { buildPageMetadata } from '@/lib/seo/page-metadata';
import OurStoryContent from './OurStoryContent';

const OUR_STORY_TITLE = 'Our Story: Mission Behind Purrify';
const OUR_STORY_DESCRIPTION =
  "Learn about Purrify's founding story, mission, and the team dedicated to solving cat litter odor problems. Discover our commitment to pets, families, and the environment.";
const OUR_STORY_IMAGE = `${SITE_URL}/optimized/marketing/mission.webp`;
const OUR_STORY_URL = `${SITE_URL}/about/our-story/`;

export const metadata = buildPageMetadata({
  title: OUR_STORY_TITLE,
  description: OUR_STORY_DESCRIPTION,
  path: '/about/our-story/',
  image: OUR_STORY_IMAGE,
  imageAlt: 'Purrify mission and origin story',
  keywords: [
    'Purrify story',
    'company mission',
    'cat litter innovation',
    'pet care',
    'environmental responsibility',
    'Canadian company',
  ],
  lastModified: '2026-03-08',
});

const aboutPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  '@id': `${OUR_STORY_URL}#webpage`,
  url: OUR_STORY_URL,
  name: OUR_STORY_TITLE,
  description: OUR_STORY_DESCRIPTION,
  datePublished: '2019-01-01T00:00:00Z',
  dateModified: '2026-03-08T00:00:00Z',
  primaryImageOfPage: {
    '@type': 'ImageObject',
    url: OUR_STORY_IMAGE,
  },
  about: {
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: `${SITE_URL}/`,
  },
  isPartOf: {
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
  },
};

const breadcrumbSchema = createBreadcrumbSchema('en', [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about/our-story/' },
  { name: 'Our Story', path: '/about/our-story/' },
]);

export default function OurStoryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeSchemaGraph(aboutPageSchema, breadcrumbSchema),
        }}
      />
      <OurStoryContent />
    </>
  );
}
