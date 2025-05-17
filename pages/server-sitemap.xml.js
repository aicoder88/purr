import { getServerSideSitemap } from 'next-sitemap';

export const getServerSideProps = async (ctx) => {
  // Fetch data from external API
  const response = await fetch('https://purrify.ca/api/blog-posts');
  const posts = await response.json();

  // Generate dynamic sitemap fields from blog posts
  const fields = posts.map((post) => ({
    loc: `https://purrify.ca${post.link}`,
    lastmod: new Date().toISOString(),
    changefreq: 'weekly',
    priority: 0.8,
  }));

  // Add product pages
  const productFields = [
    {
      loc: 'https://purrify.ca/products/purrify-20g',
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: 0.9,
    },
    {
      loc: 'https://purrify.ca/products/purrify-60g',
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: 0.9,
    },
    {
      loc: 'https://purrify.ca/products/purrify-120g',
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: 0.9,
    },
  ];

  // Combine all fields
  const allFields = [...fields, ...productFields];

  return getServerSideSitemap(ctx, allFields);
};

// Default export to prevent next.js errors
export default function Sitemap() {}