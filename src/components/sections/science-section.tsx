import { Container } from "@/components/ui/container";
import Image from "next/image";
import { useTranslation } from "../../lib/translation-context";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Microscope, ShieldCheck, Leaf } from "lucide-react";

export function ScienceSection() {
    const { t, locale } = useTranslation();

    const features = [
        {
            icon: <Microscope className="w-6 h-6 text-electric-indigo" />,
            title: "Micro-Pore Technology",
            description: "Millions of microscopic pores trap odor molecules instantly upon contact."
        },
        {
            icon: <ShieldCheck className="w-6 h-6 text-deep-coral" />,
            title: "Safe & Non-Toxic",
            description: "100% natural activated carbon. Safe for pets and humans."
        },
        {
            icon: <Leaf className="w-6 h-6 text-green-500 dark:text-green-400" />,
            title: "Eco-Friendly",
            description: "Sustainable materials that are biodegradable and earth-safe."
        }
    ];

    return (
        <section className="py-24 bg-white dark:bg-gray-900 overflow-hidden">
            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Text Content */}
                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric-indigo/10 text-electric-indigo text-sm font-bold mb-6">
                            <Microscope className="w-4 h-4" />
                            The Science Behind Purrify
                        </div>

                        <h2 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                            How Activated Carbon <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-indigo to-purple-600">
                                Eliminates Odors
                            </span>
                        </h2>

                        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                            Unlike sprays that mask odors with heavy perfumes, Purrify uses activated carbon to physically trap and neutralize odor-causing molecules at the microscopic level.
                        </p>

                        <div className="space-y-8 mb-10">
                            {features.map((feature, index) => (
                                <div key={index} className="flex items-start gap-4 group">
                                    <div className="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                                        {feature.icon}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1 group-hover:text-electric-indigo transition-colors">
                                            {feature.title}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Button asChild className="bg-gray-900 hover:bg-gray-800 text-white dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 rounded-full px-8 py-6 text-lg font-bold shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                            <Link href={`${locale === 'fr' ? '/fr' : ''}/learn/science`}>
                                Learn More About The Science <ArrowRight className="w-5 h-5 ml-2" />
                            </Link>
                        </Button>
                    </div>

                    {/* Visual Content */}
                    <div className="relative">
                        {/* Background Blobs */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-electric-indigo/20 to-purple-500/20 rounded-full blur-3xl animate-pulse-slow pointer-events-none" />

                        <div className="relative bg-white dark:bg-gray-800 rounded-[2.5rem] shadow-2xl p-4 border border-gray-100 dark:border-gray-700 rotate-3 hover:rotate-0 transition-transform duration-700 ease-out">
                            <div className="relative rounded-[2rem] overflow-hidden aspect-square bg-gray-100 dark:bg-gray-900">
                                <Image
                                    src="/optimized/Carbon sktech.webp"
                                    alt="Activated Carbon Mechanism"
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
                                            Microscopic View
                                        </p>
                                        <p className="text-xs text-gray-600 dark:text-gray-400">
                                            Porous structure traps ammonia molecules instantly.
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
                                    <p className="font-bold text-sm text-gray-900 dark:text-white">100% Natural</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">No chemicals</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
