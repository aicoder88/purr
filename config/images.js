const REMOTE_IMAGE_HOSTS = [
  "api.dicebear.com",
  "purrify.ca",
  "images.unsplash.com",
  "randomuser.me",
  "cdn.purrify.ca",
  "www.chico.ca",
  "pattesgriffes.com",
  "pitou-minou.ca",
  "www.doghausmtl.com",
  "scontent.fymq2-1.fna.fbcdn.net",
  "coquetteetfinegueule.com",
  "www.animaleriegigi.com",
];

/** @type {import('next').NextConfig['images']} */
const images = {
  remotePatterns: REMOTE_IMAGE_HOSTS.map((hostname) => ({
    protocol: "https",
    hostname,
  })),
  formats: ["image/avif", "image/webp"],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
  imageSizes: [16, 32, 48, 64, 96, 128, 180, 256, 384],
  qualities: [75, 90],
  minimumCacheTTL: 31536000,
  dangerouslyAllowSVG: true,
  contentDispositionType: 'attachment',
  contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox",
};

const OPTIMIZE_PACKAGE_IMPORTS = [
  "framer-motion",
  "recharts",
  // Radix UI packages
  "@radix-ui/react-accordion",
  "@radix-ui/react-alert-dialog",
  "@radix-ui/react-aspect-ratio",
  "@radix-ui/react-checkbox",
  "@radix-ui/react-collapsible",
  "@radix-ui/react-dialog",
  "@radix-ui/react-dropdown-menu",
  "@radix-ui/react-icons",
  "@radix-ui/react-label",
  "@radix-ui/react-navigation-menu",
  "@radix-ui/react-popover",
  "@radix-ui/react-progress",
  "@radix-ui/react-radio-group",
  "@radix-ui/react-scroll-area",
  "@radix-ui/react-select",
  "@radix-ui/react-separator",
  "@radix-ui/react-slider",
  "@radix-ui/react-switch",
  "@radix-ui/react-tabs",
  "@radix-ui/react-toast",
  "@radix-ui/react-toggle",
  "@radix-ui/react-tooltip",
  // Additional heavy packages for tree-shaking optimization
  "date-fns",
  "embla-carousel-react",
  "@tiptap/react",
  "@tiptap/starter-kit",
  "@emotion/react",
  "zod",
];

module.exports = { images, OPTIMIZE_PACKAGE_IMPORTS };
