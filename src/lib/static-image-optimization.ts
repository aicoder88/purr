import { getImageMetadata, type ImageMetadata } from '@/lib/image-utils';

type OptimizedStaticImageOptions = {
  preferredWidth?: number;
};

export type OptimizedStaticImageData = {
  src: string;
  blurDataURL?: string;
};

const RESPONSIVE_IMAGE_SUFFIX_REGEX = /-\d+w\.(avif|webp|jpe?g|png)$/i;
const ABSOLUTE_URL_REGEX = /^https?:\/\/[^/]+/i;

function normalizeAssetUrl(url: string): string {
  const withoutOrigin = url.replace(ABSOLUTE_URL_REGEX, '');
  const withoutHash = withoutOrigin.split('#')[0] ?? withoutOrigin;
  const withoutQuery = withoutHash.split('?')[0] ?? withoutHash;

  if (!withoutQuery.startsWith('/')) {
    return `/${withoutQuery}`;
  }

  return withoutQuery;
}

function toImageMetadataKey(url: string): string | null {
  const normalized = normalizeAssetUrl(url);

  if (RESPONSIVE_IMAGE_SUFFIX_REGEX.test(normalized)) {
    return null;
  }

  if (normalized.startsWith('/optimized/')) {
    return `original-images/${normalized.slice('/optimized/'.length)}`;
  }

  return null;
}

function parseResponsiveWidth(imagePath: string): number | null {
  const match = imagePath.match(/-(\d+)w\./);
  return match ? Number(match[1]) : null;
}

function getPreferredFormats(imageUrl: string): Array<'avif' | 'webp' | 'jpg'> {
  const normalized = normalizeAssetUrl(imageUrl).toLowerCase();

  if (normalized.endsWith('.webp')) {
    return ['webp', 'avif', 'jpg'];
  }

  if (normalized.endsWith('.avif')) {
    return ['avif', 'webp', 'jpg'];
  }

  return ['avif', 'webp', 'jpg'];
}

function pickBestResponsiveVariant(
  metadata: ImageMetadata,
  imageUrl: string,
  preferredWidth: number,
): string | null {
  const preferredFormats = getPreferredFormats(imageUrl);
  const availablePaths = preferredFormats.flatMap((format) => metadata.formats[format] ?? []);

  if (availablePaths.length === 0) {
    return null;
  }

  const sizedPaths = availablePaths
    .map((path) => ({
      path,
      width: parseResponsiveWidth(path),
    }))
    .filter((entry): entry is { path: string; width: number } => entry.width !== null)
    .sort((a, b) => a.width - b.width);

  if (sizedPaths.length === 0) {
    return null;
  }

  const fallbackPath = sizedPaths[sizedPaths.length - 1];
  if (!fallbackPath) {
    return null;
  }

  const targetWidth = sizedPaths.find((entry) => entry.width >= preferredWidth)?.width
    ?? fallbackPath.width;
  const bestMatch = sizedPaths.find((entry) => entry.width === targetWidth);

  if (!bestMatch) {
    return null;
  }

  return `/${bestMatch.path}`;
}

export function getOptimizedStaticImageData(
  imageUrl: string,
  { preferredWidth = 640 }: OptimizedStaticImageOptions = {},
): OptimizedStaticImageData {
  const metadataKey = toImageMetadataKey(imageUrl);
  const normalizedImageUrl = normalizeAssetUrl(imageUrl);

  if (!metadataKey) {
    return { src: normalizedImageUrl };
  }

  const metadata = getImageMetadata(metadataKey);
  if (!metadata) {
    return { src: normalizedImageUrl };
  }

  const optimizedSrc = pickBestResponsiveVariant(metadata, imageUrl, preferredWidth) ?? normalizedImageUrl;

  return {
    src: optimizedSrc,
    blurDataURL: metadata.blurDataURL,
  };
}

export function optimizeStaticImagesInHtml(
  html: string,
  options?: OptimizedStaticImageOptions,
): string {
  return html.replace(/(<img\b[^>]*\bsrc=["'])([^"']+)(["'][^>]*>)/gi, (_match, prefix, src, suffix) => {
    const optimized = getOptimizedStaticImageData(src, options);
    return `${prefix}${optimized.src}${suffix}`;
  });
}
