import { Container } from "@/components/ui/container";
import Image from 'next/image';
import { useTranslation } from "../../lib/translation-context";
import Link from "next/link";

export function HowItWorks() {
  const { t, locale } = useTranslation();
  
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
      className="pb-20 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-950 dark:via-purple-950/20 dark:to-gray-900 transition-colors duration-300 relative overflow-hidden"
      id="how-it-works"
    >
      {/* Animated background elements - hidden on mobile for performance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden sm:block">
        <div className="absolute top-40 right-20 w-64 h-64 bg-purple-300/20 dark:bg-purple-500/10 rounded-full blur-xl sm:blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 left-20 w-80 h-80 bg-pink-300/20 dark:bg-pink-500/10 rounded-full blur-xl sm:blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/40 dark:to-pink-900/40 rounded-full mb-8 border border-purple-200 dark:border-purple-800 shadow-lg">
            <span className="text-purple-700 dark:text-purple-300 font-semibold">{t.howItWorks?.simpleAs123 || "Simple as 1-2-3"}</span>
          </div>
          <h2 className="font-heading text-5xl md:text-7xl font-black tracking-tight mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 dark:from-purple-400 dark:via-pink-400 dark:to-orange-400 bg-clip-text text-transparent">
            {t.nav.howItWorks}
          </h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
            {t.features.worksWithAnyLitter.description} <Link href={`${locale === 'fr' ? '/fr' : ''}/learn/science`} className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 underline font-semibold">{t.howItWorks?.learnTheScience || "Learn the science"}</Link> or <Link href={`${locale === 'fr' ? '/fr' : ''}/products`} className="text-pink-600 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300 underline font-semibold">{t.howItWorks?.compareSizes || "compare our sizes"}</Link> to find what works best for you.
          </p>
        </div>

        {/* Enhanced Coconut Shells Visualization */}
        <div className="max-w-2xl mx-auto text-center mb-16 bg-gradient-to-br from-orange-100 to-yellow-100 dark:from-orange-900/30 dark:to-yellow-900/30 rounded-3xl p-10 border-2 border-orange-300 dark:border-orange-700 shadow-2xl transform hover:-translate-y-2 transition-all duration-500">
          <div className="overflow-hidden rounded-2xl mb-6 h-[300px] sm:h-[400px] flex items-center justify-center shadow-xl">
            <Image
              src="/optimized/catcoco.webp"
              alt="Pure sustainable coconut shells for Purrify activated carbon cat litter"
              width={400}
              height={400}
              loading="lazy"
              quality={90}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 600px"
            />
          </div>
          <p className="text-gray-800 dark:text-gray-200 text-lg sm:text-xl leading-relaxed font-medium">
            {t.howItWorks?.coconutDescription || "Pure, sustainable coconut shells are activated with filtered, pure, high pressure steam to open millions of holes, tunnels, and passage-ways to lock away odor molecules."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Enhanced connecting line with gradient */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-purple-300 via-pink-300 to-orange-300 dark:from-purple-700 dark:via-pink-700 dark:to-orange-700 hidden md:block rounded-full shadow-lg"></div>

          {steps.map((step, index) => (
            <div
              key={step.number}
              className="relative group"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="bg-white dark:bg-gray-800 backdrop-blur-sm rounded-3xl p-10 h-full border-2 border-purple-200 dark:border-purple-800 shadow-2xl transition-all duration-500 hover:shadow-purple-500/30 dark:hover:shadow-purple-500/50 hover:-translate-y-4 z-10 relative">
                <div
                  className={`absolute -top-8 left-1/2 -translate-x-1/2 ${
                    index === 0
                      ? "bg-gradient-to-r from-purple-600 to-purple-500"
                      : index === 1
                      ? "bg-gradient-to-r from-pink-600 to-pink-500"
                      : "bg-gradient-to-r from-orange-600 to-orange-500"
                  } text-white w-20 h-20 rounded-full flex items-center justify-center font-black text-3xl shadow-2xl group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 z-20 border-4 border-white dark:border-gray-900`}
                >
                  {step.number}
                </div>
                <div className="text-center mt-8">
                  <div className="overflow-hidden rounded-2xl mb-6 h-[250px] sm:h-[400px] flex items-center justify-center shadow-xl border-2 border-gray-100 dark:border-gray-700">
                    <Image
                      src={step.image}
                      alt={`Step ${step.number}: ${step.title} - ${step.description}`}
                      width={400}
                      height={400}
                      loading="lazy"
                      quality={90}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <h3
                    className={`font-black text-2xl sm:text-3xl mb-4 ${
                      index === 0
                        ? "text-purple-600 dark:text-purple-400"
                        : index === 1
                        ? "text-pink-600 dark:text-pink-400"
                        : "text-orange-600 dark:text-orange-400"
                    }`}
                  >
                    {step.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed font-medium">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </Container>
    </section>
  );
}