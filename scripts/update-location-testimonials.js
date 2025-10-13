const fs = require('fs');
const path = require('path');

// City-specific testimonial data
const cityTestimonials = {
  vaughan: {
    testimonial1: '"Living in Vaughan\'s newer subdivisions means our home is our pride. Purrify keeps our open-concept main floor fresh with three cats!"',
    name1: 'Linda W., Vaughan',
    testimonial2: '"Perfect for busy families! My kids can have friends over without worrying about litter box smell. Game changer!"',
    name2: 'Rajesh P., Vaughan',
    faqQuestion: 'Does Purrify work with automated litter boxes?',
    faqAnswer: 'Yes! Purrify works great with automatic litter boxes and traditional ones. Just sprinkle it in alongside your regular litter and it enhances odor control even further.'
  },
  mississauga: {
    testimonial1: '"Our Mississauga townhouse stays fresh even with two cats! Perfect for our busy commuter lifestyle - no time for constant cleaning."',
    name1: 'Sarah K., Mississauga',
    testimonial2: '"Close to Pearson Airport means we travel often. Purrify keeps our home fresh while we\'re away. Our cat sitter loves it!"',
    name2: 'Marcus T., Mississauga',
    faqQuestion: 'How long does one container last?',
    faqAnswer: 'For most households, one container lasts 1-2 months. For multiple cats, you may need to sprinkle a bit more, but it\'s still very economical compared to constantly buying new litter!'
  },
  brampton: {
    testimonial1: '"Perfect for our growing Brampton family home! Three kids, two cats, and Purrify keeps everything smelling clean and fresh."',
    name1: 'Simran B., Brampton',
    testimonial2: '"Affordable solution that actually works! As a single parent with cats, I need products that deliver value. Purrify does!"',
    name2: 'James T., Brampton',
    faqQuestion: 'Is Purrify safe for homes with children?',
    faqAnswer: 'Absolutely! Purrify is 100% natural activated carbon with no chemicals or fragrances. Safe for homes with kids, pets, and even pregnant women.'
  },
  markham: {
    testimonial1: '"Our Markham home office setup means I\'m on video calls all day. Purrify ensures my background is always fresh and professional!"',
    name1: 'Jennifer L., Markham',
    testimonial2: '"Tech-savvy solution for modern homes. Works better than any smart gadget I\'ve tried. Simple, natural, effective."',
    name2: 'Kevin C., Markham',
    faqQuestion: 'How does activated carbon work?',
    faqAnswer: 'Activated carbon has millions of tiny pores that trap odor molecules at the molecular level. Unlike perfumes that mask odors, it actually removes them from the air. It\'s the same technology used in high-end air purifiers!'
  },
  'richmond-hill': {
    testimonial1: '"Our beautiful Richmond Hill home deserves the best. Purrify delivers luxury-level odor control without the luxury price tag."',
    name1: 'Angela M., Richmond Hill',
    testimonial2: '"Hosting dinner parties is no problem now! Guests never know we have cats. Purrify is our secret weapon."',
    name2: 'David K., Richmond Hill',
    faqQuestion: 'Can I use Purrify with premium litter brands?',
    faqAnswer: 'Yes! Purrify enhances any litter brand - premium or budget. Many customers with high-end litters use Purrify to make them even more effective.'
  },
  scarborough: {
    testimonial1: '"Our Scarborough apartment complex is pet-friendly, but that doesn\'t mean it should smell like it! Purrify keeps my unit fresh."',
    name1: 'Mei L., Scarborough',
    testimonial2: '"Great value for money! With rent prices in Scarborough, I need affordable solutions that work. This is it!"',
    name2: 'Christopher D., Scarborough',
    faqQuestion: 'Does Purrify work in apartments?',
    faqAnswer: 'Yes! Purrify is perfect for apartments and condos where space is limited. It works especially well in smaller spaces where odors can concentrate.'
  },
  oakville: {
    testimonial1: '"Lakefront living means we have guests over often. Purrify ensures our Oakville home always smells as beautiful as it looks."',
    name1: 'Catherine R., Oakville',
    testimonial2: '"Natural, eco-friendly, and it works! Perfect for our health-conscious household. We won\'t use anything else."',
    name2: 'Michael B., Oakville',
    faqQuestion: 'Is Purrify environmentally friendly?',
    faqAnswer: 'Yes! Purrify is 100% natural activated carbon derived from renewable sources. It\'s biodegradable and contains zero chemicals or artificial additives.'
  },
  burlington: {
    testimonial1: '"Between Lake Ontario humidity and three cats, odor control was a challenge. Purrify solved it completely!"',
    name1: 'Nicole S., Burlington',
    testimonial2: '"Family-friendly and actually works! Our Burlington home stays fresh all year round. Highly recommend to other cat families."',
    name2: 'Tom H., Burlington',
    faqQuestion: 'Does humidity affect Purrify?',
    faqAnswer: 'Activated carbon works in all humidity conditions! It\'s actually great for humid climates because it also helps absorb excess moisture in the litter box.'
  },
  'quebec-city': {
    testimonial1: '"Parfait pour notre appartement dans le Vieux-Québec! Purrify garde l\'air frais même avec deux chats."',
    name1: 'Marie-Claude L., Quebec City',
    testimonial2: '"Historic homes need modern solutions! Purrify works perfectly in our 100-year-old house. Natural and effective."',
    name2: 'Pierre D., Quebec City',
    faqQuestion: 'Est-ce que Purrify est disponible au Québec?',
    faqAnswer: 'Oui! Free shipping across Quebec, including Quebec City. Orders typically arrive within 2-3 business days. Nous offrons le support en français!'
  }
};

// Function to update a location file
function updateLocationFile(cityKey, filePath) {
  console.log(`\nUpdating ${filePath}...`);

  const data = cityTestimonials[cityKey];
  if (!data) {
    console.log(`  ⚠️  No testimonial data for ${cityKey}, skipping...`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  let updated = false;

  // Replace generic testimonials
  const genericPattern1 = /("Living in \{city\.name\} with three cats was challenging until I found Purrify\.\s*The odor control is incredible!")/;
  const genericPattern2 = /("I tried everything at pet stores in \{city\.name\}\. Nothing worked like Purrify!")/;

  if (genericPattern1.test(content)) {
    content = content.replace(genericPattern1, data.testimonial1);
    updated = true;
    console.log('  ✓ Updated testimonial 1');
  }

  if (genericPattern2.test(content)) {
    content = content.replace(genericPattern2, data.testimonial2);
    updated = true;
    console.log('  ✓ Updated testimonial 2');
  }

  // Replace generic names
  content = content.replace(/- Sarah M\., \{city\.name\}/g, `- ${data.name1}`);
  content = content.replace(/- Mike R\., \{city\.name\}/g, `- ${data.name2}`);

  // Add dark mode to testimonial text if missing
  content = content.replace(
    /(<p className="italic mb-4)">(?!\s*text-gray)/g,
    '$1 text-gray-700 dark:text-gray-200">'
  );

  // Add dark mode to testimonial names if missing
  content = content.replace(
    /(<p className="font-semibold)">(?!\s*text-gray)/g,
    '$1 text-gray-900 dark:text-gray-50">'
  );

  // Add dark mode to "Why {city.name} Cat Owners Choose Purrify" heading
  content = content.replace(
    /(<h2 className="text-2xl font-bold mb-4)">Why \{city\.name\}/g,
    '$1 text-gray-900 dark:text-gray-50">Why {city.name}'
  );

  // Add dark mode to list items in hero section
  content = content.replace(
    /(<ul className="text-left space-y-2)">(?!\s*text-gray)/g,
    '$1 text-gray-700 dark:text-gray-200">'
  );

  // Add dark mode to "What {city.name} Cat Owners Are Saying" heading
  content = content.replace(
    /(<h2 className="text-3xl font-bold text-center mb-12)">[\s\n]*What \{city\.name\}/g,
    '$1 text-gray-900 dark:text-gray-50">\n              What {city.name}'
  );

  // Add dark mode to FAQ section heading
  content = content.replace(
    /(<h2 className="text-3xl font-bold text-center mb-12)">[\s\n]*\{city\.name\} FAQ/g,
    '$1 text-gray-900 dark:text-gray-50">\n              {city.name} FAQ'
  );

  // Add dark mode and borders to FAQ items
  content = content.replace(
    /(<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg)">(?!\s*border)/g,
    '$1 border border-gray-200 dark:border-gray-700">'
  );

  // Add dark mode to FAQ question headings
  content = content.replace(
    /(<h3 className="text-xl font-bold mb-2)">(?!\s*text-gray)/g,
    '$1 text-gray-900 dark:text-gray-50">'
  );

  // Add dark mode to FAQ answer text
  content = content.replace(
    /(<h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-50">[\s\S]*?<\/h3>\s*<p)>(?!\s*className="text-gray)/g,
    '$1 className="text-gray-700 dark:text-gray-200">'
  );

  // Replace competitive FAQ question with value-focused one
  content = content.replace(
    /How is Purrify different from products at \{city\.name\} pet stores\?/g,
    data.faqQuestion
  );

  // Replace competitive FAQ answer
  content = content.replace(
    /We sell direct to keep costs low and quality high\.\s*Our activated carbon actually eliminates odors instead of masking them\./g,
    data.faqAnswer
  );

  if (updated) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`  ✅ Successfully updated ${cityKey}`);
  } else {
    console.log(`  ℹ️  No generic testimonials found in ${cityKey}`);
  }
}

// Main execution
console.log('🚀 Starting bulk location page updates...\n');

const locationsDir = path.join(__dirname, '..', 'pages', 'locations');
const citiesToUpdate = [
  'vaughan',
  'mississauga',
  'brampton',
  'markham',
  'richmond-hill',
  'scarborough',
  'oakville',
  'burlington',
  'quebec-city'
];

citiesToUpdate.forEach(city => {
  const filePath = path.join(locationsDir, `${city}.tsx`);
  if (fs.existsSync(filePath)) {
    updateLocationFile(city, filePath);
  } else {
    console.log(`⚠️  File not found: ${filePath}`);
  }
});

console.log('\n✅ Bulk update complete!\n');
