'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Home, Package, BookOpen, MessageCircle, HelpCircle, Search, ArrowLeft, Cat } from 'lucide-react';
import { useState } from 'react';

const suggestedPages = [
  {
    title: 'Home',
    path: '/',
    description: 'Return to our homepage',
    icon: Home,
    color: 'from-[#5B2EFF] to-[#8B5CF6]',
  },
  {
    title: 'Products',
    path: '/products',
    description: 'Browse our cat litter additives',
    icon: Package,
    color: 'from-[#03E46A] to-[#10B981]',
  },
  {
    title: 'Blog',
    path: '/blog',
    description: 'Read our latest articles on cat care',
    icon: BookOpen,
    color: 'from-[#FF3131] to-[#EF4444]',
  },
  {
    title: 'Support',
    path: '/support',
    description: 'Get help with your questions',
    icon: HelpCircle,
    color: 'from-[#F59E0B] to-[#FBBF24]',
  },
  {
    title: 'Contact',
    path: '/contact',
    description: 'Get in touch with our team',
    icon: MessageCircle,
    color: 'from-[#EC4899] to-[#F472B6]',
  },
  {
    title: 'About',
    path: '/about',
    description: 'Learn about Purrify',
    icon: Cat,
    color: 'from-[#06B6D4] to-[#22D3EE]',
  },
];

export default function NotFound() {
  const [isHovered, setIsHovered] = useState<string | null>(null);

  return (
    <div className="min-h-[calc(100vh-200px)] py-8 md:py-16 px-4 bg-gradient-to-b from-[#FFFFF5] via-white to-[#F0FFF4] dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <div className="max-w-5xl mx-auto">
        {/* Hero Section with Fun Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          {/* Large 404 with Cat Paws */}
          <div className="relative inline-block mb-6">
            <motion.h1
              className="font-heading text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#5B2EFF] via-[#FF3131] to-[#03E46A]"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            >
              404
            </motion.h1>
            {/* Decorative paw prints */}
            <motion.div
              className="absolute -top-4 -right-8 text-[#FF3131] opacity-60"
              animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Cat className="w-12 h-12" />
            </motion.div>
            <motion.div
              className="absolute -bottom-2 -left-6 text-[#5B2EFF] opacity-40"
              animate={{ rotate: [0, -10, 10, 0], scale: [1, 0.9, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
            >
              <Cat className="w-8 h-8" />
            </motion.div>
          </div>

          <motion.h2
            className="font-heading text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Oops! This page has wandered off like a curious cat
          </motion.h2>

          <motion.p
            className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            We couldn&apos;t find the page you&apos;re looking for.
            It might have been moved, deleted, or never existed in the first place.
          </motion.p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Left: Fun Illustration */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="relative"
          >
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden border-4 border-[#E0EFC7] dark:border-white/10">
              <div className="relative aspect-square">
                <Image
                  src="/optimized/blog/cat-owner-questions-ghibli-640w.webp"
                  alt="A confused cat owner looking for answers"
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover"
                  priority
                />
                {/* Speech Bubble */}
                <motion.div
                  className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-2xl px-4 py-3 shadow-lg border-2 border-[#E0EFC7] dark:border-white/10"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.8, type: 'spring' }}
                >
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    &ldquo;Where did that page go?&rdquo; 🤔
                  </p>
                  <div className="absolute -bottom-2 left-6 w-4 h-4 bg-white dark:bg-gray-800 border-b-2 border-r-2 border-[#E0EFC7] dark:border-white/10 rotate-45"></div>
                </motion.div>
              </div>
              <div className="p-6 bg-gradient-to-r from-[#FFFFF5] to-white dark:from-gray-800/80 dark:to-gray-800">
                <h3 className="font-heading text-xl font-bold text-[#5B2EFF] dark:text-[#8B5CF6] mb-2">
                  Don&apos;t worry, we&apos;ll help you find your way!
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Just like our activated carbon finds and eliminates odors,
                  we&apos;ll help you find what you&apos;re looking for.
                </p>
              </div>
            </div>

            {/* Quick Return Button */}
            <motion.div
              className="mt-6"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href="/"
                className="group flex items-center justify-center gap-3 w-full bg-gradient-to-r from-[#FF3131] to-[#FF6B6B] hover:from-[#E60000] hover:to-[#FF5252] text-white font-bold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span>Take Me Home</span>
                <Cat className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Right: Navigation Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6 border border-[#E0EFC7] dark:border-white/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-[#5B2EFF] to-[#8B5CF6] rounded-xl">
                  <Search className="w-6 h-6 text-white dark:text-white" />
                </div>
                <h3 className="font-heading text-xl font-bold text-gray-800 dark:text-gray-200">
                  Where would you like to go?
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {suggestedPages.map((page, index) => {
                  const Icon = page.icon;
                  return (
                    <motion.div
                      key={page.path}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + index * 0.05 }}
                    >
                      <Link
                        href={page.path}
                        className={`group relative flex items-start gap-3 p-4 rounded-2xl border-2 transition-all duration-300 ${isHovered === page.path
                          ? 'border-transparent shadow-lg scale-[1.02] bg-white dark:bg-gray-700'
                          : 'border-gray-100 dark:border-gray-700 hover:border-[#E0EFC7] dark:hover:border-white/20 bg-white dark:bg-gray-800'
                          }`}
                        onMouseEnter={() => setIsHovered(page.path)}
                        onMouseLeave={() => setIsHovered(null)}
                      >
                        <div className={`p-2.5 rounded-xl bg-gradient-to-br ${page.color} shadow-md group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className="w-5 h-5 text-white dark:text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-800 dark:text-gray-200 group-hover:text-[#5B2EFF] dark:group-hover:text-[#8B5CF6] transition-colors">
                            {page.title}
                          </h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed">
                            {page.description}
                          </p>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Fun Fact Card */}
            <motion.div
              className="mt-6 bg-gradient-to-r from-[#03E46A]/10 via-[#5B2EFF]/10 to-[#FF3131]/10 dark:from-[#03E46A]/5 dark:via-[#5B2EFF]/5 dark:to-[#FF3131]/5 rounded-2xl p-5 border border-[#E0EFC7] dark:border-white/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                  <span className="text-2xl">💡</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 text-sm mb-1">
                    Did you know?
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                    Cats spend 70% of their lives sleeping. Maybe this page is just
                    taking a cat nap! In the meantime, try our{' '}
                    <Link href="/learn/science/" className="text-[#5B2EFF] hover:underline font-medium">
                      Science page
                    </Link>{' '}
                    to learn how Purrify works.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Search Suggestion */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Still can&apos;t find what you&apos;re looking for?{' '}
            <Link
              href="/contact/"
              className="text-[#5B2EFF] font-medium hover:underline inline-flex items-center gap-1"
            >
              Contact our support team
              <motion.span
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
