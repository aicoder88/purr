import { Container } from "@/components/ui/container";
import SectionHeader from "../ui/section-header";
import dynamic from "next/dynamic";
import { useTranslation } from "../../lib/translation-context";

// Dynamically import NextImage to reduce initial bundle size
const NextImage = dynamic(() => import("../../../components/NextImage"), {
  ssr: true,
});

export function About() {
  const { t } = useTranslation();
  return (
    <section className="py-12 bg-white" id="about">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-16">
          <SectionHeader text={t.features.longLastingFreshness.title} />
          
          <h2 className="text-4xl md:text-5xl mt-3 font-bold tracking-tight mb-4 bg-gradient-to-r from-[#FF3131] to-[#FF3131]/80 bg-clip-text text-transparent">{t.nav.whyPurrify}?</h2>
          
          <div className="relative group flex flex-col items-center my-8">
            {/* Pre-allocate space for the image with a fixed height container */}
            <div className="absolute -inset-4 bg-gradient-to-r from-[#FF3131]/20 to-[#5B2EFF]/30 rounded-3xl blur-xl opacity-70 group-hover:opacity-100 transition duration-700"></div>
            <div className="relative overflow-hidden rounded-3xl shadow-2xl group-hover:shadow-[#E0EFC7]/50 transition duration-300 w-10/12 h-[340px]">
              <NextImage
                src="/Carbon sketch.png"
                alt="Carbon sketch illustration"
                width={0}
                height={0}
                sizes="(max-width: 768px) 100vw, 500px"
                className="w-full h-auto transition duration-700"
              />
            </div>
          </div>
          
          <p className="text-3xl font-semibold text-[#333333] mb-6">
          {t.features.safeAndNatural.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="hidden md:block">
            <div className="grid grid-cols-2 gap-4">
              <div className="overflow-hidden rounded-xl shadow-lg">
                <NextImage
                  src="/optimized/three_bags_no_bg.webp"
                  alt="65g bag of activated carbon"
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover transform hover:scale-110 transition duration-500"
                  loading="lazy"
                />
              </div>
              <div className="overflow-hidden rounded-xl shadow-lg">
                <NextImage
                  src="/optimized/carbon_magnified_image.webp"
                  alt="Micropore magnified view of activated carbon"
                  width={400}
                  height={300}
                  className="w-full h-48 object-contain transform hover:scale-90 transition duration-500"
                  loading="lazy"
                />
              </div>
              <div className="overflow-hidden rounded-xl shadow-lg col-span-2">
                <NextImage
                  src="https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=800&q=80"
                  alt="Cat in clean environment"
                  width={800}
                  height={400}
                  className="w-full h-48 object-cover transform hover:scale-110 transition duration-500"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <p className="text-gray-700 leading-relaxed text-lg">
            {t.features.odorElimination.description}
            </p>
            <p className="text-gray-700 leading-relaxed text-lg">
            {t.features.catFriendly.description}
            </p>
            <p className="text-gray-700 leading-relaxed text-lg">
              <span className="font-bold text-[#FF3131]">
              {t.siteName} {t.features.odorElimination.title}.
              </span>
            </p>
            <p className="text-gray-700 leading-relaxed text-lg">
            {t.features.longLastingFreshness.description} {t.features.worksWithAnyLitter.description}
            </p>
          </div>
        </div>

        {/* Card removed as requested */}

        {/* Floating particles - using fixed positioning instead of absolute to prevent layout shifts */}
        <div className="relative mt-16 h-20">
          <div
            className="fixed -top-10 left-1/4 w-8 h-8 bg-[#E0EFC7] rounded-full opacity-50 pointer-events-none"
            style={{ animationDuration: "3s" }}
          ></div>
          <div
            className="fixed top-20 right-1/3 w-6 h-6 bg-[#FF3131]/30 rounded-full opacity-40 pointer-events-none"
            style={{ animationDuration: "5s" }}
          ></div>
          <div
            className="fixed -bottom-10 right-1/4 w-10 h-10 bg-[#E0EFC7]/70 rounded-full opacity-60 pointer-events-none"
            style={{ animationDuration: "4s" }}
          ></div>
        </div>
      </Container>
    </section>
  );
}
