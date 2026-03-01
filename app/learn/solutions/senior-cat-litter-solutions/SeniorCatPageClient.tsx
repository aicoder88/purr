'use client';

import Link from 'next/link';
import Image from 'next/image';
import { RelatedSolutions } from '@/components/learn/RelatedSolutions';
import { HowToSection } from '@/components/seo/HowToSection';
import { AIQuotableBlock } from '@/components/seo/AIQuotableBlock';
import { RelatedQuestions } from '@/components/seo/RelatedQuestions';

export default function SeniorCatPageClient() {
    const canonicalUrl = 'https://www.purrify.ca/learn/solutions/senior-cat-litter-solutions/';

    // Senior cat litter solution images
    const heroImage = '/optimized/blog/senior-cat-hero.png';
    const sectionImage1 = '/optimized/blog/senior-cat-mobility.png';
    const sectionImage2 = '/optimized/blog/ammonia-fresh-home.webp'; // Using existing image as placeholder

    // HowTo steps for senior cat litter setup
    const howToSteps = [
        {
            name: 'Choose a low-sided litter box',
            text: 'Select a litter box with sides no higher than 3-4 inches. Senior cats with arthritis struggle to step over high walls. Consider boxes specifically designed for senior cats or repurpose a large storage container with a cutout entrance.',
            tip: 'Some cat owners cut a U-shaped entrance in plastic storage bins for easy access.',
        },
        {
            name: 'Position the box in an accessible location',
            text: 'Place the litter box on the main floor where your senior cat spends most of their time. Avoid stairs, basements, or areas requiring jumping. Keep it near their favorite resting spots but away from food and water.',
        },
        {
            name: 'Use low-dust, senior-friendly litter',
            text: 'Choose a soft, low-dust litter that is gentle on sensitive paws. Add Purrify activated carbon to control odors without harsh chemical fragrances that can irritate senior cats with respiratory sensitivities.',
        },
        {
            name: 'Add a non-slip mat',
            text: 'Place a textured, non-slip mat around the litter box entrance. This provides stability for cats with balance issues and catches tracked litter, making cleanup easier.',
        },
        {
            name: 'Maintain extra cleanliness',
            text: 'Senior cats are often more sensitive to odors and cleanliness. Scoop twice daily and replace litter more frequently. Refresh Purrify activated carbon every 2-3 days to maintain odor-free conditions.',
        },
    ];

    // FAQ questions for senior cats
    const faqQuestions = [
        {
            question: 'What type of litter box is best for senior cats?',
            answer: 'Low-sided litter boxes (3-4 inches high) are best for senior cats. Many older cats develop arthritis and struggle to step over high walls. Some cat owners use large plastic storage containers with a U-shaped cutout entrance to create an accessible entry point.',
        },
        {
            question: 'Why do senior cats need low-dust litter?',
            answer: 'Senior cats often develop respiratory sensitivities as they age. Low-dust litter prevents irritation and breathing difficulties. Additionally, senior cats spend more time in and around the litter box due to potential kidney issues or frequent urination, increasing dust exposure.',
        },
        {
            question: 'How often should I clean a senior cat litter box?',
            answer: 'Scoop at least twice daily for senior cats. Older cats are more sensitive to odors and may avoid dirty litter boxes, leading to accidents. Many senior cats also have kidney disease or diabetes, resulting in more frequent urination and higher waste volume.',
        },
        {
            question: 'Can Purrify help with senior cat litter box odor?',
            answer: 'Yes. Purrify activated carbon traps ammonia and other odors at the molecular level without harsh fragrances that can irritate senior cats. It is 100% natural and safe for cats with health sensitivities, making it ideal for elderly cats.',
        },
        {
            question: 'Should I have multiple litter boxes for my senior cat?',
            answer: 'Yes, especially in multi-level homes. The general rule is one box per floor plus one extra. Senior cats with mobility issues may not make it to a distant litter box in time, so having boxes nearby reduces accidents and stress.',
        },
    ];

    return (
        <div className="min-h-screen bg-[#FFFFF5] bg-gray-900 transition-colors duration-300">
            <section className="py-20 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 text-gray-900 text-gray-100">
                        Senior Cat Litter Solutions
                    </h1>
                    <p className="text-xl text-gray-700 text-gray-200 mb-8">
                        Your aging cat deserves comfort and dignity. Discover litter solutions designed for senior cats with arthritis, mobility issues, and sensitive health needs.
                    </p>

                    <div className="bg-white/80 bg-gray-800/80 backdrop-blur-lg rounded-xl p-8 shadow-lg border border-electric-indigo/10 border-electric-indigo/20 max-w-2xl mx-auto">
                        <h2 className="text-2xl font-heading font-bold mb-4 text-electric-indigo text-electric-indigo-400">Perfect for Senior Cats</h2>
                        <p className="text-lg mb-6 text-gray-700 text-gray-200">Purrify offers low-dust, odor-eliminating care that&apos;s gentle on aging cats. No harsh fragrances, just pure activated carbon technology.</p>

                        <div className="bg-gray-50 bg-gray-700 rounded-lg p-6 mb-6 text-left">
                            <h3 className="font-heading text-lg font-semibold mb-3 text-gray-900 text-gray-100">Why Senior Cats Need Special Care</h3>
                            <p className="text-gray-700 text-gray-200 mb-3">
                                As cats age, they develop unique needs. Arthritis makes climbing difficult, kidney disease increases urination, and respiratory sensitivities require low-dust environments.
                            </p>
                            <p className="text-gray-700 text-gray-200">
                                Senior cats deserve litter solutions that accommodate these changes while maintaining their comfort and dignity.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-4 mb-8">
                            <div className="text-center">
                                <div className="text-3xl mb-2">🐱</div>
                                <h3 className="font-heading font-bold text-gray-900 text-gray-100">Low Dust</h3>
                                <p className="text-sm text-gray-600 text-gray-300">Gentle on sensitive respiratory systems</p>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl mb-2">💚</div>
                                <h3 className="font-heading font-bold text-gray-900 text-gray-100">100% Natural</h3>
                                <p className="text-sm text-gray-600 text-gray-300">Safe for cats with health issues</p>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl mb-2">🌟</div>
                                <h3 className="font-heading font-bold text-gray-900 text-gray-100">Superior Odor Control</h3>
                                <p className="text-sm text-gray-600 text-gray-300">Handles increased waste from aging cats</p>
                            </div>
                        </div>

                        <Link
                            href="/products/trial-size/"
                            className="inline-block bg-gradient-to-r from-electric-indigo to-deep-coral text-white text-gray-100 font-bold py-3 px-8 rounded-lg hover:from-electric-indigo-600 hover:to-deep-coral-600 hover:scale-105 transition-all duration-300 shadow-lg"
                        >
                            Try Purrify for Your Senior Cat
                        </Link>
                    </div>
                </div>
            </section>

            {/* Hero Image */}
            <section className="py-8 px-4">
                <div className="max-w-5xl mx-auto">
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                        <Image
                            src={heroImage}
                            alt="Senior orange tabby cat with easy-access litter box"
                            width={1200}
                            height={675}
                            className="w-full h-auto"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                            <div className="p-8 text-white text-gray-100">
                                <h2 className="font-heading text-3xl font-bold mb-2">Comfort & Accessibility First</h2>
                                <p className="text-xl opacity-90">Low-sided boxes make all the difference</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 px-4">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-heading font-bold text-center mb-12 text-gray-900 text-gray-100">Understanding Senior Cat Needs</h2>

                    <div className="bg-white/80 bg-gray-800/80 backdrop-blur-lg rounded-xl p-8 mb-12 shadow-lg border border-electric-indigo/10 border-electric-indigo/20 hover:scale-105 transition-all duration-300">
                        <h3 className="text-2xl font-heading font-semibold mb-6 text-gray-900 text-gray-100">Common Challenges for Aging Cats</h3>
                        <div className="space-y-4 text-gray-700 text-gray-200">
                            <div>
                                <h4 className="font-heading font-bold mb-2">Arthritis & Joint Pain</h4>
                                <p>Up to 90% of cats over age 12 have arthritis. High litter box walls become painful obstacles. Every entry and exit causes discomfort.</p>
                            </div>
                            <div>
                                <h4 className="font-heading font-bold mb-2">Kidney Disease</h4>
                                <p>Chronic kidney disease affects 30-40% of senior cats, leading to increased urination and more frequent litter box visits. Odor control becomes critical.</p>
                            </div>
                            <div>
                                <h4 className="font-heading font-bold mb-2">Respiratory Sensitivity</h4>
                                <p>Older cats develop increased sensitivity to dust and fragrances. Clay litter dust can trigger coughing, sneezing, and breathing difficulties.</p>
                            </div>
                            <div>
                                <h4 className="font-heading font-bold mb-2">Cognitive Decline</h4>
                                <p>Senior cats may forget litter box locations or become confused. Consistent placement and multiple boxes help prevent accidents.</p>
                            </div>
                        </div>
                    </div>

                    {/* Mobility Image */}
                    <div className="mb-12">
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                            <Image
                                src={sectionImage1}
                                alt="Senior cat mobility and arthritis care illustration"
                                width={1200}
                                height={675}
                                className="w-full h-auto"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                                <div className="p-8 text-white text-gray-100">
                                    <h3 className="font-heading text-2xl font-bold mb-2">Understanding Mobility Challenges</h3>
                                    <p className="text-lg opacity-90">Arthritis affects how senior cats use litter boxes</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white/80 bg-gray-800/80 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-electric-indigo/10 border-electric-indigo/20 hover:scale-105 transition-all duration-300">
                            <h3 className="text-xl font-heading font-semibold mb-4 text-gray-900 text-gray-100">Physical Accommodations</h3>
                            <ul className="space-y-3 text-gray-700 text-gray-200">
                                <li>✓ Low-sided entry (3-4 inches maximum)</li>
                                <li>✓ Non-slip mats for stability</li>
                                <li>✓ Larger box size for easier turning</li>
                                <li>✓ Gentle, soft litter texture</li>
                                <li>✓ Ground floor placement (no stairs)</li>
                            </ul>
                        </div>

                        <div className="bg-white/80 bg-gray-800/80 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-electric-indigo/10 border-electric-indigo/20 hover:scale-105 transition-all duration-300">
                            <h3 className="text-xl font-heading font-semibold mb-4 text-gray-900 text-gray-100">Health Considerations</h3>
                            <ul className="space-y-3 text-gray-700 text-gray-200">
                                <li>✓ Low-dust formula for respiratory health</li>
                                <li>✓ No harsh fragrances or chemicals</li>
                                <li>✓ Superior odor control for kidney disease</li>
                                <li>✓ Easy-to-scoop for frequent cleaning</li>
                                <li>✓ Activated carbon for natural odor elimination</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Setup Image */}
            <section className="py-8 px-4">
                <div className="max-w-5xl mx-auto">
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                        <Image
                            src={sectionImage2}
                            alt="Ideal litter box setup for senior cats"
                            width={1200}
                            height={675}
                            className="w-full h-auto"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                            <div className="p-8 text-white text-gray-100">
                                <h3 className="font-heading text-2xl font-bold mb-2">The Perfect Senior-Friendly Setup</h3>
                                <p className="text-lg opacity-90">Creating a comfortable environment for your aging cat</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 px-4 bg-white bg-gray-800">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-heading font-bold mb-8 text-gray-900 text-gray-100">How Purrify Helps Senior Cats</h2>
                        <p className="text-xl mb-8 text-gray-700 text-gray-200">Designed with the unique needs of aging cats in mind</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 mb-12">
                        <div className="bg-white/80 bg-gray-800/80 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-electric-indigo/10 border-electric-indigo/20 hover:scale-105 transition-all duration-300">
                            <h3 className="text-xl font-heading font-semibold mb-4 text-gray-900 text-gray-100">Gentle on Sensitive Systems</h3>
                            <ul className="space-y-3 text-gray-700 text-gray-200">
                                <li>✓ Virtually dust-free application</li>
                                <li>✓ No artificial fragrances to irritate respiratory systems</li>
                                <li>✓ 100% natural activated carbon</li>
                                <li>✓ Safe for cats with health sensitivities</li>
                                <li>✓ Won&apos;t trigger allergies or asthma</li>
                            </ul>
                        </div>

                        <div className="bg-white/80 bg-gray-800/80 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-electric-indigo/10 border-electric-indigo/20 hover:scale-105 transition-all duration-300">
                            <h3 className="text-xl font-heading font-semibold mb-4 text-gray-900 text-gray-100">Superior Odor Control</h3>
                            <ul className="space-y-3 text-gray-700 text-gray-200">
                                <li>✓ Handles increased waste volume from kidney disease</li>
                                <li>✓ Traps ammonia at the molecular level</li>
                                <li>✓ Long-lasting effectiveness between cleanings</li>
                                <li>✓ Keeps litter box fresh even with frequent use</li>
                                <li>✓ Encourages consistent litter box use</li>
                            </ul>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-electric-indigo/10 to-deep-coral/10 from-electric-indigo/20 to-deep-coral/20 rounded-xl p-8 mb-12">
                        <h3 className="text-2xl font-heading font-bold mb-4 text-center text-gray-900 text-gray-100">Why Senior Cat Owners Choose Purrify</h3>
                        <div className="grid md:grid-cols-3 gap-6 text-center">
                            <div>
                                <div className="text-4xl mb-3">🏥</div>
                                <h4 className="font-heading font-bold mb-2 text-gray-900 text-gray-100">Vet-Recommended</h4>
                                <p className="text-gray-700 text-gray-200">Safe for cats with health conditions</p>
                            </div>
                            <div>
                                <div className="text-4xl mb-3">👃</div>
                                <h4 className="font-heading font-bold mb-2 text-gray-900 text-gray-100">Odor-Free Home</h4>
                                <p className="text-gray-700 text-gray-200">Even with multiple senior cats</p>
                            </div>
                            <div>
                                <div className="text-4xl mb-3">💙</div>
                                <h4 className="font-heading font-bold mb-2 text-gray-900 text-gray-100">Comfort Focused</h4>
                                <p className="text-gray-700 text-gray-200">Gentle care for aging companions</p>
                            </div>
                        </div>
                    </div>

                    <div className="text-center">
                        <Link
                            href="/products/"
                            className="inline-block bg-gradient-to-r from-electric-indigo to-deep-coral text-white text-gray-100 font-bold py-4 px-8 rounded-lg hover:from-electric-indigo-600 hover:to-deep-coral-600 hover:scale-105 transition-all duration-300 text-lg mr-4 shadow-lg"
                        >
                            Shop Purrify Now
                        </Link>
                        <Link
                            href="/learn/how-it-works/"
                            className="inline-block bg-gray-200 bg-gray-600 text-gray-800 text-gray-200 font-bold py-4 px-8 rounded-lg hover:bg-gray-300 hover:bg-gray-500 transition-all text-lg"
                        >
                            Learn More
                        </Link>
                    </div>
                </div>
            </section>

            {/* AI Quotable Fact */}
            <section className="py-12 px-4">
                <div className="max-w-4xl mx-auto">
                    <AIQuotableBlock
                        fact="Studies show that up to 90% of cats over age 12 have arthritis, with many cases going undiagnosed. A low-sided litter box (3-4 inches) can significantly reduce pain and encourage consistent litter box use in senior cats."
                        explanation="Arthritis affects a cat's ability to jump, climb, and step over obstacles. Simple accommodations like low-entry litter boxes can dramatically improve their quality of life and prevent litter box avoidance."
                        icon="tip"
                        variant="highlight"
                    />
                </div>
            </section>

            {/* HowTo Section */}
            <section className="py-12 px-4 bg-gray-50 bg-gray-800">
                <div className="max-w-4xl mx-auto">
                    <HowToSection
                        title="How to Set Up a Litter Box for Senior Cats"
                        description="Create an accessible, comfortable litter box solution for senior cats with arthritis and mobility issues."
                        steps={howToSteps}
                        totalTime="PT20M"
                        timeDisplay="20 minutes for setup"
                        url={canonicalUrl}
                    />
                </div>
            </section>

            {/* Related Senior Cat Content - Internal Linking */}
            <section className="py-12 px-4">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-heading font-bold text-gray-900 text-gray-100 mb-6 text-center">
                        More Senior Cat Care Resources
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <Link
                            href="/learn/solutions/litter-box-smell-elimination/"
                            className="bg-white bg-gray-800 border border-gray-200 border-gray-700 rounded-xl p-6 hover:shadow-lg hover:border-[#FF3131] hover:border-[#FF5050] transition-all group"
                        >
                            <div className="text-3xl mb-3">🚫</div>
                            <h3 className="font-heading font-bold text-gray-900 text-gray-100 mb-2 group-hover:text-[#FF3131] group-hover:text-[#FF5050] transition-colors">
                                Litter Box Odor Elimination
                            </h3>
                            <p className="text-sm text-gray-600 text-gray-300">
                                Complete guide to eliminating litter box smells permanently.
                            </p>
                        </Link>
                        <Link
                            href="/learn/solutions/multiple-cats-odor-control/"
                            className="bg-white bg-gray-800 border border-gray-200 border-gray-700 rounded-xl p-6 hover:shadow-lg hover:border-[#FF3131] hover:border-[#FF5050] transition-all group"
                        >
                            <div className="text-3xl mb-3">🐱🐱</div>
                            <h3 className="font-heading font-bold text-gray-900 text-gray-100 mb-2 group-hover:text-[#FF3131] group-hover:text-[#FF5050] transition-colors">
                                Multiple Cats Odor Control
                            </h3>
                            <p className="text-sm text-gray-600 text-gray-300">
                                Managing litter boxes for multiple senior cats.
                            </p>
                        </Link>
                        <Link
                            href="/blog/"
                            className="bg-white bg-gray-800 border border-gray-200 border-gray-700 rounded-xl p-6 hover:shadow-lg hover:border-[#FF3131] hover:border-[#FF5050] transition-all group"
                        >
                            <div className="text-3xl mb-3">📚</div>
                            <h3 className="font-heading font-bold text-gray-900 text-gray-100 mb-2 group-hover:text-[#FF3131] group-hover:text-[#FF5050] transition-colors">
                                Cat Care Blog
                            </h3>
                            <p className="text-sm text-gray-600 text-gray-300">
                                Expert tips and advice for cat health and wellness.
                            </p>
                        </Link>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-12 px-4">
                <div className="max-w-4xl mx-auto">
                    <RelatedQuestions
                        title="Senior Cat Litter Questions"
                        questions={faqQuestions}
                        defaultOpen={[0]}
                    />
                </div>
            </section>

            <RelatedSolutions currentPath="/learn/solutions/senior-cat-litter-solutions" />
        </div>
    );
}
