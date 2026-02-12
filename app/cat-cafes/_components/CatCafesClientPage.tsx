'use client';

import { useTranslation } from '@/lib/translation-context';
import { SITE_NAME, CONTACT_INFO } from '@/lib/constants';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { scrollToSection } from '@/lib/utils';
import Link from 'next/link';
import { B2BCaseStudies } from '@/components/sections/b2b-case-studies';
import { ChevronRight, Home } from 'lucide-react';

export default function CatCafesClientPage() {
  const { t, locale } = useTranslation();
  const wholesaleEmail = 'wholesale@purrify.ca';
  const breadcrumbAriaLabel =
    locale === 'fr'
      ? 'Fil d Ariane'
      : locale === 'zh'
        ? '面包屑导航'
        : locale === 'es'
          ? 'Miga de pan'
          : 'Breadcrumb';
  const homeLabel = t.nav?.home || 'Home';
  const catCafesLabel =
    locale === 'fr'
      ? 'Cafes a chats'
      : locale === 'zh'
        ? '猫咖'
        : locale === 'es'
          ? 'Cafes de gatos'
          : 'Cat Cafes';

  // Breadcrumb items
  const breadcrumbItems = [
    { name: homeLabel, path: locale === 'en' ? '/' : `/${locale}` },
    { name: catCafesLabel, path: `${locale === 'en' ? '' : `/${locale}`}/cat-cafes` },
  ];

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      {/* Breadcrumb Navigation */}
      <div className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
        <Container>
          <nav aria-label={breadcrumbAriaLabel} className="py-3">
            <ol className="flex items-center space-x-2 text-sm">
              {breadcrumbItems.map((item, index) => {
                const isLast = index === breadcrumbItems.length - 1;
                return (
                  <li key={item.path} className="flex items-center">
                    {index > 0 && (
                      <ChevronRight className="h-4 w-4 mx-2 text-gray-400 dark:text-gray-500" />
                    )}
                    {index === 0 ? (
                      <Link
                        href={item.path}
                        className="text-gray-600 dark:text-gray-400 hover:text-[#5B2EFF] dark:hover:text-[#3694FF] transition-colors"
                      >
                        <Home className="h-4 w-4" />
                        <span className="sr-only">{item.name}</span>
                      </Link>
                    ) : isLast ? (
                      <span
                        className="font-medium text-gray-900 dark:text-gray-100"
                        aria-current="page"
                      >
                        {item.name}
                      </span>
                    ) : (
                      <Link
                        href={item.path}
                        className="text-gray-600 dark:text-gray-400 hover:text-[#5B2EFF] dark:hover:text-[#3694FF] transition-colors"
                      >
                        {item.name}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
        </Container>
      </div>

      {/* Hero Section */}
      <section className="relative w-full pt-24 pb-16 overflow-hidden bg-gradient-to-br from-[#5B2EFF]/8 via-white to-[#3694FF]/8 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
        {/* Background decorations */}
        <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-r from-[#5B2EFF]/20 to-[#3694FF]/20 dark:from-[#3694FF]/10 dark:to-[#5B2EFF]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-l from-[#3694FF]/20 to-[#5B2EFF]/20 dark:from-[#5B2EFF]/10 dark:to-[#3694FF]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <Container className="relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Top Badge */}
            <div className="text-center mb-8">
              <span className="inline-flex items-center px-6 py-3 rounded-full text-sm font-bold bg-gradient-to-r from-[#5B2EFF]/15 to-[#3694FF]/15 dark:from-[#3694FF]/25 dark:to-[#5B2EFF]/25 text-[#5B2EFF] dark:text-[#3694FF] border-2 border-[#5B2EFF]/30 dark:border-[#3694FF]/40 shadow-lg">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                {t.catCafes?.hero?.badge || 'Cat Cafe Partnership'}
              </span>
            </div>

            {/* Main Content Split Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Main Message */}
              <div className="text-center lg:text-left">
                <h1 className="font-heading text-4xl md:text-6xl font-black tracking-tight leading-[0.9] mb-6">
                  <span className="block text-gray-900 dark:text-gray-50">
                    {t.catCafes?.hero?.titleLine1 || 'Keep Your Cat Cafe'}
                  </span>
                  <span className="block bg-gradient-to-r from-[#5B2EFF] to-[#3694FF] bg-clip-text text-transparent">
                    {t.catCafes?.hero?.titleLine2 || 'Fresh All Day'}
                  </span>
                </h1>

                <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-200 mb-8 leading-relaxed">
                  {t.catCafes?.hero?.description || 'High-visibility locations need constant freshness. Keep guests coming back with Purrify\'s fragrance-free odor elimination.'}
                </p>

                {/* Key Stats */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="text-center p-4 bg-white dark:bg-gray-800/50 rounded-xl backdrop-blur-sm shadow-lg">
                    <div className="text-3xl font-black text-[#5B2EFF] dark:text-[#3694FF]">7+</div>
                    <div className="text-sm font-semibold text-gray-600 dark:text-gray-300">{t.catCafes?.hero?.stats?.days || 'Days Fresh'}</div>
                  </div>
                  <div className="text-center p-4 bg-white dark:bg-gray-800/50 rounded-xl backdrop-blur-sm shadow-lg">
                    <div className="text-3xl font-black text-brand-green-700 dark:text-[#34D399]">0</div>
                    <div className="text-sm font-semibold text-gray-600 dark:text-gray-300">{t.catCafes?.hero?.stats?.fragrances || 'Fragrances'}</div>
                  </div>
                  <div className="text-center p-4 bg-white dark:bg-gray-800/50 rounded-xl backdrop-blur-sm shadow-lg">
                    <div className="text-3xl font-black text-[#FF6B6B] dark:text-[#FF8E8E]">100%</div>
                    <div className="text-sm font-semibold text-gray-600 dark:text-gray-300">{t.catCafes?.hero?.stats?.natural || 'Natural'}</div>
                  </div>
                </div>

                {/* Primary CTA */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button
                    onClick={() => scrollToSection('cafe-contact')}
                    size="lg"
                    className="bg-gradient-to-r from-[#5B2EFF] to-[#3694FF] hover:from-[#4C1EEB] hover:to-[#2563EB] text-white dark:text-gray-100 font-black py-6 px-10 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 active:scale-95 border-0 transform hover:-translate-y-2 text-lg"
                  >
                    {t.catCafes?.hero?.cta?.primary || 'Request Cafe Sample Kit'}
                  </Button>
                  <Link href="/retailers" passHref legacyBehavior>
                    <Button
                      size="lg"
                      variant="outline"
                      className="bg-white dark:bg-gray-800/80 text-[#5B2EFF] dark:text-[#3694FF] font-bold py-6 px-10 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 active:scale-95 border-2 border-[#5B2EFF]/50 dark:border-[#3694FF]/50 hover:bg-[#5B2EFF] dark:hover:bg-[#3694FF] hover:text-white transform hover:-translate-y-2 backdrop-blur-sm"
                    >
                      {t.catCafes?.hero?.cta?.secondary || 'View Wholesale Pricing'}
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Right Column - Value Props */}
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center mb-4">
                    <div className="w-14 h-14 bg-gradient-to-r from-[#5B2EFF] to-[#3694FF] rounded-xl flex items-center justify-center mr-4">
                      <svg className="w-8 h-8 text-white dark:text-gray-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-heading font-black text-xl text-gray-900 dark:text-gray-50">{t.catCafes?.valueProps?.guestExperience?.title || 'Guest Experience First'}</h3>
                      <p className="text-[#5B2EFF] dark:text-[#3694FF] font-bold">{t.catCafes?.valueProps?.guestExperience?.highlight || 'Notice freshness, not products'}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-200">{t.catCafes?.valueProps?.guestExperience?.description || 'Guests enjoy the cats, not masked odors. Purrify works silently in the background.'}</p>
                </div>

                <div className="bg-white dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center mb-4">
                    <div className="w-14 h-14 bg-gradient-to-r from-[#10B981] to-[#34D399] rounded-xl flex items-center justify-center mr-4">
                      <svg className="w-8 h-8 text-white dark:text-gray-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-heading font-black text-xl text-gray-900 dark:text-gray-50">{t.catCafes?.valueProps?.catSafe?.title || 'Cat-Friendly Formula'}</h3>
                      <p className="text-brand-green-700 dark:text-[#34D399] font-bold">{t.catCafes?.valueProps?.catSafe?.highlight || 'No irritants or chemicals'}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-200">{t.catCafes?.valueProps?.catSafe?.description || 'Natural coconut shell activated carbon. No fragrances that could irritate cats or guests with sensitivities.'}</p>
                </div>

                <div className="bg-white dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center mb-4">
                    <div className="w-14 h-14 bg-gradient-to-r from-[#FF6B6B] to-[#FF8E8E] rounded-xl flex items-center justify-center mr-4">
                      <svg className="w-8 h-8 text-white dark:text-gray-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-heading font-black text-xl text-gray-900 dark:text-gray-50">{t.catCafes?.valueProps?.quickApply?.title || 'Quick Application'}</h3>
                      <p className="text-[#FF6B6B] dark:text-[#FF8E8E] font-bold">{t.catCafes?.valueProps?.quickApply?.highlight || '60 seconds per box'}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-200">{t.catCafes?.valueProps?.quickApply?.description || 'Easy to apply between service rushes. No complicated setup or maintenance required.'}</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* The Challenge Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-5xl font-black text-gray-900 dark:text-gray-50 mb-4">
                {t.catCafes?.challenge?.title || 'The Cat Cafe Challenge'}
              </h2>
              <p className="text-xl text-gray-700 dark:text-gray-200">
                {t.catCafes?.challenge?.subtitle || 'Running a cat cafe means managing unique odor challenges'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 dark:text-gray-50 mb-2">{t.catCafes?.challenge?.items?.multipleCats?.title || 'Multiple Cats, One Space'}</h3>
                    <p className="text-gray-700 dark:text-gray-300">{t.catCafes?.challenge?.items?.multipleCats?.description || 'Multiple cats in an enclosed space means odors accumulate faster than a typical home.'}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 dark:text-gray-50 mb-2">{t.catCafes?.challenge?.items?.guestExpectations?.title || 'Guest Expectations'}</h3>
                    <p className="text-gray-700 dark:text-gray-300">{t.catCafes?.challenge?.items?.guestExpectations?.description || 'Visitors expect a fresh, pleasant environment. First impressions determine reviews and return visits.'}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 dark:text-gray-50 mb-2">{t.catCafes?.challenge?.items?.fragranceOverwhelm?.title || 'Fragrance Overload'}</h3>
                    <p className="text-gray-700 dark:text-gray-300">{t.catCafes?.challenge?.items?.fragranceOverwhelm?.description || 'Traditional scented solutions can overwhelm guests and irritate cats. You need subtle, effective control.'}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 dark:text-gray-50 mb-2">{t.catCafes?.challenge?.items?.constantMaintenance?.title || 'Constant Maintenance'}</h3>
                    <p className="text-gray-700 dark:text-gray-300">{t.catCafes?.challenge?.items?.constantMaintenance?.description || 'Staff time is precious. You need a solution that works continuously without hourly attention.'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* The Solution Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-[#10B981]/10 to-[#34D399]/10 dark:from-[#10B981]/20 dark:to-[#34D399]/20 text-brand-green-700 dark:text-[#34D399] font-bold text-sm mb-4">
                {t.catCafes?.solution?.badge || 'The Purrify Solution'}
              </div>
              <h2 className="font-heading text-3xl md:text-5xl font-black text-gray-900 dark:text-gray-50 mb-4">
                {t.catCafes?.solution?.title || 'Freshness That Works in the Background'}
              </h2>
              <p className="text-xl text-gray-700 dark:text-gray-200 max-w-2xl mx-auto">
                {t.catCafes?.solution?.subtitle || 'Activated carbon technology that traps odor molecules at the source - no fragrances, no chemicals, just fresh air.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-gradient-to-br from-[#5B2EFF]/5 to-[#3694FF]/10 dark:from-[#5B2EFF]/10 dark:to-[#3694FF]/20 rounded-2xl border border-[#5B2EFF]/20 dark:border-[#3694FF]/30">
                <div className="w-16 h-16 bg-gradient-to-r from-[#5B2EFF] to-[#3694FF] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white dark:text-gray-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-2.829a5 5 0 010-7.07m7.072 0a5 5 0 010 7.07M13 12a1 1 0 11-2 0 1 1 0 012 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-gray-50 mb-2">{t.catCafes?.solution?.features?.silent?.title || 'Silent Operation'}</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">{t.catCafes?.solution?.features?.silent?.description || 'Works without any noise or visible equipment'}</p>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-[#10B981]/5 to-[#34D399]/10 dark:from-[#10B981]/10 dark:to-[#34D399]/20 rounded-2xl border border-[#10B981]/20 dark:border-[#34D399]/30">
                <div className="w-16 h-16 bg-gradient-to-r from-[#10B981] to-[#34D399] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white dark:text-gray-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-gray-50 mb-2">{t.catCafes?.solution?.features?.noFragrance?.title || 'No Perfume Smell'}</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">{t.catCafes?.solution?.features?.noFragrance?.description || 'Guests notice freshness, not masking scents'}</p>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-[#FF6B6B]/5 to-[#FF8E8E]/10 dark:from-[#FF6B6B]/10 dark:to-[#FF8E8E]/20 rounded-2xl border border-[#FF6B6B]/20 dark:border-[#FF8E8E]/30">
                <div className="w-16 h-16 bg-gradient-to-r from-[#FF6B6B] to-[#FF8E8E] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white dark:text-gray-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-gray-50 mb-2">{t.catCafes?.solution?.features?.sevenDays?.title || '7-Day Protection'}</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">{t.catCafes?.solution?.features?.sevenDays?.description || 'Long-lasting freshness per application'}</p>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-[#F59E0B]/5 to-[#FBBF24]/10 dark:from-[#F59E0B]/10 dark:to-[#FBBF24]/20 rounded-2xl border border-[#F59E0B]/20 dark:border-[#FBBF24]/30">
                <div className="w-16 h-16 bg-gradient-to-r from-[#F59E0B] to-[#FBBF24] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white dark:text-gray-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-gray-50 mb-2">{t.catCafes?.solution?.features?.multiCat?.title || 'Multi-Cat Ready'}</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">{t.catCafes?.solution?.features?.multiCat?.description || 'Designed for high-traffic environments'}</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Case Studies */}
      <B2BCaseStudies businessType="catCafe" limit={1} />

      {/* Partnership Benefits Section */}
      <section className="py-16 bg-gradient-to-br from-[#5B2EFF]/5 via-white to-[#3694FF]/5 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-5xl font-black text-gray-900 dark:text-gray-50 mb-4">
                {t.catCafes?.partnership?.title || 'Cat Cafe Partnership Benefits'}
              </h2>
              <p className="text-xl text-gray-700 dark:text-gray-200">
                {t.catCafes?.partnership?.subtitle || 'We support your business with more than just product'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
                <div className="w-12 h-12 bg-gradient-to-r from-[#5B2EFF] to-[#3694FF] rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white dark:text-gray-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <h3 className="font-heading font-black text-xl text-gray-900 dark:text-gray-50 mb-3">{t.catCafes?.partnership?.benefits?.volumePricing?.title || 'Volume Pricing'}</h3>
                <p className="text-gray-700 dark:text-gray-300">{t.catCafes?.partnership?.benefits?.volumePricing?.description || 'Special pricing tiers for cat cafes. The more you order, the more you save on each application.'}</p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
                <div className="w-12 h-12 bg-gradient-to-r from-[#10B981] to-[#34D399] rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white dark:text-gray-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-heading font-black text-xl text-gray-900 dark:text-gray-50 mb-3">{t.catCafes?.partnership?.benefits?.regularDelivery?.title || 'Regular Delivery Scheduling'}</h3>
                <p className="text-gray-700 dark:text-gray-300">{t.catCafes?.partnership?.benefits?.regularDelivery?.description || 'Set up automatic deliveries so you never run out. Adjust frequency based on your needs.'}</p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
                <div className="w-12 h-12 bg-gradient-to-r from-[#FF6B6B] to-[#FF8E8E] rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white dark:text-gray-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                  </svg>
                </div>
                <h3 className="font-heading font-black text-xl text-gray-900 dark:text-gray-50 mb-3">{t.catCafes?.partnership?.benefits?.marketing?.title || 'Marketing Collaboration'}</h3>
                <p className="text-gray-700 dark:text-gray-300">{t.catCafes?.partnership?.benefits?.marketing?.description || 'Cross-promotion opportunities. Feature your cafe on our social media and website.'}</p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
                <div className="w-12 h-12 bg-gradient-to-r from-[#F59E0B] to-[#FBBF24] rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white dark:text-gray-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="font-heading font-black text-xl text-gray-900 dark:text-gray-50 mb-3">{t.catCafes?.partnership?.benefits?.storeLocator?.title || 'Store Locator Feature'}</h3>
                <p className="text-gray-700 dark:text-gray-300">{t.catCafes?.partnership?.benefits?.storeLocator?.description || 'Get listed on our partner map. Cat lovers searching for Purrify can discover your cafe.'}</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Contact Form Section */}
      <section id="cafe-contact" className="py-16 bg-gray-50 dark:bg-gray-800">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-5xl font-black text-gray-900 dark:text-gray-50 mb-4">
                {t.catCafes?.contact?.title || 'Request Your Cafe Sample Kit'}
              </h2>
              <p className="text-xl text-gray-700 dark:text-gray-200">
                {t.catCafes?.contact?.subtitle || 'Experience the difference in your cafe. We\'ll send you a sample kit to try.'}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-2xl border border-gray-200 dark:border-gray-700">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-[#5B2EFF] to-[#3694FF] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white dark:text-gray-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                </div>
                <h3 className="font-heading text-2xl font-black text-gray-900 dark:text-gray-50 mb-2">
                  {t.catCafes?.contact?.formTitle || 'Get Started Today'}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {t.catCafes?.contact?.formSubtitle || `Fill out the form below or contact us directly at ${wholesaleEmail}`}
                </p>
              </div>

              <div className="space-y-6">
                <div className="bg-gradient-to-r from-[#5B2EFF]/10 to-[#3694FF]/10 dark:from-[#5B2EFF]/20 dark:to-[#3694FF]/20 rounded-2xl p-6 border border-[#5B2EFF]/20 dark:border-[#3694FF]/30">
                  <div className="flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-[#5B2EFF] dark:text-[#3694FF] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="font-black text-xl text-gray-900 dark:text-gray-50">{wholesaleEmail}</span>
                  </div>
                  <p className="text-center text-gray-700 dark:text-gray-300">
                    {t.catCafes?.contact?.emailPrompt || 'Email us with your cafe name, location, and number of cats. We\'ll respond within 24 hours with a custom quote.'}
                  </p>
                </div>

                <div className="text-center">
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{t.catCafes?.contact?.orText || 'Or visit our wholesale page for more information'}</p>
                  <Link href="/retailers" passHref legacyBehavior>
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-[#5B2EFF] to-[#3694FF] hover:from-[#4C1EEB] hover:to-[#2563EB] text-white dark:text-gray-100 font-black py-4 px-8 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300"
                    >
                      {t.catCafes?.contact?.wholesaleButton || 'View Wholesale Details'}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
