import { Container } from "@/components/ui/container";
import { CONTACT_INFO } from "@/lib/constants";
import { MapPin, Phone, Clock } from "lucide-react";
import dynamic from "next/dynamic";
import { useTranslation } from "@/lib/translation-context";

// Dynamically import the ContactForm component
const ContactForm = dynamic(() => import("../../../components/ContactForm"), {
  ssr: true,
});

export function Contact() {
  const { t } = useTranslation();
  return (
    <section
      className="py-12 bg-gradient-to-br from-[#FFFFFF] to-[#FFFFF5] dark:from-gray-900 dark:to-gray-950 transition-colors duration-300"
      id="contact"
    >
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-block px-4 py-1 bg-[#E0EFC7] rounded-full text-[#FF3131] font-medium text-sm mb-4">
            {t.contactSection.getInTouch}
          </div>
          <h2 className="text-5xl font-bold tracking-tight mb-4 text-[#5B2EFF] dark:text-[#3694FF]">
            {t.contact.title}
          </h2>
          <p className="text-gray-600 text-lg dark:text-gray-300">
            {t.contact.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-12">
          <div className="space-y-4 sm:space-y-8">
            <div className="flex items-start space-x-3 sm:space-x-4 bg-[#FFFFFF]/90 dark:bg-gray-900/90 backdrop-blur-sm p-4 sm:p-6 rounded-xl shadow-md border border-[#E0EFC7] dark:border-gray-800 transition-all duration-300 hover:shadow-[#E0EFC7]/50 dark:hover:shadow-[#3694FF]/30 hover:-translate-y-1 group">
              <div className="bg-gradient-to-r from-[#FF3131] to-[#FF3131]/80 p-2 sm:p-3 rounded-full shadow-md group-hover:scale-110 transition-transform duration-300">
                <MapPin className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg sm:text-xl mb-1 sm:mb-2 text-[#FF3131] dark:text-[#FF5050]">
                  {t.contactSection.ourLocation}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">{CONTACT_INFO.address}</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 sm:space-x-4 bg-[#FFFFFF]/90 dark:bg-gray-900/90 backdrop-blur-sm p-4 sm:p-6 rounded-xl shadow-md border border-[#E0EFC7] dark:border-gray-800 transition-all duration-300 hover:shadow-[#E0EFC7]/50 dark:hover:shadow-[#3694FF]/30 hover:-translate-y-1 group">
              <div className="bg-gradient-to-r from-[#5B2EFF] to-[#5B2EFF]/80 p-2 sm:p-3 rounded-full shadow-md group-hover:scale-110 transition-transform duration-300">
                <Phone className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg sm:text-xl mb-1 sm:mb-2 text-[#5B2EFF] dark:text-[#3694FF]">
                  {t.contactSection.phoneNumber}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">{CONTACT_INFO.phone}</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 sm:space-x-4 bg-[#FFFFFF]/90 dark:bg-gray-900/90 backdrop-blur-sm p-4 sm:p-6 rounded-xl shadow-md border border-[#E0EFC7] dark:border-gray-800 transition-all duration-300 hover:shadow-[#E0EFC7]/50 dark:hover:shadow-[#3694FF]/30 hover:-translate-y-1 group">
              <div className="bg-gradient-to-r from-[#FF3131] to-[#FF3131]/80 p-2 sm:p-3 rounded-full shadow-md group-hover:scale-110 transition-transform duration-300">
                <Clock className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg sm:text-xl mb-1 sm:mb-2 text-[#FF3131] dark:text-[#FF5050]">
                  {t.contactSection.openingHours}
                </h3>
                <ul className="text-gray-600 dark:text-gray-300 text-sm sm:text-base space-y-1 sm:space-y-2">
                  <li className="flex justify-between gap-x-4">
                    <span className="min-w-0 truncate">{t.contactSection.weekdays}</span>
                    <span className="font-medium whitespace-nowrap">{t.contact.hours.monday}</span>
                  </li>
                  <li className="flex justify-between gap-x-4">
                    <span className="min-w-0 truncate">{t.contactSection.saturday}</span>
                    <span className="font-medium whitespace-nowrap">{t.contact.hours.saturday}</span>
                  </li>
                  <li className="flex justify-between gap-x-4">
                    <span className="min-w-0 truncate">{t.contactSection.sunday}</span>
                    <span className="font-medium whitespace-nowrap">{t.contact.hours.sunday}</span>
                  </li>
                </ul>
                <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-[#E0EFC7] flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    {t.contactSection.aiSupport}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#FFFFFF]/90 dark:bg-gray-900/90 backdrop-blur-sm p-4 sm:p-8 rounded-2xl shadow-xl border border-[#E0EFC7] dark:border-gray-800 transition-all duration-500 hover:shadow-[#E0EFC7]/50 dark:hover:shadow-[#3694FF]/30">
            <h3 className="font-bold text-xl sm:text-2xl mb-4 sm:mb-6 text-[#5B2EFF] dark:text-[#3694FF]">
              {t.contactSection.sendMessage}
            </h3>
            <ContactForm />
            <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-3 sm:mt-4">
              {t.contactSection.replyTime}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
