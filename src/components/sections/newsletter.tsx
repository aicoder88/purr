import { Container } from "@/components/ui/container";
import { NewsletterSignup } from "../newsletter/NewsletterSignup";
import { useTranslation } from "../../lib/translation-context";
import { createSectionClasses } from "@/lib/theme-utils";

export function Newsletter() {
  useTranslation();

  const sectionClasses = createSectionClasses('light');

  return (
    <section id="newsletter" className={`${sectionClasses} py-16`}>
      <Container>
        <div className="max-w-4xl mx-auto">
          <NewsletterSignup
            variant="default"
            showBenefits={true}
            discount={10}
            className=""
          />
        </div>
      </Container>
    </section>
  );
}
