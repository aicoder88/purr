import Link from "next/link";
import Script from "next/script";
import type { SVGProps } from "react";
import { Container } from "../../components/ui/container";
import NextImage from "../../../components/NextImage";
import { useTranslation } from "../../lib/translation-context";
import { NewsletterSignup } from "../newsletter/NewsletterSignup";
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  MapPin,
  Phone,
} from "lucide-react";
import { SOCIAL_LINKS } from "../../lib/constants";

const TikTokIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    {...props}
  >
    <path d="M12.75 2a.75.75 0 0 1 .75.75c0 2.24 1.53 4.12 3.63 4.5.37.07.62.4.62.77v2.02a.75.75 0 0 1-1.03.7 6.3 6.3 0 0 1-2.47-1.4v6.67A4.82 4.82 0 1 1 8 11.5h.75a.75.75 0 0 1 .75.75v2.14a.75.75 0 0 1-1.02.7 1.83 1.83 0 0 0-.73-.15 1.82 1.82 0 1 0 1.82 1.83V3.5a.75.75 0 0 1 .75-.75h2.43Z" />
  </svg>
);

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { t, locale } = useTranslation();

  return (
    <footer className="bg-[#FFFFF5] dark:bg-gray-900 border-t border-[#E0EFC7] dark:border-gray-800 transition-colors duration-300">
      <Container>
        {/* Newsletter Signup */}
        <div className="py-12 border-b border-[#E0EFC7] dark:border-gray-800">
          <NewsletterSignup 
            variant="footer"
            showBenefits={false}
            discount={10}
            className=""
          />
        </div>
        
        {/* Main Footer Content */}
        <div className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="space-y-4">
            <div className="flex items-center mb-4">
              <Link href={locale === 'fr' ? "/fr/" : "/"} className="group">
                <div className="h-6 w-auto mr-2 flex items-center">
                  <NextImage
                    src="/optimized/purrify-logo-text.webp"
                    alt="Purrify - Premium Activated Carbon Cat Litter Additive - Return to Home Page"
                    width={70}
                    height={24}
                    className="h-full w-auto transition-all duration-300 dark:invert dark:brightness-110 dark:contrast-125"
                  />
                </div>
              </Link>
            </div>
            <p className="text-sm text-[#333333]/80 dark:text-gray-300">
              {t.siteDescription}
            </p>
            <div className="flex space-x-4">
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
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-[#333333] dark:text-white dark:text-gray-100">
              Products
            </h3>
            <ul className="space-y-2 text-sm dark:text-sm">
              <li>
                <Link
                  href={locale === 'fr' ? "/fr/products/trial-size" : "/products/trial-size"}
                  className="text-[#333333]/80 dark:text-gray-300 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors duration-300"
                >
                  Trial Size
                </Link>
              </li>
              <li>
                <Link
                  href={locale === 'fr' ? "/fr/products/standard" : "/products/standard"}
                  className="text-[#333333]/80 dark:text-gray-300 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors duration-300"
                >
                  Standard Size
                </Link>
              </li>
              <li>
                <Link
                  href={locale === 'fr' ? "/fr/products/family-pack" : "/products/family-pack"}
                  className="text-[#333333]/80 dark:text-gray-300 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors duration-300"
                >
                  Family Pack
                </Link>
              </li>
              <li>
                <Link
                  href={locale === 'fr' ? "/fr/products/compare" : "/products/compare"}
                  className="text-[#333333]/80 dark:text-gray-300 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors duration-300"
                >
                  Compare Sizes
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-[#333333] dark:text-white dark:text-gray-100">
              Learn
            </h3>
            <ul className="space-y-2 text-sm dark:text-sm">
              <li>
                <Link
                  href={locale === 'fr' ? "/fr/learn/how-it-works" : "/learn/how-it-works"}
                  className="text-[#333333]/80 dark:text-gray-300 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors duration-300"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  href={locale === 'fr' ? "/fr/learn/faq" : "/learn/faq"}
                  className="text-[#333333]/80 dark:text-gray-300 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors duration-300"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href={locale === 'fr' ? "/fr/learn/science" : "/learn/science"}
                  className="text-[#333333]/80 dark:text-gray-300 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors duration-300"
                >
                  Science
                </Link>
              </li>
              <li>
                <Link
                  href={locale === 'fr' ? "/fr/learn/safety" : "/learn/safety"}
                  className="text-[#333333]/80 dark:text-gray-300 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors duration-300"
                >
                  Safety Info
                </Link>
              </li>
              <li>
                <Link
                  href={locale === 'fr' ? "/fr/learn/cat-litter-guide" : "/learn/cat-litter-guide"}
                  className="text-[#333333]/80 dark:text-gray-300 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors duration-300"
                >
                  Cat Litter Guide
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-[#333333] dark:text-white dark:text-gray-100">
              Solutions
            </h3>
            <ul className="space-y-2 text-sm dark:text-sm">
              <li>
                <Link
                  href={locale === 'fr' ? "/fr/solutions/ammonia-smell-cat-litter" : "/solutions/ammonia-smell-cat-litter"}
                  className="text-[#333333]/80 dark:text-gray-300 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors duration-300"
                >
                  Ammonia Smell
                </Link>
              </li>
              <li>
                <Link
                  href={locale === 'fr' ? "/fr/solutions/apartment-cat-smell-solution" : "/solutions/apartment-cat-smell-solution"}
                  className="text-[#333333]/80 dark:text-gray-300 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors duration-300"
                >
                  Apartment Living
                </Link>
              </li>
              <li>
                <Link
                  href={locale === 'fr' ? "/fr/solutions/multiple-cats-odor-control" : "/solutions/multiple-cats-odor-control"}
                  className="text-[#333333]/80 dark:text-gray-300 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors duration-300"
                >
                  Multiple Cats
                </Link>
              </li>
              <li>
                <Link
                  href={locale === 'fr' ? "/fr/solutions/natural-cat-litter-additive" : "/solutions/natural-cat-litter-additive"}
                  className="text-[#333333]/80 dark:text-gray-300 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors duration-300"
                >
                  Natural Additive
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-[#333333] dark:text-white dark:text-gray-100">
              Company
            </h3>
            <ul className="space-y-2 text-sm dark:text-sm">
              <li>
                <Link
                  href={locale === 'fr' ? "/fr/about/our-story" : "/about/our-story"}
                  className="text-[#333333]/80 dark:text-gray-300 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors duration-300"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href={locale === 'fr' ? "/fr/blog" : "/blog"}
                  className="text-[#333333]/80 dark:text-gray-300 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors duration-300"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href={locale === 'fr' ? "/fr/customers/testimonials" : "/customers/testimonials"}
                  className="text-[#333333]/80 dark:text-gray-300 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors duration-300"
                >
                  Testimonials
                </Link>
              </li>
              <li>
                <Link
                  href={locale === 'fr' ? "/fr/retailers" : "/retailers"}
                  className="text-[#333333]/80 dark:text-gray-300 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors duration-300"
                >
                  For Retailers
                </Link>
              </li>
              <li>
                <Link
                  href={locale === 'fr' ? "/fr/support/contact" : "/support/contact"}
                  className="text-[#333333]/80 dark:text-gray-300 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors duration-300"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-[#E0EFC7] dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-4 mb-4">
            <Link
              href={locale === 'fr' ? "/fr/privacy-policy" : "/privacy-policy"}
              className="text-xs text-[#333333]/80 dark:text-gray-300 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors duration-300"
            >
              {t.nav.privacyPolicy}
            </Link>
            <Link
              href={locale === 'fr' ? "/fr/terms" : "/terms"}
              className="text-xs text-[#333333]/80 dark:text-gray-300 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors duration-300"
            >
              {t.nav.termsOfService}
            </Link>
            <Link
              href={locale === 'fr' ? "/fr/blog" : "/blog"}
              className="text-xs text-[#333333]/80 dark:text-gray-300 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors duration-300"
            >
              {t.nav.blog}
            </Link>
          </div>
          <p className="text-center text-xs text-[#333333]/80 dark:text-gray-300">
            © {currentYear}{" "}
            <span className="text-[#FF3131] dark:text-[#FF5050] font-medium">{t.siteName}</span> |
            {t.footer.allRightsReserved}
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
