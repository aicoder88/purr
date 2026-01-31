import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found | Purrify',
  description: "We couldn't find the page you were looking for. Please check the URL or navigate to another section of our site.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'none',
      'max-snippet': -1,
    },
  },
};

const suggestedPages = [
  {
    title: 'Home',
    path: '/',
    description: 'Return to our homepage',
  },
  {
    title: 'Products',
    path: '/#products',
    description: 'Browse our cat litter additives',
  },
  {
    title: 'How It Works',
    path: '/#how-it-works',
    description: 'Learn how Purrify eliminates odors',
  },
  {
    title: 'Blog',
    path: '/blog',
    description: 'Read our latest articles on cat care',
  },
  {
    title: 'Contact',
    path: '/#contact',
    description: 'Get in touch with our team',
  },
];

export default function NotFound() {
  return (
    <div className="py-16 px-4 text-center max-w-3xl mx-auto">
      <div className="mb-8 flex justify-center">
        <Image
          src="/optimized/logo-text-120.webp"
          alt="Purrify Logo"
          width={120}
          height={120}
          className="h-20 w-auto animate-bounce"
        />
      </div>

      <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-[#5B2EFF]">
        404 - Page Not Found
      </h1>

      <p className="text-xl mb-8 text-gray-600">
        We couldn&apos;t find the page you were looking for. Please check the URL or navigate to another section of our site.
      </p>

      <div className="mb-12 p-4 bg-[#FFFFF5] rounded-lg border border-[#E0EFC7] shadow-sm">
        <h2 className="font-heading text-xl font-semibold mb-4 text-[#03E46A]">
          Looking for something?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {suggestedPages.map((page) => (
            <Link
              key={page.path}
              href={page.path}
              className="p-4 border border-[#E0EFC7] rounded-lg bg-white hover:bg-gray-50 hover:shadow-md transition-all duration-300 text-left flex flex-col"
            >
              <span className="font-medium text-[#5B2EFF]">{page.title}</span>
              <span className="text-sm text-gray-500">{page.description}</span>
            </Link>
          ))}
        </div>
      </div>

      <Link
        href="/"
        className="inline-block bg-gradient-to-r from-[#FF3131] to-[#FF3131]/80 hover:from-[#FF3131]/90 hover:to-[#FF3131]/70 text-white font-medium py-3 px-8 rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
      >
        Return Home
      </Link>
    </div>
  );
}
