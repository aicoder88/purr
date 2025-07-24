import { Container } from "@/components/ui/container";
import SectionHeader from "../ui/section-header";
import NextImage from "../../../components/NextImage";
import { useTranslation } from "../../lib/translation-context";

export function HowItWorks() {
  const { t } = useTranslation();
  
  const steps = t.howItWorks?.steps ? [
    {
      number: t.howItWorks.steps[0].number,
      title: t.howItWorks.steps[0].title,
      description: t.howItWorks.steps[0].description,
      icon: "✨",
      image: "/optimized/panel_1.webp",
    },
    {
      number: t.howItWorks.steps[1].number,
      title: t.howItWorks.steps[1].title,
      description: t.howItWorks.steps[1].description,
      icon: "🔄",
      image: "/optimized/panel_2.webp",
    },
    {
      number: t.howItWorks.steps[2].number,
      title: t.howItWorks.steps[2].title,
      description: t.howItWorks.steps[2].description,
      icon: "😌",
      image: "/optimized/panel_3.webp",
    },
  ] : [
    {
      number: "01",
      title: "Open the Bag",
      description: "Pull off the label and unzip the bag",
      icon: "✨",
      image: "/optimized/panel_1.webp",
    },
    {
      number: "02",
      title: "Sprinkle on top of your cat litter",
      description:
        "Simply sprinkle a thin layer of Purrify on top of your cat's clean litter.",
      icon: "🔄",
      image: "/optimized/panel_2.webp",
    },
    {
      number: "03",
      title: "Mix & enjoy freshness!",
      description:
        "Gently mix it into the top layer of the litter for maximum effectiveness.",
      icon: "😌",
      image: "/optimized/panel_3.webp",
    },
  ];

  return (
    <section
      className="pb-20 bg-gradient-to-br from-white to-orange-50 dark:from-gray-900 dark:to-gray-950 transition-colors duration-300"
      id="how-it-works"
    >
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-16">
          {/* <div className="inline-block px-4 py-1 bg-[#E0EFC7] rounded-full text-[#FF3131] font-medium text-sm mb-4">
            Simple as 1-2-3
          </div> */}
          <SectionHeader text={t.howItWorks?.simpleAs123 || "Simple as 1-2-3"} />
          <h2 className="text-6xl font-bold tracking-tight mb-4 bg-gradient-to-r from-[#FF3131] to-[#5B2EFF] bg-clip-text text-transparent">
            {t.nav.howItWorks}
          </h2>
          <p className="text-gray-600 text-lg">
            {t.features.worksWithAnyLitter.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-[#E0EFC7] via-[#5B2EFF]/30 to-[#E0EFC7] hidden md:block"></div>

          {steps.map((step, index) => (
            <div
              key={step.number}
              className="relative group"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="bg-white/80 dark:bg-gray-900/90 backdrop-blur-sm rounded-2xl p-10 h-full border border-[#E0EFC7] dark:border-gray-800 shadow-xl transition-all duration-500 hover:shadow-[#E0EFC7]/50 dark:hover:shadow-[#3694FF]/30 hover:-translate-y-2 z-10 relative">
                <div
                  className={`absolute -top-6 left-1/2 -translate-x-1/2 ${
                    index === 0
                      ? "bg-gradient-to-r from-[#FF3131] to-[#FF3131]/80"
                      : index === 1
                      ? "bg-gradient-to-r from-[#5B2EFF] to-[#5B2EFF]/80"
                      : "bg-gradient-to-r from-[#03E46A] to-[#03E46A]/80"
                  } text-white w-16 h-16 rounded-full flex items-center justify-center font-bold text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300 z-20`}
                >
                  {step.number}
                </div>
                <div className="text-center mt-6">
                  <div className="overflow-hidden rounded-lg mb-4 h-[250px] sm:h-[400px] flex items-center justify-center">
                    <NextImage
                      src={step.image}
                      alt={`${step.title} image`}
                      width={400}
                      height={400}
                      priority={true}
                      quality={90}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <h3
                    className={`font-bold text-2xl sm:text-3xl mb-3 sm:mb-4 ${
                      index === 0
                        ? "text-[#FF3131]"
                        : index === 1
                        ? "text-[#5B2EFF]"
                        : "text-[#03E46A]"
                    }`}
                  >
                    {step.title}
                  </h3>
                  <p className="text-gray-700 text-base sm:text-lg">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 sm:mt-20 flex justify-center">
          <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm p-6 sm:p-10 rounded-2xl shadow-lg border border-[#E0EFC7] dark:border-gray-800 w-full max-w-2xl flex flex-col items-center text-center transition-all duration-500 hover:shadow-[#E0EFC7]/40 dark:hover:shadow-[#3694FF]/20 hover:-translate-y-1 group overflow-hidden">
            <div className="w-full flex justify-center mb-6">
              <NextImage
                src="/optimized/three_bags_no_bg.webp"
                alt="Purrify works with any litter"
                width={340}
                height={180}
                className="rounded-xl object-cover shadow-md"
                loading="eager"
              />
            </div>
            <h3 className="font-bold text-2xl mb-3 text-[#333333] dark:text-white">
              {t.features.worksWithAnyLitter.title}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-lg mb-5 max-w-xl mx-auto">
              {t.features.worksWithAnyLitter.description}
            </p>
            <div className="flex flex-wrap justify-center gap-2 mt-2">
              {[
                t.howItWorks?.litterTypes?.clay || "Clay",
                t.howItWorks?.litterTypes?.crystal || "Crystal",
                t.howItWorks?.litterTypes?.natural || "Natural",
                t.howItWorks?.litterTypes?.clumping || "Clumping",
                t.howItWorks?.litterTypes?.nonClumping || "Non-Clumping",
              ].map((type) => (
                <span
                  key={type}
                  className="px-3 py-1 bg-[#E0EFC7] text-[#5B2EFF] rounded-full text-sm font-medium shadow-sm border border-[#E0EFC7]/60 dark:border-[#5B2EFF]/30"
                >
                  {type}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
