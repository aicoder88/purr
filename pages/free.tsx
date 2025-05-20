import { Layout } from "@/components/layout/layout";
import { NextPage } from "next";
import Head from "next/head";
import { FreeGiveawayForm } from "@/components/sections/free-giveaway-form";
import { Container } from "@/components/ui/container";
import { SITE_NAME } from "@/lib/constants";
import Image from "next/image";
import { PawPrint } from "lucide-react";

const FreePage: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Claim Your Free Bag of Purrify | {SITE_NAME}</title>
        <meta name="description" content="Get a free trial-size bag of Purrify cat litter additive" />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#FFFFFF] via-[#FFFFF5] to-[#FFFFFF] relative overflow-hidden">
        {/* Subtle background pattern with paw prints */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-repeat"
               style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}
          ></div>
        </div>
        
        {/* Decorative paw prints */}
        <div className="absolute top-20 right-10 text-indigo-200 opacity-30 transform rotate-12">
          <PawPrint size={60} />
        </div>
        <div className="absolute bottom-20 left-10 text-indigo-200 opacity-30 transform -rotate-12">
          <PawPrint size={40} />
        </div>
        
        <Container>
          <div className="max-w-4xl mx-auto">
            {/* Image and headline in a flex container */}
            <div className="flex flex-col md:flex-row items-center gap-8 mb-12 bg-white/50 p-8 rounded-xl backdrop-blur-sm shadow-xl transition-all duration-300 hover:shadow-2xl border border-indigo-100/50">
              <div className="md:w-1/2 transform transition-transform duration-500 hover:scale-105">
                <div className="relative">
                  <div className="absolute inset-0 bg-indigo-600/10 rounded-lg blur-xl"></div>
                  <Image
                    src="/free purrify.png"
                    alt="Free Bag of Purrify"
                    width={400}
                    height={300}
                    className="rounded-lg shadow-lg border-2 border-indigo-100 relative z-10"
                    priority
                  />
                  <div className="absolute -bottom-3 -right-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-md z-20 animate-pulse">
                    FREE
                  </div>
                </div>
              </div>
              
              <div className="md:w-1/2 flex items-center">
                <div>
                  <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight md:text-left leading-tight">
                    <div className="flex items-center">
                      <span className="bg-gradient-to-r from-[#1E1B4B] to-[#4338CA] bg-clip-text text-transparent">
                        Claim Your Free
                      </span>
                    </div>
                    
                    <div className="flex items-center my-2">
                      <Image
                        src="/samplebag.jpg"
                        alt="Sample Bag of Purrify"
                        width={80}
                        height={60}
                        className="rounded-md shadow-sm mr-3 border border-indigo-100"
                      />
                      <span className="bg-gradient-to-r from-[#4338CA] to-[#6366F1] bg-clip-text text-transparent">
                        Bag of Purrify
                      </span>
                    </div>
                    
                    <span className="block mt-3 text-lg font-normal text-indigo-700">Limited time offer for cat owners</span>
                  </h1>
                </div>
              </div>
            </div>
            
            <div className="mb-12 bg-white/80 p-8 rounded-xl shadow-md border border-indigo-100/50">
              <div className="flex items-start space-x-4">
                <PawPrint className="h-6 w-6 text-indigo-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-lg text-[#333333] mb-6 leading-relaxed">
                    <strong className="text-indigo-700 text-xl">Attention Cat Owners:</strong> Say goodbye to litter box odors forever with our revolutionary activated carbon additive.
                  </p>
                  <p className="text-lg text-[#333333] leading-relaxed">
                    We're so confident you'll love the results, we're giving away <strong className="text-indigo-700">FREE trial-size bags</strong> of Purrify.
                    Experience the difference for yourself – no more embarrassing odors, just a fresh-smelling home.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-8 rounded-xl shadow-lg border border-indigo-100 transform transition-all duration-500 hover:shadow-2xl relative overflow-hidden">
              {/* Subtle paw print background for form */}
              <div className="absolute inset-0 opacity-5 pointer-events-none">
                <PawPrint className="absolute top-5 right-5 h-20 w-20" />
                <PawPrint className="absolute bottom-5 left-5 h-20 w-20" />
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-center mb-6">
                  <PawPrint className="h-6 w-6 text-indigo-600 mr-2" />
                  <h2 className="text-2xl font-bold text-indigo-800 text-center">Fill Out The Form Below To Claim Your Free Bag</h2>
                </div>
                <FreeGiveawayForm />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </Layout>
  );
};

export default FreePage;