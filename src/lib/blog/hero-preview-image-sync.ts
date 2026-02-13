export type BlogImageSyncTarget = {
  content?: string;
  featuredImage?: {
    url?: string;
    alt?: string;
  };
  seo?: {
    ogImage?: string;
  };
};

export type FirstContentImage = {
  src: string;
  alt: string;
  tagStart: number;
  tagEnd: number;
  tagHtml: string;
};

export type BlogImageSyncResult<T extends BlogImageSyncTarget> = {
  post: T;
  changes: Array<
    'first-content-image-src' |
    'first-content-image-alt' |
    'first-content-image-inserted' |
    'seo-og-image'
  >;
  firstContentImage: FirstContentImage | null;
  featuredImageUrl: string;
};

const IMG_TAG_REGEX = /<img\b[^>]*>/i;
const SRC_ATTR_REGEX = /src=(\\?['"])(.*?)\1/i;
const ALT_ATTR_REGEX = /alt=(\\?['"])(.*?)\1/i;

function escapeHtmlAttribute(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function insertFirstContentImage(content: string, imageUrl: string, imageAlt: string): string {
  const escapedAlt = escapeHtmlAttribute(imageAlt);
  const imageFigure = `<figure class="my-8"><img src="${imageUrl}" alt="${escapedAlt}" class="w-full h-auto rounded-xl shadow-lg" loading="lazy" /></figure>`;
  const firstH2CloseIndex = content.search(/<\/h2>/i);

  if (firstH2CloseIndex === -1) {
    return `${imageFigure}${content}`;
  }

  const insertionPoint = firstH2CloseIndex + '</h2>'.length;
  return `${content.slice(0, insertionPoint)}${imageFigure}${content.slice(insertionPoint)}`;
}

export function normalizeImagePath(imagePath: string | undefined | null): string {
  if (!imagePath) {
    return '';
  }

  const trimmed = imagePath.trim();
  if (!trimmed) {
    return '';
  }

  const withoutHash = trimmed.split('#')[0] ?? trimmed;
  const withoutQuery = withoutHash.split('?')[0] ?? withoutHash;

  if (/^https?:\/\//i.test(withoutQuery)) {
    try {
      const url = new URL(withoutQuery);
      return url.pathname;
    } catch {
      return withoutQuery;
    }
  }

  return withoutQuery;
}

export function extractFirstContentImage(content: string | undefined | null): FirstContentImage | null {
  if (!content) {
    return null;
  }

  const tagMatch = IMG_TAG_REGEX.exec(content);
  if (!tagMatch || tagMatch.index === undefined) {
    return null;
  }

  const tagHtml = tagMatch[0];
  const srcMatch = SRC_ATTR_REGEX.exec(tagHtml);
  if (!srcMatch) {
    return null;
  }

  const altMatch = ALT_ATTR_REGEX.exec(tagHtml);

  return {
    src: srcMatch[2] ?? '',
    alt: altMatch?.[2] ?? '',
    tagStart: tagMatch.index,
    tagEnd: tagMatch.index + tagHtml.length,
    tagHtml,
  };
}

export function syncPreviewAndHeroImage<T extends BlogImageSyncTarget>(post: T): BlogImageSyncResult<T> {
  const featuredImageUrl = post.featuredImage?.url?.trim() || '';
  const featuredImageAlt = post.featuredImage?.alt?.trim() || '';
  const firstContentImage = extractFirstContentImage(post.content);
  const changes: BlogImageSyncResult<T>['changes'] = [];

  if (!featuredImageUrl) {
    return { post, changes, firstContentImage, featuredImageUrl };
  }

  let updatedPost = post;

  if (firstContentImage) {
    const firstImageNormalized = normalizeImagePath(firstContentImage.src);
    const featuredImageNormalized = normalizeImagePath(featuredImageUrl);
    let updatedTag = firstContentImage.tagHtml;
    let didUpdateTag = false;

    if (firstImageNormalized !== featuredImageNormalized) {
      updatedTag = updatedTag.replace(SRC_ATTR_REGEX, `src="${featuredImageUrl}"`);
      didUpdateTag = true;
      changes.push('first-content-image-src');
    }

    if (featuredImageAlt && firstContentImage.alt !== featuredImageAlt) {
      if (ALT_ATTR_REGEX.test(updatedTag)) {
        updatedTag = updatedTag.replace(ALT_ATTR_REGEX, `alt="${featuredImageAlt}"`);
      } else {
        updatedTag = updatedTag.replace('<img', `<img alt="${featuredImageAlt}"`);
      }
      didUpdateTag = true;
      changes.push('first-content-image-alt');
    }

    if (didUpdateTag && updatedPost.content) {
      const updatedContent =
        updatedPost.content.slice(0, firstContentImage.tagStart) +
        updatedTag +
        updatedPost.content.slice(firstContentImage.tagEnd);

      updatedPost = {
        ...updatedPost,
        content: updatedContent,
      };
    }
  } else if (updatedPost.content) {
    updatedPost = {
      ...updatedPost,
      content: insertFirstContentImage(updatedPost.content, featuredImageUrl, featuredImageAlt),
    };
    changes.push('first-content-image-inserted');
  }

  if (updatedPost.seo?.ogImage !== featuredImageUrl) {
    updatedPost = {
      ...updatedPost,
      seo: {
        ...(updatedPost.seo ?? {}),
        ogImage: featuredImageUrl,
      },
    };
    changes.push('seo-og-image');
  }

  return {
    post: updatedPost,
    changes,
    firstContentImage: extractFirstContentImage(updatedPost.content),
    featuredImageUrl,
  };
}
