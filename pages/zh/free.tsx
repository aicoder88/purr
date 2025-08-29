import { Container } from '@/components/ui/container';
import { NextPage } from "next";
import Head from "next/head";
import { FreeGiveawayForm } from "@/components/sections/free-giveaway-form";
import { SITE_NAME } from "@/lib/constants";
import NextImage from "../../components/NextImage";
import { PawPrint } from "lucide-react";
import { useState, useEffect } from "react";
import { useTranslation } from "@/lib/translation-context";

const FreePage: NextPage = () => {
  const { t } = useTranslation();
  
  // State for countdown timer - initialize with zeros to avoid hydration mismatch
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number }>({
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  // Random number of claimed bags - initialize with a fixed value to avoid hydration mismatch
  const [claimedBags, setClaimedBags] = useState<number>(205);
  
  // Initialize values on client-side only to avoid hydration mismatch
  useEffect(() => {
    // Set initial random values only on client-side
    setTimeLeft({
      hours: Math.floor(Math.random() * 24),
      minutes: Math.floor(Math.random() * 60),
      seconds: Math.floor(Math.random() * 60)
    });
    
    setClaimedBags(Math.floor(Math.random() * (440 - 205 + 1)) + 205);
    
    // Update countdown timer every second
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        const newSeconds = prevTime.seconds - 1;
        const newMinutes = newSeconds < 0 ? prevTime.minutes - 1 : prevTime.minutes;
        const newHours = newMinutes < 0 ? prevTime.hours - 1 : prevTime.hours;
        
        return {
          hours: newHours < 0 ? 23 : newHours,
          minutes: newMinutes < 0 ? 59 : newMinutes,
          seconds: newSeconds < 0 ? 59 : newSeconds
        };
      });
    }, 1000);
    
    // Clean up timer
    return () => clearInterval(timer);
  }, []);
  
  return (
    <>
      <Head>
        <title>{t.freeTrialPage.urgentBanner}: {t.freeTrialPage.claimTrial} | {SITE_NAME}</title>
        <meta name="description" content={t.freeTrialPage.instantOdorElimination} />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://purrify.ca/zh/free" />
        <link rel="alternate" hrefLang="zh" href="https://purrify.ca/zh/free" />
        <link rel="alternate" hrefLang="en" href="https://purrify.ca/free" />
        <link rel="alternate" hrefLang="fr" href="https://purrify.ca/fr/free" />
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
            <div className="flex flex-col md:flex-row items-center gap-8 mb-12 bg-white/80 p-8 rounded-xl backdrop-blur-sm shadow-xl transition-all duration-300 hover:shadow-2xl border border-indigo-100/50">
              {/* Pre-headline banner */}
              <div className="absolute -top-4 left-0 right-0 flex justify-center">
                <div className="bg-gradient-to-r from-red-600 to-red-700 text-white dark:text-gray-100 px-6 py-2 rounded-full shadow-lg transform -rotate-1">
                  <span className="font-bold text-sm uppercase tracking-wide">{t.freeTrialPage.urgentBanner}</span>
                </div>
              </div>
              
              <div className="flex-shrink-0">
                <NextImage
                  src="/purrify-17g-product-image.png"
                  alt={t.freeTrialPage.freeTrialBag}
                  width={300}
                  height={300}
                  className="rounded-lg shadow-lg"
                />
              </div>
              
              <div className="text-center md:text-left">
                <div className="mb-4">
                  <span className="bg-gradient-to-r from-green-600 to-green-700 text-white dark:text-gray-100 px-4 py-2 rounded-full text-xl font-bold shadow-lg">
                    {t.freeTrialPage.free}
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                  {t.freeTrialPage.claimTrial.split('免费')[0]}<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                    免费{t.freeTrialPage.claimTrial.split('免费')[1]}
                  </span>
                </h1>
                <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                  {t.freeTrialPage.instantOdorElimination}<br />
                  <span className="font-semibold text-indigo-600">{t.freeTrialPage.zeroCommitmentGift}</span>
                </p>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <h3 className="text-lg font-bold text-green-800 mb-2">{t.freeTrialPage.whatYouGet}</h3>
                  <ul className="text-green-700 space-y-1">
                    <li className="flex items-start">
                      <span className="text-green-600 dark:text-green-400 font-bold mr-2">✓</span>
                      <span>{t.freeTrialPage.freeTrialBag}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 dark:text-green-400 font-bold mr-2">✓</span>
                      <span>快速配送</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 dark:text-green-400 font-bold mr-2">✓</span>
                      <span>{t.freeTrialPage.expertTips}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 dark:text-green-400 font-bold mr-2">✓</span>
                      <span>{t.freeTrialPage.zeroCommitment}</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
                  <h3 className="text-xl font-bold text-red-600 dark:text-red-400 mb-2">{t.freeTrialPage.disappearsIn}</h3>
                  <div className="flex justify-center space-x-4 mb-2">
                    <div className="bg-red-600 text-white dark:text-gray-100 px-3 py-2 rounded-md font-mono">{timeLeft.hours.toString().padStart(2, '0')}</div>
                    <div className="bg-red-600 text-white dark:text-gray-100 px-3 py-2 rounded-md font-mono">{timeLeft.minutes.toString().padStart(2, '0')}</div>
                    <div className="bg-red-600 text-white dark:text-gray-100 px-3 py-2 rounded-md font-mono">{timeLeft.seconds.toString().padStart(2, '0')}</div>
                  </div>
                  <div className="flex justify-center text-xs text-gray-600 dark:text-gray-300 space-x-16 mb-4">
                    <span>{t.freeTrialPage.countdownLabels.hours}</span>
                    <span>{t.freeTrialPage.countdownLabels.minutes}</span>
                    <span>{t.freeTrialPage.countdownLabels.seconds}</span>
                  </div>
                  <p className="text-center text-red-800 font-medium">{t.freeTrialPage.limitedTo500}</p>
                  <p className="text-center text-red-800 font-medium">{t.freeTrialPage.alreadyClaimed}：{claimedBags} / 500</p>
                  <p className="text-center font-bold mt-2">{t.freeTrialPage.yourFreeTrialWaits}</p>
                </div>
                
                <div className="mb-8 bg-indigo-50 border border-indigo-100 rounded-lg p-4">
                  <h3 className="text-xl font-bold text-indigo-800 mb-4">{t.freeTrialPage.testimonialsTestUsers}</h3>
                  <div className="space-y-4">
                    <div className="bg-white p-3 rounded-md shadow-sm">
                      <p className="italic">&quot;{t.freeTrialPage.testimonials[0].text}&quot;</p>
                      <p className="text-right font-medium text-indigo-600">- {t.freeTrialPage.testimonials[0].author}</p>
                    </div>
                    <div className="bg-white p-3 rounded-md shadow-sm">
                      <p className="italic">&quot;{t.freeTrialPage.testimonials[1].text}&quot;</p>
                      <p className="text-right font-medium text-indigo-600">- {t.freeTrialPage.testimonials[1].author}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6 mb-8">
                  <div className="flex items-center justify-center mb-4">
                    <PawPrint className="h-8 w-8 text-red-600 mr-3" />
                    <h2 className="text-3xl font-bold text-red-600 dark:text-red-400 text-center">{t.freeTrialPage.claimNow}</h2>
                  </div>
                  <p className="text-center text-red-800 mb-2">
                    <span className="font-bold">⚠️ {t.freeTrialPage.attention}：</span> {t.freeTrialPage.highDemandWarning}
                  </p>
                </div>
                <FreeGiveawayForm />
                
                <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-6">
                  {t.freeTrialPage.disclaimer}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default FreePage;
