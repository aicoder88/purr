const plugins = [];

try {
  // Tailwind should be present during builds
  // If it's missing, let the build fail so it can be fixed explicitly
  // eslint-disable-next-line import/no-extraneous-dependencies
  plugins.push(require('tailwindcss'));
} catch (e) {
  console.warn('Tailwind not installed. CSS may fail to compile.');
}

try {
  // Load autoprefixer if available; skip instead of crashing if absent
  // eslint-disable-next-line import/no-extraneous-dependencies
  plugins.push(require('autoprefixer'));
} catch (e) {
  console.warn('autoprefixer not installed; skipping vendor prefixing.');
}

module.exports = { plugins };
