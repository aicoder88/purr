import fs from 'node:fs';

export interface FixTitleBrandingResult {
  changed: boolean;
  before: string;
  after: string;
  mutations: number;
}

const MAX_TITLE_LENGTH = 60;

function dedupeBranding(input: string): string {
  let normalized = input
    .replace(/\|\s*Purrify\s*\|\s*Purrify/gi, '| Purrify')
    .replace(/-\s*Purrify\s*-\s*Purrify/gi, '- Purrify')
    .replace(/Purrify\s*\|\s*Purrify/gi, 'Purrify');

  normalized = normalized.replace(/\s{2,}/g, ' ').trim();
  return normalized;
}

function clampTitle(input: string): string {
  if (input.length <= MAX_TITLE_LENGTH) {
    return input;
  }

  const trimmed = input.slice(0, MAX_TITLE_LENGTH - 1).trimEnd();
  return trimmed.endsWith('...') ? trimmed : `${trimmed}...`;
}

export function fixTitleBrandingInContent(content: string): FixTitleBrandingResult {
  let mutations = 0;

  const next = content.replace(
    /(title\s*:\s*)(['"])([^'"\n]+)(\2)/g,
    (_match, prefix: string, quote: string, value: string, endQuote: string) => {
      const deduped = dedupeBranding(value);
      const clamped = clampTitle(deduped);
      if (clamped !== value) {
        mutations += 1;
      }
      return `${prefix}${quote}${clamped}${endQuote}`;
    }
  );

  return {
    changed: next !== content,
    before: content,
    after: next,
    mutations,
  };
}

export function applyTitleBrandingFix(filePath: string): { changed: boolean; mutations: number } {
  const current = fs.readFileSync(filePath, 'utf-8');
  const result = fixTitleBrandingInContent(current);

  if (!result.changed) {
    return { changed: false, mutations: 0 };
  }

  fs.writeFileSync(filePath, result.after, 'utf-8');
  return { changed: true, mutations: result.mutations };
}
