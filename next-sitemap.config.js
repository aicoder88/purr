/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://purrify.ca',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
  // Add any additional sitemap configuration here
};