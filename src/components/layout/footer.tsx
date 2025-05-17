import Link from "next/link";
import { Container } from "../../components/ui/container";
import { SITE_NAME, CONTACT_INFO } from "../../lib/constants";
import NextImage from "../../../components/NextImage";
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

  return (
    <footer className="bg-[#FFFFF5] border-t border-[#E0EFC7] py-12">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center">
              <Link href="/" className="group">
                <div className="flex items-center space-x-2">
                  <NextImage
                    src="/images/icon-64.png"
                    alt="Purrify Logo"
                    width={64}
                    height={64}
                    className="h-10 w-10 object-contain"
                  />
                  <NextImage
                    src="/images/logo-text-180.png"
                    alt="Purrify Logo Text"
                    width={180}
                    height={36}
                    className="h-9 w-[180px] object-contain"
                  />
                </div>
              </Link>
            </div>
            <p className="text-sm text-[#333333]/80">
              Activated carbon cat litter additive that eliminates odors at the
              source.
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
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-[#333333]/80 hover:text-[#FF3131] transition-colors duration-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/#how-it-works"
                  className="text-[#333333]/80 hover:text-[#FF3131] transition-colors duration-300"
                >
                  How
                </Link>
              </li>
              <li>
                <Link
                  href="/#about"
                  className="text-[#333333]/80 hover:text-[#FF3131] transition-colors duration-300"
                >
                  Wow
                </Link>
              </li>
              <li>
                <Link
                  href="/#why-purrify"
                  className="text-[#333333]/80 hover:text-[#FF3131] transition-colors duration-300"
                >
                  Why
                </Link>
              </li>
              <li>
                <Link
                  href="/#products"
                  className="text-[#333333]/80 hover:text-[#FF3131] transition-colors duration-300"
                >
                  Try
                </Link>
              </li>
              <li>
                <Link
                  href="/#testimonials"
                  className="text-[#333333]/80 hover:text-[#FF3131] transition-colors duration-300"
                >
                  Testimonials
                </Link>
              </li>
              <li>
                <Link
                  href="/#contact"
                  className="text-[#333333]/80 hover:text-[#FF3131] transition-colors duration-300"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-[#333333]">
              Opening Hours
            </h3>
            <ul className="space-y-2 text-sm text-[#333333]/80">
              <li>Mon - Fri: {CONTACT_INFO.hours.monday}</li>
              <li>Saturday: {CONTACT_INFO.hours.saturday}</li>
              <li>Sunday: {CONTACT_INFO.hours.sunday}</li>
            </ul>
            <p className="text-sm text-[#333333]/80">
              Our AI support is available to help you 24 hours a day.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-[#333333]">Contact Us</h3>
            <address className="not-italic space-y-2 text-sm text-[#333333]/80">
              <p>{CONTACT_INFO.address}</p>
              <p>{CONTACT_INFO.phone}</p>
              <p>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="hover:text-[#FF3131] transition-colors duration-300"
                >
                  {CONTACT_INFO.email}
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#E0EFC7]">
          <p className="text-center text-xs text-[#333333]/80">
            © {currentYear}{" "}
            <span className="text-[#FF3131] font-medium">{SITE_NAME}</span> |
            All Rights Reserved
          </p>
        </div>
      </Container>
      <div dangerouslySetInnerHTML={{ __html: '<script src="https://app.simplebotinstall.com/js/chat_plugin.js" data-bot-id="40892"></script>' }} />
    </footer>
  );
}
