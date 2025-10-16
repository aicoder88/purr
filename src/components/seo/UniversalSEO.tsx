import { NextSeo } from 'next-seo';
import { useTranslation } from '@/lib/translation-context';
import { SITE_NAME } from '@/lib/constants';
import {
  buildLanguageAlternates,
  getLocalizedUrl,
  normalizeMetaDescription,
  normalizeMetaTitle,
} from '@/lib/seo-utils';

interface UniversalSEOProps {
  pageType?: 'homepage' | 'product' | 'learn' | 'support' | 'about' | 'blog';
  title?: string;
  description?: string;
  canonicalPath: string;
  ogImage?: string;
  structuredData?: object;
  noIndex?: boolean;
}

export const UniversalSEO: React.FC<UniversalSEOProps> = ({
  pageType = 'homepage',
  title,
  description,
  canonicalPath,
  ogImage = 'https://www.purrify.ca/purrify-logo.png',
  structuredData,
  noIndex = false,
}) => {
  const { t, locale } = useTranslation();

  // Build canonical URL - always use www.purrify.ca with locale prefix for non-English
  const canonicalUrl = getLocalizedUrl(canonicalPath, locale);

  // Fallback content based on page type and locale
  const getLocalizedContent = () => {
    const fallbackTitle = `${SITE_NAME} - Premium Activated Carbon Cat Litter Additive`;
    const fallbackDescription = 'Premium activated carbon cat litter additive for superior odor control';

    // Use localized content if available
    const localizedTitle = title || t?.seo?.openGraph?.title || t?.siteDescription || fallbackTitle;
    const localizedDescription = description || t?.seo?.metaDescription || t?.siteDescription || fallbackDescription;
    const localizedKeywords = t?.seo?.keywords || 'cat litter, odor control, activated carbon';

    return {
      title: normalizeMetaTitle(localizedTitle, fallbackTitle),
      description: normalizeMetaDescription(localizedDescription, fallbackDescription),
      keywords: localizedKeywords,
    };
  };

  const { title: normalizedTitle, description: normalizedDescription, keywords } = getLocalizedContent();

  const openGraphTitle = normalizeMetaTitle(title || normalizedTitle, normalizedTitle);
  const openGraphDescription = normalizeMetaDescription(description || normalizedDescription, normalizedDescription);

  return (
    <>
      <NextSeo
        title={normalizedTitle}
        description={normalizedDescription}
        canonical={canonicalUrl}
        noindex={noIndex}
        languageAlternates={buildLanguageAlternates(canonicalPath)}
        openGraph={{
          type: pageType === 'product' ? 'product' : 'website',
          url: canonicalUrl,
          title: openGraphTitle,
          description: openGraphDescription,
          locale: locale === 'fr' ? 'fr_CA' : locale === 'zh' ? 'zh_CN' : 'en_CA',
          siteName: SITE_NAME,
          images: [
            {
              url: ogImage,
              width: 1200,
              height: 630,
              alt: `${SITE_NAME} - ${openGraphDescription}`,
              type: 'image/png',
            },
          ],
        }}
        twitter={{
          handle: '@purrify',
          site: '@purrify',
          cardType: 'summary_large_image',
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: keywords,
          },
          {
            name: 'author',
            content: SITE_NAME,
          },
          {
            name: 'robots',
            content: noIndex ? 'noindex,nofollow' : 'index,follow',
          },
        ]}
      />

      {/* Structured Data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }}
        />
      )}
    </>
  );
};
