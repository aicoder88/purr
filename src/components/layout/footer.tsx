import { Link } from "react-router-dom";
import { Container } from "@/components/ui/container";
import { SITE_NAME, CONTACT_INFO } from "@/lib/constants";
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
              <Link to="/" className="group">
                <div className="h-10 w-auto mr-2 flex space-x-2 items-center">
                  <img
                    src="/purrify-logo-icon.png"
                    alt="Purrify Logo"
                    className="h-full w-auto"
                  />
                  <img
                    src="/purrify-logo-text.png"
                    alt="Purrify Logo"
                    className="h-full w-auto"
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
                  to="/"
                  className="text-[#333333]/80 hover:text-[#FF3131] transition-colors duration-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/#products"
                  className="text-[#333333]/80 hover:text-[#FF3131] transition-colors duration-300"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/#features"
                  className="text-[#333333]/80 hover:text-[#FF3131] transition-colors duration-300"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  to="/#benefits"
                  className="text-[#333333]/80 hover:text-[#FF3131] transition-colors duration-300"
                >
                  Benefits
                </Link>
              </li>
              <li>
                <Link
                  to="/#calculator"
                  className="text-[#333333]/80 hover:text-[#FF3131] transition-colors duration-300"
                >
                  Savings Calculator
                </Link>
              </li>
              <li>
                <Link
                  to="/#faq"
                  className="text-[#333333]/80 hover:text-[#FF3131] transition-colors duration-300"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/#blog"
                  className="text-[#333333]/80 hover:text-[#FF3131] transition-colors duration-300"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/#testimonials"
                  className="text-[#333333]/80 hover:text-[#FF3131] transition-colors duration-300"
                >
                  Testimonials
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
