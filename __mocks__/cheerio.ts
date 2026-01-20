/**
 * Mock cheerio for Jest tests
 */

export interface CheerioElement {
  attr(name: string): string | undefined;
  text(): string;
  parent(): CheerioElement;
  length: number;
}

export interface CheerioAPI {
  (selector: string): CheerioElement;
}

// Simple mock cheerio implementation
export const load = (html: string): CheerioAPI => {
  // Parse HTML manually for testing purposes
  const linkRegex = /<a\s+[^>]*href=["']([^"']*)["'][^>]*>(.*?)<\/a>/gi;
  const links: Array<{ href: string; text: string; parent: string }> = [];

  let match;
  while ((match = linkRegex.exec(html)) !== null) {
    const href = match[1];
    const text = match[2].replace(/<[^>]*>/g, ''); // Remove inner tags

    // Extract parent context (simplified)
    const startPos = Math.max(0, match.index - 50);
    const endPos = Math.min(html.length, match.index + match[0].length + 50);
    const parent = html.substring(startPos, endPos);

    links.push({ href, text, parent });
  }

  const $ = ((selector: string | any): CheerioElement => {
    // Handle when selector is a mock element from each() callback
    if (selector && typeof selector === 'object' && selector._linkData) {
      const link = selector._linkData;
      return {
        attr(name: string): string | undefined {
          if (name === 'href') {
            return link.href;
          }
          return undefined;
        },
        text(): string {
          return link.text;
        },
        parent(): CheerioElement {
          return {
            attr() {
              return undefined;
            },
            text(): string {
              return link.parent;
            },
            parent(): CheerioElement {
              return this;
            },
            length: 1,
          };
        },
        length: 1,
      };
    }

    if (selector === 'a') {
      // Return mock element that can iterate over links
      const mockElements = links.map((link, linkIndex) => ({
        attr(name: string): string | undefined {
          if (name === 'href') {
            return link.href;
          }
          return undefined;
        },
        text(): string {
          return link.text;
        },
        parent(): CheerioElement {
          return {
            attr() {
              return undefined;
            },
            text(): string {
              return link.parent;
            },
            parent(): CheerioElement {
              return this;
            },
            length: 1,
          };
        },
        length: 1,
      }));

      return {
        attr(name: string): string | undefined {
          if (name === 'href' && links[0]) {
            return links[0].href;
          }
          return undefined;
        },
        text(): string {
          return links[0]?.text || '';
        },
        parent(): CheerioElement {
          const parentText = links[0]?.parent || '';
          return {
            attr() {
              return undefined;
            },
            text(): string {
              return parentText;
            },
            parent(): CheerioElement {
              return this;
            },
            length: 1,
          };
        },
        length: links.length,
        // Mock each() method for iteration
        each(callback: (i: number, el: any) => void): void {
          links.forEach((link, i) => {
            // Create a mock element for this specific link
            const mockEl = {
              _linkData: link,
            };
            callback(i, mockEl);
          });
        },
      } as any;
    }

    // Default element
    return {
      attr() {
        return undefined;
      },
      text() {
        return '';
      },
      parent(): CheerioElement {
        return this;
      },
      length: 0,
    };
  }) as CheerioAPI;

  return $;
};

export default { load };
