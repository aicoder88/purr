import Head from 'next/head';
import { useTranslation } from '@/lib/translation-context';
import {
  buildLanguageAlternates,
  getLocalizedUrl,
  normalizeMetaDescription,
  normalizeMetaTitle,
} from '@/lib/seo-utils';

interface LocalizedMetaProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalPath: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  structuredData?: object;
  additionalMeta?: React.ReactNode;
}

export const LocalizedMeta: React.FC<LocalizedMetaProps> = ({
  title,
  description,
  keywords,
  canonicalPath,
  ogTitle,
  ogDescription,
  ogImage = "https://www.purrify.ca/logo-light.png",
  structuredData,
  additionalMeta,
}) => {
  const { t, locale } = useTranslation();

  const canonicalUrl = getLocalizedUrl(canonicalPath, locale);
  const languageAlternates = buildLanguageAlternates(canonicalPath);

  const siteTitle = 'Purrify';
  const defaultDescription = 'Premium activated carbon cat litter additive for superior odor control';
  const defaultKeywords = 'cat litter odor control, activated carbon cat litter, natural cat litter additive';

  const titleSource = title || `${siteTitle} - ${defaultDescription}`;
  const descriptionSource = description || t?.seo?.metaDescription || t?.siteDescription || defaultDescription;

  const finalTitle = normalizeMetaTitle(titleSource, `${siteTitle} - ${defaultDescription}`);
  const finalDescription = normalizeMetaDescription(descriptionSource, defaultDescription);
  const finalKeywords = keywords || t?.seo?.keywords || defaultKeywords;
  const finalOgTitle = normalizeMetaTitle(ogTitle || finalTitle, finalTitle);
  const finalOgDescription = normalizeMetaDescription(ogDescription || finalDescription, finalDescription);

  return (
    <Head>
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Language alternates */}
      {languageAlternates.map(({ hrefLang, href }) => (
        <link key={hrefLang} rel="alternate" hrefLang={hrefLang} href={href} />
      ))}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={finalOgTitle} />
      <meta property="og:description" content={finalOgDescription} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={finalOgTitle} />
      <meta property="twitter:description" content={finalOgDescription} />
      <meta property="twitter:image" content={ogImage} />

      {/* Structured Data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }}
        />
      )}

      {additionalMeta}
    </Head>
  );
};
