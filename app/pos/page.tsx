"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";

export default function POSPage() {
    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="min-h-screen bg-neutral-900 text-white flex flex-col items-center py-8">
            {/* Controls - Hidden when printing */}
            <div className="w-full max-w-4xl flex justify-between items-center mb-8 px-4 print:hidden">
                <div className="text-sm text-neutral-400">
                    <p>For Retailers: Print this sign for your counter display.</p>
                    <p>Recommended settings: Full Color, Fit to Page.</p>
                </div>
                <Button onClick={handlePrint} className="flex items-center gap-2">
                    <Printer size={16} />
                    Print / Save as PDF
                </Button>
            </div>

            {/* Printable Area - A4 / Letter Aspect Ratio Container */}
            {/* approx 1:1.414 (A4) or 8.5:11 (Letter). We'll aim for a generic vertical poster look. */}
            <div
                className="relative w-[210mm] h-[297mm] bg-white text-black overflow-hidden shadow-2xl print:shadow-none print:w-full print:h-full print:absolute print:top-0 print:left-0 print:m-0"
                style={{ pageBreakAfter: "always" }}
            >
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/pos/background.png"
                        alt="Background"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/90 via-neutral-900/50 to-transparent z-10" />
                </div>

                {/* Content */}
                <div className="relative z-20 h-full flex flex-col items-center justify-between p-12 text-center text-white">

                    {/* Header */}
                    <div className="space-y-4 pt-8">
                        <h2 className="text-xl font-medium tracking-widest uppercase opacity-80">Stop Cat Litter Smell</h2>
                        <h1 className="text-6xl font-black leading-tight tracking-tight drop-shadow-xl">
                            ELIMINATE<br />
                            <span className="text-emerald-400">AMMONIA ODOR</span><br />
                            INSTANTLY
                        </h1>
                    </div>

                    {/* Product Hero */}
                    <div className="relative w-full h-[400px] my-4">
                        <Image
                            src="/images/pos/product.png"
                            alt="Purrify Product"
                            fill
                            className="object-contain drop-shadow-2xl"
                        />
                    </div>

                    {/* Key Benefits */}
                    <div className="grid grid-cols-2 gap-8 w-full max-w-2xl mx-auto">
                        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                            <h3 className="text-2xl font-bold mb-2 text-emerald-300">WORKS ON CONTACT</h3>
                            <p className="text-lg opacity-90">Activated carbon traps odor molecules instantly.</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                            <h3 className="text-2xl font-bold mb-2 text-emerald-300">100% NON-TOXIC</h3>
                            <p className="text-lg opacity-90">Safe for cats, humans, and the planet.</p>
                        </div>
                    </div>

                    {/* Footer / CTA */}
                    <div className="w-full pb-8 flex flex-col items-center space-y-6">
                        <div className="bg-emerald-500/20 px-8 py-4 rounded-full border border-emerald-400/30 backdrop-blur-sm">
                            <p className="text-3xl font-bold">Try a Trial Size Today</p>
                        </div>

                        <div className="flex items-center gap-6 mt-4 p-4 bg-white text-black rounded-2xl shadow-xl">
                            {/* QR Code Placeholder */}
                            <div className="w-24 h-24 bg-neutral-900 flex items-center justify-center text-white text-xs p-2 text-center">
                                SCAN FOR<br />INFO
                            </div>
                            <div className="text-left">
                                <p className="font-bold text-xl">Scan to Learn More</p>
                                <p className="text-lg text-neutral-600">purrify.ca</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
