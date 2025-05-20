import { Container } from "@/components/ui/container";
import SectionHeader from "../ui/section-header";
import dynamic from "next/dynamic";

// Dynamically import NextImage to reduce initial bundle size
const NextImage = dynamic(() => import("../../../components/NextImage"), {
  ssr: true,
});

export function About() {
  return (
    <section className="py-12 bg-white" id="about">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-16">
          <SectionHeader text="The Science of Fresh Air" />
          
          <h2 className="text-4xl md:text-5xl mt-3 font-bold tracking-tight mb-4 bg-gradient-to-r from-[#FF3131] to-[#FF3131]/80 bg-clip-text text-transparent">What Makes Purrify Different?</h2>
          
          <div className="relative group flex flex-col items-center my-8">
            <div className="absolute -inset-4 bg-gradient-to-r from-[#FF3131]/20 to-[#5B2EFF]/30 rounded-3xl blur-xl opacity-70 group-hover:opacity-100 transition duration-700"></div>
            <div className="relative overflow-hidden rounded-3xl shadow-2xl group-hover:shadow-[#E0EFC7]/50 transition duration-300">
              <NextImage
                src="/Carbon sktech.png"
                alt="Carbon sketch illustration"
                width={500}
                height={340}
                className="w-10/12 h-auto object-cover group-hover:scale-105 transition duration-700 mx-auto"
                sizes="(max-width: 768px) 100vw, 500px"
              />
            </div>
          </div>
          
          <p className="text-3xl font-semibold text-[#333333] mb-6">
          Nature's Secret Weapon: Activated Coconut Shells!
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
            Tired of your home smelling like a litter box? Imagine walking through your door to PURE FRESHNESS every day - without harsh chemicals or fake fragrances!
            </p>
            <p className="text-gray-700 leading-relaxed text-lg">
            Those sprays and scented litters? They just MASK odors temporarily while exposing your precious cat to questionable substances.
            </p>
            <p className="text-gray-700 leading-relaxed text-lg">
              <span className="font-bold text-[#FF3131]">
              Purrify ELIMINATES odors at the source.
              </span>
            </p>
            <p className="text-gray-700 leading-relaxed text-lg">
            Our revolutionary activated coconut carbon doesn't just cover up smells - it TRAPS and DESTROYS odor molecules before they escape the litter box, keeping your home naturally fresh without any extra effort from you.
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
