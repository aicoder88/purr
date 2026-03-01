'use client';
import Link from "next/link";
import Script from "next/script";
import type { SVGProps } from "react";
import { Container } from "@/components/ui/container";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import {
  Instagram,
  Linkedin,
  Youtube,
  Facebook,
} from "lucide-react";
import { SOCIAL_LINKS } from "@/lib/constants";

const MediumIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
  </svg>
);

const TikTokIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M12.75 2a.75.75 0 0 1 .75.75c0 2.24 1.53 4.12 3.63 4.5.37.07.62.4.62.77v2.02a.75.75 0 0 1-1.03.7 6.3 6.3 0 0 1-2.47-1.4v6.67A4.82 4.82 0 1 1 8 11.5h.75a.75.75 0 0 1 .75.75v2.14a.75.75 0 0 1-1.02.7 1.83 1.83 0 0 0-.73-.15 1.82 1.82 0 1 0 1.82 1.83V3.5a.75.75 0 0 1 .75-.75h2.43Z" />
  </svg>
);


type SupportedLocale = 'en' | 'fr' | 'zh' | 'es';

const footerUiCopy: Record<SupportedLocale, {
  logoAlt: string;
  socialAria: {
    instagram: string;
    facebook: string;
    linkedin: string;
    youtube: string;
    tiktok: string;
    medium: string;
  };
  regions: {
    britishColumbia: string;
    alberta: string;
    ontario: string;
    quebec: string;
    atlanticCanada: string;
    prairies: string;
    north: string;
  };
}> = {
  en: {
    logoAlt: 'Purrify - Premium Activated Carbon Cat Litter Additive - Return to Home Page',
    socialAria: {
      instagram: 'Follow Purrify on Instagram',
      facebook: 'Follow Purrify on Facebook',
      linkedin: 'Follow Purrify on LinkedIn',
      youtube: 'Subscribe to Purrify on YouTube',
      tiktok: 'Follow Purrify on TikTok',
      medium: 'Read Purrify on Medium',
    },
    regions: {
      britishColumbia: 'British Columbia',
      alberta: 'Alberta',
      ontario: 'Ontario',
      quebec: 'Quebec',
      atlanticCanada: 'Atlantic Canada',
      prairies: 'Prairies',
      north: 'The North',
    },
  },
  fr: {
    logoAlt: "Purrify - Additif premium de charbon actif pour litiere - Retour a l'accueil",
    socialAria: {
      instagram: 'Suivre Purrify sur Instagram',
      facebook: 'Suivre Purrify sur Facebook',
      linkedin: 'Suivre Purrify sur LinkedIn',
      youtube: 'S abonner a Purrify sur YouTube',
      tiktok: 'Suivre Purrify sur TikTok',
      medium: 'Lire Purrify sur Medium',
    },
    regions: {
      britishColumbia: 'Colombie-Britannique',
      alberta: 'Alberta',
      ontario: 'Ontario',
      quebec: 'Quebec',
      atlanticCanada: 'Canada atlantique',
      prairies: 'Prairies',
      north: 'Le Nord',
    },
  },
  zh: {
    logoAlt: 'Purrify - 高端活性炭猫砂添加剂 - 返回首页',
    socialAria: {
      instagram: '在 Instagram 关注 Purrify',
      facebook: '在 Facebook 关注 Purrify',
      linkedin: '在 LinkedIn 关注 Purrify',
      youtube: '在 YouTube 订阅 Purrify',
      tiktok: '在 TikTok 关注 Purrify',
      medium: '在 Medium 阅读 Purrify',
    },
    regions: {
      britishColumbia: '不列颠哥伦比亚省',
      alberta: '阿尔伯塔省',
      ontario: '安大略省',
      quebec: '魁北克省',
      atlanticCanada: '加拿大大西洋地区',
      prairies: '草原省份',
      north: '北部地区',
    },
  },
  es: {
    logoAlt: 'Purrify - Aditivo premium de carbon activado para arena - Volver al inicio',
    socialAria: {
      instagram: 'Seguir a Purrify en Instagram',
      facebook: 'Seguir a Purrify en Facebook',
      linkedin: 'Seguir a Purrify en LinkedIn',
      youtube: 'Suscribirse a Purrify en YouTube',
      tiktok: 'Seguir a Purrify en TikTok',
      medium: 'Leer Purrify en Medium',
    },
    regions: {
      britishColumbia: 'Columbia Britanica',
      alberta: 'Alberta',
      ontario: 'Ontario',
      quebec: 'Quebec',
      atlanticCanada: 'Canada Atlantico',
      prairies: 'Praderas',
      north: 'El Norte',
    },
  },
};


// Shared class strings — defined once to avoid repeating long strings on every element.
const footerLinkClass =
  'text-[#333333]/80 dark:text-gray-300 hover:text-[#991D1D] dark:hover:text-[#FF8585] transition-colors duration-300';

const footerLegalLinkClass =
  'inline-flex min-h-[44px] items-center px-1 text-xs text-[#333333]/80 dark:text-gray-300 hover:text-[#991D1D] dark:hover:text-[#FF8585] transition-colors duration-300';

const footerHeadingClass =
  'font-heading text-sm font-semibold text-[#333333] dark:text-gray-100';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const t = useTranslations();
  const locale = useLocale();
  const copy = footerUiCopy[locale as SupportedLocale] || footerUiCopy.en;

  // Create localized path prefix
  const localePrefix = locale === 'en' ? '' : `/${locale}`;

  return (
    <footer className="bg-[#FFFFF5] dark:bg-gray-900 border-t border-[#E0EFC7] dark:border-gray-800 transition-colors duration-300">
      <Container>
        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            <div className="space-y-4">
              <div className="flex items-center mb-4">
                <Link prefetch={false} href={localePrefix || '/'} className="group">
                  <div className="h-6 w-auto mr-2 flex items-center">
                    <Image
                      src="/optimized/logos/logo-light-pink.webp"
                      alt={copy.logoAlt}
                      width={120}
                      height={24}
                      className="h-6 w-auto object-contain dark:hidden"
                    />
                    <Image
                      src="/optimized/logos/logo-dark.webp"
                      alt={copy.logoAlt}
                      width={84}
                      height={40}
                      loading="lazy"
                      className="h-full w-auto filter drop-shadow-sm transition-all duration-300 hidden dark:block"
                    />
                  </div>
                </Link>
              </div>
              <p className="text-sm text-[#333333]/80 dark:text-gray-300">
                {t('siteDescription')}
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={SOCIAL_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full text-[#333333]/70 dark:text-gray-400 hover:text-[#991D1D] dark:hover:text-[#FF8585] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#991D1D] dark:focus-visible:ring-[#FF8585] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFFFF5] dark:focus-visible:ring-offset-gray-900 transition-colors duration-300"
                  aria-label={copy.socialAria.instagram}
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href={SOCIAL_LINKS.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full text-[#333333]/70 dark:text-gray-400 hover:text-[#991D1D] dark:hover:text-[#FF8585] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#991D1D] dark:focus-visible:ring-[#FF8585] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFFFF5] dark:focus-visible:ring-offset-gray-900 transition-colors duration-300"
                  aria-label={copy.socialAria.facebook}
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full text-[#333333]/70 dark:text-gray-400 hover:text-[#991D1D] dark:hover:text-[#FF8585] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#991D1D] dark:focus-visible:ring-[#FF8585] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFFFF5] dark:focus-visible:ring-offset-gray-900 transition-colors duration-300"
                  aria-label={copy.socialAria.linkedin}
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href={SOCIAL_LINKS.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full text-[#333333]/70 dark:text-gray-400 hover:text-[#991D1D] dark:hover:text-[#FF8585] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#991D1D] dark:focus-visible:ring-[#FF8585] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFFFF5] dark:focus-visible:ring-offset-gray-900 transition-colors duration-300"
                  aria-label={copy.socialAria.youtube}
                >
                  <Youtube className="h-5 w-5" />
                </a>
                <a
                  href={SOCIAL_LINKS.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full text-[#333333]/70 dark:text-gray-400 hover:text-[#991D1D] dark:hover:text-[#FF8585] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#991D1D] dark:focus-visible:ring-[#FF8585] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFFFF5] dark:focus-visible:ring-offset-gray-900 transition-colors duration-300"
                  aria-label={copy.socialAria.tiktok}
                >
                  <TikTokIcon className="h-5 w-5" />
                </a>
                <a
                  href={SOCIAL_LINKS.medium}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full text-[#333333]/70 dark:text-gray-400 hover:text-[#991D1D] dark:hover:text-[#FF8585] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#991D1D] dark:focus-visible:ring-[#FF8585] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFFFF5] dark:focus-visible:ring-offset-gray-900 transition-colors duration-300"
                  aria-label={copy.socialAria.medium}
                >
                  <MediumIcon className="h-5 w-5" />
                </a>
              </div>

              {/* Trust Badges section removed here */}
            </div>

            <div className="space-y-4">
              <h3 className={footerHeadingClass}>
                {t('footerNav.products')}
              </h3>
              <ul className="space-y-2 text-sm dark:text-sm">
                <li>
                  <Link prefetch={false}
                    href={locale === "fr" ? "/fr/stores/" : "/stores/"}
                    className={`${footerLinkClass} font-medium`}
                  >
                    {t('nav.findStore') || "Find a Store"}
                  </Link>
                </li>
                <li>
                  <Link prefetch={false}
                    href={locale === "fr" ? "/fr/products/" : "/products/"}
                    className={footerLinkClass}
                  >
                    {t('footerNav.compareSizes')}
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className={footerHeadingClass}>
                {t('footerNav.learn')}
              </h3>
              <ul className="space-y-2 text-sm dark:text-sm">
                <li>
                  <Link prefetch={false}
                    href={`${localePrefix}/learn/how-it-works/`}
                    className={footerLinkClass}
                  >
                    {t('footerNav.howItWorks')}
                  </Link>
                </li>
                <li>
                  <Link prefetch={false}
                    href={`${localePrefix}/learn/faq/`}
                    className={footerLinkClass}
                  >
                    {t('footerNav.faq')}
                  </Link>
                </li>
                <li>
                  <Link prefetch={false}
                    href={`${localePrefix}/learn/science/`}
                    className={footerLinkClass}
                  >
                    {t('footerNav.science')}
                  </Link>
                </li>
                <li>
                  <Link prefetch={false}
                    href={`${localePrefix}/blog/activated-carbon-vs-baking-soda-comparison/`}
                    className={footerLinkClass}
                  >
                    {t('footerNav.carbonVsBakingSoda') || "Carbon vs Baking Soda"}
                  </Link>
                </li>
                <li>
                  <Link prefetch={false}
                    href={`${localePrefix}/learn/safety/`}
                    className={footerLinkClass}
                  >
                    {t('footerNav.safetyInfo')}
                  </Link>
                </li>
                <li>
                  <Link prefetch={false}
                    href={`${localePrefix}/learn/cat-litter-guide/`}
                    className={footerLinkClass}
                  >
                    {t('footerNav.catLitterGuide')}
                  </Link>
                </li>
                <li>
                  <Link prefetch={false}
                    href="/tools/cat-litter-calculator/"
                    className={footerLinkClass}
                  >
                    {t('footerNav.litterCalculator')}
                  </Link>
                </li>
                <li>
                  <Link prefetch={false}
                    href="/tools/smell-quiz/"
                    className={footerLinkClass}
                  >
                    {t('footerNav.smellQuiz') || "Smell Quiz"}
                  </Link>
                </li>
                <li>
                  <Link prefetch={false}
                    href="/tools/"
                    className={footerLinkClass}
                  >
                    {t('footerNav.toolsHub') || "All Tools"}
                  </Link>
                </li>
                <li>
                  <Link prefetch={false}
                    href={`${localePrefix}/blog/how-to-neutralize-ammonia-cat-litter/`}
                    className={footerLinkClass}
                  >
                    {t('footerNav.ammoniaSolutions') || "Ammonia Smell Control"}
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className={footerHeadingClass}>
                {t('footerNav.popularArticles')}
              </h3>
              <ul className="space-y-2 text-sm dark:text-sm">
                <li>
                  <Link prefetch={false}
                    href={`${localePrefix}/blog/house-smells-like-cat-litter-solutions/`}
                    className={footerLinkClass}
                  >
                    {t('footerNav.houseSmells')}
                  </Link>
                </li>
                <li>
                  <Link prefetch={false}
                    href={`${localePrefix}/blog/multi-cat-litter-deodorizer-guide/`}
                    className={footerLinkClass}
                  >
                    {t('footerNav.multiCatGuide')}
                  </Link>
                </li>
                <li>
                  <Link prefetch={false}
                    href={`${localePrefix}/blog/tried-everything-cat-litter-smell-solutions/`}
                    className={footerLinkClass}
                  >
                    {t('footerNav.triedEverything')}
                  </Link>
                </li>
                <li>
                  <Link prefetch={false}
                    href={`${localePrefix}/blog/most-powerful-odor-absorber/`}
                    className={footerLinkClass}
                  >
                    {t('footerNav.powerfulAbsorber')}
                  </Link>
                </li>
                <li>
                  <Link prefetch={false}
                    href={`${localePrefix}/blog/best-litter-odor-remover-small-apartments/`}
                    className={footerLinkClass}
                  >
                    {t('footerNav.smallApartments')}
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className={footerHeadingClass}>
                {t('footerNav.company')}
              </h3>
              <ul className="space-y-2 text-sm dark:text-sm">
                <li>
                  <Link prefetch={false}
                    href={`${localePrefix}/about/our-story/`}
                    className={footerLinkClass}
                  >
                    {t('footerNav.about')}
                  </Link>
                </li>
                <li>
                  <Link prefetch={false}
                    href={`${localePrefix}/blog/`}
                    className={footerLinkClass}
                  >
                    {t('footerNav.blog')}
                  </Link>
                </li>
                <li>
                  <Link prefetch={false}
                    href={`${localePrefix}/reviews/`}
                    className={footerLinkClass}
                  >
                    {t('footerNav.testimonials')}
                  </Link>
                </li>
                <li>
                  <Link prefetch={false}
                    href={`${localePrefix}/retailers/`}
                    className={footerLinkClass}
                  >
                    {t('footerNav.retailers')}
                  </Link>
                </li>
                <li>
                  <Link prefetch={false}
                    href={`${localePrefix}/retailer/portal/login/`}
                    className={footerLinkClass}
                  >
                    {t('footerNav.retailerPortal') || "Retailer Portal"}
                  </Link>
                </li>
                <li>
                  <Link prefetch={false}
                    href={`${localePrefix}/b2b/`}
                    className={footerLinkClass}
                  >
                    {t('footerNav.b2bInquiry') || "B2B Inquiry"}
                  </Link>
                </li>
                <li>
                  <Link prefetch={false}
                    href={`${localePrefix}/affiliate/`}
                    className={footerLinkClass}
                  >
                    {t('footerNav.affiliateProgram')}
                  </Link>
                </li>
                <li>
                  <Link prefetch={false}
                    href={`${localePrefix}/invest/`}
                    className={footerLinkClass}
                  >
                    {t('footerNav.contact')}
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className={footerHeadingClass}>
                {t('footerNav.locations') || "Locations"}
              </h3>
              <ul className="space-y-2 text-sm dark:text-sm">
                <li>
                  <Link prefetch={false}
                    href={`${localePrefix}/locations/`}
                    className={footerLinkClass}
                  >
                    {t('footerNav.allLocations') || "All Locations"}
                  </Link>
                </li>
                <li>
                  <Link prefetch={false}
                    href={`${localePrefix}/locations/province/british-columbia/`}
                    className={footerLinkClass}
                  >
                    {copy.regions.britishColumbia}
                  </Link>
                </li>
                <li>
                  <Link prefetch={false}
                    href={`${localePrefix}/locations/province/alberta/`}
                    className={footerLinkClass}
                  >
                    {copy.regions.alberta}
                  </Link>
                </li>
                <li>
                  <Link prefetch={false}
                    href={`${localePrefix}/locations/province/ontario/`}
                    className={footerLinkClass}
                  >
                    {copy.regions.ontario}
                  </Link>
                </li>
                <li>
                  <Link prefetch={false}
                    href={`${localePrefix}/locations/province/quebec/`}
                    className={footerLinkClass}
                  >
                    {copy.regions.quebec}
                  </Link>
                </li>
              </ul>
            </div>
          </div>



          <div className="mt-12 pt-8 border-t border-[#E0EFC7] dark:border-gray-800">
            <div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-4 mb-4">
              <Link prefetch={false}
                href={`${localePrefix}/privacy-policy/`}
                className={footerLegalLinkClass}
              >
                {t('nav.privacyPolicy')}
              </Link>
              <Link prefetch={false}
                href={`${localePrefix}/terms/`}
                className={footerLegalLinkClass}
              >
                {t('nav.termsOfService')}
              </Link>
              <Link prefetch={false}
                href="/sitemap.xml"
                className={footerLegalLinkClass}
              >
                {t('footerNav.sitemap') || "Sitemap"}
              </Link>
            </div>
            <p className="text-center text-xs text-[#333333]/80 dark:text-gray-300">
              © {currentYear}{" "}
              <span className="text-[#991D1D] dark:text-[#FF8585] font-medium">
                {t('siteName')}
              </span>{" "}
              | {t('footer.allRightsReserved')}
            </p>
          </div>
        </div>
      </Container>

      {/* Chat Plugin */}
      <Script
        src="https://app.simplebotinstall.com/js/chat_plugin.js"
        data-bot-id="40892"
        strategy="lazyOnload"
        defer
      />
    </footer>
  );
}
