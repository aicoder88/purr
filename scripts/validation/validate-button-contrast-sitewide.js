#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('@playwright/test');

const DEFAULT_BASE_URL = 'https://www.purrify.ca';
const DEFAULT_TIMEOUT_MS = 30000;
const DEFAULT_MIN_CONTRAST = 4.5;
const DEFAULT_HYDRATION_WAIT_MS = 3000;
const DEFAULT_THEME_STORAGE_KEY = 'purrify-ui-theme';
const DEFAULT_RENDER_SETTLE_ITERATIONS = 3;
const DEFAULT_RENDER_SETTLE_CHECK_MS = 200;
const DEFAULT_TARGETS = 'buttons';
const SUPPORTED_INTERACTION_STATES = ['rest', 'hover'];
const DEFAULT_INTERACTION_STATES = ['rest', 'hover'];

function parseArgs(argv) {
  const args = {
    baseUrl: DEFAULT_BASE_URL,
    sitemapUrl: '',
    timeoutMs: DEFAULT_TIMEOUT_MS,
    minContrast: DEFAULT_MIN_CONTRAST,
    hydrationWaitMs: DEFAULT_HYDRATION_WAIT_MS,
    themeStorageKey: DEFAULT_THEME_STORAGE_KEY,
    renderSettleIterations: DEFAULT_RENDER_SETTLE_ITERATIONS,
    targets: DEFAULT_TARGETS,
    interactionStates: [...DEFAULT_INTERACTION_STATES],
    limit: null,
    includePathPrefixes: [],
    excludePathPrefixes: [],
    outputPath: '',
    showHelp: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === '--help' || arg === '-h') {
      args.showHelp = true;
    } else if (arg === '--base-url' && argv[index + 1]) {
      args.baseUrl = argv[index + 1];
      index += 1;
    } else if (arg.startsWith('--base-url=')) {
      args.baseUrl = arg.slice('--base-url='.length);
    } else if (arg === '--sitemap' && argv[index + 1]) {
      args.sitemapUrl = argv[index + 1];
      index += 1;
    } else if (arg.startsWith('--sitemap=')) {
      args.sitemapUrl = arg.slice('--sitemap='.length);
    } else if (arg === '--timeout' && argv[index + 1]) {
      const timeoutMs = Number.parseInt(argv[index + 1], 10);
      if (Number.isFinite(timeoutMs) && timeoutMs > 0) {
        args.timeoutMs = timeoutMs;
      }
      index += 1;
    } else if (arg.startsWith('--timeout=')) {
      const timeoutMs = Number.parseInt(arg.slice('--timeout='.length), 10);
      if (Number.isFinite(timeoutMs) && timeoutMs > 0) {
        args.timeoutMs = timeoutMs;
      }
    } else if (arg === '--min-contrast' && argv[index + 1]) {
      const minContrast = Number.parseFloat(argv[index + 1]);
      if (Number.isFinite(minContrast) && minContrast > 0) {
        args.minContrast = minContrast;
      }
      index += 1;
    } else if (arg.startsWith('--min-contrast=')) {
      const minContrast = Number.parseFloat(arg.slice('--min-contrast='.length));
      if (Number.isFinite(minContrast) && minContrast > 0) {
        args.minContrast = minContrast;
      }
    } else if (arg === '--hydration-wait-ms' && argv[index + 1]) {
      const hydrationWaitMs = Number.parseInt(argv[index + 1], 10);
      if (Number.isFinite(hydrationWaitMs) && hydrationWaitMs >= 0) {
        args.hydrationWaitMs = hydrationWaitMs;
      }
      index += 1;
    } else if (arg.startsWith('--hydration-wait-ms=')) {
      const hydrationWaitMs = Number.parseInt(arg.slice('--hydration-wait-ms='.length), 10);
      if (Number.isFinite(hydrationWaitMs) && hydrationWaitMs >= 0) {
        args.hydrationWaitMs = hydrationWaitMs;
      }
    } else if (arg === '--theme-storage-key' && argv[index + 1]) {
      args.themeStorageKey = argv[index + 1].trim() || DEFAULT_THEME_STORAGE_KEY;
      index += 1;
    } else if (arg.startsWith('--theme-storage-key=')) {
      const value = arg.slice('--theme-storage-key='.length).trim();
      args.themeStorageKey = value || DEFAULT_THEME_STORAGE_KEY;
    } else if (arg === '--render-settle-iterations' && argv[index + 1]) {
      const renderSettleIterations = Number.parseInt(argv[index + 1], 10);
      if (Number.isFinite(renderSettleIterations) && renderSettleIterations > 0) {
        args.renderSettleIterations = renderSettleIterations;
      }
      index += 1;
    } else if (arg.startsWith('--render-settle-iterations=')) {
      const renderSettleIterations = Number.parseInt(arg.slice('--render-settle-iterations='.length), 10);
      if (Number.isFinite(renderSettleIterations) && renderSettleIterations > 0) {
        args.renderSettleIterations = renderSettleIterations;
      }
    } else if (arg === '--targets' && argv[index + 1]) {
      args.targets = argv[index + 1].trim().toLowerCase();
      index += 1;
    } else if (arg.startsWith('--targets=')) {
      args.targets = arg.slice('--targets='.length).trim().toLowerCase();
    } else if (arg === '--interaction-states' && argv[index + 1]) {
      args.interactionStates = argv[index + 1]
        .split(',')
        .map((value) => value.trim().toLowerCase())
        .filter(Boolean);
      index += 1;
    } else if (arg.startsWith('--interaction-states=')) {
      args.interactionStates = arg
        .slice('--interaction-states='.length)
        .split(',')
        .map((value) => value.trim().toLowerCase())
        .filter(Boolean);
    } else if (arg === '--limit' && argv[index + 1]) {
      const limit = Number.parseInt(argv[index + 1], 10);
      if (Number.isFinite(limit) && limit > 0) {
        args.limit = limit;
      }
      index += 1;
    } else if (arg.startsWith('--limit=')) {
      const limit = Number.parseInt(arg.slice('--limit='.length), 10);
      if (Number.isFinite(limit) && limit > 0) {
        args.limit = limit;
      }
    } else if (arg === '--include' && argv[index + 1]) {
      args.includePathPrefixes.push(argv[index + 1]);
      index += 1;
    } else if (arg.startsWith('--include=')) {
      args.includePathPrefixes.push(arg.slice('--include='.length));
    } else if (arg === '--exclude' && argv[index + 1]) {
      args.excludePathPrefixes.push(argv[index + 1]);
      index += 1;
    } else if (arg.startsWith('--exclude=')) {
      args.excludePathPrefixes.push(arg.slice('--exclude='.length));
    } else if (arg === '--output' && argv[index + 1]) {
      args.outputPath = argv[index + 1];
      index += 1;
    } else if (arg.startsWith('--output=')) {
      args.outputPath = arg.slice('--output='.length);
    }
  }

  try {
    const normalizedBase = new URL(args.baseUrl);
    normalizedBase.pathname = normalizedBase.pathname.replace(/\/+$/, '') || '/';
    args.baseUrl = normalizedBase.origin;
  } catch {
    throw new Error(`Invalid --base-url value: ${args.baseUrl}`);
  }

  args.sitemapUrl = args.sitemapUrl || `${args.baseUrl}/sitemap.xml`;
  if (!['buttons', 'all'].includes(args.targets)) {
    throw new Error(`Invalid --targets value: ${args.targets}. Expected "buttons" or "all".`);
  }
  if (args.interactionStates.length === 0) {
    throw new Error('Invalid --interaction-states value: expected one or more of rest,hover');
  }
  const invalidStates = args.interactionStates.filter((state) => !SUPPORTED_INTERACTION_STATES.includes(state));
  if (invalidStates.length > 0) {
    throw new Error(
      `Invalid --interaction-states values: ${invalidStates.join(', ')}. Expected values: ${SUPPORTED_INTERACTION_STATES.join(', ')}`
    );
  }

  return args;
}

function printHelp() {
  console.log('Site-wide button contrast validator');
  console.log('');
  console.log('Usage:');
  console.log('  node scripts/validation/validate-button-contrast-sitewide.js');
  console.log('  node scripts/validation/validate-button-contrast-sitewide.js --base-url https://www.purrify.ca --limit 100');
  console.log('');
  console.log('Options:');
  console.log('  --base-url <url>       Site origin to validate (default: https://www.purrify.ca)');
  console.log('  --sitemap <url>        Sitemap XML URL (default: <base-url>/sitemap.xml)');
  console.log('  --min-contrast <n>     Minimum contrast ratio for normal text (default: 4.5)');
  console.log('  --timeout <ms>         Request timeout in milliseconds (default: 30000)');
  console.log('  --hydration-wait-ms    Wait after navigation before scanning (default: 3000)');
  console.log('  --theme-storage-key    localStorage key for theme state (default: purrify-ui-theme)');
  console.log('  --render-settle-iterations <n>  Stable render loops before scan (default: 3)');
  console.log('  --targets <buttons|all> Scan button-like only or broader UI targets (default: buttons)');
  console.log('  --interaction-states <rest,hover> Comma-separated interaction states to audit (default: rest,hover)');
  console.log('  --limit <n>            Maximum number of URLs to scan');
  console.log('  --include <prefix>     Include only paths starting with prefix (repeatable)');
  console.log('  --exclude <prefix>     Exclude paths starting with prefix (repeatable)');
  console.log('  --output <path>        Write JSON report to a file');
}

function decodeXml(value) {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&quot;', '"')
    .replaceAll('&apos;', "'");
}

function extractLocUrlsFromSitemapXml(xml) {
  const urls = [];
  const regex = /<loc>([\s\S]*?)<\/loc>/gi;
  let match = regex.exec(xml);

  while (match) {
    const value = decodeXml(match[1].trim());
    if (value) {
      urls.push(value);
    }
    match = regex.exec(xml);
  }

  return urls;
}

async function fetchText(url, timeoutMs) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      signal: controller.signal,
      headers: {
        'User-Agent': 'PurrifyContrastAudit/1.0',
        Accept: 'application/xml,text/xml,text/html;q=0.9,*/*;q=0.8',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status} ${response.statusText}`);
    }

    return await response.text();
  } finally {
    clearTimeout(timeoutId);
  }
}

async function loadUrlsFromSitemap(sitemapUrl, timeoutMs) {
  const visitedSitemaps = new Set();
  const urls = new Set();

  async function walk(currentSitemapUrl) {
    if (visitedSitemaps.has(currentSitemapUrl)) {
      return;
    }
    visitedSitemaps.add(currentSitemapUrl);

    const xml = await fetchText(currentSitemapUrl, timeoutMs);
    const locs = extractLocUrlsFromSitemapXml(xml);

    if (/<sitemapindex[\s>]/i.test(xml)) {
      for (const childSitemap of locs) {
        await walk(childSitemap);
      }
      return;
    }

    if (/<urlset[\s>]/i.test(xml)) {
      for (const pageUrl of locs) {
        urls.add(pageUrl);
      }
    }
  }

  await walk(sitemapUrl);
  return Array.from(urls);
}

function normalizeUrl(url) {
  const parsed = new URL(url);
  parsed.hash = '';
  if (parsed.pathname.length > 1) {
    parsed.pathname = parsed.pathname.replace(/\/+$/, '');
  }
  return parsed.toString();
}

function toPathPrefix(prefix) {
  if (!prefix) {
    return '/';
  }
  return prefix.startsWith('/') ? prefix : `/${prefix}`;
}

function filterCustomerFacingUrls(urls, options) {
  const defaultExcludedPrefixes = ['/api', '/_next', '/admin'];
  const includePrefixes = options.includePathPrefixes.map(toPathPrefix);
  const excludePrefixes = [...defaultExcludedPrefixes, ...options.excludePathPrefixes.map(toPathPrefix)];
  const seen = new Set();
  const filtered = [];

  for (const rawUrl of urls) {
    let parsed;
    try {
      parsed = new URL(rawUrl);
    } catch {
      continue;
    }

    if (parsed.origin !== options.baseUrl) {
      continue;
    }

    const normalized = normalizeUrl(parsed.toString());
    if (seen.has(normalized)) {
      continue;
    }

    const pathname = parsed.pathname || '/';
    const excluded = excludePrefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
    if (excluded) {
      continue;
    }

    if (includePrefixes.length > 0) {
      const included = includePrefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
      if (!included) {
        continue;
      }
    }

    seen.add(normalized);
    filtered.push(normalized);
  }

  filtered.sort((a, b) => a.localeCompare(b));

  if (options.limit && filtered.length > options.limit) {
    return filtered.slice(0, options.limit);
  }

  return filtered;
}

async function setThemeClass(page, theme, themeStorageKey) {
  await page.evaluate(({ requestedTheme, storageKey }) => {
    const shouldUseDark = requestedTheme === 'dark';
    document.documentElement.classList.toggle('dark', shouldUseDark);
    document.documentElement.dataset.theme = requestedTheme;
    if (document.body) {
      document.body.classList.toggle('dark', shouldUseDark);
      document.body.dataset.theme = requestedTheme;
    }

    try {
      window.localStorage.setItem(storageKey, requestedTheme);
    } catch {
      // Ignore storage access failures.
    }

    window.dispatchEvent(new Event('themechange'));
  }, { requestedTheme: theme, storageKey: themeStorageKey });
}

async function readRenderCandidateMetrics(page, targets) {
  return page.evaluate((targetMode) => {
    function isVisible(element) {
      if (!(element instanceof HTMLElement)) {
        return false;
      }
      const styles = getComputedStyle(element);
      if (styles.display === 'none' || styles.visibility === 'hidden' || Number.parseFloat(styles.opacity) <= 0.01) {
        return false;
      }
      const rect = element.getBoundingClientRect();
      return rect.width > 4 && rect.height > 4;
    }

    function looksLikeButtonAnchor(anchor) {
      const styles = getComputedStyle(anchor);
      const className = (anchor.getAttribute('class') || '').toLowerCase();
      const horizontalPadding = Number.parseFloat(styles.paddingLeft) + Number.parseFloat(styles.paddingRight);
      const verticalPadding = Number.parseFloat(styles.paddingTop) + Number.parseFloat(styles.paddingBottom);
      const hasBorder = Number.parseFloat(styles.borderTopWidth) > 0.5;
      const hasBackground = styles.backgroundColor !== 'rgba(0, 0, 0, 0)' || styles.backgroundImage !== 'none';
      const hasButtonClass = /btn|button|rounded|inline-flex|font-bold|px-|py-|border|bg-/.test(className);
      const hasButtonShape = horizontalPadding >= 16 || verticalPadding >= 8;
      return hasButtonClass || hasBackground || (hasBorder && hasButtonShape);
    }

    function collectCandidates() {
      const root = document.querySelector('main') || document.body;
      const selector = targetMode === 'all'
        ? 'button, [role="button"], a, span, p, li, div, h1, h2, h3, h4, h5, h6'
        : 'button, [role="button"], a';
      const nodes = Array.from(root.querySelectorAll(selector));
      const candidates = [];

      for (const node of nodes) {
        if (!(node instanceof HTMLElement)) {
          continue;
        }
        if (!isVisible(node)) {
          continue;
        }
        if (node.closest('[aria-hidden="true"]')) {
          continue;
        }

        const tagName = node.tagName.toLowerCase();
        if (targetMode === 'buttons') {
          if (tagName === 'a' && !looksLikeButtonAnchor(node)) {
            continue;
          }
          if (tagName !== 'button' && node.getAttribute('role') !== 'button' && tagName !== 'a') {
            continue;
          }
        } else {
          const styles = getComputedStyle(node);
          const hasBackground = styles.backgroundColor !== 'rgba(0, 0, 0, 0)' || styles.backgroundImage !== 'none';
          const hasBorder = Number.parseFloat(styles.borderTopWidth) > 0.5;
          const text = (node.innerText || node.textContent || '').replace(/\s+/g, ' ').trim();
          if (!text) {
            continue;
          }
          if (!hasBackground && !hasBorder && tagName !== 'button' && node.getAttribute('role') !== 'button') {
            continue;
          }
        }

        candidates.push(node);
      }

      return candidates;
    }

    const root = document.querySelector('main') || document.body;
    const rootRect = root?.getBoundingClientRect();
    const hasNonZeroLayout = Boolean(rootRect && rootRect.width > 0 && rootRect.height > 0);

    return {
      candidateCount: collectCandidates().length,
      hasNonZeroLayout,
    };
  }, targets);
}

async function waitForRenderSettle(page, targets, requiredStableIterations) {
  const maxLoops = Math.max(20, requiredStableIterations * 10);
  let previousCount = null;
  let stableIterations = 0;
  let latestMetrics = { candidateCount: 0, hasNonZeroLayout: false };

  for (let loop = 0; loop < maxLoops; loop += 1) {
    latestMetrics = await readRenderCandidateMetrics(page, targets);
    const sameCount = previousCount !== null && latestMetrics.candidateCount === previousCount;
    const isStable = sameCount && latestMetrics.hasNonZeroLayout;

    if (isStable) {
      stableIterations += 1;
      if (stableIterations >= requiredStableIterations) {
        return latestMetrics;
      }
    } else {
      stableIterations = 0;
    }

    previousCount = latestMetrics.candidateCount;
    await page.waitForTimeout(DEFAULT_RENDER_SETTLE_CHECK_MS);
  }

  return latestMetrics;
}

async function collectHoverCandidateIds(page, targets) {
  return page.evaluate((targetMode) => {
    function isVisible(element) {
      if (!(element instanceof HTMLElement)) {
        return false;
      }

      const styles = getComputedStyle(element);
      if (styles.display === 'none' || styles.visibility === 'hidden' || Number.parseFloat(styles.opacity) <= 0.01) {
        return false;
      }

      const rect = element.getBoundingClientRect();
      return rect.width > 16 && rect.height > 16;
    }

    function looksLikeButtonAnchor(anchor) {
      const styles = getComputedStyle(anchor);
      const className = (anchor.getAttribute('class') || '').toLowerCase();
      const horizontalPadding = Number.parseFloat(styles.paddingLeft) + Number.parseFloat(styles.paddingRight);
      const verticalPadding = Number.parseFloat(styles.paddingTop) + Number.parseFloat(styles.paddingBottom);
      const hasBorder = Number.parseFloat(styles.borderTopWidth) > 0.5;
      const hasBackground = styles.backgroundColor !== 'rgba(0, 0, 0, 0)' || styles.backgroundImage !== 'none';
      const hasButtonClass = /btn|button|rounded|inline-flex|font-bold|px-|py-|border|bg-/.test(className);
      const hasButtonShape = horizontalPadding >= 16 || verticalPadding >= 8;
      return hasButtonClass || hasBackground || (hasBorder && hasButtonShape);
    }

    function looksLikeGeneralContrastTarget(element) {
      const styles = getComputedStyle(element);
      const hasBackground = styles.backgroundColor !== 'rgba(0, 0, 0, 0)' || styles.backgroundImage !== 'none';
      const hasBorder = Number.parseFloat(styles.borderTopWidth) > 0.5;
      const text = (element.innerText || element.textContent || '').replace(/\s+/g, ' ').trim();

      if (!text) {
        return false;
      }

      return hasBackground || hasBorder;
    }

    function collectCandidates() {
      const root = document.querySelector('main') || document.body;
      const selector = targetMode === 'all'
        ? 'button, [role="button"], a, span, p, li, div, h1, h2, h3, h4, h5, h6'
        : 'button, [role="button"], a';
      const allCandidates = Array.from(root.querySelectorAll(selector));
      const filtered = [];

      for (const element of allCandidates) {
        if (!(element instanceof HTMLElement)) {
          continue;
        }
        if (!isVisible(element)) {
          continue;
        }

        const tagName = element.tagName.toLowerCase();
        if (targetMode === 'buttons') {
          if (tagName === 'a' && !looksLikeButtonAnchor(element)) {
            continue;
          }
          if (tagName !== 'button' && element.getAttribute('role') !== 'button' && tagName !== 'a') {
            continue;
          }
        } else if (!looksLikeGeneralContrastTarget(element)) {
          continue;
        }

        if (element.closest('[aria-hidden="true"]')) {
          continue;
        }

        filtered.push(element);
      }

      return filtered;
    }

    const ids = [];
    const candidates = collectCandidates();
    for (let index = 0; index < candidates.length; index += 1) {
      const id = `contrast-hover-${index + 1}`;
      candidates[index].setAttribute('data-contrast-hover-id', id);
      ids.push(id);
    }

    return ids;
  }, targets);
}

async function clearHoverCandidateIds(page) {
  await page.evaluate(() => {
    const marked = document.querySelectorAll('[data-contrast-hover-id]');
    for (const element of marked) {
      element.removeAttribute('data-contrast-hover-id');
    }
  });
}

async function auditHoveredCandidatesOnCurrentPage(page, theme, minContrast, targets) {
  const findings = [];
  const candidateIds = await collectHoverCandidateIds(page, targets);

  try {
    for (const candidateId of candidateIds) {
      const locator = page.locator(`[data-contrast-hover-id="${candidateId}"]`).first();
      const isVisible = await locator.isVisible().catch(() => false);
      if (!isVisible) {
        continue;
      }

      try {
        await locator.scrollIntoViewIfNeeded();
        await locator.hover({ force: true, timeout: 2000 });
      } catch {
        continue;
      }
      await page.waitForTimeout(50);

      const finding = await page.evaluate(({ activeTheme, minContrastRatio, currentCandidateId }) => {
        function createColorParser() {
          const canvas = document.createElement('canvas');
          return canvas.getContext('2d');
        }

        const colorContext = createColorParser();

        function parseHexColor(normalizedColor) {
          const hex = normalizedColor.slice(1);
          if (![3, 4, 6, 8].includes(hex.length)) {
            return null;
          }

          const expandHex = (value) => (value.length === 1 ? `${value}${value}` : value);

          if (hex.length === 3 || hex.length === 4) {
            const r = Number.parseInt(expandHex(hex[0]), 16);
            const g = Number.parseInt(expandHex(hex[1]), 16);
            const b = Number.parseInt(expandHex(hex[2]), 16);
            const a = hex.length === 4 ? Number.parseInt(expandHex(hex[3]), 16) / 255 : 1;
            return { r, g, b, a };
          }

          const r = Number.parseInt(hex.slice(0, 2), 16);
          const g = Number.parseInt(hex.slice(2, 4), 16);
          const b = Number.parseInt(hex.slice(4, 6), 16);
          const a = hex.length === 8 ? Number.parseInt(hex.slice(6, 8), 16) / 255 : 1;
          return { r, g, b, a };
        }

        function parseRgbColor(normalizedColor) {
          const match = normalizedColor.match(/^rgba?\(([^)]+)\)$/i);
          if (!match) {
            return null;
          }
          const values = match[1].split(',').map((part) => part.trim());
          if (values.length < 3) {
            return null;
          }
          const r = Number.parseFloat(values[0]);
          const g = Number.parseFloat(values[1]);
          const b = Number.parseFloat(values[2]);
          const a = values.length > 3 ? Number.parseFloat(values[3]) : 1;
          if (![r, g, b, a].every((value) => Number.isFinite(value))) {
            return null;
          }
          return { r, g, b, a };
        }

        function parseColor(value) {
          if (!value || !colorContext) {
            return null;
          }

          const trimmed = value.trim();
          if (!trimmed) {
            return null;
          }

          if (trimmed === 'transparent') {
            return { r: 0, g: 0, b: 0, a: 0 };
          }

          let normalizedColor = trimmed;
          try {
            colorContext.fillStyle = '#000';
            colorContext.fillStyle = trimmed;
            normalizedColor = colorContext.fillStyle;
          } catch {
            return null;
          }

          if (normalizedColor.startsWith('#')) {
            return parseHexColor(normalizedColor.toLowerCase());
          }

          if (normalizedColor.startsWith('rgb')) {
            return parseRgbColor(normalizedColor);
          }

          return null;
        }

        function blendOver(foreground, background) {
          const foregroundAlpha = Math.min(Math.max(foreground.a, 0), 1);
          const backgroundAlpha = Math.min(Math.max(background.a, 0), 1);
          const outputAlpha = foregroundAlpha + backgroundAlpha * (1 - foregroundAlpha);

          if (outputAlpha <= 0) {
            return { r: 0, g: 0, b: 0, a: 0 };
          }

          return {
            r: (foreground.r * foregroundAlpha + background.r * backgroundAlpha * (1 - foregroundAlpha)) / outputAlpha,
            g: (foreground.g * foregroundAlpha + background.g * backgroundAlpha * (1 - foregroundAlpha)) / outputAlpha,
            b: (foreground.b * foregroundAlpha + background.b * backgroundAlpha * (1 - foregroundAlpha)) / outputAlpha,
            a: outputAlpha,
          };
        }

        function toOpaque(color) {
          if (color.a >= 1) {
            return color;
          }
          return blendOver(color, { r: 255, g: 255, b: 255, a: 1 });
        }

        function channelToLinear(value) {
          const normalized = value / 255;
          if (normalized <= 0.03928) {
            return normalized / 12.92;
          }
          return ((normalized + 0.055) / 1.055) ** 2.4;
        }

        function luminance(color) {
          const red = channelToLinear(color.r);
          const green = channelToLinear(color.g);
          const blue = channelToLinear(color.b);
          return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
        }

        function contrastRatio(colorA, colorB) {
          const lumA = luminance(colorA);
          const lumB = luminance(colorB);
          const lighter = Math.max(lumA, lumB);
          const darker = Math.min(lumA, lumB);
          return (lighter + 0.05) / (darker + 0.05);
        }

        function parseGradientColor(backgroundImageValue) {
          if (!backgroundImageValue || backgroundImageValue === 'none') {
            return null;
          }

          const colorMatches = backgroundImageValue.match(/rgba?\([^)]+\)|hsla?\([^)]+\)|#[0-9a-fA-F]{3,8}/g);
          if (!colorMatches || colorMatches.length === 0) {
            return null;
          }

          const first = parseColor(colorMatches[0]);
          const last = parseColor(colorMatches[colorMatches.length - 1]);

          if (!first && !last) {
            return null;
          }
          if (!last) {
            return first;
          }
          if (!first) {
            return last;
          }

          return {
            r: (first.r + last.r) / 2,
            g: (first.g + last.g) / 2,
            b: (first.b + last.b) / 2,
            a: (first.a + last.a) / 2,
          };
        }

        function resolveBackground(element) {
          let current = element;

          while (current) {
            const styles = getComputedStyle(current);

            if (styles.backgroundImage && styles.backgroundImage !== 'none') {
              const gradientColor = parseGradientColor(styles.backgroundImage);
              if (gradientColor) {
                return {
                  color: gradientColor,
                  source: 'gradient',
                  sourceTag: current.tagName.toLowerCase(),
                };
              }
            }

            const backgroundColor = parseColor(styles.backgroundColor);
            if (backgroundColor && backgroundColor.a > 0.01) {
              return {
                color: backgroundColor,
                source: 'background-color',
                sourceTag: current.tagName.toLowerCase(),
              };
            }

            current = current.parentElement;
          }

          return {
            color: { r: 255, g: 255, b: 255, a: 1 },
            source: 'fallback',
            sourceTag: 'document',
          };
        }

        function selectorFor(element) {
          if (element.id) {
            return `#${element.id}`;
          }

          const parts = [];
          let current = element;
          let depth = 0;

          while (current && current.nodeType === Node.ELEMENT_NODE && depth < 5) {
            let part = current.tagName.toLowerCase();
            const classList = Array.from(current.classList)
              .filter((token) => /^[a-zA-Z0-9_-]+$/.test(token))
              .slice(0, 2);
            if (classList.length > 0) {
              part += `.${classList.join('.')}`;
            }

            if (current.parentElement) {
              const sameTagSiblings = Array.from(current.parentElement.children).filter(
                (sibling) => sibling.tagName === current.tagName
              );
              if (sameTagSiblings.length > 1) {
                const index = sameTagSiblings.indexOf(current);
                if (index >= 0) {
                  part += `:nth-of-type(${index + 1})`;
                }
              }
            }

            parts.unshift(part);
            if (current.tagName.toLowerCase() === 'main') {
              break;
            }
            current = current.parentElement;
            depth += 1;
          }

          return parts.join(' > ');
        }

        function getAccessibleName(element) {
          const ariaLabel = element.getAttribute('aria-label');
          if (ariaLabel && ariaLabel.trim()) {
            return ariaLabel.trim();
          }

          const textContent = (element.innerText || element.textContent || '').replace(/\s+/g, ' ').trim();
          if (textContent) {
            return textContent;
          }

          const title = element.getAttribute('title');
          if (title && title.trim()) {
            return title.trim();
          }

          return '';
        }

        function formatColor(color) {
          return `rgba(${Math.round(color.r)}, ${Math.round(color.g)}, ${Math.round(color.b)}, ${color.a.toFixed(3)})`;
        }

        function normalizeText(value) {
          return value
            .replace(/\s+/g, ' ')
            .trim()
            .toLowerCase()
            .slice(0, 120);
        }

        const candidate = document.querySelector(`[data-contrast-hover-id="${currentCandidateId}"]`);
        if (!(candidate instanceof HTMLElement)) {
          return null;
        }

        const accessibleName = getAccessibleName(candidate);
        if (!accessibleName) {
          return null;
        }

        const styles = getComputedStyle(candidate);
        const foregroundRaw = parseColor(styles.color);
        if (!foregroundRaw) {
          return null;
        }

        const backgroundResolved = resolveBackground(candidate);
        if (!backgroundResolved || !backgroundResolved.color) {
          return null;
        }

        const backgroundOpaque = toOpaque(backgroundResolved.color);
        const foregroundOpaque = foregroundRaw.a >= 1 ? foregroundRaw : blendOver(foregroundRaw, backgroundOpaque);
        const ratio = contrastRatio(foregroundOpaque, backgroundOpaque);

        const fontSize = Number.parseFloat(styles.fontSize);
        const fontWeight = Number.parseInt(styles.fontWeight, 10);
        const isLargeText = fontSize >= 24 || (fontSize >= 18.66 && fontWeight >= 700);
        const requiredContrast = isLargeText ? 3 : minContrastRatio;

        if (ratio >= requiredContrast) {
          return null;
        }

        return {
          state: 'hover',
          theme: activeTheme,
          element: candidate.tagName.toLowerCase(),
          text: accessibleName.slice(0, 120),
          normalizedText: normalizeText(accessibleName),
          selector: selectorFor(candidate),
          className: candidate.getAttribute('class') || '',
          href: candidate.tagName.toLowerCase() === 'a' ? candidate.getAttribute('href') || '' : '',
          ratio: Number(ratio.toFixed(2)),
          required: Number(requiredContrast.toFixed(2)),
          contrastRatio: Number(ratio.toFixed(2)),
          requiredContrast,
          foreground: formatColor(foregroundOpaque),
          background: formatColor(backgroundOpaque),
          backgroundSource: `${backgroundResolved.source}:${backgroundResolved.sourceTag}`,
          fontSize: Number.isFinite(fontSize) ? Number(fontSize.toFixed(2)) : null,
          fontWeight: Number.isFinite(fontWeight) ? fontWeight : null,
        };
      }, { activeTheme: theme, minContrastRatio: minContrast, currentCandidateId: candidateId });

      if (finding) {
        findings.push(finding);
      }
    }
  } finally {
    await page.mouse.move(0, 0).catch(() => {});
    await clearHoverCandidateIds(page);
  }

  return findings;
}

async function auditButtonsOnCurrentPage(page, theme, minContrast, targets) {
  return page.evaluate(({ activeTheme, minContrastRatio, targetMode }) => {
    function createColorParser() {
      const canvas = document.createElement('canvas');
      return canvas.getContext('2d');
    }

    const colorContext = createColorParser();

    function parseHexColor(normalizedColor) {
      const hex = normalizedColor.slice(1);
      if (![3, 4, 6, 8].includes(hex.length)) {
        return null;
      }

      const expandHex = (value) => (value.length === 1 ? `${value}${value}` : value);

      if (hex.length === 3 || hex.length === 4) {
        const r = Number.parseInt(expandHex(hex[0]), 16);
        const g = Number.parseInt(expandHex(hex[1]), 16);
        const b = Number.parseInt(expandHex(hex[2]), 16);
        const a = hex.length === 4 ? Number.parseInt(expandHex(hex[3]), 16) / 255 : 1;
        return { r, g, b, a };
      }

      const r = Number.parseInt(hex.slice(0, 2), 16);
      const g = Number.parseInt(hex.slice(2, 4), 16);
      const b = Number.parseInt(hex.slice(4, 6), 16);
      const a = hex.length === 8 ? Number.parseInt(hex.slice(6, 8), 16) / 255 : 1;
      return { r, g, b, a };
    }

    function parseRgbColor(normalizedColor) {
      const match = normalizedColor.match(/^rgba?\(([^)]+)\)$/i);
      if (!match) {
        return null;
      }
      const values = match[1].split(',').map((part) => part.trim());
      if (values.length < 3) {
        return null;
      }
      const r = Number.parseFloat(values[0]);
      const g = Number.parseFloat(values[1]);
      const b = Number.parseFloat(values[2]);
      const a = values.length > 3 ? Number.parseFloat(values[3]) : 1;
      if (![r, g, b, a].every((value) => Number.isFinite(value))) {
        return null;
      }
      return { r, g, b, a };
    }

    function parseColor(value) {
      if (!value || !colorContext) {
        return null;
      }

      const trimmed = value.trim();
      if (!trimmed) {
        return null;
      }

      if (trimmed === 'transparent') {
        return { r: 0, g: 0, b: 0, a: 0 };
      }

      let normalizedColor = trimmed;
      try {
        colorContext.fillStyle = '#000';
        colorContext.fillStyle = trimmed;
        normalizedColor = colorContext.fillStyle;
      } catch {
        return null;
      }

      if (normalizedColor.startsWith('#')) {
        return parseHexColor(normalizedColor.toLowerCase());
      }

      if (normalizedColor.startsWith('rgb')) {
        return parseRgbColor(normalizedColor);
      }

      return null;
    }

    function blendOver(foreground, background) {
      const foregroundAlpha = Math.min(Math.max(foreground.a, 0), 1);
      const backgroundAlpha = Math.min(Math.max(background.a, 0), 1);
      const outputAlpha = foregroundAlpha + backgroundAlpha * (1 - foregroundAlpha);

      if (outputAlpha <= 0) {
        return { r: 0, g: 0, b: 0, a: 0 };
      }

      return {
        r: (foreground.r * foregroundAlpha + background.r * backgroundAlpha * (1 - foregroundAlpha)) / outputAlpha,
        g: (foreground.g * foregroundAlpha + background.g * backgroundAlpha * (1 - foregroundAlpha)) / outputAlpha,
        b: (foreground.b * foregroundAlpha + background.b * backgroundAlpha * (1 - foregroundAlpha)) / outputAlpha,
        a: outputAlpha,
      };
    }

    function toOpaque(color) {
      if (color.a >= 1) {
        return color;
      }
      return blendOver(color, { r: 255, g: 255, b: 255, a: 1 });
    }

    function channelToLinear(value) {
      const normalized = value / 255;
      if (normalized <= 0.03928) {
        return normalized / 12.92;
      }
      return ((normalized + 0.055) / 1.055) ** 2.4;
    }

    function luminance(color) {
      const red = channelToLinear(color.r);
      const green = channelToLinear(color.g);
      const blue = channelToLinear(color.b);
      return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
    }

    function contrastRatio(colorA, colorB) {
      const lumA = luminance(colorA);
      const lumB = luminance(colorB);
      const lighter = Math.max(lumA, lumB);
      const darker = Math.min(lumA, lumB);
      return (lighter + 0.05) / (darker + 0.05);
    }

    function parseGradientColor(backgroundImageValue) {
      if (!backgroundImageValue || backgroundImageValue === 'none') {
        return null;
      }

      const colorMatches = backgroundImageValue.match(/rgba?\([^)]+\)|hsla?\([^)]+\)|#[0-9a-fA-F]{3,8}/g);
      if (!colorMatches || colorMatches.length === 0) {
        return null;
      }

      const first = parseColor(colorMatches[0]);
      const last = parseColor(colorMatches[colorMatches.length - 1]);

      if (!first && !last) {
        return null;
      }
      if (!last) {
        return first;
      }
      if (!first) {
        return last;
      }

      return {
        r: (first.r + last.r) / 2,
        g: (first.g + last.g) / 2,
        b: (first.b + last.b) / 2,
        a: (first.a + last.a) / 2,
      };
    }

    function resolveBackground(element) {
      let current = element;

      while (current) {
        const styles = getComputedStyle(current);

        if (styles.backgroundImage && styles.backgroundImage !== 'none') {
          const gradientColor = parseGradientColor(styles.backgroundImage);
          if (gradientColor) {
            return {
              color: gradientColor,
              source: 'gradient',
              sourceTag: current.tagName.toLowerCase(),
            };
          }
        }

        const backgroundColor = parseColor(styles.backgroundColor);
        if (backgroundColor && backgroundColor.a > 0.01) {
          return {
            color: backgroundColor,
            source: 'background-color',
            sourceTag: current.tagName.toLowerCase(),
          };
        }

        current = current.parentElement;
      }

      return {
        color: { r: 255, g: 255, b: 255, a: 1 },
        source: 'fallback',
        sourceTag: 'document',
      };
    }

    function isVisible(element) {
      if (!(element instanceof HTMLElement)) {
        return false;
      }

      const styles = getComputedStyle(element);
      if (styles.display === 'none' || styles.visibility === 'hidden' || Number.parseFloat(styles.opacity) <= 0.01) {
        return false;
      }

      const rect = element.getBoundingClientRect();
      return rect.width > 16 && rect.height > 16;
    }

    function looksLikeButtonAnchor(anchor) {
      const styles = getComputedStyle(anchor);
      const className = (anchor.getAttribute('class') || '').toLowerCase();
      const horizontalPadding = Number.parseFloat(styles.paddingLeft) + Number.parseFloat(styles.paddingRight);
      const verticalPadding = Number.parseFloat(styles.paddingTop) + Number.parseFloat(styles.paddingBottom);
      const hasBorder = Number.parseFloat(styles.borderTopWidth) > 0.5;
      const hasBackground = styles.backgroundColor !== 'rgba(0, 0, 0, 0)' || styles.backgroundImage !== 'none';
      const hasButtonClass = /btn|button|rounded|inline-flex|font-bold|px-|py-|border|bg-/.test(className);
      const hasButtonShape = horizontalPadding >= 16 || verticalPadding >= 8;

      return hasButtonClass || hasBackground || (hasBorder && hasButtonShape);
    }

    function looksLikeGeneralContrastTarget(element) {
      const styles = getComputedStyle(element);
      const hasBackground = styles.backgroundColor !== 'rgba(0, 0, 0, 0)' || styles.backgroundImage !== 'none';
      const hasBorder = Number.parseFloat(styles.borderTopWidth) > 0.5;
      const text = (element.innerText || element.textContent || '').replace(/\s+/g, ' ').trim();

      if (!text) {
        return false;
      }

      return hasBackground || hasBorder;
    }

    function collectCandidates() {
      const root = document.querySelector('main') || document.body;
      const selector = targetMode === 'all'
        ? 'button, [role="button"], a, span, p, li, div, h1, h2, h3, h4, h5, h6'
        : 'button, [role="button"], a';
      const allCandidates = Array.from(root.querySelectorAll(selector));
      const filtered = [];

      for (const element of allCandidates) {
        if (!(element instanceof HTMLElement)) {
          continue;
        }

        if (!isVisible(element)) {
          continue;
        }

        const tagName = element.tagName.toLowerCase();
        if (targetMode === 'buttons') {
          if (tagName === 'a' && !looksLikeButtonAnchor(element)) {
            continue;
          }

          if (tagName !== 'button' && element.getAttribute('role') !== 'button' && tagName !== 'a') {
            continue;
          }
        } else if (!looksLikeGeneralContrastTarget(element)) {
          continue;
        }

        if (element.closest('[aria-hidden="true"]')) {
          continue;
        }

        filtered.push(element);
      }

      return filtered;
    }

    function selectorFor(element) {
      if (element.id) {
        return `#${element.id}`;
      }

      const parts = [];
      let current = element;
      let depth = 0;

      while (current && current.nodeType === Node.ELEMENT_NODE && depth < 5) {
        let part = current.tagName.toLowerCase();
        const classList = Array.from(current.classList)
          .filter((token) => /^[a-zA-Z0-9_-]+$/.test(token))
          .slice(0, 2);
        if (classList.length > 0) {
          part += `.${classList.join('.')}`;
        }

        if (current.parentElement) {
          const sameTagSiblings = Array.from(current.parentElement.children).filter(
            (sibling) => sibling.tagName === current.tagName
          );
          if (sameTagSiblings.length > 1) {
            const index = sameTagSiblings.indexOf(current);
            if (index >= 0) {
              part += `:nth-of-type(${index + 1})`;
            }
          }
        }

        parts.unshift(part);
        if (current.tagName.toLowerCase() === 'main') {
          break;
        }
        current = current.parentElement;
        depth += 1;
      }

      return parts.join(' > ');
    }

    function getAccessibleName(element) {
      const ariaLabel = element.getAttribute('aria-label');
      if (ariaLabel && ariaLabel.trim()) {
        return ariaLabel.trim();
      }

      const textContent = (element.innerText || element.textContent || '').replace(/\s+/g, ' ').trim();
      if (textContent) {
        return textContent;
      }

      const title = element.getAttribute('title');
      if (title && title.trim()) {
        return title.trim();
      }

      return '';
    }

    function formatColor(color) {
      return `rgba(${Math.round(color.r)}, ${Math.round(color.g)}, ${Math.round(color.b)}, ${color.a.toFixed(3)})`;
    }

    function normalizeText(value) {
      return value
        .replace(/\s+/g, ' ')
        .trim()
        .toLowerCase()
        .slice(0, 120);
    }

    const findings = [];
    const candidates = collectCandidates();

    for (const candidate of candidates) {
      const accessibleName = getAccessibleName(candidate);
      if (!accessibleName) {
        continue;
      }

      const styles = getComputedStyle(candidate);
      const foregroundRaw = parseColor(styles.color);
      if (!foregroundRaw) {
        continue;
      }

      const backgroundResolved = resolveBackground(candidate);
      if (!backgroundResolved || !backgroundResolved.color) {
        continue;
      }

      const backgroundOpaque = toOpaque(backgroundResolved.color);
      const foregroundOpaque = foregroundRaw.a >= 1 ? foregroundRaw : blendOver(foregroundRaw, backgroundOpaque);
      const ratio = contrastRatio(foregroundOpaque, backgroundOpaque);

      const fontSize = Number.parseFloat(styles.fontSize);
      const fontWeight = Number.parseInt(styles.fontWeight, 10);
      const isLargeText = fontSize >= 24 || (fontSize >= 18.66 && fontWeight >= 700);
      const requiredContrast = isLargeText ? 3 : minContrastRatio;

      if (ratio < requiredContrast) {
        findings.push({
          state: 'rest',
          theme: activeTheme,
          element: candidate.tagName.toLowerCase(),
          text: accessibleName.slice(0, 120),
          normalizedText: normalizeText(accessibleName),
          selector: selectorFor(candidate),
          className: candidate.getAttribute('class') || '',
          href: candidate.tagName.toLowerCase() === 'a' ? candidate.getAttribute('href') || '' : '',
          ratio: Number(ratio.toFixed(2)),
          required: Number(requiredContrast.toFixed(2)),
          contrastRatio: Number(ratio.toFixed(2)),
          requiredContrast,
          foreground: formatColor(foregroundOpaque),
          background: formatColor(backgroundOpaque),
          backgroundSource: `${backgroundResolved.source}:${backgroundResolved.sourceTag}`,
          fontSize: Number.isFinite(fontSize) ? Number(fontSize.toFixed(2)) : null,
          fontWeight: Number.isFinite(fontWeight) ? fontWeight : null,
        });
      }
    }

    return findings;
  }, { activeTheme: theme, minContrastRatio: minContrast, targetMode: targets });
}

function formatFinding(finding) {
  const stateLabel = finding.state ? `/${finding.state}` : '';
  return `[${finding.theme}${stateLabel}] ratio ${finding.ratio ?? finding.contrastRatio} < ${finding.required ?? finding.requiredContrast} | "${finding.text}" | ${finding.selector} | fg ${finding.foreground} on bg ${finding.background} (${finding.backgroundSource})`;
}

async function writeReportIfNeeded(outputPath, report) {
  if (!outputPath) {
    return;
  }

  const absoluteOutputPath = path.isAbsolute(outputPath)
    ? outputPath
    : path.join(process.cwd(), outputPath);

  const directory = path.dirname(absoluteOutputPath);
  await fs.promises.mkdir(directory, { recursive: true });
  await fs.promises.writeFile(absoluteOutputPath, JSON.stringify(report, null, 2));
  console.log(`\nSaved JSON report to ${absoluteOutputPath}`);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.showHelp) {
    printHelp();
    return;
  }

  console.log('Button contrast audit');
  console.log(`Base URL: ${args.baseUrl}`);
  console.log(`Sitemap URL: ${args.sitemapUrl}`);
  console.log(`Minimum contrast: ${args.minContrast}`);
  console.log(`Targets: ${args.targets}`);
  console.log(`Interaction states: ${args.interactionStates.join(', ')}`);
  console.log(`Hydration wait: ${args.hydrationWaitMs}ms`);
  console.log(`Theme storage key: ${args.themeStorageKey}`);
  console.log(`Render settle iterations: ${args.renderSettleIterations}`);
  if (args.limit) {
    console.log(`URL limit: ${args.limit}`);
  }
  if (args.includePathPrefixes.length > 0) {
    console.log(`Include prefixes: ${args.includePathPrefixes.join(', ')}`);
  }
  if (args.excludePathPrefixes.length > 0) {
    console.log(`Exclude prefixes: ${args.excludePathPrefixes.join(', ')}`);
  }
  console.log('');

  let sitemapUrls;
  try {
    sitemapUrls = await loadUrlsFromSitemap(args.sitemapUrl, args.timeoutMs);
  } catch (error) {
    throw new Error(`Failed to load sitemap URLs from ${args.sitemapUrl}: ${error.message}`);
  }

  const pageUrls = filterCustomerFacingUrls(sitemapUrls, args);
  if (pageUrls.length === 0) {
    console.log('No URLs matched filters. Nothing to scan.');
    return;
  }

  console.log(`Found ${sitemapUrls.length} URLs in sitemap.`);
  console.log(`Scanning ${pageUrls.length} customer-facing URLs.\n`);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();

  const findings = [];
  const pageErrors = [];

  try {
    for (let index = 0; index < pageUrls.length; index += 1) {
      const pageUrl = pageUrls[index];
      console.log(`[${index + 1}/${pageUrls.length}] ${pageUrl}`);

      try {
        await page.goto(pageUrl, {
          waitUntil: 'domcontentloaded',
          timeout: args.timeoutMs,
        });
        await page.waitForTimeout(args.hydrationWaitMs);

        for (const theme of ['light', 'dark']) {
          await setThemeClass(page, theme, args.themeStorageKey);
          await waitForRenderSettle(page, args.targets, args.renderSettleIterations);
          if (args.interactionStates.includes('rest')) {
            const themeFindings = await auditButtonsOnCurrentPage(page, theme, args.minContrast, args.targets);
            for (const finding of themeFindings) {
              findings.push({
                url: pageUrl,
                ...finding,
              });
            }
          }
          if (args.interactionStates.includes('hover')) {
            const hoverFindings = await auditHoveredCandidatesOnCurrentPage(page, theme, args.minContrast, args.targets);
            for (const finding of hoverFindings) {
              findings.push({
                url: pageUrl,
                ...finding,
              });
            }
          }
        }
      } catch (error) {
        pageErrors.push({
          url: pageUrl,
          error: error.message,
        });
        console.log(`  ERROR: ${error.message}`);
      }
    }
  } finally {
    await context.close();
    await browser.close();
  }

  const findingsByUrl = new Map();
  for (const finding of findings) {
    if (!findingsByUrl.has(finding.url)) {
      findingsByUrl.set(finding.url, []);
    }
    findingsByUrl.get(finding.url).push(finding);
  }

  console.log('\nAudit summary');
  console.log(`Scanned pages: ${pageUrls.length}`);
  console.log(`Pages with contrast issues: ${findingsByUrl.size}`);
  console.log(`Total failing ${args.targets === 'buttons' ? 'buttons' : 'targets'}: ${findings.length}`);
  console.log(`Page load errors: ${pageErrors.length}`);

  if (findings.length > 0) {
    console.log('\nContrast failures:');
    for (const [url, urlFindings] of findingsByUrl.entries()) {
      console.log(`\n${url}`);
      for (const finding of urlFindings) {
        console.log(`  - ${formatFinding(finding)}`);
      }
    }
  }

  if (pageErrors.length > 0) {
    console.log('\nPage errors:');
    for (const errorEntry of pageErrors) {
      console.log(`  - ${errorEntry.url}: ${errorEntry.error}`);
    }
  }

  await writeReportIfNeeded(args.outputPath, {
    scannedAt: new Date().toISOString(),
    settings: {
      baseUrl: args.baseUrl,
      sitemapUrl: args.sitemapUrl,
      minContrast: args.minContrast,
      timeoutMs: args.timeoutMs,
      hydrationWaitMs: args.hydrationWaitMs,
      themeStorageKey: args.themeStorageKey,
      renderSettleIterations: args.renderSettleIterations,
      targets: args.targets,
      interactionStates: args.interactionStates,
      limit: args.limit,
      includePathPrefixes: args.includePathPrefixes,
      excludePathPrefixes: args.excludePathPrefixes,
    },
    scannedPageCount: pageUrls.length,
    findingsCount: findings.length,
    pageErrorCount: pageErrors.length,
    findings,
    pageErrors,
  });

  if (findings.length > 0 || pageErrors.length > 0) {
    process.exitCode = 1;
    return;
  }

  console.log('\nPASS: no low-contrast buttons detected on scanned pages.');
}

main().catch((error) => {
  console.error(`\nContrast audit failed: ${error.message}`);
  process.exit(1);
});
