/**
 * Link Validation Utility
 * Validates internal and external links across the site
 */

import * as https from 'node:https';
import * as http from 'node:http';

export interface LinkValidationResult {
  url: string;
  status: 'valid' | 'broken' | 'error';
  statusCode?: number;
  error?: string;
  location?: string; // For redirects
}

export interface ValidationReport {
  timestamp: string;
  totalLinks: number;
  validLinks: number;
  brokenLinks: number;
  errorLinks: number;
  results: LinkValidationResult[];
}

/**
 * Validate a single external URL with retry logic
 */
export async function validateExternalLink(
  url: string,
  retries = 2
): Promise<LinkValidationResult> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const result = await checkUrl(url);
      
      // Consider 2xx and 3xx as valid
      if (result.statusCode && result.statusCode < 400) {
        return {
          url,
          status: 'valid',
          statusCode: result.statusCode,
          location: result.location,
        };
      }
      
      // 4xx and 5xx are broken
      return {
        url,
        status: 'broken',
        statusCode: result.statusCode,
      };
    } catch (error) {
      if (attempt === retries) {
        return {
          url,
          status: 'error',
          error: error instanceof Error ? error.message : 'Unknown error',
        };
      }
      // Wait before retry
      await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
    }
  }
  
  return {
    url,
    status: 'error',
    error: 'Max retries exceeded',
  };
}

/**
 * Check URL and return status code
 */
function checkUrl(url: string): Promise<{ statusCode?: number; location?: string }> {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    
    const request = protocol.get(url, {
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; LinkValidator/1.0)',
      },
    }, (res) => {
      resolve({
        statusCode: res.statusCode,
        location: res.headers.location,
      });
      res.resume(); // Consume response data to free up memory
    });
    
    request.on('error', reject);
    request.on('timeout', () => {
      request.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

/**
 * Validate multiple external links
 */
export async function validateExternalLinks(
  urls: string[],
  concurrency = 5
): Promise<LinkValidationResult[]> {
  const results: LinkValidationResult[] = [];
  
  // Process in batches to avoid overwhelming servers
  for (let i = 0; i < urls.length; i += concurrency) {
    const batch = urls.slice(i, i + concurrency);
    const batchResults = await Promise.all(
      batch.map(url => validateExternalLink(url))
    );
    results.push(...batchResults);
    
    // Small delay between batches
    if (i + concurrency < urls.length) {
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }
  
  return results;
}

/**
 * Validate internal links (routes)
 * Checks if the route exists in the Next.js pages directory
 */
export function validateInternalLinks(
  links: string[],
  validRoutes: string[]
): LinkValidationResult[] {
  return links.map(link => {
    // Remove query params and hash
    const cleanLink = link.split('?')[0].split('#')[0];
    
    // Check if route exists
    const isValid = validRoutes.some(route => {
      // Handle dynamic routes
      if (route.includes('[')) {
        const pattern = route.replaceAll(/\[.*?\]/g, '[^/]+');
        const regex = new RegExp(`^${pattern}$`);
        return regex.test(cleanLink);
      }
      return route === cleanLink;
    });
    
    return {
      url: link,
      status: isValid ? 'valid' : 'broken',
      statusCode: isValid ? 200 : 404,
    };
  });
}

/**
 * Generate validation report
 */
export function generateValidationReport(
  results: LinkValidationResult[]
): ValidationReport {
  const validLinks = results.filter(r => r.status === 'valid').length;
  const brokenLinks = results.filter(r => r.status === 'broken').length;
  const errorLinks = results.filter(r => r.status === 'error').length;
  
  return {
    timestamp: new Date().toISOString(),
    totalLinks: results.length,
    validLinks,
    brokenLinks,
    errorLinks,
    results: results.filter(r => r.status !== 'valid'), // Only include broken/error links
  };
}

/**
 * Extract links from HTML content
 */
export function extractLinks(html: string): {
  internal: string[];
  external: string[];
} {
  const internal: string[] = [];
  const external: string[] = [];
  
  // Match href attributes
  const hrefRegex = /href=["']([^"']+)["']/g;
  let match;
  
  while ((match = hrefRegex.exec(html)) !== null) {
    const url = match[1];
    
    // Skip anchors, mailto, tel
    if (url.startsWith('#') || url.startsWith('mailto:') || url.startsWith('tel:')) {
      continue;
    }
    
    // External links
    if (url.startsWith('http://') || url.startsWith('https://')) {
      external.push(url);
    }
    // Internal links
    else if (url.startsWith('/')) {
      internal.push(url);
    }
  }
  
  return {
    internal: [...new Set(internal)], // Remove duplicates
    external: [...new Set(external)],
  };
}
