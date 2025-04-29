import { Layout } from "./layout/layout";
import { Hero } from "./sections/hero";
import { About } from "./sections/about";
import { HowItWorks } from "./sections/how-it-works";
import { Features } from "./sections/features";
import { Benefits } from "./sections/benefits";
import { WhyPurrify } from "./sections/why-purrify";
import { Products } from "./sections/products";
import { Testimonials } from "./sections/testimonials";
import { Calculator } from "./sections/calculator";
import { FAQ } from "./sections/faq";
import { BlogPreview } from "./sections/blog-preview";
import { Newsletter } from "./sections/newsletter";
import { CTA } from "./sections/cta";
import { Contact } from "./sections/contact";

function Home() {
  return (
    <Layout>
      <Hero />
      <About />
      <HowItWorks />
      {/* <Features /> */}
      {/* <Benefits /> */}
      {/* <Calculator /> */}
      <WhyPurrify />
      <Products />
      <Testimonials />
      <FAQ />
      {/* <BlogPreview /> */}
      <Newsletter />
      <CTA />
      <Contact />
    </Layout>
  );
}

export default Home;
