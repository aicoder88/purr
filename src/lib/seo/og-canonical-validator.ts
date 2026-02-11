/**
 * OG Canonical URL Validator
 * Validates that Open Graph URL matches canonical URL
 */

import * as fs from 'fs';
import * as path from 'path';

export interface OGCanonicalIssue {
  page: string;
  severity: 'critical' | 'error' | 'warning';
  type: 'mismatch' | 'missing-canonical' | 'missing-og';
  message: string;
  details?: {
    canonical?: string;
    ogUrl?: string;
  };
  fix?: string;
}

export interface OGCanonicalResult {
  totalPages: number;
  validPages: number;
  issues: OGCanonicalIssue[];
}

/**
 * Extract canonical URL from page source
 */
function extractCanonicalUrl(content: string, filePath: string): string | null {
  // First, check for raw HTML link tag <link rel="canonical" href="..." />
  // This handles both orders: rel then href, or href then rel
  const linkMatch = content.match(/<link\s+(?:rel=["']canonical["']\s+href=["']([^"']+)["']|href=["']([^"']+)["']\s+rel=["']canonical["'])/);
  if (linkMatch) {
    return linkMatch[1] || linkMatch[2];
  }

  // Look for canonical prop in NextSeo component
  // Pattern: canonical={...} or canonical="..."

  // Match canonical={variable}
  const variableMatch = content.match(/canonical=\{([^}]+)\}/);
  if (variableMatch) {
    const variable = variableMatch[1].trim();

    // Check if it's a literal string inside JSX expression (starts with quotes)
    if (variable.startsWith('"') || variable.startsWith("'") || variable.startsWith('`')) {
      return variable.replace(/['"`]/g, '');
    }

    // Try to find the variable declaration
    const varDeclPattern = new RegExp(`const\\s+${variable}\\s*=\\s*['"\`]([^'"\`]+)['"\`]`);
    const varMatch = content.match(varDeclPattern);
    if (varMatch) {
      return varMatch[1];
    }

    // Try to find function call pattern like getLocalizedUrl(...)
    const funcCallPattern = new RegExp(`const\\s+${variable}\\s*=\\s*getLocalizedUrl\\(['"\`]([^'"\`]+)['"\`]`);
    const funcMatch = content.match(funcCallPattern);
    if (funcMatch) {
      // Return the route path, we'll need to handle localization later
      return funcMatch[1];
    }
  }

  // Match canonical="literal" or canonical={`...`}
  const literalMatch = content.match(/canonical=["'`]((?:[^"'`]+|\$\{[\s\S]*?\})+)["'`]/);
  if (literalMatch) {
    return literalMatch[1];
  }

  // Next.js App Router Metadata support
  // Match inside alternates object: alternates: { canonical: ... }
  // Supports literals '...', "...", `...` and variable names
  const alternatesMatch = content.match(/alternates:\s*\{\s*[\s\S]*?canonical:\s*(['"`](?:[^"'`]+|\$\{[\s\S]*?\})+['"`]|[a-zA-Z0-9_]+)/);
  if (alternatesMatch) {
    const value = alternatesMatch[1];
    return resolveUrlValue(value, content);
  }

  return null;
}

/**
 * Extract Open Graph URL from page source
 */
function extractOGUrl(content: string, filePath: string): string | null {
  // First, check for raw HTML meta tag <meta property="og:url" content="..." />
  // More permissive regex that handles any whitespace and attribute order
  const ogUrlPattern = /<meta[^>]*property\s*=\s*["']og:url["'][^>]*content\s*=\s*["']([^"']+)["'][^>]*>|<meta[^>]*content\s*=\s*["']([^"']+)["'][^>]*property\s*=\s*["']og:url["'][^>]*>/;
  const metaTagMatch = content.match(ogUrlPattern);
  if (metaTagMatch) {
    return metaTagMatch[1] || metaTagMatch[2];
  }

  // Look for openGraph prop in NextSeo
  // Pattern: openGraph={{ url: ... }}

  // First, find the openGraph object in NextSeo
  const ogMatch = content.match(/openGraph=\{\{([^}]+)\}\}/s);
  if (ogMatch) {
    const ogContent = ogMatch[1];
    const urlMatch = ogContent.match(/url:\s*([^,\n]+)/);

    if (urlMatch) {
      return resolveUrlValue(urlMatch[1], content);
    }
  }

  // Try multi-line pattern for NextSeo
  const multiLineMatch = content.match(/openGraph=\{\{([\s\S]*?)\}\}/);
  if (multiLineMatch) {
    const ogContent = multiLineMatch[1];
    const urlMatch = ogContent.match(/url:\s*([^,\n]+)/);

    if (urlMatch) {
      return resolveUrlValue(urlMatch[1], content);
    }
  }

  // Next.js App Router Metadata support
  // Match inside openGraph object: openGraph: { ... url: ... ... }
  // This needs to handle nested objects (images, etc.) so we use a more permissive approach
  const openGraphStart = content.indexOf('openGraph:');
  if (openGraphStart !== -1) {
    // Find the opening brace after openGraph:
    const afterColon = content.slice(openGraphStart + 'openGraph:'.length);
    const braceMatch = afterColon.match(/\s*\{/);
    if (braceMatch) {
      const openBracePos = openGraphStart + 'openGraph:'.length + braceMatch.index! + 1;
      // Find the matching closing brace by counting braces
      let braceCount = 1;
      let closeBracePos = openBracePos;
      for (let i = openBracePos; i < content.length && braceCount > 0; i++) {
        if (content[i] === '{') braceCount++;
        if (content[i] === '}') braceCount--;
        if (braceCount === 0) {
          closeBracePos = i;
          break;
        }
      }

      const ogContent = content.slice(openBracePos, closeBracePos);
      // Now look for url property within this content
      const urlMatch = ogContent.match(/url:\s*(['"`](?:[^"'`]+|\$\{[\s\S]*?\})+['"`]|[a-zA-Z0-9_]+)/);
      if (urlMatch) {
        return resolveUrlValue(urlMatch[1], content);
      }
    }
  }

  return null;
}

function resolveUrlValue(urlValue: string, content: string): string | null {
  const trimmedValue = urlValue.trim();

  // If it's a variable, try to find its declaration
  if (!trimmedValue.startsWith('"') && !trimmedValue.startsWith("'") && !trimmedValue.startsWith('`')) {
    const varPattern = new RegExp(`const\\s+${trimmedValue}\\s*=\\s*['"\`]([^'"\`]+)['"\`]`);
    const varMatch = content.match(varPattern);
    if (varMatch) {
      return varMatch[1];
    }

    // Try function call pattern
    const funcPattern = new RegExp(`const\\s+${trimmedValue}\\s*=\\s*getLocalizedUrl\\(['"\`]([^'"\`]+)['"\`]`);
    const funcMatch = content.match(funcPattern);
    if (funcMatch) {
      return funcMatch[1];
    }

    return null;
  } else {
    // It's a literal string - strip quotes
    let literalValue = trimmedValue.replace(/^['"`]|['"`]$/g, '');

    // Check if it contains template literal variables like ${SITE_URL}
    if (literalValue.includes('${')) {
      // Extract all ${variable} references
      const templateVars = literalValue.match(/\$\{([^}]+)\}/g);
      if (templateVars) {
        for (const templateVar of templateVars) {
          const varName = templateVar.slice(2, -1).trim(); // Remove ${ and }

          // Try to find the variable declaration in the content
          const varPattern = new RegExp(`(?:export\\s+)?const\\s+${varName}\\s*=\\s*(?:process\\.env\\.[A-Z_]+\\s*\\|\\|\\s*)?['"\`]([^'"\`]+)['"\`]`);
          const varMatch = content.match(varPattern);

          if (varMatch) {
            // Replace the template variable with its value
            literalValue = literalValue.replace(templateVar, varMatch[1]);
          } else {
            // If we can't resolve it, try common constants
            if (varName === 'SITE_URL') {
              literalValue = literalValue.replace(templateVar, 'https://www.purrify.ca');
            } else if (varName === 'SITE_NAME') {
              literalValue = literalValue.replace(templateVar, 'Purrify');
            }
          }
        }
      }
    }

    return literalValue;
  }
}

/**
 * Normalize URL for comparison
 * Handles variations like with/without trailing slash, protocol, etc.
 */
function normalizeUrl(url: string): string {
  if (!url) return '';

  let normalized = url;

  // Handle relative URLs (e.g., '/science') by adding a base domain
  if (normalized.startsWith('/')) {
    normalized = 'purrify.ca' + normalized;
  }

  // Remove trailing slash
  normalized = normalized.replace(/\/$/, '');

  // Remove protocol for comparison
  normalized = normalized.replace(/^https?:\/\//, '');

  // Remove www. prefix
  normalized = normalized.replace(/^www\./, '');

  return normalized;
}

/**
 * Check if canonical and OG URLs match
 */
function compareUrls(canonical: string | null, ogUrl: string | null): boolean {
  if (!canonical || !ogUrl) return false;

  const normalizedCanonical = normalizeUrl(canonical);
  const normalizedOG = normalizeUrl(ogUrl);

  return normalizedCanonical === normalizedOG;
}

/**
 * Validate a single page file
 */
export function validatePageFile(filePath: string): OGCanonicalIssue[] {
  const issues: OGCanonicalIssue[] = [];

  try {
    const content = fs.readFileSync(filePath, 'utf-8');

    const canonical = extractCanonicalUrl(content, filePath);
    const ogUrl = extractOGUrl(content, filePath);

    // console.log(`Debug ${filePath}: Canonical="${canonical}", OG="${ogUrl}"`);

    // Check if both are present
    if (!canonical && !ogUrl) {
      // Page might not have SEO tags, which is handled by meta validation
      return [];
    }

    if (canonical && ogUrl && !compareUrls(canonical, ogUrl)) {
      // Debug mismatch
      // console.log(`MISMATCH ${filePath}: \nC: ${canonical}\nO: ${ogUrl}`);
    }

    if (!canonical) {
      issues.push({
        page: filePath,
        severity: 'error',
        type: 'missing-canonical',
        message: 'Page has Open Graph URL but missing canonical URL',
        details: { ogUrl: ogUrl || undefined },
        fix: 'Add canonical URL to NextSeo component',
      });
      return issues;
    }

    if (!ogUrl) {
      issues.push({
        page: filePath,
        severity: 'error',
        type: 'missing-og',
        message: 'Page has canonical URL but missing Open Graph URL',
        details: { canonical },
        fix: 'Add url property to openGraph object in NextSeo',
      });
      return issues;
    }

    // Compare URLs
    if (!compareUrls(canonical, ogUrl)) {
      issues.push({
        page: filePath,
        severity: 'error',
        type: 'mismatch',
        message: 'Canonical URL does not match Open Graph URL',
        details: { canonical, ogUrl },
        fix: 'Ensure both canonical and openGraph.url point to the same URL',
      });
    }
  } catch (error) {
    issues.push({
      page: filePath,
      severity: 'warning',
      type: 'mismatch',
      message: `Failed to validate page: ${error}`,
    });
  }

  return issues;
}

/**
 * Validate all pages for OG/Canonical match
 */
export async function validateOGCanonicalUrls(pages: Array<{ filePath: string; routePath: string }>): Promise<OGCanonicalResult> {
  const issues: OGCanonicalIssue[] = [];
  let validCount = 0;

  for (const page of pages) {
    // filePath already includes 'app/' or 'pages/' prefix from scanner
    const fullPath = path.join(process.cwd(), page.filePath);
    const pageIssues = validatePageFile(fullPath);

    if (pageIssues.length === 0) {
      validCount++;
    } else {
      // Update file paths to use route paths for better readability
      pageIssues.forEach(issue => {
        issue.page = page.routePath;
        issues.push(issue);
      });
    }
  }

  return {
    totalPages: pages.length,
    validPages: validCount,
    issues,
  };
}

/**
 * Generate OG/Canonical validation report
 */
export function generateOGCanonicalReport(result: OGCanonicalResult): string {
  const lines: string[] = [];

  lines.push('# OG/Canonical URL Validation Report\n');
  lines.push(`Generated: ${new Date().toISOString()}\n`);
  lines.push('---\n\n');

  lines.push('## Summary\n');
  lines.push(`- **Total Pages**: ${result.totalPages}\n`);
  lines.push(`- **Valid Pages**: ${result.validPages}\n`);
  lines.push(`- **Pages with Issues**: ${result.issues.length}\n\n`);

  if (result.issues.length > 0) {
    // Group by type
    const mismatches = result.issues.filter(i => i.type === 'mismatch');
    const missingCanonical = result.issues.filter(i => i.type === 'missing-canonical');
    const missingOG = result.issues.filter(i => i.type === 'missing-og');

    if (mismatches.length > 0) {
      lines.push('## URL Mismatches\n\n');
      mismatches.forEach((issue, i) => {
        lines.push(`${i + 1}. **${issue.page}**\n`);
        lines.push(`   - Canonical: ${issue.details?.canonical || 'N/A'}\n`);
        lines.push(`   - Open Graph: ${issue.details?.ogUrl || 'N/A'}\n`);
        if (issue.fix) lines.push(`   - Fix: ${issue.fix}\n`);
        lines.push('\n');
      });
    }

    if (missingCanonical.length > 0) {
      lines.push('## Missing Canonical URLs\n\n');
      missingCanonical.forEach((issue, i) => {
        lines.push(`${i + 1}. **${issue.page}**\n`);
        if (issue.fix) lines.push(`   - Fix: ${issue.fix}\n`);
        lines.push('\n');
      });
    }

    if (missingOG.length > 0) {
      lines.push('## Missing Open Graph URLs\n\n');
      missingOG.forEach((issue, i) => {
        lines.push(`${i + 1}. **${issue.page}**\n`);
        if (issue.fix) lines.push(`   - Fix: ${issue.fix}\n`);
        lines.push('\n');
      });
    }
  }

  return lines.join('');
}
