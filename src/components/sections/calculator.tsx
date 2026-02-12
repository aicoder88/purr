import dynamic from "next/dynamic";
import { Container } from "@/components/ui/container";
import { useTranslation } from "@/lib/translation-context";

function CalculatorLoading() {
  const { locale } = useTranslation();
  const loadingText =
    locale === 'fr'
      ? 'Chargement du calculateur...'
      : locale === 'zh'
        ? '计算器加载中...'
        : locale === 'es'
          ? 'Cargando calculadora...'
          : 'Loading calculator...';

  return (
    <div className="w-full h-96 flex items-center justify-center bg-white/50 dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-4 border-[#5B2EFF] border-t-transparent rounded-full animate-spin" />
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {loadingText}
        </span>
      </div>
    </div>
  );
}

// Dynamic import for CostCalculator to reduce initial bundle size
// This component uses recharts and framer-motion which are heavy libraries
const CostCalculator = dynamic(
  () => import("@/components/ui/calculator").then((mod) => mod.CostCalculator),
  {
    ssr: false,
    loading: () => <CalculatorLoading />,
  }
);

export function Calculator() {
  const { t } = useTranslation();

  return (
    <section
      className="py-12 bg-gradient-to-b from-white to-orange-50 dark:from-gray-900 dark:to-gray-950 transition-colors duration-300"
      id="calculator"
    >
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="font-heading text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-[#03E46A] to-[#5B2EFF] dark:from-[#3694FF] dark:to-[#FF5050] bg-clip-text text-transparent">
            {t.calculatorSection?.title || ""}
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            {t.calculatorSection?.description || ""}
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <CostCalculator />
        </div>
      </Container>
    </section>
  );
}
