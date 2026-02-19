"use client";

import { Container } from "@/components/ui/container";
import Image from "next/image";
import { useTranslation } from "@/lib/translation-context";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Microscope, ShieldCheck, Leaf } from "lucide-react";

// Default features for fallback
const defaultFeatures = [
    {
        title: "Micro-Pore Technology",
        description: "Millions of microscopic pores trap odor molecules instantly upon contact.",
    },
    {
        title: "Safe & Non-Toxic",
        description: "100% natural activated carbon. Safe for pets and humans.",
    },
    {
        title: "Eco-Friendly",
        description: "Sustainable materials that are biodegradable and earth-safe.",
    }
];

const featureIcons = [
    <Microscope key="microscope" className="w-6 h-6 text-electric-indigo" />,
    <ShieldCheck key="shield" className="w-6 h-6 text-deep-coral" />,
    <Leaf key="leaf" className="w-6 h-6 text-green-500 dark:text-green-400" />
];

export function ScienceSection() {
    const { t, locale } = useTranslation();

    // Use translated features if available, otherwise use defaults
    const featureItems = t.scienceSection?.features || defaultFeatures;

    return (
        <section id="science" className="pt-12 pb-24 md:pt-16 md:pb-24 bg-white dark:bg-gray-900 overflow-hidden">
            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Text Content */}
                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric-indigo/10 text-electric-indigo text-sm font-bold mb-6">
                            <Microscope className="w-4 h-4" />
                            {t.scienceSection?.badge || ""}
                        </div>

                        <h2 className="font-heading text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                            {t.scienceSection?.headline || ""} <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-indigo to-purple-600">
                                {t.scienceSection?.headlineHighlight || ""}
                            </span>
                        </h2>

                        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                            {t.scienceSection?.description || ""}
                        </p>

                        <div className="space-y-8 mb-10">
                            {featureItems.map((feature, index) => (
                                <div key={index} className="flex items-start gap-4 group">
                                    <div className="w-14 h-14 rounded-2xl bg-white dark:bg-gray-800 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-md border border-gray-100 dark:border-gray-700">
                                        {featureIcons[index] || featureIcons[0]}
                                    </div>
                                    <div>
                                        <h3 className="font-heading font-bold text-lg text-gray-900 dark:text-white mb-1 group-hover:text-electric-indigo transition-colors">
                                            {feature.title}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button asChild className="bg-gray-900 hover:bg-gray-800 text-gray-50 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200 rounded-full px-8 py-6 text-lg font-bold shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                                <Link href={`${locale === 'fr' ? '/fr' : ''}/learn/science`}>
                                    {t.scienceSection?.learnMore || ""} <ArrowRight className="w-5 h-5 ml-2" />
                                </Link>
                            </Button>
                            <Button asChild variant="outline" className="rounded-full px-8 py-6 text-lg font-bold border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all hover:-translate-y-1">
                                <Link href={`${locale === 'fr' ? '/fr' : ''}/learn/activated-carbon-vs-baking-soda-deodorizers`}>
                                    {t.nav.carbonVsBakingSoda}
                                </Link>
                            </Button>
                        </div>
                    </div>

                    {/* Visual Content */}
                    <div className="relative">
                        {/* Background Blobs */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-electric-indigo/20 to-purple-500/20 rounded-full blur-3xl animate-pulse-slow pointer-events-none" />

                        <div className="relative bg-white dark:bg-gray-800 rounded-[2.5rem] shadow-2xl p-4 border border-gray-100 dark:border-gray-700 rotate-3 hover:rotate-0 transition-transform duration-700 ease-out">
                            <div className="relative rounded-[2rem] overflow-hidden aspect-square bg-gray-100 dark:bg-gray-900">
                                <Image
                                    src="/optimized/Carbon-sktech.webp"
                                    alt={t.homepage?.altText?.scientificDiagram || 'Activated Carbon Mechanism'}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 600px"
                                />

                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                                {/* Floating Label */}
                                <div className="absolute bottom-8 left-8 right-8">
                                    <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md p-4 rounded-xl border border-white/20 shadow-lg">
                                        <p className="font-bold text-gray-900 dark:text-white text-sm mb-1">
                                            {t.scienceSection?.floatingLabel?.title || ""}
                                        </p>
                                        <p className="text-xs text-gray-600 dark:text-gray-400">
                                            {t.scienceSection?.floatingLabel?.description || ""}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Floating Elements */}
                        <div className="absolute -top-10 -right-10 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 animate-float">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                                    <Leaf className="w-5 h-5 text-green-600 dark:text-green-400" />
                                </div>
                                <div>
                                    <p className="font-bold text-sm text-gray-900 dark:text-white">{t.scienceSection?.naturalBadge?.title || ""}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{t.scienceSection?.naturalBadge?.subtitle || ""}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Transition teaser - Better visual treatment */}
                {t.sectionTeasers?.science && (
                    <div className="mt-24 col-span-full flex justify-center">
                        <Link href="#products" className="bg-white dark:bg-gray-800 rounded-full px-8 py-4 shadow-xl border border-gray-100 dark:border-gray-700 flex items-center gap-4 group hover:-translate-y-1 transition-transform duration-300">
                            <p className="text-xl font-bold text-gray-900 dark:text-white">
                                {t.sectionTeasers.science}
                            </p>
                            <div className="w-10 h-10 rounded-full bg-electric-indigo text-gray-50 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                <ArrowRight className="w-5 h-5 animate-pulse" />
                            </div>
                        </Link>
                    </div>
                )}
            </Container>
        </section>
    );
}
