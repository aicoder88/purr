import fs from "fs/promises";
import path from "node:path";
import { ContentStore } from "./content-store";
import { CANONICAL_CATEGORY_SLUGS, CANONICAL_TAG_SLUGS, buildTaxonomyHubData } from "./taxonomy";
import type {} from "@/types/blog";

const SUPPORTED_BLOG_LOCALES = ["en", "fr"] as const;
type SupportedBlogLocale = typeof SUPPORTED_BLOG_LOCALES[number];

const BLOG_HREFLANG_MAP: Record<SupportedBlogLocale, string> = {
  en: "en-CA",
  fr: "fr-CA",
};

function isSupportedBlogLocale(locale: string): locale is SupportedBlogLocale {
  return SUPPORTED_BLOG_LOCALES.includes(locale as SupportedBlogLocale);
}

export class SitemapGenerator {
  private store: ContentStore;
  private baseUrl: string;
  private locales = [...SUPPORTED_BLOG_LOCALES];

  constructor() {
    this.store = new ContentStore();
    // CRITICAL: Always use canonical www domain for SEO
    this.baseUrl = "https://www.purrify.ca";
  }

  private getBlogBasePath(locale: string): string {
    return locale === "en" ? "/blog" : `/${locale}/blog`;
  }

  private getBlogUrl(locale: SupportedBlogLocale, slug: string): string {
    return `${this.baseUrl}${this.getBlogBasePath(locale)}/${slug}`;
  }

  async generateBlogSitemap(): Promise<string> {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" ';
    xml += 'xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';

    for (const locale of this.locales) {
      const posts = await this.store.getAllPosts(locale, false);

      for (const post of posts) {
        const url = this.getBlogUrl(locale, post.slug);
        xml += `  <url>\n`;
        xml += `    <loc>${url}</loc>\n`;
        xml += `    <lastmod>${post.modifiedDate}</lastmod>\n`;
        xml += `    <changefreq>weekly</changefreq>\n`;
        xml += `    <priority>0.8</priority>\n`;

        const alternates = new Map<string, string>();
        alternates.set(BLOG_HREFLANG_MAP[locale], url);

        for (const [translationLocale, translationSlug] of Object.entries(post.translations ?? {})) {
          if (!isSupportedBlogLocale(translationLocale) || !translationSlug) {
            continue;
          }

          alternates.set(
            BLOG_HREFLANG_MAP[translationLocale],
            this.getBlogUrl(translationLocale, translationSlug),
          );
        }

        const defaultSlug = locale === "en" ? post.slug : post.translations?.en;
        if (defaultSlug) {
          alternates.set("x-default", this.getBlogUrl("en", defaultSlug));
        }

        for (const [hrefLang, alternateUrl] of alternates) {
          xml += `    <xhtml:link rel="alternate" hreflang="${hrefLang}" href="${alternateUrl}" />\n`;
        }

        xml += `  </url>\n`;
      }
    }

    xml += "</urlset>";

    return xml;
  }

  async updateSitemap(): Promise<void> {
    try {
      const xml = await this.generateBlogSitemap();
      const sitemapPath = path.join(
        process.cwd(),
        "public",
        "sitemap-blog.xml",
      );

      await fs.writeFile(sitemapPath, xml, "utf-8");
    } catch (error) {
      console.error("Error updating blog sitemap:", error);
      throw error;
    }
  }

  async generateCategorySitemap(): Promise<string> {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    for (const locale of this.locales) {
      const posts = await this.store.getAllPosts(locale, false);

      for (const categorySlug of CANONICAL_CATEGORY_SLUGS) {
        if (!buildTaxonomyHubData(posts, "category", categorySlug)) {
          continue;
        }

        const url = `${this.baseUrl}${this.getBlogBasePath(locale)}/category/${categorySlug}`;
        xml += `  <url>\n`;
        xml += `    <loc>${url}</loc>\n`;
        xml += `    <changefreq>daily</changefreq>\n`;
        xml += `    <priority>0.7</priority>\n`;
        xml += `  </url>\n`;
      }
    }

    xml += "</urlset>";

    return xml;
  }

  async generateTagSitemap(): Promise<string> {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    for (const locale of this.locales) {
      const posts = await this.store.getAllPosts(locale, false);

      for (const tagSlug of CANONICAL_TAG_SLUGS) {
        if (!buildTaxonomyHubData(posts, "tag", tagSlug)) {
          continue;
        }

        const url = `${this.baseUrl}${this.getBlogBasePath(locale)}/tag/${tagSlug}`;
        xml += `  <url>\n`;
        xml += `    <loc>${url}</loc>\n`;
        xml += `    <changefreq>daily</changefreq>\n`;
        xml += `    <priority>0.6</priority>\n`;
        xml += `  </url>\n`;
      }
    }

    xml += "</urlset>";

    return xml;
  }

  async updateAllSitemaps(): Promise<void> {
    try {
      // Update blog posts sitemap
      await this.updateSitemap();

      // Update category sitemap
      const categorySitemap = await this.generateCategorySitemap();
      await fs.writeFile(
        path.join(process.cwd(), "public", "sitemap-blog-categories.xml"),
        categorySitemap,
        "utf-8",
      );

      // Update tag sitemap
      const tagSitemap = await this.generateTagSitemap();
      await fs.writeFile(
        path.join(process.cwd(), "public", "sitemap-blog-tags.xml"),
        tagSitemap,
        "utf-8",
      );

      // Blog sitemaps updated
    } catch (error) {
      console.error("Error updating sitemaps:", error);
      throw error;
    }
  }
}
