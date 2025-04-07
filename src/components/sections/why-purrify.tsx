import { Container } from "@/components/ui/container";
import { Check } from "lucide-react";
import SectionHeader from "../ui/section-header";

export function WhyPurrify() {
  const reasons = [
    {
      title: "ODOR ELIMINATION",
      description:
        "Purrify's advanced formula effectively eliminates unpleasant litter odors at their source. Say goodbye to lingering smells that permeate your home and welcome a fresher, more inviting environment for both you and your furry friend.",
    },
    {
      title: "CAT-FRIENDLY",
      description:
        "The more sensitive the nose, the more your entire family will appreciate Purrify. Designed with your cat's well-being in mind, it's safe, gentle, and completely pet-friendly.",
    },
    {
      title: "LONG-LASTING FRESHNESS",
      description:
        "A single sprinkle keeps your home odor-free for days. Enjoy continuous freshness without the need for constant upkeep.",
    },
  ];

  return (
    <section
      className="py-12 bg-gradient-to-br from-orange-50 to-white"
      id="why-purrify"
    >
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-16">
          {/* <div className="inline-block px-4 py-1 bg-orange-100 rounded-full text-orange-600 font-medium text-sm mb-4">
            The Science Behind Purrify
          </div> */}
          <SectionHeader text="The Science Behind Purrify" />
          <h2 className="text-6xl font-bold tracking-tight mb-4 bg-gradient-to-r from-[#FF3131] to-[#5B2EFF] bg-clip-text text-transparent">
            Why Purrify?
          </h2>
          <p className="text-gray-600 text-lg">
            With the Odour-Adsorbing Power of Purrify, you can finally say
            goodbye to unwanted odours and hello to a cleaner, more enjoyable
            living space for you and your beloved pets.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-orange-100 transition-all duration-500 hover:shadow-orange-200/50 hover:-translate-y-2 group"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center mb-6">
                <div
                  className={`p-4 rounded-full shadow-md mr-4 group-hover:scale-110 transition-transform duration-300 ${
                    index === 0
                      ? "bg-gradient-to-r from-[#FF3131] to-[#FF3131]/80"
                      : index === 1
                      ? "bg-gradient-to-r from-[#5B2EFF] to-[#5B2EFF]/80"
                      : "bg-gradient-to-r from-[#03E46A] to-[#03E46A]/80"
                  }`}
                >
                  <Check className="h-8 w-8 text-white" />
                </div>
                <h3
                  className={`font-bold text-2xl ${
                    index === 0
                      ? "text-[#FF3131]"
                      : index === 1
                      ? "text-[#5B2EFF]"
                      : "text-[#03E46A]"
                  }`}
                >
                  {reason.title}
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {reason.description}
              </p>

              <div className="mt-6 pt-6 border-t border-orange-100">
                <a
                  href="#"
                  className={`font-medium flex items-center transition-colors ${
                    index === 0
                      ? "text-[#FF3131] group-hover:text-[#FF3131]/80"
                      : index === 1
                      ? "text-[#5B2EFF] group-hover:text-[#5B2EFF]/80"
                      : "text-[#03E46A] group-hover:text-[#03E46A]/80"
                  }`}
                >
                  Learn more
                  <svg
                    className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="relative bg-gradient-to-r from-[#FF3131]/10 to-[#5B2EFF]/10 px-12 py-10 rounded-3xl shadow-xl border-2 border-[#FF3131]/30 max-w-4xl mx-auto overflow-hidden">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#FF3131]/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#5B2EFF]/20 rounded-full blur-3xl"></div>
            <div className="relative z-10 flex flex-col items-center">
              <img
                src="/purrify-logo-icon.png"
                alt="Purrify Logo"
                className="h-16 mb-4"
              />
              <p className="text-3xl font-bold text-[#5B2EFF] mb-4">
                Experience the difference for yourself and make every day a
                breath of fresh air with Purrify.
              </p>
              <a
                href="#products"
                className="mt-4 inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#FF3131] to-[#FF3131]/80 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:from-[#FF3131]/90 hover:to-[#FF3131] transition-all duration-300 group"
              >
                Try Purrify Today
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
