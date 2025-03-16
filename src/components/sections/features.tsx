import { Container } from "@/components/ui/container";
import { FEATURES } from "@/lib/constants";
import { Zap, Heart, Clock, Check, Leaf, DollarSign } from "lucide-react";

const iconMap = {
  Zap: Zap,
  Heart: Heart,
  Clock: Clock,
  Check: Check,
  Leaf: Leaf,
  DollarSign: DollarSign,
};

export function Features() {
  return (
    <section
      className="py-12 bg-gradient-to-br from-[#FFFFF5] to-[#FFFFFF]"
      id="features"
    >
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-block px-4 py-1 bg-[#E0EFC7] rounded-full text-[#FB6A43] font-medium text-sm mb-4">
            The Purrify Difference
          </div>
          <h2 className="text-4xl font-bold tracking-tight mb-6 bg-gradient-to-r from-[#FB6A43] to-[#FB6A43]/80 bg-clip-text text-transparent">
            Why do Cats and Pet Parents Love Purrify?
          </h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            You love your cat, but let's be real—litter box odor is a problem.
            You've tried scented litter, air fresheners, and baking soda—but
            they only mask the problem, not fix it.
          </p>
          <p className="text-gray-600 leading-relaxed mt-4 text-lg">
            Imagine walking into your home and smelling… nothing. Just clean
            air, no lingering odors, and no embarrassing smells when guests
            visit.
          </p>
          <p className="text-[#333333] leading-relaxed mt-4 font-bold text-3xl">
            That's exactly what Purrify does...
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, index) => {
            const IconComponent = iconMap[feature.icon as keyof typeof iconMap];

            return (
              <div
                key={index}
                className="bg-[#FFFFFF]/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-[#E0EFC7] transition-all duration-500 hover:shadow-[#E0EFC7]/70 hover:-translate-y-2 group"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div
                  className={`bg-gradient-to-r ${index % 3 === 0 ? "from-[#FB6A43] to-[#FB6A43]/80" : index % 3 === 1 ? "from-[#6A43FB] to-[#6A43FB]/80" : "from-[#43FBB4] to-[#43FBB4]/80"} p-4 rounded-2xl w-16 h-16 flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform duration-300`}
                >
                  <IconComponent className="h-8 w-8 text-white" />
                </div>
                <h3
                  className={`font-bold text-xl mb-4 ${index % 3 === 0 ? "text-[#FB6A43]" : index % 3 === 1 ? "text-[#6A43FB]" : "text-[#43FBB4]"}`}
                >
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>

                <div className="mt-6 pt-6 border-t border-[#E0EFC7]">
                  <a
                    href="#"
                    className={`font-medium flex items-center transition-colors ${index % 3 === 0 ? "text-[#FB6A43] group-hover:text-[#FB6A43]/80" : index % 3 === 1 ? "text-[#6A43FB] group-hover:text-[#6A43FB]/80" : "text-[#43FBB4] group-hover:text-[#43FBB4]/80"}`}
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
            );
          })}
        </div>
      </Container>
    </section>
  );
}
