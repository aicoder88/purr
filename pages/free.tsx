import { Layout } from "@/components/layout/layout";
import { NextPage } from "next";
import Head from "next/head";
import { FreeGiveawayForm } from "@/components/sections/free-giveaway-form";
import { Container } from "@/components/ui/container";
import { SITE_NAME } from "@/lib/constants";
import Image from "next/image";

const FreePage: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Claim Your Free Bag of Purrify | {SITE_NAME}</title>
        <meta name="description" content="Get a free trial-size bag of Purrify cat litter additive" />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#FFFFFF] via-[#FFFFF5] to-[#FFFFFF]">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="mb-8 text-center">
              <Image
                src="/free purrify.png"
                alt="Free Bag of Purrify"
                width={300}
                height={200}
                className="mx-auto rounded-lg shadow-md"
                priority
              />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-center mb-8">
              <span className="bg-gradient-to-r from-[#1E1B4B] to-[#1E1B4B]/80 bg-clip-text text-transparent">
                Claim Your Free Bag of Purrify
              </span>
            </h1>
            
            <div className="mb-12 text-center">
              <p className="text-lg text-[#333333] mb-6">
                <strong>Attention Cat Owners:</strong> Say goodbye to litter box odors forever with our revolutionary activated carbon additive.
              </p>
              <p className="text-lg text-[#333333]">
                We're so confident you'll love the results, we're giving away <strong>FREE trial-size bags</strong> of Purrify. 
                Experience the difference for yourself – no more embarrassing odors, just a fresh-smelling home.
              </p>
            </div>
            
            <FreeGiveawayForm />
          </div>
        </Container>
      </section>
    </Layout>
  );
};

export default FreePage;