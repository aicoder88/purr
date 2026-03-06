import Link from "next/link";
import Image from "next/image";
import { ChevronDown, MapPin } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { HeaderMobileMenu } from "./header-suspense";

interface DropdownItem {
  label: string;
  href?: string;
  isGroupHeader?: boolean;
  indent?: boolean;
}

interface NavigationItem {
  id: string;
  label: string;
  href: string;
  hasDropdown?: boolean;
  dropdownItems?: DropdownItem[];
}

type SupportedLocale = "en" | "fr";

const headerUiCopy: Record<SupportedLocale, { logoAlt: string }> = {
  en: {
    logoAlt: "Purrify - Premium Activated Carbon Cat Litter Additive - Home",
  },
  fr: {
    logoAlt: "Purrify - additif premium de charbon actif pour litiere - accueil",
  },
};

const dropdownLinkBase =
  "block rounded-md px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50 hover:text-brand-pink focus:bg-gray-50 focus:text-brand-pink focus:outline-none focus:ring-2 focus:ring-brand-pink focus:ring-offset-1 dark:text-gray-200 dark:bg-gray-900/80 dark:hover:bg-gray-700/80 dark:hover:text-brand-pink-400 dark:focus:bg-gray-700/80 dark:focus:ring-brand-pink-400";

function getNavigationItems(
  t: Awaited<ReturnType<typeof getTranslations>>,
  localePrefix: string,
): NavigationItem[] {
  return [
    {
      id: "products",
      label: t("nav.products"),
      href: `${localePrefix}/`,
      hasDropdown: true,
      dropdownItems: [
        {
          label: t("nav.trialSize"),
          href: `${localePrefix}/products/trial-size/`,
        },
        {
          label: t("nav.compareSizes"),
          href: `${localePrefix}/products/`,
        },
        {
          label: t("nav.shipsToUSA"),
          href: "/us/",
        },
      ],
    },
    {
      id: "retailers",
      label: t("nav.retailers"),
      href: `${localePrefix}/retailers/`,
      hasDropdown: true,
      dropdownItems: [
        {
          label: t("nav.retailers"),
          href: `${localePrefix}/retailers`,
        },
        {
          label: t("nav.becomePartner"),
          href: `${localePrefix}/retailers#retailer-contact`,
        },
        {
          label: t("nav.marketingSupport"),
          href: `${localePrefix}/retailers#marketing-support`,
        },
        { label: t("nav.partnerPrograms") || "Partner Programs", isGroupHeader: true },
        {
          label: t("nav.forGroomers") || "For Groomers",
          href: `${localePrefix}/b2b#groomers`,
          indent: true,
        },
        {
          label: t("nav.forShelters") || "For Shelters",
          href: `${localePrefix}/b2b#shelters`,
          indent: true,
        },
        {
          label: t("nav.affiliateProgram") || "Affiliate Program",
          href: "/affiliate/",
          indent: true,
        },
        {
          label: t("nav.b2bInquiry") || "B2B Inquiry",
          href: "/b2b/",
          indent: true,
        },
      ],
    },
    {
      id: "learn",
      label: t("nav.learn"),
      href: `${localePrefix}/learn/`,
      hasDropdown: true,
      dropdownItems: [
        {
          label: t("nav.howItWorksPage"),
          href: `${localePrefix}/learn/how-it-works/`,
        },
        {
          label: t("nav.faq"),
          href: `${localePrefix}/learn/faq/`,
        },
        {
          label: t("nav.science"),
          href: `${localePrefix}/learn/science/`,
        },
        {
          label: t("nav.safetyInfo"),
          href: `${localePrefix}/learn/safety/`,
        },
        {
          label: t("nav.activatedCarbonBenefits"),
          href: "/blog/activated-carbon-litter-additive-benefits/",
        },
        {
          label: t("nav.catLitterGuide"),
          href: `${localePrefix}/learn/cat-litter-guide/`,
        },
        {
          label: t("nav.howToUse"),
          href: "/blog/how-to-use-cat-litter-deodorizer/",
        },
        {
          label: t("nav.technologyComparison"),
          href: "/blog/activated-carbon-vs-baking-soda-comparison/",
        },
        {
          label: t("nav.catLitterAnswers") || "Cat Litter Q&A",
          href: "/learn/faq/",
        },
        {
          label: t("nav.scienceHub") || "Research Citations",
          href: "/science/",
        },
        {
          label: t("nav.litterCalculator") || "Litter Calculator",
          href: "/tools/cat-litter-calculator/",
        },
        {
          label: t("nav.smellQuiz") || "Smell Quiz",
          href: "/tools/smell-quiz/",
        },
        {
          label: t("nav.toolsHub") || "All Tools",
          href: "/tools/",
        },
        { label: t("nav.solutions"), isGroupHeader: true },
        {
          label: t("nav.ammoniaSmellControl"),
          href: `${localePrefix}/learn/solutions/ammonia-smell-cat-litter/`,
          indent: true,
        },
        {
          label: t("nav.apartmentLiving"),
          href: `${localePrefix}/learn/solutions/apartment-cat-smell-solution/`,
          indent: true,
        },
        {
          label: t("nav.litterBoxOdor"),
          href: `${localePrefix}/learn/solutions/litter-box-smell-elimination/`,
          indent: true,
        },
        {
          label: t("nav.multipleCats"),
          href: `${localePrefix}/learn/solutions/multiple-cats-odor-control/`,
          indent: true,
        },
        {
          label: t("nav.naturalAdditive"),
          href: `${localePrefix}/learn/solutions/natural-cat-litter-additive/`,
          indent: true,
        },
        {
          label: t("nav.seniorCats"),
          href: `${localePrefix}/learn/solutions/senior-cat-litter-solutions/`,
          indent: true,
        },
      ],
    },
    {
      id: "blog",
      label: t("nav.blog") || "Blog",
      href: `${localePrefix}/blog/`,
    },
    {
      id: "fun",
      label: t("nav.fun") || "Fun & Games",
      href: "/fun/",
    },
    {
      id: "about",
      label: t("nav.about"),
      href: `${localePrefix}/about/our-story/`,
      hasDropdown: true,
      dropdownItems: [
        {
          label: t("nav.ourStory") || "Our Story",
          href: `${localePrefix}/about/our-story`,
        },
        {
          label: t("nav.customerReviews") || "Reviews",
          href: `${localePrefix}/reviews/`,
        },
        {
          label: t("nav.contact") || "Contact",
          href: `${localePrefix}/contact/`,
        },
      ],
    },
  ];
}

function DesktopNavigationItem({ item }: { item: NavigationItem }) {
  if (!item.hasDropdown) {
    return (
      <Link
        href={item.href}
        prefetch={false}
        className="text-gray-700 transition-colors font-medium hover:text-brand-pink dark:text-gray-200 dark:hover:text-brand-pink-400"
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div className="group relative">
      <Link
        href={item.href}
        prefetch={false}
        className="flex items-center rounded-sm font-medium text-gray-700 transition-colors hover:text-brand-pink focus:text-brand-pink focus:outline-none focus:ring-2 focus:ring-brand-pink focus:ring-offset-2 focus:ring-offset-white dark:text-gray-200 dark:hover:text-brand-pink-400 dark:focus:text-brand-pink-400 dark:focus:ring-brand-pink-400 dark:focus:ring-offset-gray-800"
        aria-haspopup="menu"
      >
        {item.label}
        <ChevronDown className="ml-1 h-4 w-4" />
      </Link>
      <div
        className="invisible pointer-events-none absolute left-0 top-full z-50 mt-1 max-h-96 w-64 overflow-y-auto rounded-lg border border-gray-200 bg-white p-2 opacity-0 shadow-xl transition-all group-hover:visible group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:visible group-focus-within:pointer-events-auto group-focus-within:opacity-100 dark:border-gray-600/50 dark:bg-gray-800/95"
        role="menu"
      >
        {item.dropdownItems?.map((dropdownItem) =>
          dropdownItem.isGroupHeader ? (
            <div
              key={dropdownItem.label}
              className="mt-2 px-4 py-2 text-xs font-bold uppercase tracking-wider text-gray-500 first:mt-0 dark:text-gray-400"
            >
              {dropdownItem.label}
            </div>
          ) : (
            <Link
              key={dropdownItem.label}
              href={dropdownItem.href || ""}
              prefetch={false}
              className={`${dropdownLinkBase} ${dropdownItem.indent ? "pl-6" : ""}`}
              role="menuitem"
            >
              {dropdownItem.label}
            </Link>
          ),
        )}
      </div>
    </div>
  );
}

export async function Header() {
  const t = await getTranslations();
  const locale = await getLocale();
  const resolvedLocale: SupportedLocale = locale === "fr" ? "fr" : "en";
  const localePrefix = resolvedLocale === "en" ? "" : `/${resolvedLocale}`;
  const navigationItems = getNavigationItems(t, localePrefix);
  const copy = headerUiCopy[resolvedLocale];
  const findStoreHref = resolvedLocale === "fr" ? "/fr/stores/" : "/stores/";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-brand-green-light/30 bg-white shadow-lg transition-all duration-300 backdrop-blur-md supports-[backdrop-filter]:bg-white dark:border-purple-500/30 dark:bg-gray-900/90 dark:supports-[backdrop-filter]:bg-gray-900/85">
      <Container>
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link
              href={localePrefix || "/"}
              prefetch={false}
              className="flex flex-shrink-0 items-center space-x-2"
            >
              <Image
                src="/optimized/logos/logo-light-pink.webp"
                alt={copy.logoAlt}
                width={120}
                height={57}
                priority
                className="h-10 w-auto filter drop-shadow-sm transition-all duration-300 dark:hidden"
              />
              <Image
                src="/optimized/logos/logo-dark.webp"
                alt={copy.logoAlt}
                width={84}
                height={40}
                priority
                className="hidden h-10 w-auto filter drop-shadow-sm transition-all duration-300 dark:block"
              />
            </Link>
          </div>

          <nav className="hidden items-center space-x-8 md:flex">
            {navigationItems.map((item) => (
              <DesktopNavigationItem key={item.id} item={item} />
            ))}
          </nav>

          <div className="hidden items-center space-x-3 md:flex">
            <Button
              asChild
              className="flex items-center gap-2 bg-gradient-to-r from-brand-pink to-brand-pink/80 font-semibold text-white shadow-md transition-all duration-200 hover:from-brand-pink/90 hover:to-brand-pink hover:shadow-lg dark:from-brand-pink-700 dark:to-brand-pink-600 dark:hover:from-brand-pink-800 dark:hover:to-brand-pink-700"
            >
              <Link href={findStoreHref} prefetch={false}>
                <MapPin className="h-4 w-4" />
                {t("nav.findStore") || "Find a Store"}
              </Link>
            </Button>
            <LanguageSwitcher />
          </div>

          <HeaderMobileMenu
            navigationItems={navigationItems}
            findStoreHref={findStoreHref}
            findStoreLabel={t("nav.findStore") || "Find a Store"}
            toggleMenuLabel={t("nav.toggleMenu") || "Toggle menu"}
          />
        </div>
      </Container>
    </header>
  );
}
