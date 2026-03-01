import Link from "next/link";
import { Container } from "@/components/ui/container";
import { FEATURES } from "@/lib/constants";
import { Zap, Heart, Clock, Check, Leaf, DollarSign } from "lucide-react";
import SectionHeader from "@/components/ui/section-header";
import { useTranslations, useLocale } from "next-intl";

const iconMap = {
  Zap: Zap,
  Heart: Heart,
  Clock: Clock,
  Check: Check,
  Leaf: Leaf,
  DollarSign: DollarSign,
};

export function Features() {
  const t = useTranslations();
  const locale = useLocale();
  const localePrefix = locale === 'fr' ? '/fr' : '';
  const learnMoreHref = `${localePrefix}/learn/how-it-works`;

  return (
    <section
      className="py-12 bg-gradient-to-br from-[#FFFFF5] to-[#FFFFFF] from-gray-900 to-gray-950 transition-colors duration-300"
      id="features"
    >
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-16">
          <SectionHeader text={t('featuresSection.badge')} />
          <h2 className="font-heading text-4xl font-bold tracking-tight mb-6 bg-gradient-to-r from-[#FF3131] to-[#FF3131]/80 from-[#FF5050] to-[#FF5050]/80 bg-clip-text text-transparent">
            {t('featuresSection.title')}
          </h2>
          <p className="text-gray-600 text-gray-300 text-gray-300 leading-relaxed text-lg text-gray-300">
            {t('featuresSection.paragraph1')}
          </p>
          <p className="text-gray-600 text-gray-300 leading-relaxed mt-4 text-lg text-gray-300">
            {t('featuresSection.paragraph2')}
          </p>
          <p className="text-[#333333] leading-relaxed mt-4 font-bold text-3xl text-foreground">
            {t('featuresSection.tagline')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, index) => {
            const IconComponent = iconMap[feature.icon as keyof typeof iconMap];

            return (
              <div
                key={index}
                className="flex flex-col h-full bg-[#FFFFFF]/90 backdrop-blur-sm p-4 sm:p-8 rounded-2xl shadow-xl border border-[#E0EFC7] transition-all duration-500 hover:shadow-[#E0EFC7]/70 hover:-translate-y-2 group"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div
                  className={`bg-gradient-to-r ${index % 3 === 0
                      ? "from-[#FF3131] to-[#FF3131]/80"
                      : index % 3 === 1
                        ? "from-[#5B2EFF] to-[#5B2EFF]/80"
                        : "from-green-600 to-green-500"
                    } p-3 sm:p-4 rounded-2xl w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mb-4 sm:mb-6 shadow-md group-hover:scale-110 transition-transform duration-300`}
                >
                  <IconComponent className="h-7 w-7 text-white text-gray-100 text-gray-100" />
                </div>
                <h3
                  className={`font-bold text-lg sm:text-xl mb-3 sm:mb-4 ${index % 3 === 0
                      ? "text-[#FF3131]"
                      : index % 3 === 1
                        ? "text-[#5B2EFF]"
                        : "text-green-700 text-green-500"
                    }`}
                >
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-gray-300 leading-relaxed text-sm sm:text-base">
                  {feature.description}
                </p>

                <div className="mt-6 pt-6 border-t border-[#E0EFC7]">
                  <Link
                    href={learnMoreHref}
                    className={`font-medium flex items-center transition-colors ${index % 3 === 0
                        ? "text-[#FF3131] group-hover:text-[#FF3131]/80"
                        : index % 3 === 1
                          ? "text-[#5B2EFF] group-hover:text-[#5B2EFF]/80"
                          : "text-green-700 text-green-500 group-hover:text-green-800 group-hover:text-green-400"
                      }`}
                  >
                    {t('featuresSection.learnMore')}
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
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
