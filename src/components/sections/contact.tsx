import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { CONTACT_INFO } from "@/lib/constants";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export function Contact() {
  return (
    <section
      className="py-12 bg-gradient-to-br from-[#FFFFFF] to-[#FFFFF5]"
      id="contact"
    >
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-block px-4 py-1 bg-[#E0EFC7] rounded-full text-[#FB6A43] font-medium text-sm mb-4">
            Get In Touch
          </div>
          <h2 className="text-5xl font-bold tracking-tight mb-4 text-[#6A43FB]">
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
              <div className="bg-gradient-to-r from-[#FB6A43] to-[#FB6A43]/80 p-3 rounded-full shadow-md group-hover:scale-110 transition-transform duration-300">
                <MapPin className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2 text-[#FB6A43]">
                  Our Location
                </h3>
                <p className="text-gray-600">{CONTACT_INFO.address}</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 bg-[#FFFFFF]/90 backdrop-blur-sm p-6 rounded-xl shadow-md border border-[#E0EFC7] transition-all duration-300 hover:shadow-[#E0EFC7]/50 hover:-translate-y-1 group">
              <div className="bg-gradient-to-r from-[#6A43FB] to-[#6A43FB]/80 p-3 rounded-full shadow-md group-hover:scale-110 transition-transform duration-300">
                <Phone className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2 text-[#6A43FB]">
                  Phone Number
                </h3>
                <p className="text-gray-600">{CONTACT_INFO.phone}</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 bg-[#FFFFFF]/90 backdrop-blur-sm p-6 rounded-xl shadow-md border border-[#E0EFC7] transition-all duration-300 hover:shadow-[#E0EFC7]/50 hover:-translate-y-1 group">
              <div className="bg-gradient-to-r from-[#43FBB4] to-[#43FBB4]/80 p-3 rounded-full shadow-md group-hover:scale-110 transition-transform duration-300">
                <Mail className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2 text-[#43FBB4]">
                  Email Address
                </h3>
                <p className="text-gray-600">{CONTACT_INFO.email}</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 bg-[#FFFFFF]/90 backdrop-blur-sm p-6 rounded-xl shadow-md border border-[#E0EFC7] transition-all duration-300 hover:shadow-[#E0EFC7]/50 hover:-translate-y-1 group">
              <div className="bg-gradient-to-r from-[#FB6A43] to-[#FB6A43]/80 p-3 rounded-full shadow-md group-hover:scale-110 transition-transform duration-300">
                <Clock className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2 text-[#FB6A43]">
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
            <h3 className="font-bold text-2xl mb-6 text-[#6A43FB]">
              Send us a Message
            </h3>
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 border border-[#E0EFC7] rounded-xl focus:ring-[#6A43FB] focus:border-[#6A43FB] bg-white/50 backdrop-blur-sm transition-all duration-300"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 border border-[#E0EFC7] rounded-xl focus:ring-[#6A43FB] focus:border-[#6A43FB] bg-white/50 backdrop-blur-sm transition-all duration-300"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-3 border border-[#E0EFC7] rounded-xl focus:ring-[#6A43FB] focus:border-[#6A43FB] bg-white/50 backdrop-blur-sm transition-all duration-300"
                  placeholder="How can we help you?"
                ></textarea>
              </div>

              <Button className="w-full bg-gradient-to-r from-[#6A43FB] to-[#6A43FB]/80 hover:from-[#6A43FB]/90 hover:to-[#6A43FB] text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-0">
                Send Message
              </Button>
              <p className="text-xs text-center text-gray-500 mt-2">
                We'll get back to you within 24 hours
              </p>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}
