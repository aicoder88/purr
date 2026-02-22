import fs from 'node:fs';

export interface FixMetadataUrlsResult {
  changed: boolean;
  before: string;
  after: string;
  mutations: number;
}

const BINARY_EXTENSIONS = /\.(?:png|jpg|jpeg|webp|avif|gif|svg|ico|xml|txt|json|js|css|pdf)$/i;

function ensureTrailingSlash(url: string): string {
  const [noHash, hash = ''] = url.split('#');
  const [base, query = ''] = noHash.split('?');

  if (!base || base === 'https://www.purrify.ca') {
    return `https://www.purrify.ca/${query ? `?${query}` : ''}${hash ? `#${hash}` : ''}`;
  }

  if (base.endsWith('/')) {
    return `${base}${query ? `?${query}` : ''}${hash ? `#${hash}` : ''}`;
  }

  if (BINARY_EXTENSIONS.test(base)) {
    return `${base}${query ? `?${query}` : ''}${hash ? `#${hash}` : ''}`;
  }

  return `${base}/${query ? `?${query}` : ''}${hash ? `#${hash}` : ''}`;
}

export function fixMetadataUrlsInContent(content: string): FixMetadataUrlsResult {
  let mutations = 0;

  const next = content.replace(/https:\/\/www\.purrify\.ca(?:\/[A-Za-z0-9\-._~%!$&'()*+,;=:@/]*)?(?:\?[A-Za-z0-9\-._~%!$&'()*+,;=:@/?]*)?(?:#[A-Za-z0-9\-._~%!$&'()*+,;=:@/?]*)?/g, (raw) => {
    const normalized = ensureTrailingSlash(raw);
    if (normalized !== raw) {
      mutations += 1;
    }
    return normalized;
  });

  return {
    changed: next !== content,
    before: content,
    after: next,
    mutations,
  };
}

export function applyMetadataUrlFix(filePath: string): { changed: boolean; mutations: number } {
  const current = fs.readFileSync(filePath, 'utf-8');
  const result = fixMetadataUrlsInContent(current);

  if (!result.changed) {
    return { changed: false, mutations: 0 };
  }

  fs.writeFileSync(filePath, result.after, 'utf-8');
  return { changed: true, mutations: result.mutations };
}
