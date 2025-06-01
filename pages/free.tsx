// import { Layout } from "@/components/layout/layout";
// import { NextPage } from "next";
// import Head from "next/head";
// import { FreeGiveawayForm } from "@/components/sections/free-giveaway-form";
// import { Container } from "@/components/ui/container";
// import { SITE_NAME } from "@/lib/constants";
// import NextImage from "../components/NextImage";
// import { PawPrint } from "lucide-react";
// import { useState, useEffect } from "react";

// const FreePage: NextPage = () => {
//   // State for countdown timer - initialize with zeros to avoid hydration mismatch
//   const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number }>({
//     hours: 0,
//     minutes: 0,
//     seconds: 0
//   });
  
//   // Random number of claimed bags - initialize with a fixed value to avoid hydration mismatch
//   const [claimedBags, setClaimedBags] = useState<number>(205);
  
//   // Initialize values on client-side only to avoid hydration mismatch
//   useEffect(() => {
//     // Set initial random values only on client-side
//     setTimeLeft({
//       hours: Math.floor(Math.random() * 24),
//       minutes: Math.floor(Math.random() * 60),
//       seconds: Math.floor(Math.random() * 60)
//     });
    
//     setClaimedBags(Math.floor(Math.random() * (440 - 205 + 1)) + 205);
    
//     // Update countdown timer every second
//     const timer = setInterval(() => {
//       setTimeLeft(prevTime => {
//         const newSeconds = prevTime.seconds - 1;
//         const newMinutes = newSeconds < 0 ? prevTime.minutes - 1 : prevTime.minutes;
//         const newHours = newMinutes < 0 ? prevTime.hours - 1 : prevTime.hours;
        
//         return {
//           hours: newHours < 0 ? 23 : newHours,
//           minutes: newMinutes < 0 ? 59 : newMinutes,
//           seconds: newSeconds < 0 ? 59 : newSeconds
//         };
//       });
//     }, 1000);
    
//     // Clean up timer
//     return () => clearInterval(timer);
//   }, []);
  
//   return (
//     <Layout>
//       <Head>
//         <title>URGENT: FREE Purrify Trial Bag Giveaway | {SITE_NAME}</title>
//         <meta name="description" content="Claim your FREE trial-size bag of Purrify cat litter additive. Zero cost. Zero risk. Zero more litter box smell." />
//         <meta name="robots" content="noindex, nofollow" />
//         <link rel="canonical" href="https://purrify.ca/free" />
//         <link rel="alternate" hrefLang="en" href="https://purrify.ca/free" />
//         <link rel="alternate" hrefLang="fr" href="https://purrify.ca/fr/free" />
//       </Head>
      
//       <section className="py-16 md:py-24 bg-gradient-to-br from-[#FFFFFF] via-[#FFFFF5] to-[#FFFFFF] relative overflow-hidden">
//         {/* Subtle background pattern with paw prints */}
//         <div className="absolute inset-0 opacity-5 pointer-events-none">
//           <div className="absolute top-0 left-0 w-full h-full bg-repeat"
//                style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}
//           ></div>
//         </div>
        
//         {/* Decorative paw prints */}
//         <div className="absolute top-20 right-10 text-indigo-200 opacity-30 transform rotate-12">
//           <PawPrint size={60} />
//         </div>
//         <div className="absolute bottom-20 left-10 text-indigo-200 opacity-30 transform -rotate-12">
//           <PawPrint size={40} />
//         </div>
        
//         <Container>
//           <div className="max-w-4xl mx-auto">
//             {/* Image and headline in a flex container */}
//             <div className="flex flex-col md:flex-row items-center gap-8 mb-12 bg-white/80 p-8 rounded-xl backdrop-blur-sm shadow-xl transition-all duration-300 hover:shadow-2xl border border-indigo-100/50">
//               {/* Pre-headline banner */}
//               <div className="absolute -top-4 left-0 right-0 flex justify-center">
//                 <div className="bg-red-600 text-white text-sm font-bold px-6 py-2 rounded-full shadow-lg animate-pulse">
//                   URGENT: FREE BAG GIVEAWAY ENDS SOON
//                 </div>
//               </div>
              
//               <div className="md:w-1/2 transform transition-transform duration-500 hover:scale-105">
//                 <div className="relative">
//                   <div className="absolute inset-0 bg-indigo-600/10 rounded-lg blur-xl"></div>
//                   <NextImage
//                     src="/free purrify.png"
//                     alt="Free Trial Bag of Purrify Cat Litter Additive"
//                     width={400}
//                     height={300}
//                     className="rounded-lg shadow-lg border-2 border-indigo-100 relative z-10"
//                     priority
//                   />
//                   <div className="absolute -bottom-3 -right-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-md z-20 animate-pulse">
//                     FREE
//                   </div>
//                 </div>
//               </div>
              
//               <div className="md:w-1/2 flex items-center">
//                 <div>
//                   <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight md:text-left leading-tight">
//                     <div className="flex items-center my-2">
//                       <span className="bg-gradient-to-r from-[#4338CA] to-[#6366F1] bg-clip-text text-transparent">
//                         Claim Your FREE Purrify Trial
//                       </span>
//                     </div>
                    
//                     <div className="flex justify-center my-4">
//                       <NextImage
//                         src="/samplebag.jpg"
//                         alt="Sample Trial Size Bag of Purrify Cat Litter Additive"
//                         width={120}
//                         height={90}
//                         className="rounded-md shadow-lg border-2 border-indigo-200 transform transition-all duration-300 hover:scale-110"
//                       />
//                     </div>
                    
//                     <div className="block mt-3 mb-6 relative py-4 px-2">
//                       <div className="absolute -inset-1 bg-gradient-to-r from-indigo-100/70 via-purple-100/70 to-pink-100/70 rounded-lg -z-10 blur-sm"></div>
//                       <div className="border-t-2 border-b-2 border-indigo-200/50 py-3">
//                         <span className="text-3xl font-extrabold bg-gradient-to-r from-pink-600 via-indigo-700 to-purple-700 bg-clip-text text-transparent tracking-wide animate-pulse-slow transform transition-all duration-300 hover:scale-105 inline-block"
//                               style={{ textShadow: "0px 0px 1px rgba(79, 70, 229, 0.2)" }}>
//                           Zero Cost. Zero Risk. Zero More Litter Box Smell.
//                         </span>
//                       </div>
//                     </div>
//                   </h1>
                  
//                   <div className="mt-4 bg-indigo-50 p-3 rounded-lg border border-indigo-100">
//                     <p className="text-indigo-800 font-medium">
//                       Limited time offer: Get your free trial-size bag of our natural odor-trapping formula while supplies last!
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
            
//             <div className="mb-12 bg-white/90 p-8 rounded-xl shadow-lg border-l-4 border-red-600 border-t border-r border-b border-indigo-100/50">
//               <div className="flex items-start space-x-4">
//                 <PawPrint className="h-6 w-6 text-red-600 mt-1 flex-shrink-0" />
//                 <div>
//                   <p className="text-lg text-[#333333] mb-6 leading-relaxed">
//                     <strong className="text-red-600 text-xl">ATTENTION CAT OWNERS WHO ARE TIRED OF HOLDING THEIR BREATH:</strong> What if, in the next 24 hours, you could completely eliminate that embarrassing litter box stench that makes you cringe every time someone visits your home?
//                   </p>
//                   <p className="text-lg text-[#333333] mb-6 leading-relaxed">
//                     Here's the deal: We're so absolutely confident that Purrify will transform your home into a fresh, odor-free sanctuary that we're doing something crazy...
//                   </p>
//                   <p className="text-lg text-[#333333] mb-6 leading-relaxed">
//                     We're giving away <strong className="text-red-600">FREE trial bags to the first 500 cat owners</strong> who claim theirs.
//                   </p>
//                   <p className="text-lg text-[#333333] leading-relaxed">
//                     Why would we do this? Because once you experience what it's like to have guests over WITHOUT worrying about "that smell"... once you feel the relief of never holding your breath when you walk past the litter box... once you discover the joy of a truly fresh-smelling home...
//                     <strong className="text-indigo-700"> You'll become a Purrify customer for life.</strong>
//                   </p>
//                 </div>
//               </div>
//             </div>
            
//             <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-8 rounded-xl shadow-xl border-2 border-indigo-200 transform transition-all duration-500 hover:shadow-2xl relative overflow-hidden">
//               {/* Subtle paw print background for form */}
//               <div className="absolute inset-0 opacity-5 pointer-events-none">
//                 <PawPrint className="absolute top-5 right-5 h-20 w-20" />
//                 <PawPrint className="absolute bottom-5 left-5 h-20 w-20" />
//               </div>
              
//               <div className="relative z-10">
//                 <div className="mb-8">
//                   <div className="mb-6 flex justify-center">
//                     <NextImage
//                       src="/before after.png"
//                       alt="Comparison showing litter box before and after using Purrify - demonstrating odor elimination results"
//                       width={600}
//                       height={400}
//                       className="rounded-lg shadow-md border border-indigo-200"
//                       useModernFormat={true}
//                       quality={85}
//                     />
//                   </div>
//                   <h3 className="text-xl font-bold text-indigo-800 mb-4">What You Get Absolutely FREE:</h3>
//                   <ul className="space-y-2">
//                     <li className="flex items-start">
//                       <span className="text-green-600 font-bold mr-2">✓</span>
//                       <span>Single-Use trial size bag of our natural odor-trapping formula</span>
//                     </li>
//                     <li className="flex items-start">
//                       <span className="text-green-600 font-bold mr-2">✓</span>
//                       <span>Instant odor elimination - works with ANY litter you currently use</span>
//                     </li>
//                     <li className="flex items-start">
//                       <span className="text-green-600 font-bold mr-2">✓</span>
//                       <span>Complete instructions for maximum freshness results</span>
//                     </li>
//                     <li className="flex items-start">
//                       <span className="text-green-600 font-bold mr-2">✓</span>
//                       <span>No shipping fees, no hidden costs, no catch</span>
//                     </li>
//                     <li className="flex items-start">
//                       <span className="text-green-600 font-bold mr-2">✓</span>
//                       <span>Zero commitment - it's our gift to you</span>
//                     </li>
//                   </ul>
//                 </div>
                
//                 <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
//                   <h3 className="text-xl font-bold text-red-600 mb-2">WARNING: This Offer Disappears in:</h3>
//                   <div className="flex justify-center space-x-4 mb-2">
//                     <div className="bg-red-600 text-white px-3 py-2 rounded-md font-mono">{timeLeft.hours.toString().padStart(2, '0')}</div>
//                     <div className="bg-red-600 text-white px-3 py-2 rounded-md font-mono">{timeLeft.minutes.toString().padStart(2, '0')}</div>
//                     <div className="bg-red-600 text-white px-3 py-2 rounded-md font-mono">{timeLeft.seconds.toString().padStart(2, '0')}</div>
//                   </div>
//                   <div className="flex justify-center text-xs text-gray-600 space-x-16 mb-4">
//                     <span>HOURS</span>
//                     <span>MINS</span>
//                     <span>SECS</span>
//                   </div>
//                   <p className="text-center text-red-800 font-medium">Limited to first 500 cat owners only.</p>
//                   <p className="text-center text-red-800 font-medium">Already claimed: {claimedBags} out of 500</p>
//                   <p className="text-center font-bold mt-2">Your free bag is waiting - but only if you act now.</p>
//                 </div>
                
//                 <div className="mb-8 bg-indigo-50 border border-indigo-100 rounded-lg p-4">
//                   <h3 className="text-xl font-bold text-indigo-800 mb-4">What Our Beta Testers Are Saying:</h3>
//                   <div className="space-y-4">
//                     <div className="bg-white p-3 rounded-md shadow-sm">
//                       <p className="italic">"I couldn't believe it. Within HOURS, my entire house smelled fresh again. I actually invited my mother-in-law over for the first time in months!"</p>
//                       <p className="text-right font-medium text-indigo-600">- Jennifer M., Montreal</p>
//                     </div>
//                     <div className="bg-white p-3 rounded-md shadow-sm">
//                       <p className="italic">"My husband thought I'd thrown out the litter box entirely. The smell was just... gone."</p>
//                       <p className="text-right font-medium text-indigo-600">- Lisa K., Mirabel, QC</p>
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6 mb-8">
//                   <div className="flex items-center justify-center mb-4">
//                     <PawPrint className="h-8 w-8 text-red-600 mr-3" />
//                     <h2 className="text-3xl font-bold text-red-600 text-center">CLAIM YOUR FREE BAG NOW</h2>
//                   </div>
//                   <p className="text-center text-red-800 mb-2">
//                     <span className="font-bold">⚠️ WARNING:</span> Due to high demand, we cannot guarantee availability after the timer expires.
//                   </p>
//                 </div>
//                 <FreeGiveawayForm />
                
//                 <p className="text-xs text-center text-gray-500 mt-6">
//                   100% Free. No Credit Card Required.<br />
//                   Limited time offer. One free bag per household. Shipping restrictions may apply. We reserve the right to end this promotion at any time.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </Container>
//       </section>
//     </Layout>
//   );
// };

// export default FreePage;

import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function FreeRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.push('/');
  }, [router]);

  return null;
}