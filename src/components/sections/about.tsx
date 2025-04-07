import { Container } from "@/components/ui/container";
import SectionHeader from "../ui/section-header";

export function About() {
  return (
    <section className="py-12 bg-white" id="about">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-16">
          <SectionHeader text="The Science Behind Freshness" />

          <h2 className="text-6xl mt-3 font-bold tracking-tight mb-4 bg-gradient-to-r from-[#FF3131] to-[#FF3131]/80 bg-clip-text text-transparent">
            What is Purrify?
          </h2>
          <p className="text-3xl font-semibold text-[#333333] mb-6">
            "Activated" Coconut Shells!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="hidden md:block">
            <div className="grid grid-cols-2 gap-4">
              <div className="overflow-hidden rounded-xl shadow-lg">
                <img
                  src="./three_bags_no_bg.png"
                  alt="65g bag of activated carbon"
                  className="w-full h-48 object-cover transform hover:scale-110 transition duration-500"
                />
              </div>
              <div className="overflow-hidden rounded-xl shadow-lg">
                <img
                  src="./carbon_magnified_image.png"
                  alt="Micropore magnified view of activated carbon"
                  className="w-full h-48 object-contain transform hover:scale-90 transition duration-500"
                />
              </div>
              <div className="overflow-hidden rounded-xl shadow-lg col-span-2">
                <img
                  src="https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=800&q=80"
                  alt="Cat in clean environment"
                  className="w-full h-48 object-cover transform hover:scale-110 transition duration-500"
                />
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <p className="text-gray-700 leading-relaxed text-lg">
              Imagine a home that stays fresh and odor-free without relying on
              harsh chemicals or artificial fragrances.
            </p>
            <p className="text-gray-700 leading-relaxed text-lg">
              Traditional solutions? Sprays and scented litters just cover the
              smell, and harsh chemicals probably aren't great for your cat or
              your home.
            </p>
            <p className="text-gray-700 leading-relaxed text-lg">
              <span className="font-bold text-[#FF3131]">
                Purrify fixes this at the source.
              </span>
            </p>
            <p className="text-gray-700 leading-relaxed text-lg">
              Our activated coconut carbon technology absorbs odor molecules
              before they take over your nose, keeping your home fresh and clean
              without sprays, chemicals, or effort.
            </p>
          </div>
        </div>

        {/* Card removed as requested */}

        {/* Floating particles */}
        <div className="relative mt-16">
          <div
            className="absolute -top-10 left-1/4 w-8 h-8 bg-[#E0EFC7] rounded-full opacity-50"
            style={{ animationDuration: "3s" }}
          ></div>
          <div
            className="absolute top-20 right-1/3 w-6 h-6 bg-[#FF3131]/30 rounded-full opacity-40"
            style={{ animationDuration: "5s" }}
          ></div>
          <div
            className="absolute -bottom-10 right-1/4 w-10 h-10 bg-[#E0EFC7]/70 rounded-full opacity-60"
            style={{ animationDuration: "4s" }}
          ></div>
        </div>
      </Container>
    </section>
  );
}
