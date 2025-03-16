import { Container } from "@/components/ui/container";
import { CostCalculator } from "@/components/ui/calculator";

export function Calculator() {
  return (
    <section
      className="py-12 bg-gradient-to-b from-white to-orange-50"
      id="calculator"
    >
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-[#43FBB4] to-[#6A43FB] bg-clip-text text-transparent">
            Save Money While Keeping Your Home Fresh
          </h2>
          <p className="text-gray-600">
            Purrify extends the life of your cat litter by up to 50%, saving you
            money while eliminating odors. See how much you could save with our
            calculator below.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <CostCalculator />
        </div>
      </Container>
    </section>
  );
}
