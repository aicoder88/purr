import { Container } from "@/components/ui/container";
import { NewsletterSignup } from "@/components/newsletter/NewsletterSignup";
import { createSectionClasses } from "@/lib/theme-utils";

export function Newsletter() {

  const sectionClasses = createSectionClasses('light');

  return (
    <section id="newsletter" className={`${sectionClasses} py-16`}>
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
              Backorder Waitlist
            </h2>
            <p className="mt-3 text-base md:text-lg text-gray-700 dark:text-gray-300">
              Join the waitlist and we will notify you as soon as shipping resumes.
            </p>
          </div>
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
