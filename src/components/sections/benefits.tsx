import { Container } from "@/components/ui/container";
import SectionHeader from "@/components/ui/section-header";
import { createColorClasses, createCardClasses, createSectionClasses, GRADIENTS, COLORS } from "@/lib/theme-utils";
import { useTranslation } from "@/lib/translation-context";

interface BenefitProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  colorScheme: 'green' | 'purple' | 'red';
}

const BenefitCard = ({ title, description, icon, colorScheme }: BenefitProps) => {
  const colors = createColorClasses(colorScheme);
  const cardClasses = createCardClasses(true);

  return (
    <div className={`flex flex-col h-full ${cardClasses}`}>
      <div className={`bg-gradient-to-r ${COLORS.primary[colorScheme].gradient} ${COLORS.primary[colorScheme].gradientDark} p-4 rounded-2xl w-20 h-20 flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform duration-300`}>
        <div className="h-10 w-10 text-white dark:text-gray-100">
          {icon}
        </div>
      </div>
      <h3 className={`font-bold text-xl mb-4 ${colors.text}`}>
        {title}
      </h3>
      <p className={`${COLORS.text.tertiary} leading-relaxed`}>
        {description}
      </p>
    </div>
  );
};

const ShieldIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    className="w-full h-full"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
    />
  </svg>
);

const LightningIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    className="w-full h-full"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 10V3L4 14h7v7l9-11h-7z"
    />
  </svg>
);

const DollarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    className="w-full h-full"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

// Default benefits for fallback
const defaultBenefits = [
  {
    title: "Odor Elimination",
    description: "Purrify's advanced formula effectively eliminates unpleasant litter box odors at their source. Say goodbye to the lingering smells that can permeate your home and welcome a fresher, more inviting environment for both you and your furry friend.",
  },
  {
    title: "Simple",
    description: "Purrify is formulated with simple coconut shells, activated to soak up odor. You can trust that you're providing your cat with a clean smelling box environment without exposing them to chemicals or toxins.",
  },
  {
    title: "Cost-Effective",
    description: "Purrify helps extend the life of your cat's litter by preventing odor buildup, which means you'll need to change the litter less frequently. This not only saves you money but also reduces waste, making it a win-win for both your wallet and the environment.",
  }
];

const benefitIcons = [<ShieldIcon key="shield" />, <LightningIcon key="lightning" />, <DollarIcon key="dollar" />];
const benefitColors: Array<'green' | 'purple' | 'red'> = ['green', 'purple', 'red'];

export function Benefits() {
  const { t } = useTranslation();
  const sectionClasses = createSectionClasses('light');

  // Use translated benefits if available, otherwise use defaults
  const benefitItems = t.benefitsSection?.items || defaultBenefits;

  return (
    <section
      className={sectionClasses}
      id="benefits"
    >
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-16">
          <SectionHeader text={t.benefitsSection?.sectionHeader || ""} />
          <h2 className={`text-5xl font-bold tracking-tight mb-4 ${GRADIENTS.text.primary} ${GRADIENTS.text.primaryDark}`}>
            {t.benefitsSection?.title || ""}
          </h2>
          <p className={`${COLORS.text.tertiary} text-xl`}>
            {t.benefitsSection?.subtitle || ""}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefitItems.map((benefit, index) => (
            <BenefitCard
              key={index}
              title={benefit.title}
              description={benefit.description}
              icon={benefitIcons[index] || benefitIcons[0]}
              colorScheme={benefitColors[index] || 'green'}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
