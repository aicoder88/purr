import Link from "next/link";
import { Container } from "../../components/ui/container";
import { SITE_NAME, CONTACT_INFO } from "../../lib/constants";
import NextImage from "../../../components/NextImage";
import { useTranslation } from "../../lib/translation-context";
import { NewsletterSignup } from "../newsletter/NewsletterSignup";
import {
  Facebook,
  Instagram,
  Twitter,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center mb-4">
              <Link href={locale === 'fr' ? "/fr/" : "/"} className="group">
                <div className="h-6 w-auto mr-2 flex items-center">
                  <NextImage
                    src="/optimized/purrify-logo-text.webp"
                    alt="Purrify Logo"
                    width={70}
                    height={24}
                    className="h-full w-auto dark:brightness-110 dark:contrast-100"
                  />
                </div>
              </Link>
            </div>
            <p className="text-sm text-[#333333]/80 dark:text-gray-300">
              {t.siteDescription}
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-[#333333]/70 dark:text-gray-400 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors duration-300"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-[#333333]/70 dark:text-gray-400 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors duration-300"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-[#333333]/70 dark:text-gray-400 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors duration-300"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-[#333333] dark:text-white">
              {t.footer.quickLinks}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href={locale === 'fr' ? "/fr/" : "/"}
                  className="text-[#333333]/80 dark:text-gray-300 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors duration-300"
                >
                  {t.nav.home}
                </Link>
              </li>
              <li>
                <Link
                  href={locale === 'fr' ? "/fr/learn/how-it-works" : "/learn/how-it-works"}
                  className="text-[#333333]/80 dark:text-gray-300 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors duration-300"
                >
                  {t.nav.howItWorks}
                </Link>
              </li>
              <li>
                <Link
                  href={locale === 'fr' ? "/fr/#about" : "/#about"}
                  className="text-[#333333]/80 dark:text-gray-300 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors duration-300"
                >
                  {t.nav.about}
                </Link>
              </li>
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
                  href={locale === 'fr' ? "/fr/customers/testimonials" : "/customers/testimonials"}
                  className="text-[#333333]/80 dark:text-gray-300 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors duration-300"
                >
                  {t.nav.testimonials}
                </Link>
              </li>
              <li>
                <Link
                  href={locale === 'fr' ? "/fr/support/contact" : "/support/contact"}
                  className="text-[#333333]/80 dark:text-gray-300 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors duration-300"
                >
                  {t.nav.contact}
                </Link>
              </li>
              <li>
                <Link
                  href={locale === 'fr' ? "/fr/blog" : "/blog"}
                  className="text-[#333333]/80 dark:text-gray-300 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors duration-300"
                >
                  {t.nav.blog}
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-[#333333] dark:text-white">
              {t.footer.openingHours}
            </h3>
            <ul className="space-y-2 text-sm text-[#333333]/80 dark:text-gray-300">
              <li>{locale === 'fr' ? 'Lun - Ven' : 'Mon - Fri'}: {t.contact.hours.monday}</li>
              <li>{locale === 'fr' ? 'Samedi' : 'Saturday'}: {t.contact.hours.saturday}</li>
              <li>{locale === 'fr' ? 'Dimanche' : 'Sunday'}: {t.contact.hours.sunday}</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-[#333333] dark:text-white">
              {t.footer.contactUs}
            </h3>
            <address className="not-italic space-y-2 text-sm text-[#333333]/80 dark:text-gray-300">
              <p>{t.contact.address}</p>
              <p>{t.contact.phone}</p>
            </address>
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
      <div dangerouslySetInnerHTML={{ __html: '<script src="https://app.simplebotinstall.com/js/chat_plugin.js" data-bot-id="40892"></script>' }} />
    </footer>
  );
}
