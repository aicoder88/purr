import { Truck, MapPin } from 'lucide-react';
import { useTranslation } from '../../lib/translation-context';

export function ScrollingAnnouncementBar() {
  const { t } = useTranslation();

  // Messages to scroll through
  const messages = [
    {
      icon: Truck,
      text: t.scrollingBar?.freeShipping || 'Free Shipping on All Subscription Orders',
      iconColor: 'text-blue-200 dark:text-blue-300',
    },
    {
      icon: MapPin,
      text: t.scrollingBar?.madeInCanada || 'Manufactured in Canada from Domestic and Globally Sourced Ingredients',
      iconColor: 'text-red-200 dark:text-red-300',
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
      <div className="bg-gradient-to-r from-teal-600 via-blue-600 to-teal-600 dark:from-teal-700 dark:via-blue-700 dark:to-teal-700 text-white dark:text-gray-100 py-2.5 overflow-hidden relative">
        {/* Scrolling container */}
        <div className="flex animate-scroll-left whitespace-nowrap">
          {duplicatedMessages.map((message, index) => {
            const Icon = message.icon;
            return (
              <div
                key={index}
                className="flex items-center space-x-3 px-8 md:px-12"
              >
                <Icon className={`w-5 h-5 md:w-6 md:h-6 flex-shrink-0 ${message.iconColor}`} />
                <span className="text-sm md:text-base font-semibold tracking-wide">
                  {message.text}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
