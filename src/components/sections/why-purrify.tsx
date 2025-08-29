import { Container } from "@/components/ui/container";
import { Wind, Cat, Clock, Layers, Sparkles, PiggyBank } from "lucide-react"; // Changed Leaf to Sparkles
import NextImage from "../../../components/NextImage";
import { useTranslation } from "../../lib/translation-context";

export function WhyPurrify() {
  const { t } = useTranslation();
  
  const reasons = [
    {
      icon: Wind,
      title: t.features.odorElimination.title.toUpperCase(),
      description: t.features.odorElimination.description,
      image: "/micropores_magnified_view.jpeg"
    },
    {
      icon: Cat,
      title: `${t.features.catFriendly.title.toUpperCase()} & ${t.features.natural.title.toUpperCase()}`,
      description: `${t.features.catFriendly.description}\n${t.features.natural.description}`,
      image: "/Carbon sktech.png",
      color: "bg-[#E8F5E9]",
      textColor: "text-[#2E7D32]",
    },
    {
      icon: Clock,
      title: t.features.longLastingFreshness.title.toUpperCase(),
      description: t.features.longLastingFreshness.description,
      image: "/fresh.png"
    },
    {
      icon: Layers,
      title: t.features.worksWithAnyLitter.title.toUpperCase(),
      description: t.features.worksWithAnyLitter.description,
      image: "/clay-cat-litter.webp"
    },
    {
      icon: PiggyBank,
      title: t.features.costEffective.title.toUpperCase(),
      description: t.features.costEffective.description,
      image: "/cost effective.png",
      color: "bg-[#FFF3E0]",
      textColor: "text-[#E65100]",
    },
    {
      icon: Sparkles,
      title: t.features.beforeAfter.title.toUpperCase(),
      description: t.features.beforeAfter.description,
      image: "/before after.png",
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
      className="relative pt-2 pb-12 bg-gradient-to-br from-orange-50 to-[#F5F5F5] dark:from-gray-900 dark:to-gray-950 transition-colors duration-300"
      id="why-purrify"
    >
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-16">
          {/* <div className="inline-block px-4 py-1 bg-orange-100 rounded-full text-orange-600 dark:text-orange-400 font-medium text-sm mb-4">
            The Science Behind Purrify
          </div> */}
        
          <h2 className="text-6xl font-bold tracking-tight mb-4 bg-gradient-to-r from-[#FF3131] to-[#5B2EFF] dark:from-[#FF5050] dark:to-[#3694FF] bg-clip-text text-transparent">
            {t.nav.whyPurrify}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg dark:text-gray-300">
            Discover why thousands of cat owners choose Purrify for a truly fresh-smelling home, without masking odors or using harsh chemicals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reasons.map((reason, index) => {
              const theme = colorThemes[index % 3];
              const IconComponent = reason.icon;
              return (
                <div
                  key={index}
                  className={`bg-white dark:bg-gray-800/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl shadow-xl border ${theme.border} transition-all duration-500 hover:${theme.shadow} hover:-translate-y-2 group overflow-hidden flex flex-col`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="aspect-video overflow-hidden h-[200px] sm:h-[225px] flex items-center justify-center">
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
                        transform: reason.title.includes('LONG-LASTING FRESHNESS') || reason.title.includes('COST-EFFECTIVE')
                          ? 'scale(1.2)'
                          : 'none'
                      }}
                    />
                  </div>
                  <div className="p-4 sm:p-6 flex flex-col flex-grow">
                    <div className="flex items-center mb-3 sm:mb-4">
                      <div
                        className={`p-2 sm:p-3 rounded-full shadow-md mr-3 group-hover:scale-110 transition-transform duration-300 bg-gradient-to-r ${theme.bgGradient}`}
                      >
                        <IconComponent className="h-5 w-5 text-white dark:text-gray-100" />
                      </div>
                      <h3 className={`font-bold text-lg sm:text-xl ${theme.textClass} text-gray-900 dark:text-gray-100`}>
                        {reason.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base flex-grow">
                      {reason.description.split('\n').map((line, i) => (
                        <span key={i} className="block mb-1">{line}</span>
                      ))}
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
      </Container>
      {/* Downward-facing arrow to encourage scrolling */}
      <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-0 z-20 flex justify-center w-full">
        <svg
          className="w-10 h-10 drop-shadow-md animate-bounce mb-[-20px]"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-400 dark:text-gray-500"
          />
        </svg>
      </div>
    </section>
  );
}