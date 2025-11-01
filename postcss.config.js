// Next.js requires PostCSS plugins to be specified as strings, not functions
// See: https://nextjs.org/docs/messages/postcss-shape
const plugins = {};

try {
  require.resolve('tailwindcss');
  plugins['tailwindcss'] = {};
} catch (e) {
  console.warn('tailwindcss not installed. CSS may fail to compile.');
}

try {
  require.resolve('autoprefixer');
  plugins['autoprefixer'] = {};
} catch (e) {
  console.warn('autoprefixer not installed; skipping vendor prefixing.');
}

module.exports = { plugins };
