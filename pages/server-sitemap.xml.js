import { sampleBlogPosts } from '../src/data/blog-posts';

export const getServerSideProps = async ({ res }) => {
  let posts = sampleBlogPosts;

  try {
    const response = await fetch('https://www.purrify.ca/api/blog-posts');

    if (!response.ok) {
      console.error(`Failed to fetch blog posts for sitemap: ${response.status}`);
    } else {
      const json = await response.json();

      if (Array.isArray(json) && json.length > 0) {
        posts = json;
      }
    }
  } catch (error) {
    console.error('Error fetching blog posts for sitemap', error);
  }

  // Generate dynamic sitemap fields from blog posts
  const blogFields = posts
    .filter((post) => post && typeof post.link === 'string')
    .map((post) => ({
      loc: `https://www.purrify.ca${post.link}`,
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: 0.8,
    }));

  // Add product pages
  const productFields = [
    { loc: 'https://www.purrify.ca/products/trial-size', lastmod: new Date().toISOString(), changefreq: 'weekly', priority: 0.9 },
    { loc: 'https://www.purrify.ca/products/standard', lastmod: new Date().toISOString(), changefreq: 'weekly', priority: 0.9 },
    { loc: 'https://www.purrify.ca/products/family-pack', lastmod: new Date().toISOString(), changefreq: 'weekly', priority: 0.9 },
  ];

  // Combine all fields
  const allFields = [...blogFields, ...productFields];

  const xml = '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    allFields.map((f) => (
      "  <url>\n" +
      `    <loc>${f.loc}</loc>\n` +
      (f.lastmod ? `    <lastmod>${f.lastmod}</lastmod>\n` : '') +
      (f.changefreq ? `    <changefreq>${f.changefreq}</changefreq>\n` : '') +
      (f.priority != null ? `    <priority>${f.priority}</priority>\n` : '') +
      "  </url>"
    )).join('\n') +
    "\n</urlset>";

  res.setHeader('Content-Type', 'text/xml');
  res.write(xml);
  res.end();
  return { props: {} };
};

// Default export to prevent next.js errors
export default function Sitemap() {}
