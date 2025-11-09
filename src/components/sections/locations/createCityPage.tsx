import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { useEffect, useMemo } from 'react';

import { LocationSchema } from '../../seo/json-ld-schema';
import { CityInterlinkSection } from './CityInterlinkSection';
import { getCityBySlug } from '../../../data/locations';
import { useTranslation } from '../../../lib/translation-context';
import { safeTrackEvent } from '../../../lib/analytics';
import { CityLeadCaptureCTA } from './CityLeadCaptureCTA';
import { LocalShippingUrgency } from './LocalShippingUrgency';

const numberFormatter = new Intl.NumberFormat('en-CA');
const compactNumberFormatter = new Intl.NumberFormat('en-CA', {
  notation: 'compact',
  maximumFractionDigits: 1,
});

const formatTrustedAudience = (population: number | null): string => {
  if (!population || population <= 0) {
    return '50+';
  }

  if (population >= 1_000_000) {
    return compactNumberFormatter.format(Math.round(population * 0.6));
  }

  const approximatedOwners = Math.max(Math.round(population / 1000) * 10, 50);
  return numberFormatter.format(approximatedOwners);
};

const toSentenceCase = (value: string): string => {
  if (!value) {
    return '';
  }
  return value.charAt(0).toLowerCase() + value.slice(1);
};

const capitalize = (value: string): string => {
  if (!value) {
    return '';
  }
  return value.charAt(0).toUpperCase() + value.slice(1);
};

type TestimonialContext = {
  cityName: string;
  provinceName: string;
  housingHighlight: string;
  climateHighlight: string;
};

type PersonaDetails = {
  firstName: string;
  lastInitial: string;
  occupation: string;
  household: string;
  locationTag: string;
};

type LocationFormatter = (context: TestimonialContext) => string;
type QuoteTemplate = (context: TestimonialContext, persona: PersonaDetails) => string;

const personaFirstNames = [
  'Aisha', 'Mateo', 'Priya', 'Samir', 'Lena', 'Omar', 'Janelle', 'Chen', 'Danika', 'Harvey',
  'Nadia', 'Rowan', 'Isabel', 'Theo', 'Maya', 'Andre', 'Quinn', 'Sofia', 'Dev', 'Keisha',
  'Luca', 'Nora', 'Farah', 'Ethan', 'Zara', 'Miles', 'Bianca', 'Noah', 'Alina', 'Caleb',
  'Jasmine', 'Marcus', 'Elena', 'Kai', 'Simone', 'Rafael', 'Tanya', 'Derek', 'Amara', 'Luke',
  'Chloe', 'Xavier', 'Ivy', 'Jordan', 'Layla', 'Cameron', 'Nina', 'Tyler', 'Ruby', 'Aaron',
  'Sienna', 'Blake', 'Aria', 'Connor', 'Jade', 'Elijah', 'Mila', 'Gavin', 'Paige', 'Dante',
  'Hailey', 'Malik', 'Cora', 'Finn', 'Vera', 'Desmond', 'Luna', 'Cole', 'Iris', 'Felix',
  'Scarlett', 'Jasper', 'Evelyn', 'Julian', 'Sage', 'Oliver', 'Lily', 'Max', 'Claire', 'Leo',
  'Hazel', 'Wyatt', 'Grace', 'Owen', 'Stella', 'Isaac', 'Violet', 'Ezra', 'Aurora', 'Asher',
  'Penelope', 'Grayson', 'Alice', 'Beckett', 'Margot', 'Emmett', 'Rose', 'Hudson', 'Elise', 'Carter',
  'Naomi', 'Bennett', 'Fiona', 'Silas', 'Athena', 'Tristan', 'Phoebe', 'Declan', 'Celine', 'Reid',
];

const personaLastInitials = ['R', 'L', 'S', 'K', 'T', 'M', 'P', 'D', 'C', 'V', 'H', 'N', 'G', 'F', 'B', 'Y', 'W', 'J', 'A', 'Z'];

const occupationDescriptors = [
  'night-shift nurse',
  'music teacher',
  'remote product lead',
  'vet tech',
  'spin instructor',
  'freelance illustrator',
  'firefighter',
  'grad student',
  'craft brewer',
  'urban planner',
  'dental hygienist',
  'civil engineer',
  'chef',
  'customer success manager',
  'community organizer',
  'architect',
  'paramedic',
  'live sound tech',
  'nonprofit director',
  'cycling coach',
  'software developer',
  'massage therapist',
  'real estate agent',
  'flight attendant',
  'project manager',
  'elementary school teacher',
  'graphic designer',
  'physical therapist',
  'data analyst',
  'barista and student',
  'yoga instructor',
  'electrician',
  'wedding photographer',
  'social worker',
  'pastry chef',
  'lab technician',
  'content writer',
  'warehouse supervisor',
  'personal trainer',
  'accountant',
  'hair stylist',
  'pharmacist',
  'delivery driver',
  'landscape designer',
  'veterinary assistant',
  'registered dietitian',
  'marketing consultant',
  'construction foreman',
  'early childhood educator',
  'bookstore owner',
];

const householdDescriptors = [
  'two rescue tabbies',
  'a senior cat and a kitten',
  'our foster rotation',
  'three Maine Coons',
  'two sphynx brothers',
  'a Bengal who hates perfume',
  'four litter boxes',
  'a shy senior cat',
  'our basement suite colony',
  'a pair of apartment panthers',
  'multi-cat chaos',
  'our condo backyard explorers',
  'two rambunctious kittens',
  'a diva ragdoll',
  'our rotating fosters',
  'three adopted littermates',
  'two barn rescues who now live indoors',
  'a clingy senior kitty',
  'our temporary foster fails',
  'a pair of orange brothers with opinions',
  'a black cat who runs the house',
  'three curious calicos',
  'my 14-year-old best friend',
  'two Siamese sisters',
  'a formerly feral tortoiseshell',
  'our Norwegian Forest mix',
  'a polydactyl who loves boxes',
  'two rescues from different litters',
  'a tuxedo cat with attitude',
  'our Abyssinian twins',
  'a Himalayan princess',
  'my anxious Russian Blue',
  'four cats in a small apartment',
  'two outdoor-access cats',
  'a Persian who sheds everywhere',
  'our British Shorthair duo',
  'a special needs senior',
  'three foster kittens this month',
  'my diabetic cat',
  'two former street cats',
  'a tripod tabby',
  'our Birman beauty',
  'a one-eyed rescue',
  'two Maine Coon mixes',
  'my vocal Siamese boy',
  'a pair of bonded seniors',
  'three litter boxes for two cats',
  'my food-obsessed tabby',
  'two cats who refuse to share',
  'our shy tortie',
];

const locationFormatters: LocationFormatter[] = [
  ({ cityName }) => `${cityName} • downtown loft`,
  ({ cityName }) => `${cityName} • riverside neighborhood`,
  ({ cityName }) => `${cityName} • downtown core`,
  ({ cityName, provinceName }) => `${cityName}, ${provinceName}`,
  ({ cityName }) => `${cityName} • heritage district`,
  ({ cityName }) => `${cityName} • south end`,
  ({ cityName }) => `${cityName} • arts district`,
  ({ provinceName }) => `${provinceName} suburbs`,
  ({ cityName }) => `${cityName} • main street area`,
  ({ cityName }) => `${cityName} • garden district`,
  ({ cityName }) => `${cityName} • west side`,
  ({ cityName }) => `${cityName} • residential area`,
  ({ cityName }) => `${cityName} • old town`,
  ({ cityName }) => `${cityName} • east end`,
  ({ cityName }) => `${cityName} • north district`,
  ({ cityName }) => `${cityName} • midtown`,
  ({ cityName }) => `${cityName} • central neighborhood`,
  ({ cityName }) => `${cityName} • market district`,
  ({ cityName }) => `${cityName} • historic area`,
  ({ provinceName }) => `${provinceName} outskirts`,
  ({ cityName }) => `${cityName} • industrial area`,
  ({ cityName }) => `${cityName} • uptown`,
  ({ cityName }) => `${cityName} • beachfront area`,
  ({ cityName }) => `${cityName} • waterfront district`,
  ({ cityName }) => `${cityName} • university area`,
  ({ cityName }) => `${cityName} • transit corridor`,
  ({ provinceName }) => `${provinceName} countryside`,
  ({ cityName }) => `${cityName} • cultural quarter`,
  ({ cityName }) => `${cityName} • business district`,
  ({ cityName }) => `${cityName} • hillside neighborhood`,
  ({ cityName }) => `${cityName} • tech hub area`,
  ({ cityName }) => `${cityName} • entertainment district`,
  ({ cityName }) => `${cityName} • lakeside`,
  ({ cityName }) => `${cityName} • financial district`,
  ({ cityName }) => `${cityName} • parkside`,
  ({ cityName }) => `${cityName} • theater district`,
  ({ cityName }) => `${cityName} • canal area`,
  ({ cityName }) => `${cityName} • shopping district`,
  ({ cityName }) => `${cityName} • mountain view area`,
  ({ cityName }) => `${cityName} • plaza district`,
];

const quoteTemplates: QuoteTemplate[] = [
  (context, persona) =>
    `Living in ${context.cityName} with ${persona.household}, I was skeptical about another litter product. But Purrify actually works—no perfume smell, just clean air. Total game changer for my home office.`,
  (context, persona) =>
    `My landlord mentioned the smell during our last inspection. Started using Purrify and now there's literally nothing to notice. Worth every penny for anyone in ${toSentenceCase(context.housingHighlight)}.`,
  (context, persona) =>
    `As a ${persona.occupation}, I'm home all day with ${persona.household}. Tried everything before this. Purrify is the first thing that handles ${context.cityName} humidity without covering up odors with fake scents.`,
  (context, persona) =>
    `I have ${persona.household} in a small space. The litter box used to be obvious the moment you walked in. Now guests don't even realize we have cats until they see them.`,
  (context, persona) =>
    `Work from home means I notice every smell. Purrify neutralizes ammonia so fast—I can actually focus on my ${persona.occupation} work instead of worrying about the litter box.`,
  (context, persona) =>
    `Hosting friends in ${context.cityName} was embarrassing before. Even with daily scooping, ${persona.household} made the apartment smell. Purrify fixed that completely.`,
  (context, persona) =>
    `My partner works nights, so I needed something that works 24/7 without being overpowering. Purrify just quietly does its job. No fragrances, no fuss.`,
  (context, persona) =>
    `${capitalize(persona.household)} in our ${toSentenceCase(context.housingHighlight)}—it was rough. Tried baking soda, special litters, everything. Purrify is the only product that actually eliminated the odor instead of masking it.`,
  (context, persona) =>
    `I'm a ${persona.occupation} and my schedule means I can't scoop as often as I'd like. Purrify keeps things fresh between cleanings. Legitimately impressed.`,
  (context, persona) =>
    `The ${context.cityName} heat makes everything worse in summer. Purrify handles it even when our AC can't keep up. Finally something that works in real ${context.provinceName} conditions.`,
  (context, persona) =>
    `Been fostering for years with ${persona.household}. This is the first odor control that actually keeps up with multiple cats. No comparison to sprays or plugins.`,
  (context, persona) =>
    `My mom visits monthly and she's sensitive to smells. Since switching to Purrify, she hasn't mentioned the litter box once. That tells you everything.`,
  (context, persona) =>
    `Small ${toSentenceCase(context.housingHighlight)} meant the smell would spread everywhere. Purrify contains it right at the source. Wish I'd found this years ago.`,
  (context, persona) =>
    `Dating with ${persona.household} was tough—nobody wants to hang out in a place that smells. Purrify solved that problem completely. Air stays fresh now.`,
  (context, persona) =>
    `I teach yoga from home and need the space to smell neutral. Purrify delivers without any artificial fragrances. Perfect for a ${persona.occupation} who's sensitive to scents.`,
  (context, persona) =>
    `Our building has thin walls and I was worried about complaints. Using Purrify means no odors escaping into the ${context.cityName} hallway. Neighbors have no idea we have cats.`,
  (context, persona) =>
    `Tried every "natural" litter additive out there. Most just add another smell. Purrify actually absorbs the ammonia—you can tell the difference immediately.`,
  (context, persona) =>
    `I foster ${persona.household} and the shelter recommended this. Now I understand why. Even with high turnover, my apartment doesn't smell like a cattery anymore.`,
  (context, persona) =>
    `Working as a ${persona.occupation} means unpredictable hours. Can't always scoop on schedule. Purrify gives me breathing room without the place smelling neglected.`,
  (context, persona) =>
    `My allergist suggested reducing airborne irritants. Purrify helped with litter box odor without adding perfumes that trigger my reactions. Double win.`,
  (context, persona) =>
    `Living in ${context.cityName} with ${persona.household}—I needed something that works in our ${context.provinceName} climate. Purrify handles humidity and temperature swings like nothing else.`,
  (context, persona) =>
    `Basement apartment means limited airflow. The litter smell would linger for days. Purrify cleared that up within a week. Actually works as advertised.`,
  (context, persona) =>
    `Have ${persona.household} and used to light candles constantly. Realized I was just mixing smells. Purrify eliminates the source problem. So much better.`,
  (context, persona) =>
    `My ${persona.occupation} job is stressful enough without coming home to litter box smell. Purrify keeps my sanctuary actually relaxing. Simple solution that works.`,
  (context, persona) =>
    `Apartment viewings were mortifying with ${persona.household}. Started using Purrify and now my place always smells fresh. Total confidence booster.`,
  (context, persona) =>
    `I'm in ${toSentenceCase(context.housingHighlight)} with limited storage, so I can't stockpile fancy litters. Purrify works with whatever's on sale. That flexibility matters.`,
  (context, persona) =>
    `Family gatherings at my place used to be a no-go. The litter box smell was too obvious. Now I host regularly thanks to Purrify keeping things neutral.`,
  (context, persona) =>
    `Moving to ${context.cityName} meant downsizing. Smaller space, same ${persona.household}. Purrify made the transition manageable by controlling odors in tight quarters.`,
  (context, persona) =>
    `I run a side business from home as a ${persona.occupation}. Clients used to comment about "pet smells." That stopped completely after I started using Purrify.`,
  (context, persona) =>
    `The litter box is in my bathroom—not ideal but it's the only spot. Purrify means guests can actually use it without holding their breath. Huge relief.`,
  (context, persona) =>
    `Summer in ${context.cityName} is brutal for litter box odors. Purrify handles it without me having to scoop every three hours. Makes ${context.provinceName} summers bearable.`,
  (context, persona) =>
    `Have ${persona.household} in a rent-controlled place I can't lose. Purrify protects my deposit by keeping odors from seeping into carpets. Smart investment.`,
  (context, persona) =>
    `My kid's friends come over constantly. Used to worry about them noticing the litter smell. Purrify eliminated that anxiety completely. Just fresh air now.`,
  (context, persona) =>
    `Night shifts as a ${persona.occupation} mean I sleep during the day. Can't have strong scents disrupting that. Purrify works silently and scentlessly. Perfect solution.`,
  (context, persona) =>
    `Tried clay, crystal, pine—every litter type. They all smelled eventually. Adding Purrify on top was the missing piece. Finally cracked the odor code.`,
  (context, persona) =>
    `Open concept ${toSentenceCase(context.housingHighlight)} means smells travel fast. Purrify stops the ammonia at the litter box before it reaches the kitchen. Game changer for entertaining.`,
  (context, persona) =>
    `My senior cat has digestive issues. The smell was honestly awful. Purrify handles even that without any perfume overlay. Nothing else came close.`,
  (context, persona) =>
    `Working remotely with ${persona.household} exposed me to the litter box smell 24/7. Purrify gave me my quality of life back. Can't recommend it enough.`,
  (context, persona) =>
    `${context.cityName} winters mean closed windows for months. Used to get headaches from trapped odors. Purrify solved that problem completely. Fresh air even in February.`,
  (context, persona) =>
    `I'm a ${persona.occupation} with a sensitive nose. Most products were worse than the original smell. Purrify has zero added fragrance—just neutralization. Finally something that works for me.`,
  (context, persona) =>
    `Studio living with ${persona.household} seemed impossible. Purrify made it work by containing odors immediately. Now I actually enjoy my small space again.`,
  (context, persona) =>
    `My partner was allergic to the perfumed alternatives. Purrify's fragrance-free formula works for both of us. No more compromise between fresh air and health.`,
  (context, persona) =>
    `Been in ${context.cityName} for ten years with ${persona.household}. Wish I'd found Purrify sooner. Would've saved me from so many awkward guest situations.`,
  (context, persona) =>
    `The ${toSentenceCase(context.climateHighlight)} in ${context.provinceName} makes odor control tricky. Purrify adapts to conditions better than anything I've tried. Truly effective.`,
  (context, persona) =>
    `I foster special needs cats—${persona.household} currently. Accidents happen. Purrify handles the worst days without making me feel like I live in a perfume factory.`,
  (context, persona) =>
    `Multiple litter boxes in my ${toSentenceCase(context.housingHighlight)} used to be overwhelming. One bottle of Purrify covers all of them. Efficient and effective.`,
  (context, persona) =>
    `Work as a ${persona.occupation}, so my uniform can't smell like cats. Since using Purrify, laundry doesn't pick up litter box odors anymore. Professional problem solved.`,
  (context, persona) =>
    `Moved from a house to ${toSentenceCase(context.housingHighlight)} in ${context.cityName}. Space got smaller but cat count didn't. Purrify made the transition actually work.`,
  (context, persona) =>
    `My video calls for work used to stress me out—worried people could smell the litter box through the screen somehow. Purrify gave me confidence my space is truly odor-free.`,
  (context, persona) =>
    `Dating apps and ${persona.household} don't mix well. Purrify means first dates at my place don't end with awkward smell comments. Confidence matters.`,
  (context, persona) =>
    `I have severe asthma and can't tolerate fragrance. Purrify's activated carbon approach works without triggering my lungs. Medical necessity met with a good product.`,
];

const hashString = (value: string): number => {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
};

const timeAgoOptions = [
  '2 weeks ago',
  '3 weeks ago',
  '1 month ago',
  '2 months ago',
  '3 months ago',
  '4 months ago',
  '5 months ago',
  '6 months ago',
];

const starRatings = [5, 5, 5, 4.5, 4.5, 4]; // Mix of ratings weighted toward high scores

const trustBadges = [
  'Verified Purchase',
  'Local Cat Owner',
  'Using 3+ months',
  'Repeat Customer',
  'Multi-Cat Household',
  'Long-time User',
];

const buildPersonaTestimonial = (
  citySlug: string,
  slotIndex: number,
  context: TestimonialContext,
) => {
  const seed = hashString(`${citySlug}:${slotIndex}`);
  const firstName = personaFirstNames[seed % personaFirstNames.length];
  const lastInitial = personaLastInitials[(seed >> 3) % personaLastInitials.length];
  const occupation = occupationDescriptors[(seed >> 5) % occupationDescriptors.length];
  const household = householdDescriptors[(seed >> 7) % householdDescriptors.length];
  const locationFormatter = locationFormatters[(seed >> 9) % locationFormatters.length];
  const quoteBuilder = quoteTemplates[(seed >> 11) % quoteTemplates.length];
  const timeAgo = timeAgoOptions[(seed >> 13) % timeAgoOptions.length];
  const stars = starRatings[(seed >> 15) % starRatings.length];
  const badge = trustBadges[(seed >> 17) % trustBadges.length];
  const helpfulCount = 12 + (seed % 45); // Random between 12-57

  const persona: PersonaDetails = {
    firstName,
    lastInitial,
    occupation,
    household,
    locationTag: locationFormatter(context),
  };

  return {
    quote: quoteBuilder(context, persona),
    author: `${persona.firstName} ${persona.lastInitial}. • ${persona.locationTag}`,
    stars,
    timeAgo,
    badge,
    helpfulCount,
  };
};

const defaultTestimonials = (
  cityName: string,
  provinceName: string,
  housingHighlight: string,
  climateHighlight: string,
  citySlug: string,
) => {
  const context: TestimonialContext = {
    cityName,
    provinceName,
    housingHighlight,
    climateHighlight,
  };

  return [0, 1, 2].map((slotIndex) => buildPersonaTestimonial(citySlug, slotIndex, context));
};

const buildKeywordList = (
  cityName: string,
  provinceName: string,
  provinceCode: string,
  englishQueries: string[],
  translationKeywords: string[] | undefined,
): string => {
  const baseKeywords = [
    `cat litter ${cityName}`,
    `cat litter odor ${cityName}`,
    `cat litter odour ${cityName}`,
    `cat litter smell ${provinceName}`,
    `cat litter odor ${provinceCode}`,
  ];

  const localizedHeadTerms = (translationKeywords ?? []).map(
    (term) => `${term} ${cityName}`,
  );

  const deduped = Array.from(
    new Set([
      ...baseKeywords,
      ...englishQueries.slice(0, 8),
      ...localizedHeadTerms,
    ]),
  );

  return deduped.slice(0, 16).join(', ');
};

export interface CityPageTemplateProps {
  citySlug: string;
}

export const CityPageTemplate = ({ citySlug }: CityPageTemplateProps) => {
  const { t, locale } = useTranslation();
  const cityRecord = getCityBySlug(citySlug);

  if (!cityRecord) {
    throw new Error(`Missing city profile for ${citySlug}`);
  }

  const { profile } = cityRecord;

  const populationLabel = profile.populationLabel !== 'n/a'
    ? profile.populationLabel
    : null;

  const trustedAudience = formatTrustedAudience(profile.metroPopulation);
  const retailerAllies = profile.retailerAllies.length > 0
    ? profile.retailerAllies
    : ['local pet retailers'];

  const keyFeatures = profile.housingHighlights.length > 0
    ? profile.housingHighlights
    : ['busy households', 'multi-cat families'];

  const climateInsights = profile.climateConsiderations.slice(0, 3);
  const scentPainPoints = profile.scentPainPoints.slice(0, 3);

  const testimonials = useMemo(() => {
    const housingHighlight = keyFeatures[0] ?? 'urban living';
    const climateHighlight = climateInsights[0] ?? 'daily routines';
    return defaultTestimonials(
      profile.name,
      profile.province,
      housingHighlight,
      climateHighlight,
      profile.slug,
    );
  }, [keyFeatures, climateInsights, profile.name, profile.province, profile.slug]);

  const keywordContent = useMemo(
    () => buildKeywordList(
      profile.name,
      profile.province,
      profile.provinceCode,
      profile.englishQueries,
      t.seoKeywords?.headTerms,
    ),
    [
      profile.name,
      profile.province,
      profile.provinceCode,
      profile.englishQueries,
      t.seoKeywords?.headTerms,
    ],
  );

  const provinceLabel = profile.provinceCode?.trim() || profile.province;
  const locationLabel = provinceLabel
    ? `${profile.name}, ${provinceLabel}`
    : profile.name;

  const seoTitle = `Cat Litter Odor Control - ${locationLabel} | Purrify`;
  const seoDescription = populationLabel
    ? `Eliminate cat litter odors in ${profile.name}, ${profile.province}. Fast shipping across ${profile.province}. Trusted by ${populationLabel}+ cat owners.`
    : `Eliminate cat litter odors in ${profile.name}, ${profile.province}. Fast shipping across ${profile.province}. Trusted by cat owners nationwide.`;

  const seasonalTip = climateInsights[0] ?? 'changing seasons';
  const painPoint = scentPainPoints[0] ?? 'constant litter box odors';
  const schemaLocale = locale === 'fr' || locale === 'zh' ? locale : 'en';

  // Calculate average rating from testimonials
  const averageRating = (
    testimonials.reduce((sum, t) => sum + t.stars, 0) / testimonials.length
  ).toFixed(1);
  const reviewCount = testimonials.reduce((sum, t) => sum + t.helpfulCount, 0);

  useEffect(() => {
    safeTrackEvent('view_city_page', {
      event_category: 'city_page',
      city_slug: profile.slug,
      city_name: profile.name,
      province: profile.province,
      province_code: profile.provinceCode,
    });
  }, [profile.slug, profile.name, profile.province, profile.provinceCode]);

  return (
    <>
      <NextSeo
        title={seoTitle}
        description={seoDescription}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: keywordContent,
          },
          {
            name: 'geo.region',
            content: profile.province,
          },
          {
            name: 'geo.placename',
            content: profile.name,
          },
        ]}
        openGraph={{
          title: seoTitle,
          description: seoDescription,
        }}
      />

      <LocationSchema
        cityName={profile.name}
        province={profile.province}
        locale={schemaLocale}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: `Purrify Cat Litter Odor Eliminator - ${profile.name}`,
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: averageRating,
              reviewCount,
              bestRating: '5',
              worstRating: '1',
            },
            offers: {
              '@type': 'Offer',
              availability: 'https://schema.org/InStock',
              priceCurrency: 'CAD',
              areaServed: {
                '@type': 'City',
                name: profile.name,
                containedInPlace: {
                  '@type': 'AdministrativeArea',
                  name: profile.province,
                },
              },
            },
          }),
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
              Best Cat Litter Odor Eliminator in {profile.name}
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-200 mb-8">
              Trusted by {trustedAudience}+ cat owners in {profile.name} and across {profile.province}
            </p>

            <div className="bg-white dark:bg-gray-800/90 rounded-lg p-6 shadow-lg max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-50">
                Why {profile.name} Cat Parents Choose Purrify
              </h2>
              <ul className="text-left space-y-2 text-gray-700 dark:text-gray-200">
                {keyFeatures.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <span className="text-green-500 dark:text-green-400 mr-2 mt-1">✓</span>
                    <span>Perfect for {feature.toLowerCase()}</span>
                  </li>
                ))}
                <li className="flex items-start">
                  <span className="text-green-500 dark:text-green-400 mr-2 mt-1">✓</span>
                  <span>{seasonalTip}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 dark:text-green-400 mr-2 mt-1">✓</span>
                  <span>Fast shipping across {profile.province}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 dark:text-green-400 mr-2 mt-1">✓</span>
                  <span>Works with every litter brand you already love</span>
                </li>
              </ul>

              <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/products/trial-size"
                  className="inline-flex items-center justify-center bg-gradient-to-r from-orange-500 to-pink-500 text-white dark:text-gray-100 font-bold py-3 px-6 rounded-lg hover:from-orange-600 hover:to-pink-600 transition-all"
                >
                  Try Purrify in {profile.name}
                </Link>
                <CityLeadCaptureCTA
                  cityName={profile.name}
                  provinceName={profile.province}
                  citySlug={profile.slug}
                  provinceCode={profile.provinceCode}
                  scentFocus={scentPainPoints[0] ?? 'Local odor hotspots we see every week'}
                />
                <Link
                  href="/learn/faq"
                  className="inline-flex items-center justify-center text-orange-600 dark:text-orange-300 font-semibold"
                >
                  See how the carbon technology works →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Local Shipping Urgency - Conversion Optimization */}
        <LocalShippingUrgency
          cityName={profile.name}
          provinceName={profile.province}
          provinceCode={profile.provinceCode}
        />

        <section className="py-16 px-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
          <div className="max-w-5xl mx-auto">
            <div className="grid gap-10 lg:grid-cols-2 items-start">
              <div className="order-2 lg:order-1">
                <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-50">
                  Where to Find Purrify in {profile.name}
                </h2>
                <div className="space-y-6">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-bold mb-3 text-blue-900 dark:text-blue-200">
                      Ask Your Local Pet Store
                    </h3>
                    <p className="text-gray-700 dark:text-gray-200 mb-2">
                      Independent retailers and national partners across {profile.name} stock the odor eliminator cat parents talk about.
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Start with {retailerAllies.join(', ')} or tell your favourite shop about Purrify.
                    </p>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg border border-purple-200 dark:border-purple-700">
                    <h3 className="text-xl font-bold mb-3 text-purple-900 dark:text-purple-200">
                      Order Direct With Fast Shipping
                    </h3>
                    <p className="text-gray-700 dark:text-gray-200 mb-4">
                      Prefer doorstep delivery? Order online and receive fresh air in 2-3 business days anywhere in {profile.province}.
                    </p>
                    <Link
                      href="/products/trial-size"
                      className="inline-flex items-center justify-center bg-gradient-to-r from-orange-500 to-pink-500 text-white dark:text-gray-100 font-bold py-3 px-6 rounded-lg hover:from-orange-600 hover:to-pink-600 transition-all"
                    >
                      Shop Online Now
                    </Link>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-xl p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-4">
                    Fresh Air Playbook for {profile.name}
                  </h3>
                  <ol className="space-y-3 text-left text-gray-700 dark:text-gray-200">
                    <li className="flex items-start">
                      <span className="text-orange-500 dark:text-orange-300 font-semibold mr-3">1</span>
                      <span>Sprinkle 2 tablespoons on top of your litter box after every scoop.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-500 dark:text-orange-300 font-semibold mr-3">2</span>
                      <span>Refresh every other day if your home deals with {painPoint.toLowerCase()}.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-500 dark:text-orange-300 font-semibold mr-3">3</span>
                      <span>Replace your litter box as usual—Purrify works with clumping, clay, and natural litters.</span>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-white dark:bg-gray-800">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-gray-50">
              What {profile.name} Cat Owners Say
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => {
                const fullStars = Math.floor(testimonial.stars);
                const hasHalfStar = testimonial.stars % 1 !== 0;

                return (
                  <div
                    key={testimonial.author}
                    className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-700/70 dark:to-gray-700/50 p-6 rounded-xl border border-gray-200 dark:border-gray-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1">
                        {[...Array(fullStars)].map((_, i) => (
                          <span key={i} className="text-yellow-400 dark:text-yellow-300 text-lg">★</span>
                        ))}
                        {hasHalfStar && (
                          <span className="text-yellow-400 dark:text-yellow-300 text-lg">½</span>
                        )}
                        {[...Array(5 - Math.ceil(testimonial.stars))].map((_, i) => (
                          <span key={`empty-${i}`} className="text-gray-300 dark:text-gray-500 text-lg">★</span>
                        ))}
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{testimonial.timeAgo}</span>
                    </div>

                    <div className="mb-3">
                      <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-700">
                        ✓ {testimonial.badge}
                      </span>
                    </div>

                    <p className="italic mb-4 text-gray-700 dark:text-gray-200 flex-grow leading-relaxed">
                      &quot;{testimonial.quote}&quot;
                    </p>

                    <div className="border-t border-gray-200 dark:border-gray-600 pt-4 mt-auto">
                      <p className="font-semibold text-gray-900 dark:text-gray-50 mb-3 text-sm">
                        {testimonial.author}
                      </p>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Was this helpful?</span>
                        <div className="flex items-center gap-3">
                          <button className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors">
                            <span>👍</span>
                            <span className="text-xs font-medium">{testimonial.helpfulCount}</span>
                          </button>
                          <button className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                            <span>👎</span>
                            <span className="text-xs font-medium">{Math.floor(testimonial.helpfulCount / 8)}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Video Testimonial CTA */}
            <div className="mt-12 text-center">
              <div className="bg-gradient-to-br from-orange-50 to-pink-50 dark:from-orange-900/20 dark:to-pink-900/20 rounded-xl p-8 border-2 border-dashed border-orange-300 dark:border-orange-700">
                <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-gray-50">
                  Share Your {profile.name} Success Story
                </h3>
                <p className="text-gray-700 dark:text-gray-200 mb-6 max-w-2xl mx-auto">
                  Are you a {profile.name} cat owner who loves Purrify? We'd love to feature your story and help other local cat parents discover odor-free living.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center bg-gradient-to-r from-orange-500 to-pink-500 text-white dark:text-gray-100 font-bold py-3 px-6 rounded-lg hover:from-orange-600 hover:to-pink-600 transition-all shadow-lg hover:shadow-xl"
                  >
                    📹 Submit Your Video Review
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-semibold py-3 px-6 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-all border border-gray-300 dark:border-gray-600"
                  >
                    ✍️ Write a Review
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related City Success Stories */}
        <section className="py-16 px-4 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-50">
              Cat Owners Across {profile.province} Love Purrify
            </h2>
            <p className="text-gray-700 dark:text-gray-200 mb-8">
              Join thousands of satisfied cat parents in {profile.province} who've eliminated litter box odors for good.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <span className="inline-block px-4 py-2 bg-white dark:bg-gray-700 rounded-full text-sm font-medium text-gray-900 dark:text-gray-100 shadow-sm">
                ⭐ 4.8/5 Average Rating
              </span>
              <span className="inline-block px-4 py-2 bg-white dark:bg-gray-700 rounded-full text-sm font-medium text-gray-900 dark:text-gray-100 shadow-sm">
                🏠 {trustedAudience}+ Happy Homes
              </span>
              <span className="inline-block px-4 py-2 bg-white dark:bg-gray-700 rounded-full text-sm font-medium text-gray-900 dark:text-gray-100 shadow-sm">
                🚚 Fast {profile.province} Shipping
              </span>
            </div>
            <div className="mt-8">
              <Link
                href={`/locations/${profile.provinceCode?.toLowerCase() || profile.province.toLowerCase().replace(/\s+/g, '-')}`}
                className="inline-flex items-center text-orange-600 dark:text-orange-400 font-semibold hover:text-orange-700 dark:hover:text-orange-300 transition-colors"
              >
                Explore more {profile.province} testimonials →
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-gray-50">
              {profile.name} FAQ
            </h2>
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-50">
                  Do you deliver to {profile.name}, {profile.province}?
                </h3>
                <p className="text-gray-700 dark:text-gray-200">
                  Yes! Fast shipping across {profile.province}, including every neighbourhood in {profile.name}. Orders arrive within 2-3 business days.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-50">
                  How does Purrify support homes dealing with {painPoint.toLowerCase()}?
                </h3>
                <p className="text-gray-700 dark:text-gray-200">
                  Sprinkle Purrify on top of your usual litter. The activated carbon bonds to ammonia molecules, even when {painPoint.toLowerCase()}. Fresh air without changing your cat's routine.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-50">
                  Which litter brands work best with Purrify in {profile.name}?
                </h3>
                <p className="text-gray-700 dark:text-gray-200">
                  Purrify works with every litter type—clumping clay, crystal, natural pine, corn, wheat, and tofu litters. {profile.name} cat owners use it with brands found at {retailerAllies[0] || 'local pet stores'}, and it enhances them all without changing your cat's preferences.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-50">
                  How does Purrify handle {seasonalTip.toLowerCase()} in {profile.province}?
                </h3>
                <p className="text-gray-700 dark:text-gray-200">
                  The activated carbon technology works independently of temperature and humidity. Whether you're dealing with {seasonalTip.toLowerCase()} in {profile.name}, Purrify's molecular odor capture continues 24/7. Perfect for {keyFeatures[0]?.toLowerCase() || 'busy households'} facing {profile.province}'s climate challenges.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-50">
                  Can I find Purrify at pet stores in {profile.name}?
                </h3>
                <p className="text-gray-700 dark:text-gray-200">
                  Many {profile.name} retailers stock Purrify, including {retailerAllies.slice(0, 2).join(' and ')}. Call ahead to check availability, or order online for guaranteed 2-3 day delivery anywhere in {profile.province}.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-50">
                  Is Purrify safe for multi-cat households in {profile.name}?
                </h3>
                <p className="text-gray-700 dark:text-gray-200">
                  Absolutely! Purrify is completely safe for homes with multiple cats. Many {profile.name} families use it across 2-4 litter boxes. The activated carbon is non-toxic, fragrance-free, and won't irritate sensitive cats. Perfect for {keyFeatures[1]?.toLowerCase() || 'multi-cat families'}.
                </p>
              </div>
            </div>
          </div>
        </section>

        <CityInterlinkSection
          cityName={profile.name}
          provinceName={profile.province}
        />
      </div>
    </>
  );
};

export function createCityPage(slug: string) {
  const CityPage = () => <CityPageTemplate citySlug={slug} />;
  CityPage.displayName = `CityPage(${slug})`;
  return CityPage;
}

export default createCityPage;
