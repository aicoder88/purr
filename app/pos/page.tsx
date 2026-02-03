"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Printer, Zap, ShieldCheck, Wind, Sparkles, Leaf } from "lucide-react";

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
                <Button onClick={handlePrint} className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white">
                    <Printer size={16} />
                    Print / Save as PDF
                </Button>
            </div>

            {/* Printable Area - A4 / Letter Aspect Ratio Container */}
            <div
                className="relative w-[210mm] h-[297mm] bg-white text-black overflow-hidden shadow-2xl print:shadow-none print:w-full print:h-full print:absolute print:top-0 print:left-0 print:m-0 flex flex-col"
                style={{ pageBreakAfter: "always" }}
            >
                {/* Background Image / Texture */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-pink-50 opacity-100" />
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-orange-100/50 to-transparent" />
                </div>

                {/* Content Container */}
                <div className="relative z-20 flex-1 flex flex-col p-10">

                    {/* Header */}
                    <div className="text-center space-y-2 mb-6">
                        <div className="inline-block px-4 py-1 rounded-full bg-orange-100 text-orange-700 font-bold tracking-widest text-sm uppercase mb-2">
                            Stop Litter Box Smell
                        </div>
                        <h1 className="text-6xl font-black leading-none tracking-tight text-gray-900">
                            ELIMINATE<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-600">AMMONIA ODOR</span><br />
                            INSTANTLY
                        </h1>
                    </div>

                    {/* Central Diagram: Product + Benefits */}
                    <div className="flex-1 grid grid-cols-12 gap-8 items-center">
                        
                        {/* Left Column: Problem/Solution */}
                        <div className="col-span-3 flex flex-col gap-8 justify-center">
                            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-orange-100 text-center">
                                <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-3">
                                    <Zap className="w-6 h-6 text-red-500" />
                                </div>
                                <h3 className="font-bold text-gray-900 leading-tight">Targets Ammonia</h3>
                                <p className="text-xs text-gray-600 mt-1">Neutralizes the root cause of smell</p>
                            </div>
                            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-orange-100 text-center">
                                <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
                                    <Leaf className="w-6 h-6 text-green-600" />
                                </div>
                                <h3 className="font-bold text-gray-900 leading-tight">100% Non-Toxic</h3>
                                <p className="text-xs text-gray-600 mt-1">Safe for cats & humans</p>
                            </div>
                        </div>

                        {/* Center Column: Product Image */}
                        <div className="col-span-6 relative h-full flex items-center justify-center">
                            <div className="relative w-full h-[400px]">
                                <Image
                                    src="/images/pos/product.png"
                                    alt="Purrify Product"
                                    fill
                                    className="object-contain drop-shadow-2xl"
                                />
                            </div>
                        </div>

                        {/* Right Column: Benefits */}
                        <div className="col-span-3 flex flex-col gap-8 justify-center">
                            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-orange-100 text-center">
                                <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                                    <Wind className="w-6 h-6 text-blue-500" />
                                </div>
                                <h3 className="font-bold text-gray-900 leading-tight">Fragrance Free</h3>
                                <p className="text-xs text-gray-600 mt-1">No masking perfumes</p>
                            </div>
                            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-orange-100 text-center">
                                <div className="mx-auto w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-3">
                                    <ShieldCheck className="w-6 h-6 text-purple-500" />
                                </div>
                                <h3 className="font-bold text-gray-900 leading-tight">Works Instantly</h3>
                                <p className="text-xs text-gray-600 mt-1">Activated carbon technology</p>
                            </div>
                        </div>
                    </div>

                    {/* How It Works - Process Flow */}
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 mb-8">
                        <div className="grid grid-cols-3 gap-4 relative">
                            {/* Connecting Line */}
                            <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-orange-200 to-pink-200 -z-10 transform -translate-y-1/2" />
                            
                            <div className="text-center bg-white p-2">
                                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl text-white flex items-center justify-center text-xl font-bold mx-auto mb-3 shadow-lg transform rotate-3">1</div>
                                <h4 className="font-bold text-gray-900 uppercase text-sm">Scoop</h4>
                                <p className="text-xs text-gray-500">Scoop waste as usual</p>
                            </div>
                             <div className="text-center bg-white p-2">
                                <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-pink-500 rounded-2xl text-white flex items-center justify-center text-xl font-bold mx-auto mb-3 shadow-lg transform -rotate-3">2</div>
                                <h4 className="font-bold text-gray-900 uppercase text-sm">Sprinkle</h4>
                                <p className="text-xs text-gray-500">Add 1 tbsp of Purrify</p>
                            </div>
                             <div className="text-center bg-white p-2">
                                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-500 rounded-2xl text-white flex items-center justify-center text-xl font-bold mx-auto mb-3 shadow-lg transform rotate-3">3</div>
                                <h4 className="font-bold text-gray-900 uppercase text-sm">Fresh Air</h4>
                                <p className="text-xs text-gray-500">Live odor-free</p>
                            </div>
                        </div>
                    </div>

                    {/* Footer / CTA */}
                    <div className="flex items-center justify-between bg-gray-900 text-white p-6 rounded-2xl shadow-2xl">
                        <div className="flex-1">
                            <h3 className="text-2xl font-bold text-orange-300">Try a Trial Size Today</h3>
                            <p className="text-gray-400 text-sm">Available at the counter • 100% Satisfaction Guarantee</p>
                        </div>
                         <div className="flex items-center gap-4 bg-white/10 p-2 rounded-xl border border-white/20">
                            <div className="bg-white p-1 rounded-lg">
                                 {/* QR Code Placeholder */}
                                <div className="w-16 h-16 bg-neutral-900 flex items-center justify-center text-white text-[10px] text-center font-mono leading-tight">
                                    SCAN<br/>INFO
                                </div>
                            </div>
                             <div className="text-left pr-2">
                                <p className="font-bold text-sm uppercase tracking-wide text-white">Learn More</p>
                                <p className="text-xs text-orange-300 font-bold">purrify.ca</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
