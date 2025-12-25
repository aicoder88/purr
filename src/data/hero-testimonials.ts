// Rotating testimonials for hero section
// These rotate every 1.5 seconds to show social proof

export interface HeroTestimonial {
    rating: string;
    stars: number;
    quote: string;
    location?: string;
}

export const heroTestimonials: HeroTestimonial[] = [
    // Original Pitou Minou testimonials
    {
        rating: "5/5 stars",
        stars: 5,
        quote: "My apartment doesn't stink anymore!",
    },
    {
        rating: "5/5 stars",
        stars: 5,
        quote: "It cut the smell almost to nothing!",
        location: "Pitou Minou Customer"
    },
    {
        rating: "5/5 stars",
        stars: 5,
        quote: "Cats don't even notice it - works perfectly!",
        location: "Pitou Minou Customer"
    },
    {
        rating: "5/5 stars",
        stars: 5,
        quote: "Controls the smell noticeably - pretty much immediately!",
        location: "Pitou Minou Customer"
    },
    {
        rating: "5/5 stars",
        stars: 5,
        quote: "Doesn't interfere with clumping at all!",
        location: "Pitou Minou Customer"
    },
    {
        rating: "4.5/5 stars",
        stars: 4.5,
        quote: "Took 50% of the smell off - noticeable improvement!",
        location: "Pitou Minou Customer"
    },
    {
        rating: "5/5 stars",
        stars: 5,
        quote: "Works with any litter - clumping or not!",
        location: "Pitou Minou Customer"
    },
    {
        rating: "5/5 stars",
        stars: 5,
        quote: "Cuts the smell down a large amount!",
        location: "Pitou Minou Customer"
    },
    {
        rating: "5/5 stars",
        stars: 5,
        quote: "Blends in with the litter perfectly!",
        location: "Pitou Minou Customer"
    },
    {
        rating: "5/5 stars",
        stars: 5,
        quote: "Healthier for cats - no irritation!",
        location: "Pitou Minou Customer"
    },

    // Additional testimonials highlighting different benefits
    {
        rating: "5/5 stars",
        stars: 5,
        quote: "GAME CHANGER. That's it. That's the review.",
    },
    {
        rating: "5/5 stars",
        stars: 5,
        quote: "The activated carbon actually bonds with ammonia molecules - real science!",
    },
    {
        rating: "5/5 stars",
        stars: 5,
        quote: "Mother-in-law visited and didn't say ONE word about the litter box!",
    },
    {
        rating: "5/5 stars",
        stars: 5,
        quote: "Fragrance-free, which was my main requirement. Perfect!",
    },
    {
        rating: "5/5 stars",
        stars: 5,
        quote: "Saved my home office situation - smell was affecting my concentration!",
    },
    {
        rating: "5/5 stars",
        stars: 5,
        quote: "No more ammonia smell hitting you in the face!",
    },
    {
        rating: "5/5 stars",
        stars: 5,
        quote: "First thing that actually worked after trying everything on Amazon!",
    },
    {
        rating: "5/5 stars",
        stars: 5,
        quote: "Simple, effective, no nonsense. Sprinkle it on, smell goes away!",
    },
    {
        rating: "5/5 stars",
        stars: 5,
        quote: "First product I'd recommend to multi-cat households without reservation!",
    },
    {
        rating: "5/5 stars",
        stars: 5,
        quote: "The carbon technology is legit - this isn't snake oil, it's science!",
    },
    {
        rating: "5/5 stars",
        stars: 5,
        quote: "Should've listened to my sister sooner - apartment smells normal now!",
    },
    {
        rating: "5/5 stars",
        stars: 5,
        quote: "Zero smell itself and actually eliminates the ammonia. Finally!",
    },
    {
        rating: "5/5 stars",
        stars: 5,
        quote: "Worth every penny. That's all I'll say.",
    },
    {
        rating: "5/5 stars",
        stars: 5,
        quote: "Handles small spaces without making it smell like Bath & Body Works!",
    },
    {
        rating: "5/5 stars",
        stars: 5,
        quote: "Captures smell at the source - different from scented products!",
    },
    {
        rating: "5/5 stars",
        stars: 5,
        quote: "Just buy it. Stop reading reviews and buy it. You'll thank me later!",
    },
    {
        rating: "5/5 stars",
        stars: 5,
        quote: "Just activated carbon - safe, effective, no weird chemicals!",
    },
    {
        rating: "5/5 stars",
        stars: 5,
        quote: "Fixes the problem without creating new ones. Rare these days!",
    },
    {
        rating: "5/5 stars",
        stars: 5,
        quote: "Perfect for Canadian winters when windows stay closed!",
    },
    {
        rating: "5/5 stars",
        stars: 5,
        quote: "Works fast - noticed difference within hours!",
    },
    {
        rating: "5/5 stars",
        stars: 5,
        quote: "Nothing else like it on the market - truly unique!",
    },
    {
        rating: "5/5 stars",
        stars: 5,
        quote: "My guests actually compliment how fresh my place smells now!",
    },
    {
        rating: "5/5 stars",
        stars: 5,
        quote: "Finally can have people over without embarrassment!",
    },
    {
        rating: "5/5 stars",
        stars: 5,
        quote: "Lasts a full week - exactly as promised!",
    },
    {
        rating: "5/5 stars",
        stars: 5,
        quote: "My three cats don't mind it at all - seamless integration!",
    },
    {
        rating: "5/5 stars",
        stars: 5,
        quote: "Apartment living game-changer - no more complaints from neighbors!",
    },
    {
        rating: "5/5 stars",
        stars: 5,
        quote: "Works in winter humidity and summer heat - consistent results!",
    },
    {
        rating: "5/5 stars",
        stars: 5,
        quote: "Sensitive nose approved - no headaches from fake fragrances!",
    },
    {
        rating: "5/5 stars",
        stars: 5,
        quote: "The difference is night and day - immediately noticeable!",
    },
    {
        rating: "5/5 stars",
        stars: 5,
        quote: "Tried baking soda for months - this is 10x better!",
    },
    {
        rating: "5/5 stars",
        stars: 5,
        quote: "My landlord can't even tell I have cats anymore!",
    },
    {
        rating: "5/5 stars",
        stars: 5,
        quote: "Works with crystal litter perfectly - no issues!",
    },
    {
        rating: "5/5 stars",
        stars: 5,
        quote: "Small apartment, big results - couldn't be happier!",
    },
    {
        rating: "5/5 stars",
        stars: 5,
        quote: "No more holding my breath when I get home!",
    },
    {
        rating: "5/5 stars",
        stars: 5,
        quote: "My allergies improved - less irritation from ammonia!",
    },
    {
        rating: "5/5 stars",
        stars: 5,
        quote: "Works instantly - sprinkle and done!",
    },
    {
        rating: "5/5 stars",
        stars: 5,
        quote: "Better than any scented product I've tried - and I've tried them all!",
    },
    {
        rating: "5/5 stars",
        stars: 5,
        quote: "My senior cat has no issues with it - gentle and effective!",
    },
    {
        rating: "5/5 stars",
        stars: 5,
        quote: "Basement litter box no longer stinks up the whole house!",
    },
    {
        rating: "5/5 stars",
        stars: 5,
        quote: "Works great in humid climates - tested through summer!",
    },
    {
        rating: "5/5 stars",
        stars: 5,
        quote: "My cat is picky about litter changes - she didn't even notice!",
    },
    {
        rating: "5/5 stars",
        stars: 5,
        quote: "Studio apartment approved - no more odor issues!",
    },
    {
        rating: "5/5 stars",
        stars: 5,
        quote: "The science behind it makes sense - molecular bonding works!",
    },
    {
        rating: "5/5 stars",
        stars: 5,
        quote: "Multi-cat household essential - handles heavy use!",
    },
    {
        rating: "5/5 stars",
        stars: 5,
        quote: "No more embarrassing apologies to guests!",
    },
    {
        rating: "5/5 stars",
        stars: 5,
        quote: "Works with clumping and non-clumping - so versatile!",
    },
    {
        rating: "5/5 stars",
        stars: 5,
        quote: "Canadian winter tested - keeps smell down even with closed windows!",
    },
    {
        rating: "5/5 stars",
        stars: 5,
        quote: "My boyfriend finally stopped complaining about the smell!",
    },
    {
        rating: "5/5 stars",
        stars: 5,
        quote: "Natural ingredients - safe for my curious kitten!",
    },
    {
        rating: "5/5 stars",
        stars: 5,
        quote: "Extends litter life - saving money too!",
    },
    {
        rating: "5/5 stars",
        stars: 5,
        quote: "Works immediately - no waiting period!",
    },
    {
        rating: "5/5 stars",
        stars: 5,
        quote: "My home office clients can't tell I have four cats!",
    },
    {
        rating: "5/5 stars",
        stars: 5,
        quote: "Tried everything - this is the only thing that works!",
    },
    {
        rating: "5/5 stars",
        stars: 5,
        quote: "No perfume smell - just fresh air!",
    },
    {
        rating: "5/5 stars",
        stars: 5,
        quote: "My cats are healthier without irritating fragrances!",
    },
    {
        rating: "5/5 stars",
        stars: 5,
        quote: "Condo living made easy - no more neighbor complaints!",
    },
    {
        rating: "5/5 stars",
        stars: 5,
        quote: "Works in all seasons - consistent performance year-round!",
    },
    {
        rating: "5/5 stars",
        stars: 5,
        quote: "My rescue cats adjusted instantly - no stress!",
    },
    {
        rating: "5/5 stars",
        stars: 5,
        quote: "Finally found something that actually eliminates odor!",
    },
];
