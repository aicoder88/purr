'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Star, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useTranslation } from '@/lib/translation-context';

interface ProductsHeroExperimentCopy {
    headline: string;
    subheadline: string;
    primaryCta: string;
    proofOrder: 'before-cta' | 'after-cta';
}

interface ProductsHeroProps {
    experimentCopy: ProductsHeroExperimentCopy;
}

export function ProductsHero({ experimentCopy }: ProductsHeroProps) {
    const { t, locale } = useTranslation();
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
    const trustBadge = (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-8 flex items-center gap-4 text-sm font-medium text-gray-500 dark:text-gray-400"
        >
            <div className="flex -space-x-1">
                {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400 dark:fill-yellow-500 dark:text-yellow-500" />
                ))}
            </div>
            <span>
                {locale === 'fr' ? "Noté 4.9/5 par les parents de chats" : "Rated 4.9/5 by cat parents"}
            </span>
        </motion.div>
    );

    return (
        <section
            ref={containerRef}
            className="relative overflow-hidden bg-[#FFFFF5] dark:bg-gray-900 pt-16 pb-20 lg:pt-32 lg:pb-32"
        >
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-purple/5 to-transparent dark:from-brand-purple/10 pointer-events-none" />
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-red/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-1/2 left-0 w-64 h-64 bg-blue-400/5 dark:bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

            <Container className="relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

                    {/* Left Column: Copy */}
                    <div className="order-2 lg:order-1 flex flex-col items-start text-left">
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-purple/10 text-brand-purple dark:text-purple-300 font-medium text-sm mb-6"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 dark:bg-purple-500 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                            </span>
                            {t.productsHero.pill}
                        </motion.div>

                        {/* Heading */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 leading-[1.1] tracking-tight mb-6"
                        >
                            {experimentCopy.headline}
                        </motion.h1>

                        {/* Subheading */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-xl mb-8"
                        >
                            {experimentCopy.subheadline}
                        </motion.p>

                        {experimentCopy.proofOrder === 'before-cta' && trustBadge}

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
                        >
                            <Button
                                asChild
                                size="lg"
                                className="bg-brand-purple hover:bg-brand-purple/90 text-white dark:text-gray-100 font-bold text-lg px-8 py-6 h-auto shadow-xl shadow-brand-purple/20 transition-all hover:scale-105"
                            >
                                <Link href="#product-comparison">
                                    {experimentCopy.primaryCta}
                                </Link>
                            </Button>
                            <Button
                                asChild
                                variant="ghost"
                                size="lg"
                                className="text-gray-600 dark:text-gray-300 hover:text-brand-purple dark:hover:text-purple-400 hover:bg-transparent font-medium group"
                            >
                                <Link href="#science" className="flex items-center gap-2">
                                    {t.productsHero.scienceButton}
                                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </Button>
                        </motion.div>

                        {experimentCopy.proofOrder === 'after-cta' && trustBadge}
                    </div>

                    {/* Right Column: Visuals */}
                    <div className="order-1 lg:order-2 relative h-[400px] lg:h-[600px] w-full flex items-center justify-center">

                        {/* Main circular glow background */}
                        <motion.div
                            style={{ y: y }}
                            className="absolute inset-0 bg-gradient-to-b from-brand-light to-transparent dark:from-brand-purple/20 rounded-full blur-3xl opacity-60 scale-90"
                        />

                        <div className="relative w-full h-full max-w-[600px] mx-auto perspective-1000">

                            {/* Product Composition */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
                                className="relative z-10 w-full h-full"
                            >
                                {/* Family Bag (Hero - Largest) */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] md:w-[350px] z-20">
                                    <Image
                                        src="/optimized/140g-transparent.webp"
                                        alt="Purrify Family Size"
                                        width={640}
                                        height={640}
                                        sizes="(max-width: 768px) 280px, 350px"
                                        className="w-full h-auto drop-shadow-2xl"
                                        priority
                                    />
                                </div>

                                {/* Regular Bag (Background Right - Medium) */}
                                <div className="absolute top-1/3 right-0 lg:-right-6 w-[200px] md:w-[260px] z-10 opacity-90 blur-[0.5px]">
                                    <Image
                                        src="/optimized/60g-transparent.webp"
                                        alt="Purrify Regular Size"
                                        width={640}
                                        height={640}
                                        sizes="(max-width: 768px) 200px, 260px"
                                        className="w-full h-auto drop-shadow-lg rotate-6"
                                    />
                                </div>

                                {/* Trial Bag (Foreground Left - Smallest) */}
                                <div className="absolute bottom-12 left-4 md:left-8 w-[140px] md:w-[180px] z-30">
                                    <Image
                                        src="/optimized/17g-transparent-v2.webp"
                                        alt="Purrify Trial Size"
                                        width={640}
                                        height={640}
                                        sizes="(max-width: 768px) 140px, 180px"
                                        className="w-full h-auto drop-shadow-xl -rotate-12"
                                    />
                                </div>

                                {/* Decoration/Context */}
                                <div className="absolute top-1/4 left-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-3 rounded-xl shadow-lg border border-brand-purple/10 z-40 animate-float">
                                    <div className="flex items-center gap-2">
                                        <CheckCircle2 className="w-5 h-5 text-green-500 dark:text-green-400" />
                                        <span className="text-sm font-bold text-gray-800 dark:text-gray-200">
                                            {locale === 'fr' ? "Garantie 0 Odeur" : "Zero Odor Guarantee"}
                                        </span>
                                    </div>
                                </div>

                            </motion.div>
                        </div>
                    </div>
                </div>
            </Container>

            {/* Wave Separator */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10">
                <svg
                    className="relative block w-[calc(100%+1.3px)] h-[60px] text-white dark:text-gray-800"
                    data-name="Layer 1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                        className="fill-[#FFFFF5] dark:fill-gray-900"
                        fillOpacity="0" // Should actually match the NEXT section background, usually white for content
                    ></path>
                    {/* In this case, we want the WAVE to be part of the hero and cut into the white content below, 
               OR be white and cut UP into the hero. 
               Let's make it a white shape at the bottom of the hero to transition to the white content section. 
           */}
                    <path
                        d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
                        className="fill-white dark:fill-gray-800"
                    ></path>
                </svg>
            </div>

        </section>
    );
}
