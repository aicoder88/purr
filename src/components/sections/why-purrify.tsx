import { Container } from "@/components/ui/container";
import { Wind, Cat, Clock, Layers, Sparkles, PiggyBank } from "lucide-react"; // Changed Leaf to Sparkles
import SectionHeader from "../ui/section-header";
import NextImage from "../../../components/NextImage";
import { useTranslation } from "../../lib/translation-context";

export function WhyPurrify() {
  const { t } = useTranslation();
  
  const reasons = [
    {
      icon: Wind,
      title: t.features.odorElimination.title.toUpperCase(),
      description: t.features.odorElimination.description,
      image: "/optimized/micropores_magnified_view.webp"
    },
    {
      icon: Cat,
      title: t.features.catFriendly.title.toUpperCase(),
      description: t.features.catFriendly.description,
      image: "/optimized/natural-cat-litter.webp"
    },
    {
      icon: Clock,
      title: t.features.longLastingFreshness.title.toUpperCase(),
      description: t.features.longLastingFreshness.description,
      image: "/optimized/fresh.webp"
    },
    {
      icon: Layers,
      title: t.features.worksWithAnyLitter.title.toUpperCase(),
      description: t.features.worksWithAnyLitter.description,
      image: "/optimized/clay-cat-litter.webp"
    },
    {
      icon: Sparkles,
      title: t.features.natural.title.toUpperCase(),
      description: t.features.natural.description,
      image: "/optimized/Carbon-sktech.webp",
      color: "bg-[#E8F5E9]",
      textColor: "text-[#2E7D32]",
    },
    {
      icon: PiggyBank,
      title: t.features.costEffective.title.toUpperCase(),
      description: t.features.costEffective.description,
      image: "/optimized/cost-effective.webp",
      color: "bg-[#FFF3E0]",
      textColor: "text-[#E65100]",
    },
    {
      icon: Sparkles,
      title: t.features.freePurrify.title.toUpperCase(),
      description: t.features.freePurrify.description,
      image: "/optimized/free-purrify.webp",
      color: "bg-[#E3F2FD]",
      textColor: "text-[#1565C0]",
    },
    {
      icon: Sparkles,
      title: t.features.beforeAfter.title.toUpperCase(),
      description: t.features.beforeAfter.description,
      image: "/optimized/before-after.webp",
      color: "bg-[#F3E5F5]",
      textColor: "text-[#7B1FA2]",
    },
  ];

  // Define color themes to cycle through
  const colorThemes = [
    { bgGradient: "from-[#FF3131] to-[#FF3131]/80", textClass: "text-[#FF3131]", shadow: "shadow-red-200/50", border: "border-red-100" },
    { bgGradient: "from-[#5B2EFF] to-[#5B2EFF]/80", textClass: "text-[#5B2EFF]", shadow: "shadow-purple-200/50", border: "border-purple-100" },
    { bgGradient: "from-[#03E46A] to-[#03E46A]/80", textClass: "text-[#03E46A]", shadow: "shadow-green-200/50", border: "border-green-100" },
  ];

  return (
    <section
      className="pt-2 pb-12 bg-gradient-to-br from-orange-50 to-white mb-16"
      id="why-purrify"
    >
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-16">
          {/* <div className="inline-block px-4 py-1 bg-orange-100 rounded-full text-orange-600 font-medium text-sm mb-4">
            The Science Behind Purrify
          </div> */}
        
          <h2 className="text-6xl font-bold tracking-tight mb-4 bg-gradient-to-r from-[#FF3131] to-[#5B2EFF] bg-clip-text text-transparent">
            {t.nav.whyPurrify}
          </h2>
          <p className="text-gray-600 text-lg">
            {t.siteDescription}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reasons.map((reason, index) => {
              const theme = colorThemes[index % 3];
              const IconComponent = reason.icon;
              return (
                <div
                  key={index}
                  className={`bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border ${theme.border} transition-all duration-500 hover:${theme.shadow} hover:-translate-y-2 group overflow-hidden flex flex-col`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="aspect-video overflow-hidden h-[225px]">
                    <NextImage
                      src={reason.image}
                      alt={reason.title}
                      width={400}
                      height={225}
                      loading={index < 3 ? "eager" : "lazy"}
                      className={`w-full h-full transition-transform duration-500 group-hover:scale-105`}
                      style={{
                        objectFit: 'cover',
                        objectPosition: 'center',
                      }}
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center mb-4">
                      <div
                        className={`p-3 rounded-full shadow-md mr-3 group-hover:scale-110 transition-transform duration-300 bg-gradient-to-r ${theme.bgGradient}`}
                      >
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <h3 className={`font-bold text-xl ${theme.textClass}`}>
                        {reason.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed text-sm flex-grow">
                      {reason.description}
                    </p>
                  </div>
                </div>
              );
            })}
        </div>

        <div className="mt-16 text-center">
          <div className="relative bg-gradient-to-r from-[#FF3131]/10 to-[#5B2EFF]/10 px-12 py-10 rounded-3xl shadow-xl border-2 border-[#FF3131]/30 max-w-4xl mx-auto overflow-hidden">
            <div className="fixed -top-10 -left-10 w-40 h-40 bg-[#FF3131]/20 rounded-full blur-3xl pointer-events-none" style={{ transform: 'translate3d(0,0,0)' }}></div>
            <div className="fixed -bottom-10 -right-10 w-40 h-40 bg-[#5B2EFF]/20 rounded-full blur-3xl pointer-events-none" style={{ transform: 'translate3d(0,0,0)' }}></div>
            <div className="relative z-10 flex flex-col items-center">
              <NextImage
                src="/optimized/icon-128.webp"
                alt="Purrify Logo"
                width={64}
                height={64}
                className="h-16 w-auto mb-4"
              />
              <p className="text-3xl font-bold text-[#5B2EFF] mb-4">
                {t.structuredData.video.description}
              </p>
              <a
                href="#products"
                className="mt-4 inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#FF3131] to-[#FF3131]/80 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:from-[#FF3131]/90 hover:to-[#FF3131] transition-all duration-300 group"
              >
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