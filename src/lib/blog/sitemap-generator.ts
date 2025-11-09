import fs from 'fs/promises';
import path from 'path';
import { ContentStore } from './content-store';
import type { BlogPost } from '@/types/blog';

export class SitemapGenerator {
  private store: ContentStore;
  private baseUrl: string;
  private locales = ['en', 'fr', 'zh'];

  constructor() {
    this.store = new ContentStore();
    this.baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://purrify.ca';
  }

  async generateBlogSitemap(): Promise<string> {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" ';
    xml += 'xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';

    for (const locale of this.locales) {
      const posts = await this.store.getAllPosts(locale, false);

      for (const post of posts) {
        const url = `${this.baseUrl}/${locale}/blog/${post.slug}`;
        xml += `  <url>\n`;
        xml += `    <loc>${url}</loc>\n`;
        xml += `    <lastmod>${post.modifiedDate}</lastmod>\n`;
        xml += `    <changefreq>weekly</changefreq>\n`;
        xml += `    <priority>0.8</priority>\n`;

        // Add hreflang links for translations
        if (post.translations && Object.keys(post.translations).length > 0) {
          for (const [lang, slug] of Object.entries(post.translations)) {
            const altUrl = `${this.baseUrl}/${lang}/blog/${slug}`;
            xml += `    <xhtml:link rel="alternate" hreflang="${lang}" href="${altUrl}" />\n`;
          }
        }

        xml += `  </url>\n`;
      }
    }

    xml += '</urlset>';

    return xml;
  }

  async updateSitemap(): Promise<void> {
    try {
      const xml = await this.generateBlogSitemap();
      const sitemapPath = path.join(process.cwd(), 'public', 'sitemap-blog.xml');

      await fs.writeFile(sitemapPath, xml, 'utf-8');
      console.log('Blog sitemap updated successfully');
    } catch (error) {
      console.error('Error updating blog sitemap:', error);
      throw error;
    }
  }

  async generateCategorySitemap(): Promise<string> {
    const categories = await this.store.getCategories();

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    for (const locale of this.locales) {
      for (const category of categories) {
        const url = `${this.baseUrl}/${locale}/blog/category/${category.slug}`;
        xml += `  <url>\n`;
        xml += `    <loc>${url}</loc>\n`;
        xml += `    <changefreq>daily</changefreq>\n`;
        xml += `    <priority>0.7</priority>\n`;
        xml += `  </url>\n`;
      }
    }

    xml += '</urlset>';

    return xml;
  }

  async generateTagSitemap(): Promise<string> {
    const tags = await this.store.getTags();

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    for (const locale of this.locales) {
      for (const tag of tags) {
        const url = `${this.baseUrl}/${locale}/blog/tag/${tag.slug}`;
        xml += `  <url>\n`;
        xml += `    <loc>${url}</loc>\n`;
        xml += `    <changefreq>daily</changefreq>\n`;
        xml += `    <priority>0.6</priority>\n`;
        xml += `  </url>\n`;
      }
    }

    xml += '</urlset>';

    return xml;
  }

  async updateAllSitemaps(): Promise<void> {
    try {
      // Update blog posts sitemap
      await this.updateSitemap();

      // Update category sitemap
      const categorySitemap = await this.generateCategorySitemap();
      await fs.writeFile(
        path.join(process.cwd(), 'public', 'sitemap-blog-categories.xml'),
        categorySitemap,
        'utf-8'
      );

      // Update tag sitemap
      const tagSitemap = await this.generateTagSitemap();
      await fs.writeFile(
        path.join(process.cwd(), 'public', 'sitemap-blog-tags.xml'),
        tagSitemap,
        'utf-8'
      );

      console.log('All blog sitemaps updated successfully');
    } catch (error) {
      console.error('Error updating sitemaps:', error);
      throw error;
    }
  }
}
