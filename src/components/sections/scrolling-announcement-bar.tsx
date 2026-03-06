"use client";

import { Leaf, ShieldCheck, Truck } from "lucide-react";
import { useTranslations } from "next-intl";

export function ScrollingAnnouncementBar() {
  const t = useTranslations();

  const chips = [
    {
      icon: Truck,
      line1: t("announcementBar.freeShipping.line1"),
      line2: t("announcementBar.freeShipping.line2"),
    },
    {
      icon: Leaf,
      line1: t("announcementBar.naturalCarbon.line1"),
      line2: t("announcementBar.naturalCarbon.line2"),
    },
    {
      icon: ShieldCheck,
      line1: t("announcementBar.moneyBack.line1"),
      line2: t("announcementBar.moneyBack.line2"),
    },
  ];

  return (
    <section className="w-full overflow-x-clip border-y border-gray-800 bg-gray-900 py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
          {chips.map((chip) => {
            const Icon = chip.icon;
            return (
              <div
                key={chip.line1}
                className="rounded-2xl border border-gray-700 bg-gray-950 px-4 py-3 flex items-start gap-3"
              >
                <Icon className="w-5 h-5 mt-0.5 text-brand-pink shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white leading-tight">{chip.line1}</p>
                  <p className="text-sm text-gray-300 leading-tight mt-1">{chip.line2}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
