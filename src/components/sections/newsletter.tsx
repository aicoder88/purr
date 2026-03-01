import { Container } from '@/components/ui/container';
import { WaitlistSignup } from '@/components/newsletter/NewsletterSignup';
import { createSectionClasses } from '@/lib/theme-utils';

export function WaitlistSection() {
  const sectionClasses = createSectionClasses('light');

  return (
    <section id="waitlist" className={`${sectionClasses} py-16`}>
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-gray-100">
              Backorder Waitlist
            </h2>
            <p className="mt-3 text-base md:text-lg text-gray-700 text-gray-300">
              Sign up here and we&apos;ll create a Zendesk request so our team can notify you when
              shipping resumes.
            </p>
          </div>
          <WaitlistSignup className="" />
        </div>
      </Container>
    </section>
  );
}
