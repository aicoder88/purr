import { useState } from "react";
import Link from "next/link";
import { Menu, X, ShoppingCart } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Container } from "../../components/ui/container";
import { SITE_NAME } from "../../lib/constants";
import NextImage from "../../../components/NextImage";
import { LanguageSwitcher } from "../../components/ui/language-switcher";
import { useTranslation } from "../../lib/translation-context";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, locale } = useTranslation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#E0EFC7] bg-[#FFFFFF]/95 backdrop-blur-md supports-[backdrop-filter]:bg-[#FFFFFF]/80 shadow-sm">
      <Container>
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="group" aria-label="Purrify Home">
              <div className="h-10 w-auto mr-2 flex space-x-2 items-center">
                <img
                  src="/optimized/purrify-logo-icon.webp"
                  alt="Purrify Logo Icon"
                  className="h-full w-auto"
                  width={757}
                  height={896}
                />
                <img
                  src="/optimized/purrify-logo-text.webp"
                  alt="Purrify Logo Text"
                  className="h-full w-auto"
                  width={209}
                  height={96}
                />
              </div>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href={locale === 'fr' ? "/fr/" : "/"}
              className="text-sm font-medium transition-colors hover:text-[#FF3131] relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-[#FF3131] after:transition-all after:duration-300"
            >
              {t.nav.home}
            </Link>
            <Link
              href={locale === 'fr' ? "/fr/#how-it-works" : "/#how-it-works"}
              className="text-sm font-medium transition-colors hover:text-[#FF3131] relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-[#FF3131] after:transition-all after:duration-300"
              aria-label="How It Works"
            >
              {t.nav.howItWorks}
            </Link>
            <Link
              href={locale === 'fr' ? "/fr/#about" : "/#about"}
              className="text-sm font-medium transition-colors hover:text-[#FF3131] relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-[#FF3131] after:transition-all after:duration-300"
              aria-label="About Purrify"
            >
              {t.nav.about}
            </Link>
            <Link
              href={locale === 'fr' ? "/fr/#why-purrify" : "/#why-purrify"}
              className="text-sm font-medium transition-colors hover:text-[#FF3131] relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-[#FF3131] after:transition-all after:duration-300"
              aria-label="Why Choose Purrify"
            >
              {/* {t.nav.whyPurrify}
            </Link>
            <Link
              href={locale === 'fr' ? "/fr/free" : "/free"}
              className="text-sm font-medium transition-colors hover:text-[#FF3131] relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-[#FF3131] after:transition-all after:duration-300"
              aria-label="Try Free Sample"
            > */}
              {t.nav.tryFree}
            </Link>
            <Link
              href={locale === 'fr' ? "/fr/#testimonials" : "/#testimonials"}
              className="text-sm font-medium transition-colors hover:text-[#FF3131] relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-[#FF3131] after:transition-all after:duration-300"
            >
              {t.nav.testimonials}
            </Link>
            <Link
              href={locale === 'fr' ? "/fr/#contact" : "/#contact"}
              className="text-sm font-medium transition-colors hover:text-[#FF3131] relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-[#FF3131] after:transition-all after:duration-300"
            >
              {t.nav.contact}
            </Link>
            <Link
              href={locale === 'fr' ? "/fr/blog" : "/blog"}
              className="text-sm font-medium transition-colors hover:text-[#FF3131] relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-[#FF3131] after:transition-all after:duration-300"
            >
              {t.nav.blog}
            </Link>
            <div className="flex items-center space-x-2">
              <LanguageSwitcher />
              <Button
                variant="outline"
                size="icon"
                className="relative bg-[#FFFFFF]/90 border-[#E0EFC7] hover:bg-[#FFFFF5] hover:border-[#E0EFC7] transition-all duration-300 ml-2 hide-for-info-mode"
                aria-label="Shopping Cart"
              >
                <ShoppingCart className="h-5 w-5 text-[#FF3131]" />
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-[#FF3131] to-[#FF3131]/80 text-xs text-white shadow-sm">
                  0
                </span>
              </Button>
            </div>
          </nav>

          <div className="md:hidden flex items-center">
            <div className="flex items-center mr-3">
              <LanguageSwitcher />
            </div>
            <Button
              variant="outline"
              size="icon"
              className="mr-3 relative bg-[#FFFFFF]/90 border-[#E0EFC7] hover:bg-[#FFFFF5] hover:border-[#E0EFC7] transition-all duration-300 hide-for-info-mode"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="h-5 w-5 text-[#FF3131]" />
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-[#FF3131] to-[#FF3131]/80 text-xs text-white shadow-sm">
                0
              </span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              className="hover:bg-[#FFFFF5]"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-[#FF3131]" />
              ) : (
                <Menu className="h-6 w-6 text-[#FF3131]" />
              )}
            </Button>
          </div>
        </div>
      </Container>

      {isMenuOpen && (
        <div className="md:hidden bg-[#FFFFFF]/95 backdrop-blur-md border-t border-[#E0EFC7] shadow-lg">
          <div className="space-y-4 px-6 py-6">
            <Link
              href={locale === 'fr' ? "/fr/" : "/"}
              className="block text-sm font-medium transition-colors hover:text-[#FF3131] py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {t.nav.home}
            </Link>
            <Link
              href={locale === 'fr' ? "/fr/#how-it-works" : "/#how-it-works"}
              className="block text-sm font-medium transition-colors hover:text-[#FF3131] py-2"
              onClick={() => setIsMenuOpen(false)}
              aria-label="How It Works"
            >
              {t.nav.howItWorks}
            </Link>
            <Link
              href={locale === 'fr' ? "/fr/#about" : "/#about"}
              className="block text-sm font-medium transition-colors hover:text-[#FF3131] py-2"
              onClick={() => setIsMenuOpen(false)}
              aria-label="About Purrify"
            >
              {t.nav.about}
            </Link>
            <Link
              href={locale === 'fr' ? "/fr/#why-purrify" : "/#why-purrify"}
              className="block text-sm font-medium transition-colors hover:text-[#FF3131] py-2"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Why Choose Purrify"
            >
              {t.nav.whyPurrify}
            </Link>
            {/* <Link
              href={locale === 'fr' ? "/fr/free" : "/free"}
              className="block text-sm font-medium transition-colors hover:text-[#FF3131] py-2"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Try Free Sample"
            >
              {t.nav.tryFree}
            </Link> */}
            <Link
              href={locale === 'fr' ? "/fr/#testimonials" : "/#testimonials"}
              className="block text-sm font-medium transition-colors hover:text-[#FF3131] py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {t.nav.testimonials}
            </Link>
            <Link
              href={locale === 'fr' ? "/fr/#contact" : "/#contact"}
              className="block text-sm font-medium transition-colors hover:text-[#FF3131] py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {t.nav.contact}
            </Link>
            <Link
              href={locale === 'fr' ? "/fr/blog" : "/blog"}
              className="block text-sm font-medium transition-colors hover:text-[#FF3131] py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {t.nav.blog}
            </Link>
            <div className="border-t border-[#E0EFC7] my-2 pt-2">
              <Link
                href={locale === 'fr' ? "/fr/privacy-policy" : "/privacy-policy"}
                className="block text-sm font-medium transition-colors hover:text-[#FF3131] py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.nav.privacyPolicy}
              </Link>
              <Link
                href={locale === 'fr' ? "/fr/terms" : "/terms"}
                className="block text-sm font-medium transition-colors hover:text-[#FF3131] py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.nav.termsOfService}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
