import { Container } from "@/components/ui/container";
import { CONTACT_INFO } from "@/lib/constants";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import dynamic from "next/dynamic";

// Dynamically import the ContactForm component
const ContactForm = dynamic(() => import("../../../components/ContactForm"), {
  ssr: true,
});

export function Contact() {
  return (
    <section
      className="py-12 bg-gradient-to-br from-[#FFFFFF] to-[#FFFFF5]"
      id="contact"
    >
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-block px-4 py-1 bg-[#E0EFC7] rounded-full text-[#FF3131] font-medium text-sm mb-4">
            Get In Touch
          </div>
          <h2 className="text-5xl font-bold tracking-tight mb-4 text-[#5B2EFF]">
            Contact Us
          </h2>
          <p className="text-gray-600 text-lg">
            Have questions or want to share your Purrify experience? We'd love
            to hear from you!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="flex items-start space-x-4 bg-[#FFFFFF]/90 backdrop-blur-sm p-6 rounded-xl shadow-md border border-[#E0EFC7] transition-all duration-300 hover:shadow-[#E0EFC7]/50 hover:-translate-y-1 group">
              <div className="bg-gradient-to-r from-[#FF3131] to-[#FF3131]/80 p-3 rounded-full shadow-md group-hover:scale-110 transition-transform duration-300">
                <MapPin className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2 text-[#FF3131]">
                  Our Location
                </h3>
                <p className="text-gray-600">{CONTACT_INFO.address}</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 bg-[#FFFFFF]/90 backdrop-blur-sm p-6 rounded-xl shadow-md border border-[#E0EFC7] transition-all duration-300 hover:shadow-[#E0EFC7]/50 hover:-translate-y-1 group">
              <div className="bg-gradient-to-r from-[#5B2EFF] to-[#5B2EFF]/80 p-3 rounded-full shadow-md group-hover:scale-110 transition-transform duration-300">
                <Phone className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2 text-[#5B2EFF]">
                  Phone Number
                </h3>
                <p className="text-gray-600">{CONTACT_INFO.phone}</p>
              </div>
            </div>


            <div className="flex items-start space-x-4 bg-[#FFFFFF]/90 backdrop-blur-sm p-6 rounded-xl shadow-md border border-[#E0EFC7] transition-all duration-300 hover:shadow-[#E0EFC7]/50 hover:-translate-y-1 group">
              <div className="bg-gradient-to-r from-[#FF3131] to-[#FF3131]/80 p-3 rounded-full shadow-md group-hover:scale-110 transition-transform duration-300">
                <Clock className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2 text-[#FF3131]">
                  Opening Hours
                </h3>
                <ul className="text-gray-600 space-y-2">
                  <li className="flex justify-between">
                    <span>Mon - Fri:</span>
                    <span className="font-medium">
                      {CONTACT_INFO.hours.monday}
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span>Saturday:</span>
                    <span className="font-medium">
                      {CONTACT_INFO.hours.saturday}
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sunday:</span>
                    <span className="font-medium">
                      {CONTACT_INFO.hours.sunday}
                    </span>
                  </li>
                </ul>
                <div className="mt-4 pt-4 border-t border-[#E0EFC7] flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
                  <p className="text-sm text-gray-500">
                    Our AI support is available 24/7
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#FFFFFF]/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-[#E0EFC7] transition-all duration-500 hover:shadow-[#E0EFC7]/50">
            <h3 className="font-bold text-2xl mb-6 text-[#5B2EFF]">
              Send us a Message
            </h3>
            <ContactForm />
            <p className="text-xs text-center text-gray-500 mt-4">
              We'll get back to you within 24 hours
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
