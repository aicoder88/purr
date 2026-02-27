'use client';

import { useLocale } from 'next-intl';
import { Container } from '@/components/ui/container';
import { RelatedContent } from '@/components/seo/RelatedContent';
import { useEnhancedSEO } from '@/hooks/useEnhancedSEO';
import { formatProductPrice } from '@/lib/pricing';
import { getPaymentLink } from '@/lib/payment-links';
import { GUIDE_COPY } from './components/GuideCopy';
import Breadcrumb from './components/Breadcrumb';
import HeroSection from './components/HeroSection';
import LitterTypesSection from './components/LitterTypesSection';
import MaintenanceSection from './components/MaintenanceSection';
import ProblemsSection from './components/ProblemsSection';
import CTASection from './components/CTASection';
import Image from 'next/image';

type SupportedLocale = 'en' | 'fr';

export default function CatLitterGuidePageContent() {
  const locale = useLocale();
  const localePrefix = locale === 'en' ? '' : `/${locale}`;
  const copy = GUIDE_COPY[locale as SupportedLocale] || GUIDE_COPY.en;

  const { schema, additionalSchemas } = useEnhancedSEO({
    path: '/learn/cat-litter-guide',
    title: 'Cat Litter Guide: Types & Best Practices',
    description: 'Comprehensive guide to cat litter types, maintenance tips, and solving common problems. Learn how to choose the best litter for your cat and keep it fresh longer.',
    targetKeyword: 'cat litter guide',
    schemaType: 'article',
    schemaData: {
      headline: 'Complete Cat Litter Guide - Types, Tips & Best Practices',
      description: 'Comprehensive guide to cat litter types, maintenance tips, and solving common problems. Learn how to choose the best litter for your cat and keep it fresh longer.',
      image: 'https://www.purrify.ca/optimized/blog/litter-guide-hero-setup.webp',
      datePublished: '2024-01-01T10:00:00Z',
      dateModified: new Date().toISOString(),
      category: 'Pet Care Guides',
      keywords: ['cat litter guide', 'cat litter types', 'litter maintenance tips', 'clay litter', 'clumping litter', 'silica litter', 'natural cat litter'],
    },
    image: 'https://www.purrify.ca/optimized/blog/litter-guide-hero-setup.webp',
    keywords: ['cat litter guide', 'cat litter types', 'litter maintenance tips', 'clay litter', 'clumping litter', 'silica litter', 'natural cat litter'],
  });

  const trialPrice = formatProductPrice('trial', locale);
  const trialCheckoutUrl = getPaymentLink('trialSingle') || `${localePrefix}/products/trial-size`;
  const trialCtaLabel = `${copy.trialCtaPrefix} - ${trialPrice}`;

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
      <main className="min-h-screen bg-[#FFFFF5] dark:bg-gray-900 transition-colors duration-300">
        <Breadcrumb localePrefix={localePrefix} copy={copy} />
        <HeroSection
          localePrefix={localePrefix}
          copy={copy}
          trialCtaLabel={trialCtaLabel}
          trialCheckoutUrl={trialCheckoutUrl}
        />

        {/* Section Image */}
        <section className="py-8">
          <Container>
            <div className="max-w-4xl mx-auto">
              <Image
                src="/optimized/blog/safe-cat-litter.webp"
                alt={copy.sectionImageAlt}
                width={1600}
                height={1067}
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>
          </Container>
        </section>

        <LitterTypesSection copy={copy} />
        <MaintenanceSection copy={copy} />
        <ProblemsSection localePrefix={localePrefix} copy={copy} />
        <CTASection
          localePrefix={localePrefix}
          copy={copy}
          trialCtaLabel={trialCtaLabel}
          trialCheckoutUrl={trialCheckoutUrl}
        />

        {/* Related Articles */}
        <section className="py-16">
          <Container>
            <RelatedContent currentUrl="/learn/cat-litter-guide" />
          </Container>
        </section>
      </main>
    </>
  );
}
