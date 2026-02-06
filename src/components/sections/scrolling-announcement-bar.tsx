"use client";

import { Truck, MapPin, Leaf, ShieldCheck, Users } from 'lucide-react';
import { useTranslation } from '@/lib/translation-context';

export function ScrollingAnnouncementBar() {
  const { t } = useTranslation();

  // Messages to scroll through - with explicit line breaks
  const messages = [
    {
      icon: Truck,
      line1: t.announcementBar.freeShipping.line1,
      line2: t.announcementBar.freeShipping.line2,
      iconColor: 'text-blue-200 dark:text-blue-300',
    },
    {
      icon: MapPin,
      line1: t.announcementBar.madeInCanada.line1,
      line2: t.announcementBar.madeInCanada.line2,
      iconColor: 'text-red-200 dark:text-red-300',
    },
    {
      icon: Leaf,
      line1: t.announcementBar.naturalCarbon.line1,
      line2: t.announcementBar.naturalCarbon.line2,
      iconColor: 'text-emerald-200 dark:text-emerald-300',
    },
    {
      icon: Users,
      line1: t.announcementBar.socialProof.line1,
      line2: t.announcementBar.socialProof.line2,
      iconColor: 'text-blue-100 dark:text-blue-200',
    },
    {
      icon: ShieldCheck,
      line1: t.announcementBar.moneyBack.line1,
      line2: t.announcementBar.moneyBack.line2,
      iconColor: 'text-blue-200 dark:text-blue-300',
    },
  ];

  // Duplicate messages for seamless loop
  const duplicatedMessages = [...messages, ...messages, ...messages];

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes scroll-left {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-33.333%);
            }
          }

          .animate-scroll-left {
            animation: scroll-left 30s linear infinite;
          }

          /* Pause animation on hover for accessibility */
          .animate-scroll-left:hover {
            animation-play-state: paused;
          }
        `
      }} />
      <div className="w-full bg-gradient-to-r from-teal-600 via-blue-600 to-teal-600 dark:from-teal-700 dark:via-blue-700 dark:to-teal-700 text-white dark:text-gray-100 py-4 md:py-5 overflow-hidden relative">
        {/* Scrolling container */}
        <div className="flex animate-scroll-left">
          {duplicatedMessages.map((message, index) => {
            const Icon = message.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center justify-center px-12 md:px-16 min-w-[350px] md:min-w-[450px]"
              >
                <Icon className={`w-6 h-6 md:w-7 md:h-7 mb-2 flex-shrink-0 ${message.iconColor}`} />
                <div className="text-center whitespace-nowrap">
                  <div className="text-sm md:text-base font-bold tracking-wide leading-tight">
                    {message.line1}
                  </div>
                  <div className="text-sm md:text-base font-bold tracking-wide leading-tight">
                    {message.line2}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
