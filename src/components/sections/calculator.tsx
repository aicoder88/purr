import { Container } from "@/components/ui/container";
import { CostCalculator } from "@/components/ui/calculator";
import { useTranslation } from "../../lib/translation-context";

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
            {t.calculatorSection?.title || "Save Money While Keeping Your Home Fresh"}
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            {t.calculatorSection?.description || "Purrify extends the life of your cat litter by up to 50%, saving you money while eliminating odors. See how much you could save with our calculator below."}
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <CostCalculator />
        </div>
      </Container>
    </section>
  );
}
