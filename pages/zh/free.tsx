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
        <title>紧急：Purrify免费试用 | {SITE_NAME}</title>
        <meta name="description" content="领取您的免费Purrify猫砂添加剂试用装。零成本。零风险。零猫砂异味。" />
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
                <div className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-2 rounded-full shadow-lg transform -rotate-1">
                  <span className="font-bold text-sm uppercase tracking-wide">{t.freeTrial.urgentBanner}</span>
                </div>
              </div>
              
              <div className="flex-shrink-0">
                <NextImage
                  src="/purrify-17g-product-image.png"
                  alt="免费Purrify 17g试用装"
                  width={300}
                  height={300}
                  className="rounded-lg shadow-lg"
                />
              </div>
              
              <div className="text-center md:text-left">
                <div className="mb-4">
                  <span className="bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-2 rounded-full text-xl font-bold shadow-lg">
                    {t.freeTrial.free}
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                  获取您的<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                    免费Purrify试用装
                  </span>
                </h1>
                <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                  体验神奇的异味消除效果<br />
                  <span className="font-semibold text-indigo-600">零成本 • 零风险 • 零异味</span>
                </p>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <h3 className="text-lg font-bold text-green-800 mb-2">您将获得：</h3>
                  <ul className="text-green-700 space-y-1">
                    <li className="flex items-start">
                      <span className="text-green-600 font-bold mr-2">✓</span>
                      <span>价值$4.99的17g Purrify试用装</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 font-bold mr-2">✓</span>
                      <span>免费送货到您家门口</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 font-bold mr-2">✓</span>
                      <span>专家猫咪护理技巧和指南</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 font-bold mr-2">✓</span>
                      <span>零承诺 - 这是我们送给您的礼物</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
                  <h3 className="text-xl font-bold text-red-600 mb-2">注意：此优惠将在以下时间后消失：</h3>
                  <div className="flex justify-center space-x-4 mb-2">
                    <div className="bg-red-600 text-white px-3 py-2 rounded-md font-mono">{timeLeft.hours.toString().padStart(2, '0')}</div>
                    <div className="bg-red-600 text-white px-3 py-2 rounded-md font-mono">{timeLeft.minutes.toString().padStart(2, '0')}</div>
                    <div className="bg-red-600 text-white px-3 py-2 rounded-md font-mono">{timeLeft.seconds.toString().padStart(2, '0')}</div>
                  </div>
                  <div className="flex justify-center text-xs text-gray-600 space-x-16 mb-4">
                    <span>小时</span>
                    <span>分钟</span>
                    <span>秒</span>
                  </div>
                  <p className="text-center text-red-800 font-medium">仅限前500名猫主人。</p>
                  <p className="text-center text-red-800 font-medium">已领取：{claimedBags} / 500</p>
                  <p className="text-center font-bold mt-2">您的免费试用装正在等待 - 但只有现在行动才能获得。</p>
                </div>
                
                <div className="mb-8 bg-indigo-50 border border-indigo-100 rounded-lg p-4">
                  <h3 className="text-xl font-bold text-indigo-800 mb-4">我们的测试用户怎么说：</h3>
                  <div className="space-y-4">
                    <div className="bg-white p-3 rounded-md shadow-sm">
                      <p className="italic">"我简直不敢相信。几个小时内，我的整个房子又恢复了清新。我甚至几个月来第一次邀请了婆婆过来！"</p>
                      <p className="text-right font-medium text-indigo-600">- 张女士，多伦多</p>
                    </div>
                    <div className="bg-white p-3 rounded-md shadow-sm">
                      <p className="italic">"我丈夫以为我把猫砂全部扔掉了。异味就这样...消失了。"</p>
                      <p className="text-right font-medium text-indigo-600">- 李女士，温哥华</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6 mb-8">
                  <div className="flex items-center justify-center mb-4">
                    <PawPrint className="h-8 w-8 text-red-600 mr-3" />
                    <h2 className="text-3xl font-bold text-red-600 text-center">立即领取您的免费试用装</h2>
                  </div>
                  <p className="text-center text-red-800 mb-2">
                    <span className="font-bold">⚠️ 注意：</span> 由于需求量大，我们无法保证倒计时结束后仍有库存。
                  </p>
                </div>
                <FreeGiveawayForm />
                
                <p className="text-xs text-center text-gray-500 mt-6">
                  100%免费。无需信用卡。<br />
                  限时优惠。每户限领一份。可能适用运费限制。我们保留随时终止此促销活动的权利。
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
