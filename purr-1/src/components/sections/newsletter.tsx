import { Container } from "@/components/ui/container";
import { NewsletterSignup } from "../newsletter/NewsletterSignup";
import { useTranslation } from "../../lib/translation-context";

export function Newsletter() {
  useTranslation();

  return (
    <section id="newsletter" className="py-16 bg-[#FFFFF5] dark:bg-gray-900">
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
