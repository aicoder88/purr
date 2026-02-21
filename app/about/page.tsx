'use client';

import { redirect } from 'next/navigation';
import { useEnhancedSEO } from '@/hooks/useEnhancedSEO';

export default function AboutRedirectPage() {
  const { schema, additionalSchemas } = useEnhancedSEO({
    path: '/about',
    title: 'About Purrify',
    description: 'Learn about Purrify and our mission to eliminate cat litter odors naturally with activated carbon technology.',
    schemaType: 'organization',
    schemaData: {
      description: 'Purrify is a Canadian company creating innovative cat litter additives using activated carbon technology for natural odor elimination.',
      socialLinks: [
        'https://www.instagram.com/purrifyhq',
        'https://www.facebook.com/purrify',
        'https://www.youtube.com/@PurrifyHQ',
        'https://www.linkedin.com/company/purrify',
        'https://www.tiktok.com/@purrifyhq',
      ],
    },
  });

  const allSchemas = [schema, ...additionalSchemas].filter(Boolean);

  return (
    <>
      {allSchemas.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              allSchemas.length === 1
                ? allSchemas[0]
                : { '@context': 'https://schema.org', '@graph': allSchemas }
            ),
          }}
        />
      )}
      {redirect('/about/our-story')}
    </>
  );
}
