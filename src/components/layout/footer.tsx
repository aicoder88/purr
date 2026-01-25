import Link from "next/link";
import Script from "next/script";
import type { SVGProps } from "react";
import { Container } from "../../components/ui/container";
import Image from "next/image";
import { useTranslation } from "../../lib/translation-context";
import {
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  Facebook,
  Star,
  ExternalLink,
} from "lucide-react";
import { SOCIAL_LINKS } from "../../lib/constants";

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

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { t, locale } = useTranslation();

  return (
    <footer className="bg-[#FFFFF5] dark:bg-gray-900 border-t border-[#E0EFC7] dark:border-gray-800 transition-colors duration-300">
      <Container>
        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            <div className="space-y-4">
              <div className="flex items-center mb-4">
                <Link href={locale === "fr" ? "/fr/" : "/"} className="group">
                  <div className="h-6 w-auto mr-2 flex items-center">
                    <Image
                      src="/optimized/logo-text-240.webp"
                      alt="Purrify - Premium Activated Carbon Cat Litter Additive - Return to Home Page"
                      width={480}
                      height={220}
                      loading="lazy"
                      className="h-full w-auto filter drop-shadow-sm transition-all duration-300 dark:hidden"
                    />
                    <Image
                      src="/optimized/purrify-dark-mode-logo.webp"
                      alt="Purrify - Premium Activated Carbon Cat Litter Additive - Return to Home Page"
                      width={480}
                      height={220}
                      loading="lazy"
                      className="h-full w-auto filter drop-shadow-sm transition-all duration-300 hidden dark:block"
                    />
                  </div>
                </Link>
              </div>
              <p className="text-sm text-[#333333]/80 dark:text-gray-300">
                {t.siteDescription}
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={SOCIAL_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#333333]/70 dark:text-gray-400 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors duration-300"
                  aria-label="Follow Purrify on Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href={SOCIAL_LINKS.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#333333]/70 dark:text-gray-400 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors duration-300"
                  aria-label="Follow Purrify on X"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href={SOCIAL_LINKS.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#333333]/70 dark:text-gray-400 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors duration-300"
                  aria-label="Follow Purrify on Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#333333]/70 dark:text-gray-400 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors duration-300"
                  aria-label="Follow Purrify on LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href={SOCIAL_LINKS.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#333333]/70 dark:text-gray-400 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors duration-300"
                  aria-label="Subscribe to Purrify on YouTube"
                >
                  <Youtube className="h-5 w-5" />
                </a>
                <a
                  href={SOCIAL_LINKS.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#333333]/70 dark:text-gray-400 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors duration-300"
                  aria-label="Follow Purrify on TikTok"
                >
                  <TikTokIcon className="h-5 w-5" />
                </a>
                <a
                  href={SOCIAL_LINKS.medium}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#333333]/70 dark:text-gray-400 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors duration-300"
                  aria-label="Read Purrify on Medium"
                >
                  <MediumIcon className="h-5 w-5" />
                </a>
              </div>

              {/* Trust Badges */}
              <div className="mt-4 pt-4 border-t border-[#E0EFC7]/50 dark:border-gray-700/50">
                <p className="text-xs font-medium text-[#333333]/60 dark:text-gray-500 mb-3">
                  {t.footerNav?.trustedReviews || ""}
                </p>
                <div className="flex flex-col gap-2">
                  <a
                    href={SOCIAL_LINKS.trustpilot}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-[#333333]/70 dark:text-gray-400 hover:text-[#00B67A] dark:hover:text-[#00B67A] transition-colors duration-300"
                    aria-label="View Purrify reviews on Trustpilot"
                  >
                    <div className="flex items-center gap-0.5 text-[#00B67A] dark:text-emerald-400">
                      <Star className="h-3 w-3 fill-current" />
                      <Star className="h-3 w-3 fill-current" />
                      <Star className="h-3 w-3 fill-current" />
                      <Star className="h-3 w-3 fill-current" />
                      <Star className="h-3 w-3 fill-current" />
                    </div>
                    <span>{t.footerNav?.trustpilot || ""}</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                  <a
                    href={SOCIAL_LINKS.googleReviews}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-[#333333]/70 dark:text-gray-400 hover:text-[#4285F4] dark:hover:text-[#4285F4] transition-colors duration-300"
                    aria-label="Leave a review on Google"
                  >
                    <div className="flex items-center gap-0.5 text-[#FBBC04] dark:text-yellow-400">
                      <Star className="h-3 w-3 fill-current" />
                      <Star className="h-3 w-3 fill-current" />
                      <Star className="h-3 w-3 fill-current" />
                      <Star className="h-3 w-3 fill-current" />
                      <Star className="h-3 w-3 fill-current" />
                    </div>
                    <span>{t.footerNav?.googleReviews || ""}</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-heading text-sm font-semibold text-[#333333] dark:text-gray-100">
                {t.footerNav?.products || ""}
              </h3>
              <ul className="space-y-2 text-sm dark:text-sm">
                {/* B2C: HIDDEN PRODUCT PURCHASE LINKS
                <li>
                  <Link
                    href={
                      locale === "fr"
                        ? "/fr/products/trial-size"
                        : "/products/trial-size"
                    }
                    className="text-[#333333]/80 dark:text-gray-300 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors duration-300"
                  >
                    {t.footerNav?.trialSize || ""}
                  </Link>
                </li>
                <li>
                  <Link
                    href={
                      locale === "fr"
                        ? "/fr/products/standard"
                        : "/products/standard"
                    }
                    className="text-[#333333]/80 dark:text-gray-300 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors duration-300"
                  >
                    {t.footerNav?.standardSize || ""}
                  </Link>
                </li>
                <li>
                  <Link
                    href={
                      locale === "fr"
                        ? "/fr/products/family-pack"
                        : "/products/family-pack"
                    }
                    className="text-[#333333]/80 dark:text-gray-300 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors duration-300"
                  >
                    {t.footerNav?.familyPack || ""}
                  </Link>
                </li>
                */}
                <li>
                  <Link
                    href={
                      locale === "fr" ? "/fr/stores" :
                      locale === "zh" ? "/zh/stores" :
                      locale === "es" ? "/es/stores" :
                      "/stores"
                    }
                    className="text-[#333333]/80 dark:text-gray-300 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors duration-300 font-medium"
                  >
                    {t.nav?.findStore || "Find a Store"}
                  </Link>
                </li>
                <li>
                  <Link
                    href={
                      locale === "fr"
                        ? "/fr/products"
                        : "/products"
                    }
                    className="text-[#333333]/80 dark:text-gray-300 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors duration-300"
                  >
                    {t.footerNav?.compareSizes || ""}
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-heading text-sm font-semibold text-[#333333] dark:text-gray-100">
                {t.footerNav?.learn || ""}
              </h3>
              <ul className="space-y-2 text-sm dark:text-sm">
                <li>
                  <Link
                    href={
                      locale === "fr"
                        ? "/fr/learn/how-it-works"
                        : "/learn/how-it-works"
                    }
                    className="text-[#333333]/80 dark:text-gray-300 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors duration-300"
                  >
                    {t.footerNav?.howItWorks || ""}
                  </Link>
                </li>
                <li>
                  <Link
                    href={locale === "fr" ? "/fr/learn/faq" : "/learn/faq"}
                    className="text-[#333333]/80 dark:text-gray-300 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors duration-300"
                  >
                    {t.footerNav?.faq || ""}
                  </Link>
                </li>
                <li>
                  <Link
                    href={
                      locale === "fr" ? "/fr/learn/science" : "/learn/science"
                    }
                    className="text-[#333333]/80 dark:text-gray-300 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors duration-300"
                  >
                    {t.footerNav?.science || ""}
                  </Link>
                </li>
                <li>
                  <Link
                    href={
                      locale === "fr" ? "/fr/learn/safety" : "/learn/safety"
                    }
                    className="text-[#333333]/80 dark:text-gray-300 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors duration-300"
                  >
                    {t.footerNav?.safetyInfo || ""}
                  </Link>
                </li>
                <li>
                  <Link
                    href={
                      locale === "fr"
                        ? "/fr/learn/cat-litter-guide"
                        : "/learn/cat-litter-guide"
                    }
                    className="text-[#333333]/80 dark:text-gray-300 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors duration-300"
                  >
                    {t.footerNav?.catLitterGuide || ""}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/learn/solutions/ammonia-smell-cat-litter"
                    className="text-[#333333]/80 dark:text-gray-300 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors duration-300"
                  >
                    {t.footerNav?.ammoniaSolutions || "Ammonia Smell Control"}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/learn/solutions/apartment-cat-smell-solution"
                    className="text-[#333333]/80 dark:text-gray-300 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors duration-300"
                  >
                    {t.nav?.apartmentLiving || "Apartment Living"}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/learn/solutions/litter-box-smell-elimination"
                    className="text-[#333333]/80 dark:text-gray-300 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors duration-300"
                  >
                    {t.nav?.litterBoxOdor || "Litter Box Odor"}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/learn/solutions/multiple-cats-odor-control"
                    className="text-[#333333]/80 dark:text-gray-300 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors duration-300"
                  >
                    {t.nav?.multipleCats || "Multiple Cats"}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/learn/solutions/natural-cat-litter-additive"
                    className="text-[#333333]/80 dark:text-gray-300 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors duration-300"
                  >
                    {t.nav?.naturalAdditive || "Natural Additive"}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/learn/solutions/senior-cat-litter-solutions"
                    className="text-[#333333]/80 dark:text-gray-300 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors duration-300"
                  >
                    {t.nav?.seniorCats || "Senior Cats"}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tools/cat-litter-calculator"
                    className="text-[#333333]/80 dark:text-gray-300 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors duration-300"
                  >
                    {t.footerNav?.litterCalculator || "Litter Calculator"}
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-heading text-sm font-semibold text-[#333333] dark:text-gray-100">
                {t.footerNav?.popularArticles || ""}
              </h3>
              <ul className="space-y-2 text-sm dark:text-sm">
                <li>
                  <Link
                    href="/blog/house-smells-like-cat-litter-solutions"
                    className="text-[#333333]/80 dark:text-gray-300 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors duration-300"
                  >
                    {t.footerNav?.houseSmells || ""}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog/multi-cat-litter-deodorizer-guide"
                    className="text-[#333333]/80 dark:text-gray-300 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors duration-300"
                  >
                    {t.footerNav?.multiCatGuide || ""}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog/tried-everything-cat-litter-smell-solutions"
                    className="text-[#333333]/80 dark:text-gray-300 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors duration-300"
                  >
                    {t.footerNav?.triedEverything || ""}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog/most-powerful-odor-absorber"
                    className="text-[#333333]/80 dark:text-gray-300 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors duration-300"
                  >
                    {t.footerNav?.powerfulAbsorber || ""}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog/best-litter-odor-remover-small-apartments"
                    className="text-[#333333]/80 dark:text-gray-300 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors duration-300"
                  >
                    {t.footerNav?.smallApartments || ""}
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-heading text-sm font-semibold text-[#333333] dark:text-gray-100">
                {t.footerNav?.company || ""}
              </h3>
              <ul className="space-y-2 text-sm dark:text-sm">
                <li>
                  <Link
                    href={
                      locale === "fr"
                        ? "/fr/about/our-story"
                        : "/about/our-story"
                    }
                    className="text-[#333333]/80 dark:text-gray-300 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors duration-300"
                  >
                    {t.footerNav?.about || ""}
                  </Link>
                </li>
                <li>
                  <Link
                    href={locale === "fr" ? "/fr/blog" : "/blog"}
                    className="text-[#333333]/80 dark:text-gray-300 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors duration-300"
                  >
                    {t.footerNav?.blog || ""}
                  </Link>
                </li>
                <li>
                  <Link
                    href={locale === "fr" ? "/fr/reviews" : "/reviews"}
                    className="text-[#333333]/80 dark:text-gray-300 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors duration-300"
                  >
                    {t.footerNav?.testimonials || ""}
                  </Link>
                </li>
                <li>
                  <Link
                    href={locale === "fr" ? "/fr/retailers" : locale === "zh" ? "/zh/retailers" : "/retailers"}
                    className="text-[#333333]/80 dark:text-gray-300 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors duration-300"
                  >
                    {t.footerNav?.retailers || ""}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/retailer/portal/login"
                    className="text-[#333333]/80 dark:text-gray-300 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors duration-300"
                  >
                    {t.footerNav?.retailerPortal || "Retailer Portal"}
                  </Link>
                </li>
                <li>
                  <Link
                    href={
                      locale === "fr" ? "/fr/hospitality" :
                      locale === "zh" ? "/zh/hospitality" :
                      locale === "es" ? "/es/hospitality" :
                      "/hospitality"
                    }
                    className="text-[#333333]/80 dark:text-gray-300 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors duration-300"
                  >
                    {t.footerNav?.hospitality || "Hospitality"}
                  </Link>
                </li>
                <li>
                  <Link
                    href={
                      locale === "fr" ? "/fr/groomers" :
                      locale === "zh" ? "/zh/groomers" :
                      locale === "es" ? "/es/groomers" :
                      "/groomers"
                    }
                    className="text-[#333333]/80 dark:text-gray-300 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors duration-300"
                  >
                    {t.footerNav?.groomers || "For Groomers"}
                  </Link>
                </li>
                <li>
                  <Link
                    href={
                      locale === "fr" ? "/fr/shelters" :
                      locale === "zh" ? "/zh/shelters" :
                      locale === "es" ? "/es/shelters" :
                      "/shelters"
                    }
                    className="text-[#333333]/80 dark:text-gray-300 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors duration-300"
                  >
                    {t.footerNav?.shelters || "Shelters"}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/b2b"
                    className="text-[#333333]/80 dark:text-gray-300 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors duration-300"
                  >
                    {t.footerNav?.b2bInquiry || "B2B Inquiry"}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/invest"
                    className="text-[#333333]/80 dark:text-gray-300 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors duration-300"
                  >
                    {t.footerNav?.invest || "Investors"}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/affiliate"
                    className="text-[#333333]/80 dark:text-gray-300 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors duration-300"
                  >
                    {t.footerNav?.affiliateProgram || ""}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/results"
                    className="text-[#333333]/80 dark:text-gray-300 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors duration-300"
                  >
                    {t.footerNav?.results || "Success Stories"}
                  </Link>
                </li>
                <li>
                  <Link
                    href={locale === "fr" ? "/fr/contact" : "/contact"}
                    className="text-[#333333]/80 dark:text-gray-300 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors duration-300"
                  >
                    {t.footerNav?.contact || ""}
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-[#E0EFC7] dark:border-gray-800">
            <div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-4 mb-4">
              <Link
                href={
                  locale === "fr" ? "/fr/privacy-policy" : "/privacy-policy"
                }
                className="text-xs text-[#333333]/80 dark:text-gray-300 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors duration-300"
              >
                {t.nav.privacyPolicy}
              </Link>
              <Link
                href={locale === "fr" ? "/fr/terms" : "/terms"}
                className="text-xs text-[#333333]/80 dark:text-gray-300 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors duration-300"
              >
                {t.nav.termsOfService}
              </Link>
              <Link
                href="/sitemap.xml"
                className="text-xs text-[#333333]/80 dark:text-gray-300 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors duration-300"
              >
                {t.footerNav?.sitemap || "Sitemap"}
              </Link>
            </div>
            <p className="text-center text-xs text-[#333333]/80 dark:text-gray-300">
              © {currentYear}{" "}
              <span className="text-[#FF3131] dark:text-[#FF5050] font-medium">
                {t.siteName}
              </span>{" "}
              |{t.footer.allRightsReserved}
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
