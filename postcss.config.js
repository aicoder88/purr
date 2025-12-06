// Next.js requires PostCSS plugins to be specified as strings, not functions
// See: https://nextjs.org/docs/messages/postcss-shape
// Tailwind CSS v4 moved PostCSS plugin to @tailwindcss/postcss
const plugins = {};

try {
  require.resolve('@tailwindcss/postcss');
  plugins['@tailwindcss/postcss'] = {};
} catch (e) {
  console.warn('@tailwindcss/postcss not installed. CSS may fail to compile.');
}

try {
  require.resolve('autoprefixer');
  plugins['autoprefixer'] = {};
} catch (e) {
  console.warn('autoprefixer not installed; skipping vendor prefixing.');
}

module.exports = { plugins };
