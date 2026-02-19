'use client';
import Link from "next/link";
import Script from "next/script";
import type { SVGProps } from "react";
import { Container } from "@/components/ui/container";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import {
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  Facebook,
  ExternalLink,
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

interface BadgeConfig {
  key: string;
  url: string;
  icon: React.ReactNode;
  color: string;
  hoverColor: string;
}

type SupportedLocale = 'en' | 'fr' | 'zh' | 'es';

const footerUiCopy: Record<SupportedLocale, {
  logoAlt: string;
  socialAria: {
    instagram: string;
    x: string;
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
      x: 'Follow Purrify on X',
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
      x: 'Suivre Purrify sur X',
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
      x: '在 X 关注 Purrify',
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
      x: 'Seguir a Purrify en X',
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

const badgeConfigs: BadgeConfig[] = [
  {
    key: 'trustpilot',
    url: SOCIAL_LINKS.trustpilot,
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
      </svg>
    ),
    color: 'text-[#00B67A] dark:text-emerald-400',
    hoverColor: 'hover:bg-[#00B67A]/10 dark:hover:bg-[#00B67A]/20',
  },
  {
    key: 'googleBusiness',
    url: SOCIAL_LINKS.googleBusiness,
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
      </svg>
    ),
    color: 'text-[#4285F4] dark:text-blue-400',
    hoverColor: 'hover:bg-[#4285F4]/10 dark:hover:bg-[#4285F4]/20',
  },
  {
    key: 'crunchbase',
    url: SOCIAL_LINKS.crunchbase,
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M21.6 0H2.4A2.4 2.4 0 0 0 0 2.4v19.2A2.4 2.4 0 0 0 2.4 24h19.2a2.4 2.4 0 0 0 2.4-2.4V2.4A2.4 2.4 0 0 0 21.6 0zM7.045 14.465A2.11 2.11 0 0 1 4.87 12.3a2.11 2.11 0 0 1 2.175-2.164 2.084 2.084 0 0 1 2.165 2.164 2.084 2.084 0 0 1-2.165 2.165zm9.91 0a2.11 2.11 0 0 1-2.175-2.165 2.11 2.11 0 0 1 2.175-2.164 2.084 2.084 0 0 1 2.165 2.164 2.084 2.084 0 0 1-2.165 2.165z" />
      </svg>
    ),
    color: 'text-[#0288D1] dark:text-cyan-400',
    hoverColor: 'hover:bg-[#0288D1]/10 dark:hover:bg-[#0288D1]/20',
  },
  {
    key: 'productHunt',
    url: SOCIAL_LINKS.producthunt,
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.604 8.4h-3.405V12h3.405c.995 0 1.801-.806 1.801-1.8 0-.995-.806-1.8-1.801-1.8zM12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm1.604 14.4h-3.405V18H7.801V6h5.804c2.319 0 4.2 1.88 4.2 4.2 0 2.32-1.881 4.2-4.201 4.2z" />
      </svg>
    ),
    color: 'text-[#DA552F] dark:text-orange-400',
    hoverColor: 'hover:bg-[#DA552F]/10 dark:hover:bg-[#DA552F]/20',
  },
  {
    key: 'yelp',
    url: SOCIAL_LINKS.yelp,
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.16 12.594l-4.995 1.433c-.96.276-1.74-.8-1.176-1.63l2.905-4.308a1.072 1.072 0 0 1 1.596-.206 9.194 9.194 0 0 1 2.364 3.252 1.073 1.073 0 0 1-.686 1.459zm-5.025 3.152l4.942 1.606a1.072 1.072 0 0 1 .636 1.48 9.188 9.188 0 0 1-2.56 3.12 1.073 1.073 0 0 1-1.588-.263l-2.78-4.357c-.496-.778.196-1.754 1.076-1.586h.274zm-4.613-2.82l1.81 4.963a1.073 1.073 0 0 1-.464 1.265l-.073.037a9.21 9.21 0 0 1-3.981.942 1.073 1.073 0 0 1-1.09-1.146l.304-5.261c.063-1.062 1.57-1.478 2.11-.586l1.11 1.728a.074.074 0 0 0 .058.04l.217.017zm-1.032-3.084l-4.775-2.086a1.073 1.073 0 0 1-.562-1.417 9.196 9.196 0 0 1 2.07-3.526 1.073 1.073 0 0 1 1.644.021l3.103 4.025c.638.828-.048 1.97-1.05 1.74l-.43.243zm.136-6.022l1.48 5.07c.24.821-.65 1.525-1.415 1.12L4.912 7.333a1.073 1.073 0 0 1-.41-1.378 9.185 9.185 0 0 1 3.297-3.473 1.073 1.073 0 0 1 1.548.391l.24-.053z" />
      </svg>
    ),
    color: 'text-[#D32323] dark:text-red-400',
    hoverColor: 'hover:bg-[#D32323]/10 dark:hover:bg-[#D32323]/20',
  },
  {
    key: 'wellfound',
    url: SOCIAL_LINKS.wellfound,
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 4.8a2.4 2.4 0 1 1 0 4.8 2.4 2.4 0 0 1 0-4.8zm4.8 12H7.2v-1.2c0-2.21 1.79-4 4-4h1.6c2.21 0 4 1.79 4 4v1.2z" />
      </svg>
    ),
    color: 'text-[#000000] dark:text-gray-300',
    hoverColor: 'hover:bg-gray-100 dark:hover:bg-gray-800',
  },
];

// Default platform names for fallback
const defaultPlatformNames: Record<string, string> = {
  trustpilot: 'Trustpilot',
  googleBusiness: 'Google Business',
  crunchbase: 'Crunchbase',
  productHunt: 'Product Hunt',
  yelp: 'Yelp',
  wellfound: 'Wellfound',
};

export function Footer() {
  const currentYear = new Date().getFullYear();
  const t = useTranslations();
  const locale = useLocale();
  const localePrefix = locale === 'en' ? '' : `/${locale}`;
  const copy = footerUiCopy[locale as SupportedLocale] || footerUiCopy.en;

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
                      src="/optimized/logo-light-pink.webp"
                      alt={copy.logoAlt}
                      width={120}
                      height={57}
                      loading="lazy"
                      className="h-full w-auto filter drop-shadow-sm transition-all duration-300 dark:hidden"
                    />
                    <Image
                      src="/optimized/logo-dark.webp"
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
                  className="text-[#333333]/70 dark:text-gray-400 hover:text-[#991D1D] dark:hover:text-[#FF8585] transition-colors duration-300"
                  aria-label={copy.socialAria.instagram}
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href={SOCIAL_LINKS.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#333333]/70 dark:text-gray-400 hover:text-[#991D1D] dark:hover:text-[#FF8585] transition-colors duration-300"
                  aria-label={copy.socialAria.x}
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href={SOCIAL_LINKS.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#333333]/70 dark:text-gray-400 hover:text-[#991D1D] dark:hover:text-[#FF8585] transition-colors duration-300"
                  aria-label={copy.socialAria.facebook}
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#333333]/70 dark:text-gray-400 hover:text-[#991D1D] dark:hover:text-[#FF8585] transition-colors duration-300"
                  aria-label={copy.socialAria.linkedin}
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href={SOCIAL_LINKS.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#333333]/70 dark:text-gray-400 hover:text-[#991D1D] dark:hover:text-[#FF8585] transition-colors duration-300"
                  aria-label={copy.socialAria.youtube}
                >
                  <Youtube className="h-5 w-5" />
                </a>
                <a
                  href={SOCIAL_LINKS.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#333333]/70 dark:text-gray-400 hover:text-[#991D1D] dark:hover:text-[#FF8585] transition-colors duration-300"
                  aria-label={copy.socialAria.tiktok}
                >
                  <TikTokIcon className="h-5 w-5" />
                </a>
                <a
                  href={SOCIAL_LINKS.medium}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#333333]/70 dark:text-gray-400 hover:text-[#991D1D] dark:hover:text-[#FF8585] transition-colors duration-300"
                  aria-label={copy.socialAria.medium}
                >
                  <MediumIcon className="h-5 w-5" />
                </a>
              </div>

              {/* Trust Badges - Moved to bottom */}{/* Trust Badges section removed here */}
            </div>

            <div className="space-y-4">
              <h3 className="font-heading text-sm font-semibold text-[#333333] dark:text-gray-100">
                {t('footerNav.products')}
              </h3>
              <ul className="space-y-2 text-sm dark:text-sm">
                {/* B2C: HIDDEN PRODUCT PURCHASE LINKS
                <li>
                  <Link prefetch={false}
                    href={
                      locale === "fr"
                        ? "/fr/products/trial-size"
                        : "/products/trial-size"
                    }
                    className="text-[#333333]/80 dark:text-gray-300 hover:text-[#991D1D] dark:hover:text-[#FF8585] transition-colors duration-300"
                  >
                    {t('footerNav.trialSize')}
                  </Link>
                </li>
                <li>
                  <Link prefetch={false}
                    href={
                      locale === "fr"
                        ? "/fr/products/standard"
                        : "/products/standard"
                    }
                    className="text-[#333333]/80 dark:text-gray-300 hover:text-[#991D1D] dark:hover:text-[#FF8585] transition-colors duration-300"
                  >
                    {t('footerNav.standardSize')}
                  </Link>
                </li>
                <li>
                  <Link prefetch={false}
                    href={
                      locale === "fr"
                        ? "/fr/products/family-pack"
                        : "/products/family-pack"
                    }
                    className="text-[#333333]/80 dark:text-gray-300 hover:text-[#991D1D] dark:hover:text-[#FF8585] transition-colors duration-300"
                  >
                    {t('footerNav.familyPack')}
                  </Link>
                </li>
                */}
                <li>
                  <Link prefetch={false}
                    href={`${localePrefix}/stores`}
                    className="text-[#333333]/80 dark:text-gray-300 hover:text-[#991D1D] dark:hover:text-[#FF8585] transition-colors duration-300 font-medium"
                  >
                    {t('nav.findStore') || "Find a Store"}
                  </Link>
                </li>
                <li>
                  <Link prefetch={false}
                    href={`${localePrefix}/products`}
                    className="text-[#333333]/80 dark:text-gray-300 hover:text-[#991D1D] dark:hover:text-[#FF8585] transition-colors duration-300"
                  >
                    {t('footerNav.compareSizes')}
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-heading text-sm font-semibold text-[#333333] dark:text-gray-100">
                {t('footerNav.learn')}
              </h3>
              <ul className="space-y-2 text-sm dark:text-sm">
                <li>
                  <Link prefetch={false}
                    href={`${localePrefix}/learn/how-it-works`}
                    className="text-[#333333]/80 dark:text-gray-300 hover:text-[#991D1D] dark:hover:text-[#FF8585] transition-colors duration-300"
                  >
                    {t('footerNav.howItWorks')}
                  </Link>
                </li>
                <li>
                  <Link prefetch={false}
                    href={`${localePrefix}/learn/faq`}
                    className="text-[#333333]/80 dark:text-gray-300 hover:text-[#991D1D] dark:hover:text-[#FF8585] transition-colors duration-300"
                  >
                    {t('footerNav.faq')}
                  </Link>
                </li>
                <li>
                  <Link prefetch={false}
                    href={`${localePrefix}/learn/science`}
                    className="text-[#333333]/80 dark:text-gray-300 hover:text-[#991D1D] dark:hover:text-[#FF8585] transition-colors duration-300"
                  >
                    {t('footerNav.science')}
                  </Link>
                </li>
                <li>
                  <Link prefetch={false}
                    href={`${localePrefix}/blog/activated-carbon-vs-baking-soda-comparison`}
                    className="text-[#333333]/80 dark:text-gray-300 hover:text-[#991D1D] dark:hover:text-[#FF8585] transition-colors duration-300"
                  >
                    {t('footerNav.carbonVsBakingSoda') || "Carbon vs Baking Soda"}
                  </Link>
                </li>
                <li>
                  <Link prefetch={false}
                    href={`${localePrefix}/learn/safety`}
                    className="text-[#333333]/80 dark:text-gray-300 hover:text-[#991D1D] dark:hover:text-[#FF8585] transition-colors duration-300"
                  >
                    {t('footerNav.safetyInfo')}
                  </Link>
                </li>
                <li>
                  <Link prefetch={false}
                    href={`${localePrefix}/learn/cat-litter-guide`}
                    className="text-[#333333]/80 dark:text-gray-300 hover:text-[#991D1D] dark:hover:text-[#FF8585] transition-colors duration-300"
                  >
                    {t('footerNav.catLitterGuide')}
                  </Link>
                </li>
                <li>
                  <Link prefetch={false}
                    href={`${localePrefix}/blog/how-to-neutralize-ammonia-cat-litter`}
                    className="text-[#333333]/80 dark:text-gray-300 hover:text-[#991D1D] dark:hover:text-[#FF8585] transition-colors duration-300"
                  >
                    {t('footerNav.ammoniaSolutions') || "Ammonia Smell Control"}
                  </Link>
                </li>
                <li>
                  <Link prefetch={false}
                    href={`${localePrefix}/blog/best-litter-odor-remover-small-apartments`}
                    className="text-[#333333]/80 dark:text-gray-300 hover:text-[#991D1D] dark:hover:text-[#FF8585] transition-colors duration-300"
                  >
                    {t('nav.apartmentLiving') || "Apartment Living"}
                  </Link>
                </li>
                <li>
                  <Link prefetch={false}
                    href={`${localePrefix}/blog/how-to-eliminate-cat-litter-odor`}
                    className="text-[#333333]/80 dark:text-gray-300 hover:text-[#991D1D] dark:hover:text-[#FF8585] transition-colors duration-300"
                  >
                    {t('nav.litterBoxOdor') || "Litter Box Odor"}
                  </Link>
                </li>
                <li>
                  <Link prefetch={false}
                    href={`${localePrefix}/blog/best-cat-litter-multiple-cats-odor-control`}
                    className="text-[#333333]/80 dark:text-gray-300 hover:text-[#991D1D] dark:hover:text-[#FF8585] transition-colors duration-300"
                  >
                    {t('nav.multipleCats') || "Multiple Cats"}
                  </Link>
                </li>
                <li>
                  <Link prefetch={false}
                    href={`${localePrefix}/blog/best-natural-cat-litter-odor-control`}
                    className="text-[#333333]/80 dark:text-gray-300 hover:text-[#991D1D] dark:hover:text-[#FF8585] transition-colors duration-300"
                  >
                    {t('nav.naturalAdditive') || "Natural Additive"}
                  </Link>
                </li>
                <li>
                  <Link prefetch={false}
                    href={`${localePrefix}/blog/best-cat-litter-senior-cats`}
                    className="text-[#333333]/80 dark:text-gray-300 hover:text-[#991D1D] dark:hover:text-[#FF8585] transition-colors duration-300"
                  >
                    {t('nav.seniorCats') || "Senior Cats"}
                  </Link>
                </li>
                <li>
                  <Link prefetch={false}
                    href={`${localePrefix}/tools/cat-litter-calculator`}
                    className="text-[#333333]/80 dark:text-gray-300 hover:text-[#991D1D] dark:hover:text-[#FF8585] transition-colors duration-300"
                  >
                    {t('footerNav.litterCalculator') || "Litter Calculator"}
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-heading text-sm font-semibold text-[#333333] dark:text-gray-100">
                {t('footerNav.popularArticles')}
              </h3>
              <ul className="space-y-2 text-sm dark:text-sm">
                <li>
                  <Link prefetch={false}
                    href={`${localePrefix}/blog/house-smells-like-cat-litter-solutions`}
                    className="text-[#333333]/80 dark:text-gray-300 hover:text-[#991D1D] dark:hover:text-[#FF8585] transition-colors duration-300"
                  >
                    {t('footerNav.houseSmells')}
                  </Link>
                </li>
                <li>
                  <Link prefetch={false}
                    href={`${localePrefix}/blog/multi-cat-litter-deodorizer-guide`}
                    className="text-[#333333]/80 dark:text-gray-300 hover:text-[#991D1D] dark:hover:text-[#FF8585] transition-colors duration-300"
                  >
                    {t('footerNav.multiCatGuide')}
                  </Link>
                </li>
                <li>
                  <Link prefetch={false}
                    href={`${localePrefix}/blog/tried-everything-cat-litter-smell-solutions`}
                    className="text-[#333333]/80 dark:text-gray-300 hover:text-[#991D1D] dark:hover:text-[#FF8585] transition-colors duration-300"
                  >
                    {t('footerNav.triedEverything')}
                  </Link>
                </li>
                <li>
                  <Link prefetch={false}
                    href={`${localePrefix}/blog/most-powerful-odor-absorber`}
                    className="text-[#333333]/80 dark:text-gray-300 hover:text-[#991D1D] dark:hover:text-[#FF8585] transition-colors duration-300"
                  >
                    {t('footerNav.powerfulAbsorber')}
                  </Link>
                </li>
                <li>
                  <Link prefetch={false}
                    href={`${localePrefix}/blog/best-litter-odor-remover-small-apartments`}
                    className="text-[#333333]/80 dark:text-gray-300 hover:text-[#991D1D] dark:hover:text-[#FF8585] transition-colors duration-300"
                  >
                    {t('footerNav.smallApartments')}
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-heading text-sm font-semibold text-[#333333] dark:text-gray-100">
                {t('footerNav.company')}
              </h3>
              <ul className="space-y-2 text-sm dark:text-sm">
                <li>
                  <Link prefetch={false}
                    href={`${localePrefix}/about/our-story`}
                    className="text-[#333333]/80 dark:text-gray-300 hover:text-[#991D1D] dark:hover:text-[#FF8585] transition-colors duration-300"
                  >
                    {t('footerNav.about')}
                  </Link>
                </li>
                <li>
                  <Link prefetch={false}
                    href={`${localePrefix}/blog`}
                    className="text-[#333333]/80 dark:text-gray-300 hover:text-[#991D1D] dark:hover:text-[#FF8585] transition-colors duration-300"
                  >
                    {t('footerNav.blog')}
                  </Link>
                </li>
                <li>
                  <Link prefetch={false}
                    href={`${localePrefix}/reviews`}
                    className="text-[#333333]/80 dark:text-gray-300 hover:text-[#991D1D] dark:hover:text-[#FF8585] transition-colors duration-300"
                  >
                    {t('footerNav.testimonials')}
                  </Link>
                </li>
                <li>
                  <Link prefetch={false}
                    href={`${localePrefix}/retailers`}
                    className="text-[#333333]/80 dark:text-gray-300 hover:text-[#991D1D] dark:hover:text-[#FF8585] transition-colors duration-300"
                  >
                    {t('footerNav.retailers')}
                  </Link>
                </li>
                <li>
                  <Link prefetch={false}
                    href={`${localePrefix}/retailer/portal/login`}
                    className="text-[#333333]/80 dark:text-gray-300 hover:text-[#991D1D] dark:hover:text-[#FF8585] transition-colors duration-300"
                  >
                    {t('footerNav.retailerPortal') || "Retailer Portal"}
                  </Link>
                </li>
                <li>
                  <Link prefetch={false}
                    href={`${localePrefix}/hospitality`}
                    className="text-[#333333]/80 dark:text-gray-300 hover:text-[#991D1D] dark:hover:text-[#FF8585] transition-colors duration-300"
                  >
                    {t('footerNav.hospitality') || "Hospitality"}
                  </Link>
                </li>
                <li>
                  <Link prefetch={false}
                    href={`${localePrefix}/groomers`}
                    className="text-[#333333]/80 dark:text-gray-300 hover:text-[#991D1D] dark:hover:text-[#FF8585] transition-colors duration-300"
                  >
                    {t('footerNav.groomers') || "For Groomers"}
                  </Link>
                </li>
                <li>
                  <Link prefetch={false}
                    href={`${localePrefix}/shelters`}
                    className="text-[#333333]/80 dark:text-gray-300 hover:text-[#991D1D] dark:hover:text-[#FF8585] transition-colors duration-300"
                  >
                    {t('footerNav.shelters') || "Shelters"}
                  </Link>
                </li>
                <li>
                  <Link prefetch={false}
                    href={`${localePrefix}/b2b`}
                    className="text-[#333333]/80 dark:text-gray-300 hover:text-[#991D1D] dark:hover:text-[#FF8585] transition-colors duration-300"
                  >
                    {t('footerNav.b2bInquiry') || "B2B Inquiry"}
                  </Link>
                </li>
                <li>
                  <Link prefetch={false}
                    href={`${localePrefix}/invest`}
                    className="text-[#333333]/80 dark:text-gray-300 hover:text-[#991D1D] dark:hover:text-[#FF8585] transition-colors duration-300"
                  >
                    {t('footerNav.invest') || "Investors"}
                  </Link>
                </li>
                <li>
                  <Link prefetch={false}
                    href={`${localePrefix}/affiliate`}
                    className="text-[#333333]/80 dark:text-gray-300 hover:text-[#991D1D] dark:hover:text-[#FF8585] transition-colors duration-300"
                  >
                    {t('footerNav.affiliateProgram')}
                  </Link>
                </li>
                <li>
                  <Link prefetch={false}
                    href={`${localePrefix}/results`}
                    className="text-[#333333]/80 dark:text-gray-300 hover:text-[#991D1D] dark:hover:text-[#FF8585] transition-colors duration-300"
                  >
                    {t('footerNav.results') || "Success Stories"}
                  </Link>
                </li>
                <li>
                  <Link prefetch={false}
                    href={`${localePrefix}/case-studies`}
                    className="text-[#333333]/80 dark:text-gray-300 hover:text-[#991D1D] dark:hover:text-[#FF8585] transition-colors duration-300"
                  >
                    {t('footerNav.caseStudies') || "Case Studies"}
                  </Link>
                </li>
                <li>
                  <Link prefetch={false}
                    href={`${localePrefix}/fun`}
                    className="text-[#333333]/80 dark:text-gray-300 hover:text-[#991D1D] dark:hover:text-[#FF8585] transition-colors duration-300"
                  >
                    {t('footerNav.fun') || "Fun & Games"}
                  </Link>
                </li>
                <li>
                  <Link prefetch={false}
                    href={`${localePrefix}/viral`}
                    className="text-[#333333]/80 dark:text-gray-300 hover:text-[#991D1D] dark:hover:text-[#FF8585] transition-colors duration-300"
                  >
                    {t('footerNav.viral') || "Viral"}
                  </Link>
                </li>
                <li>
                  <Link prefetch={false}
                    href={`${localePrefix}/contact`}
                    className="text-[#333333]/80 dark:text-gray-300 hover:text-[#991D1D] dark:hover:text-[#FF8585] transition-colors duration-300"
                  >
                    {t('footerNav.contact')}
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="font-heading text-sm font-semibold text-[#333333] dark:text-gray-100">
                {t('footerNav.locations') || "Locations"}
              </h3>
              <ul className="space-y-2 text-sm dark:text-sm">
                <li>
                  <Link prefetch={false}
                    href={`${localePrefix}/locations`}
                    className="text-[#333333]/80 dark:text-gray-300 hover:text-[#991D1D] dark:hover:text-[#FF8585] transition-colors duration-300"
                  >
                    {t('footerNav.allLocations') || "All Locations"}
                  </Link>
                </li>
                <li>
                  <Link prefetch={false}
                    href={`${localePrefix}/locations/province/british-columbia`}
                    className="text-[#333333]/80 dark:text-gray-300 hover:text-[#991D1D] dark:hover:text-[#FF8585] transition-colors duration-300"
                  >
                    {copy.regions.britishColumbia}
                  </Link>
                </li>
                <li>
                  <Link prefetch={false}
                    href={`${localePrefix}/locations/province/alberta`}
                    className="text-[#333333]/80 dark:text-gray-300 hover:text-[#991D1D] dark:hover:text-[#FF8585] transition-colors duration-300"
                  >
                    {copy.regions.alberta}
                  </Link>
                </li>
                <li>
                  <Link prefetch={false}
                    href={`${localePrefix}/locations/province/ontario`}
                    className="text-[#333333]/80 dark:text-gray-300 hover:text-[#991D1D] dark:hover:text-[#FF8585] transition-colors duration-300"
                  >
                    {copy.regions.ontario}
                  </Link>
                </li>
                <li>
                  <Link prefetch={false}
                    href={`${localePrefix}/locations/province/quebec`}
                    className="text-[#333333]/80 dark:text-gray-300 hover:text-[#991D1D] dark:hover:text-[#FF8585] transition-colors duration-300"
                  >
                    {copy.regions.quebec}
                  </Link>
                </li>
              </ul>
            </div>
          </div>


          {/* Trusted & Verified Section */}
          <div className="mt-12 mb-8 pt-8 border-t border-[#E0EFC7] dark:border-gray-800">
            <div className="text-center mb-6">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {t('socialProofBadges.trustedVerified' as any) || 'Trusted & Verified'}
              </p>
              <h2 className="font-heading mt-2 text-xl font-bold text-gray-900 dark:text-gray-50">
                {t('socialProofBadges.findUsOn' as any) || 'Find Us On'}
              </h2>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {badgeConfigs.map((badge) => {
                const platformTranslationKey = `socialProofBadges.platforms.${badge.key}` as any;
                const badgeName = t.has(platformTranslationKey)
                  ? t(platformTranslationKey)
                  : (defaultPlatformNames[badge.key] || badge.key);

                const ariaLabel = t('socialProofBadges.viewOnPlatform' as any, { platform: badgeName as any });

                return (
                  <a
                    key={badge.key}
                    href={badge.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm font-medium ${badge.color} ${badge.hoverColor} transition-all duration-200 hover:shadow-md dark:hover:shadow-lg`}
                    aria-label={ariaLabel}
                  >
                    {badge.icon}
                    <span className="text-gray-700 dark:text-gray-300">{badgeName}</span>
                    <ExternalLink className="h-3.5 w-3.5 text-gray-400 dark:text-gray-500" />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-[#E0EFC7] dark:border-gray-800">
            <div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-4 mb-4">
              <Link prefetch={false}
                href={`${localePrefix}/privacy-policy`}
                className="text-xs text-[#333333]/80 dark:text-gray-300 hover:text-[#991D1D] dark:hover:text-[#FF8585] transition-colors duration-300"
              >
                {t('nav.privacyPolicy')}
              </Link>
              <Link prefetch={false}
                href={`${localePrefix}/terms`}
                className="text-xs text-[#333333]/80 dark:text-gray-300 hover:text-[#991D1D] dark:hover:text-[#FF8585] transition-colors duration-300"
              >
                {t('nav.termsOfService')}
              </Link>
              <Link prefetch={false}
                href="/sitemap.xml"
                className="text-xs text-[#333333]/80 dark:text-gray-300 hover:text-[#991D1D] dark:hover:text-[#FF8585] transition-colors duration-300"
              >
                {t('footerNav.sitemap') || "Sitemap"}
              </Link>
            </div>
            <p className="text-center text-xs text-[#333333]/80 dark:text-gray-300">
              © {currentYear}{" "}
              <span className="text-[#991D1D] dark:text-[#FF8585] font-medium">
                {t('siteName')}
              </span>{" "}
              |{t('footer.allRightsReserved')}
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
