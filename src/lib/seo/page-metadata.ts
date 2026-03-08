import type { Metadata } from 'next';
import { SITE_NAME, SITE_URL } from '@/lib/constants';

export const DEFAULT_SOCIAL_IMAGE = `${SITE_URL}/optimized/blog/happy-cat-home-1200w.jpg`;

type OpenGraphType = 'website' | 'article' | 'profile';

interface BuildPageMetadataOptions {
  title: string;
  description: string;
  path?: string;
  canonicalUrl?: string;
  alternates?: Metadata['alternates'];
  image?: string;
  imageAlt?: string;
  keywords?: Metadata['keywords'];
  robots?: Metadata['robots'];
  lastModified?: string;
  openGraphType?: OpenGraphType;
  openGraphLocale?: string;
  openGraphTitle?: string;
  openGraphDescription?: string;
  twitterTitle?: string;
  twitterDescription?: string;
}

function toAbsoluteUrl(pathOrUrl?: string) {
  if (!pathOrUrl) {
    return undefined;
  }

  if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) {
    return pathOrUrl;
  }

  return `${SITE_URL}${pathOrUrl}`;
}

export function buildPageMetadata({
  title,
  description,
  path,
  canonicalUrl,
  alternates,
  image = DEFAULT_SOCIAL_IMAGE,
  imageAlt = title,
  keywords,
  robots,
  lastModified,
  openGraphType = 'website',
  openGraphLocale,
  openGraphTitle,
  openGraphDescription,
  twitterTitle,
  twitterDescription,
}: BuildPageMetadataOptions): Metadata {
  const canonical = toAbsoluteUrl(canonicalUrl ?? path);

  return {
    title,
    description,
    ...(keywords ? { keywords } : {}),
    ...(alternates
      ? { alternates }
      : canonical
        ? {
          alternates: {
            canonical,
          },
        }
        : {}),
    openGraph: {
      type: openGraphType,
      ...(canonical ? { url: canonical } : {}),
      siteName: SITE_NAME,
      title: openGraphTitle ?? title,
      description: openGraphDescription ?? description,
      ...(openGraphLocale ? { locale: openGraphLocale } : {}),
      images: [
        {
          url: image,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@purrifyhq',
      creator: '@purrifyhq',
      title: twitterTitle ?? openGraphTitle ?? title,
      description: twitterDescription ?? openGraphDescription ?? description,
      images: [image],
    },
    ...(robots ? { robots } : {}),
    ...(lastModified
      ? {
        other: {
          'last-modified': lastModified,
        },
      }
      : {}),
  };
}
