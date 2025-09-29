import Head from 'next/head';
import { useTranslation } from '@/lib/translation-context';
import { buildLanguageAlternates, getLocalizedUrl } from '@/lib/seo-utils';

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
  ogImage = "https://www.purrify.ca/purrify-logo-text.png",
  structuredData,
  additionalMeta,
}) => {
  const { t, locale } = useTranslation();
  
  const canonicalUrl = getLocalizedUrl(canonicalPath, locale);
  const languageAlternates = buildLanguageAlternates(canonicalPath);

  const siteTitle = 'Purrify';
  const defaultDescription = 'Premium activated carbon cat litter additive for superior odor control';
  const defaultKeywords = 'cat litter odor control, activated carbon cat litter, natural cat litter additive';

  const finalTitle = title || `${siteTitle} - ${defaultDescription}`;
  const finalDescription = description || t?.siteDescription || defaultDescription;
  const finalKeywords = keywords || t?.seo?.keywords || defaultKeywords;

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
      <meta property="og:title" content={ogTitle || finalTitle} />
      <meta property="og:description" content={ogDescription || finalDescription} />
      <meta property="og:image" content={ogImage} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={ogTitle || finalTitle} />
      <meta property="twitter:description" content={ogDescription || finalDescription} />
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
