import type { Metadata } from 'next';
import {
  createBreadcrumbSchema,
  createIndexedWebPageSchema,
  serializeSchemaGraph,
} from '@/lib/seo/indexed-content-schema';
import {
  createCustomerServiceSchema,
  getSupportCopy,
  getSupportMetadata,
  SUPPORT_SOCIAL_IMAGE,
} from './support-seo';

export const metadata: Metadata = getSupportMetadata('en');

// Client component for the interactive parts
import SupportPageClient from './SupportPageClient';

export default function SupportPage() {
  const supportCopy = getSupportCopy('en');
  const webPageSchema = createIndexedWebPageSchema({
    locale: 'en',
    path: '/support/',
    title: supportCopy.title,
    description: supportCopy.description,
    image: SUPPORT_SOCIAL_IMAGE,
  });

  const breadcrumbSchema = createBreadcrumbSchema('en', [
    { name: 'Home', path: '/' },
    { name: 'Support', path: '/support/' },
  ]);

  const customerServiceSchema = createCustomerServiceSchema('en');

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeSchemaGraph(webPageSchema, breadcrumbSchema, customerServiceSchema),
        }}
      />
      <SupportPageClient />
    </>
  );
}
