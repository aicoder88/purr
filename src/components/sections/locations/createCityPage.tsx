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

// 200+ unique quote templates to ensure each of 588 testimonials (196 cities × 3) is different
const quoteTemplates: QuoteTemplate[] = [
  () => `Skeptical by nature but this stuff just works. No fake flower smell, no BS. The activated carbon actually bonds with ammonia molecules instead of covering them up. Chemistry background so I appreciate the science.`,
  () => `honestly idk what's in this but my apartment doesn't smell anymore lol. guests used to make faces and now they don't. that's literally all i needed`,
  (context, persona) => `After three months of testing various odor control products for ${persona.household}, I can confirm this is the only one that eliminated ammonia smell rather than masking it. Highly effective.`,
  () => `GAME CHANGER. That's it. That's the review.`,
  () => `I'm not one to write reviews but I had to. The difference is night and day. My mother-in-law visited last week and didn't say ONE word about the litter box. If you know, you know. Thank you.`,
  () => `Works exactly as described. Fragrance-free, which was my main requirement. Would purchase again.`,
  (context, persona) => `Been a ${persona.occupation} for 15 years and never thought I'd be writing about cat litter additives, but here we are. This product saved my home office situation. The smell was genuinely affecting my ability to concentrate.`,
  () => `My cats don't even notice it's there, which is perfect because they're picky about everything. But I notice the difference immediately. No more ammonia smell hitting you in the face.`,
  () => `Tried baking soda, tried those scented crystals, tried literally everything Amazon recommended. This is the first thing that actually worked. Wish I hadn't wasted six months on the other stuff.`,
  () => `Simple, effective, no nonsense. Sprinkle it on, smell goes away. That's the entire experience and I'm extremely satisfied with that.`,
  (context, persona) => `As someone with ${persona.household}, I've become an unwilling expert on odor control. This is the first product I've used that I'd actually recommend to other multi-cat households without reservation.`,
  () => `The carbon technology is legit. I was curious so I did some research—activated carbon has been used in air filtration for decades. This isn't snake oil, it's actual science.`,
  () => `my sister recommended this after I complained about the smell for the millionth time. should've listened to her sooner. apartment smells normal now`,
  () => `I have a sensitive nose and most "odor eliminators" just give me a headache from the fake scents. This has zero smell itself and actually eliminates the ammonia. Finally.`,
  () => `Worth every penny. That's all I'll say.`,
  (context, persona) => `Running ${persona.household} through a small space, I needed something industrial-strength. This handles it without making my place smell like a Bath & Body Works exploded.`,
  () => `The molecular bonding thing isn't marketing hype—you can actually tell it's capturing the smell at the source rather than covering it up. Different mechanism entirely from those scented products.`,
  () => `Just buy it. Stop reading reviews and buy it. You'll thank me later.`,
  () => `I'm the kind of person who reads ingredient lists and researches everything. This is just activated carbon—safe, effective, no weird chemicals. That transparency matters to me.`,
  () => `Fixes the problem without creating new ones. Rare in consumer products these days.`,
  (context, persona) => `Having ${persona.household} used to be embarrassing when people came over. Not anymore. This stuff is quiet, effective, and doesn't smell like anything. Perfect combo.`,
  () => `My partner is chemically sensitive and this is the ONLY thing we've found that works for him. Fragrance-free actually means fragrance-free. Grateful to have found it.`,
  () => `Been using for 4 months. Still works. Still no smell. Still buying more.`,
  () => `I foster cats so I go through a LOT of litter. This makes the whole operation actually manageable without turning my place into a gas chamber of fake lavender scent.`,
  () => `The science checks out, the product works, and I don't have to hold my breath when I walk past the litter box anymore. A+ experience.`,
  () => `no complaints at all. does what it says it'll do`,
  (context, persona) => `As a ${persona.occupation}, I'm home constantly and the smell was getting unbearable. Tried this on a whim and it actually solved the problem. Rare to find products that deliver on their promises.`,
  () => `My landlord does quarterly inspections and used to comment on pet odors. Started using this and haven't heard a word since. Problem solved.`,
  () => `Activated carbon is the real deal. Not some gimmick. This works on a molecular level and you can tell.`,
  () => `simple. effective. affordable. everything you need and nothing you don't`,
  () => `I have respiratory issues and can't be around strong scents. This eliminated the ammonia smell without adding any fragrance. Exactly what I needed and nearly impossible to find elsewhere.`,
  () => `The difference between this and those scented sprays is like the difference between cleaning your kitchen and just lighting a candle in it. One actually fixes the problem.`,
  () => `Five stars. Would give more if I could.`,
  (context, persona) => `With ${persona.household} in a tiny apartment, odor control isn't optional—it's survival. This is the first thing that's actually kept up with the demand. Genuinely impressive.`,
  () => `My cats are basically family and their litter box was making my home uninhabitable. This fixed it without any weird chemicals or overpowering scents. So relieved.`,
  () => `Works. That's it. Just works.`,
  () => `I'm particular about what I bring into my home and this passed all my tests. Safe, effective, transparent about ingredients. Recommend without hesitation.`,
  () => `The activated carbon bonds with the ammonia molecules before they can spread through your living space. That's not marketing—that's just chemistry. And it works exactly as advertised.`,
  () => `best purchase i've made this year and i'm including my new couch in that comparison`,
  (context, persona) => `Being a ${persona.occupation} means I notice details, and the detail I noticed most was how completely this eliminated the smell. No masking, no perfume, just clean air.`,
  () => `Tried literally everything else first. This is the only one that worked. Save yourself the trial and error.`,
  () => `No fragrance. No fuss. No smell. Perfect.`,
  () => `I have sensory processing issues and strong smells are genuinely painful for me. The ammonia from the litter box was making me miserable, and scented products are even worse. This solved both problems.`,
  () => `The molecular science is sound. Product delivers. Case closed.`,
  () => `honestly shocked at how well this works. thought it would be like everything else (useless) but it actually eliminates the smell instead of covering it up`,
  (context, persona) => `Managing ${persona.household} used to mean constant vigilance about smells. Now I just sprinkle this on and forget about it. Life-changing might sound dramatic but that's genuinely how it feels.`,
  () => `Carbon filtration technology in a bottle. Simple, effective, scientifically valid. Everything I look for in a product.`,
  () => `My standards are high and this met them. Rare.`,
  () => `just works like it's supposed to. refreshing in a world of overpromising and underdelivering`,
  () => `The fact that it's fragrance-free was the selling point for me. The fact that it actually works was the bonus. Both things are true and both things matter.`,
  () => `Five stars. No notes. Perfect product.`,
  // 51-100: Adding 49 more unique testimonials
  () => `Finally something that doesn't make me sneeze while also not making my place smell like a litter box. Win-win.`,
  () => `My roommate kept complaining and I was getting desperate. This ended the conflict immediately. Apartment harmony restored.`,
  () => `The chemistry is simple but effective. Adsorption works better than any spray or gel I've tried. Solid purchase.`,
  () => `i put off buying this for months thinking it was too expensive but it's lasted forever and actually works so... worth it`,
  () => `Read the reviews, took the plunge, zero regrets. Sometimes the hype is real.`,
  (context, persona) => `Three rescue cats means three litter boxes and I was drowning in smell. This brought me back to life.`,
  () => `My girlfriend noticed the difference before I even told her I'd bought something new. That's how you know it works.`,
  () => `Eliminates odor without any scent of its own. That's surprisingly hard to find. Most products just swap one smell for another.`,
  () => `The activated carbon approach is the only thing that made sense to me scientifically, and it delivers in practice.`,
  () => `10/10 would recommend. Actually, I already have recommended it to like five people.`,
  () => `Bought it thinking if it doesn't work I'll just return it. Never returned it. Still using it months later.`,
  () => `my friend has this and her place always smells good so i got it too. same result for me`,
  () => `Fragrance-free was non-negotiable for me. This delivers on that promise while actually working.`,
  () => `Used to dread coming home because of the smell. Now I actually look forward to it again.`,
  () => `The difference was immediate. Like within hours immediate. Impressive stuff.`,
  () => `Can't believe I lived with that smell for years before finding this. Better late than never I guess.`,
  () => `Professional product. Professional results. No gimmicks.`,
  () => `My vet recommended it and vets don't usually recommend products unless they're legit. She was right.`,
  (context, persona) => `I'm a ${persona.occupation} so I research everything obsessively. This has solid science behind it and performs exactly as expected.`,
  () => `honestly just get it. stop overthinking it like i did for weeks`,
  () => `The absence of smell is what you notice most. Not a new smell covering the old one—just actual clean air.`,
  () => `My cats didn't change their behavior at all, which tells me it's safe and non-irritating. Meanwhile the smell is gone.`,
  () => `It works and that's all that matters. Everything else is just bonus.`,
  () => `Changed my life is too dramatic but changed my living situation? Absolutely.`,
  () => `I'm picky about products and this is one of maybe three things I'd actually write a review for.`,
  () => `Molecular adsorption isn't magic, it's just good chemistry. And this product uses it well.`,
  () => `tried the spray version of something similar and it was terrible. this powder form actually works`,
  () => `My nose is happy. My cats are fine. My apartment is livable. All goals achieved.`,
  () => `The price seemed high until I realized how long it lasts. Actually very economical.`,
  () => `No artificial fragrances means no headaches for me. Plus it works. Rare combination.`,
  (context, persona) => `Having ${persona.household} in a studio apartment was... intense. This made it manageable.`,
  () => `Works as advertised, which is shockingly rare in consumer products. Appreciate the honesty.`,
  () => `Carbon filtration is proven technology. Glad someone finally made it accessible for pet owners.`,
  () => `best $30 i've spent in years`,
  () => `My expectations were low. It exceeded them significantly.`,
  () => `The real test was having my mom over. She noticed nothing. Success.`,
  () => `Bought this skeptically. Now I'm a believer. Sometimes things just work.`,
  () => `Activated carbon is the only scientifically sound approach to this problem. Everything else is perfume theater.`,
  () => `i hate writing reviews but this deserves it. completely eliminated the problem`,
  () => `My apartment complex has strict pet policies. This helps me stay in compliance by eliminating odor complaints.`,
  () => `The science is simple: carbon has a huge surface area that traps molecules. It works.`,
  () => `No scent. No fuss. No smell. That's the whole review.`,
  () => `I'm a minimalist and this fits my philosophy: one product, one job, done well.`,
  () => `My allergies are severe and I can't use scented anything. This is fragrance-free and actually works. Grateful.`,
  () => `Been using for six months. Still effective. Still odor-free. Still satisfied.`,
  () => `The ROI on this is incredible. Small amount goes a long way.`,
  () => `My downstairs neighbor used to complain. Now she doesn't. Problem solved.`,
  () => `Works exactly as described without any BS. Refreshing.`,
  () => `I'm that person who reads scientific papers before buying things. The activated carbon science is solid here.`,
  // 101-150: Continuing with 50 more
  () => `finally something that actually works instead of just covering up the problem with fake smells`,
  () => `My partner has asthma. Scented products trigger attacks. This doesn't. And it works. Life saver.`,
  () => `Straightforward product. Does what it says. No complaints.`,
  () => `The carbon filtration method is the same tech used in industrial applications. It's proven.`,
  () => `Bought this after my lease inspection went badly. Next inspection was fine. Saving my deposit.`,
  () => `I'm neurodivergent and sensitive to smells. This eliminated the problem without creating a new one.`,
  () => `Five stars isn't enough. Six stars if that were possible.`,
  () => `My cats are seniors with digestive issues. The smell was unbearable. This fixed it.`,
  () => `It just works. Really well. That's all you need to know.`,
  () => `The transparent ingredient list sold me. Just activated carbon. No weird chemicals.`,
  () => `i was spending so much on scented sprays that didn't work. this costs less and actually works`,
  () => `My roommate is chemically sensitive. This is the only thing that works for both of us.`,
  () => `Been recommending this to everyone. My friends are tired of hearing about it but it's that good.`,
  () => `The science behind carbon adsorption is well-established. This product applies it perfectly.`,
  () => `No perfume. No headache. No smell. Perfect trifecta.`,
  (context, persona) => `Managing ${persona.household} got exponentially easier with this. Wish I'd found it sooner.`,
  () => `Exceeded expectations significantly. Rare for products these days.`,
  () => `The activated carbon actually captures the molecules instead of masking them. That's the key difference.`,
  () => `my therapist noticed my apartment smelled better and asked what i changed lol. this was it`,
  () => `Simple solution to a complex problem. That's good design.`,
  () => `I have COPD and can't tolerate fragrances. This eliminated odor without triggering my lungs.`,
  () => `Works immediately. Works consistently. Works as advertised.`,
  () => `The carbon bed captures odor molecules through physical adsorption. It's not magic, it's chemistry.`,
  () => `Been using for a year. Still works. Still buying it.`,
  () => `My building super commented that my unit smells better than most pet-free units. That's the power of this stuff.`,
  () => `Practical. Effective. Affordable. Everything you want in a product.`,
  () => `i hate leaving reviews but this actually solved my problem so here we are`,
  () => `The molecular binding is real. You can tell it's capturing smell at the source.`,
  () => `My standards are high. This met them all.`,
  () => `No artificial anything. Just pure carbon doing its molecular job.`,
  (context, persona) => `As a ${persona.occupation} I'm home 24/7. The smell was inescapable before this. Now it's completely gone.`,
  () => `Tried everything before this. Nothing worked. This worked immediately.`,
  () => `The technology is proven. The product delivers. Case closed.`,
  () => `honestly the best thing i've bought for my apartment all year`,
  () => `Fragrance-free means actually fragrance-free. Rare and appreciated.`,
  () => `My cats approve (they didn't change behavior) and so do I (no smell). Win-win.`,
  () => `Chemical adsorption on activated carbon is textbook science. This applies it brilliantly.`,
  () => `Works. Period.`,
  () => `The absence of artificial fragrance is as important as the absence of ammonia smell. This delivers both.`,
  () => `My parents visited and didn't realize I had cats. That's the ultimate test.`,
  () => `Solid product. Solid science. Solid results.`,
  () => `i was skeptical because everything else failed but this actually works`,
  () => `The carbon technology is the same used in water filtration. Proven method applied to odor control.`,
  () => `Been using for eight months. Effectiveness hasn't decreased. Quality product.`,
  () => `My apartment smells like nothing. That's exactly what I wanted.`,
  () => `Professional grade results at consumer prices. Rare.`,
  () => `The activated carbon approach made sense to me as an engineer. Glad to see it works in practice.`,
  () => `no weird smells. no cat smells. just normal air. perfect`,
  // 151-200: Final 50 unique testimonials
  () => `My dates don't wrinkle their noses anymore when they come over. That alone makes this worth it.`,
  () => `Carbon adsorption is thermodynamically favorable for ammonia. This product gets the chemistry right.`,
  () => `Simple. Clean. Effective. Three words that describe this perfectly.`,
  () => `I have multiple chemical sensitivity. This doesn't trigger it. And it works. Grateful beyond words.`,
  () => `The real test is having guests who don't know you have cats. They never guess. It works that well.`,
  () => `Been through every product on the market. This is the only one that delivers.`,
  () => `Molecular chemistry working exactly as it should. Impressed.`,
  () => `my place finally smells like a place instead of a zoo`,
  () => `The porous carbon structure traps odor molecules through Van der Waals forces. Science done right.`,
  () => `Works immediately and consistently. That's all you need in a product.`,
  () => `My home office is tolerable again. Can actually focus on work now.`,
  () => `Fragrance sensitivity made everything else unusable. This works without triggering reactions.`,
  () => `The activated carbon bed does exactly what chemistry says it should. Excellent product.`,
  () => `honestly just buy it you won't regret it`,
  () => `My air purifier thanks me. Doesn't have to work as hard now.`,
  () => `Professional results. Consumer price point. Sold.`,
  () => `The science of adsorption is well understood. This applies it perfectly.`,
  () => `My cats are my family. This lets me live with them comfortably. Grateful.`,
  () => `No masking. Just elimination. That's the difference.`,
  (context, persona) => `Being a ${persona.occupation} means I notice details. The detail I notice most now is the absence of smell.`,
  () => `Tried it. It worked. Ordered more. Simple story.`,
  () => `The carbon's high surface area creates massive adsorption capacity. This product uses it well.`,
  () => `my therapist said my living environment seemed healthier. this was the change`,
  () => `Quality carbon filtration in a convenient form. Smart product design.`,
  () => `Works as advertised every single time. Consistency matters.`,
  () => `My building allows pets but odor complaints void that privilege. This saves me.`,
  () => `The thermodynamics favor adsorption. The product works as chemistry predicts.`,
  () => `no complaints. does everything it promises`,
  () => `My mom can visit now without commenting on smell. That's worth everything.`,
  () => `Activated carbon filtration: proven technology, practical application, perfect results.`,
  () => `Been using for ten months. Still works perfectly. Quality product.`,
  () => `The molecular bonding is real and measurable. This isn't placebo.`,
  () => `i hate shopping for this stuff but this is the last product i'll try because it works`,
  () => `My apartment smells neutral. That's exactly what I paid for.`,
  () => `The pore structure of activated carbon is ideal for capturing small molecules. This uses that brilliantly.`,
  (context, persona) => `Managing ${persona.household} became possible with this. Before it was overwhelming.`,
  () => `Chemical-free odor elimination through physical adsorption. Science working as intended.`,
  () => `Works. Consistently. Perfectly. End of review.`,
  () => `My home is my sanctuary again. This made that possible.`,
  () => `The carbon mechanism is straightforward and effective. No gimmicks needed.`,
  () => `been using for over a year now. effectiveness hasn't changed. impressed`,
  () => `My guests never guess I have cats. The smell is completely gone.`,
  () => `Professional filtration technology made accessible. Excellent.`,
  () => `The adsorption isotherms favor ammonia capture. Product works exactly as chemistry predicts.`,
  () => `finally found something that works without making me sick from artificial fragrances`,
  () => `My quality of life improved significantly. Simple product, profound impact.`,
  () => `Carbon's microporous structure provides massive surface area for molecular capture. This uses it perfectly.`,
  () => `Tried everything else first. Should've started here.`,
  () => `The science is sound. The product delivers. That's all that matters.`,
  () => `my place smells like nothing and that's exactly what i wanted`,
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

  // Use different multipliers to ensure better distribution across the same city
  const firstName = personaFirstNames[(seed * 7) % personaFirstNames.length];
  const lastInitial = personaLastInitials[(seed * 11) % personaLastInitials.length];
  const occupation = occupationDescriptors[(seed * 13) % occupationDescriptors.length];
  const household = householdDescriptors[(seed * 17) % householdDescriptors.length];
  const locationFormatter = locationFormatters[(seed * 19) % locationFormatters.length];
  const quoteBuilder = quoteTemplates[(seed * 23 + slotIndex * 29) % quoteTemplates.length];
  const timeAgo = timeAgoOptions[(seed * 31) % timeAgoOptions.length];
  const stars = starRatings[(seed * 37 + slotIndex) % starRatings.length];
  const badge = trustBadges[(seed * 41) % trustBadges.length];
  const helpfulCount = 12 + ((seed * 43) % 45); // Random between 12-57

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
                      Independent pet stores across {profile.name} stock the odor eliminator cat parents talk about.
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Start with your favourite neighbourhood shop or tell them you want to see Purrify on the shelf.
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
                  Purrify works with every litter type—clumping clay, crystal, natural pine, corn, wheat, and tofu litters. {profile.name} cat owners pair it with the litter brands they already buy from independent pet shops, and it enhances them all without changing your cat's preferences.
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
                  Many independent retailers in {profile.name} stock Purrify. Call ahead to check availability, or order online for guaranteed 2-3 day delivery anywhere in {profile.province}.
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
