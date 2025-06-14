import Link from "next/link";
import { Container } from "../../components/ui/container";
import { SITE_NAME, CONTACT_INFO } from "../../lib/constants";
import NextImage from "../../../components/NextImage";
import { useTranslation } from "../../lib/translation-context";
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
    <footer className="bg-[#FFFFF5] border-t border-[#E0EFC7] py-12">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center">
              <Link href={locale === 'fr' ? "/fr/" : "/"} className="group">
                <div className="h-10 w-auto mr-2 flex space-x-2 items-center">
                  <img
                    src="/optimized/purrify-logo-icon.webp"
                    alt="Purrify Logo"
                    className="h-full w-auto"
                    width={757}
                    height={896}
                  />
                  <img
                    src="/optimized/purrify-logo-text.webp"
                    alt="Purrify Logo"
                    className="h-full w-auto"
                    width={209}
                    height={96}
                  />
                </div>
              </Link>
            </div>
            <p className="text-sm text-[#333333]/80">
              {t.siteDescription}
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-[#333333]/70 hover:text-[#FF3131] transition-colors duration-300"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-[#333333]/70 hover:text-[#FF3131] transition-colors duration-300"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-[#333333]/70 hover:text-[#FF3131] transition-colors duration-300"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-[#333333]">
              {t.footer.quickLinks}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href={locale === 'fr' ? "/fr/" : "/"}
                  className="text-[#333333]/80 hover:text-[#FF3131] transition-colors duration-300"
                >
                  {t.nav.home}
                </Link>
              </li>
              <li>
                <Link
                  href={locale === 'fr' ? "/fr/#how-it-works" : "/#how-it-works"}
                  className="text-[#333333]/80 hover:text-[#FF3131] transition-colors duration-300"
                >
                  {t.nav.howItWorks}
                </Link>
              </li>
              <li>
                <Link
                  href={locale === 'fr' ? "/fr/#about" : "/#about"}
                  className="text-[#333333]/80 hover:text-[#FF3131] transition-colors duration-300"
                >
                  {t.nav.about}
                </Link>
              </li>
              <li>
                <Link
                  href={locale === 'fr' ? "/fr/#why-purrify" : "/#why-purrify"}
                  className="text-[#333333]/80 hover:text-[#FF3131] transition-colors duration-300"
                >
                  {t.nav.whyPurrify}
                </Link>
              </li>
              {/* <li>
                <Link
                  href={locale === 'fr' ? "/fr/free" : "/free"}
                  className="text-[#333333]/80 hover:text-[#FF3131] transition-colors duration-300"
                >
                  {t.nav.tryFree}
                </Link>
              </li> */}
              <li>
                <Link
                  href={locale === 'fr' ? "/fr/#testimonials" : "/#testimonials"}
                  className="text-[#333333]/80 hover:text-[#FF3131] transition-colors duration-300"
                >
                  {t.nav.testimonials}
                </Link>
              </li>
              <li>
                <Link
                  href={locale === 'fr' ? "/fr/#contact" : "/#contact"}
                  className="text-[#333333]/80 hover:text-[#FF3131] transition-colors duration-300"
                >
                  {t.nav.contact}
                </Link>
              </li>
              <li>
                <Link
                  href={locale === 'fr' ? "/fr/blog" : "/blog"}
                  className="text-[#333333]/80 hover:text-[#FF3131] transition-colors duration-300"
                >
                  {t.nav.blog}
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-[#333333]">
              {t.footer.openingHours}
            </h3>
            <ul className="space-y-2 text-sm text-[#333333]/80">
              <li>{locale === 'fr' ? 'Lun - Ven' : 'Mon - Fri'}: {t.contact.hours.monday}</li>
              <li>{locale === 'fr' ? 'Samedi' : 'Saturday'}: {t.contact.hours.saturday}</li>
              <li>{locale === 'fr' ? 'Dimanche' : 'Sunday'}: {t.contact.hours.sunday}</li>
            </ul>
            <p className="text-sm text-[#333333]/80">
              {t.footer.aiSupport}
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-[#333333]">
              {t.footer.contactUs}
            </h3>
            <address className="not-italic space-y-2 text-sm text-[#333333]/80">
              <p>{t.contact.address}</p>
              <p>{t.contact.phone}</p>
            </address>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#E0EFC7]">
          <div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-4 mb-4">
            <Link
              href={locale === 'fr' ? "/fr/privacy-policy" : "/privacy-policy"}
              className="text-xs text-[#333333]/80 hover:text-[#FF3131] transition-colors duration-300"
            >
              {t.nav.privacyPolicy}
            </Link>
            <Link
              href={locale === 'fr' ? "/fr/terms" : "/terms"}
              className="text-xs text-[#333333]/80 hover:text-[#FF3131] transition-colors duration-300"
            >
              {t.nav.termsOfService}
            </Link>
            <Link
              href={locale === 'fr' ? "/fr/blog" : "/blog"}
              className="text-xs text-[#333333]/80 hover:text-[#FF3131] transition-colors duration-300"
            >
              {t.nav.blog}
            </Link>
          </div>
          <p className="text-center text-xs text-[#333333]/80">
            © {currentYear}{" "}
            <span className="text-[#FF3131] font-medium">{t.siteName}</span> |
            {t.footer.allRightsReserved}
          </p>
        </div>
      </Container>
      <div dangerouslySetInnerHTML={{ __html: '<script src="https://app.simplebotinstall.com/js/chat_plugin.js" data-bot-id="40892"></script>' }} />
    </footer>
  );
}
